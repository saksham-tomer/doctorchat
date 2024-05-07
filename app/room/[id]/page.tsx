"use client"
import { useContext, useEffect } from "react";
import { VideoPlayer } from "../../components/VideoPlayer";
import { RoomContext } from "../../lib/RoomContext";
import { useParams } from "next/navigation";

export default function Page(){
    const {id} = useParams()
    const { ws, me, peers, stream } = useContext(RoomContext);

    useEffect(() => {
        me?.on("open", () => {
            ws.emit("join-room", { roomId: id, peerId: me._id });
        });
    }, [id, me, ws]);

    return (
        <div>
            <>Room id </>
            <div className="flex flex-col items-center justify-center relative">
                <VideoPlayer className="rounded-2xl" key={"me"} stream={stream} />

                {Object.values(peers).map((peer: any) => (
                    <VideoPlayer className="absolute min-w-52" key={peer.id} stream={peer.stream} />
                ))}
            </div>
        </div>
    );
};
