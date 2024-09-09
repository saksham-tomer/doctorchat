"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Slide from "../components/Slide";
import { useSlider } from "@/lib/SliderContext";
import { useSession } from "next-auth/react";
import useDeviceDetection from "@/utils/hooks/useDeviceDetect";
import Card from "../components/Card";
import getAllDoctors from "../lib/doctorHelper";
import { SkeletonDemo } from "../components/Skeleton";

function Page() {
  const handleInput = () => {};
  const sliderRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const [doctors, setDoctors] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    async function getAll() {
      const resp = await getAllDoctors();
      setDoctors((prev) => (prev = resp));
    }
    getAll();
  }, []);

  const device = useDeviceDetection();

  const forward = () => {
    const tar = sliderRef.current;
    tar.scrollLeft += 100;
  };
  const backward = () => {
    const tar = sliderRef.current;
    tar.scrollLeft -= 100;
  };

  const [layout, toggleLayout] = useState("stack");

  const { toggleSlider, sliderVisible } = useSlider();

  return (
    <div className="mt-12 relative">
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden bg-indigo-100 bg-transparent backdrop-blur-2xl min-w-72 py-3 px-2 flex items-center justify-between rounded-2xl shadow-xl">
        <div className="cursor-pointer hover:bg-indigo-300 rounded-xl p-1">
          <Image src={"/home.png"} alt="" width={22} height={22} />
        </div>
        <div className="cursor-pointer hover:bg-indigo-300 rounded-xl p-1">
          <Image src={"/calendar.png"} alt="" width={22} height={22} />
        </div>
        <div className="cursor-pointer hover:bg-indigo-300 rounded-xl p-1">
          <Image src={"/document.png"} alt="" width={22} height={22} />
        </div>
        <div className="cursor-pointer hover:bg-indigo-300 rounded-xl p-1">
          <Image src={"/user.png"} alt="" width={22} height={22} />
        </div>
      </div>

      {sliderVisible && <div className="fixed z-20"></div>}
      <div className="flex flex-col bg-indigo-500 rounded-b-lg">
        <div className="flex flex-row px-4 mt-6 md:mx-6 mb-4 items-center justify-between">
          <div className="flex flex-row gap-2">
            <div className="shadow-lg rounded-full">
              <Image
                className="rounded-full md:w-14"
                src={session?.user.image}
                alt="user-image"
                width={32}
                height={32}
              />
            </div>
            <div className="flex flex-col items-center ">
              <div className="font-thin text-white md:text-base text-xs">
                Hello, Welcome
              </div>
              <div className="font-medium flex items-center md:text-lg text-white text-sm">
                {session?.user.name}
              </div>
            </div>
          </div>
          <div className="rounded-lg  shadow-xl cursor-pointer border-2 p-1 border-indigo-400">
            <Image
              className="shadow-xl md:w-8"
              src={"/notification.png"}
              alt="notification"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="relative mx-auto mb-4 shadow-lg">
          <Image
            className="absolute translate-x-2 translate-y-2 shadow-lg"
            src={"/search.png"}
            alt="search"
            width={20}
            height={20}
          />
          <form onSubmit={handleInput}>
            <input
              className="placeholder:text-white pl-8 placeholder:font-light placeholder:text-xs rounded-lg min-w-80 p-2 bg-transparent border-[1px] text-white border-indigo-300 text-left text-sm font-medium default:outline-none focus:outline-indigo-300 focus:outline-0 md:min-w-[600px] lg:min-w-[1000px]"
              type="search"
              placeholder="Search Doctor..."
              id="SearchDoctor"
              name="SearchDoctor"
              list="serch"
            />
            <datalist id="serch">
              <option value="heart" />
              <option value="physio" />
              <option value="general" />
              <option value="brain" />
            </datalist>
          </form>
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center mx-2 mt-6 justify-between">
          <p className="font-semibold text-lg md:text-2xl md:mx-6 lg:mx-12">
            Top Doctors
          </p>
          <div className="flex gap-4 shadow-xl py-2 px-4 bg-gray-50 flex-row ring-1 ring-gray-100 rounded-lg mr-4">
            <div
              onClick={() => toggleLayout((prev) => (prev = "card"))}
              className="p-2 rounded-xl shadow-lg cursor-pointer bg-gray-300 hover:bg-gray-400"
            >
              <Image src={"/layout.png"} alt="small" width={18} height={18} />
            </div>
            <div
              onClick={() => toggleLayout((prev) => (prev = "stack"))}
              className="p-2 rounded-xl cursor-pointer shadow-lg bg-gray-300 hover:bg-gray-400"
            >
              <Image src={"/row.png"} alt="small" width={18} height={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-2 mt-4 flex flex-col gap-4 items-center">
        {layout === "stack" && (
          <div className="flex flex-col gap-4">
            {
              <Suspense fallback={<SkeletonDemo />}>
                {Object.keys(doctors).map((doc, id) => {
                  return (
                    <div key={id}>
                      <Slide
                        props={{
                          name: doctors[doc].firstname,
                          did: doctors[doc].doctorid,
                          speciality: doctors[doc].specialization,
                          about: doctors[doc].about,
                          image: doctors[doc].image,
                          hospital: doctors[doc].hospital,
                          rating: doctors[doc].rating,
                          stars: doctors[doc].rating,
                        }}
                      />
                    </div>
                  );
                })}
              </Suspense>
            }
          </div>
        )}
        {layout === "card" && (
          <div className="relative">
            {" "}
            <div
              ref={sliderRef}
              className="flex scrollbar-hide min-h-72 items-center flex-row overflow-y-hidden max-w-72 rounded-lg gap-8  md:grid md:gap-6 md:grid-cols-3 md:grid-rows-2"
            >
              {Object.keys(doctors).map((doc, id) => {
                return (
                  <div key={id} className="min-w-full min-h-screen">
                    <Card
                      props={{
                        name: doctors[doc].firstname,
                        did: doctors[doc].doctorid,
                        speciality: doctors[doc].specialization,
                        about: doctors[doc].about,
                        image: doctors[doc].image,
                        hospital: doctors[doc].hospital,
                        rating: doctors[doc].rating,
                        stars: doctors[doc].rating,
                      }}
                    />
                  </div>
                );
              })}
              <button
                onClick={forward}
                className="absolute  rounded-full bg-indigo-300 hover:bg-indigo-400 text-white px-2 shadow-lg py-2 transform translate-x-64 translate-y-3"
              >
                <Image
                  src={"/arrowright1.png"}
                  alt="arrow"
                  width={30}
                  height={30}
                />
              </button>
              <button
                onClick={backward}
                className="absolute  rounded-full bg-indigo-300 hover:bg-indigo-400 text-white px-2 py-2 transform shadow-md -translate-x-8 translate-y-3"
              >
                <Image
                  src={"/arrowleft.png"}
                  alt="arrow"
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
