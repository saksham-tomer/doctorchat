"use client"

import { Join } from "./components/CreateButton";

import Image from "next/image";
import Nav from "./components/Nav";
import Marquee from "react-fast-marquee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import { firebaseApp } from "@/lib/firebase";
import { getMessaging,onMessage } from "firebase/messaging";
import useFcmToken from "@/utils/hooks/useFcmToken";
import { useRouter } from "next/navigation";

export default function Home() {

const router = useRouter()

const patientRedirect = ()=>{
  router.push('/patients')
}

const {fcmToken,notificationPermissionStatus} = useFcmToken()

fcmToken && console.log("fmc token",fcmToken);

useEffect(()=>{
   if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Foreground push notification received:', payload);
        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    } 
},[])

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-300 bg-no-repeat bg-cover overflow-hidden">
      <div className="min-h-screen relative ">
        
        <div className="flex backdrop-blur-md flex-col md:gap-8 md:flex-row xl:mx-52 xl:gap-32 justify-between items-center p-8 pl-12 pr-12 mt-16">
          <Image
            className="rounded-full md:w-[350px] lg:w-[500px] xl:[800px] shadow-2xl shadow-blue-600"
            src={'/roundbg.gif'}
            alt="doc"
            height={350}
            width={350}
          />
          <Join />
          <div className=" flex flex-row  items-center justify-between mt-12">
            <div className="flex flex-col  items-center min-w-full">
              <div className="text-5xl font-bold min-h-full text-left pb-4">
                <span className="text-5xl font-bold bg-yellow-400 px-2 rounded-xl mr-2">
                  Right
                </span>
                Choice
              </div>
              <div className="text-5xl font-bold pb-4">
                For Your
                <span className="text-5xl font-bold bg-yellow-400 px-2 rounded-xl mr-2">
                  Health
                </span>
              </div>
              <div className="text-5xl font-bold">
                <span className="font-bold text-5xl px-2 rounded-xl bg-yellow-400">
                  Care
                </span>
                Needs !
              </div>
              <div className="pt-8">
                <div className="pb-5 font-semibold text-sm">
                  Caring For Growing Needs Of Our Community
                </div>
                <button onClick={patientRedirect} className="bg-yellow-500 rounded-3xl px-4 py-2 text-white ring-1 shadow-md ring-white">
                  Book an Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="min-w-full min-h-[1px] bg-gray-400"></div>
        <div className="backdrop-blur-md pt-4">
          <Marquee
            autoFill
            pauseOnClick
            gradient
            gradientColor=""
            direction="left"
          >
            <div className="m-1 flex space-x-5 px-2 py-1 font-bold text-sm cursor-pointer text-yellow-400   rounded-2xl bg-[#202020]">
              Online Consultancy
            </div>
            <div className="m-1 flex space-x-5 px-2 py-1 font-bold text-sm cursor-pointer text-yellow-400   rounded-2xl bg-[#202020]">
              One On One Interaction
            </div>
            <div className="m-1 flex space-x-5 px-2 py-1 font-bold text-sm cursor-pointer text-yellow-400   rounded-2xl bg-[#202020]">
              24hr Service
            </div>
            <div className="m-1 flex space-x-5 px-2 py-1 font-bold text-sm cursor-pointer text-yellow-400   rounded-2xl bg-[#202020]">
              Ambulance On Demand
            </div>
            <div className="m-1 flex space-x-5 px-2 py-1 font-bold text-sm cursor-pointer text-yellow-400   rounded-2xl bg-[#202020]">
              Ondivne Prescription
            </div>
            <div className="m-1 flex space-x-5 px-2 py-1 font-bold text-sm cursor-pointer text-yellow-400   rounded-2xl bg-[#202020]">
              Private Chat
            </div>
          </Marquee>
          <div className="flex pl-8 gap-12 pr-4 mt-8 flex-col md:flex-row justify-between items-center">
            <div>
              <ul className="">
                <li className="flex bg-slate-100 mb-4 shadow-lg rounded-2xl justify-center gap-4 p-4   flex-row items-center">
                  <div className="p-2 bg-slate-200 rounded-xl shadow-xl">
                    <Image
                      className="shadow-xl"
                      src={"/calendar.png"}
                      alt="image"
                      height={32}
                      width={32}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-semibold">Set The Schedule</p>
                    <p className="font-light">
                      Make sure your doctor have not scheduled with other people
                    </p>
                  </div>
                </li>
                <li className="flex mb-4 shadow-lg rounded-2xl p-4 gap-4 justify-center bg-purple-400 flex-row items-center">
                  <div className="p-2 bg-purple-300 rounded-xl shadow-xl">
                    <Image
                      className="shadow-xl"
                      src={"/chat.png"}
                      alt="image"
                      height={32}
                      width={32}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-white">
                      Communicate With The Doctor
                    </p>
                    <p className="font-light text-white">
                      Consult your condition and convey your complaints to the
                      doctor
                    </p>
                  </div>
                </li>
                <li className="flex bg-slate-100 mb-4 shadow-lg rounded-2xl justify-center gap-4 p-4 flex-row items-center">
                  <div className="p-2 bg-slate-200 rounded-xl shadow-xl">
                    <Image
                      className="shadow-xl"
                      src={"/shield.png"}
                      alt="image"
                      height={32}
                      width={32}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-semibold">Find And Treat Your Disease</p>
                    <p className="font-light">
                      Find the cause and you will find a solution wiht the
                      Doctor
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <div className="text-purple-600 mb-2 text-sm font-semibold">
                Why choose us
              </div>
              <h1 className="font-extrabold text-2xl mb-4">
                Professional doctors with guaranteed experience
              </h1>
              <p className="font-medium mb-12 text-sm">
                There are expert doctors ready to help you understand
                yourself.Get quick and easy access to quality advice regarding
                your physical and mental health
              </p>
              <div className="flex flex-row rounded-xl bg-white mb-8 shadow-2xl p-2 gap-6 items-center justify-center">
                <div className="flex flex-col ">
                  <div className="font-bold text-2xl">100&#x25;</div>
                  <div className="text-base flex items-center justify-center px-1 rounded-2xl bg-green-400 shadow-lg  text-black">
                    Guaranted
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-2xl">2&#x2C;000&#x2B;</div>
                  <div className="text-base flex items-center justify-center px-1 rounded-2xl bg-green-400 shadow-lg text-black">
                    Trusted
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-2xl">1&#x2C;000&#x2B;</div>
                  <div className="text-base flex items-center justify-center px-1  rounded-2xl bg-green-400 shadow-lg  text-black">
                    Doctors
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center md:pl-36 md:pr-48 lg:pl-60 lg:pr-64 mt-24 pl-4 pr-2 mb-12 text-xs md:text-base">
            <p className="font-semibold text-sm text-purple-600 mb-4">
              Features
            </p>
            <h1 className="text-xl md:text-3xl mb-8 text-center font-bold">
              Overview of the Main Features of Our Services That Can Help You
            </h1>
            <div className="font-light text-xs md:text-base text-wrap text-center text-gray-500">
              Explore In Depth Our Range of Professional Sevices Providing
              Trusted Solutions for Your Needs
            </div>
          </div>
          <div className="rounded-xl shadow-xl md:flex-row lg:ml-32 justify-between lg:mr-36 pb-2 mb-4 xl:ml-40 xl:mr-40 bg-teal-100 flex flex-col ml-4 mr-4 relative">
            <div className="flex flex-col items-center ">
              <div className="flex flex-col ml-6 mt-14">
                <h1 className="text-2xl font-bold mb-4 xl:text-4xl">
                  Discussion with the Doctor
                </h1>
                <p className="mb-12 font-normal text-sm xl:text-base">
                  Schedule an in-depth Discussion Session with an Expert Doctor
                  to Get Comprehensive Health Information and Solutions
                </p>
              </div>
              <button onClick={patientRedirect} className="rounded-lg lg:text-base lg:px-8 lg:py-4 bg-yellow-500 mr-auto ml-6 px-6 py-2 text-xs font-bold">
                Talk now
              </button>
            </div>
            <div className="">
              <Image
                className="mt-12 ml-auto rounded-l-xl rounded-br-md shadow-2xl shadow-teal-600"
                src={"/testimonial.png"}
                alt="test"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-24 ">
            <div className="flex flex-col items-center ml-16 mr-16 ">
              <Image
                className="rounded-2xl shadow-md mb-2"
                src={"/videoconf1.png"}
                alt="conf"
                width={500}
                height={500}
              />
              <div className="bg-slate-100 flex flex-row justify-between gap-8 rounded-2xl p-2">
                <div className="pl-8 flex flex-col items-center">
                  <h1 className="font-bold text-2xl mr-auto pt-2">
                    Meet the Doctor
                  </h1>
                  <p className="text-sm font-normal pt-2 pb-4">
                    Schedule a Face-to-Face meeting with an Expert Doctor for an
                    In-Depth Discussion about Your Health
                  </p>
                </div>
                <div className=" rounded-full flex items-center justify-center px-2 py-1 ml-2">
                  <Image
                    className="rotate-180"
                    src={"/arrow.png"}
                    alt="arrow"
                    height={32}
                    width={32}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center ml-16 mt-4 mr-16">
              <Image
                className="rounded-2xl shadow-md mb-2"
                src={"/videoconf2.png"}
                alt="conf"
                width={500}
                height={500}
              />
              <div className="bg-slate-100 flex flex-row justify-between rounded-2xl p-2">
                <div className="pl-8 flex flex-col items-center">
                  <h1 className="font-bold text-2xl mr-auto pt-2">
                    Meet the Doctor
                  </h1>
                  <p className="text-sm font-normal pt-2 pb-4">
                    Schedule a Face-to-Face meeting with an Expert Doctor for an
                    In-Depth Discussion about Your Health
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    className="rotate-180"
                    src={"/arrow.png"}
                    alt="arrow"
                    height={32}
                    width={32}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-40 flex flex-col ml-8 mr-8 items-center">
            <p className="text-sm mr-auto text-purple-500 font-bold mb-2">
              Testimonial
            </p>
            <h1 className="mb-4 mr-auto text-2xl font-bold">
              What they say about us
            </h1>
            <p className="text-base mr-auto mb-24">
              Customer Opinions Experiences and Testimonials About Our Services
              What They Say about Their Experience with US
            </p>
          </div>
          <Marquee
            autoFill
            pauseOnClick
            gradient
            gradientColor=""
            direction="right"
          >
            <div className="bg-white relative min-h-72 rounded-3xl shadow-lg flex items-center justify-center  m-1 font-light p-5   flex-wrap max-w-60">
              <Image
                className="absolute -translate-x-20 -translate-y-28"
                src={"/quote.png"}
                alt="quote"
                width={32}
                height={32}
              />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
              sunt? Saepe itaque ad laudantium voluptate nobis facere?
              Reiciendis, consectetur rerum.
            </div>
            <div className="bg-white relative min-h-72 rounded-3xl shadow-lg flex items-center justify-center  m-1 font-light p-5  flex-wrap max-w-60">
              <Image
                className="absolute -translate-x-20 -translate-y-28"
                src={"/quote.png"}
                alt="quote"
                width={32}
                height={32}
              />
              sunt? Saepe itaque ad laudantium voluptate nobis facere?
              Reiciendis, consectetur rerum.
            </div>
            <div className="bg-white relative min-h-72 rounded-3xl shadow-lg flex items-center justify-center  m-1 font-light p-5  flex-wrap max-w-60">
              <Image
                className="absolute -translate-x-20 -translate-y-28"
                src={"/quote.png"}
                alt="quote"
                width={32}
                height={32}
              />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
              Reiciendis, consectetur rerum.
            </div>
            <div className="bg-white relative min-h-72 rounded-3xl shadow-lg flex items-center justify-center  m-1 font-light p-5   flex-wrap max-w-60">
              <Image
                className="absolute -translate-x-20 -translate-y-28"
                src={"/quote.png"}
                alt="quote"
                width={32}
                height={32}
              />
              Reiciendis, consectetur rerum.
            </div>

            <div className="bg-white relative min-h-72 rounded-3xl shadow-lg flex items-center justify-center  m-1 font-light p-5  flex-wrap max-w-60">
              <Image
                className="absolute -translate-x-20 -translate-y-28"
                src={"/quote.png"}
                alt="quote"
                width={32}
                height={32}
              />
              sunt? Saepe itaque ad laudantium voluptate nobis facere?
              Reiciendis, consectetur rerum.
            </div>
            <div className="bg-white relative min-h-72 rounded-3xl shadow-lg flex items-center justify-center  m-1 font-light p-5  flex-wrap max-w-60">
              <Image
                className="absolute -translate-x-20 -translate-y-28"
                src={"/quote.png"}
                alt="quote"
                width={32}
                height={32}
              />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
              sunt? acere? Reiciendis, consectetur rerum.
            </div>
          </Marquee>
          <div className="mt-40 md:gap-12 flex flex-col md:flex-row ml-8 mr-8 md:mr-8 md:justify-between mb-24">
            <div className="flex flex-col md:w-1/2 items-center">
              <p className="text-purple-500 font-bold text-sm mb-2 mr-auto">
                FAQ
              </p>
              <h1 className="text-2xl font-bold mr-auto">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-sm">
                Customer Opinions Experiences and Testimonials About Our
                Services What They ssay about Thier Experiences with us
              </p>
              <div onClick={patientRedirect} className="border border-gray-300 shadow-lg cursor-pointer hover:bg-gray-300 rounded-lg gap-2 px-4 flex flex-row py-2 bg-slate-50 mr-auto mt-8">
                Talk now
                <Image
                  className="rotate-180 max-w-5"
                  src={"/arrow.png"}
                  alt="arrow"
                  height={40}
                  width={40}
                />
              </div>
            </div>
            <div className="mt-4 md:w-1/2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it
                    if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div>ad section</div>
          <div>footer section</div>
        </div>
      </div>
    </div>
  );
}
