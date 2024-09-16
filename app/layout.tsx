import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FilmMax App",
  description: "website to explore famous films",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex w-full h-full">
          <div className="hidden xl:block w-80 h-full xl:fixed">
            <Sidebar />
          </div>
          <div className="w-full xl:ml-80">
              <Navbar />
              <div className="p-6 bg-[#fafbfc] dark:bg-secondary">
                  {children}
              </div>
          </div>
          </div>
      </body>
    </html>
  );
}
