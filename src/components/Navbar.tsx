"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Home,
  MessageCircle,
  Users2,
  CalendarDays,
  Settings,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

function Navbar() {
  const pathname = usePathname();
  const { data } = useSession();
  const user = data?.user;
  console.log(user);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <div
      className={
        pathname === "/login" || pathname === "/signup" || pathname === "/loby"
          ? "hidden"
          : "block"
      }
    >
      <aside className="fixed top-0 inset-x-0 md:inset-y-0 md:left-0 z-10 hidden w-full md:w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:h-10 md:w-10 md:text-base"
          >
            <Image
              width={10}
              height={10}
              src="/visual-logo.ico"
              alt="logo"
              className="h-full w-full transition-all group-hover:scale-110"
            />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className={`${pathname === "/" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/chat"
                  className={`${pathname === "/chat" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">Chat</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/team"
                  className={`${pathname === "/team" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Teams</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Teams</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/calendar"
                  className={`${pathname === "/calendar" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <CalendarDays className="h-5 w-5" />
                  <span className="sr-only">Calendar</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Calendar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage src={user?.image as string} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/setting">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left"
                        >
                          Log Out
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/setting"
                  className={`${pathname === "/setting" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="block md:hidden">
        <Sheet>
          <div className="px-2 py-2 flex items-center justify-between border-b-[1px] border-border">
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar>
                        <AvatarImage src={user?.image as string} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/setting">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left"
                          >
                            Log Out
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent side="right">Profile</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <SheetContent className="p-0" side="left">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              <Link
                href="/"
                className={`${pathname === "/" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} group flex h-10 w-full items-center gap-2 px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground`}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/chat"
                className={`${pathname === "/chat" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} group flex h-10 w-full items-center gap-2 px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground`}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat</span>
              </Link>
              <Link
                href="/team"
                className={`${pathname === "/team" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} group flex h-10 w-full items-center gap-2 px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground`}
              >
                <Users2 className="h-5 w-5" />
                <span>Team</span>
              </Link>
              <Link
                href="/calendar"
                className={`${pathname === "/calendar" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} group flex h-10 w-full items-center gap-2 px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground`}
              >
                <CalendarDays className="h-5 w-5" />
                <span>Calendar</span>
              </Link>
              <Link
                href="/setting"
                className={`${pathname === "/setting" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} group flex h-10 w-full items-center gap-2 px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Navbar;
