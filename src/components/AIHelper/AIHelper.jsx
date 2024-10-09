'use client';
import { useState } from 'react';
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import logo from "@/image/Home/babellogo.png";
import userbw from "@/image/icon/userbw.png";

const AIHelper = () => {
    const [prompt, setPrompt] = useState('');
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
            setChatHistory([
                ...chatHistory,
                { sender: 'You', message: prompt },
                { sender: 'Babel AI', message: data.response }
            ]);
            setPrompt('');
        } catch (err) {
            setError('Error connecting to AI service: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderers = {
        code: ({ node, inline, className, children }) => {
            const language = className?.replace(/language-/, '') || '';
            return inline ? (
                <code className={className}>{children}</code>
            ) : (
                <SyntaxHighlighter style={coldarkDark} language={language} PreTag="div">
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            );
        },
    };

    return (
        <div className="container mx-auto py-6">

            <div className="flex flex-col items-center mx-auto mb-4">
                <h1 className="font-semibold text-[1.5rem] leading-8 sm:text-4xl sm:leading-tight mb-4 block">
                    Babel AI
                </h1>
                <h2 className="font-semibold text-[1.25rem] leading-7 sm:text-2xl sm:leading-tight mb-4 block">
                    Need help in task management? ask...
                </h2>
            </div>

            <div className="drop-shadow-xl bg-white p-6 rounded-lg border border-[#e5e7eb] h-[634px] w-full">
                <div className="flex flex-col space-y-1.5 pb-6">
                    <h2 className="font-semibold text-lg tracking-tight ">Babel AI</h2>
                    <p className="text-sm w-full text-[#6b7280] leading-3">Your Personal Guide.</p>
                </div>

                <div className="pr-4 h-[474px] min-w-full overflow-y-auto">
                    {chatHistory.map((chat, index) => (
                        <div key={index} className={`flex gap-3 my-4 text-sm ${chat.sender === 'Babel AI' ? 'justify-start' : 'justify-end'}`}>
                            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                <div className={`rounded-full ${chat.sender === 'Babel AI' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100'} border`}>
                                    <Image src={chat.sender === 'Babel AI' ? logo : userbw} alt={chat.sender} className="w-full" />
                                </div>
                            </span>
                            <div className={`p-2 rounded-lg ${chat.sender === 'Babel AI' ? 'bg-blue-50 text-black border border-blue-200' : 'bg-gray-100 border text-black'}`}>
                                <p className="font-bold">{chat.sender}</p>
                                <div className="chat-message">
                                    <ReactMarkdown components={renderers}>{chat.message}</ReactMarkdown>
                                </div>
                            </div>
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

                {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
        </div>
    );
};

export default AIHelper;