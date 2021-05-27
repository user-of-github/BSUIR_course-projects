#include "file_manager.h"

const std::string file_manager::kFileManagerSettingsFilePath = "config.txt";
const std::string file_manager::kFileManagerDefaultThemeFilePath = "theme.txt";
std::string file_manager::kStartDirectory;


void file_manager::Launch()
{
    file_manager::LoadConfiguration();
    AppState::Launch(file_manager::kStartDirectory);
    GUI::Launch();
}

void file_manager::LoadConfiguration()
{
    file_manager::LoadSettings();
    file_manager::LoadTheme();
}

void file_manager::LoadTheme(const std::string &theme_file_path)
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

void file_manager::LoadSettings(const std::string &)
{
    auto read = std::ifstream(file_manager::kFileManagerSettingsFilePath);
    std::getline(read, file_manager::kStartDirectory);
    read.close();
}