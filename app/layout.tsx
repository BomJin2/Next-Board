import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./styles/globals.css";
import "./styles/main.scss";

const NOTO_SANS_KR = Noto_Sans_KR({
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BomToDo",
  description: "Shadcn UI + Next.js ToDo-Board 만들기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body lang="ko" className={`${NOTO_SANS_KR.className}`}>
        {children}
      </body>
    </html>
  );
}
