#ifndef FILE_MANAGER_FILEMANAGER_H
#define FILE_MANAGER_FILEMANAGER_H

#pragma once

#include "../Utilities/utilities.h"
#include "../GUI/file_manager_GUI.h"

class FileManagerLauncher
{
public:
    static void Launch();

private:
    static const std::string kFileManagerSettingsFilePath;
    static const std::string kFileManagerDefaultThemeFilePath;
    static std::string kStartDirectory;

    static void LoadTheme(const std::string & = FileManagerLauncher::kFileManagerDefaultThemeFilePath);

    static void LoadSettings(const std::string & = FileManagerLauncher::kFileManagerSettingsFilePath);

    static void LoadConfiguration();
};


#endif //FILE_MANAGER_FILEMANAGER_H
