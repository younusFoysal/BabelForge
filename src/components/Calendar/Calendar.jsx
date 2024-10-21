"use client";

import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
    createViewDay,
    createViewMonthGrid,
    createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from '@schedule-x/event-modal'

import "@schedule-x/theme-default/dist/index.css";
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";

function CalendarApp() {
    const [events, setEvents] = useState([]); // Initialize state using useState
    const { user } = useUser();
    const uemail = user?.primaryEmailAddress?.emailAddress;

    const axiosCommon = useAxiosCommon();

    // Fetch the tasks using react-query
    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ["calendarTasks", uemail], // Include email as a dependency
        queryFn: async () => {
            const response = await axiosCommon.get(
                `task/tasks/my-tasks/${uemail}`
            );
            return response.data; // Ensure you return the actual data property
        },
        enabled: !!uemail, // Only fetch if email exists
    });

    const plugins = [createEventsServicePlugin(), createEventModalPlugin()];

    // Initialize the calendar app
    const calendar = useCalendarApp(
        {
            views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
            events: [
                {
                    id: '1',
                    title: 'Event 1',
                    start: '2024-10-24 10:00',
                    description: 'askdldfgadg adfsf',
                    end: '2024-10-24 10:00',
                },
            ], // Use dynamic events fetched from the API
        },
        plugins
    );

    // Ensure tasks are mapped to events after fetch
    useEffect(() => {
        if (tasks.length > 0) {
            const updatedEvents = tasks.map((task) => ({
                id: task._id,
                title: task.tname,
                start: task.tdate,
                end: task.tdate,
                description: task.tdes,
            }));
            setEvents(updatedEvents); // Set all events at once
        }
    }, [tasks]); // Re-run whenever tasks change
    console.log(events);

    // Show loading spinner while tasks are loading
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex items-center justify-center my-7 ml-48 dark:bg-white/20">
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
}

export default CalendarApp;
