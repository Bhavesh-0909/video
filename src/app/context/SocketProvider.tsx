'use client';
import React, { createContext, useMemo, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  useEffect(() => {
    const handleConnect = () => {
      console.log('Connected to server with ID:', socket.id);
    };

    const handleConnectError = (err: Error) => {
      console.error('Connection error:', err);
    };

    socket.on('connect', handleConnect);
    socket.on('connect_error', handleConnectError);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('connect_error', handleConnectError);
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
