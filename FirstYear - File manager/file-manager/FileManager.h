#ifndef FILE_MANAGER_FILEMANAGER_H
#define FILE_MANAGER_FILEMANAGER_H

#pragma once

#include "Utility.h"
#include "FileManagerGUI.h"

class FileManager
{
public:
    static void Launch();

private:
    static const std::string kFileManagerConfigurationFileName;
    static std::string kStartDirectory;
    static AppState state_;

    static std::filesystem::directory_iterator GetDirectoryByPath(const std::string &);

    static void LoadConfiguration();
};


#endif //FILE_MANAGER_FILEMANAGER_H
