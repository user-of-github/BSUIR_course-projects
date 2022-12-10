FORMAT PE Console


ENTRY main


INCLUDE 'win32a.inc'
; link to these files on other machine
INCLUDE 'C:\Users\User\Downloads\fasmw17330\INCLUDE\API\kernel32.inc'
INCLUDE 'C:\Users\User\Downloads\fasmw17330\INCLUDE\API\user32.inc'


SECTION '.data' data readable writeable
        ; constants for output
        format_string_double db  '%g', 0
        format_string_integer db '%d', 0
        format_string_text db '%s', 0
        format_string_whitespace db ' ', 0
        format_string_endline db 13, 10, 0
        minus_symbol db '-', 0 ; 0 => string end

        digit_temp dd ?

        ; input constants for equation
        x0 dq 0.0
        y0 dq 0.0

        m dq 1.0
        a dq 0.7747844

        interval_left_border dq 0.0
        interval_right_border dq 1.0

        ; constants and variables for solving
        number_of_split_segments dd 20
        step dq ?
        x_values dq 24 dup(?)
        y_values dq 21 dup(123.123)
        x_prev dq ?

        ;some comments output strings
        found_step_message db 'Grid splitting step size: ', 0
        current_index_message db 'Index = ', 0
        x_values_message db 'Array of X: ', 0

        temp_integer dd ?
        temp_double dq ?
        zero_double dq 0

        counter dd 0


SECTION '.code' code readable executable
        main:
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
                        stdcall print_double, step
                        stdcall print_endline

                initialize_x_values:
                        stdcall copy_qword_variable, x0, x_values  ; x0 --> x_values[0]

                        mov ecx, [number_of_split_segments] ; iterations count (for filling x_values)

                        mov eax, x_values
                        add eax, 8
                        initialize_current_x:
                                finit
                                ; load x[i - 1] to temp_double
                                mov edx, eax
                                sub edx, 8
                                stdcall copy_qword_variable, edx, temp_double

                                ; x[i - 1] + step, and put to temp_double
                                fld [temp_double]
                                fld [step]
                                faddp
                                fst [temp_double]

                                ; move result to x[i]
                                stdcall copy_qword_variable, temp_double, eax

                                add eax, 8

                                loop  initialize_current_x

                stdcall print_string, x_values_message
                stdcall print_x_values_array
                stdcall print_endline

        finish_program:
                invoke getch
                invoke ExitProcess, 0



proc print_double number ; prints a floating number, stored in dq variable
     pusha
     mov eax, [number]
     cinvoke printf, format_string_double, DWORD[eax], DWORD[eax + 4]
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
     mov ecx, [number_of_split_segments]
     mov eax, x_values

     print_current:
        stdcall copy_qword_variable, eax, temp_double
        stdcall print_double, temp_double
        stdcall print_string, format_string_whitespace
        add eax, 8
        loop print_current

     ret
endp



SECTION '.idata' data import readable writable
        library kernel, 'kernel32.dll', msvcrt, 'msvcrt.dll'
        import kernel, ExitProcess, 'ExitProcess'
        import msvcrt, printf, 'printf', getch, '_getch'