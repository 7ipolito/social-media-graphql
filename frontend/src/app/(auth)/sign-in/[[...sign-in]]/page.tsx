"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Page() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    // Controle do tempo para o texto desaparecer e o SignIn aparecer
    const timer = setTimeout(() => {
      setShowText(false); // Remove o texto após 2 segundos
      setTimeout(() => setShowSignIn(true), 1000); // Mostra o SignIn após 1 segundo
    }, 3000);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar
  }, []);

  // Variantes para a animação do texto letra por letra
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.1 }, // Delay para cada letra
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }, // Tempo para desaparecer
    },
  };

  const text = "SOCIAL MEDIA GRAPHQL";

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-primary">
      {/* Animação para as imagens */}
      <motion.div
        className="flex flex-col items-center mb-4"
        initial={{ opacity: 0, scale: 0.8 }} // Ponto inicial
        animate={{ opacity: 1, scale: 1 }} // Ponto final
        transition={{ duration: 1.5, ease: "easeOut" }} // Duração da animação
      >
        <Image
          src="/logo.png"
          alt="Logo SocialMediaGraphQl"
          width={100}
          height={100}
        />

        {/* Texto animado letra por letra */}
        {showText && (
          <motion.div
            className="text-white text-lg mt-2"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                custom={index} // Passa o índice para calcular o delay
                variants={textVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Exibe o SignIn após o texto desaparecer */}
      {showSignIn && (
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Ponto inicial
          animate={{ opacity: 1, y: 0 }} // Ponto final
          transition={{ duration: 0.8, ease: "easeOut" }} // Duração da animação
        >
          <SignIn />
        </motion.div>
      )}
    </div>
  );
}
