"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";

export default function Card({ props }) {

  const[avImage,setImage] = useState("")

  useEffect(()=>{
    if(props.image)
      {
        setImage(props.image)
      }
      else{
        setImage("data:image/jpeg;base64,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")
      }
  },[])

  const router = useRouter()
  const[openDrawer,setOpenDrawer] = useState(false)

  const toggleDrawer=()=>{
    setOpenDrawer((prev)=>!prev)
  }

   const bookAppointment = () => {
    router.push("/patients/Booking");
  };

  return (
    <div className="flex relative flex-col min-w-52 rounded-2xl shadow-xl bg-gradient-to-bl from-indigo-50 to-indigo-100">
      <div className="mx-2 flex flex-row items-center mt-2">
        <div className="felx flex-col mr-auto ml-2">
          <h2 className="text-lg font-medium">{props.name}</h2>
          <p className="text-gray-400 text-xs font-medium">{props.speciality}</p>
          <div className="flex flex-row mt-4">
         <Image className="shadow-xl" src={'/star.png'} alt="pic" width={12} height={12} />
         <p className="text-xs text-gray-400 pl-2 font-medium">{props.rating}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
        <Image className="rounded-xl ring-1 ring-gray-400" src={avImage} alt="pic" width={80} height={80} />
        <p className="px-2 max-w-12 ml-auto text-white font-semibold py-0 flex items-center justify-center rounded-xl bg-green-500 text-xs">{props.speciality}</p>
        </div>
      </div>
      <div className="flex flex-row">
        <div></div>
        <div className="shadow-lg">
        </div>
      </div>
      <div className="felx flex-row gap-4">
        <button onClick={bookAppointment} className="px-6 ml-2 items-center mb-4 mt-2 bg-white py-1 hover:bg-gray-100 rounded-2xl ring-1 ring-gray-300 flex gap-2">
          <div className="mr-auto ">
          <Image className="w-5" src={'/checked.png'} alt="check" width={20} height={20} />
          </div>
          <p className="text-xs font-medium mr-auto">
          Book Now
          </p>
          </button>
          <div className="absolute transform translate-x-32 -translate-y-12">
      <Drawer>
        <DrawerTrigger>
          <button
            onClick={toggleDrawer}
            className="ml-8 p-2 rounded-full bg-indigo-300 shadow-lg"
          >
            <Image src={"/phone.png"} alt="call" width={20} height={20} />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col justify-center mx-2 mt-2 items-center">
            <h1 className="font-bold lg:text-4xl text-xl mb-2 flex items-center">
              Know Your Doctor
            </h1>
            <Image
              className="shadow-xl mb-4 lg:w-60 rounded-t-xl"
              src={avImage}
              alt="doc"
              width={200}
              height={200}
            />
            <div className="flex flex-row gap-4 justify-between">
              <div className="flex flex-col lg:text-lg font-semibold">
                <h2>{props.name}</h2>
                <p className="text-xs font-light">{`${props.speciality} | ${props.hospital}`}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Image className="lg:w-7" src={"/star.png"} alt="star" height={15} width={15} />
                <p className="text-xs lg:text-base font-semibold">
                  {`${props.stars} (${props.reviews} reviews)`}{" "}
                </p>
              </div>
            </div>
            <div className="mt-3 shadow-xl ml-auto
             mb-4 flex flex-col bg-indigo-200 rounded-xl p-4 mr-auto">
              <h2 className="font-bold text-base lg:text-xl">About Me</h2>
              <p className="text-xs lg:text-sm font-light">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Molestias beatae laborum quo a exercitationem voluptas suscipit
                consectetur ad, repellendus incidunt.
              </p>
            </div>
            <button
              className="px-2 py-1 bg-green-400 font-medium text-white rounded-lg
              mb-2 shadow-green-300 shadow-md lg:text-2xl lg:px-8 lg:mt-2 lg:mb-4"
              onClick={bookAppointment}
            >
              Book An Appointment
            </button>
            <DrawerClose>
              <div className="text-sm font-light lg:text-lg lg:px-8 lg:mb-4 bg-indigo-400 px-3 py-1 mb-2 text-white rounded-lg flex flex-row items-center gap-2">
                <Image src={"/cross.png"} alt="cross" height={10} width={10} />
                Close
              </div>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
      </div>
     </div>
    </div>
  );
}
