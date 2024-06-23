import { environment } from '../environments/environment';

const USERS_SERVICE_URL = environment.usersServiceUrl + '/api/' + environment.usersServiceVersion;

export const APIs = {
  auth: {
    signIn: USERS_SERVICE_URL + '/auth/sign-in',
    me: USERS_SERVICE_URL + '/auth/me',
  },
  users: {
    search: USERS_SERVICE_URL + '/users/search',
  },
};
