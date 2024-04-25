import * as UsersType from './users.type';

export type SignInResponse = {
  success: boolean;
  data: {
    accessToken: string;
    user: UsersType.User;
  };
};

export type MeResponse = {
  success: boolean;
  data: UsersType.User;
};
