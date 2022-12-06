

FORMAT PE Console

ENTRY main

INCLUDE 'win32a.inc'


SECTION '.data' data readable writeable
        minus db '-', 0 ; 0 => string end
        digit_temp dd 65
        temp dd 0


SECTION '.code' code readable writeable executable
        main:
                stdcall print_signed_integer, -27766889

                invoke getch
                invoke ExitProcess, 0

proc print_signed_integer, number
        mov eax, [number]

        action_for_negative_numbers:
            cmp eax, 0
            jge output_preparation ; if (ax > 0) goto count_digits
            neg eax ; ax = (-1) * ax
            mov [temp], eax ; printf spoils registers => need to remember EAX
            invoke printf, minus
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


SECTION '.idata' data import readable
        library kernel, 'kernel32.dll',msvcrt, 'msvcrt.dll'
        import kernel, ExitProcess, 'ExitProcess'
        import msvcrt,printf, 'printf', getch, '_getch'