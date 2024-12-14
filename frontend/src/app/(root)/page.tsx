"use client";
import NavBar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import Sponsored from "@/components/Sponsored";
import { useGetUser } from "@/hooks/useGetUser";

export default function Dashboard() {
  const { data } = useGetUser();

  return (
    <div className=" flex flex-1 w-full">
      <div className="lg:min-h-screen flex flex-col  lg:max-w-screen-xl items-center justify-between mx-auto pb-32  bg-primary">
        <NavBar />
        <div className=" lg:grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="">
            <div className="flex flex-col items-center p-8 ">
              <ProfileCard
                clerkUserId={data?.clerkId}
                email={data?.email}
                image={data?.image}
                username={data?.username}
                createAt={data?.createAt}
              />
              <Sponsored />
            </div>
          </div>
          <div className="w-[500px] h-[500px]  flex justify-center items-center"></div>
          <div className="w-[500px] h-[500px] flex justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
}
