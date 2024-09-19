"use client";

import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect( ()=> {
    if (typeof document !== 'undefined') require('bootstrap/dist/js/bootstrap.bundle.min.js')
  })

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
