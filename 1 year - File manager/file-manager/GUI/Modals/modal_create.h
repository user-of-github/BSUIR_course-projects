#ifndef README_MD_MODAL_CREATE_H
#define README_MD_MODAL_CREATE_H


#include "../MainGUI/main_GUI.h"
#include "../../Utilities/utilities.h"

class ModalCreate
{
private:
    friend class EventsController;

    static const std::array<const std::string, 3> kChoiceItems;
    static const std::string kWarning;
    static const std::string kBorderTexture;
    static const Color kBackgroundColor = Color::Green;
    static const Color kForegroundColor = Color::White;
    static const Color kSelectionColor = Color::Black;
    static const Color kInputBackground = Color::LightBlue;
    static const Color kInputForeground = Color::Black;
    static const size_t kMarginTop = 5;
    static const size_t modal_height = 5;
    static const size_t kBottomBorderCoordinate = ModalCreate::kMarginTop + ModalCreate::modal_height;
    static size_t modal_width;

    static std::string new_file_name;

    static size_t left_padding;
    static bool is_launched;
    static size_t choice_line_y;

    static std::filesystem::path current_path;
    static size_t currently_selected;

    static void PrintBorder();

    static void RenderChoicePositions();

    static void RenderInput();

    static void Render();

    static void ProcessChoice();

    static void ComputeSingleMouseClick(const size_t &, const size_t &);

    static void ComputeDoubleMouseClick(const size_t &, const size_t &);

    static void UpdateNewFileName(const size_t &);

public:
    static void Launch(const std::filesystem::path &);

    static const bool IsLaunched();

    static void MoveSelection(const short &);

    static void Close();
};


#endif //README_MD_MODAL_CREATE_H
