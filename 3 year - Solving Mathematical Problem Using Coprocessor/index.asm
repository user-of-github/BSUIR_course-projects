.386

.MODEL SMALL

.STACK 256


DATA SEGMENT
    test_variable dw 10
DATA ENDS


CODE SEGMENT use16
    assume cs: CODE, ds: DATA

    MAIN proc
        main_preparations:
            mov ax, DATA
            mov ds, ax
        
        main_body:
            xor ax, ax
            mov ax, test_variable ; test
            call print_signed_number

        main_finish:
            mov ah, 04ch
            int 21h
    
    endp ; MAIN


    ; functions
    print_signed_number proc ; number must be in AX
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
            int 21h
            loop print_digits
        ret

    endp ; print_signed_number

CODE ENDS

END MAIN ; main()