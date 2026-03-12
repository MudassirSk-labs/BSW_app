'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabase } from './supabase';

/**
 * Enhanced Login Logic
 * 1. Checks credentials against .env variables for immediate access (Admin override).
 * 2. Fallback to Supabase Auth if .env match fails (for production scalability).
 */
export async function login(formData: FormData) {
  const user = formData.get('user') as string;
  const pass = formData.get('pass') as string;

  const adminUser = process.env.ADMIN_USER || 'Admin';
  const adminPass = process.env.ADMIN_PASS || '1234';

  // Check against .env credentials first (Fulfills user request to use .env for login)
  if (user === adminUser && pass === adminPass) {
    // Set a secure session cookie
    (await cookies()).set('supabase-auth-token', 'env-session-active', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    redirect('/dashboard/employees');
  }

  // Fallback: Attempt Supabase Auth
  const authEmail = user.includes('@') ? user : `${user}@bsw.com`;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: authEmail,
    password: pass,
  });

  if (error) {
    return { error: 'Invalid login credentials. Please check .env or Supabase dashboard.' };
  }

  if (data.session) {
    (await cookies()).set('supabase-auth-token', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    redirect('/dashboard/employees');
  }

  return { error: 'Unknown authentication error' };
}

export async function logout() {
  (await cookies()).delete('supabase-auth-token');
  redirect('/login');
}
