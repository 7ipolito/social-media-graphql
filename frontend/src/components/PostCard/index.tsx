"use client";
import {
  Card,
  CardHeader,
  Avatar,
  CardBody,
  Textarea,
  Progress,
} from "@nextui-org/react";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/graphql/mutations";
import { GET_POSTS } from "@/graphql/queries";
import client from "@/lib/client";

interface PostCardProps {
  clerkUserId: string;
  image: string;
}

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const PostCard = ({ clerkUserId, image }: PostCardProps) => {
  const [textPost, setTextPost] = useState("");
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onCompleted: () => {
      // Quando a mutação for completada, refazer a consulta GET_POSTS
      client.query({
        query: GET_POSTS,
        fetchPolicy: "network-only", // Ignorar o cache e fazer uma requisição ao servidor
      });
    },
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => {
        if (v >= 100) {
          clearInterval(interval);
          return v;
        }
        return v + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleReaction = (e: { emoji: string }) => {
    setTextPost((prev) => prev + e.emoji);
  };

  const handleChange = (e: any) => {
    setTextPost(e.target.value);
  };

  const handleEnterPress = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();

      try {
        console.log(clerkUserId);
        await createPost({
          variables: { clerkUserId: clerkUserId, body: textPost },
        });

        setStatus("success");
        setTextPost("");
        setTimeout(() => {
          setStatus("idle");
        }, 1000);
      } catch (err) {
        setStatus("error");
        setTimeout(() => {
          setStatus("idle");
        }, 1000);
      }
    }
  };

  return (
    <Card className="max-h-96  h-52 lg:w-[400px]">
      {loading ? (
        <div className="flex flex-1 items-center p-2">
          <Progress
            aria-label="Creating..."
            className="max-w-md"
            color="success"
            showValueLabel={true}
            size="md"
            value={value}
          />
        </div>
      ) : status === "success" ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-green-600 font-semibold">
            Post created successfully!
          </p>
        </div>
      ) : status === "error" ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-600 font-semibold">
            {error ? error.message : "Failed to create the post. Try again."}
          </p>
        </div>
      ) : (
        <>
          <CardHeader>
            <div className="w-full flex flex-row items-center">
              <div className="p-2">
                <Avatar isBordered radius="full" size="md" src={image} />
              </div>
              <Textarea
                label="What`s happened in your day?"
                value={textPost}
                onChange={handleChange}
                onKeyDown={handleEnterPress}
              />
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-center flex-1 w-full">
              <Picker
                reactionsDefaultOpen={true}
                className="flex items-center justify-center"
                onEmojiClick={handleReaction}
              />
            </div>
          </CardBody>
        </>
      )}
    </Card>
  );
};

export default PostCard;