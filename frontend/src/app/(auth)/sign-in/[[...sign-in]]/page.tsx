import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full h-screen bg-primary">
      <SignIn />;
    </div>
  );
}
