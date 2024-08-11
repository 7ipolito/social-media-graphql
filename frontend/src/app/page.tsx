'use client'

import Image from "next/image";
import { gql, useQuery } from '@apollo/client';
import { useEffect } from "react";

export const GET_USERS = gql`
  query getAllUsers {
    users {
      id
      name
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_USERS);
  useEffect(()=>{
console.log(data)
  },[loading])
  return (
      <div>
        {!loading &&(
          <h1>Hello, {data.users[0].name}</h1>
        )}
        
      </div>
  );
}
