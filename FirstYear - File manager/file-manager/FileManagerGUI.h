#ifndef FILE_MANAGER_FILEMANAGERGUI_H
#define FILE_MANAGER_FILEMANAGERGUI_H

#pragma once

#include "Utility.h"

struct Theme
{
    Color background_main;
    Color foreground_main;
    Color background_accent;
    Color foreground_accent;
};

class GUI
{
private:
    static std::string kWindowTitle;
    static size_t console_width_;
    static const size_t console_height_ = 30;

    static const size_t kMenuItemsCount = 3;
    static const std::string kMenuItemsTitles[];
    static const std::string kMenuItemsKeys[];

    static Theme kTheme;

    static const size_t kHeaderMarginTop = 1;
    static const size_t kHeaderPaddingBottom = 1;
    static const size_t kBodyInfoMarginTop = 1;
    static const size_t kBodyInfoPaddingBottom = 1;
    static const size_t kBodyFilesMarginTop = 1;
    static const size_t kBodyFilesPaddingLeft = 5;

    static CONSOLE_SCREEN_BUFFER_INFO console_info_;

    static void ResizeConsole();

    static void ChangeConsoleColors(const Color & = GUI::kTheme.background_main, const Color & = GUI::kTheme.foreground_main);

    static void ChangeConsoleBackground();

    static void HideCursor();

    static void MoveToCoordinate(const size_t &, const size_t &);

    static void PrintByCoordinate(const size_t &, const size_t &, const char * = " ");

    static void PrintByCoordinate(const size_t &, const size_t &, const char & = ' ');

    static void DrawHorizontalBorder(const size_t &, const size_t &, const size_t &);

    static void ConfigureConsoleWindow();

    static void RenderDirectoryItemsList(const std::filesystem::directory_iterator &);

public:
    static HANDLE console_handle_;

    static void RenderHeader();

    static void RenderBody(const AppState &, const std::filesystem::directory_iterator &);

    static void Render();

    static void SetTheme(const Theme &);
};


#endif //FILE_MANAGER_FILEMANAGERGUI_H
