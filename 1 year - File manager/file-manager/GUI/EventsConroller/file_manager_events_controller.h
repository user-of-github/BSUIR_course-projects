#ifndef README_MD_FILE_MANAGER_EVENTS_CONTROLLER_H
#define README_MD_FILE_MANAGER_EVENTS_CONTROLLER_H

#pragma once

#include "../../Utilities/utilities.h"
#include "../file_manager_GUI.h"
#include "../../State/file_manager_state.h"

class EventsController
{
public:
    static void RunEventLoop();

private:
    static void ProcessMouseEvent(const MOUSE_EVENT_RECORD &);

    static void ProcessKeyEvent(const KEY_EVENT_RECORD &);
};


#endif //README_MD_FILE_MANAGER_EVENTS_CONTROLLER_H
