"use client";
import React, { ReactNode } from "react";
import Nav from "../components/Nav";
import SliderProvider from "@/lib/SliderContext";

// type Props = {
//   props: ReactNode;
// };

export default function Layout({ children }) {
  return (
    <SliderProvider>
      <div className="bg-white">
        {children}
      </div>
    </SliderProvider>
  );
}
