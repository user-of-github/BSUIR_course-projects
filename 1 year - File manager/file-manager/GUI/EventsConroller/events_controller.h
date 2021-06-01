#ifndef README_MD_EVENTS_CONTROLLER_H
#define README_MD_EVENTS_CONTROLLER_H

#pragma once

#include "../../Utilities/utilities.h"
#include "../MainGUI/main_GUI.h"
#include "../../State/state.h"

class EventsController
{
public:
    static void RunEventLoop();

private:
    friend class GUI;

    static void ProcessSelection();

    static void ArrowBackPressed(const MOUSE_EVENT_RECORD &);

    static void ProcessMouseMain(const MOUSE_EVENT_RECORD &);

    static void ProcessMouseModalCreate(const MOUSE_EVENT_RECORD &);

    static void ProcessMouseModalDelete(const MOUSE_EVENT_RECORD &);

    static void ProcessMouseEvent(const MOUSE_EVENT_RECORD &);

    static void ProcessKeyMainGUI(const KEY_EVENT_RECORD &);

    static void ProcessKeyModalCreate(const KEY_EVENT_RECORD &);

    static void ProcessKeyModalDelete(const KEY_EVENT_RECORD &);

    static void ProcessKeyEvent(const KEY_EVENT_RECORD &);
};


#endif //README_MD_EVENTS_CONTROLLER_H