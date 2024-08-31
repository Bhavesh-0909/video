'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Page() {
  const { push } = useRouter();
  const data = useSession();

  useEffect(() => {
    if (!data) {
      push('/login');
    }
  }, [data]);
  
  return (
    <div>room</div>
  )
}

export default Page

