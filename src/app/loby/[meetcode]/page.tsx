"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Mic, MicOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useSocket } from "@/context/SocketContext";

function Page() {
  const { socket } = useSocket();
  const router = useRouter();
  const {data} = useSession();
  const searchParam = useSearchParams();
  const roomId = searchParam.get("meetcode");
  const [videoEnabled, setVideoEnabled] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>("");
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      } else {
        requestPermissions();
      }
    };
  }, [mediaStream]);

  const requestPermissions = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMediaStream(stream);
      setVideoEnabled(true);
      setAudioEnabled(true);
      if (videoElementRef.current) {
        videoElementRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Permission denied or an error occurred.");
      console.error(err);
    }
  };

  const toggleVideo = async () => {
    if (mediaStream) {
      const videoTrack = mediaStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: videoTrack.enabled,
          audio: audioEnabled,
        });
        setMediaStream(stream);
        videoElementRef.current!.srcObject = stream;
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: audioEnabled,
        });
        setMediaStream(stream);
        setVideoEnabled(true);
        videoElementRef.current!.srcObject = stream;
      }
    }
  };

  const toggleAudio = (): void => {
    if (mediaStream) {
      const audioTrack = mediaStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const handleJoinRoom = useCallback(() => {
    if (socket) {
      console.log(socket);
      socket.emit("room:join", { email: data?.user?.email, room: roomId });
    }
  }, [socket, data, roomId]);

  const handelRoomJoined = useCallback((data) => {
    const {room} = data;
    router.push(`/video/${room}`);
  }, [router]);

  useEffect(() => {
    if(socket) {
    socket.on("room:join", handelRoomJoined);
    }
    return () => {
      if(socket) {
      socket.off("room:join", handelRoomJoined);
      }
    };
  }, [socket, handelRoomJoined]);

  return (
    <main className="w-full h-full min-h-screen flex flex-col justify-center items-center relative">
      <nav className="w-full h-24 flex justify-between items-center px-20 absolute top-0">
        <div className="w-fit h-full flex justify-evenly items-center">
          <Avatar className="w-16 h-16 rounded-none">
            <AvatarImage src={"/visual-logo.ico"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold text-primary">Video</h1>
        </div>
        <div className="w-fit flex justify-center items-center gap-3">
          <Avatar>
            <AvatarImage src={data?.user?.image as string} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>{data?.user?.name}</h1>
        </div>
      </nav>
      <div className="w-full h-full flex justify-between items-center px-20">
        <div className="w-1/2 flex justify-center items-center relative">
          <div className="w-full h-72">
            <video
              ref={videoElementRef}
              autoPlay
              playsInline
              controls={false}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "black",
              }}
            />
          </div>
          <div className="w-full flex items-center justify-center gap-3 absolute bottom-2">
            <button
              onClick={toggleVideo}
              className="w-10 h-10 rounded-full bg-muted flex justify-center items-center"
            >
              {videoEnabled ? <Camera /> : <CameraOff />}
            </button>
            <button
              onClick={toggleAudio}
              className="w-10 h-10 rounded-full bg-muted flex justify-center items-center"
            >
              {audioEnabled ? <Mic /> : <MicOff />}
            </button>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center gap-3">
          <h1 className="text-4xl font-semibold text-primary-foreground">
            Ready to Join?
          </h1>
          <Button onClick={handleJoinRoom} className="w-32 h-12 text-2xl font-semibold rounded-full">
            Join
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Page;
