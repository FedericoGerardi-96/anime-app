import { firebase } from '@/firebase/client.ts';
import { defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { signInWithEmailAndPassword, type AuthError } from 'firebase/auth';

export const loginUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
    rememberMe: z.boolean().optional(),
  }),
  handler: async ({ password, email, rememberMe }, { cookies }) => {
    if (rememberMe) {
      cookies.set('email', email, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), path: '/' });
    } else {
      cookies.delete('email', {
        path: '/',
      });
    }

    try {
      const { user } = await signInWithEmailAndPassword(firebase.auth, email, password);

      return { success: true };
    } catch (error) {
      const fireBaseError = error as AuthError;
      if (fireBaseError.code === 'auth/invalid-credential') {
        throw new Error('Credenciales incorrectas');
      }
      throw new Error('Error al ingrear al usuario');
    }
  },
});
