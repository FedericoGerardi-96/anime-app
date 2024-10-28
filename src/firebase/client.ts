// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import {
  PUBLIC_APIKEY,
  PUBLIC_AUTHDOMAIN,
  PUBLIC_PROJECTID,
  PUBLIC_STORAGEBUCKET,
  PUBLIC_MESSAGINGSENDERID,
  PUBLIC_APPID,
  PUBLIC_MEASUREMENTID,
} from 'astro:env/client';

const firebaseConfig = {
  apiKey: PUBLIC_APIKEY,
  authDomain: PUBLIC_AUTHDOMAIN,
  projectId: PUBLIC_PROJECTID,
  storageBucket: PUBLIC_STORAGEBUCKET,
  messagingSenderId: PUBLIC_MESSAGINGSENDERID,
  appId: PUBLIC_APPID,
  measurementId: PUBLIC_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const firebase = {
  app,
  auth,
};
