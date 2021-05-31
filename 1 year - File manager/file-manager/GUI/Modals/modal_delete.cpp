#include "modal_delete.h"

const std::array<const std::string, 2> ModalDelete::kChoiceItems = {"Cancel", "Ok"};
const std::string ModalDelete::kWarning = "Do you wish to remove ?";
const std::string ModalDelete::kBorderTexture = "═";
const Color ModalDelete::kBackgroundColor;
const Color ModalDelete::kForegroundColor;
const Color ModalDelete::kSelectionColor;
std::filesystem::path ModalDelete::deleted_item_path;
std::filesystem::path ModalDelete::current_path;
const size_t ModalDelete::kMarginTop;
const size_t ModalDelete::kBottomBorderCoordinate;
size_t ModalDelete::modal_width;
const size_t ModalDelete::modal_height;
size_t ModalDelete::left_padding;
bool ModalDelete::is_launched = false;
size_t ModalDelete::currently_selected = 0;
size_t ModalDelete::choice_line_y = ModalDelete::kMarginTop + 3;


void ModalDelete::RenderChoicePositions()
{
    GUI::MoveToCoordinate(ModalDelete::left_padding, ModalDelete::choice_line_y);

    for (size_t counter = 0; counter < ModalDelete::kChoiceItems.size(); ++counter)
    {
        GUI::SetConsoleColors(counter == ModalDelete::currently_selected
                              ? ModalDelete::kSelectionColor
                              : ModalDelete::kBackgroundColor,
                              ModalDelete::kForegroundColor);

        std::cout << std::setw(ModalDelete::modal_width / ModalDelete::kChoiceItems.size()) << std::right
                  << (ModalDelete::kChoiceItems.at(counter) + " ");
    }
}

void ModalDelete::Render()
{
    GUI::PaintBackground(ModalDelete::kMarginTop, ModalDelete::left_padding,
                         ModalDelete::kBottomBorderCoordinate, ModalDelete::left_padding + ModalDelete::modal_width,
                         ModalDelete::kBackgroundColor);
    GUI::MoveToCoordinate(ModalDelete::left_padding, ModalDelete::kMarginTop);
    GUI::SetConsoleColors(ModalDelete::kBackgroundColor, ModalDelete::kForegroundColor);
    ModalDelete::PrintBorder();

    GUI::MoveToCoordinate(ModalDelete::left_padding + (ModalDelete::modal_width / 2 - ModalDelete::kWarning.size() / 2),
                          ModalDelete::kMarginTop + 1);


    std::cout << ModalDelete::kWarning;

    ModalDelete::RenderChoicePositions();
}

void ModalDelete::Launch(const std::filesystem::path &path, const std::filesystem::path &current)
{
    ModalDelete::deleted_item_path = path;
    ModalDelete::current_path = current;
    ModalDelete::modal_width = GUI::console_width / 2;
    ModalDelete::left_padding = ModalDelete::modal_width / 2;

    ModalDelete::is_launched = true;

    ModalDelete::Render();
}

const bool ModalDelete::IsLaunched()
{
    return ModalDelete::is_launched;
}

void ModalDelete::PrintBorder()
{
    for (size_t counter = 0; counter <= ModalDelete::modal_width; ++counter)
        std::cout << ModalDelete::kBorderTexture;
}

void ModalDelete::MoveSelection(const short &delta)
{
    if (ModalDelete::currently_selected + delta >= 0 &&
        ModalDelete::currently_selected + delta < ModalDelete::kChoiceItems.size())
    {
        ModalDelete::currently_selected += delta;
        ModalDelete::RenderChoicePositions();
    }
}

void ModalDelete::ProcessChoice()
{
    switch (ModalDelete::currently_selected)
    {
        case 0:
            ModalDelete::is_launched = false;
            GUI::RenderBodyDynamicFilesList();
            break;
        case 1:
            std::filesystem::remove_all(ModalDelete::deleted_item_path);
            AppState::UpdateDirectory(ModalDelete::current_path.string());
            ModalDelete::is_launched = false;
            GUI::RenderBodyDynamicFilesList();
            break;
    }
}

void ModalDelete::Close()
{
    ModalDelete::is_launched = false;
    GUI::RenderBodyDynamicFilesList();
}

void ModalDelete::ComputeSingleMouseClick(const size_t &y, const size_t &x)
{
    if (y < ModalDelete::kMarginTop ||
        y > ModalDelete::kBottomBorderCoordinate ||
        x < ModalDelete::left_padding ||
        x > ModalDelete::left_padding + ModalDelete::modal_width)
    {
        ModalDelete::Close();
        return;
    }

    else if (y == ModalDelete::choice_line_y)
    {
        if (x >= ModalDelete::left_padding &&
            x < ModalDelete::left_padding + ModalDelete::modal_width / ModalDelete::kChoiceItems.size())
            ModalDelete::MoveSelection(-1);
        else
            ModalDelete::MoveSelection(1);
    }


}

void ModalDelete::ComputeDoubleMouseClick(const size_t &y, const size_t &x)
{
    if (y < ModalDelete::kMarginTop ||
        y > ModalDelete::kBottomBorderCoordinate ||
        x < ModalDelete::left_padding ||
        x > ModalDelete::left_padding + ModalDelete::modal_width)
    {
        ModalDelete::Close();
        return;
    }

    else if (y == ModalDelete::choice_line_y)
    {
        if (x >= ModalDelete::left_padding &&
            x < ModalDelete::left_padding + ModalDelete::modal_width / ModalDelete::kChoiceItems.size())
        {
            ModalDelete::MoveSelection(-1);
            ModalDelete::ProcessChoice();
        }
        else
        {
            ModalDelete::MoveSelection(1);
            ModalDelete::ProcessChoice();
        }
    }
}
