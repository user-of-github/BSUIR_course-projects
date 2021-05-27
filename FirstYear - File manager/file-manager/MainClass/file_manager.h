#ifndef FILE_MANAGER_FILEMANAGER_H
#define FILE_MANAGER_FILEMANAGER_H

#pragma once

#include "../Utilities/utilities.h"
#include "../GUI/file_manager_GUI.h"

class file_manager
{
public:
    static void Launch();

private:
    static const std::string kFileManagerSettingsFilePath;
    static const std::string kFileManagerDefaultThemeFilePath;
    static std::string kStartDirectory;

    static void LoadTheme(const std::string & = file_manager::kFileManagerDefaultThemeFilePath);

    static void LoadSettings(const std::string & = file_manager::kFileManagerSettingsFilePath);

    static void LoadConfiguration();
};


#endif //FILE_MANAGER_FILEMANAGER_H
