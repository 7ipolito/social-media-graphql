// app/api/logout/route.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // Apaga o cookie 'qid'
  cookies().delete('qid');

  // Responde com uma mensagem de sucesso
  return NextResponse.json({ message: 'Logged out' });
}