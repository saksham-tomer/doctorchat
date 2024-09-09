"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { TitleContext } from "./layout";
import { useRouter } from "next/navigation";
import OnlineBadge from "@/app/components/onlineBadge";
import { FaUserAlt, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import Calendar from "@/app/components/AppointmentCalendar";

type PatientData = {
  patientid: string;
  doctorassigned: string;
  name?: string;
  email?: string;
  image?: string;
  age?: string;
  sex?: string;
  about?: string;
};

export default function Page() {
  let { titleCallback, isOnline } = useContext(TitleContext);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [patientState, setPatientState] = useState<
    PatientData | null | React.ReactNode
  >({
    name: "Patient Name",
    patientid: "1024",
    doctorassigned: "Dr Assigned",
    age: "19",
    sex: "Female",
    illness: ["Dangue", "malaria"],
    about:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    verified: false,
  });
  const [displayBadge, setDisplayBadge] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(true);

  titleCallback("Patient Profile");

  const illness = ["dangue", "dangue", "malaria", "fever"];

  const router = useRouter();

  const handlePatientCreateion = () => {
    router.push(
      `/account/${session?.user.name}/createProfile?user=` + session?.user.email
    );
  };

  const getRandomColor = () => {
    const colors = [
      "green-50",
      "purple-50",
      "blue-50",
      "orange-50",
      "yellow-50",
      "teal-50",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    if (session?.user.email) {
      setDisplayBadge(true);
    }

    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/getPatientByEmail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session?.user.email }),
          }
        );
        if (response.status === 500) {
          // setDispalyState(true);
        }
        const patientData: PatientData = await response.json();
        console.log(patientData);
        setPatientState(patientData);
        setIsLoading(false);
      } catch (error: any) {
        console.error(error?.message);
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, [session?.user.email]);

  return (
    <div className="flex flex-col bg-white min-h-screen w-full overflow-hidden items-center px-4 md:px-6 lg:px-8 ">
      <Separator />
      <div className="flex flex-col w-full gap-2 items-center justify-center mt-4">
        {session?.user.image ? (
          <>
            {isLoading && (
              <Skeleton className="min-w-28 rounded-full shadow-xl max-w-28" />
            )}
            <div className="rounded-full bg-gradient-to-tr from-green-400 relative to-blue-600">
              {displayBadge && (
                <div className="transform translate-y-24 md:translate-y-28 md:trans-x-8 translate-x-5 absolute">
                  <OnlineBadge />
                </div>
              )}
              <div
                className={`rounded-full p-1 shadow-lg shadow-slate-500 text-white font-semibold max-w-28 md:max-w-36 lg:max-w-56 xl:max-w-64 ${
                  isLoading ? "hidden" : ""
                }`}
              >
                <Image
                  className="rounded-full"
                  src={patientState ? patientState?.image : session?.user.image}
                  alt="user image"
                  width={120}
                  height={120}
                  onLoadingComplete={() => setIsLoading(false)}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-full shadow-lg bg-indigo-400 text-white font-semibold max-w-32">
            {session?.user?.name.charAt(0)}
          </div>
        )}
        <div className="flex flex-col items-center mt-4">
          <div className="flex flex-row items-center justify-center">
            {isVerified && (
              <div className="object-cover w-18 mr-1 flex items-center justify-center">
                <Image src={"/approved.png"} alt="" width={18} height={18} />
              </div>
            )}
            <p className="text-lg font-bold text-slate-800 mb-1 md:mb-2 lg:mb-3">
              Saksham Tomar
            </p>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Image src={"/letter.png"} alt="" height={12} width={12} />
            <p className="text-xs font-medium text-slate-400">
              {patientState ? patientState?.email : session?.user?.email}
            </p>
          </div>
          <div className="flex flex-row justify-center mt-2 md:mt-3 gap-2">
            <div className="flex flex-row gap-4 px-2 py-1 bg-gradient-to-tr from-blue-300 to-purple-300 shadow-md rounded-xl">
              <p className="text-xs font-bold text-slate-800">Age</p>
              <p className="text-xs font-semibold text-white">12 Years</p>
            </div>
            <Separator
              orientation="vertical"
              className="bg-slate-300 min-w-0 min-h-6"
            />
            <div className="flex flex-row gap-4 px-2 py-1 bg-gradient-to-tr from-blue-300 to-purple-300 shadow-md rounded-xl">
              <p className="text-xs font-bold text-slate-800">Sex</p>
              <p className="text-xs font-semibold text-white">Male</p>
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-4 w-full bg-slate-300" />
      <div className="flex flex-col md:flex-row md:gap-4 w-full items-center justify-center">
        <div className="flex flex-col md:w-1/2 w-full max-w-md mb-8 shadow-xl items-center rounded-xl mt-6 ring-1 ring-slate-300 p-4 bg-white">
          <h2 className="font-extrabold text-gray-700 text-xl lg:text-2xl mr-auto ml-2">
            Diseases
          </h2>
          {illness.map((illness, id) => (
            <div
              key={id}
              className={`flex w-full capitalize flex-row items-center justify-between shadow-sm mb-1 rounded-md mt-3 bg-${getRandomColor()} p-2`}
            >
              <Image src={"/drag.png"} alt="" height={16} width={16} />
              <div
                className={`text-sm md:text-base lg:text-lg xl:text-xl mr-4 text-slate-500 font-light text-${getRandomColor()} ml-auto`}
              >
                {illness}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:w-1/2 w-full p-6 mb-8 rounded-lg shadow-lg max-w-md bg-white min-h-80">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">About</h2>
              <p className="text-gray-600 text-sm">{session?.user.name}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <FaUserAlt className="text-indigo-500 w-4 h-4 mr-2" />
              <span>{patientState.patientid}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaBriefcase className="text-indigo-500 w-4 h-4 mr-2" />
              <span>{patientState.doctorassigned}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="text-indigo-500 w-4 h-4 mr-2" />
              <span>India</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col md:gap-6 md:flex-row flex items-center justify-center">
        <div className="p-2 sm:mb-8 ring-1 ring-gray-300 rounded-xl min-w-80 shadow-sm">
          <h1 className="font-semibold text-lg lg:text-xl text-slate-400 mb-4">
            Your Information
          </h1>
          <div className="text-wrap max-w-96 min-w-72 text-gray-500 font-normal mb-2">
            {patientState.about}
          </div>
        </div>
        <div className="flex mt-4 flex-col items-center mb-6">
          <h1 className="font-semibold text-lg text-slate-500 mb-2">
            Appointment Day
          </h1>
          <Calendar highlightedDate={new Date().getTime()} />
        </div>
      </div>
      <div className="flex mb-8 items-center justify-center mt-12">
        <button
          onClick={handlePatientCreateion}
          className="bg-green-400 md:min-w-96 font-semibold text-lg text-white p-2 rounded-full shadow-lg border-green-500 border cursor-pointer hover:bg-green-500"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
