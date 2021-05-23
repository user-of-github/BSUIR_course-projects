#include "FileManagerGUI.h"


const std::string GUI::kWindowTitle = "Console File Manager";

const std::string GUI::kFirstLineTexture = "═";
const std::string GUI::kSecondLineTexture = "—";

const size_t GUI::kMenuItemsCount;
const std::string GUI::kMenuItemsTitles[] = {"Quit", "Choose", "Move"};
const std::string GUI::kMenuItemsKeys[] = {"ESC", "ENTER", "UP, DOWN"};

const size_t GUI::kFooterStartPositionFromBottom;

size_t GUI::kMaxPathLength;
size_t GUI::kMaximumMenuItemLength;

size_t GUI::console_width_;
const size_t GUI::console_height_;

HANDLE GUI::console_handle_;
CONSOLE_SCREEN_BUFFER_INFO GUI::console_info_;

bool GUI::was_first_render_ = false;

Theme GUI::kTheme;

void GUI::ResizeConsole()
{
    GUI::console_handle_ = GetStdHandle(STD_OUTPUT_HANDLE);
    GetConsoleScreenBufferInfo(GUI::console_handle_, &GUI::console_info_);

    GUI::console_width_ = GUI::console_info_.dwSize.X;
    SetConsoleScreenBufferSize(GUI::console_handle_, {(short) GUI::console_width_, (short) GUI::console_height_});

    SetWindowLong(GetConsoleWindow(), GWL_STYLE,
                  GetWindowLong(GetConsoleWindow(), GWL_STYLE) & ~WS_MAXIMIZEBOX & ~WS_SIZEBOX);

    GUI::kMaxPathLength = GUI::console_width_ / 2;
}

void GUI::HideCursor()
{
    auto cursor = CONSOLE_CURSOR_INFO();
    cursor.bVisible = false;
    cursor.dwSize = 20;
    SetConsoleCursorInfo(GUI::console_handle_, &cursor);
}


void GUI::ConfigureConsoleWindow()
{
    SetConsoleOutputCP(CP_UTF8);
    SetConsoleCP(CP_UTF8);

    SetConsoleTitle(GUI::kWindowTitle.c_str());
    GUI::ResizeConsole();
    GUI::HideCursor();
}

void GUI::MoveToCoordinate(const size_t &x, const size_t &y)
{
    SetConsoleCursorPosition(GUI::console_handle_, {(short) x, (short) y});
}

void GUI::SetConsoleColors(const Color &back, const Color &fore)
{
    SetConsoleTextAttribute(GUI::console_handle_, (WORD) ((static_cast<int>(back) << 4) | static_cast<int>(fore)));
}

void GUI::PaintBackground(const size_t &y_start, const size_t &x_start, const size_t &y_end, const size_t &x_end,
                          const Color &background)
{
    GUI::MoveToCoordinate(x_start, y_start);
    GUI::SetConsoleColors(background, GUI::kTheme.footer_foreground);

    for (size_t y = y_start; y <= y_end; ++y)
    {
        for (size_t x = x_start; x <= x_end; ++x)
        {
            GUI::MoveToCoordinate(x, y);
            std::cout << ' ';
        }
    }
}

void GUI::PaintFooterBackground()
{
    GUI::PaintBackground(GUI::console_height_ - GUI::kFooterStartPositionFromBottom, 0,
                         GUI::console_height_ - 1, GUI::console_width_ - 1,
                         GUI::kTheme.footer_background);
}

void GUI::PaintBodyBackground()
{
    GUI::PaintBackground(3, 0,
                         GUI::console_height_ - GUI::kFooterStartPositionFromBottom - 2, console_width_ - 1,
                         GUI::kTheme.body_background);
}

void GUI::RenderFooterFixedInterface()
{
    GUI::MoveToCoordinate(0, GUI::console_height_ - 1);

    size_t precision = GUI::console_width_ / GUI::kMenuItemsCount - 1;
    size_t counter = 0;

    for (const auto &key : GUI::kMenuItemsKeys)
    {
        GUI::SetConsoleColors(GUI::kTheme.footer_background, GUI::kTheme.footer_foreground);
        std::cout << std::setw(key.size()) << key;

        GUI::SetConsoleColors(GUI::kTheme.footer_background_accent, GUI::kTheme.footer_foreground_accent);
        std::cout << std::setw(GUI::kMaximumMenuItemLength) << GUI::kMenuItemsTitles[counter++];

        GUI::SetConsoleColors(GUI::kTheme.footer_background, GUI::kTheme.footer_foreground);
        std::cout << std::setw(precision - GUI::kMaximumMenuItemLength - key.size()) << ' ';
    }
}

void GUI::RenderBodyFixedInterface()
{
    GUI::MoveToCoordinate(0, 0);
    GUI::SetConsoleColors(GUI::kTheme.body_background, GUI::kTheme.body_foreground);
    for (size_t counter = 0; counter < GUI::console_width_; ++counter)
        std::cout << GUI::kFirstLineTexture;

    GUI::MoveToCoordinate(0, 1);
    GUI::SetConsoleColors(GUI::kTheme.body_background, Color::LightMagenta);
    std::cout << std::setw(2 * GUI::console_width_ / 5) << std::left << "Name";
    std::cout << std::setw(GUI::console_width_ / 5) << std::left << "Extension";
    std::cout << std::setw(GUI::console_width_ / 5) << std::left << "Size";
    std::cout << std::setw(GUI::console_width_ / 5) << std::left << "Type";


    GUI::SetConsoleColors(GUI::kTheme.body_background, GUI::kTheme.body_foreground);
    GUI::MoveToCoordinate(0, 2);
    for (size_t counter = 0; counter < GUI::console_width_; ++counter)
        std::cout << GUI::kSecondLineTexture;
}

void GUI::RenderBodyDynamicPath()
{
    std::string path = CutDirectoryString(AppState::current_directory, GUI::kMaxPathLength);
    size_t left_margin = GUI::console_width_ / 2 - (path.size() + 2) / 2;
    GUI::MoveToCoordinate(left_margin, 0);
    GUI::SetConsoleColors(GUI::kTheme.body_background_accent, GUI::kTheme.body_foreground_accent);
    std::cout << ' ' << path << ' ';
}

void GUI::RenderBodyDinamicFilesList()
{
    GUI::PaintBodyBackground();
    size_t counter = 0;

    AppState::currently_rendered_list.clear();

    GUI::SetConsoleColors(GUI::kTheme.body_background, Color::DarkGray);
    GUI::MoveToCoordinate(0, 3);

    for (const auto &file : AppState::files_list)
    {
        if (counter >= AppState::render_from && counter <= AppState::render_to)
        {
            AppState::currently_rendered_list.insert(std::make_pair(3 + counter, file));

            if (counter == AppState::current_position)
                GUI::SetConsoleColors(GUI::kTheme.body_background_accent, GUI::kTheme.body_foreground_accent);
            else
                GUI::SetConsoleColors(GUI::kTheme.body_background, GUI::kTheme.body_foreground);

            std::cout << std::setw(2 * GUI::console_width_ / 5) << std::left << (" " + file.path().filename().string());
            std::cout << std::setw(GUI::console_width_ / 5) << std::left << file.path().extension().string();
            std::cout << std::setw(GUI::console_width_ / 5) << std::left
                      << (file.path().extension().string() != "" ? (std::to_string(file.file_size() / 1024) + " KB")
                                                                 : "");
            std::cout << std::setw(GUI::console_width_ / 5) << std::left << FileTypeToString(file.status().type());
        }
        ++counter;
    }
}

void GUI::SetTheme(const Theme &new_theme)
{
    GUI::kTheme = new_theme;
}

void GUI::RenderBody()
{
    if (GUI::was_first_render_ == false)
        GUI::RenderBodyFixedInterface();

    GUI::RenderBodyDynamicPath();
    GUI::RenderBodyDinamicFilesList();
}

void GUI::RenderFooter()
{
    if (!GUI::was_first_render_)
        GUI::PaintFooterBackground();

    GUI::MoveToCoordinate(0, GUI::console_height_ - GUI::kFooterStartPositionFromBottom);
    GUI::SetConsoleColors(GUI::kTheme.footer_background, GUI::kTheme.footer_foreground);
    std::cout << CutDirectoryString(AppState::current_directory, GUI::kMaxPathLength) << '>';

    if (!GUI::was_first_render_)
        GUI::RenderFooterFixedInterface();
}

void GUI::Launch()
{
    GUI::kMaximumMenuItemLength = GetMaximumWordLength(GUI::kMenuItemsTitles, GUI::kMenuItemsCount) + 2;

    GUI::ConfigureConsoleWindow();
    GUI::PaintBackground(0, 0, GUI::console_height_ - 1, GUI::console_width_ - 1, GUI::kTheme.body_background);
    GUI::RenderFooter();
    GUI::RenderBody();
    GUI::was_first_render_ = true;

    RunEventLoop(GUI::console_handle_);
}


void KeyEventProc(const KEY_EVENT_RECORD &ker, HANDLE &handle)
{
    SetConsoleCursorPosition(handle, {100, 100});
    if (ker.bKeyDown)
    {
        if (ker.wVirtualKeyCode == 38)
        {
            if (AppState::current_position > 0)
            {
                --AppState::current_position;
                GUI::RenderBody();
            }


        } else if (ker.wVirtualKeyCode == 40)
        {
            if (AppState::current_position < AppState::render_to)
            {
                ++AppState::current_position;
                GUI::RenderBody();
            }
        }
    }
}

void MouseEventProc(const MOUSE_EVENT_RECORD &mer, HANDLE &handle)
{
    switch (mer.dwEventFlags)
    {
        case 0:
            if (mer.dwButtonState == FROM_LEFT_1ST_BUTTON_PRESSED)
            {
                SetConsoleCursorPosition(handle, {0, 28});
                SetConsoleCursorPosition(handle, {0, 28});
            }
            break;
        case DOUBLE_CLICK:
        {
            if (AppState::currently_rendered_list.contains(mer.dwMousePosition.Y) &&
                AppState::currently_rendered_list.at(mer.dwMousePosition.Y).status().type() ==
                std::filesystem::file_type::directory)
            {
                AppState::UpdateDirectory(AppState::currently_rendered_list.at(mer.dwMousePosition.Y).path().string());
                GUI::RenderBody();
                GUI::RenderFooter();
            }
        }
    }
}

void RunEventLoop(HANDLE &handle)
{
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
        SetConsoleCursorPosition(handle, {0, 28});
        for (size_t counter = 0; counter < input_records_number; ++counter)
            switch (input_record_buffer[i].EventType)
            {
                case KEY_EVENT: // keyboard input
                    SetConsoleCursorPosition(handle, {0, 28});
                    KeyEventProc(input_record_buffer[i].Event.KeyEvent, handle);
                    break;

                case MOUSE_EVENT: // mouse input
                    SetConsoleCursorPosition(handle, {0, 28});
                    MouseEventProc(input_record_buffer[i].Event.MouseEvent, handle);
                    break;
            }

    }

    // Restore input mode on exit.
    SetConsoleMode(handle_stdin, fdwSaveOldMode);
}