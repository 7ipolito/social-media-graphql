// components/CreateLoginFieldSet.jsx
import React from 'react';
import { Button, Input, Select, Textarea } from '@headlessui/react';
import Fieldset from '../FieldSet';
import Field from '../Field';


const CreateLoginFieldSet = () => (
  <Fieldset legend="Create an account">
    <Field label="Email" description="Use your better email">
      <Input
        className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
      />
    </Field>
    <Field label="Username" description="Pick a username that represents you">
      <Input
        className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
      />
    </Field>

    <Field label="Password" >
      <Input
        type='password'
        className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
      />
    </Field>

    <Field label="Confirm Password" >
      <Input
        className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
      />
    </Field>
    
    <Button className="inline-flex items-center gap-2 mt-4 rounded-md bg-green-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-800 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
      Create account
    </Button>
  </Fieldset>
);

export default CreateLoginFieldSet;