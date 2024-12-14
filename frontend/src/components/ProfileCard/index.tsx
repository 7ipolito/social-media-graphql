"use client";
import {
  Card,
  CardHeader,
  Avatar,
  Button,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import React from "react";

interface ProfileCardProps {
  clerkUserId: string;
  email: string;
  image: string;
  username: string | null;
  createAt: Date;
}

const ProfileCard = ({
  clerkUserId,
  createAt,
  email,
  image,
  username,
}: ProfileCardProps) => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="max-w-96 max-h-96 h-64 mb-8">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={image} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {email}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {username}
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
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Cancel Edit" : "Edit"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding
          adventure!
        </p>
        <span className="pt-2">
          #FrontendWithHipolito
          <span aria-label="computer" className="py-2" role="img">
            💻
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
