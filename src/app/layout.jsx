import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import './globals.css';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';

const metadata = {
  title: 'BabelForge',
  description: 'Everything under One Roof.\n' + 'Build your project with Task Management, and Collaboration for a Successful Project.',
};

import { Poppins, Nunito } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import QureryProvider from '@/providers/QureryProvider';
import { usePathname } from 'next/navigation';
import ScreenRecorderProvider from '@/providers/ScreenRecorderProvider';
import dynamic from 'next/dynamic';

const nunito = Nunito({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});
export default function RootLayout({ children }) {
  // const CrispWithNoSSR = dynamic(() => import('@/components/crisp'));
  const location = usePathname();

  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <html lang="en">
        <body
          className={`${nunito.className} bg-white dark:bg-[#111827] before:fixed before:-z-10 before:blur-[200px] before:lg:size-[600px] before:size-[400px] before:rounded-full before:top-[10%] before:md:start-[10%] before:-start-[20%] before:bg-indigo-600/20 after:fixed after:-z-10 after:blur-[200px] after:lg:size-[600px] after:size-[400px] after:rounded-full after:bottom-[10%] after:md:end-[10%] after:-end-[20%] after:bg-red-600/20`}
        >
          <QureryProvider>
            <ScreenRecorderProvider>
              {/* <CrispWithNoSSR /> */}
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <Navbar />
                <Toaster />
                {children}
                <Footer />
              </ThemeProvider>
            </ScreenRecorderProvider>
          </QureryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
