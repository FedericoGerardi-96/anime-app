import { app } from '@/firebase/server';
import { defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { getFirestore } from 'firebase-admin/firestore';
import { doc, getDoc } from 'firebase/firestore';

export const InsertUserFirestoreGoogle = defineAction({
  accept: 'json',
  input: z.any(),
  handler: async (credentials) => {
    try {
      const email = credentials.user.email;
      const name = credentials.user.displayName;
      const photoURL = credentials.user.photoURL;
      if (!email || !name) {
        throw new Error('Email and name are required');
      }

      const db = getFirestore(app);
      const usersRef = db.collection('users');
      const friendSnapshot = await usersRef.where('email', '==', email ?? '').get();

      if (friendSnapshot.empty) {
        await usersRef.add({
          name: name ?? '',
          email: email,
          isAdmin: false,
          createdAt: new Date(),
          icon: photoURL ?? null,
        });
      }

      return { success: true };
    } catch (error) {
      console.log(error);
      return new Response('Algo salió mal', {
        status: 500,
      });
    }
  },
});
