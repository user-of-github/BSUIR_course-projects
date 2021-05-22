#ifndef FILE_MANAGER_UTILITY_H
#define FILE_MANAGER_UTILITY_H

#pragma once

#include <iostream>
#include <iomanip>
#include <windows.h>
#include <winuser.h>
#include <filesystem>
#include <fstream>
#include <algorithm>


class AppState
{
public:
    static std::string current_directory;
    static std::filesystem::directory_iterator files_list;

    static size_t show_from , show_to;
    static size_t list_length;
    static size_t current_position;

    static void Launch(const std::string &);
    static size_t GetFileListLength();

    static std::filesystem::directory_entry GetByIndex(const size_t &);
};

enum class Color
{
    Black = 0,
    Blue = 1,
    Green = 2,
    Cyan = 3,
    Red = 4,
    Magenta = 5,
    Brown = 6,
    LightGray = 7,
    DarkGray = 8,
    LightBlue = 9,
    LightGreen = 10,
    LightCyan = 11,
    LightRed = 12,
    LightMagenta = 13,
    Yellow = 14,
    White = 15
};

struct Theme
{
    Color body_background;
    Color body_foreground;
    Color body_background_accent;
    Color body_foreground_accent;
    Color footer_background;
    Color footer_foreground;
    Color footer_background_accent;
    Color footer_foreground_accent;
};


std::string LeftTrim(std::string);

std::string RightTrim(std::string);

std::string Trim(std::string);

Color StringToColor(const std::string &);

size_t GetMaximumWordLength(const std::string [], const size_t &);

std::string TrimByChar(const std::string &, const char &);

#endif //FILE_MANAGER_UTILITY_H
