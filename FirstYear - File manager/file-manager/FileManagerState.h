#ifndef FILE_MANAGER_FILEMANAGERSTATE_H
#define FILE_MANAGER_FILEMANAGERSTATE_H

#include "Utility.h"

class AppState
{
public:
    static std::string current_directory;
    static std::vector<std::filesystem::directory_entry> files_list;
    static std::map<size_t, std::filesystem::directory_entry> currently_rendered_list;
    static size_t render_from, render_to;
    static size_t current_position;

    static void UpdateDirectory(const std::string &);

private:
    static std::filesystem::directory_iterator GetDirectoryByPath(const std::string &);

    static void GetFilesListFromDirectoryIterator(std::filesystem::directory_iterator &);
};

#endif //FILE_MANAGER_FILEMANAGERSTATE_H