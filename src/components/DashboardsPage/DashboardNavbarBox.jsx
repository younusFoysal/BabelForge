'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';

const NavbarItems = [
  {
    title: 'Project',
    href: '/dashboard/projects',
  },
  {
    title: 'Teams',
    href: '/dashboard/teams',
  },
  {
    title: 'Group Chat',
    href: '/dashboard/chat',
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Review',
    href: '/dashboard/review',
  },
];

const DashboardNavbarBox = () => {
  const [isRecording, setIsRecording] = useState(false);
  useEffect(() => {
    const handleBeforeUnload = event => {
      if (isRecording) {
        event.preventDefault();
        event.returnValue = 'Screen recording is in progress. Are you sure you want to leave?';
        return 'Screen recording is in progress. Are you sure you want to leave?'; // For some browsers
      }
    };
    // Add event listener to prevent page reload
    window.addEventListener('beforeunload', handleBeforeUnload);
    // Cleanup on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isRecording]);

  const startRecording = () => setIsRecording(true);
  const stopRecording = () => setIsRecording(false);

  const pathname = usePathname();
  return (
    <nav className="hidden md:flex">
      <div style={{ padding: '2rem' }}>
        <h1>Screen Recorder in Next.js</h1>
        <button onClick={startRecording} disabled={isRecording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording} style={{ marginLeft: '1rem' }}>
          Stop Recording
        </button>
      </div>
      <ul className="flex space-x-6 items-center justify-center">
        {NavbarItems.map(nav => (
          <Link href={nav.href} key={nav.href}>
            <li className={`hover:text-blue-500 ${pathname === nav.href ? 'text-blue-500 font-semibold' : ''}`}>{nav.title}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardNavbarBox;
