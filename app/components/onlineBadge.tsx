"use client";

import React from "react";

const OnlineBadge = ({ props }: { props: React.ReactNode } | any) => {
  return (
    <>
      <div className="px-4 shadow-md border border-white py-0 bg-gradient-to-tr from-green-400 to-blue-600 text-xs font-semibold text-white rounded-2xl">
        Online
      </div>
      <div className="-translate-y-5">
        <div className="bg-green-400 p-1 absolute animate-ping rounded-full"></div>
        <div className="bg-green-300 p-1 rounded-full absolute"></div>
      </div>
    </>
  );
};

export default OnlineBadge;
