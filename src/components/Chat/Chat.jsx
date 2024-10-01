"use client";
import { useEffect, useRef, useState } from "react";
import useChat from "@/hooks/useChat";
import { useSession } from "next-auth/react";
import Image from "next/image";
import usericon from "@/image/icon/user.png";
import userbw from "@/image/icon/userbw.png";
import { FiSend } from "react-icons/fi";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Chat = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const now = new Date();

        // Convert to GMT+6
        const gmt6Offset = 6 * 60 * 60 * 1000;
        const gmt6Date = new Date(now.getTime() + gmt6Offset);

        // Format date as YYYY-MM-DD
        const year = gmt6Date.getUTCFullYear();
        const month = String(gmt6Date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(gmt6Date.getUTCDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // Format time as HH:MM AM/PM
        let hours = gmt6Date.getUTCHours();
        const minutes = String(gmt6Date.getUTCMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedHours = String(hours).padStart(2, '0');
        const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

        // Set the formatted date and time
        setCurrentDate(formattedDate);
        setCurrentTime(formattedTime);
    }, []);

    const session = useSession();
    const uname = session?.data?.user?.name;
    const uemail = session?.data?.user?.email;

    const { messages, sendMessage, deleteAllMessages } = useChat(); // Custom hook to manage chat
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null); // Ref for the messages container

    // Scroll to the bottom of the messages container
    const scrollToBottom = () => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight; // Scroll the container to the bottom
        }
    };

    // Automatically scroll to the bottom when new messages arrive or on load
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const newMsg = {
                messages: newMessage,
                username: uname,
                cdate: currentDate,
                ctime: currentTime,
            };

            sendMessage(newMsg); // Send message with username
            setNewMessage(""); // Clear input field after sending
        }
    };

    // Handle delete all messages
    const handleDeleteAllMessages = async () => {
        if (confirm("Are you sure you want to delete all messages?")) {
            await deleteAllMessages();
            // Optionally clear the local messages state if needed
        }
    };

    const messageSection = () => {
        const section = document.getElementById("messageSection");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <div className="mb-24">
            <div className="w-full mx-auto text-center mb-8 mt-0 sm:mt-3 max-w-full sm:max-w-[920px]">
                <h1 className="font-semibold text-[1.5rem] leading-8 sm:text-4xl sm:leading-tight mb-4 block">
                    Stay Connected
                </h1>
                <h2 className="font-semibold text-[1.25rem] leading-7 sm:text-2xl sm:leading-tight mb-4 block">
                    Discuss About The Tasks With Your Team Members.
                </h2>

                <div className="w-full sm:w-auto max-w-full sm:max-w-[920px] mx-0 sm:ml-0">
                    <button
                        type="button"
                        onClick={messageSection}
                        className="inline-flex items-center shadow-sm text-sm rounded-lg text-white active:ring-2 hover:ring-2 ring-slate-100 ring-offset-2 mx-1 text-[1rem] sm:text-[1.3rem] font-light px-3 sm:px-5 py-2.5 bg-gradient-to-bl from-fuchsia-500 to-indigo-500 hover:from-fuchsia-600 hover:to-indigo-600"
                    >
                        Send a message
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-7 h-7 ml-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                            />
                        </svg>
                    </button>

                    <button
                        type="button"
                        className="inline-flex items-center shadow-sm text-sm rounded-lg text-white active:ring-2 hover:ring-2 ring-slate-100 ring-offset-2 mx-1 text-[1rem] sm:text-[1.3rem] font-light px-3 sm:px-5 py-2.5 bg-[#5965f3] hover:bg-[#3e4be0] mt-2 sm:ml-4"
                    >
                        Join Discord
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="ml-2 h-7"
                            height="26"
                            viewBox="0 0 34 34"
                            width="26"
                        >
                            <g fill="#fff">
                                <path
                                    d="m26.2543 6.96724c-2.0063-.91902-4.1515-1.58695-6.3942-1.96724-.2754.48755-.5972 1.14329-.819 1.66497-2.3841-.35103-4.7463-.35103-7.0865 0-.2219-.52168-.551-1.17742-.8289-1.66497-2.24507.38029-4.39272 1.05066-6.39895 1.97212-4.046649 5.98708-5.143625 11.82548-4.595136 17.58088 2.683936 1.9624 5.284976 3.1544 7.842166 3.9345.63135-.8508 1.19448-1.7552 1.67958-2.7083-.92388-.3437-1.80878-.7679-2.64492-1.2603.22186-.1609.43878-.3291.64842-.5022 5.09974 2.3354 10.64074 2.3354 15.67944 0 .2121.1731.4291.3413.6485.5022-.8386.4948-1.7259.919-2.6499 1.2627.4852.9507 1.0458 1.8576 1.6797 2.7083 2.5596-.78 5.1631-1.9721 7.847-3.9369.6436-6.672-1.0994-12.4568-4.6073-17.58576zm-15.9062 14.04616c-1.53084 0-2.78631-1.3992-2.78631-3.1032s1.22862-3.1056 2.78631-3.1056c1.5577 0 2.8132 1.3992 2.7864 3.1056.0024 1.704-1.2287 3.1032-2.7864 3.1032zm10.297 0c-1.5309 0-2.7863-1.3992-2.7863-3.1032s1.2286-3.1056 2.7863-3.1056 2.8131 1.3992 2.7863 3.1056c0 1.704-1.2286 3.1032-2.7863 3.1032z"
                                ></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>

            <div id="messageSection" className="w-full sm:w-[80vw] lg:w-[60vw] mx-auto">
                <div className="h-[70vh] sm:h-[80vh] w-full rounded shadow-lg flex mx-auto flex-col">
                    <div
                        ref={messagesContainerRef}
                        className="bg-gray-200 rounded p-1 flex-1 overflow-y-auto"
                    >
                        <div className="px-4 py-2">
                            {messages?.map((msg, index) => (
                                <div key={index}>
                                    {msg.username === uname ? (
                                        <div className="flex items-center justify-end my-2">
                                            <div>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div
                                                                className="bg-blue-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm">
                                                                {msg.messages}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <div className="text-sm text-gray-600 text-right mr-4">
                                                                {msg.ctime} {msg.cdate}
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>

                                            <Image
                                                className="w-8 h-8 rounded-full"
                                                src={usericon}
                                                width={50}
                                                height={50}
                                                alt="User Avatar"
                                            />
                                        </div>
                                    ) : (
                                        <div className="my-3">
                                            <div className="flex items-center mb-2">
                                                <Image
                                                    className="w-8 h-8 rounded-full mr-2"
                                                    src={userbw}
                                                    width={50}
                                                    height={50}
                                                    alt="User Avatar"
                                                />
                                                <div className="font-medium">{msg.username}</div>
                                            </div>

                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="bg-white rounded-lg p-2 shadow max-w-sm">
                                                            {msg.messages}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <div className="text-sm text-gray-600 text-left ">
                                                            {msg.cdate} {msg.ctime}
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef}/>
                        </div>
                    </div>

                    <div className="bg-gray-100 px-4 py-2">
                        <div className="flex items-center">
                            <input
                                className="w-full border rounded-full py-2 px-4 mr-2"
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                            />
                            <button
                                onClick={handleSendMessage}
                                className="flex gap-2 justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                            >
                                Send <FiSend/>
                            </button>
                        </div>

                        {uemail === "admin@admin.com" ? (
                            <button
                                onClick={handleDeleteAllMessages}
                                className="mt-2 flex justify-center items-center bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full"
                            >
                                Delete All Messages
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Chat;
