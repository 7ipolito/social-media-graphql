"use client";

import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa"; // Ícone de cadeado do React Icons

const BlockedPostCard = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative max-h-96 h-52 lg:w-[400px] w-[350px] overflow-hidden group"
    >
      <motion.div
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-blockedPostColor flex flex-col items-center justify-center text-white text-center px-4 rounded-[13px]"
      >
        <FaLock className="text-2xl lg:text-3xl mb-2 " />
        <p className="text-sm lg:text-base">
          You need to log in to create posts.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default BlockedPostCard;
