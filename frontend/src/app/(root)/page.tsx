"use client";
import NavBar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import ProfileCard from "@/components/ProfileCard";
import Sponsored from "@/components/Sponsored";
import { useGetUser } from "@/hooks/useGetUser";
import { getAllPosts } from "@/lib/actions/post.action";
import { GetPostParams } from "@/lib/actions/shared.types";
import client from "@/lib/client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [postsData, setPostsData] = useState<GetPostParams[] | undefined>(
    undefined
  );
  const { data } = useGetUser();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await getAllPosts();
        console.log(allPosts);
        setPostsData(allPosts);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-1 w-full">
      <div className="lg:min-h-screen flex flex-col lg:max-w-screen-xl items-center justify-between mx-auto pb-32 bg-primary">
        <NavBar />
        <div className="flex flex-col lg:grid lg:grid-cols-3">
          <div className="order-1 lg:order-2 flex justify-center lg:justify-normal pt-8">
            <PostCard clerkUserId={data?.clerkUserId} image={data?.image} />
          </div>

          <div className="order-2 lg:order-3 flex justify-center items-center flex-wrap gap-4 p-8">
            {postsData &&
              postsData.map((post, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full"
                >
                  <p className="text-white text-lg font-semibold">
                    {post.body}
                  </p>
                </div>
              ))}
          </div>
          <div className="order-3 lg:order-1">
            <div className="flex flex-col items-center p-8 gap-8">
              <Sponsored />
              <ProfileCard
                clerkUserId={data?.clerkUserId}
                email={data?.email}
                image={data?.image}
                username={data?.username}
                createAt={data?.createAt}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
