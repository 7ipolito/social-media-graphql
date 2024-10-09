// app/dashboard/page.tsx
import { UserButton, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function Dashboard() {
  // const userId = await fetchData();
  // console.log(userId);

  // Função de logout pode ser gerenciada diretamente no cliente
  const { userId } = auth();

  return (
    <div className="flex flex-col flex-1 items-center w-full h-screen bg-primary">
      <UserButton />
      <h1 className="text-white">Welcome to social media graphql</h1>
      <p className="text-white">Seu ID é: {userId}</p>
    </div>
  );
}
