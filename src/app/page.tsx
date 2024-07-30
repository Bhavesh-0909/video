'use client';
import { useSession } from "next-auth/react";

export default function Home() {
  const data = useSession();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      home
    </main>
  );
}

