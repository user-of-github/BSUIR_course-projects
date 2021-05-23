#ifndef FILE_MANAGER_FILEMANAGERGUI_H
#define FILE_MANAGER_FILEMANAGERGUI_H

#pragma once

#include "Utility.h"
#include "FileManagerState.h"

class GUI
{
public:
    static void SetTheme(const Theme &);

    static void RenderBody();

    static void RenderFooter();

    static void Launch();

private:
    static const std::string kWindowTitle;

    static const std::string kFirstLineTexture;
    static const std::string kSecondLineTexture;

    static const size_t kMenuItemsCount = 3;
    static const std::string kMenuItemsTitles[];
    static const std::string kMenuItemsKeys[];

    static const size_t kFooterStartPositionFromBottom = 2;
    static size_t kMaxPathLength;
    static size_t kMaximumMenuItemLength;

    static size_t console_width_;
    static const size_t console_height_ = 30;

    static HANDLE console_handle_;
    static CONSOLE_SCREEN_BUFFER_INFO console_info_;

    static bool was_first_render_;

    static Theme kTheme;


    static void ResizeConsole();

    static void HideCursor();

    static void ConfigureConsoleWindow();

    static void MoveToCoordinate(const size_t &, const size_t &);

    static void SetConsoleColors(const Color &, const Color &);

    static void PaintBackground(const size_t &, const size_t &, const size_t &, const size_t &, const Color &);

    static void PaintFooterBackground();

    static void PaintBodyBackground();

    static void RenderFooterFixedInterface();

    static void RenderBodyFixedInterface();

    static void RenderBodyDynamicPath();

    static void RenderBodyDinamicFilesList();
};

void RunEventLoop(HANDLE &);

#endif //FILE_MANAGER_FILEMANAGERGUI_H
