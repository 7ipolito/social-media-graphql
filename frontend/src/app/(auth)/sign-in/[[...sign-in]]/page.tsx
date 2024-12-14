"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Page() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
      setTimeout(() => setShowSignIn(true), 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.1 },
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const text = "SOCIAL MEDIA GRAPHQL";

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-primary">
      <motion.div
        className="flex flex-col items-center mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/logo.png"
          alt="Logo SocialMediaGraphQl"
          width={100}
          height={100}
        />

        {showText && (
          <motion.div
            className="text-white text-lg mt-2"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {text.split("").map((char, index) => (
              <motion.span key={index} custom={index} variants={textVariants}>
                {char}
              </motion.span>
            ))}
          </motion.div>
        )}
      </motion.div>

      {showSignIn && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SignIn />
        </motion.div>
      )}
    </div>
  );
}
