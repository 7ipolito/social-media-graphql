"use client";
import {
  Card,
  CardHeader,
  Avatar,
  Button,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { color } from "framer-motion";
import React from "react";

interface ProfileCardProps {
  clerkUserId: string;
  email: string;
  image: string;
  username: string | null;
  createAt: Date;
  loading: boolean;
}

const ProfileCard = ({
  clerkUserId,
  createAt,
  email,
  image,
  username,
  loading,
}: ProfileCardProps) => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="max-w-96 max-h-96 h-64 ">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://avatars.githubusercontent.com/u/45522944?v=4"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              7ipolito2003@gmail.com
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              ADMIN
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200"
              : ""
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => (window.location.href = "https://github.com/7ipolito")}
        >
          Github
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          👨🏽‍💻FullStack Enginner ⚙️ Owner of Gallery Youtube and Building
          @socialmediagraphql and other private projects.
        </p>
        <span className="pt-2">My github is @7ipolito follow me!</span>
      </CardBody>
      {/* <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default ProfileCard;
