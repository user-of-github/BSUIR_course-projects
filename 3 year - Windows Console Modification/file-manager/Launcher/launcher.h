#ifndef FILE_MANAGER_FILEMANAGER_H
#define FILE_MANAGER_FILEMANAGER_H

#pragma once

#include "../Utilities/utilities.h"
#include "../GUI/MainGUI/main_GUI.h"
#include "../GUI/EventsConroller/events_controller.h"

class FileManagerLauncher
{
public:
    static void Launch();

private:
    static const std::string kFileManagerSettingsFilePath;
    static const std::string kFileManagerDefaultThemeFilePath;
    static std::string kStartDirectory;

    static void LoadTheme();

    static void LoadSettings();

    static void LoadConfiguration();
};


#endif //FILE_MANAGER_FILEMANAGER_H