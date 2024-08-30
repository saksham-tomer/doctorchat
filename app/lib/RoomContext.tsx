"use client";

import { createContext, useEffect, useReducer, useState } from "react";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

import socketIOClient from "socket.io-client";
import { peersReducer } from "./peersReducer";
import { addPeerAction, removePeerAction } from "./peersActions";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { GetTime } from "./getTime";
const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);
const ws = socketIOClient(WS);

interface ChatData {
  message: string;
  sender: string;
  time: string;
}

export const RoomProvider: React.FunctionComponent = ({ children }) => {
  const [receivedMessage, setReceivedMessage] = useState<ChatData[]>([]);
  const [me, setMe] = useState<Peer>();
  const [peers, dispatch] = useReducer(peersReducer, {});
  const [stream, setStream] = useState<MediaStream>();

  const timeNow = GetTime.getTime();

  const router = useRouter();
  const enterRoom = ({ roomId }: { roomId: "string" }) => {
    router.push(`/room/${roomId}`);
  };

  const handleChat = (fullMessage: any) => {
    //    router.push("/");
    //   console.log(" hello from sfgjsdfjas");
    console.log(fullMessage);
    setReceivedMessage([
      ...receivedMessage,
      {
        message: fullMessage.message,
        sender: "server",
        time: fullMessage.time,
      },
    ]);
  };

  // const sendChat = (newInput: string, roomId: string) => {
  //   const fullMessage = { message: newInput, sender: "client", time: timeNow };
  //   ws.emit("send-chat", fullMessage, roomId);
  // };

  const sendChat = (roomId: string) => {
    ws.emit("send-chat", roomId);
  };

  const incomingChat = (newInput: string, roomId: string) => {
    const fullMessage = { message: newInput, sender: "client", time: timeNow };
    ws.emit("incoming-chat", fullMessage, roomId);
  };

  const handleUserList = ({ participants }: { participants: string[] }) => {
    participants.map((peerId) => {
      const call = stream && me?.call(peerId, stream);
      console.log("call", call);
      call?.on("stream", (userVideoStream: MediaStream) => {
        console.log({ addPeerAction });
        dispatch(addPeerAction(peerId, userVideoStream));
      });
    });
  };

  const removePeer = (peerId: string) => {
    dispatch(removePeerAction(peerId));
  };

  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId);
    setMe(peer);
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
        });
    } catch (err) {
      console.error({ err });
    }

    console.log(receivedMessage);
    ws.on("received-chat", handleChat);
    ws.on("room-created", enterRoom);
    ws.on("get-users", handleUserList);
    ws.on("user-disconnected", removePeer);
    //   ws.on("sendChat", handleChat);

    return () => {
      ws.off("received-chat");
      ws.off("room-created");
      ws.off("get-users");
      ws.off("user-disconnected");
    };
  }, []);

  useEffect(() => {
    if (!stream) return;
    if (!me) return;

    ws.on("user-joined", ({ peerId }: { roomId: string; peerId: string }) => {
      const call = stream && me.call(peerId, stream);
      call.on("stream", (userVideoStream: MediaStream) => {
        dispatch(addPeerAction(peerId, userVideoStream));
      });
    });

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (userVideoStream) => {
        dispatch(addPeerAction(call.peer, userVideoStream));
      });
    });
  }, [stream, me]);

  return (
    <RoomContext.Provider
      value={{ ws, me, peers, stream, sendChat, receivedMessage, incomingChat }}
    >
      <SessionProvider>{children}</SessionProvider>
    </RoomContext.Provider>
  );
};
