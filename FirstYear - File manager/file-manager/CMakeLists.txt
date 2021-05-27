cmake_minimum_required(VERSION 3.19)
project(file_manager)

set(CMAKE_CXX_STANDARD 20)

add_executable(file_manager main.cpp MainClass/file_manager.h GUI/file_manager_GUI.h Utilities/utilities.h GUI/file_manager_GUI.cpp MainClass/file_manager.cpp Utilities/utilities.cpp State/file_manager_state.cpp)
add_compile_options(/std:c++latest)