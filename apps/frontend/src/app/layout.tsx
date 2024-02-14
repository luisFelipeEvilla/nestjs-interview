"use client";
import { NextUIProvider } from '@nextui-org/react';
import './global.css';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextUIProvider>
        <body>{children}</body>
        <Toaster/>
      </NextUIProvider>
    </html>
  );
}
