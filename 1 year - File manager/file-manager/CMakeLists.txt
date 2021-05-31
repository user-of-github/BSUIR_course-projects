cmake_minimum_required(VERSION 3.19)
project(file_manager)

set(CMAKE_CXX_STANDARD 20)

add_executable(file_manager main.cpp Launcher/launcher.h GUI/MainGUI/main_GUI.h Utilities/utilities.h GUI/MainGUI/main_GUI.cpp Launcher/launcher.cpp Utilities/utilities.cpp State/state.cpp GUI/EventsConroller/events_controller.cpp GUI/EventsConroller/events_controller.h GUI/Modals/modal_delete.cpp GUI/Modals/modal_delete.h GUI/Modals/modal_create.cpp GUI/Modals/modal_create.h)
add_compile_options(/std:c++latest)