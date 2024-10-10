"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

function Page() {
  const {data} = useSession();
  const searchParam = useSearchParams();
  const roomId = searchParam.get("meetcode");

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
            
          </div>
          <div className="w-full flex items-center justify-center gap-3 absolute bottom-2">
            
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center gap-3">
          <h1 className="text-4xl font-semibold text-primary-foreground">
            Ready to Join?
          </h1>
          <Button className="w-32 h-12 text-2xl font-semibold rounded-full">
            Join
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Page;
