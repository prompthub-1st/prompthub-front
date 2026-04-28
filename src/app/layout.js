import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Prompt Hub",
  description: "AI 프롬프트를 공유하고 관리하는 커뮤니티",
  icons: {
    icon: "/logo.png", 
  }
}

export default function RootLayout({ children }) {


  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
