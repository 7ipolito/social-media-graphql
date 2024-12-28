import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";

export default function LoadingCreatePostCard() {
  return (
    <Skeleton className="max-h-96  h-52 w-[350px] lg:w-[400px] rounded-xl"></Skeleton>
  );
}
