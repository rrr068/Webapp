"use client"

import "./globals.css";
import Header from "../components/layouts/Header";
import { UserProvider } from "../contexts/UserContext"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
