// app/dashboard/page.tsx
import { gql } from '@apollo/client';
import React from 'react';
import { GET_WHOAMI } from '@/graphql/queries';
import { LOGOUT } from '@/graphql/mutations';
import client from '@/lib/client';
import { NextResponse, type NextRequest } from 'next/server';
import {  getFormattedCookie } from '@/utils/cookies';
import LogoutButton from '@/components/LogoutButton';


// Função para buscar dados do servidor
async function fetchData() {
  try {
    console.log(getFormattedCookie('qid'))
    const { data } = await client.query({
      query: GET_WHOAMI,
      context: {
        headers: {
          cookie: getFormattedCookie('qid'),
        },
      },
      fetchPolicy: 'no-cache', // Garante que os dados sejam sempre buscados do servidor
    });
   

    if (data.whoami.error) {
      // const response = await fetch('http://localhost:3000/api/logout', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Cookie': String(getFormattedCookie('qid')), // Adicione o cookie aqui
      //   },
      //   credentials: 'include', // Inclui cookies na requisição
      // });
      
      // console.log(await response.json()); // Para ver a resposta da API
      throw new Error(data.whoami.error[0].message);
    }

    return data.whoami.userId || null;
  } catch (error) {
    console.error('Erro ao buscar dados do servidor:', error);
   
    return null;
  }
}

// async function handleLogout()  {
//   try {
//     await client.mutate({ mutation: LOGOUT });
//     // Lógica após logout, como redirecionamento ou atualização de estado
//     window.location.href = '/login'; // Redireciona para a página de login
//   } catch (err) {
//     console.error('Erro ao fazer logout', err);
//   }
// };

export default async function Dashboard() {
  const userId = await fetchData();
  console.log(userId)

  // Função de logout pode ser gerenciada diretamente no cliente


  return (
    <div className="flex flex-col flex-1 items-center w-full h-screen bg-primary">
      <h1 className='text-white'>Welcome to social media graphql</h1>
      {userId === null ? (
        <p className='text-white'>Loading...</p>
      ) : (
        <>
          <p className='text-white'>Your userId is {userId}</p>
          <LogoutButton/>
        </>
      )}
    </div>
  );
}