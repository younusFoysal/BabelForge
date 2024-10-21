"use client"

import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'

import '@schedule-x/theme-default/dist/calendar.css'

const Calendar = () => {

    const calendar = useCalendarApp({
        views: [
            createViewWeek(),
            createViewMonthGrid()
        ],
        events: [
            {
                id: '1',
                title: 'Event 1',
                start: '2024-10-24 12:30',
                end: '2024-10-24 14:00',
            },
            {
                id: '2',
                title: 'Event 2',
                start: '2024-10-24 02:30',
                end: '2024-10-24 14:00',
            },
        ],
        selectedDate: '2024-10-01'
    })

    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar}></ScheduleXCalendar>
        </div>
    );
};

export default Calendar;