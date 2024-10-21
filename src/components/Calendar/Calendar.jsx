"use client"

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useAxiosCommon from '@/lib/axiosCommon';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
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

    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [date, setDate] = useState(new Date());

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const eventPropGetter = (event) => {
        console.log(event.status);
        let backgroundColor = 'lightblue';
        let textColor = '#000000';

        if (event.status === 'todo') {
            backgroundColor = '#fffacd';
        } else if (event.status === 'inprogress') {
            backgroundColor = '#add8e6';
        } else if (event.status === 'done') {
            backgroundColor = '#90ee90';
        }

        return { style: { backgroundColor, color: textColor } };
    };

    return (
        <div style={{ height: '500px', margin: '50px 50px 50px 400px ' }}>
            <Calendar
                localizer={localizer}
                events={tasks.data}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}

                defaultView="month"
                views={['month']}

                // views={[Views.MONTH, Views.WEEK, Views.DAY]}
                // defaultView={view}
                // view={view}
                date={date}
                // onView={(view) => setView(view)}
                onNavigate={(date) => {
                    setDate(new Date(date));
                }}

                step={30}
                timeslots={2}
                onSelectEvent={handleSelectEvent}
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
