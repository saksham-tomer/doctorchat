import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RoomProvider } from "./lib/RoomContext";
const inter = Inter({ subsets: ["latin"] });
import NavBar from "./components/NavBar";
import { SigninButton } from "./components/SigninButton";

export const metadata: Metadata = {
  title: "Medicare",
  description: "Doctors at doorstep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RoomProvider>
          <div>
            <NavBar SigninButton={SigninButton} />
            {children}
          </div>
        </RoomProvider>
      </body>
    </html>
  );
}
