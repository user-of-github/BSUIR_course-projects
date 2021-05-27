#include "file_manager_events_controller.h"

void EventsController::ProcessKeyEvent(const KEY_EVENT_RECORD &ker)
{
    if (ker.bKeyDown)
    {
        switch (ker.wVirtualKeyCode)
        {
            case 38:
                GUI::MoveSelection(-1);
                break;
            case 40:
                GUI::MoveSelection(1);
                break;
            case 13:
                if (AppState::currently_rendered_files_list[AppState::current_position].status().type() ==
                    std::filesystem::file_type::directory)
                {
                    AppState::Move(AppState::currently_rendered_files_list[AppState::current_position].path().string());
                    GUI::RenderBody();
                    GUI::RenderFooter();
                }
                break;
            case 8:
                if (AppState::GoBack())
                {
                    GUI::RenderBody();
                    GUI::RenderFooter();
                }
                break;
        }
    }
}

void EventsController::ProcessMouseEvent(const MOUSE_EVENT_RECORD &mer)
{
    switch (mer.dwEventFlags)
    {
        case 0:
            if (mer.dwButtonState == FROM_LEFT_1ST_BUTTON_PRESSED)
                GUI::MoveSelection((mer.dwMousePosition.Y - 3) - (int) AppState::current_position);
            break;
        case DOUBLE_CLICK:
            if (AppState::currently_rendered_with_coordinates.contains(mer.dwMousePosition.Y) &&
                AppState::currently_rendered_with_coordinates.at(mer.dwMousePosition.Y).status().type() ==
                std::filesystem::file_type::directory)
            {
                AppState::Move(AppState::currently_rendered_with_coordinates.at(mer.dwMousePosition.Y).path().string());
                GUI::RenderBody();
                GUI::RenderFooter();
            }
            break;
    }
}

void EventsController::RunEventLoop()
{
    auto fdwSaveOldMode = DWORD();

    auto input_records_number = DWORD(), fdwMode = DWORD(), i = DWORD();
    const size_t kInputRecordBufferSize = 128;
    INPUT_RECORD input_record_buffer[kInputRecordBufferSize];

    // Get the standard input handle.
    auto handle_stdin = GetStdHandle(STD_INPUT_HANDLE);

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

        for (size_t counter = 0; counter < input_records_number; ++counter)
            switch (input_record_buffer[i].EventType)
            {
                case KEY_EVENT:
                    EventsController::ProcessKeyEvent(input_record_buffer[i].Event.KeyEvent);
                    break;

                case MOUSE_EVENT:
                    EventsController::ProcessMouseEvent(input_record_buffer[i].Event.MouseEvent);
                    break;
            }
    }

    SetConsoleMode(handle_stdin, fdwSaveOldMode);
}