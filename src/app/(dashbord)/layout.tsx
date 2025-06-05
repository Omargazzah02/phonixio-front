'use client';

import "../globals.css";

import Nav from "@/components/Nav";
import { useEffect, useState } from 'react';





export default function Layout({





  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{


  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);




useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me');
        if (res.status === 401) {
          window.location.href = '/login';
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error('Erreur:', err);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);






  return (
  <div>
{loading ?    <Nav username="loading"></Nav> :    <Nav username={user.firstName +' '+ user.lastName} ></Nav>}

   {children} 
      </div>
  );
}
