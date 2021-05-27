#include "file_manager_GUI.h"


const std::string GUI::kWindowTitle = "Console File Manager";

const std::string GUI::kFirstLineTexture = "═";
const std::string GUI::kSecondLineTexture = "—";

const size_t GUI::kMenuItemsCount;
const std::string GUI::kMenuItemsTitles[] = {"Quit", "Choose", "Move"};
const std::string GUI::kMenuItemsKeys[] = {"ESC", "ENTER", "UP, DOWN"};
const size_t GUI::kColumnsCount;
const std::array<const std::string, GUI::kColumnsCount> GUI::kColumnsTitles = {"Name", "Extension", "Size", "Type"};
const std::array<const size_t, GUI::kColumnsCount> GUI::kColumnsPrecisions = {2, 1, 1, 1};

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
    GUI::MoveToCoordinate(0, 1);
    GUI::SetConsoleColors(GUI::kTheme.body_background, Color::LightMagenta);

    for (size_t counter = 0; counter < GUI::kColumnsCount; ++counter)
        std::cout << std::setw(GUI::console_width_ * GUI::kColumnsPrecisions.at(counter) / 5)
                  << std::left << GUI::kColumnsTitles.at(counter);

    GUI::SetConsoleColors(GUI::kTheme.body_background, GUI::kTheme.body_foreground);
    GUI::MoveToCoordinate(0, 2);
    for (size_t counter = 0; counter < GUI::console_width_; ++counter)
        std::cout << GUI::kSecondLineTexture;
}

void GUI::RenderBodyDynamicPath()
{
    GUI::MoveToCoordinate(0, 0);
    GUI::SetConsoleColors(GUI::kTheme.body_background, GUI::kTheme.body_foreground);
    for (size_t counter = 0; counter < GUI::console_width_; ++counter)
        std::cout << GUI::kFirstLineTexture;

    std::string path = CutDirectoryString(AppState::current_directory, GUI::kMaxPathLength);
    size_t left_margin = GUI::console_width_ / 2 - (path.size() + 2) / 2;
    GUI::MoveToCoordinate(left_margin, 0);
    GUI::SetConsoleColors(GUI::kTheme.body_background_accent, GUI::kTheme.body_foreground_accent);
    std::cout << ' ' << path << ' ';
}

void GUI::RenderBodySingleFileLine(const std::filesystem::directory_entry &file)
{
    std::cout << std::setw(GUI::kColumnsPrecisions.at(0) * GUI::console_width_ / 5) << std::left
              << (" " + file.path().filename().string());
    std::cout << std::setw(GUI::kColumnsPrecisions.at(1) * GUI::console_width_ / 5) << std::left
              << file.path().extension().string();
    std::cout << std::setw(GUI::kColumnsPrecisions.at(2) * GUI::console_width_ / 5) << std::left
              << (file.path().extension().string() != "" ? (std::to_string(file.file_size() / 1024) + " KB") : "");
    std::cout << std::setw(GUI::kColumnsPrecisions.at(3) * GUI::console_width_ / 5) << std::left
              << FileTypeToString(file.status().type());
}

void GUI::RenderBodyDynamicFilesList()
{
    GUI::PaintBodyBackground();

    AppState::currently_rendered_with_coordinates.clear();

    GUI::SetConsoleColors(GUI::kTheme.body_background, Color::DarkGray);
    GUI::MoveToCoordinate(0, 3);

    size_t counter = 0;
    for (const auto &file : AppState::currently_rendered_files_list)
    {
        AppState::currently_rendered_with_coordinates.insert(std::make_pair(3 + counter, file));

        if (counter == AppState::current_position)
            GUI::SetConsoleColors(GUI::kTheme.body_background_accent, GUI::kTheme.body_foreground_accent);
        else
            GUI::SetConsoleColors(GUI::kTheme.body_background, GUI::kTheme.body_foreground);

        GUI::RenderBodySingleFileLine(file);

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
    GUI::RenderBodyDynamicFilesList();
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

    GUI::RunEventLoop();
}


void GUI::ProcessKeyEvent(const KEY_EVENT_RECORD &ker)
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

void GUI::ProcessMouseEvent(const MOUSE_EVENT_RECORD &mer)
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

void GUI::RunEventLoop()
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
                    GUI::ProcessKeyEvent(input_record_buffer[i].Event.KeyEvent);
                    break;

                case MOUSE_EVENT:
                    GUI::ProcessMouseEvent(input_record_buffer[i].Event.MouseEvent);
                    break;
            }
    }

    SetConsoleMode(handle_stdin, fdwSaveOldMode);
}

void GUI::ChangeSelection(const size_t &previous, const size_t &current)
{
    GUI::MoveToCoordinate(0, 3 + previous);
    GUI::SetConsoleColors(GUI::kTheme.body_background, GUI::kTheme.body_foreground);
    GUI::RenderBodySingleFileLine(AppState::currently_rendered_with_coordinates[3 + previous]);

    GUI::MoveToCoordinate(0, 3 + current);
    GUI::SetConsoleColors(GUI::kTheme.body_background_accent, GUI::kTheme.body_foreground_accent);
    GUI::RenderBodySingleFileLine(AppState::currently_rendered_with_coordinates[3 + current]);
}

void GUI::MoveSelection(const short &delta)
{
    if (AppState::current_position + delta >= AppState::render_from &&
        AppState::current_position + delta <= AppState::render_to)
    {
        auto prev = AppState::current_position;
        auto curr = AppState::current_position + delta;
        AppState::current_position = curr;
        GUI::ChangeSelection(prev, curr);
    }
}
