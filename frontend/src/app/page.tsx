// pages/index.jsx
'use client';

import React, { useState } from 'react';
import { Button, Input, Transition } from '@headlessui/react';
import Animation from '@/components/Animation';
import Field from '@/components/Field';
import CreateLoginFieldSet from '@/components/CreateAccountForm';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  const [openFieldSet, setOpenFieldSet] = useState(false);

  return (
    <div className="flex flex-col flex-1 items-center w-full h-screen bg-indigo-800">
      <Animation />
      {openFieldSet ?(
        <CreateLoginFieldSet />
      ):(
     
         <LoginForm/>
       )}
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