import { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "https://babelforgeserver.vercel.app";

const useChat = () => {
    const [messages, setMessages] = useState([]); // Store chat messages
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to the socket server
        const socketIo = io(SOCKET_SERVER_URL, {
            withCredentials: true,
            transports: ['websocket'],
        });

        // Listen for previous messages
        socketIo.on("previousMessages", (prevMessages) => {
            setMessages(prevMessages); // Load previous messages when connecting
        });

        // Listen for new chat messages from the server
        socketIo.on("chat message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        setSocket(socketIo);

        // Clean up on component unmount
        return () => {
            socketIo.disconnect();
        };
    }, []);

    // Function to send a new chat message
    const sendMessage = (message) => {
        if (socket) {
            socket.emit("chat message", message); // Send message to server
        }
    };

    const deleteAllMessages = async () => {
        try {
            await fetch(`${SOCKET_SERVER_URL}/chat/messages`, { // Adjust URL as necessary
                method: 'DELETE',
            });
            setMessages([]); // Clear the messages state
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
