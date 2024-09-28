'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay";
 
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const [ meetcode, setMeetcode ] = React.useState<string>("");

  const DirectToRoom = () => {
    console.log(meetcode);
    if(meetcode){
      router.push(`/loby/${meetcode}`);
    }
  }

  return (
    <main className="flex flex-wrap md:flex-nowrap max-w-screen min-h-screen items-center justify-center md:justify-between md:gap-10">
      <div className=" w-full md:min-w-[50%] h-full flex items-center justify-center px-10 py-10">
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-4xl font-bold text-primary ">Video calls and meeting for everyone</h1>
          <p className="text-xl text-secondary">Connect, collabrate and celebrate fron anywhere with Video</p>
          <div className="w-full flex flex-wrap md:flex-nowrap justify-center items-center gap-3">
            <div className=" w-full md:w-1/3">
            <Button className="w-full flex justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
              New Meet
              </Button>
            </div>
            <div className=" w-full md:w-2/3 md:border-l-2 md:border-t-0 sm:border-t-2 border-border flex justify-center items-center gap-3 px-2 py-2">
              <Input value={meetcode} onChange={(e)=> setMeetcode(e.target.value)} placeholder="Enter a code or link" />
              <Button onClick={DirectToRoom} disabled={meetcode ? false : true}>Join</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full md:min-w-[50%] flex items-center justify-center p-11">
        <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
}
