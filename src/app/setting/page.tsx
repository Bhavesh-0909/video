'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
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
    <div>Page</div>
  )
}

export default Page