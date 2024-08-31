"use client";

import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { VideoPlayer } from "../../components/VideoPlayer";
import { RoomContext } from "../../lib/RoomContext";
import { useParams } from "next/navigation";
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
import Confetti from "react-confetti";
import useDeviceDetection from "@/utils/hooks/useDeviceDetect";
import Image from "next/image";
import { GetTime } from "@/app/lib/getTime";

export default function Page({ searchParams }: { searchParams: any }) {
  const { ws, me, peers, stream, sendChat, receivedMessage, incomingChat } =
    useContext(RoomContext);
  const router = useRouter();
  const leave = () => {
    router.push("/");
  };

  const prevReceivedMessageRef = useRef<inputParams[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const timeNow = GetTime.getTime();

  // const chats = [
  //   {
  //     message: "hello from client",
  //     sender: "client",
  //     time: timeNow,
  //   },
  //   {
  //     message: " hello from server",
  //     sender: "server",
  //     time: timeNow,
  //   },
  //   {
  //     message: "hello from client",
  //     sender: "client",
  //     time: timeNow,
  //   },
  // ];
  const [receivedChatState, setReceivedChatState] = useState<
    inputParams[] | null | any
  >([]);
  const [sendChatState, setSendChatState] = useState<inputParams[]>([]);

  useEffect(() => {
    console.log(receivedMessage, "rec");
    if (receivedMessage.length !== prevReceivedMessageRef.current.length) {
      setReceivedChatState([...receivedChatState, ...receivedMessage]);
      prevReceivedMessageRef.current = receivedMessage;
    }
  }, [receivedMessage, receivedChatState]);

  type inputParams = {
    message: string;
    time: string;
    sender: string;
  };

  const roomId = useParams().id;

  const [newInput, setNewInput] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newInput.trim()) {
      setSendChatState([
        ...sendChatState,
        { message: newInput, time: timeNow, sender: "client" },
      ]);
      setNewInput("");
      if (ws.readyState === WebSocket.OPEN) {
        console.log("open conneciton");
      }

      //sendChat(newInput, roomId);
      incomingChat(newInput, roomId);
      // ws.emit("sendChat", { newInput, roomId });

      inputRef.current?.focus();
    }
  };

  const [toggle, setToggle] = useState<boolean>(true);
  const device = useDeviceDetection();

  return (
    <div className="flex relative flex-col items-center justify-center text-4xl text-red-400 bg-gradient-to-bl from-pink-100 via-purple-300 to-cyan-300 min-h-screen">
      <div className="grid grid-cols-4 gap-4">
        {/* <video
          className="rounded-xl ring-2 ring-blue-300"
          src={stream}
          autoPlay
          loop
          width={380}
          height={380}
        />
        <video
          className="rounded-full transform translate-x-28 ring-1 ring-gray-600 shadow-md shadow-purple-700 translate-y-14 absolute"
          src={me}
          autoPlay
          loop
          width={150}
          height={150}
        /> */}
        <VideoPlayer key={"me"} stream={stream} />

        {Object.values(peers).map((peer: any) => (
          <VideoPlayer key={peer.id} stream={peer.stream} />
        ))}
      </div>
      <button
        onClick={leave}
        className="px-8 text-base py-1 text-white font-semibold bg-red-500 rounded-xl shadow-xl mt-8 hover:bg-red-600"
      >
        Leave
      </button>
      <div className="absolute transform translate-x-40 -translate-y-64 ">
        {device === "Mobile" && (
          <Drawer>
            <DrawerTrigger asChild>
              {toggle && (
                <button
                  onClick={() => setToggle((prev) => !prev)}
                  className="shadow-xl bg-gray-300 p-1 rounded-full inset-1 inset ring-1 ring-gray-400"
                >
                  <Image
                    onClick={() => sendChat(roomId)}
                    src={"/chat-gpt.png"}
                    alt="chat"
                    width={28}
                    height={28}
                  />
                </button>
              )}
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col relative">
                <div className="mx-auto min-h-72 w-full max-w-sm max-h-[calc(100vh-100px)] overflow-y-auto">
                  <DrawerHeader>
                    <DrawerTitle>Chat</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <button
                        className="absolute transform -translate-y-24 -translate-x-2 shadow-lg shadow-indigo-300 p-2 rounded-full bg-gray-300"
                        onClick={() => setToggle((prev) => !prev)}
                      >
                        <Image
                          src={"/close.png"}
                          alt="close"
                          height={12}
                          width={12}
                        />
                      </button>
                    </DrawerClose>
                  </DrawerFooter>
                  <div className="flex flex-col items-center relative">
                    {sendChatState.map((message, index) => (
                      <div key={index} className="ml-auto mr-2 flex flex-col">
                        <div
                          key={index}
                          className="bg-indigo-200 rounded-lg px-2 py-1"
                        >
                          {message.message}
                        </div>
                        <div className="mr-2 text-gray-500 font-medium text-xs ">
                          {message.time}
                        </div>
                      </div>
                    ))}
                    {receivedChatState.map(
                      (message: inputParams, index: any) => (
                        <div key={index} className="mr-auto ml-2 flex flex-col">
                          <div
                            key={index}
                            className=" bg-indigo-200 rounded-lg px-2 py-1"
                          >
                            {message.message}
                          </div>
                          <div className="text-xs ml-1 text-gray-500 font-medium">
                            {message.time}
                          </div>
                        </div>
                      )
                    )}
                    <form
                      className="flex items-center justify-center pt-2 absolute transform translate-y-32"
                      onSubmit={handleSubmit}
                    >
                      <input
                        type="text"
                        name="chat"
                        id="chat"
                        ref={inputRef}
                        onChange={(e) => {
                          setNewInput(e.target.value);
                        }}
                        value={newInput}
                        placeholder="Chat"
                        className="bg-indigo-400 rounded-xl p-2 relative text-white focus:outline-none focus:ring-1 shadow-xl focus:ring-indigo-500 placeholder:font-medium placeholder:text-white"
                      />
                      <button
                        type="submit"
                        className="absolute hover:bg-indigo-500 hover:rounded-full hover:p-2 hover:ring-1 hover:ring-indigo-600 p-2 translate-x-28"
                      >
                        <Image
                          className="absolute transform -translate-x-5 -translate-y-2"
                          src={"/send.png"}
                          alt="submit"
                          width={18}
                          height={18}
                        />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
}
