import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import AuthProvider from '@/services/AuthProvider';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import PaymentProvider from '@/providers/ContextProvider';
import React from 'react';

const metadata = {
  title: 'BabelForge',
  description: 'Generated by BabelForge Team',
};

import { Poppins, Nunito } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
// const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

const nunito = Nunito({ weight: ['200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] });
export default function RootLayout({ children }) {
  const CrispWithNoSSR = dynamic(() => import('../components/crisp'));

  return (
    <html lang="en">
      <body
        className={`${nunito.className} before:fixed before:-z-10 before:blur-[200px] before:lg:size-[600px] before:size-[400px] before:rounded-full before:top-[10%] before:md:start-[10%] before:-start-[20%] before:bg-indigo-600/20 after:fixed after:-z-10 after:blur-[200px] after:lg:size-[600px] after:size-[400px] after:rounded-full after:bottom-[10%] after:md:end-[10%] after:-end-[20%] after:bg-red-600/20 `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PaymentProvider>
            <AuthProvider>
              <CrispWithNoSSR />
              <Navbar />
              {children}
              <Footer />
              <Toaster position="top-center" reverseOrder={false} />
            </AuthProvider>
          </PaymentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
