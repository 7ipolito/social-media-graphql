import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";

export default function LoadingProfileCard() {
  return (
    <Skeleton className="max-h-96 h-52 lg:w-[400px] w-[370px] rounded-xl"></Skeleton>
  );
}
