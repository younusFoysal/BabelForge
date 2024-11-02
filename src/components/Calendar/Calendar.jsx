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

import Modal from 'react-modal';
import { IoCloseSharp } from 'react-icons/io5';

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

    //console.log('event: ', selectedEvent);

    const eventPropGetter = (event) => {
        let backgroundColor = 'lightblue';
        let textColor = '#ffff';
        let borderLeft = '4px solid transparent';

        if (event.status === 'todo') {
            backgroundColor = '#d0e1ff'; //light blue
            textColor = '#4a90e2';
            borderLeft = '4px solid #4a90e2';
        }

        else if (event.status === 'inProgress') {
            backgroundColor = 'rgb(199 210 254)';
            textColor = 'rgb(55 48 163)';
            borderLeft = '4px solid rgb(55 48 163)';
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


                <Modal
                    isOpen={showModal}

                    contentLabel="Edit Task Modal"
                    className="modal-dialog bg-white dark:bg-[#181024]"
                    overlayClassName="modal-overlay"
                >
                    <div className="w-7xl rounded-2xl dark:bg-[#181024] dark:text-white relative z-[999] py-0 max-h-[80%]  px-4">
                        <div className="py-6 w-full left-0 sticky px-4 top-0 dark:bg-[#181024] dark:text-white bg-white">
                            <div>
                                <div>
                                    <h2 className='border-b dark:border-b-[#3e1878c2] font-bold pb-2'>{selectedEvent?.title}</h2>
                                    <div className="p-4 dark:text-gray-100 space-y-2">
                                        <p><strong>Description:</strong> {selectedEvent?.description}</p>
                                        <p><strong>Assigned At: </strong> {selectedEvent?.start.toLocaleString()}</p>
                                        <p><strong>Assigned By: </strong> {selectedEvent?.author}</p>
                                        <p><strong>Status: </strong> <span className='capitalize'>{selectedEvent?.status}</span></p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-[24px] fixed top-4 right-4 hover:scale-110 duration-300 hover:rotate-180"
                                >
                                    <IoCloseSharp />
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default MyCalendar;
