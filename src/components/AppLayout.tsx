"use client";
import Navbar from "./Navbar";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div className="flex flex-col md:flex-row min-h-screen w-full">
        <Navbar />
        <div className="flex-1 h-full w-full sm:ml-14">{children}</div>
      </div>
    </SessionProvider>
  );
};

export default Layout;
