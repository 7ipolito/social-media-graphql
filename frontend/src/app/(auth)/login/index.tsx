
'use client';  

import React, { useEffect, useState } from 'react';
import Animation from '@/components/Animation';
import CreateLoginFieldSet from '@/components/CreateAccountForm';
import LoginForm from '@/components/LoginForm';
import loadingAnimation from '../../../components/Animation/loading.json';
import telefoneAnimation from '../../../components/Animation/splash4.json';

export default function Login() {
  const [openFieldSet, setOpenFieldSet] = useState(false);


  return (
    <div className='flex flex-row '>
      {/* <Animation animation={telefoneAnimation} className="w-[450px]  "/> */}
      <div>
      <Animation animation={loadingAnimation} className="w-56 "/>
      {openFieldSet ? (
        <CreateLoginFieldSet />
      ) : (
        <LoginForm />
      )}
      {!openFieldSet ? (
        <div>
          <p className="text-gray-200 mt-2 ">
            No account?{' '}
            <span
              className="text-green-700 cursor-pointer hover:text-green-800"
              onClick={() => setOpenFieldSet(true)}
            >
              Create one
            </span>
          </p>
        </div>
      ) : (
        <div>
          <p
            onClick={() => setOpenFieldSet(false)}
            className="text-gray-200 mt-2 p-4 hover:text-green-700 cursor-pointer"
          >
            Back to login page
          </p>
        </div>
      )}
      </div>
    </div>
  );
}