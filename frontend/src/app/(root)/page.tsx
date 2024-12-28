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
  const { data, loading: loadingData } = useGetUser();
  const { data: posts, loading, error } = useQuery(GET_POSTS);

  useEffect(() => {
    if (posts && posts.posts) {
      console.log(posts.posts);

      setPostsData(posts.posts);
    }
  }, [posts]);

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
                  countComments={0}
                  image={post.user.image}
                  body={post.body}
                  clerkUserId={post.user.clerkUserId}
                  hasLiked={post.likes.some((like) => like._id === data?._id)}
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
