#include "utilities.h"

const std::string LeftTrim(std::string s)
{
    s.erase(std::begin(s), std::find_if(std::begin(s), std::end(s), [](unsigned char ch) {
        return !std::isspace(ch);
    }));

    return s;
};

const std::string RightTrim(std::string s)
{
    s.erase(std::find_if(std::rbegin(s), std::rend(s), [](unsigned char ch) {
        return !std::isspace(ch);
    }).base(), std::end(s));

    return s;
}

const std::string Trim(std::string s)
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

const std::string CutDirectoryString(const std::string &query, const size_t &max_path_length)
{
    if (query.size() <= max_path_length)
        return query;

    std::string response;
    response = query;

    size_t index = response.find_first_of('\\') + 1;
    while (response.size() > max_path_length - 3)
        response.erase(index, 1);

    response.insert(index, "...");

    return response;
}


const std::string TrimByChar(const std::string &query, const char &symbol)
{
    std::string response = query;

    while (response.size() > 0 && response[0] == symbol)
        response.erase(0, 1);

    while (response.size() > 0 && response[response.size() - 1] == symbol)
        response.pop_back();

    return response;
}

const std::string FileTypeToString(const std::filesystem::file_type &type)
{
    switch (type)
    {
        case std::filesystem::file_type::block:
            return "block";
        case std::filesystem::file_type::character:
            return "character";
        case std::filesystem::file_type::directory:
            return "folder";
        case std::filesystem::file_type::fifo:
            return "fifo";
        case std::filesystem::file_type::none:
            return "none";
        case std::filesystem::file_type::not_found:
            return "not found";
        case std::filesystem::file_type::regular:
            return "regular";
        case std::filesystem::file_type::socket:
            return "socket";
        case std::filesystem::file_type::symlink:
            return "symlink";
        case std::filesystem::file_type::unknown:
            return "unknown";
        default:
            return "other";
    }
}

const std::string CutFileNameString(const std::string &query, const size_t &to_length)
{
    if (query.size() < to_length)
        return query;

    return query.substr(0, to_length - 3) + "...";
}

const bool IsFileHidden(const std::filesystem::directory_entry &file)
{
    if (file.path().filename().string() != ".." && file.path().filename().string() != "." &&
        file.path().filename().string()[0] == '.')
        return true;

    return false;
}

const std::string GetParentDirectory(const std::string &current_directory)
{
    if (current_directory == "C:\\")
        return current_directory;

    std::string response = current_directory;

    auto last_slash_position = response.find_last_of('\\');
    response.erase(last_slash_position, response.size() - last_slash_position + 1);

    if (std::find(std::begin(response), std::end(response), '\\') == std::end(response))
        response.push_back('\\');


    return response;
}