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
#include <map>
#include <stack>
#include <array>
#include <ShellAPI.h>

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


const std::string Trim(std::string);

const Color StringToColor(const std::string &);

const size_t GetMaximumWordLength(const std::array<const std::string, 4> &);

const std::string CutDirectoryString(const std::string &, const size_t);

const std::string FileTypeToString(const std::filesystem::file_type &);

const std::string CutFileNameString(const std::string &, const size_t);

const bool IsFileHidden(const std::filesystem::directory_entry &);

const std::string GetParentDirectory(const std::string &);

const std::string GetAdaptiveSize(const size_t);

#endif //FILE_MANAGER_UTILITY_H
