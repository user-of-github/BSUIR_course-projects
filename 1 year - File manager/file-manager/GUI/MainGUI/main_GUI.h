#ifndef FILE_MANAGER_FILEMANAGERGUI_H
#define FILE_MANAGER_FILEMANAGERGUI_H

#pragma once

#include "../Modals/modal_delete.h"
#include "../Modals/modal_create.h"
#include "../../Utilities/utilities.h"
#include "../../State/state.h"

class GUI
{
public:
    static void SetTheme(const Theme &);

    static void Launch();

private:
    friend class EventsController;

    friend class ModalDelete;

    friend class ModalCreate;

    static const std::string kWindowTitle;

    static const std::string kFirstLineTexture;
    static const std::string kSecondLineTexture;
    static const std::string kArrowBackTexture;

    static const size_t kMenuItemsCount = 4;
    static const std::array<const std::string, GUI::kMenuItemsCount> kMenuItemsTitles;
    static const std::array<const std::string, GUI::kMenuItemsCount> kMenuItemsKeys;
    static const size_t kColumnsCount = 4;
    static const std::array<const std::string, GUI::kColumnsCount> kColumnsTitles;
    static const std::array<const size_t, GUI::kColumnsCount> kColumnsPrecisions;

    static const size_t kFooterStartPositionFromBottom = 2;
    static size_t kMaxPathLength;
    static size_t kMaximumMenuItemLength;

    static size_t console_width;
    static const size_t console_height = 30;
    static const size_t kFilesListLength = 23;

    static HANDLE console_handle;
    static CONSOLE_SCREEN_BUFFER_INFO console_info;

    static bool was_first_render;

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

    static void RenderBodySingleFileLine(const std::filesystem::directory_entry &, const bool &);

    static void RenderBodyDynamicFilesList();

    static void RenderBody();

    static void RenderFooter();

    static void ChangeSelection(const size_t &, const size_t &);

    static void MoveSelection(const short &);
};


#endif //FILE_MANAGER_FILEMANAGERGUI_H
