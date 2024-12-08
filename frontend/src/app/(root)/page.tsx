import { GET_WHOAMI } from "@/graphql/queries";
import getToken from "@/lib/actions/token.action";
import client from "@/lib/client";
import { useQuery } from "@apollo/client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

export default async function Dashboard() {
  const { token } = await getToken();

  const response = await client.query({
    query: GET_WHOAMI,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  return (
    <div className="flex flex-col flex-1 items-center w-full h-screen bg-primary">
      <UserButton />
      <h1 className="text-white">Welcome to social media graphql</h1>
      <p className="text-white">Seu email é: {response.data.whoami.email}</p>
    </div>
  );
}
