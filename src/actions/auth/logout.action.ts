import { firebase } from '@/firebase/client.ts';
import { defineAction } from 'astro:actions';
import { signOut } from 'firebase/auth';

export const logout = defineAction({
  accept: 'json',
  handler: async (_, { cookies }) => {
    cookies.delete('userProfile');
    return await signOut(firebase.auth);
  },
});
