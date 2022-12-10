FORMAT PE Console


ENTRY main


INCLUDE 'win32a.inc'
; link to these files on other machine
INCLUDE 'C:\Users\User\Downloads\fasmw17330\INCLUDE\API\kernel32.inc'
INCLUDE 'C:\Users\User\Downloads\fasmw17330\INCLUDE\API\user32.inc'



SECTION '.data' data readable writeable
        ; constants for output
        format_string_double db  '%.10f', 0
        format_string_text db '%s', 0
        format_string_endline db 13, 10, 0
        minus_symbol db '-', 0 ; 0 => string end

        digit_temp dd ?

        ; input constants for equation
        x0 dq 0.0
        y0 dq 0.0

        m dq 1.0
        a dq 0.7747844
        temp dq ?

        interval_left_border dq 0.0
        interval_right_border dq 1.0

        ; constants for solving
        number_of_split_segments dw 20
        step dq ?

        ;some comments output strings
        found_step_message db 'Grid splitting step size: ', 0



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

        finish_program:
                invoke getch
                invoke ExitProcess, 0


proc print_double number
     push eax
     mov eax, [number]
     cinvoke printf, format_string_double, DWORD[eax], DWORD[eax + 4]
     pop eax
     ret
endp

proc print_endline
     cinvoke printf, format_string_endline
     ret
endp

proc print_string string
     cinvoke printf, format_string_text, [string]
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




proc print_signed_integer, number ; uses ebx ecx      // to
        mov eax, [number]

        action_for_negative_numbers:
            cmp eax, 0
            jge output_preparation ; if (ax > 0) goto count_digits
            neg eax ; ax = (-1) * ax
            mov [temp], eax ; printf spoils registers => need to remember EAX
            invoke printf, minus_symbol
            mov eax, [temp] ; restore EAX
            pop ecx

        output_preparation:
            xor ecx, ecx ; <=> mov cx, 0
            xor edx, edx ; <=> mov dx, 0
            xor ebx, ebx
            mov ebx, 10 ; for dividing on bxs

        count_digits:
            div ebx ; div <=> (dx+ax) / 10 => num / 10 -> ax, num % 10 -> dx
            push edx ; remember received digit
            xor edx, edx ; made dx = 0
            inc ecx ; increased counter of digits
            test eax, eax ; ax === 0 ?
            jnz count_digits ; if yes, will repeat and get another digit


        print_digits:
            pop edx ; take digit
            add edx, 30h ; += 30h to convert it in ASCII view for printing
            mov [digit_temp], edx
            push ecx ; printf spoils registers => so need to save it
            invoke printf, digit_temp
            pop edx ; printf also pushes addresses of used parameters => so need to clear pushed parameters
            pop ecx ; restore ECX, because I need it for loop
            loop print_digits

     ret
endp


SECTION '.idata' data import readable writable
        library kernel, 'kernel32.dll', msvcrt, 'msvcrt.dll'
        import kernel, ExitProcess, 'ExitProcess'
        import msvcrt, printf, 'printf', getch, '_getch'