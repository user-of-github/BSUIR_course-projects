FORMAT PE Console


ENTRY main


INCLUDE 'win32a.inc'
; link to these files on other machine
INCLUDE 'C:\Users\User\Downloads\fasmw17330\INCLUDE\API\kernel32.inc'
INCLUDE 'C:\Users\User\Downloads\fasmw17330\INCLUDE\API\user32.inc'


SECTION '.data' data readable writeable
        ; constants for output
        format_string_double db  '%.5f', 0
        format_string_double_unformatted db '%g', 0
        format_string_integer db '%d', 0
        format_string_text db '%s', 0
        whitespace_text db '  ', 0
        format_string_endline db 13, 10, 0
        minus_symbol db '-', 0 ; 0 => string end
        interval_divider_text db '...', 0

        digit_temp dd ?

        ; input constants for equation
        x0 dq 0.0
        y0 dq 0.0

        m dq 1.0
        a dq 0.7

        interval_left_border dq 0.0
        interval_right_border dq 1.0

        ; constants and variables for solving
        number_of_split_segments dd 27 ; works for 2..27
        step dq ?
        x_values dq 24 dup(?)
        y_values dq 21 dup(0.0)
        x_prev dq ?

        ;some comments output strings
        found_step_message db 'Grid splitting step size: ', 0
        number_of_nodes_message db 'Number of nodes: ', 0
        current_index_message db 'Index = ', 0
        x_values_message db 'Array of X: ', 0
        output_table_message db 'Table of values of the grid function on the interval', 0
        table_header_text db ' x          y', 0
        exit_program_message db 'Press Enter to close console window or just close it yourself   ', 0

        ; variables, needed for storing temporary (intermediate) data
        temp_integer dd ?
        temp_double dq ?
        temp_x dq ? ; used in y' = f(x, y)  to take x[i - 1]
        temp_y dq ? ; used in y' = f(x, y) to take x[i]
        temp_numerator dq ? ; for a * (1 - y^2)
        temp_denominator dq ? ; for (1 + m)*x^2 + y^2 + 1
        temp_derivative_output dq ? ; for total value of y' = f(x, y)
        y_previous dq ? ; to put here y[i-1]
        current_y_total dq ?

        counter dd 0

        SHOW_DEBUG_INFO_FLAG dd 0 ; 1 <=> show intermediate results in computing f, y | 0 <=> do not show


SECTION '.code' code readable executable
        main:
                initial_data_ouput:
                        stdcall print_string, number_of_nodes_message
                        stdcall print_integer, number_of_split_segments
                        stdcall print_endline

                prepare_fpu:
                        fwait ; wait for mathematics co-processor
                        finit ; initialize FPU module

                define_step_size:
                        fld [interval_right_border]
                        fld [interval_left_border]
                        fsubp
                        fild [number_of_split_segments]
                        fdivp
                        fst [step]

                        stdcall print_string, found_step_message
                        stdcall print_double_formatted, step
                        stdcall print_endline

                initialize_x_values:
                        stdcall copy_qword_variable, x0, x_values  ; x0 --> x_values[0]

                        mov ecx, [number_of_split_segments] ; iterations count (for filling x_values)
                        inc ecx ; N ranges <=> N + 1 points

                        mov eax, x_values
                        add eax, 8
                        initialize_current_x:
                                finit
                                ; load x[i - 1] --> temp_double
                                mov edx, eax
                                sub edx, 8
                                stdcall copy_qword_variable, edx, temp_double

                                ; (x[i - 1] + step) --> temp_double
                                fld [temp_double]
                                fld [step]
                                faddp
                                fst [temp_double]

                                ; move result --> x[i]
                                stdcall copy_qword_variable, temp_double, eax

                                add eax, 8  ;  <=> ++index

                                loop  initialize_current_x


                compute_y_values:
                        mov ecx, [number_of_split_segments]
                        ;inc ecx    ; here only for [1..N-1], 0th point is already computed

                        mov edx, 8

                        compute_current_y:
                                finit
                                mov [temp_integer], edx

                                stdcall compute_derivative_in_point
                                mov eax, y_values
                                add eax, edx
                                sub eax, 8 ; to get [i - 1]
                                stdcall copy_qword_variable, eax, y_previous

                                fld [step]
                                fld [temp_derivative_output]
                                fmulp
                                fld [y_previous]
                                faddp
                                fst [current_y_total]
                                add eax, 8
                                stdcall copy_qword_variable, current_y_total, eax
                                add edx, 8

                                loop compute_current_y

                stdcall print_algorithm_full_response


        finish_program:
                stdcall print_string, exit_program_message
                invoke getch
                invoke ExitProcess, 0


proc print_algorithm_full_response
     stdcall print_endline
     stdcall print_string, output_table_message
     stdcall print_string, whitespace_text
     stdcall print_double_unformatted, interval_left_border
     stdcall print_string, interval_divider_text
     stdcall print_double_unformatted, interval_right_border
     stdcall print_endline
     stdcall print_endline
     stdcall print_result_function_table
     stdcall print_endline
     stdcall print_endline

     ret
endp


proc compute_derivative_in_point ; need to have index (shift) in temp_integer !!
     pusha

     mov ecx, [temp_integer] ; shift / index I of CURRENT x[i] or y[i]
     sub ecx, 8 ; we need x[i - 1] and y[i - 1]

     ; we need x[i - 1] and y[i - 1], so:
     mov eax, x_values
     add eax, ecx ; so now EAX points to x_values[i - 1]

     mov ebx, y_values
     add ebx, ecx ; so now EBX points to y_values[i - 1]

     stdcall copy_qword_variable, eax, temp_x
     stdcall copy_qword_variable, ebx, temp_y

     ; so now we have x and y for computing f(x, y) = y'

     fld1 ; load +1.0

     ; y^2
     fld [temp_y]
     fld [temp_y]
     fmulp

     ; 1 - y^2
     fsubp

     ; a * (1 - y^2)
     fld [a]
     fmulp
     fst [temp_numerator]

     ; 1 + m
     fld1
     fld [m]
     faddp
     ; x^2
     fld [temp_x]
     fld [temp_x]
     fmulp
     ; (1+m)*x^2
     fmulp
     ;y^2
     fld [temp_y]
     fld[temp_y]
     fmulp
     ; (1+m)*x^2 + y^2
     faddp
     ; 1
     fld1
     ; (1+m)*x^2 + y^2 + 1
     faddp
     fst [temp_denominator]


     ; final f(x, y)
     fld [temp_numerator]
     fld [temp_denominator]
     fdivp
     fst [temp_derivative_output]

     ; should print debug info ?
     mov eax, [SHOW_DEBUG_INFO_FLAG]
     cmp eax, 0
     je  finish_computing_derrivative

     stdcall print_double_formatted, temp_x
     stdcall print_string, whitespace_text
     stdcall print_double_formatted, temp_y
     stdcall print_string, whitespace_text
     stdcall print_double_formatted, temp_numerator
     stdcall print_string, whitespace_text
     stdcall print_double_formatted, temp_denominator
     stdcall print_string, whitespace_text
     stdcall print_double_formatted, temp_derivative_output
     stdcall print_endline


     finish_computing_derrivative:
        popa

        ret
endp



; prints a floating number, stored in dq variable
; number of signs after dot is in format string in constants
proc print_double_formatted number
     pusha
     mov eax, [number]
     cinvoke printf, format_string_double, DWORD[eax], DWORD[eax + 4]
     popa

     ret
endp


proc print_double_unformatted number
     pusha
     mov eax, [number]
     cinvoke printf, format_string_double_unformatted, DWORD[eax], DWORD[eax + 4]
     popa

     ret
endp


proc print_integer number ; prints an integer number, stored in dd variable
     pusha
     mov eax, [number]
     cinvoke printf, format_string_integer, [eax]
     popa

     ret
endp


proc print_endline ; prints a new line character
     pusha
     cinvoke printf, format_string_endline
     popa
     ret
endp


proc print_string string ; prints passed string
     pusha
     cinvoke printf, format_string_text, [string]
     popa
     ret
endp


proc copy_qword_variable from, to
     pusha

     mov ecx, [from]
     mov edx, [to]

     mov eax, DWORD[ecx]
     mov DWORD[edx], eax
     mov eax, DWORD[ecx + 4]
     mov DWORD[edx + 4], eax

     popa

     ret
endp


proc print_x_values_array
     pusha

     mov ecx, [number_of_split_segments]
     mov eax, x_values

     print_current:
        stdcall copy_qword_variable, eax, temp_double
        stdcall print_double_formatted, temp_double
        stdcall print_string, whitespace_text
        add eax, 8
        loop print_current

     popa

     ret
endp

proc print_y_values_array
     pusha

     mov ecx, [number_of_split_segments]
     mov eax, y_values

     print_current:
        stdcall copy_qword_variable, eax, temp_double
        stdcall print_double_formatted, temp_double
        stdcall print_string, whitespace_text
        add eax, 8
        loop print_current

     popa

     ret
endp

proc print_result_function_table
     pusha

     stdcall print_string, table_header_text
     stdcall print_endline

     mov ecx, [number_of_split_segments]
     inc ecx
     mov eax, x_values
     mov ebx, y_values

     print_current:
        ; print x[i]
        stdcall copy_qword_variable, eax, temp_double
        stdcall print_double_formatted, temp_double

        stdcall print_string, whitespace_text
        ; print y[i]
        stdcall copy_qword_variable, ebx, temp_double
        stdcall print_double_formatted, temp_double

        stdcall print_endline

        add eax, 8
        add ebx, 8
        loop print_current

     popa

     ret
endp



SECTION '.idata' data import readable writable
        library kernel, 'kernel32.dll', msvcrt, 'msvcrt.dll'
        import kernel, ExitProcess, 'ExitProcess'
        import msvcrt, printf, 'printf', getch, '_getch'