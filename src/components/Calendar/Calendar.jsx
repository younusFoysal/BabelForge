"use client"

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useAxiosCommon from '@/lib/axiosCommon';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// Set up the localizer using moment.js
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    // Sample events to display in the calendar
    const axiosCommon = useAxiosCommon();
    const { user } = useUser();
    const uemail = user?.primaryEmailAddress?.emailAddress;

    const {
        data: tasks = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const data = await axiosCommon.get(`/task/events/${uemail}`);
            return data;
        },
    });
    // console.log("events: ", tasks.data);

    // State to manage modal visibility and selected event details
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    // const [view, setView] = useState(Views.WEEK);
    const [date, setDate] = useState(new Date());

    // Handle event click to show the modal with event details
    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    // Close the modal
    const handleClose = () => setShowModal(false);

    const eventPropGetter = (event) => {
        console.log(event.status);
        let backgroundColor = 'lightblue'; // Default color
        let textColor = '#000000';

        // Customize color based on event title (you can use any event property)
        if (event.status === 'todo') {
            backgroundColor = '#fffacd';
        } else if (event.status === 'inprogress') {
            backgroundColor = '#add8e6';
        } else if (event.status === 'done') {
            backgroundColor = '#90ee90';
        }

        // Return styles
        return { style: { backgroundColor, color: textColor } };
    };

    // Render the calendar component
    return (
        <div style={{ height: '500px', margin: '50px 50px 50px 400px ' }}>
            <Calendar
                localizer={localizer}
                events={tasks.data}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}

                defaultView="month"
                views={['month', 'week', 'day']}

                // views={[Views.MONTH, Views.WEEK, Views.DAY]}
                // defaultView={view}
                // view={view} // Include the view prop
                date={date} // Include the date prop
                // onView={(view) => setView(view)}
                onNavigate={(date) => {
                    setDate(new Date(date));
                }}

                step={30} // Time intervals for 'day' view
                timeslots={2} // Number of time slots per interval
                onSelectEvent={handleSelectEvent} // Event click handler
                eventPropGetter={eventPropGetter}
            />


            {/* Modal to display event details */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3">
                        <div className="border-b px-4 py-2 flex justify-between items-center">
                            <h3 className="font-semibold text-lg">{selectedEvent?.title}</h3>
                            <button
                                className="text-black close focus:outline-none"
                                onClick={handleClose}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            <p><strong>Description:</strong> {selectedEvent?.description}</p>
                            <p><strong>Start:</strong> {selectedEvent?.start.toLocaleString()}</p>
                            <p><strong>End:</strong> {selectedEvent?.end.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-end p-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCalendar;
