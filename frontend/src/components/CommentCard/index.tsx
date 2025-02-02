import React from "react";
import { Avatar, Card, CardBody } from "@nextui-org/react";

interface CommentCardProps {
  photoUser: string;
  username: string;
  commentText: string;
  creationDate: string;
}

const CommentCard = ({
  photoUser,
  username,
  commentText,
  creationDate,
}: CommentCardProps) => {
  return (
    <div className="p-4 shadow rounded-2xl flex items-start space-x-4 mb-2">
      <div className="flex flex-row">
        <div>
          <Avatar
            className="w-12 h-12"
            src={photoUser}
            alt={`${username}'s profile`}
          />
        </div>
        <div className="flex-row ml-4">
          <p className="font-semibold text-lg text-gray-800">{username}</p>
          <p className="text-sm text-gray-600">{commentText}</p>
          <p className="text-xs text-gray-500 mt-2">{creationDate}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
