#include "FileManagerGUI.h"


std::string GUI::kWindowTitle = "Console File Manager";

size_t GUI::console_width_;
const size_t GUI::console_height_;

HANDLE GUI::console_handle_;
CONSOLE_SCREEN_BUFFER_INFO GUI::console_info_;

Theme GUI::kTheme;

const size_t GUI::kMenuItemsCount;
const std::string GUI::kMenuItemsTitles[] = {"Quit", "Choose", "Move"};
const std::string GUI::kMenuItemsKeys[] = {"ESC", "ENTER", "ARROWS: UP, DOWN"};

const size_t GUI::kHeaderMarginTop;
const size_t GUI::kHeaderPaddingBottom;
const size_t GUI::kBodyInfoMarginTop;
const size_t GUI::kBodyInfoPaddingBottom;
const size_t GUI::kBodyFilesMarginTop;
const size_t GUI::kBodyFilesPaddingLeft;


void GUI::ResizeConsole()
{
    GUI::console_handle_ = GetStdHandle(STD_OUTPUT_HANDLE);
    GetConsoleScreenBufferInfo(GUI::console_handle_, &GUI::console_info_);
    GUI::console_width_ = GUI::console_info_.dwSize.X;
    SetConsoleScreenBufferSize(GUI::console_handle_, {(short) GUI::console_width_, (short) GUI::console_height_});
}

void GUI::ChangeConsoleBackground()
{
    GUI::ChangeConsoleColors(GUI::kTheme.background_main, GUI::kTheme.foreground_main);
    for (size_t row = 0; row < GUI::console_height_; ++row)
        for (size_t col = 0; col < GUI::console_width_; ++col)
            GUI::PrintByCoordinate(col, row, ' ');
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

    GUI::ResizeConsole();

    GUI::ChangeConsoleBackground();

    GUI::HideCursor();
}

void GUI::MoveToCoordinate(const size_t &x, const size_t &y)
{
    SetConsoleCursorPosition(GUI::console_handle_, {(short) x, (short) y});
}

void GUI::PrintByCoordinate(const size_t &x, const size_t &y, const char *text)
{
    GUI::MoveToCoordinate(x, y);
    printf("%s", text);
}

void GUI::PrintByCoordinate(const size_t &x, const size_t &y, const char &symbol)
{
    GUI::MoveToCoordinate(x, y);
    printf("%c", symbol);
}

void GUI::ChangeConsoleColors(const Color &background, const Color &foreground)
{
    SetConsoleTextAttribute(GUI::console_handle_,
                            (WORD) ((static_cast<int>(background) << 4) | static_cast<int>(foreground)));
}

void GUI::RenderDirectoryItemsList(const std::filesystem::directory_iterator &list)
{
    auto first = GUI::kTheme.background_main, second = Color::Yellow;
    size_t counter = 1;

    GUI::MoveToCoordinate(0,
                          GUI::kHeaderMarginTop + GUI::kHeaderPaddingBottom + GUI::kBodyInfoMarginTop +
                          GUI::kBodyInfoMarginTop + GUI::kBodyInfoPaddingBottom + GUI::kBodyFilesMarginTop);
    for (const auto &item : list)
    {
        (counter++ % 2 == 0) ? (GUI::ChangeConsoleColors(first, GUI::kTheme.foreground_main))
                             : (GUI::ChangeConsoleColors(
                second, GUI::kTheme.foreground_main));
        std::cout << std::setw(GUI::console_width_ - 2) << std::left << item.path().filename() << '\n';
    }
}


void GUI::RenderHeader()
{
    size_t precision = GUI::console_width_ / GUI::kMenuItemsCount;

    GUI::MoveToCoordinate(0, GUI::kHeaderMarginTop);

    for (size_t counter = 0; counter < GUI::kMenuItemsCount; ++counter)
    {
        GUI::ChangeConsoleColors(GUI::kTheme.background_accent, GUI::kTheme.foreground_accent);
        size_t precision1 = GUI::kMenuItemsKeys[counter].size() + 2;
        std::cout << std::setw(precision1) << (" " + GUI::kMenuItemsKeys[counter] + " ");
        size_t precision2 = precision - precision1;
        GUI::ChangeConsoleColors(GUI::kTheme.background_main, GUI::kTheme.foreground_main);
        std::cout << std::setw(precision2) << std::left << (" " + GUI::kMenuItemsTitles[counter] + " ");
    }

    GUI::DrawHorizontalBorder(GUI::kHeaderPaddingBottom + GUI::kHeaderMarginTop, 0, GUI::console_width_ - 1);
}

void GUI::RenderBody(const AppState &state, const std::filesystem::directory_iterator &files)
{
    GUI::ChangeConsoleColors(GUI::kTheme.background_main, GUI::kTheme.foreground_main);

    size_t left_padding = GUI::console_width_ / 2 - state.current_directory.size() / 2;

    GUI::MoveToCoordinate(left_padding, GUI::kHeaderMarginTop + GUI::kHeaderPaddingBottom + GUI::kBodyInfoMarginTop);

    std::cout << state.current_directory;

    GUI::DrawHorizontalBorder(
            GUI::kHeaderMarginTop + GUI::kHeaderPaddingBottom + GUI::kBodyInfoMarginTop + GUI::kBodyInfoMarginTop, 0,
            GUI::console_width_ - 1);

    GUI::RenderDirectoryItemsList(files);
}


void GUI::Render()
{
    GUI::ConfigureConsoleWindow();
    GUI::RenderHeader();
    GUI::HideCursor();
}

void GUI::DrawHorizontalBorder(const size_t &y, const size_t &x_start, const size_t &x_finish)
{
    GUI::MoveToCoordinate(x_start, y);
    for (size_t counter = x_start; counter <= x_finish; ++counter)
        std::cout << '-';
}

void GUI::SetTheme(const Theme &new_theme)
{
    GUI::kTheme = new_theme;
}
