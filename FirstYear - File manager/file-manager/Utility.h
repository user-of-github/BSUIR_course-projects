#ifndef FILE_MANAGER_UTILITY_H
#define FILE_MANAGER_UTILITY_H

#pragma once

#include <iostream>
#include <iomanip>
#include <windows.h>
#include <winuser.h>
#include <filesystem>
#include <fstream>


enum class PositionState
{
    IN_DIRECTORY,
    IN_FILE
};

class AppState
{
public:
    std::string current_directory;
    PositionState position;

    AppState(const std::string &start_directory, const PositionState &start_position) :
            current_directory(start_directory), position(start_position)
    {}
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

std::string LeftTrim(std::string);

std::string RightTrim(std::string);

std::string Trim(std::string);

Color StringToColor(const std::string &);


#endif //FILE_MANAGER_UTILITY_H
