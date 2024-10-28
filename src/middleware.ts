import { defineMiddleware } from 'astro:middleware';
import { firebase } from '@/firebase/client.ts';
import { getLangFromUrl } from '@/i18n/utils';

const notAuthenticatedRoute = [`/login`, `/register`];
const privateRoute = [`/`, '', `/anime`, `/manga`, `/search`, `/calendar`, `/favorites`];

export const onRequest = defineMiddleware(({ url, locals, redirect, cookies }, next) => {
  const lang = getLangFromUrl(url) as string;

  const isLoggedIn = !!firebase.auth.currentUser;
  const user = firebase.auth.currentUser;

  let userToSave = {};

  if (user) {
    userToSave = {
      email: user.email!,
      name: user.displayName ?? '',
      avatar: user.photoURL ?? '',
      emailVerified: user.emailVerified,
    };
    if (!cookies.get('userProfile')) cookies.set('userProfile', JSON.stringify(userToSave));
  }

  locals.isLoggedIn = isLoggedIn;

  if (user) {
    locals.user = {
      email: user.email!,
      name: user.displayName ?? '',
      avatar: user.photoURL ?? '',
      emailVerified: user.emailVerified,
    };
  }

  const pathnameWithoutLang = url.pathname.replace(`/${lang ?? 'es'}`, '');

  if (
    (privateRoute.includes(pathnameWithoutLang) ||
      privateRoute.filter((path) => path.startsWith(pathnameWithoutLang)).length === 0) &&
    !isLoggedIn &&
    privateRoute.includes(pathnameWithoutLang)
  ) {
    const redirectUrl = `/${lang ?? 'es'}/login`;
    cookies.delete('userProfile');
    return redirect(redirectUrl);
  }

  if (isLoggedIn && notAuthenticatedRoute.includes(pathnameWithoutLang)) {
    const redirectUrl = `/${lang ?? 'es'}/`;
    return redirect(redirectUrl);
  }

  return next();
});
