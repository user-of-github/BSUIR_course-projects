cmake_minimum_required(VERSION 3.19)
project(file_manager)

set(CMAKE_CXX_STANDARD 20)

add_executable(file_manager main.cpp FileManager.h FileManagerGUI.h Utility.h FileManagerGUI.cpp FileManager.cpp Utility.cpp)
add_compile_options(/std:c++latest)