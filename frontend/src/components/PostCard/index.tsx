"use client";
import {
  Card,
  CardHeader,
  Avatar,
  CardBody,
  Textarea,
  Progress,
  CardFooter,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMutation } from "@apollo/client";
import { CREATE_POST, LIKE_POST } from "@/graphql/mutations";
import { GET_POSTS } from "@/graphql/queries";
import client from "@/lib/client";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { FaThumbsUp, FaComment } from "react-icons/fa";

import relativeTime from "dayjs/plugin/relativeTime";
import { error } from "console";
dayjs.extend(relativeTime);

dayjs.locale("en-US");
export interface PostCardProps {
  id: string;
  username: string | null;
  createdAt: Date;
  countLikes: number;
  countComments: number;
  image: string;
  clerkUserId: string;
  hasLiked: boolean;
  body: string;
}

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const PostCard = ({
  body,
  id,
  countComments,
  countLikes,
  createdAt,
  image,
  clerkUserId,
  username,
  hasLiked = false,
}: PostCardProps) => {
  const relativeTimeAgo = dayjs(createdAt).fromNow();

  const [isLiked, setIsLiked] = useState(hasLiked);
  const [likePost, { loading, error }] = useMutation(LIKE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const handleLike = async () => {
    await likePost({
      variables: {
        likePostInput: { id: id, clerkUserId: clerkUserId },
      },
    });
    setIsLiked(true);
  };

  return (
    <Card className="max-h-96 h-52 w-[350px] lg:w-[400px]">
      <CardHeader>
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-xl">{username}</p>
          <div className="">
            <Avatar isBordered radius="full" size="md" src={image} />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div>
          <p className="text-gray-400">{relativeTimeAgo}</p>
          <p>{body}</p>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <button
            className={`flex items-center gap-2 ${
              isLiked ? "text-primary" : "text-gray-600"
            } hover:text-primary`}
            onClick={!isLiked ? handleLike : undefined}
          >
            <FaThumbsUp />
            <span>{countLikes}</span>
          </button>

          <button
            className="flex items-center gap-2 text-gray-600 hover:text-primary"
            onClick={() => console.log("Comment clicked")}
          >
            <FaComment />
            <span>{countComments}</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
