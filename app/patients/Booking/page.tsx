"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
//import { ToastAction } from "@/components/ui/toast";
//import { useToast } from "@/components/ui/use-toast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

function Page() {
  const [date, setDate] = useState();
 // const { toast } = useToast();
  const router = useRouter()
  const handleBooking = () =>  {
    toast("Appointment Booked!!")

    setTimeout(()=>{
      router.push('/patients/appointmentDetails')
    },800)
    //  toast({
    //       title: "Scheduled: Catch up ",
    //       description: "Friday, February 10, 2023 at 5:57 PM",
    //       action: (
    //         <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
    //       ),
    //     })
  }

  

  const User = { name: "Virginia Apgar", profession: "Pediatrician" };

  return (
    <div className="mt-12 flex flex-col items-center mx-2">
      <div className="flex flex-col items-center mt-4">
        <Image
          className="rounded-full shadow-lg"
          src={"/avatar.jpg"}
          alt="userAvatar"
          height={100}
          width={100}
        />
        <h1 className="font-bold text-lg mt-2">{`Dr. ${User.name}`}</h1>
        <p className="text-sm text-gray-500 mb-1">{User.profession}</p>
        <div className="flex items-center gap-1 mt-2 bg-green-100 rounded-md px-2 py-1 mb-4">
          <Image src={"/verified.png"} alt="verified" height={15} width={15} />
          <p className="font-semibold text-green-700 text-xs">
            Medical Registration Verified
          </p>
        </div>
      </div>
      <div className="bg-gray-200 min-h-[1.5px] rounded-lg min-w-full"></div>
      <div className="flex flex-col mr-auto mt-2 min-w-full">
        <h2 className="font-semibold ml-2 mb-1">Office Location</h2>
        <div className="flex flex-row items-center mx-2 mb-2 shadow-xl min-h-12 gap-2 p-2 bg-gray-100 rounded-md">
          <Image src={"/location.png"} alt="location" height={15} width={15} />
          <p className="text-xs text-gray-600">
            Los Angeles General Medical Center
          </p>
        </div>
      </div>
      <div className="mt-5 bg-gray-200 min-h-[2px] mb-4 rounded-lg min-w-full"></div>
      <div className="flex flex-col mx-2 ">
        <div className="mr-auto">
          <h1 className="font-bold mb-4">Select an appointment Date</h1>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <div className="mt-5 bg-gray-200 min-h-[2px] mb-4 rounded-lg min-w-full"></div>
      <div
        className="text-white mb-4 font-medium flex items-center text-whiteitems-center hover:bg-indigo-600 cursor-pointer px-4 py-2 justify-center min-w-full rounded-xl shadow-lg shadow-indigo-300  bg-indigo-500"
        onClick={handleBooking}
      >
          Request Appointment
      </div>
      <ToastContainer />
    </div>
  );
}

export default Page;
