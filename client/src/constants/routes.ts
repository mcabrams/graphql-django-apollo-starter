import { env } from '@src/lib/env';

export const ROUTES = {
  findDoppelganger: '/find-doppelganger',
  home: '/',
  login: '/login',
  signup: '/signup',
  'user-list': '/users',
  csrftoken: `${env('API_SERVER_URL')}/admin`,
  quiz: '/quiz',
};
