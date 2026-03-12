'use server';

import { supabase } from './supabase';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Authentic Login using Supabase Auth
 * Note: The user must exist in the Supabase project first.
 */
export async function login(formData: FormData) {
  const email = formData.get('user') as string;
  const password = formData.get('pass') as string;

  // Supabase Auth expects an email. If the user provided "admin", 
  // we'll assume they meant "admin@example.com" or similar if they haven't set up real emails.
  // For production-grade, the user should provide a real email.
  const authEmail = email.includes('@') ? email : `${email}@bsw.com`;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: authEmail,
    password: password,
  });

  if (error) {
    return { error: error.message };
  }

  // Set the token in cookies for the middleware to see
  (await cookies()).set('supabase-auth-token', data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  redirect('/dashboard/employees');
}

export async function logout() {
  await supabase.auth.signOut();
  (await cookies()).delete('supabase-auth-token');
  redirect('/login');
}
