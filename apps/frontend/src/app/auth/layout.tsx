'use client';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../contexts/authContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextUIProvider>
        <body>
          <AuthProvider>
            <div className="max-w-[1200px] mx-auto py-6 px-4">{children}</div>
            <Toaster />
          </AuthProvider>
        </body>
      </NextUIProvider>
    </html>
  );
}
