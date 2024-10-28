import { firebase } from '@/firebase/client.ts';
import { defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

export const loginWithGoogle = defineAction({
  accept: 'json',
  input: z.any(),
  handler: async (credentials) => {
    const credential = GoogleAuthProvider.credentialFromResult(credentials);

    if (!credential) {
      throw new Error('Google SigIn Fallo');
    }

    await signInWithCredential(firebase.auth, credential);
    return { success: true };
  },
});
