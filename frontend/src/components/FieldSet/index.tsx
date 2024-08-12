import React, { ReactNode } from 'react';
import { Fieldset as HeadlessFieldset, Legend } from '@headlessui/react';

interface FieldSetProps{
  legend:string;
  children:ReactNode
}


const Fieldset = ({ legend, children }:FieldSetProps) => (
  <HeadlessFieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
    <Legend className="text-base/7 font-semibold text-white">{legend}</Legend>
    {children}
  </HeadlessFieldset>
);

export default Fieldset;