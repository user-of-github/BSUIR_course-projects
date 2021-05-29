#ifndef FILE_MANAGER_FILEMANAGERSTATE_H
#define FILE_MANAGER_FILEMANAGERSTATE_H

#include "../Utilities/utilities.h"

class AppState
{
public:
    static std::string current_directory;
    static std::string parent_directory;

    static std::map<size_t, std::filesystem::directory_entry> currently_rendered_with_coordinates;
    static std::vector<std::filesystem::directory_entry> currently_rendered_files_list;
    static std::vector<std::filesystem::directory_entry> files_list;
    static size_t render_from, render_to; // in global vector
    static size_t current_position; // in currently_rendered

    static void Launch(const std::string &);

    static bool GoBack();

    static void Move(const std::string &);

private:

    static std::stack<std::string> history;


    static std::filesystem::directory_iterator GetDirectoryByPath(const std::string &);

    static void GetFilesListFromDirectoryIterator(std::filesystem::directory_iterator &);

    static void CreateCurrentlyRenderedList();

    static void UpdateDirectory(const std::string &);
};

#endif //FILE_MANAGER_FILEMANAGERSTATE_H