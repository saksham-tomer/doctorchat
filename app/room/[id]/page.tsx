"use client"
import { FormEvent, useContext, useEffect,useState } from "react";
import { VideoPlayer } from "../../components/VideoPlayer";
import { RoomContext } from "../../lib/RoomContext";
import { useParams, useSearchParams } from "next/navigation";


   
    //     <div>
    //         <>Room id </>
    //         <div className="flex flex-col items-center justify-center relative">
    //             <VideoPlayer className="rounded-2xl" key={"me"} stream={stream} />

    //             {Object.values(peers).map((peer: any) => (
    //                 <VideoPlayer className="absolute min-w-52" key={peer.id} stream={peer.stream} />
    //             ))}
    //         </div>
    //     </div>
    // );
    
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


export default function Page({searchParams}: {searchParams: {[key: string]:string | string[] | undefined }}) {
  const {ws,me, peers, stream } = useContext(RoomContext);
  const router = useRouter();
  const leave = () => {
    router.push("/");
  };

  //  useEffect(() => {
  //       me?.on("open", () => {
  //           ws.emit("join-room", { roomId: id, peerId: me._id });
  //       });
  //   }, [ me, ws]);
 
 // const roomId = searchParams;
 
  const roomId = useParams()
  const Room = roomId.id
  const[receivedChatState,setReceivedChatState] = useState({})
  const[sendChatState,setSendChatState] = useState({})


  // useEffect(()=>{
  //   ws.on("sendChat",(chat)=>{
  //       setReceivedChatState((prev)=> ({...prev , newValue: chat}))
  //   })
  // },[roomId,ws])


  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log("the chat value",e.target);
      setSendChatState((prev) => ({
    ...prev,
    newVal: e.target.value // Assuming newValue is the key you want to update in the state
  }));
    console.log(sendChatState);
    ws.emit("sendChat",({sendChatState,Room}))

  }

const [toggle, setToggle] = useState(true)

  const device = useDeviceDetection()

  return (
    <div className=" flex relative flex-col items-center justify-center text-4xl text-red-400 bg-gradient-to-bl from-pink-100 via-purple-300 to-cyan-300 min-h-screen">
      {/*<Confetti  width={1000} height={1000} tweenDuration={0.5} />*/}
      <div className="flex shadow-xl shadow-teal-500 flex-col relative gap-8 items-center justify-center">
        <video
          className="rounded-xl ring-2 ring-blue-300"
          src="https://media.istockphoto.com/id/1274771319/video/fit-woman-athlete-maintaining-a-healthy-lifestyle-hiking-in-mountains-over-rocky-trails-and.mp4?b=1&s=mp4-640x640-is&k=20&c=22lXBSwH14mGqyrFGbZRVufbwYs0DSOPeCCLq3v3h7Y="
          autoPlay
          loop
          width={380}
          height={380}
        />
        <video
          className="rounded-full transform translate-x-28 ring-1 ring-gray-600 shadow-md shadow-purple-700 translate-y-14 absolute"
          src="https://media.istockphoto.com/id/1278197574/video/family-canoeing-on-a-stunning-mountain-lake.mp4?b=1&s=mp4-640x640-is&k=20&c=Ci42KFy6YA6VOGkaQRzTuji9iBk0G34sECU9-8dkcgA="
          autoPlay
          loop
          width={150}
          height={150}
        />
      </div>
      <button
        onClick={leave}
        className="px-8 text-base py1 text-white font-semibold bg-red-500 rounded-xl shadow-xl mt-8 hover:bg-red-600"
      >
        Leave
      </button>
      <div className="absolute transform translate-x-40 -translate-y-64 ">
        {device === "Mobile" &&
            <Drawer>
          <DrawerTrigger asChild>
            {toggle && 
            <button onClick={()=>(setToggle((prev)=>!prev))} className="shadow-xl bg-gray-300 p-1 rounded-full inset-1 inset ring-1 ring-gray-400"> <Image src={'/chat-gpt.png'} alt="chat" width={28} height={28}/></button> }
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col relative">
            <div className="mx-auto min-h-72 max-h-72 w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Chat</DrawerTitle>
                <DrawerDescription>
                  Ask your queries and prescriptions here
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <button className="absolute transform -translate-y-24 -translate-x-2 shadow-lg shadow-indigo-300 p-2 rounded-full bg-gray-300" onClick={()=>(setToggle((prev)=>!prev))} ><Image src={'/close.png'} alt="close" height={12}width={12}/></button>
                </DrawerClose>
              </DrawerFooter>
              <div className="flex flex-col items-center relative">
                {Object.keys(sendChatState).map((send)=>{
                  <div key={send} className="mr-auto ml-2 bg-indigo-200 rounded-lg px-2 py-1 ">{send}</div>
                })
                }
                <div className="ml-auto mr-2 bg-indigo-300 rounded-lg px-2 py-1 ">{}</div>
                <form className="flex items-center justify-center absolute transform translate-y-32">
                    <input
                    type="text" 
                    name="chat"
                    id="chat"
                    onSubmit={handleSubmit}
                    placeholder="Chat"
                    className="bg-indigo-400 rounded-xl p-2 relative text-white focus:outline-none focus:ring-1 shadow-xl focus:ring-indigo-500 placeholder:font-medium placeholder:text-white "
                    />
                    <button type="submit" className="absolute hover:bg-indigo-500 hover:rounded-full hover:p-2 hover:ring-1 hover:ring-indigo-600 p-2 translate-x-28" >
                        <Image src={'/send.png'} alt="submit" width={18} height={18} />
                    </button>
                </form>
              </div>
            </div>
            </div>
          </DrawerContent>
        </Drawer>
    }
      </div>
    </div>
  );
}
