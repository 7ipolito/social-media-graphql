"use client";
import { useEffect } from "react";
import { SignUp, useSignIn, useSignUp } from "@clerk/nextjs";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/graphql/mutations";

const SignUpPage = () => {
  const { isLoaded, signUp } = useSignUp();
  const { signIn } = useSignIn();
  const [register, { data, loading, error }] = useMutation(CREATE_USER);

  const handleRegister = async (email, clerkUserId) => {
    try {
      const response = await register({
        variables: {
          email,
          clerkUserId,
        },
      });

      if (response.data.register.error) {
        alert("ERRO");
        throw new Error(response.data.register.error[0]);
      }

      alert("Conta criada com sucesso!");
    } catch (err) {
      console.error("Erro ao registrar usuário:", err);
    }
  };

  useEffect(() => {
    if (
      (signIn && signIn.status === "complete") ||
      (signUp && signUp.status === "complete")
    ) {
      const email = signUp?.emailAddresses[0]?.emailAddress; // Pegando o email do usuário registrado
      const clerkUserId = signUp?.createdUserId; // Pegando o ID do usuário

      if (email && clerkUserId) {
        handleRegister(email, clerkUserId); // Chama a função para registrar o usuário no backend
      }
    }
  }, [signIn, signUp]);

  return (
    <div>
      <h1>Crie sua conta</h1>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
