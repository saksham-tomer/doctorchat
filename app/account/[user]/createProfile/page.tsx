"use client";

import React, { useContext, useEffect, useState } from "react";
import { TitleContext } from "../layout";
import Image from "next/image";
import { useSession } from "next-auth/react";
import bannerDefault from "@/public/bannerDefault.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FileUpload from "@/app/components/dnd";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Form } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { GenerateColors } from "@/app/lib/getRandomColor";
import { Textarea } from "@/components/ui/textarea";
import { redirect, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createPatientProfile } from "@/app/lib/handlePatientProfile";
import getPatientPicture from "@/app/lib/patientPictureHelper";
import avatar from "@/public/colorfulavatar.jpg";

/**
 * @author Saksham Tomar
 * @date 2021-10-06
 * @description Pointers
 * @remarks
 * 1. This is the fetch request to get the patient image from the server.
 * 2. The GET method does not have a body.
 * 3. Always stringify the body before sending it to the server.
 * 4. Return the response as JSON.
 * 5. Await the data.json() to get the response body.
 * @todo Error in fetching session sometimes from useSession hook results in undefined email.
 */

type Props = {
  props: React.ReactNode;
};

const Page = (props: Props) => {
  const { data: session } = useSession();
  let { titleCallback } = useContext(TitleContext);
  const [selectedSex, setSelectedSex] = useState("Male");
  const [patientBanner, setPatientBanner] = useState(bannerDefault);
  const [isOpen, setIsOpen] = useState(false);
  const [patientPicture, setPatientPicture] = useState<
    StaticImageData | string | Response | undefined
  >();
  const [buttonState, setButtonState] = useState(false);
  const [tags, setTags] = useState<string[] | never>([]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [hide, setHide] = useState<string | never>("password");

  const togglePassowrd = () => {
    setShowPassword((prev) => !prev);
    if (showPassword == false) {
      setHide((prev) => (prev = "password"));
    } else {
      setHide((prev) => (prev = "text"));
    }
  };

  const handleFileUpload = (file: any) => {
    setButtonState((prev) => (prev = true));
    setPatientPicture(file);
  };

  const uploadImage = async () => {
    setIsOpen(false);
    const email = session?.user.email;
    const res = await fetch("http://localhost:3000/api/uploadPatientPicture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        PatientImage: "true",
      },
      body: JSON.stringify({ picture: patientPicture, email: email }),
    });
    if (res) {
      console.log("success image uploaded successfully");
    } else {
      console.error("Error uploading patient image");
    }
  };

  const handleInput = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email: string | undefined = session?.user.email;
    createPatientProfile(formData, email, tags);
    // handle form input logic here
  };

  const router = useRouter();

  useEffect(() => {
    const email = session?.user.email;
    if (!email) {
      setPatientPicture((prev) => (prev = avatar));
    }

    const getImg = async () => {
      let patientImage = await fetch(
        "http://localhost:3000/api/getPatientImage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );
      if (!patientImage.ok) {
        console.log("Patient image fetched failed");
      }
      const data = await patientImage.json();
      if (data) {
        console.log("Image fetched successfully");
        setPatientPicture(data.image);
      }
    };
    getImg();
  }, [session?.user.email]);

  titleCallback("Create Profile");

  const color = GenerateColors.generateColor();

  return (
    <div className="flex flex-col justify-center overflow-hidden">
      <div className="min-w-full relative">
        <Image
          className="min-w-full md:min-h-48 rounded-md shadow-lg max-h-28 object-cover"
          src={patientBanner}
          alt="doctor"
          width={200}
          height={200}
        />
        <TooltipProvider>
          <Tooltip>
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <div className="max-w-fit ">
                    <Image
                      className="ml-2 max-h-24 md:min-w-40 md:max-w-52 md:min-h-40 md:max-h-40 md:ml-4 rounded-full border-2 absolute transform md:-translate-y-12 shadow-xl -translate-y-8 border-white"
                      src={patientPicture ?? ""}
                      alt="pic"
                      width={100}
                      height={100}
                    />
                  </div>
                </TooltipTrigger>
              </DialogTrigger>
              <DialogContent className="flex flex-col items-center justify-center">
                <DialogHeader className="flex flex-col items-center justify-center">
                  <DialogTitle>Change profile image</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="max-w-36 max-h-36 ml-auto mr-auto flex items-center justify-center">
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>
                <DialogFooter>
                  <Button
                    onClick={uploadImage}
                    type="submit"
                    className={buttonState ? "bg-green-400" : ""}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <TooltipContent className="border-1 border-slate-300 bg-black">
              <p className="font-light text-sm text-white">Change Picture</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-row items-center mr-2 ml-auto gap-4">
        <div className="flex mt-2 flex-col md:mt-4 items-center justify-center">
          <h3 className="font-bold md:text-2xl  text-xl">
            {session?.user.name}
          </h3>
          <p className="font-medium text-xs md:text-lg text-slate-500">
            {session?.user.email}
          </p>
        </div>
      </div>
      {/* <Form> */}
      <form onSubmit={handleInput}>
        <div className="mt-8 flex flex-col mx-1 md:mt-16">
          <div className="flex flex-col mr-auto ml-2 mb-2">
            <p className=" text-lg font-bold md:text-2xl xl:text-4xl">
              Patient Profile
            </p>
            <p className="text-xs font-medium text-slate-500 md:text-base">
              These details will be shared with your doctor
            </p>
          </div>
          <Separator className="bg-slate-300" />
          <div className="flex flex-col md:min-w-full justify-center mt-4">
            <div className="md:flex md:p-2 md:flex-col items-center lg:p-3">
              <div className="flex flex-row md:justify-items-end w-full">
                <div className="flex flex-col md:w-full mr-auto ml-2 sm:mb-2">
                  <h3 className="text-sm font-bold md:text-xl lg:text-2xl xl:text-3xl">
                    Public Profile
                  </h3>
                  <p className="text-xs font-semibold md:text-sm text-slate-400 lg:text-sm">
                    This will be displayed on your profile
                  </p>
                </div>
                <p className="p-2 md:w-full border-dashed mr-2 items-center justify-center  border-green-600 bg-green-400 ml-auto text-white hidden md:flex md:mb-4 border-2 rounded-xl md:ml-auto">
                  Previous Changes Will be Overridden
                </p>
              </div>

              <Input
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                name="name"
                id="name"
                className="ml-2 mt-2  md:ml-auto w-1/2 md:flex md:flex-grow md:mr-2"
                placeholder="Patient Name"
              />
              <p className="text-xs md:ml-auto ml-2 md:mr-2 mt-4 font-semibold text-slate-400">
                Change your password
              </p>
              <Input
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                name="password"
                type={hide}
                id="password"
                className="ml-2 mt-2 md:ml-auto w-1/2 md:flex md:flex-grow md:mr-2"
                placeholder="Enter your password"
              />
              <button onClick={togglePassowrd}></button>
            </div>

            <Separator className="mt-3 bg-slate-300" />
            <div className="flex flex-col  justify-center ml-2 mt-4">
              <div className="flex flex-col md:mb-2">
                <h3 className="text-sm font-bold md:text-base lg:text-lg xl:text-xl">
                  General Information
                </h3>
                <p className="text-xs font-semibold text-slate-400 md:text-sm">
                  Help us know more about you
                </p>
              </div>
              <div className="mt-4 md:mt-2">
                <Select name="sex">
                  <SelectTrigger
                    name="sex"
                    className="ms:max-w-72 md:ml-0 w-1/2 md:flex md:flex-grow md:mr-2  md:mb-2"
                  >
                    <SelectValue placeholder="Select your sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sex</SelectLabel>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Transgender">Transgender</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 flex flex-col justify-center">
                <p className="text-xs font-semibold text-slate-400 mb-2 md:text-sm">
                  Select your birth day
                </p>
                <MobileDatePicker
                  name="dob"
                  label="Choose your DOB"
                  className="md:ml-0 w-1/2 md:flex md:flex-grow md:mr-2"
                />
              </div>
              <Separator className="mt-3 bg-slate-300" />
              <div className="flex flex-col justify-center">
                <p className="text-sm font-bold mt-4 md:text-base lg:text-lg xl:text-xl">
                  Choose your illness
                </p>
                <div className="flex flex-row gap-2 mt-2 mb-1">
                  {tags.slice(0, 6).map((tags, id) => {
                    return (
                      <div className="flex flex-row gap-4 flex-wrap" key={id}>
                        <span
                          style={{ backgroundColor: color }}
                          className="px-2 py-1 text-xs text-white rounded-xl shadow-lg"
                        >
                          {tags}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Input
                  name="illness"
                  id="illness"
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setTags([...tags, e.currentTarget.value]);
                      e.currentTarget.value = "";
                    }
                  }}
                  placeholder="Type of illness"
                  className="md:ml-0 w-1/2 md:flex mt-1 md:flex-grow md:mr-2"
                />
              </div>
              <div className="flex flex-col pr-6 mt-4 md:min-w-full md:mr-4">
                <p className="text-xs lg:text-base xl:text-lg md:text-sm font-bold mt-2 mb-2">
                  Tell us about yourself
                </p>
                <Textarea
                  name="about"
                  id="about"
                  className="ml-2 md:ml-0 mr-4 md:min-h-72 md:mb-12 md:flex md:flex-grow md:mr-2 w-full shadow-xl text-gray-600 mb-4 min-h-48"
                  placeholder="Tell the doctors about yoursef"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 mb-8">
            <div className="ml-auto flex gap-2 items-center justify-center">
              <Button
                onClick={() => router.push(`/account/${session?.user.name}`)}
                className="bg-red-500 font-bolds hover:bg-red-600 shadow-lg mt-4 md:mt-8"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-400  mr-2 font-bolds border-2 border-green-300 hover:bg-green-500 shadow-lg mt-4 md:mt-8"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
      {/* </Form> */}
    </div>
  );
};

export default Page;
