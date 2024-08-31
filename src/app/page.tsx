'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "./context/SocketProvider";

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const router = useRouter();
  const socket: any = useSocket();

  const handleCreateRoom = () => {
    if (socket) {
      console.log('Emitting createRoom event for Room ID:', roomId); // Add this for debugging
      socket.emit('createRoom', roomId, (error, roomId) => {
        console.log("enter room")
        if (error) {
          alert(error);
        } else {
          console.log(`Room ${roomId} created successfully.`);
          router.push(`/room/?roomID=${roomId}`);
        }
      });
    } else {
      console.error('Socket not connected');
    }
  };

  const handleJoinRoom = (roomId) => {
    socket.emit('joinRoom', roomId, (error, data) => {
      if (error) {
        alert(error);
      } else {
        console.log('Joined room:', data);
        // Store RTP capabilities, transport params, etc., and proceed to handle media streams
        router.push(`/room/?roomID=${roomId}`);
      }
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <h1>Create Room</h1>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>
      <div>
        <h1>Join Room</h1>
        <input
          type="text"
          placeholder="Enter Room ID"
          onChange={(e) => handleJoinRoom(e.target.value)}
        />
        <button>Join Room</button>
      </div>
    </main>
  );
}
