"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Layout({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
}

export default Layout;
