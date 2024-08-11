'use client'

import Image from "next/image";
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { Button, Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from 'framer-motion'
import { GET_USERS } from "@/graphql/queries";


export default function Home() {
  const { data, loading, error } = useQuery(GET_USERS);
  let [isOpen, setIsOpen] = useState(true)
  
  return (
    <>
    <button onClick={() => setIsOpen(true)}>Open dialog</button>
    <AnimatePresence>
      {isOpen && !loading && (
        <Dialog static open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30"
          />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg space-y-4 bg-white p-12"
            >
              <DialogTitle className="text-lg font-bold">Welcome, {data.users[0].name}📱</DialogTitle>
              <Description>This is Social Media Graphql</Description>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  </>
  );
}
