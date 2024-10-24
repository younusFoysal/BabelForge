"use client"

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useAxiosCommon from '@/lib/axiosCommon';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import './Calendar.css'
import { useTheme } from 'next-themes';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const axiosCommon = useAxiosCommon();
    const { user } = useUser();
    const uemail = user?.primaryEmailAddress?.emailAddress;
    const { resolvedTheme } = useTheme();

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
        let backgroundColor = 'lightblue';
        let textColor = '#ffff';
        let borderLeft = '4px solid transparent';

        if (event.status === 'todo') {
            backgroundColor = '#d0e1ff'; //light blue
            textColor = '#4a90e2';
            borderLeft = '4px solid #4a90e2';
        }

        else if (event.status === 'inprogress') {
            backgroundColor = '#eeddff';
            textColor = '#6b357a';
            borderLeft = '4px solid #6b357a';
        }

        else if (event.status === 'done') {
            backgroundColor = '#edd8f3'; //light purple
            textColor = '#785c7d';
            borderLeft = '4px solid #785c7d';
        }

        return { style: { backgroundColor, color: textColor, borderLeft, fontWeight: 'bold', fontSize: '0.75rem', padding: '4px', marginTop: '2px' } };
    };

    return (
        <div className={`${resolvedTheme === 'dark' ? "event-calendar-dark" : "event-calendar-light"}`} style={{ height: '500px', margin: '30px' }}>
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
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 dark:bg-gray-900/90 dark:text-gray-300 dark:border-white/30 dark:hover:shadow-white/20">
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
                            <p><strong>Assigned At: </strong> {selectedEvent?.start.toLocaleString()}</p>
                            <p><strong>Assigned By: </strong> {selectedEvent?.author}</p>
                            <p><strong>Status: </strong> <span className='capitalize'>{selectedEvent?.status}</span></p>
                        </div>
                        <div className="flex justify-end p-4">
                            <button
                                className="px-6 py-3 capitalize bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-105"
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
