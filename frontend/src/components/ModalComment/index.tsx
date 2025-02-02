import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
  Textarea,
  Button,
} from "@nextui-org/react";
import CommentCard from "../CommentCard";
import React, { useState, useEffect } from "react";
import { useMutation, useSubscription, useQuery } from "@apollo/client";
import { SendHorizontal } from "lucide-react";
import { GET_ALL_COMMENTS } from "../../graphql/queries";
import { COMMENT_ADDED } from "@/graphql/subscriptions";
import { ADD_COMMENT } from "@/graphql/mutations";
interface Comment {
  text: string;
  user: {
    username: string;
    image: string;
  };
  createdAt: string;
}

interface ModalCommentProps {
  photoUserLogged: string;
  onOpenChange: () => void;
  isOpen: boolean;
  clerkUserId: string;
  postId: string;
}

export default function ModalComment({
  photoUserLogged,
  isOpen,
  onOpenChange,
  clerkUserId,
  postId,
}: ModalCommentProps) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_ALL_COMMENTS, {
    variables: { postId },
    skip: !isOpen,
  });

  const { data: subscriptionData } = useSubscription(COMMENT_ADDED, {
    variables: { postId },
  });

  useEffect(() => {
    if (queryData?.getAllComments) {
      setComments(queryData.getAllComments);
    }
  }, [queryData]);

  useEffect(() => {
    if (subscriptionData?.commentAdded?.comments) {
      setComments((prevComments) => {
        const newComments = subscriptionData.commentAdded.comments.filter(
          (newComment: Comment) =>
            !prevComments.some(
              (existingComment) =>
                existingComment.createdAt === newComment.createdAt &&
                existingComment.user.username === newComment.user.username &&
                existingComment.text === newComment.text
            )
        );

        return [...newComments, ...prevComments];
      });
    }
  }, [subscriptionData]);

  const [addComment] = useMutation(ADD_COMMENT);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      await addComment({
        variables: {
          addCommentInput: {
            postId,
            userId: clerkUserId,
            text: commentText,
          },
        },
        refetchQueries: [{ query: GET_ALL_COMMENTS }],
      });
      setCommentText("");
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Comments</ModalHeader>
            <ModalBody>
              <div className="overflow-y-scroll max-h-96">
                {queryLoading ? (
                  <p className="text-center text-gray-500">
                    Loading comments...
                  </p>
                ) : comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <CommentCard
                      key={index}
                      photoUser={comment.user.image}
                      username={comment.user.username}
                      commentText={comment.text}
                      creationDate={new Date(
                        comment.createdAt
                      ).toLocaleString()}
                    />
                  ))
                ) : (
                  <div className="h-16">
                    <p className="text-center text-gray-500">
                      No comments yet.
                    </p>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="w-full flex flex-row items-center pb-10">
                <div className="p-2">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={photoUserLogged}
                  />
                </div>
                <Textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disableAnimation
                  disableAutosize
                  classNames={{
                    base: "max-w-xl",
                    input: "resize-y min-h-[40px] max-h-[100px]",
                  }}
                  label="Comment"
                  placeholder="Enter your comment"
                  variant="bordered"
                />
                <Button
                  isIconOnly
                  aria-label="Send"
                  color="primary"
                  className="ml-4"
                  onPress={handleAddComment}
                >
                  <SendHorizontal />
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
