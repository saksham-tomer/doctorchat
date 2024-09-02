"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { TitleContext } from "./layout";
import { useRouter } from "next/navigation";

type PatientData = {
  name?: string;
  email?: string;
  image?: string;
  age?: number;
  sex?: string;
  about?: string;
};

export default function Page() {
  let { titleCallback } = useContext(TitleContext);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [patientState, setPatientState] = useState<PatientData | null>(null);
  const [displayState, setDispalyState] = useState<Boolean>(false);

  titleCallback("Patient Profile");

  const router = useRouter();

  const handlePatientCreateion = () => {
    router.push(
      `/account/${session?.user.name}/createProfile?user=` + session?.user.email
    );
  };

  useEffect(() => {
    // Define the async function inside useEffect and call it
    const fetchPatientData = async () => {
      try {
        const response = await fetch("/api/getPatientInfo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(session?.user.email),
        });
        if (response.status === 500) {
          setDispalyState(true);
        }
        const patientData: PatientData = await response.json();
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
    <div className="flex flex-col bg-slate-100 min-h-screen min-w-full">
      <Separator />
      <div className="flex flex-col gap-2 items-center justify-center mt-4">
        {session?.user.image ? (
          <>
            {isLoading && (
              <Skeleton className="min-w-28 rounded-full shadow-xl max-w-28" />
            )}
            <div
              className={`rounded-full ring ring-slate-200 shadow-lg shadow-slate-500 text-white font-semibold max-w-28 ${
                isLoading ? "hidden" : ""
              }`}
            >
              <Image
                className="rounded-full"
                src={session?.user.image}
                alt="user image"
                width={120}
                height={120}
                onLoadingComplete={() => setIsLoading(false)}
              />
            </div>
          </>
        ) : (
          <div className="rounded-full shadow-lg bg-indigo-400 text-white font-semibold max-w-32">
            {session?.user?.name.charAt(0)}
          </div>
        )}
        <div className="flex flex-col items-center mt-1">
          <p className="text-sm font-semibold text-slate-600">
            {session?.user.name}
          </p>
          <p className="text-xs font-medium text-slate-400">
            {session?.user.email}
          </p>
        </div>
      </div>
      {displayState! && (
        <div className="flex items-center justify-center mt-12">
          <button
            onClick={handlePatientCreateion}
            className="bg-green-400 font-semibold text-lg text-white p-2 rounded-full shadow-lg border-green-500 border cursor-pointer hover:bg-green-500"
          >
            Create Profile
          </button>
        </div>
      )}
    </div>
  );
}
