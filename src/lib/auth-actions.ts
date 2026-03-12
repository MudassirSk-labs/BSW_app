'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const user = formData.get('user');
  const pass = formData.get('pass');

  if (user === 'Admin' && pass === '1234') {
    (await cookies()).set('auth_token', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    redirect('/dashboard/employees');
  }
  
  return { error: 'Invalid credentials' };
}

export async function logout() {
  (await cookies()).delete('auth_token');
  redirect('/login');
}
