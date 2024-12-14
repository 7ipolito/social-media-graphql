import NavBar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import Sponsored from "@/components/Sponsored";
import { GET_WHOAMI } from "@/graphql/queries";
import getToken from "@/lib/actions/token.action";
import { getUserData } from "@/lib/actions/user.action";
import client from "@/lib/client";
import { UserButton } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Card,
  CardFooter,
  Image,
  CardHeader,
} from "@nextui-org/react";
import Link from "next/link";

export default async function Dashboard() {
  try {
    const user = await getUserData();
    console.log(user);
    return (
      <div className=" flex flex-1 w-full">
        <div className="lg:min-h-screen flex flex-col  lg:max-w-screen-xl items-center justify-between mx-auto pb-32  bg-primary">
          <NavBar />
          <div className=" lg:grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div className="">
              <div className="flex flex-col items-center p-8 ">
                <ProfileCard
                  clerkUserId={user.clerkId}
                  email={user.email}
                  image={user.image}
                  username={user.username}
                  createAt={user.createAt}
                />
                <Sponsored />
              </div>
            </div>
            <div className="w-[500px] h-[500px]  flex justify-center items-center"></div>
            <div className="w-[500px] h-[500px] flex justify-center items-center"></div>
          </div>
        </div>

        {/* <UserButton />
        <h1 className="text-white">Welcome to social media graphql</h1>
        {user ? (
          <p className="text-white">Seu email é: {user.email}</p>
        ) : (
          <p className="text-red-500">
            Erro: Dados de usuário não encontrados. Complete seu cadastro!
          </p>
        )} */}
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar os dados do usuário:", error);

    return (
      <div className="flex flex-col flex-1 items-center w-full h-screen bg-primary">
        {/* <UserButton />
        <h1 className="text-white">Welcome to social media graphql</h1>
        <p className="text-red-500">
          Não foi possível carregar os dados. Por favor, tente novamente mais
          tarde.
        </p> */}
      </div>
    );
  }
}
