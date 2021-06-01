#include "events_controller.h"

void EventsController::RunEventLoop()
{
    const size_t kInputRecordBufferSize = 128;

    auto fdwSaveOldMode = DWORD(), input_records_number = DWORD(), i = DWORD();
    INPUT_RECORD input_record_buffer[kInputRecordBufferSize];

    auto handle_stdin = GetStdHandle(STD_INPUT_HANDLE);
    GetConsoleMode(handle_stdin, &fdwSaveOldMode);

    auto fdwMode = ENABLE_MOUSE_INPUT | ENABLE_INSERT_MODE;
    SetConsoleMode(handle_stdin, fdwMode);

    while (true)
    {
        ReadConsoleInput(handle_stdin, input_record_buffer, kInputRecordBufferSize, &input_records_number);

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

void EventsController::ProcessSelection()
{
    if (AppState::currently_rendered_files_list.at(AppState::current_position).status().type() ==
        std::filesystem::file_type::directory)
    {
        AppState::Move(AppState::currently_rendered_files_list.at(AppState::current_position).path().string());
        GUI::RenderBody();
        GUI::RenderFooter();
    }
    else if (AppState::currently_rendered_files_list.at(AppState::current_position).status().type() ==
             std::filesystem::file_type::regular)
    {
        ShellExecute(HWND(), "open",
                     AppState::currently_rendered_files_list.at(AppState::current_position).path().string().c_str(),
                     NULL, NULL, SW_SHOWNORMAL);
    }
}

void EventsController::ArrowBackPressed(const MOUSE_EVENT_RECORD &mouse_event)
{
    if (mouse_event.dwMousePosition.Y == 0 && mouse_event.dwMousePosition.Y >= 0 && mouse_event.dwMousePosition.X <= 2)
        if (AppState::GoBack())
        {
            GUI::RenderBody();
            GUI::RenderFooter();
        }
}

void EventsController::ProcessKeyMainGUI(const KEY_EVENT_RECORD &key_event)
{
    switch (key_event.wVirtualKeyCode)
    {
        case 38: // Up
            GUI::MoveSelection(-1);
            break;
        case 40: // Down
            GUI::MoveSelection(1);
            break;

        case 13: // Enter
            EventsController::ProcessSelection();
            break;
        case 8: // BackSpace
            if (AppState::GoBack())
            {
                GUI::RenderBody();
                GUI::RenderFooter();
            }
            break;
        case 46: // Delete
            if (AppState::currently_rendered_files_list.at(AppState::current_position) != AppState::files_list.at(0))
                ModalDelete::Launch(AppState::currently_rendered_files_list.at(AppState::current_position),
                                    std::filesystem::path(AppState::current_directory));
            break;
        case 107: // +
            ModalCreate::Launch(AppState::current_directory);
            break;
    }
}

void EventsController::ProcessKeyModalCreate(const KEY_EVENT_RECORD &key_event)
{
    switch (key_event.wVirtualKeyCode)
    {
        case 37: // Left
            ModalCreate::MoveSelection(ModalCreate::currently_selected - 1);
            break;
        case 39: // Right
            ModalCreate::MoveSelection(ModalCreate::currently_selected + 1);
            break;
        case 13: // Enter//
            ModalCreate::ProcessChoice();
            break;
        case 8: // BackSpace
            ModalCreate::UpdateNewFileName(13);
            break;
        case 27: //Escape
            ModalCreate::Close();
            break;
        case 65 ... 90:
            ModalCreate::UpdateNewFileName(static_cast<size_t>(key_event.wVirtualKeyCode));
            break;
    }
}

void EventsController::ProcessKeyModalDelete(const KEY_EVENT_RECORD &key_event)
{
    switch (key_event.wVirtualKeyCode)
    {
        case 37: // Left
            ModalDelete::MoveSelection(ModalDelete::currently_selected - 1);
            break;
        case 39: // Right
            ModalDelete::MoveSelection(ModalDelete::currently_selected + 1);
            break;
        case 13: // Enter
            ModalDelete::ProcessChoice();
            break;
        case 8: // BackSpace
            ModalDelete::Close();
            break;
        case 27: //Escape
            ModalDelete::Close();
            break;
    }
}

void EventsController::ProcessKeyEvent(const KEY_EVENT_RECORD &key_event)
{
    if (!key_event.bKeyDown)
        return;

    if (ModalDelete::IsLaunched())
        EventsController::ProcessKeyModalDelete(key_event);
    else if (ModalCreate::IsLaunched())
        EventsController::ProcessKeyModalCreate(key_event);
    else
        EventsController::ProcessKeyMainGUI(key_event);
}


void EventsController::ProcessMouseMain(const MOUSE_EVENT_RECORD &)
{
    switch (mouse_event.dwEventFlags)
    {
        case 0:
            if (mouse_event.dwButtonState == FROM_LEFT_1ST_BUTTON_PRESSED)
            {
                EventsController::ArrowBackPressed(mouse_event);
                GUI::MoveSelection((mouse_event.dwMousePosition.Y - 3) - (int) AppState::current_position);
            }
            break;
        case DOUBLE_CLICK:
            if (mouse_event.dwButtonState == FROM_LEFT_1ST_BUTTON_PRESSED &&
                AppState::currently_rendered_with_coordinates.contains(mouse_event.dwMousePosition.Y))
                EventsController::ProcessSelection();
            break;
        case MOUSE_WHEELED:
            if (static_cast<size_t>(HIWORD(mouse_event.dwButtonState)) == 120)
                GUI::MoveSelection(-1);
            else
                GUI::MoveSelection(1);
            break;
    }
}

void EventsController::ProcessMouseModalDelete(const MOUSE_EVENT_RECORD &mouse_event)
{
    switch (mouse_event.dwEventFlags)
    {
        case 0:
            ModalDelete::ComputeSingleMouseClick(mouse_event.dwMousePosition.Y, mouse_event.dwMousePosition.X);
            break;
        case DOUBLE_CLICK:
            ModalDelete::ComputeDoubleMouseClick(mouse_event.dwMousePosition.Y, mouse_event.dwMousePosition.X);
            break;
    }
}

void EventsController::ProcessMouseModalCreate(const MOUSE_EVENT_RECORD &mouse_event)
{
    switch (mouse_event.dwEventFlags)
    {
        case 0:
            ModalCreate::ComputeSingleMouseClick(mouse_event.dwMousePosition.Y, mouse_event.dwMousePosition.X);
            break;
        case DOUBLE_CLICK:
            ModalCreate::ComputeDoubleMouseClick(mouse_event.dwMousePosition.Y, mouse_event.dwMousePosition.X);
            break;
    }
}

void EventsController::ProcessMouseEvent(const MOUSE_EVENT_RECORD &mouse_event)
{
    if (ModalDelete::IsLaunched())
        EventsController::ProcessMouseModalDelete(mouse_event);
    else if (ModalCreate::IsLaunched())
        EventsController::ProcessMouseModalCreate(mouse_event);
    else
        EventsController::ProcessMouseMain(mouse_event);
}