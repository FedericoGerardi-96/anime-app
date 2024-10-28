// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  output: 'server',

  adapter: node({
    mode: 'standalone',
  }),

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr'],
    fallback: {
      fr: 'es',
    },
  },
  env: {
    schema: {
      // Firebase Server
      FIREBASE_PRIVATE_KEY_ID: envField.string({ context: 'server', access: 'public', optional: false }),
      FIREBASE_PRIVATE_KEY: envField.string({ context: 'server', access: 'public', optional: false }),
      FIREBASE_PROJECT_ID: envField.string({ context: 'server', access: 'public', optional: false }),
      FIREBASE_CLIENT_EMAIL: envField.string({ context: 'server', access: 'secret', optional: false }),
      FIREBASE_CLIENT_ID: envField.string({ context: 'server', access: 'public', optional: false }),
      FIREBASE_AUTH_URI: envField.string({ context: 'server', access: 'public', optional: false }),
      FIREBASE_TOKEN_URI: envField.string({ context: 'server', access: 'public', optional: false }),
      FIREBASE_AUTH_CERT_URL: envField.string({ context: 'server', access: 'public', optional: false }),
      FIREBASE_CLIENT_CERT_URL: envField.string({ context: 'server', access: 'public', optional: false }),
      PROD: envField.string({ context: 'server', access: 'public', optional: false }),

      JIKAN_API_URL: envField.string({ context: 'server', access: 'public', optional: false }),

      PUBLIC_APIKEY: envField.string({ context: 'client', access: 'public', optional: false }),
      PUBLIC_AUTHDOMAIN: envField.string({ context: 'client', access: 'public', optional: false }),
      PUBLIC_PROJECTID: envField.string({ context: 'client', access: 'public', optional: false }),
      PUBLIC_STORAGEBUCKET: envField.string({ context: 'client', access: 'public', optional: false }),
      PUBLIC_MESSAGINGSENDERID: envField.string({ context: 'client', access: 'public', optional: false }),
      PUBLIC_APPID: envField.string({ context: 'client', access: 'public', optional: false }),
      PUBLIC_MEASUREMENTID: envField.string({ context: 'client', access: 'public', optional: false }),

      URL: envField.string({ context: 'client', access: 'public', optional: false }),
    },
  },
});
