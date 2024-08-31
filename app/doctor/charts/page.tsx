"use client";

import React, { useEffect, useState } from "react";
import { Barchart } from "./BarChart";
import { Piechart } from "./PieChart";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import InfoCard from "./InfoCard";
import ambulance from "../../../public/ambulance.png"
import bed from "../../../public/hospital-bed.png";
import scope from "../../../public/stethoscope.png";
import calendar from "../../../public/calendar.png";
import Image from "next/image";
import { DoctorTable } from "./DoctorTable";

function Page() {
  const [date, setDate] = useState<string | HTMLDataElement>("");
  useEffect(() => {
    let date = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setDate(date);
  }, [date]);
  let DoctorName = "John Doe";
  return (
    <>
      <div className="flex flex-col min-h-screen mt-11 bg-slate-100">
        <section className="min-w-full mb-4 mt-2 shadow-sm">
          <div className="flex pb-2 flex-row items-center justify-center">
            <div className="mr-auto pl-4">
              <h1 className="text-md md:text-xl font-bold text-center">
                {`Good Morning, Dr. ${DoctorName}!`}
              </h1>
              <p className="text-center text-xs text-gray-500">
                Here&rsquo;s a quick overview of your patients today.
              </p>
            </div>
            <div className="pr-2 flex flex-row items-center justify-center gap-2">
              <p className="font-semibold flex flex-row gap-2 items-center justify-center text-sm px-2 py-1 rounded-xl shadow-md bg-slate-50">
                <Image src={calendar} alt="calender" width={12} />
                {date as React.ReactNode}
              </p>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <Separator />
        </section>
        <div className="mt-2 rounded-xl bg-slate-100 flex flex-col md:flex-row items-center justify-center p-4 mb-4 gap-8">
          <InfoCard title="Beds" img={bed} count={86} footer="hospital beds" />
          <InfoCard title="Doctors" img={scope} count={126} footer="doctors" />
          <InfoCard
            title="Ambulance"
            img={ambulance}
            count={32}
            footer="ambulance"
          />
        </div>
        <div className="p-2 py-6 xl:p-12 rounded-xl bg-slate-100 mb-4">
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <DoctorTable />
          </div>
        </div>
        <div className="flex flex-col shadow-md bg-slate-100 p-4 md:mx-2 lg:mx-2 xl:mx-4 rounded-md md:flex-row xl:flex-row items-center justify-center gap-4">
          <div className="shadow-lg shadow-purple-200 md:w-1/2 lg:w-1/2">
            <Barchart data={{ title: "Total Patients" }} />
          </div>
          <div className="shadow-lg shadow-purple-200 md:w-1/2 lg:w-1/2">
            <Piechart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
