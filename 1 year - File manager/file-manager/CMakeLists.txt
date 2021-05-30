cmake_minimum_required(VERSION 3.19)
project(file_manager)

set(CMAKE_CXX_STANDARD 20)

add_executable(file_manager main.cpp Launcher/file_manager_launcher.h GUI/file_manager_GUI.h Utilities/utilities.h GUI/file_manager_GUI.cpp Launcher/file_manager_launcher.cpp Utilities/utilities.cpp State/file_manager_state.cpp GUI/EventsConroller/file_manager_events_controller.cpp GUI/EventsConroller/file_manager_events_controller.h)
add_compile_options(/std:c++latest)