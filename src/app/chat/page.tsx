import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { Video, SquarePen, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';

function page() {
  const tags = ['All', 'Unread', 'Mentions'];
  return (
    <div className="w-full h-full min-h-screen grid grid-cols-4 grid-rows-1">
      <div className="md:col-span-1 col-span-4 w-full max-h-screen overflow-hidden bg-card border-r-2 border">
        <header className="h-24 w-full shadow-sm flex flex-col gap-3 shadow-secondary px-3 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl text-primary">Chat</h1>
            <div className="flex gap-1">
              <ListFilter className="h-8 w-8 text-primary p-2 rounded-full bg-background" />
              <Video className="h-8 w-8 text-primary p-2 rounded-full bg-background" />
              <SquarePen className="h-8 w-8 text-primary p-2 rounded-full bg-background" />
            </div>
          </div>
          <div className="flex w-full gap-1  items-center justify-evenly">
            {tags.map((tag, index) => (
              <Button
                variant="destructive"
                size="sm"
                key={index}
                className="w-full focus:bg-primary rounded-md"
              >
                {tag}
              </Button>
            ))}
          </div>
        </header>
        <ScrollArea className="h-full w-full">
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
        </ScrollArea>
      </div>

      <div className="col-span-3 hidden md:block w-full h-full bg-secondary">
        content
      </div>
    </div>
  );
}

export default page;