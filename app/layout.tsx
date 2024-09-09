import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RoomProvider } from "./lib/RoomContext";
const inter = Inter({ subsets: ["latin"] });
import NavBar from "./components/NavBar";
import { SigninButton } from "./components/SigninButton";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Medicare",
  description: "Doctors at doorstep",
};

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
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
