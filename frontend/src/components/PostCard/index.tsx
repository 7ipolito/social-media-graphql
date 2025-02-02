"use client";
import {
  Card,
  CardHeader,
  Avatar,
  CardBody,
  Textarea,
  Progress,
  CardFooter,
  Tooltip,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
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
import CommentCard from "../CommentCard";
import ModalComment from "../ModalComment";
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
  notLogged: boolean;
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
  hasLiked,
  notLogged,
}: PostCardProps) => {
  const relativeTimeAgo = dayjs(createdAt).fromNow();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [likePost, { loading, error }] = useMutation(LIKE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const handleLike = async () => {
    await likePost({
      variables: {
        likePostInput: { postId: id, userId: clerkUserId },
      },
    });
  };

  return (
    <>
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
              disabled={!clerkUserId}
              className={`flex items-center gap-2 ${
                hasLiked ? "text-primary" : "text-gray-600"
              } hover:text-primary`}
              onClick={!hasLiked ? handleLike : undefined}
            >
              <FaThumbsUp />
              <span>{countLikes}</span>
            </button>

            <button
              disabled={!clerkUserId}
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
              onClick={() => onOpen()}
            >
              <FaComment />
              <span>{countComments}</span>
            </button>
          </div>
        </CardFooter>
      </Card>
      {isOpen && (
        <ModalComment
          isOpen={isOpen}
          clerkUserId={clerkUserId}
          postId={id}
          photoUserLogged={image}
          onOpenChange={onOpenChange}
        />
      )}
    </>
  );
};

export default PostCard;
