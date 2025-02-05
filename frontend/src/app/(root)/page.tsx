"use client";
import NavBar from "@/components/Navbar";
import CreatePostCard from "@/components/CreatePostCard";
import ProfileCard from "@/components/ProfileCard";
import Sponsored from "@/components/Sponsored";
import { useGetUser } from "@/hooks/useGetUser";
import { getAllPosts } from "@/lib/actions/post.action";
import { GetPostParams } from "@/lib/actions/shared.types";
import client from "@/lib/client";
import { useEffect, useState } from "react";
import PostCard, { PostCardProps } from "@/components/PostCard";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/graphql/queries";
import LoadingCreatePostCard from "@/components/CreatePostCard/loading";

export default function Dashboard() {
  const [postsData, setPostsData] = useState<GetPostParams[]>([]);
  const { data, loading: loadingData, error } = useGetUser();
  const { data: posts, loading } = useQuery(GET_POSTS);
  const [isNotLogged, setIsNotLogged] = useState(false);

  useEffect(() => {
    if (posts && posts.posts) {
      setPostsData(posts.posts);
    }
  }, [data?._id, posts]);

  useEffect(() => {
    if (error == null) {
      setTimeout(() => {
        setIsNotLogged(true);
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (data._id) {
      localStorage.setItem("clerkUserId", data._id);
    }
  }, [data._id]);

  const savedUserId =
    typeof window !== "undefined" ? localStorage.getItem("clerkUserId") : null;

  return (
    <div className="flex flex-1 w-full">
      <div className="lg:min-h-screen flex flex-col lg:max-w-screen-xl items-center justify-between mx-auto pb-32 bg-primary">
        <NavBar />
        <div className="flex flex-col lg:grid lg:grid-cols-3">
          <div className="order-1 lg:order-2 flex justify-center lg:justify-normal pt-8">
            <CreatePostCard
              clerkUserId={data?.clerkUserId}
              image={data?.image}
              loading={loadingData}
              notLogged={isNotLogged}
            />
          </div>

          <div className="order-2 lg:order-3 flex flex-wrap gap-4 p-8">
            {!loading && postsData?.length > 0 ? (
              postsData.map((post, idx) => (
                <PostCard
                  key={idx}
                  id={post.id}
                  username={post.user.username}
                  createdAt={post.createdAt}
                  countLikes={post.countLikes}
                  countComments={post.countComments}
                  image={post.user.image}
                  body={post.body}
                  clerkUserId={data.clerkUserId}
                  hasLiked={post.likes.some((like) => like.email == data.email)}
                  notLogged={isNotLogged}
                />
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-40 text-center text-white">
                <p>{loading && "Loading posts..."}</p>
              </div>
            )}
          </div>
          <div className="order-3 lg:order-1">
            <div className="flex flex-col items-center p-8 gap-8">
              <Sponsored />
              <ProfileCard
                loading={loadingData}
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
