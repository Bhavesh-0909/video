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

function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { push } = useRouter();
  const data = useSession();

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
    <div className="flex flex-col items-center gap-2 md:grid md:grid-cols-4 md:grid-rows-1 w-full h-full">
      <div className="col-span-1 h-full w-full max-w-[300px] md:max-w-[100%] px-4 py-2 ">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>

      <div className="col-span-3 w-full max-w-screen h-full min-h-screen border-[1.5px] border-r-secondary">
        <header className="flex flex-col md:flex-row items-center justify-between border border-b-secondary p-2 px-6 h-14">
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

          <div className="flex items-center gap-1.5">
            <Button className="p-1.5 rounded-lg border border-secondary">
              <Search className="h-5 w-5" />
            </Button>

            <Select defaultValue="Day">
              <SelectTrigger value="Day" className="w-[180px]">
                <SelectValue placeholder="Select Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Day">Day</SelectItem>
                  <SelectItem value="Week">Week</SelectItem>
                  <SelectItem value="Month">Month</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button className="p-1.5 rounded-lg border border-secondary">
              <Link className="h-5 w-5" />
            </Button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Page;