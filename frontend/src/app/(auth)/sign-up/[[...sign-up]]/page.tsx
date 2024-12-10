"use client";
import { useEffect } from "react";
import { SignUp, useSignIn, useSignUp } from "@clerk/nextjs";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/graphql/mutations";

const SignUpPage = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full h-screen bg-primary">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
