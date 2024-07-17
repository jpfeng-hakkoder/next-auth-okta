import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from '@/app/providers/NextAuthProvider';
import TheTopNavBar from "@components/TheTopNavBar/TheTopNavBar";
import { authOptions } from '@lib/auth'
import { getServerSession } from "next-auth/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
