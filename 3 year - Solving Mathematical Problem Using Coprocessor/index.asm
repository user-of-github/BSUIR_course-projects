include 'win32ax.inc'

.code

  main:
    invoke  MessageBox, HWND_DESKTOP, "5", invoke GetCommandLine, MB_OK
    invoke  ExitProcess, 0


.end main