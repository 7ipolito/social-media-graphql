// pages/index.jsx
'use client';

import React, { useState } from 'react';
import { Button, Input, Transition } from '@headlessui/react';
import Animation from '@/components/Animation';
import Field from '@/components/Field';
import CreateLoginFieldSet from '@/components/CreateLogin';

export default function Home() {
  const [openFieldSet, setOpenFieldSet] = useState(false);

  return (
    <div className="flex flex-col flex-1 items-center w-full h-screen bg-indigo-800">
      <Animation />


      {openFieldSet ?(<Transition show={openFieldSet}>
        <div className="transition duration-300 ease-in data-[closed]:opacity-0 w-full max-w-lg px-4">
          <CreateLoginFieldSet />
        </div>
      </Transition>):(
     
          <Transition show={!openFieldSet}>
            <div className="transition duration-300 ease-in data-[closed]:opacity-0 w-full max-w-80 ">
              <Field label="Username" description="Pick a username that represents you">
                <Input
                  className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                />
              </Field>
              <Field label="Password">
                <Input
                  className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                />
              </Field>
              <Button className="inline-flex items-center gap-2 mt-4 rounded-md bg-green-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-800 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Login
              </Button>
            </div>
        </Transition>)}

    
      {!openFieldSet?(
        <div>
        <p className="text-gray-200 mt-2">
          No account?{' '}
          <span
            className="text-green-700 cursor-pointer hover:text-green-800"
            onClick={() => setOpenFieldSet(true)}
          >
            Create one
          </span>
        </p>
      </div>):(
          <div>
            <p  onClick={() => setOpenFieldSet(false)} className="text-gray-200 mt-2 hover:text-green-700 cursor-pointer">
              Back to login page
            </p>
          </div>
      )}
    </div>
  );
}