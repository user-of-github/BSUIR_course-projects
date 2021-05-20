#include "FileManagerGUI.h"


std::string GUI::kWindowTitle = "Console File Manager";

size_t GUI::console_width_;
const size_t GUI::console_height_;

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

    GUI::ResizeConsole();
    GUI::HideCursor();
}

void GUI::MoveToCoordinate(const size_t &x, const size_t &y)
{
    SetConsoleCursorPosition(GUI::console_handle_, {(short) x, (short) y});
}

void GUI::Launch(const AppState &state)
{
    GUI::kMaximumMenuItemLength = GetMaximumWordLength(GUI::kMenuItemsTitles, GUI::kMenuItemsCount) + 2;

    GUI::ConfigureConsoleWindow();
    GUI::PaintBackground(0, 0, GUI::console_height_ - 1, GUI::console_width_ - 1, GUI::kTheme.body_background);
    GUI::PaintFooterBackground();
    GUI::RenderFooter(state);
    GUI::was_first_render_ = true;
}

void GUI::SetTheme(const Theme &new_theme)
{
    GUI::kTheme = new_theme;
}

void GUI::PaintBackground(const size_t &y_start, const size_t &x_start, const size_t &y_end, const size_t &x_end,
                          const Color &background)
{
    GUI::SetConsoleColors(background, GUI::kTheme.body_foreground);
    for (auto y = y_start; y <= y_end; ++y)
        for (auto x = x_start; x <= x_end; ++x)
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
    GUI::PaintBackground(GUI::console_height_ - 1 - GUI::kFooterStartPositionFromBottom, 0, GUI::console_height_ - 1,
                         GUI::console_width_ - 1, GUI::kTheme.footer_background);
}

void GUI::RenderFooter(const AppState &state)
{
    GUI::MoveToCoordinate(0, GUI::console_height_ - 1 - GUI::kFooterStartPositionFromBottom);
    GUI::SetConsoleColors(GUI::kTheme.footer_background, GUI::kTheme.footer_foreground);
    std::cout << state.current_directory;

    if (!GUI::was_first_render_)
        GUI::RenderFooterMenuItems();
}

void GUI::RenderFooterMenuItems()
{
    GUI::MoveToCoordinate(0, GUI::console_height_ - 1 - GUI::kFooterStartPositionFromBottom + 2);

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


