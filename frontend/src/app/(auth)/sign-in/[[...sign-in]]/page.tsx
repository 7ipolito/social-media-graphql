import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-primary">
      <div className="flex items-center ">
        <Image
          src="/logo.png"
          alt="Logo SocialMediaGraphQl"
          width={100}
          height={100}
        />
        <Image
          src="/graphql-logo.png"
          alt="Logo GraphqQl"
          width={100}
          height={100}
        />
      </div>
      <SignIn />
    </div>
  );
}
