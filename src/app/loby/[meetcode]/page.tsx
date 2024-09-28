'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

function Page() {
    const { data } = useSession();
    const videoRef = useRef<HTMLVideoElement>(null); // Reference for the video element
    const [stream, setStream] = useState<MediaStream | null>(null); // State to manage the media stream
    const [cameraOn, setCameraOn] = useState(true); // State to manage the camera on/off
    const [audioOn, setAudioOn] = useState(true); // State to manage the microphone on/off

    // Start the media stream with both video and audio
    const startStream = useCallback(async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    }, []);

    const toggleTrack = useCallback((trackType: 'video' | 'audio', enable: boolean) => {
        if (stream) {
            const track = stream.getTracks().find(t => t.kind === trackType);
            if (track) {
                track.enabled = enable; // Set the enabled property to false to turn off the camera without stopping it
            }
        }
    }, [stream]);

    const toggleCamera = useCallback(() => {
        toggleTrack('video', !cameraOn);
        setCameraOn(prev => !prev);
    }, [cameraOn, toggleTrack]);

    const toggleAudio = useCallback(() => {
        toggleTrack('audio', !audioOn);
        setAudioOn(prev => !prev);
    }, [audioOn, toggleTrack]);

    useEffect(() => {
        if (!stream) {
            startStream(); 
        }
    }, [startStream, stream]);

    return (
        <main className='w-full h-full min-h-screen flex flex-col justify-center items-center relative'>
            <nav className='w-full h-24 flex justify-between items-center px-20 absolute top-0'>
                <div className='w-fit h-full flex justify-evenly items-center'>
                    <Avatar className='w-16 h-16 rounded-none'>
                        <AvatarImage src={"/visual-logo.ico"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className='text-4xl font-bold text-primary'>Video</h1>
                </div>
                <div className='w-fit flex justify-center items-center gap-3'>
                    <Avatar>
                        <AvatarImage src={data?.user?.image as string} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>{data?.user?.name}</h1>
                </div>
            </nav>
            <div className='w-full h-full flex justify-between items-center px-20'>
                <div className='w-1/2 flex justify-center items-center relative'>
                    <div className='w-full h-72'>
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            controls={false} 
                            style={{ width: '100%', height: '100%', backgroundColor: 'black' }} 
                        />
                    </div>
                    <div className='w-full flex items-center justify-center gap-3 absolute bottom-2'>
                        <button onClick={toggleCamera} className='w-10 h-10 rounded-full bg-muted flex justify-center items-center'>
                            {cameraOn ? <Camera /> : <CameraOff />}
                        </button>
                        <button onClick={toggleAudio} className='w-10 h-10 rounded-full bg-muted flex justify-center items-center'>
                            {audioOn ? <Mic /> : <MicOff />}
                        </button>
                    </div>
                </div>
                <div className='w-1/2 flex flex-col items-center justify-center gap-3'>
                    <h1 className='text-4xl font-semibold text-primary-foreground'>Ready to Join?</h1>
                    <Button className='w-32 h-12 text-2xl font-semibold rounded-full'>Join</Button>
                </div>
            </div>
        </main>
    );
}

export default Page;
