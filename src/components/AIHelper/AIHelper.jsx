'use client';
import { useState } from 'react';
import Image from "next/image";
import axios from 'axios';
import logo from "@/image/Home/babellogo.png";
import userbw from "@/image/icon/userbw.png";

const AIHelper = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { sender: "Babel AI", message: "Hi, how can I help you today?" }
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return; // Avoid empty prompts

        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:5000/ai/ai/prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) throw new Error('Network response was not ok');

            const data = await res.json();
            setChatHistory([...chatHistory, { sender: 'You', message: prompt }, { sender: 'Babel AI', message: data.response }]);
            setPrompt('');
        } catch (err) {
            setError('Error connecting to AI service: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>AI Helper</h1>
            <div className="drop-shadow-xl right-0 mr-4 mb-24 bg-white p-6 rounded-lg border border-[#e5e7eb] h-[634px]">
                <div className="flex flex-col space-y-1.5 pb-6">
                    <h2 className="font-semibold text-lg tracking-tight">Babel AI</h2>
                    <p className="text-sm text-[#6b7280] leading-3">Your personal guide.</p>
                </div>

                <div className="pr-4 h-[474px] min-w-full overflow-y-auto">
                    {chatHistory.map((chat, index) => (
                        <div key={index} className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                <div className={`rounded-full ${chat.sender === 'Babel AI' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100'} border p-1`}>
                                    <Image src={chat.sender === 'Babel AI' ? logo : userbw} alt={chat.sender} className="w-full" />
                                </div>
                            </span>
                            <p className="leading-relaxed">
                                <span className="block font-bold text-gray-700">{chat.sender}</span>
                                {chat.message}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center pt-0">
                    <form className="flex items-center justify-center w-full space-x-2" onSubmit={handleSubmit}>
                        <input
                            className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] text-[#030712]"
                            placeholder="Type your message"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
                            type="submit"
                            disabled={loading || !prompt.trim()}
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                </div>

                {error && <div className="text-red-500">{error}</div>}
            </div>
        </div>
    );
};

export default AIHelper;
