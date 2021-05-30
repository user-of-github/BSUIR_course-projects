#include "file_manager_GUI.h"


const std::string GUI::kWindowTitle = "Console File Manager";

const std::string GUI::kFirstLineTexture = "═";
const std::string GUI::kSecondLineTexture = "—";
const std::string GUI::kArrowBackTexture = "←";

const size_t GUI::kMenuItemsCount;
const std::string GUI::kMenuItemsTitles[] = {"Quit", "Choose", "Move"};
const std::string GUI::kMenuItemsKeys[] = {"ESC", "ENTER / DOUBLE CLICK", "UP, DOWN / MOUSE CLICK"};
const size_t GUI::kColumnsCount;
const std::array<const std::string, GUI::kColumnsCount> GUI::kColumnsTitles = {"Name", "Extension", "Size", "Type"};
const std::array<const size_t, GUI::kColumnsCount> GUI::kColumnsPrecisions = {2, 1, 1, 1};

const size_t GUI::kFooterStartPositionFromBottom;

size_t GUI::kMaxPathLength;
size_t GUI::kMaximumMenuItemLength;

size_t GUI::console_width_;
const size_t GUI::console_height_;
const size_t GUI::kFilesListLength;

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
    GUI::SetConsoleColors(GUI::kTheme.body_background, GUI::kTheme.body_foreground);
    std::cout << ' ' << path << ' ';

    GUI::MoveToCoordinate(0, 0);
    GUI::SetConsoleColors(GUI::kTheme.body_background_accent, GUI::kTheme.body_foreground_accent);
    std::cout << ' ' << GUI::kArrowBackTexture << ' ';
}

void GUI::RenderBodySingleFileLine(const std::filesystem::directory_entry &file, const bool &is_link_to_parent)
{
    if (file.path().string() == AppState::parent_directory)
    {
        std::cout << std::setw(GUI::console_width_) << std::left << " .. ";
        return;
    }

    std::cout << std::setw(GUI::kColumnsPrecisions.at(0) * GUI::console_width_ / 5) << std::left
              << (" " + CutFileNameString(file.path().filename().string(),
                                          GUI::kColumnsPrecisions.at(0) * GUI::console_width_ / 5 - 1));
    std::cout << std::setw(GUI::kColumnsPrecisions.at(1) * GUI::console_width_ / 5) << std::left
              << (" " + file.path().extension().string());
    std::cout << std::setw(GUI::kColumnsPrecisions.at(2) * GUI::console_width_ / 5) << std::left
              << (file.is_regular_file() ? (" " + GetAdaptiveSize(file.file_size())) : "");
    std::cout << std::setw(GUI::kColumnsPrecisions.at(3) * GUI::console_width_ / 5) << std::left
              << (" " + FileTypeToString(file.status().type()));
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

        GUI::RenderBodySingleFileLine(file, (counter == 0));

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
    std::cout << std::setw(GUI::console_width_ - 1) << "";
    GUI::MoveToCoordinate(0, GUI::console_height_ - GUI::kFooterStartPositionFromBottom);
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

    EventsController::RunEventLoop();
}


void GUI::ChangeSelection(const size_t &previous, const size_t &current)
{
    GUI::MoveToCoordinate(0, 3 + previous);
    GUI::SetConsoleColors(GUI::kTheme.body_background, GUI::kTheme.body_foreground);
    GUI::RenderBodySingleFileLine(AppState::currently_rendered_with_coordinates[3 + previous],
                                  AppState::currently_rendered_with_coordinates.at(3 + previous) ==
                                  AppState::files_list.at(0));

    GUI::MoveToCoordinate(0, 3 + current);
    GUI::SetConsoleColors(GUI::kTheme.body_background_accent, GUI::kTheme.body_foreground_accent);
    GUI::RenderBodySingleFileLine(AppState::currently_rendered_with_coordinates.at(3 + current),
                                  AppState::currently_rendered_with_coordinates.at(3 + current) ==
                                  AppState::files_list.at(0));
}

void GUI::MoveSelection(const short &delta)
{
    if (AppState::current_position + delta >= 0 &&
        AppState::current_position + delta < AppState::currently_rendered_files_list.size())
    {
        auto prev = AppState::current_position;
        AppState::current_position = prev + delta;
        GUI::ChangeSelection(prev, AppState::current_position);
        return;
    }

    if (AppState::current_position == AppState::currently_rendered_files_list.size() - 1 && delta == 1)
    {
        if (AppState::render_to<AppState::files_list.size() - 1)
        {
            AppState::render_from += GUI::kFilesListLength;
            AppState::render_to = std::min(AppState::render_to + GUI::kFilesListLength,
                                           AppState::files_list.size() - 1);
            AppState::current_position = 0;
            AppState::CreateCurrentlyRenderedList();
            GUI::RenderBodyDynamicFilesList();
        }
    }
    else if (AppState::current_position == 0 && delta == -1)
    {
        if (AppState::render_from > 0)
        {
            AppState::render_from = std::max(AppState::render_from - GUI::kFilesListLength, static_cast<size_t>(0));
            AppState::render_to = std::min(AppState::render_from + GUI::kFilesListLength,
                                           AppState::files_list.size() - 1);
            AppState::CreateCurrentlyRenderedList();
            AppState::current_position = AppState::currently_rendered_files_list.size() - 1;
            GUI::RenderBodyDynamicFilesList();
        }
    }
}
