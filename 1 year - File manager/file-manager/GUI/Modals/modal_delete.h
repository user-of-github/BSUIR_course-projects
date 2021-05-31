#ifndef README_MD_MODAL_DELETE_H
#define README_MD_MODAL_DELETE_H

#include "../MainGUI/main_GUI.h"
#include "../../Utilities/utilities.h"

class ModalDelete
{
private:
    friend class EventsController;

    static const std::array<const std::string, 2> kChoiceItems;
    static const std::string kWarning;
    static const std::string kBorderTexture;
    static const Color kBackgroundColor = Color::Green;
    static const Color kForegroundColor = Color::White;
    static const Color kSelectionColor = Color::Black;
    static const size_t kMarginTop = 5;
    static const size_t modal_height = 5;
    static const size_t kBottomBorderCoordinate = ModalDelete::kMarginTop + ModalDelete::modal_height;
    static size_t modal_width;

    static size_t left_padding;
    static bool is_launched;
    static size_t choice_line_y;

    static std::filesystem::path deleted_item_path;
    static std::filesystem::path current_path;
    static size_t currently_selected;

    static void PrintBorder();

    static void RenderChoicePositions();

    static void Render();

    static void ProcessChoice();

    static void ComputeSingleMouseClick(const size_t &, const size_t &);

    static void ComputeDoubleMouseClick(const size_t &, const size_t &);

public:
    static void Launch(const std::filesystem::path &, const std::filesystem::path &);

    static const bool IsLaunched();

    static void MoveSelection(const short &);

    static void Close();
};


#endif //README_MD_MODAL_DELETE_H
