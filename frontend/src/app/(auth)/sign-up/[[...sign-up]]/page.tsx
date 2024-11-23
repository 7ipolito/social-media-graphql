"use client";
import { useEffect } from "react";
import { SignUp, useSignIn, useSignUp } from "@clerk/nextjs";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/graphql/mutations";

const SignUpPage = () => {
  return (
    <div>
      <h1>Crie sua conta</h1>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
