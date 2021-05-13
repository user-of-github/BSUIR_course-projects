#include "FileManager.h"

const std::string FileManager::kFileManagerConfigurationFileName = "config.txt";
std::string FileManager::kStartDirectory;
AppState FileManager::state_ = AppState(FileManager::kStartDirectory, PositionState::IN_DIRECTORY);


void FileManager::Launch()
{
    FileManager::LoadConfiguration();
    FileManager::state_.current_directory = FileManager::kStartDirectory;
    GUI::Render();
    GUI::RenderBody(FileManager::state_, FileManager::GetDirectoryByPath(state_.current_directory));
}

std::filesystem::directory_iterator FileManager::GetDirectoryByPath(const std::string &path)
{
    return std::filesystem::directory_iterator(path);
}

void FileManager::LoadConfiguration()
{
    auto read = std::ifstream(FileManager::kFileManagerConfigurationFileName);
    std::getline(read, FileManager::kStartDirectory);
    std::string bgc_main, fgc_main, bgc_accent, fgc_accent;

    std::getline(read, bgc_main);
    std::getline(read, fgc_main);
    std::getline(read, bgc_accent);
    std::getline(read, fgc_accent);

    GUI::SetTheme({StringToColor(bgc_main),
                   StringToColor(fgc_main),
                   StringToColor(bgc_accent),
                   StringToColor(fgc_accent)});
}
