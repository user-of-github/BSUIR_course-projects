#include "FileManager.h"

const std::string FileManager::kFileManagerSettingsFilePath = "config.txt";
const std::string FileManager::kFileManagerDefaultThemeFilePath = "theme.txt";
std::string FileManager::kStartDirectory;


void FileManager::Launch()
{
    FileManager::LoadConfiguration();
    AppState::UpdateDirectory(FileManager::kStartDirectory);
    GUI::Launch();
}

void FileManager::LoadConfiguration()
{
    FileManager::LoadSettings();
    FileManager::LoadTheme();
}

void FileManager::LoadTheme(const std::string &theme_file_path)
{
    auto read = std::ifstream(theme_file_path);
    std::string body_bgc, body_fgc, body_bgc_acc, body_fgc_acc,
            footer_bgc, footer_fgc, footer_bgc_acc, footer_fgc_acc;
    std::getline(read, body_bgc);
    std::getline(read, body_fgc);
    std::getline(read, body_bgc_acc);
    std::getline(read, body_fgc_acc);
    std::getline(read, footer_bgc);
    std::getline(read, footer_fgc);
    std::getline(read, footer_bgc_acc);
    std::getline(read, footer_fgc_acc);

    GUI::SetTheme({StringToColor(body_bgc),
                   StringToColor(body_fgc),
                   StringToColor(body_bgc_acc),
                   StringToColor(body_fgc_acc),
                   StringToColor(footer_bgc),
                   StringToColor(footer_fgc),
                   StringToColor(footer_bgc_acc),
                   StringToColor(footer_fgc_acc)});

    read.close();
}

void FileManager::LoadSettings(const std::string &)
{
    auto read = std::ifstream(FileManager::kFileManagerSettingsFilePath);
    std::getline(read, FileManager::kStartDirectory);
    read.close();
}