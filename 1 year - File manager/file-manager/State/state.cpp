#include "state.h"

std::string AppState::current_directory;
std::string AppState::parent_directory;

std::vector<std::filesystem::directory_entry> AppState::files_list;
std::map<size_t, std::filesystem::directory_entry> AppState::currently_rendered_with_coordinates;
std::vector<std::filesystem::directory_entry> AppState::currently_rendered_files_list;

const size_t AppState::kFilesListLength;
std::stack<std::string> AppState::history;

size_t AppState::render_from;
size_t AppState::render_to;
size_t AppState::current_position = 0;


void AppState::Launch(const std::string &path)
{
    AppState::UpdateDirectory(path);
}


std::filesystem::directory_iterator AppState::GetDirectoryByPath(const std::string &path)
{
    return std::filesystem::directory_iterator(path);
}

void AppState::GetFilesListFromDirectoryIterator(std::filesystem::directory_iterator &files)
{
    AppState::files_list.clear();

    if (AppState::parent_directory != AppState::current_directory)
        AppState::files_list.emplace_back(
                std::filesystem::directory_entry(std::filesystem::path(AppState::parent_directory)));

    for (const auto &item : files)
        if (!IsFileHidden(item))
            AppState::files_list.emplace_back(item);
}

void AppState::CreateCurrentlyRenderedList()
{
    AppState::currently_rendered_files_list.clear();

    for (size_t counter = AppState::render_from; counter <= render_to; ++counter)
        AppState::currently_rendered_files_list.push_back(AppState::files_list[counter]);
}

void AppState::UpdateDirectory(const std::string &path)
{
    AppState::current_directory = path;
    AppState::parent_directory = GetParentDirectory(AppState::current_directory);

    auto raw_files_iterator = AppState::GetDirectoryByPath(AppState::current_directory);
    AppState::GetFilesListFromDirectoryIterator(raw_files_iterator);

    AppState::current_position = 0;
    AppState::render_from = 0;
    AppState::render_to = std::min(AppState::files_list.size() - 1, static_cast<size_t>(AppState::kFilesListLength));
    AppState::CreateCurrentlyRenderedList();
}

bool AppState::GoBack()
{
    if (AppState::history.empty())
        return false;

    AppState::UpdateDirectory(AppState::history.top());
    AppState::history.pop();

    return true;
}

void AppState::Move(const std::string &new_path)
{
    AppState::history.push(AppState::current_directory);
    AppState::UpdateDirectory(new_path);
}