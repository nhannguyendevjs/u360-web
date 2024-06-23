import * as UserTypes from './users.type';

export type SignInPayload= {
  username: string;
  password: string;
};

export type SignInResponse = {
  success: boolean;
  data: {
    accessToken: string;
    user: UserTypes.User;
  };
};

export type MeResponse = {
  success: boolean;
  data: UserTypes.User;
};
