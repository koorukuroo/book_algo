import type { Metadata } from "next";
import { Gowun_Dodum, Gaegu } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const body = Gowun_Dodum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Gaegu({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "알고리즘, 인생을 계산하다 — Algorithms to Live By",
  description:
    "Brian Christian과 Tom Griffiths의 책 『알고리즘, 인생을 계산하다』를 인터랙티브하게 읽기. 37% 규칙부터 베이즈 추론, 게임이론까지 11개 챕터를 일러스트와 시뮬레이션으로 만나보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
