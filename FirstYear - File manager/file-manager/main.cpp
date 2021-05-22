#include "FileManager.h"
#include <conio.h>


void KeyEventProc(const KEY_EVENT_RECORD &ker)
{
    SetConsoleCursorPosition(GUI::console_handle_, {100, 100});
    if (!ker.bKeyDown)
    {
        //std::cout << ker.wVirtualKeyCode;
    }
}

void MouseEventProc(const MOUSE_EVENT_RECORD &mer)
{
    switch (mer.dwEventFlags)
    {
        case 0:

            if (mer.dwButtonState == FROM_LEFT_1ST_BUTTON_PRESSED)
            {
                SetConsoleCursorPosition(GUI::console_handle_, {0, 28});
                //std::cout << "                                   ";
                SetConsoleCursorPosition(GUI::console_handle_, {0, 28});
                //std::cout << (mer.dwMousePosition.X) << " " << mer.dwMousePosition.Y;
            }
            break;
        case DOUBLE_CLICK:
            SetConsoleCursorPosition(GUI::console_handle_, {0, 28});
            //std::cout << "                                   ";
            SetConsoleCursorPosition(GUI::console_handle_, {0, 28});
            //std::cout << ("double click ") << mer.dwMousePosition.X << " " << mer.dwMousePosition.Y;
            break;
    }
}


int main()
{
    FileManager::Launch();

    SetConsoleCursorPosition(GUI::console_handle_, {0, 28});

    auto handle_stdin = HANDLE();
    auto fdwSaveOldMode = DWORD();

    auto input_records_number = DWORD(), fdwMode = DWORD(), i = DWORD();
    const size_t kInputRecordBufferSize = 128;
    INPUT_RECORD input_record_buffer[kInputRecordBufferSize];

    // Get the standard input handle.
    handle_stdin = GetStdHandle(STD_INPUT_HANDLE);

    // Save the current input mode, to be restored on exit.
    GetConsoleMode(handle_stdin, &fdwSaveOldMode);

    // Enable the window and mouse input events.

    fdwMode = ENABLE_MOUSE_INPUT | ENABLE_INSERT_MODE;
    SetConsoleMode(handle_stdin, fdwMode);

    // Loop to read and handle the next 500 input events.

    while (true)
    {
        ReadConsoleInput(handle_stdin, input_record_buffer, kInputRecordBufferSize,
                         &input_records_number); // number of records read

        // Dispatch the events to the appropriate handler.
        SetConsoleCursorPosition(GUI::console_handle_, {0, 28});
        for (size_t counter = 0; counter < input_records_number; ++counter)
            switch (input_record_buffer[i].EventType)
            {
                case KEY_EVENT: // keyboard input
                    SetConsoleCursorPosition(GUI::console_handle_, {0, 28});
                    KeyEventProc(input_record_buffer[i].Event.KeyEvent);
                    break;

                case MOUSE_EVENT: // mouse input
                    SetConsoleCursorPosition(GUI::console_handle_, {0, 28});
                    MouseEventProc(input_record_buffer[i].Event.MouseEvent);
                    break;
            }

    }

    // Restore input mode on exit.
    SetConsoleMode(handle_stdin, fdwSaveOldMode);

    getch();
    return 0;
}



