import { environment } from '../environments/environment';

const USER_SERVICE_URL = environment.userServiceUrl + '/api/' + environment.userServiceVersion;

export const APIs = {
  auth: {
    signIn: USER_SERVICE_URL + '/auth/sign-in',
    me: USER_SERVICE_URL + '/auth/me',
  },
  users: {
    search: USER_SERVICE_URL + '/users/search',
  },
};
