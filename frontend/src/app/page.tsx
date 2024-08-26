// app/page.jsx (ou app/page.tsx se estiver usando TypeScript)
'use client'
import { cookies } from 'next/headers';
import Login from './(auth)/login';
import { useQuery } from '@apollo/client';
import { GET_WHOAMI } from '@/graphql/queries';
import Dashboard from './dashboard/page';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Animation  from "../components/Animation"
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const router = useRouter();
  const hasShownToast = useRef(false); // Referência para controlar se o toast já foi exibido

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('error') === 'disconnected' && !hasShownToast.current) {
      hasShownToast.current = true; // Marca que o toast já foi exibido
      toast.error('Sorry, you were disconnected'); // Mostra a notificação
    }
  }, [router]);

  return (
    <div className="flex flex-col flex-1 items-center w-full h-screen bg-primary">
       <Toaster />
      <Login/>
   
    </div>
  );
}