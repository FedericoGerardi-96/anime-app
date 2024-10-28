import { app } from '@/firebase/server';
import { defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { getFirestore } from "firebase-admin/firestore";

export const InsertUserFirestore = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string(),
    email: z.string(),
  }),
  handler: async ({ name, email }) => {
    try {
      const db = getFirestore(app);
      const usersRef = db.collection("users");

      await usersRef.add({
        name: name,
        email: email,
        isAdmin: false,
        createdAt: new Date(),
        icon: null,
      });

      return { success: true };
    } catch (error) {
      console.log(error);
      return new Response('Algo salió mal', {
        status: 500,
      });
    }

    return;
  },
});
