#include "FileManagerGUI.h"


std::string GUI::kWindowTitle = "Console File Manager";

size_t GUI::console_width_;
const size_t GUI::console_height_;
size_t GUI::kMaxPathLength;

HANDLE GUI::console_handle_;
CONSOLE_SCREEN_BUFFER_INFO GUI::console_info_;

Theme GUI::kTheme;

const size_t GUI::kMenuItemsCount;
const std::string GUI::kMenuItemsTitles[] = {"Quit", "Choose", "Move"};
const std::string GUI::kMenuItemsKeys[] = {"ESC", "ENTER", "UP, DOWN"};

const size_t GUI::kFooterStartPositionFromBottom;
bool GUI::was_first_render_ = false;

size_t GUI::kMaximumMenuItemLength;

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
    auto lpCursor = CONSOLE_CURSOR_INFO();
    lpCursor.bVisible = false;
    lpCursor.dwSize = 20;
    SetConsoleCursorInfo(GUI::console_handle_, &lpCursor);
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

void GUI::Launch()
{
    GUI::kMaximumMenuItemLength = GetMaximumWordLength(GUI::kMenuItemsTitles, GUI::kMenuItemsCount) + 2;

    GUI::ConfigureConsoleWindow();
    GUI::PaintBackground(0, 0, GUI::console_height_ - 1, GUI::console_width_ - 1, GUI::kTheme.body_background);
    GUI::RenderFooter();
    GUI::RenderBody();
    GUI::was_first_render_ = true;
}

void GUI::SetTheme(const Theme &new_theme)
{
    GUI::kTheme = new_theme;
}

void GUI::PaintBackground(const size_t &y_start, const size_t &x_start, const size_t &y_end, const size_t &x_end,
                          const Color &background)
{

    GUI::SetConsoleColors(background, GUI::kTheme.footer_foreground);
    GUI::MoveToCoordinate(x_start, y_start);
    for (size_t y = y_start; y <= y_end; ++y)
        for (size_t x = x_start; x <= x_end; ++x)
        {
            GUI::MoveToCoordinate(x, y);
            std::cout << ' ';
        }
}

void GUI::SetConsoleColors(const Color &back, const Color &fore)
{
    SetConsoleTextAttribute(GUI::console_handle_, (WORD) ((static_cast<int>(back) << 4) | static_cast<int>(fore)));
}

void GUI::PaintFooterBackground()
{
    GUI::PaintBackground(GUI::console_height_ - GUI::kFooterStartPositionFromBottom, 0,
                         GUI::console_height_ - 1, GUI::console_width_ - 1,
                         GUI::kTheme.footer_background);
}

void GUI::RenderFooter()
{
    if (!GUI::was_first_render_)
        GUI::PaintFooterBackground();

    GUI::MoveToCoordinate(0, GUI::console_height_ - GUI::kFooterStartPositionFromBottom);
    GUI::SetConsoleColors(GUI::kTheme.footer_background, GUI::kTheme.footer_foreground);
    std::cout << GUI::CutDirectoryString(AppState::current_directory) << '>';

    if (!GUI::was_first_render_)
        GUI::RenderFooterMenuItems();
}

void GUI::RenderFooterMenuItems()
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

void GUI::RenderBody()
{
    GUI::MoveToCoordinate(0, 0);
    GUI::SetConsoleColors(GUI::kTheme.body_background, GUI::kTheme.body_foreground);
    for (size_t counter = 0; counter < GUI::console_width_; ++counter)
        std::cout << '=';

    std::string path = GUI::CutDirectoryString(AppState::current_directory);
    size_t left_margin = GUI::console_width_ / 2 - (path.size() + 2) / 2;
    GUI::MoveToCoordinate(left_margin, 0);
    GUI::SetConsoleColors(GUI::kTheme.body_background_accent, GUI::kTheme.body_foreground_accent);
    std::cout << ' ' << path << ' ';

    if (!GUI::was_first_render_)
    {
        GUI::MoveToCoordinate(0, 1);
        GUI::SetConsoleColors(GUI::kTheme.body_background, Color::LightMagenta);
        std::cout << std::setw(3 * GUI::console_width_ / 5) << std::left << "Name";
        std::cout << std::setw(GUI::console_width_ / 5) << std::left << "Extension";
        std::cout << std::setw(GUI::console_width_ / 5) << std::left << "Size";
    }

    GUI::SetConsoleColors(GUI::kTheme.body_background, GUI::kTheme.body_foreground);
    GUI::MoveToCoordinate(0, 2);
    for (size_t counter = 0; counter < GUI::console_width_; ++counter)
        std::cout << '-';
    GUI::SetConsoleColors(GUI::kTheme.body_background, Color::DarkGray);
    GUI::MoveToCoordinate(0, 3);

    size_t counter = 0;
    for (const auto &file : AppState::files_list)
    {
        if (counter == AppState::current_position)
            GUI::SetConsoleColors(GUI::kTheme.body_background_accent, GUI::kTheme.body_foreground_accent);
        else
            GUI::SetConsoleColors(GUI::kTheme.body_background, GUI::kTheme.body_foreground);

        if (counter >= AppState::show_from && counter <= AppState::show_to)
        {
            std::cout << std::setw(3 * GUI::console_width_ / 5) << std::left << (" " + file.path().filename().string());
            std::cout << std::setw(GUI::console_width_ / 5) << std::left << file.path().extension().string();
            std::cout << std::setw(GUI::console_width_ / 5) << std::left
                      << (file.path().extension().string() != "" ? (std::to_string(file.file_size() / 1024) + "KB")
                                                                 : "");
        }

        if (counter > AppState::show_to)
            break;
        ++counter;
    }
}

std::string GUI::CutDirectoryString(const std::string &query)
{
    if (query.size() <= GUI::kMaxPathLength)
        return query;

    std::string response;
    response = query;

    size_t index = response.find_first_of('\\') + 1;
    while (response.size() > GUI::kMaxPathLength - 3)
        response.erase(index, 1);

    response.insert(index, "...");

    return response;
}


