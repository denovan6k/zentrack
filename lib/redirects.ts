import { NextResponse } from 'next/server';

export function redirectToDashboard(request: Request) {
  const url = new URL('/dashboard', request.url); // or use '/' for home
  return NextResponse.redirect(url);
}