#ifndef FILE_MANAGER_FILEMANAGERGUI_H
#define FILE_MANAGER_FILEMANAGERGUI_H

#pragma once

#include "Utility.h"

class GUI
{
public:
    static HANDLE console_handle_;

    static void Launch();

    static void SetTheme(const Theme &);

private:
    static std::string kWindowTitle;
    static size_t console_width_;
    static const size_t console_height_ = 30;
    static size_t kMaxPathLength;
    static const size_t kMaxFilesListLength = 25;

    static const size_t kMenuItemsCount = 3;
    static const std::string kMenuItemsTitles[];
    static const std::string kMenuItemsKeys[];

    static const size_t kFooterStartPositionFromBottom = 2;

    static bool was_first_render_;

    static Theme kTheme;

    static CONSOLE_SCREEN_BUFFER_INFO console_info_;

    static size_t kMaximumMenuItemLength;

    static void ResizeConsole();

    static void HideCursor();

    static void MoveToCoordinate(const size_t &, const size_t &);

    static void SetConsoleColors(const Color &, const Color &);

    static void ConfigureConsoleWindow();

    static void PaintBackground(const size_t &, const size_t &, const size_t &, const size_t &, const Color &);

    static void PaintFooterBackground();

    static void RenderFooter();

    static void RenderFooterMenuItems();

    static void RenderBody();

    static std::string CutDirectoryString(const std::string &);
};


#endif //FILE_MANAGER_FILEMANAGERGUI_H
