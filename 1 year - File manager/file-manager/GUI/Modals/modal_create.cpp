#include "modal_create.h"


const std::array<const std::string, 3> ModalCreate::kChoiceItems = {"Cancel", "Create folder", "Create file"};
const std::string ModalCreate::kWarning = "Create a new item. Enter name:";
const std::string ModalCreate::kBorderTexture = "═";
const Color ModalCreate::kBackgroundColor;
const Color ModalCreate::kForegroundColor;
const Color ModalCreate::kSelectionColor;
const Color ModalCreate::kInputBackground;
const Color ModalCreate::kInputForeground;
std::filesystem::path ModalCreate::current_path;
const size_t ModalCreate::kMarginTop;
const size_t ModalCreate::kBottomBorderCoordinate;
size_t ModalCreate::modal_width;
const size_t ModalCreate::modal_height;
size_t ModalCreate::left_padding;
bool ModalCreate::is_launched = false;
size_t ModalCreate::currently_selected = 0;
size_t ModalCreate::choice_line_y = ModalCreate::kMarginTop + 4;
std::string ModalCreate::new_file_name = "new file";


void ModalCreate::RenderChoicePositions()
{
    GUI::MoveToCoordinate(ModalCreate::left_padding, ModalCreate::choice_line_y);

    for (size_t counter = 0; counter < ModalCreate::kChoiceItems.size(); ++counter)
    {
        GUI::SetConsoleColors(counter == ModalCreate::currently_selected
                              ? ModalCreate::kSelectionColor
                              : ModalCreate::kBackgroundColor,
                              ModalCreate::kForegroundColor);

        std::cout << std::setw(ModalCreate::modal_width / ModalCreate::kChoiceItems.size()) << std::right
                  << (ModalCreate::kChoiceItems.at(counter) + " ");
    }
}

void ModalCreate::RenderInput()
{
    GUI::MoveToCoordinate(ModalCreate::left_padding, ModalCreate::choice_line_y - 1);
    GUI::PaintBackground(ModalCreate::choice_line_y - 1, ModalCreate::left_padding + 1,
                         ModalCreate::choice_line_y - 1, ModalCreate::left_padding + ModalCreate::modal_width - 1,
                         ModalCreate::kInputBackground);
    GUI::MoveToCoordinate(ModalCreate::left_padding + 1, ModalCreate::choice_line_y - 1);
    std::cout << std::setw(ModalCreate::modal_width - 1) << std::left << ModalCreate::new_file_name;

}

void ModalCreate::Render()
{
    GUI::PaintBackground(ModalCreate::kMarginTop, ModalCreate::left_padding,
                         ModalCreate::kBottomBorderCoordinate, ModalCreate::left_padding + ModalCreate::modal_width,
                         ModalCreate::kBackgroundColor);
    GUI::MoveToCoordinate(ModalCreate::left_padding, ModalCreate::kMarginTop);
    GUI::SetConsoleColors(ModalCreate::kBackgroundColor, ModalCreate::kForegroundColor);
    ModalCreate::PrintBorder();

    GUI::MoveToCoordinate(ModalCreate::left_padding + (ModalCreate::modal_width / 2 - ModalCreate::kWarning.size() / 2),
                          ModalCreate::kMarginTop + 1);


    std::cout << ModalCreate::kWarning;
    ModalCreate::RenderInput();
    ModalCreate::RenderChoicePositions();
}

void ModalCreate::Launch(const std::filesystem::path &current)
{
    ModalCreate::current_path = current;
    ModalCreate::modal_width = GUI::console_width / 2;
    ModalCreate::left_padding = ModalCreate::modal_width / 2;

    ModalCreate::is_launched = true;

    ModalCreate::Render();
}

const bool ModalCreate::IsLaunched()
{
    return ModalCreate::is_launched;
}

void ModalCreate::PrintBorder()
{
    for (size_t counter = 0; counter <= ModalCreate::modal_width; ++counter)
        std::cout << ModalCreate::kBorderTexture;
}

void ModalCreate::MoveSelection(const short &new_item)
{
    if (new_item >= 0 && new_item < ModalCreate::kChoiceItems.size())
    {
        ModalCreate::currently_selected = new_item;
        ModalCreate::RenderChoicePositions();
    }
}

void ModalCreate::ProcessChoice()
{
    switch (ModalCreate::currently_selected)
    {
        case 0:
            ModalCreate::Close();
            GUI::RenderBodyDynamicFilesList();
            break;
        case 1:
            if (std::find_if(std::begin(AppState::files_list), std::end(AppState::files_list),
                             [&](const auto &item) { return item.path() == ModalCreate::new_file_name; }) ==
                std::end(AppState::files_list))
            {
                std::filesystem::create_directory(
                        std::filesystem::path(ModalCreate::current_path.string() + '\\' + ModalCreate::new_file_name));
                AppState::UpdateDirectory(ModalCreate::current_path.string());
            }

            ModalCreate::Close();
            GUI::RenderBodyDynamicFilesList();
            break;
        case 2:
            auto response = std::ofstream(ModalCreate::current_path.string() + ModalCreate::new_file_name);
            AppState::UpdateDirectory(ModalCreate::current_path.string());
            ModalCreate::Close();
            GUI::RenderBodyDynamicFilesList();
            break;
    }
}

void ModalCreate::Close()
{
    ModalCreate::is_launched = false;
    GUI::RenderBodyDynamicFilesList();
}

void ModalCreate::ComputeSingleMouseClick(const size_t &y, const size_t &x)
{
    if (y < ModalCreate::kMarginTop ||
        y > ModalCreate::kBottomBorderCoordinate ||
        x < ModalCreate::left_padding ||
        x > ModalCreate::left_padding + ModalCreate::modal_width)
    {
        ModalCreate::Close();
        return;
    }

    else if (y == ModalCreate::choice_line_y && x >= ModalCreate::left_padding &&
             x < ModalCreate::left_padding + ModalCreate::modal_width)
    {
        if (x >= ModalCreate::left_padding &&
            x < ModalCreate::left_padding + ModalCreate::modal_width / ModalCreate::kChoiceItems.size())
            ModalCreate::MoveSelection(0);
        else if (x > ModalCreate::left_padding + 2 * ModalCreate::modal_width / ModalCreate::kChoiceItems.size())
            ModalCreate::MoveSelection(2);
        else
            ModalCreate::MoveSelection(1);
    }


}

void ModalCreate::ComputeDoubleMouseClick(const size_t &y, const size_t &x)
{
    if (y < ModalCreate::kMarginTop ||
        y > ModalCreate::kBottomBorderCoordinate ||
        x < ModalCreate::left_padding ||
        x > ModalCreate::left_padding + ModalCreate::modal_width)
    {
        ModalCreate::Close();
        return;
    }

    else if (y == ModalCreate::choice_line_y && x >= ModalCreate::left_padding &&
             x < ModalCreate::left_padding + ModalCreate::modal_width)
    {
        if (x >= ModalCreate::left_padding &&
            x < ModalCreate::left_padding + ModalCreate::modal_width / ModalCreate::kChoiceItems.size())
            ModalCreate::MoveSelection(0);
        else if (x > ModalCreate::left_padding + 2 * ModalCreate::modal_width / ModalCreate::kChoiceItems.size())
            ModalCreate::MoveSelection(2);
        else
            ModalCreate::MoveSelection(1);

        ModalCreate::ProcessChoice();
    }
}

void ModalCreate::UpdateNewFileName(const size_t &code)
{
    if (code == 13)
    {
        if (!ModalCreate::new_file_name.empty())
        {
            ModalCreate::new_file_name.pop_back();
            ModalCreate::RenderInput();
        }
    }
    else
    {
        if (ModalCreate::new_file_name.size() < ModalCreate::modal_width - 2)
        {
            ModalCreate::new_file_name += static_cast<char>(code);
            ModalCreate::RenderInput();
        }
    }
}
