import { firebase } from '@/firebase/client.ts';
import { defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { createUserWithEmailAndPassword, updateProfile, type AuthError } from 'firebase/auth';

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    rememberMe: z.boolean().optional(),
  }),
  handler: async ({ name, password, email, rememberMe }, { cookies }) => {
    if (rememberMe) {
      cookies.set('email', email, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), path: '/' });
    } else {
      cookies.delete('email', {
        path: '/',
      });
    }

    try {
      const { user } = await createUserWithEmailAndPassword(firebase.auth, email, password);

      const userData = firebase.auth.currentUser;

      if (!userData) {
        throw new Error('Error al crear el usuario');
      }

      updateProfile(userData, {
        displayName: name,
      });

      return { success: true };
    } catch (error) {
      const fireBaseError = error as AuthError;

      if (fireBaseError.code === 'auth/email-already-in-use') {
        throw new Error('El email ya está en uso');
      }
      throw new Error('Error al crear el usuario');
    }
  },
});
