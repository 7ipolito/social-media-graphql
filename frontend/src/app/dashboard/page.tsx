// pages/index.jsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {

  return (
    <div className="flex flex-col flex-1 items-center w-full h-screen bg-indigo-800">
    <h1 className='text-white'>Welcome to social media graphql</h1>
    </div>
  );
}