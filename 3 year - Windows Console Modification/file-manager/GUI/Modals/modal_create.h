#ifndef README_MD_MODAL_CREATE_H
#define README_MD_MODAL_CREATE_H


#include "../MainGUI/main_GUI.h"
#include "../../Utilities/utilities.h"
#include "modal-constants.h"

class ModalCreate
{
private:
    friend class EventsController;

    static const std::array<const std::string, 3> kChoiceItems;
    static const std::string kWarning;

    static size_t modal_width;

    static size_t left_padding;
    static size_t choice_line_y;
    static bool is_launched;

    static std::string new_file_name;

    static std::filesystem::path current_path;
    static size_t currently_selected;


    static void PrintBorder();

    static void RenderChoicePositions();

    static void RenderInput();

    static void Render();

    static void ProcessChoice();

    static void ComputeSingleMouseClick(const size_t, const size_t);

    static void ComputeDoubleMouseClick(const size_t, const size_t);

    static void UpdateNewFileName(const size_t);

public:
    static void Launch(const std::filesystem::path &);

    static const bool IsLaunched();

    static void MoveSelection(const short);

    static void Close();
};


#endif //README_MD_MODAL_CREATE_H