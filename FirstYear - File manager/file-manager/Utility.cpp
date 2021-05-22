#include "Utility.h"

size_t AppState::show_from = 0;
size_t AppState::show_to = 24;
size_t AppState::list_length = 0;
size_t AppState::current_position = 0;
std::string AppState::current_directory;
std::filesystem::directory_iterator AppState::files_list;

void AppState::Launch(const std::string &start_directory)
{
    AppState::list_length = AppState::GetFileListLength();
    AppState::show_from = 0;
    AppState::show_to = std::min(AppState::list_length - 1, static_cast<size_t>(23));
}

size_t AppState::GetFileListLength()
{
    size_t response = 0;
    for (const auto &item : AppState::files_list)
        ++response;
    return response;
}

std::filesystem::directory_entry AppState::GetByIndex(const size_t &index)
{
    size_t counter = 0;
    for (auto &item : AppState::files_list)
    {
        if (counter == index)
            return item;
        ++counter;
    }
}

std::string LeftTrim(std::string s)
{
    s.erase(std::begin(s), std::find_if(std::begin(s), std::end(s), [](unsigned char ch) {
        return !std::isspace(ch);
    }));

    return s;
};

std::string RightTrim(std::string s)
{
    s.erase(std::find_if(std::rbegin(s), std::rend(s), [](unsigned char ch) {
        return !std::isspace(ch);
    }).base(), std::end(s));

    return s;
}

std::string Trim(std::string s)
{
    s = LeftTrim(s);
    s = RightTrim(s);

    return s;
}

Color StringToColor(const std::string &color)
{
    auto trimmedString = Trim(color);

    if (trimmedString == "Black")
        return Color::Black;

    if (trimmedString == "Blue")
        return Color::Blue;

    if (trimmedString == "Green")
        return Color::Green;

    if (trimmedString == "Cyan")
        return Color::Cyan;

    if (trimmedString == "Red")
        return Color::Red;

    if (trimmedString == "Magenta")
        return Color::Magenta;

    if (trimmedString == "Brown")
        return Color::Brown;

    if (trimmedString == "LightGray")
        return Color::LightGray;

    if (trimmedString == "DarkGray")
        return Color::DarkGray;

    if (trimmedString == "LightBlue")
        return Color::LightBlue;

    if (trimmedString == "LightGreen")
        return Color::LightGreen;

    if (trimmedString == "LightCyan")
        return Color::LightCyan;

    if (trimmedString == "LightRed")
        return Color::LightRed;

    if (trimmedString == "LightMagenta")
        return Color::LightMagenta;

    if (trimmedString == "Yellow")
        return Color::Yellow;

    if (trimmedString == "White")
        return Color::White;

    return Color::Black;
}

size_t GetMaximumWordLength(const std::string array[], const size_t &array_length)
{
    size_t response = array[0].size();
    for (size_t counter = 0; counter < array_length; ++counter)
        response = std::max(response, array[counter].size());

    return response;
}

std::string TrimByChar(const std::string &query, const char &symbol)
{
    std::string response = query;

    while (response.size() > 0 && response[0] == symbol)
        response.erase(0, 1);

    while (response.size() > 0 && response[response.size() - 1] == symbol)
        response.pop_back();

    return response;
}