"use client"
import {useEffect, useState} from "react";
import useChat from "@/hooks/useChat";
import {useSession} from "next-auth/react";
import Image from "next/image";
import usericon from "@/image/icon/user.png";
import userbw from "@/image/icon/userbw.png";


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
    const uname = session?.data?.user?.name


    const { messages, sendMessage } = useChat(); // Custom hook to manage chat
    console.log(messages)
    const [newMessage, setNewMessage] = useState("");
    const [username, setUsername] = useState(""); // Optional username handling

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {

            const newMsg = {
                messages: newMessage,
                username: uname,
                cdate: currentDate,
                ctime: currentTime
            }

            console.log({ newMsg })
            sendMessage(newMsg); // Send message with username
            setNewMessage(""); // Clear input field after sending
        }
    };

    return (
        <div>
            <h1>Chat Room</h1>

            {/* Username input */}
            <input
                type="text"
                placeholder={uname}
                value={username}
                defaultValue={uname}
                onChange={(e) => setUsername(uname)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            {/* Message list */}
            <div
                style={{
                    height: "300px",
                    overflowY: "scroll",
                    border: "1px solid #ccc",
                    padding: "10px",
                }}
            >
                {messages?.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.username}:</strong> {msg.messages} <br />
                        <small>{msg.cdate} {msg.ctime}</small>
                        <hr />
                    </div>
                ))}
            </div>

            {/* New message input */}
            <input
                type="text"
                placeholder="Type your message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            />

            {/* Send message button */}
            <button onClick={handleSendMessage} style={{ width: "100%", padding: "10px", marginTop: "10px" }}>
                Send Message
            </button>

            <div>
                <div className="h-screen w-[150vh] rounded shadow-lg flex flex-col">

                    <div className="bg-gray-200 rounded flex-1 overflow-y-scroll">
                        <div className="px-4 py-2">

                            <div>
                                <div className="flex items-center mb-2">
                                    <Image className="w-8 h-8 rounded-full mr-2" src={userbw}
                                           width={50}
                                           height={50}
                                         alt="User Avatar"/>
                                    <div className="font-medium">John Doe</div>
                                </div>
                                <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
                                    Hi, how can I help you?
                                </div>
                            </div>


                            <div className="flex items-center justify-end">
                                <div className="bg-blue-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm">
                                    Sure, I can help with that.
                                </div>
                                <Image className="w-8 h-8 rounded-full" src={usericon}
                                       width={50}
                                       height={50}
                                     alt="User Avatar"/>
                            </div>

                        </div>
                    </div>


                    <div className="bg-gray-100 px-4 py-2">
                        <div className="flex items-center">
                            <input className="w-full border rounded-full py-2 px-4 mr-2" type="text"
                                   placeholder="Type your message..."/>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Chat;
