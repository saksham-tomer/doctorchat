"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Separator } from "@radix-ui/react-separator";
import { ChevronRight } from "lucide-react";
import React, { createContext, useEffect, useState } from "react";

export const TitleContext = createContext<null | any>(null);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [titleString, setTitle] = useState<string>("");
  let titleCallback: (pageTitle: string | any) => void = (pageTitle) => {
    setTitle((prev) => (prev = pageTitle));
  };
  useEffect(() => {
    setTitle(titleString);
  }, [titleString]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TitleContext.Provider value={{ titleCallback }}>
        <div className="flex flex-col mt-12 bg-slate-100 min-h-screen min-w-full">
          <Separator />
          <div className="flex flex-row items-center gap-4 ml-3 p-1">
            <p className="text-xs text-slate-400 font-semibold">Patient</p>
            <ChevronRight size={14} />
            <p className="text-xs text-indigo-400 font-semibold">
              {titleString}
            </p>
          </div>
          <Separator />
          {children}
        </div>
      </TitleContext.Provider>
    </LocalizationProvider>
  );
};

export default Layout;
