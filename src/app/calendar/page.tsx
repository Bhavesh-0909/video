'use client';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Search,
  Link,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ScrollArea } from '@/components/ui/scroll-area';

function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { push } = useRouter();
  const data = useSession();

  const timeStamps = ["12 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm"];

  useEffect(() => {
    if (!data) {
      push('/login');
    }
  }, [data]);
  
  const handleDateChange = (days: number) => {
    if (date) {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + days);
      setDate(newDate);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 md:grid md:grid-cols-4 md:grid-rows-1 w-full h-full max-h-screen">
      <div className="col-span-1 h-full w-full max-w-[300px] md:max-w-[100%] px-4 py-2 ">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>

      <div className="col-span-3 w-full max-w-screen h-full min-h-screen border-[1.5px] border-r-secondary">
        <header className="flex w-full flex-row items-center justify-between border border-b-secondary md:p-2 md:px-6 h-14">
          <div className="flex md:w-auto w-fit items-center gap-1.5">
            <Button
              onClick={() => handleDateChange(-1)}
              className="p-1.5 rounded-lg border border-secondary"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              onClick={() => setDate(new Date())}
              className="p-1.5 rounded-lg border border-secondary"
            >
              <CalendarDays className="h-5 w-5" />
            </Button>

            <Button
              onClick={() => handleDateChange(1)}
              className="p-1.5 rounded-lg border border-secondary"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="text-primary font-bold text-lg">
            {date?.toDateString()}
          </div>

            <Button className="p-1.5 rounded-lg border border-secondary">
              <Link className="h-5 w-5" />
            </Button>
        </header>
        <div className="w-full h-[90vh]">
          <ScrollArea className="w-full h-full">
            <div className="h-full flex flex-col gap-6 py-6 px-4">
              {timeStamps.map((time, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="font-medium w-14">{time}</div>
                  <div className="flex-grow bg-border h-0.5"></div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default Page;