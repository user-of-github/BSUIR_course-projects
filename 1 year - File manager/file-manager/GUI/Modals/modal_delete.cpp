#include "modal_delete.h"

const std::array<const std::string, 2> ModalDelete::kChoiceItems = {"Cancel", "Ok"};
const std::string ModalDelete::kWarning = "Do you wish to remove ?";

std::filesystem::path ModalDelete::deleted_item_path;
std::filesystem::path ModalDelete::current_path;
size_t ModalDelete::modal_width;
size_t ModalDelete::left_padding;
bool ModalDelete::is_launched = false;
size_t ModalDelete::currently_selected = 0;
size_t ModalDelete::choice_line_y = kModalMarginTop + 3;


void ModalDelete::RenderChoicePositions()
{
    GUI::MoveToCoordinate(ModalDelete::left_padding, ModalDelete::choice_line_y);

    for (size_t counter = 0; counter < ModalDelete::kChoiceItems.size(); ++counter)
    {
        GUI::SetConsoleColors(counter == ModalDelete::currently_selected
                              ? kModalSelectionColor
                              : kModalBackgroundColor,
                              kModalForegroundColor);

        std::cout << std::setw(ModalDelete::modal_width / ModalDelete::kChoiceItems.size()) << std::right
                  << (ModalDelete::kChoiceItems.at(counter) + " ");
    }
}

void ModalDelete::Render()
{
    GUI::PaintBackground(kModalMarginTop, ModalDelete::left_padding,
                         kModalBottomBorderCoordinate, ModalDelete::left_padding + ModalDelete::modal_width,
                         kModalBackgroundColor);
    GUI::MoveToCoordinate(ModalDelete::left_padding, kModalMarginTop);
    GUI::SetConsoleColors(kModalBackgroundColor, kModalForegroundColor);
    ModalDelete::PrintBorder();

    GUI::MoveToCoordinate(ModalDelete::left_padding + (ModalDelete::modal_width / 2 - ModalDelete::kWarning.size() / 2),
                          kModalMarginTop + 1);


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

    ModalDelete::currently_selected = 0;
    ModalDelete::Render();
}

const bool ModalDelete::IsLaunched()
{
    return ModalDelete::is_launched;
}

void ModalDelete::PrintBorder()
{
    for (size_t counter = 0; counter <= ModalDelete::modal_width; ++counter)
        std::cout << kModalBorderTexture;
}

void ModalDelete::MoveSelection(const short new_item)
{
    if (new_item >= 0 && new_item < ModalDelete::kChoiceItems.size())
    {
        ModalDelete::currently_selected = new_item;
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

void ModalDelete::ComputeSingleMouseClick(const size_t y, const size_t x)
{
    if (y < kModalMarginTop ||
        y > kModalBottomBorderCoordinate ||
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
            ModalDelete::MoveSelection(0);
        else
            ModalDelete::MoveSelection(1);
    }
}

void ModalDelete::ComputeDoubleMouseClick(const size_t y, const size_t x)
{
    if (y < kModalMarginTop ||
        y > kModalBottomBorderCoordinate ||
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