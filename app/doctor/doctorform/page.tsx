"use client";

import { DatePicker } from "@mui/x-date-pickers";
import Image from "next/image";
import React from "react";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleInput = (e: any) => {
    e.preventDefault();

    const formdata = new FormData(e.target);

    const name = formdata.get("firstname");
    const lastname = formdata.get("lastname");
    const email = formdata.get("email");
    const sex = formdata.get("sexSelect");
    const dob = formdata.get("dob");
    const address = formdata.get("address");
    const phone = formdata.get("number");
    const doctorid = formdata.get("doctorid");

    const query = `firstname=${name}&sex=${sex}&lastname=${lastname}&phone=${phone}&doctorid=${doctorid}&address=${address}&dob=${dob}&email=${email}`;

    console.log(formdata);
    router.replace(`/doctor/doctorform/profile:${doctorid}?${query}`);
  };
  const [selectedSex, setSelectedSex] = React.useState("");
  return (
    <div className="flex mt-4 flex-col relative items-center bg-cover min-h-screen min-w-full blob">
      <div className="flex   text-white bg-transparent backdrop-blur-3xl items-center justify-center flex-col shadow-2xl p-2 ring-1 ring-purple-200 rounded-xl mt-auto mb-auto ">
        <div className="flex formbgcopy bg-cover justify-center min-h-32 min-w-full bg-opacity-15 rounded-b-xl shadow-xl flex-col items-center">
          <div className="bg-transparent flex items-center p-2 rounded-2xl shadow-xl flex-col backdrop-blur-sm">
            <h1 className="mt-4 font-bold text-4xl text-gray-800 mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-semibold text-gray-400">
              Enter your details to be registered
            </p>
          </div>
        </div>
        <form
          onSubmit={handleInput}
          className="flex flex-col items-center justify-center my-10 rounded-2xl"
        >
          <div className="flex flex-row gap-2 mb-2">
            <div className="felx flex-col">
              <p className="font-medium text-xs mb-1 ml-1 text-gray-400">
                First Name
              </p>
              <input
                className="placeholder:text-gray-400  pl-4 placeholder:font-normal placeholder:text-xs rounded-lg max-w-40 p-2 bg-transparent  border-[1px] text-black shadow-md mb-2 border-gray-300 text-left text-sm bg-white font-medium default:outline-none focus:outline-gray-300 focus:outline-0 "
                type="text"
                placeholder="Firstname..."
                id="firstname"
                name="firstname"
              />
            </div>
            <div className="felx flex-col">
              <p className="font-medium text-xs mb-1 ml-1 text-gray-400">
                Last Name
              </p>
              <input
                className="placeholder:text-gray-400  pl-4 placeholder:font-normal placeholder:text-xs rounded-lg max-w-40 p-2 bg-transparent  border-[1px] text-black shadow-md mb-2 border-gray-300 text-left text-sm bg-white font-medium default:outline-none focus:outline-gray-300 focus:outline-0 "
                type="text"
                placeholder="lastname..."
                id="lastname"
                name="lastname"
              />
            </div>
          </div>
          <div className="flex flex-row items-center mb-2 gap-8">
            <div className="felx flex-col">
              <p className="font-medium text-xs mb-1 ml-1 text-gray-400">Sex</p>
              <select
                className="focus:rounded-lg focus:outline-dashed placeholder:text-gray-400  pl-2  placeholder:font-medium placeholder:text-xs rounded-lg max-w-40 p-2 bg-transparent  border-[1px] text-black shadow-md mb-2 border-gray-300 text-left text-sm bg-white font-medium default:outline-none focus:outline-gray-400 focus:outline-0"
                name="sexSelect"
                id="sexSelect"
                value={selectedSex}
                onChange={(e) => setSelectedSex(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="felx flex-col max-w-52">
              <p className="font-medium text-xs mb-1 ml-1 text-gray-400">DOB</p>
              {/* <input
                className="placeholder:text-gray-400  pl-4 placeholder:font-normal placeholder:text-xs rounded-lg max-w-40 p-2 bg-transparent  border-[1px] text-black shadow-md mb-2 border-gray-300 text-left text-sm bg-white font-medium default:outline-none focus:outline-gray-300 focus:outline-0 "
                type="text"
                placeholder="Firstname..."
                id="firstname"
                name="firstname"
              /> */}
              <MobileDatePicker name="dob" label="Choose your DOB" />
            </div>
          </div>
          <div className="flex flex-row mb-2  gap-2">
            <div className="felx flex-col">
              <p className="font-medium text-xs mb-1 ml-1 text-gray-400">
                Doctor Id
              </p>
              <input
                className="placeholder:text-gray-400  pl-4 placeholder:font-normal placeholder:text-xs rounded-lg max-w-40 p-2 bg-transparent  border-[1px] text-black shadow-md mb-2 border-gray-300 text-left text-sm bg-white font-medium default:outline-none focus:outline-gray-300 focus:outline-0 "
                type="text"
                placeholder="Doctor Id"
                id="doctorid"
                name="doctorid"
              />
            </div>
            <div className="felx flex-col">
              <p className="font-medium text-xs mb-1 ml-1 text-gray-400">
                Email Address
              </p>
              <input
                className="placeholder:text-gray-400  pl-4 placeholder:font-normal placeholder:text-xs rounded-lg max-w-40 p-2 bg-transparent  border-[1px] text-black shadow-md mb-2 border-gray-300 text-left text-sm bg-white font-medium default:outline-none focus:outline-gray-300 focus:outline-0 "
                type="text"
                placeholder="Email Address"
                id="email"
                name="email"
              />
            </div>
          </div>
          <div className="flex flex-row mb-2 gap-2">
            <div className="felx flex-col">
              <p className="font-medium text-xs mb-1 ml-1 text-gray-400">
                Phone Number
              </p>
              <input
                className="placeholder:text-gray-400  pl-4 placeholder:font-normal placeholder:text-xs rounded-lg max-w-40 p-2 bg-transparent  border-[1px] text-black shadow-md mb-2 border-gray-300 text-left text-sm bg-white font-medium default:outline-none focus:outline-gray-300 focus:outline-0 "
                type="text"
                placeholder="Phone Number"
                id="number"
                name="number"
              />
            </div>
            <div className="felx flex-col">
              <p className="font-medium text-xs mb-1 ml-1 text-gray-400">
                Address
              </p>
              <input
                className="placeholder:text-gray-400  pl-4 placeholder:font-normal placeholder:text-xs rounded-lg max-w-40 p-2 bg-transparent  border-[1px] text-black shadow-md mb-2 border-gray-300 text-left text-sm bg-white font-medium default:outline-none focus:outline-gray-300 focus:outline-0 "
                type="text"
                placeholder="Address"
                id="address"
                name="address"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-32 mt-4 py-2 bg-gradient-to-bl rounded-lg shadow-lg ring-1 ring-purple-300 to-purple-500 from-teal-300"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
