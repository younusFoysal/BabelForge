"use client"

import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'

import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'

import '@schedule-x/theme-default/dist/index.css'

function CalendarApp() {
    const plugins = [createEventsServicePlugin(), createDragAndDropPlugin(), eventModal()]

    const calendar = useNextCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: [
            {
                id: '1',
                title: 'Event 1',
                description: "ajksdfga sdf asdifuhlnasiudfhjkasdf asdf",
                start: '2024-10-16',
                end: '2024-11-16',
            },
        ],
    }, plugins)


    return (
        <div >
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}

export default CalendarApp