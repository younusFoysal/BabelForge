import { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketIo = io(SOCKET_SERVER_URL);


        socketIo.on("previousMessages", (prevMessages) => {
            setMessages(prevMessages);
        });


        socketIo.on("chat Message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        setSocket(socketIo);


        return () => {
            socketIo.disconnect();
        };
    }, []);


    const sendMessage = (message) => {
        if (socket) {
            socket.emit("chat message", message);
        }
    };

    const deleteAllMessages = async () => {
        try {
            await fetch(`${SOCKET_SERVER_URL}/chat/messages`, {
                method: 'DELETE',
            });
            setMessages([]);
        } catch (error) {
            console.error('Failed to delete messages:', error);
        }
    };

    return {
        messages,
        sendMessage,
        deleteAllMessages
    };
};

export default useChat;