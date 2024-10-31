'use client';
import { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import logo from '@/image/Home/babellogo.png';
import userbw from '@/image/icon/userbw.png';
import usePlan from '@/hooks/usePlan';
import useRole from '@/hooks/useRole';
import { redirect } from 'next/navigation';

const AIHelper = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([{ sender: 'AI Assistant', message: 'Hi, how can I help you today?' }]);
  const [plan] = usePlan();
  const [role] = useRole();
  if (plan === 'Basic' || !role === 'admin') redirect('/dashboard');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://babelforgeserver.vercel.app/ai/ai/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error('Network error!');

      const data = await res.json();
      setChatHistory([...chatHistory, { sender: 'You', message: prompt }, { sender: 'AI Assistant', message: data.response }]);
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
    <div className="max-w-full h-screen flex items-center mx-auto">
      <div className="h-[calc(100%-7rem)] flex flex-col md:mt-16 mx-6 md:mx-12   w-full ">
        <div className="flex flex-col items-center mx-auto mb-4">
          <h1 className="font-semibold text-[1.5rem] leading-8 sm:text-4xl sm:leading-tight mb-4 block">Your AI Assistant</h1>
          <h2 className="font-semibold text-[1.25rem] leading-7 sm:text-2xl sm:leading-tight mb-4 block">
            Need help in task management? ask...
          </h2>
        </div>

        <div className="drop-shadow-xl flex-1 flex flex-col dark:border-[#3e1878c2] dark:bg-[#181024] bg-white p-6 rounded-lg border border-[#e5e7eb] max-h-[634px] w-full">
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="font-semibold text-lg tracking-tight ">AI Assistant</h2>
            <p className="text-xs w-full text-[#6b7280] leading-5">
              Your Personal Guide. AI Assistant can make mistakes. Check important info.
            </p>
          </div>

          <div className="pr-4 flex-1 py-6 h-full min-w-full overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex gap-3 my-4 text-sm ${chat.sender === 'AI Assistant' ? 'justify-start' : 'justify-end'}`}>
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className={`rounded-full ${chat.sender === 'AI Assistant' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100'} border`}>
                    <Image src={chat.sender === 'AI Assistant' ? logo : userbw} alt={chat.sender} className="w-full" />
                  </div>
                </span>
                <div
                  className={`p-2 rounded-lg ${
                    chat.sender === 'AI Assistant'
                      ? 'bg-blue-50 dark:bg-[#200e3b] dark:border-[#3e1878] dark:text-white text-black border border-blue-200'
                      : 'bg-gray-100 dark:bg-[#5e28b0] dark:border-[#a264ff] dark:text-white border text-black'
                  }`}
                >
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
                className="flex dark:text-white dark:bg-[#010313] dark:border-[#5d23b6] h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] text-[#030712]"
                placeholder="Type your message"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
              <button
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md text-sm font-medium  hover:scale-105 duration-500  disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
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
    </div>
  );
};

export default AIHelper;
