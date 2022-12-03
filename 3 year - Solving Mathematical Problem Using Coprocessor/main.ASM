FORMAT PE Console

ENTRY main

INCLUDE 'win32a.inc'

SECTION '.data' data readable writeable
        hello db 'hello world!', 0
        number_to_print dw 65
        number dw ?

SECTION '.code' code readable writeable executable
        main:
                mov ax, [number_to_print]
                stdcall myproc
                invoke getch
                invoke ExitProcess, 0


SECTION '.idata' data import readable
        library kernel, 'kernel32.dll',msvcrt, 'msvcrt.dll'
        import kernel, ExitProcess, 'ExitProcess'
        import msvcrt,printf, 'printf', getch, '_getch'


proc myproc
action_for_negative_numbers:
            cmp ax, 0
            jge output_preparation ; if (ax > 0) goto count_digits
            neg ax ; ax = (-1) * ax
            mov bx, ax ; save ax, because we need ah (part of ax) for output '-'
            mov ah, 02h
            mov dl, '-'
            int 21h
            mov ax, bx ; restore it. We can do it with stack, but MOV for registers is much faster
        
        output_preparation:
            xor cx, cx ; <=> mov cx, 0
            xor dx, dx ; <=> mov dx, 0
            xor bx, bx
            mov bx, 10 ; for dividing on bxs
        
        count_digits:
            div bx ; div <=> (dx+ax) / 10 => num / 10 -> ax, num % 10 -> dx
            push dx ; remember received digit
            xor dx, dx ; made dx = 0
            inc cx ; increased counter of digits
            test ax, ax ; ax === 0 ?
            jnz count_digits ; if yes, will repeat and get another digit

        before_print:
            mov ah, 02h
            
        print_digits:
            pop dx
            add dx, 30h
            mov [number], dx
            invoke printf, number
            loop print_digits
endp