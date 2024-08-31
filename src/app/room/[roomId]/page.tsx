'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import mediasoupClient from 'mediasoup-client';

function RoomPage() {
  const router = useRouter();
  const params = useSearchParams();
  const roomId = params.get('roomID');
  const socket:any = useSocket();

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const joinRoom = async () => {
      if (!roomId || !socket) return;

      // Get media from the user's devices
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);

      // Join the room
      socket.emit('joinRoom', roomId, async (error, data) => {
        if (error) {
          console.error('Error joining room:', error);
          return;
        }

        const { rtpCapabilities, transportParams } = data;

        // Initialize Mediasoup device
        const device = new mediasoupClient.Device();
        await device.load({ routerRtpCapabilities: rtpCapabilities });

        // Create transport
        const sendTransport = device.createSendTransport(transportParams);
        sendTransport.on('connect', ({ dtlsParameters }, callback) => {
          socket.emit('connectTransport', { roomId, dtlsParameters }, callback);
        });

        // Produce tracks (audio and video)
        const videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];
        await sendTransport.produce({ track: videoTrack });
        await sendTransport.produce({ track: audioTrack });

        // Consume remote streams
        socket.emit('consume', { roomId, rtpCapabilities: device.rtpCapabilities }, async (error, consumerParams) => {
          if (error) {
            console.error('Error consuming:', error);
          } else {
            const recvTransport = device.createRecvTransport(consumerParams);
            const consumer = await recvTransport.consume(consumerParams);
            setRemoteStream(new MediaStream([consumer.track]));
          }
        });
      });
    };

    joinRoom();
  }, [roomId, socket]);

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <video
        id="localVideo"
        autoPlay
        muted
        style={{ width: '300px' }}
        ref={(video) => {
          if (video && localStream) {
            video.srcObject = localStream;
          }
        }}
      />
      <video
        id="remoteVideo"
        autoPlay
        style={{ width: '300px' }}
        ref={(video) => {
          if (video && remoteStream) {
            video.srcObject = remoteStream;
          }
        }}
      />
    </div>
  );
}

export default RoomPage;
