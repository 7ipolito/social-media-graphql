'use client'
import React, { useState } from 'react';
import { Button, Input } from '@headlessui/react';
import Fieldset from '../FieldSet';
import Field from '../Field';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '@/graphql/mutations';

const CreateAccountForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [register, { data, loading, error }] = useMutation(CREATE_USER);

  const handleRegister = async () => {
    try {
      const response = await register({
        variables: {
          username,
          password,
          confirmPassword,
          email,
        },
      });

      console.log(response)
      // if (response.data.register.token) {
      //   localStorage.setItem('token', response.data.register.username);
      //   console.log('Conta criada com sucesso', response.data.register.user);
      // }
    } catch (err) {
      console.error( err);
    }
  };

  return (
    <div className="transition duration-300 ease-in data-[closed]:opacity-0 w-full max-w-lg px-4">
      <Fieldset legend="Create an account">
        <Field label="Email" description="Use your better email">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          />
        </Field>
        <Field label="Username" description="Pick a username that represents you">
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
        <Field label="Confirm Password">
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          />
        </Field>

        <Button
          onClick={handleRegister}
          disabled={loading}
          className="inline-flex items-center gap-2 mt-4 rounded-md bg-green-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-800 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
      </Fieldset>
    </div>
  );
};

export default CreateAccountForm;