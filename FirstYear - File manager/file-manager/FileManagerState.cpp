#include "FileManagerState.h"

std::string AppState::current_directory;
std::vector<std::filesystem::directory_entry> AppState::files_list;
std::map<size_t, std::filesystem::directory_entry> AppState::currently_rendered_list;

size_t AppState::render_from;
size_t AppState::render_to;
size_t AppState::current_position = 0;

void AppState::UpdateDirectory(const std::string &path)
{
    AppState::current_directory = path;

    auto raw_files_iterator = AppState::GetDirectoryByPath(AppState::current_directory);
    AppState::GetFilesListFromDirectoryIterator(raw_files_iterator);

    AppState::current_position = 0;
    AppState::render_from = 0;
    AppState::render_to = std::min(AppState::files_list.size(), static_cast<size_t>(23));
}

std::filesystem::directory_iterator AppState::GetDirectoryByPath(const std::string &path)
{
    return std::filesystem::directory_iterator(path);
}

void AppState::GetFilesListFromDirectoryIterator(std::filesystem::directory_iterator &files)
{
    AppState::files_list.clear();
    for (auto &item : files)
        AppState::files_list.push_back(item);
}
