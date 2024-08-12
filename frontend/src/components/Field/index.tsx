// components/Field.jsx
import React, { ReactNode } from 'react';
import { Field as HeadlessField, Label, Description } from '@headlessui/react';

interface FieldProps{
  label:string;
  description?:string;
  children:ReactNode
}

const Field = ({ label, description, children }:FieldProps) => (
  <HeadlessField>
    <Label className="text-sm/6 font-medium text-white">{label}</Label>
    <Description className="text-sm/6 text-white/50">{description}</Description>
    {children}
  </HeadlessField>
);

export default Field;