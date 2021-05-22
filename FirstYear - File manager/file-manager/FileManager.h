#ifndef FILE_MANAGER_FILEMANAGER_H
#define FILE_MANAGER_FILEMANAGER_H

#pragma once

#include "Utility.h"
#include "FileManagerGUI.h"

class FileManager
{
public:
    static void Launch();

    static void LoadTheme(const std::string & = FileManager::kFileManagerDefaultThemeFilePath);

private:
    static const std::string kFileManagerSettingsFilePath;
    static const std::string kFileManagerDefaultThemeFilePath;
    static std::string kStartDirectory;

    static std::filesystem::directory_iterator GetDirectoryByPath(const std::string &);

    static void LoadSettings(const std::string & = FileManager::kFileManagerSettingsFilePath);

    static void LoadConfiguration();
};


#endif //FILE_MANAGER_FILEMANAGER_H
