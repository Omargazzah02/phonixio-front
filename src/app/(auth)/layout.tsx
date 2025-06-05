'use client';

import "../globals.css";

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";





export default function Layout({





  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{



    const router = useRouter()



useEffect(() => {
    const fetchUser = async () => {
     
        const res = await fetch('/api/me');
        if (res.status === 200) {
          router.push('/products')
        }

        return
      
    };

    fetchUser();
  }, []);






  return (
  <div>

   {children} 
      </div>
  );
}
