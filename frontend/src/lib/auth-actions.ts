'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BACKEND_URL = 'http://127.0.0.1:5001/api';

/**
 * Login via Backend API Proxy
 */
export async function login(formData: FormData) {
  const user = formData.get('user') as string;
  const pass = formData.get('pass') as string;

  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Login failed' };
    }

    if (data.token) {
      (await cookies()).set('supabase-auth-token', data.token, {
        httpOnly: true,
        secure: false, // Local dev, change if deploying
        sameSite: 'lax',
        path: '/',
      });
      redirect('/dashboard/employees');
    }

    return { error: 'Unknown authentication error' };
  } catch (err: any) {
    return { error: 'Backend server is unreachable' };
  }
}

export async function logout() {
  (await cookies()).delete('supabase-auth-token');
  redirect('/login');
}
