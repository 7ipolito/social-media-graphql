'use client';

import React, { useState } from 'react';
import { Button, Input } from '@headlessui/react';
import Field from '../Field';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN);

  const handleLogin = async () => {
    try {
      const response = await login({
        variables: {
          username,
          password,
        },
      });
      alert('Hello, '+response.data.login.user.username)
      router.push('/dashboard')
      // if (response.data.login.token) {
      //   localStorage.setItem('token', response.data.login.username);
        
      // }
    } catch (err) {
      console.error('Erro no login', err);
    }
  };

  return (
    <div className="transition duration-300 ease-in data-[closed]:opacity-0 w-full max-w-80">
      <Field label="Username">
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
        />
      </Field>
      <Field label="Password">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
        />
      </Field>
      <Button
        onClick={handleLogin}
        disabled={loading}
        className="inline-flex items-center gap-2 mt-4 rounded-md bg-green-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-800 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        {loading ? 'Loading...' : 'Login'}
      </Button>
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </div>
  );
};

export default LoginForm;