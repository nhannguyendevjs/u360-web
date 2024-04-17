import { environment } from './environments/environment';

export const GlobalSettings = {
  production: environment.production,
  version: environment.version,
  userServiceUrl: 'http://localhost:8080',
  userServiceVersion: environment.userServiceVersion,
  startupUrl: environment.startupUrl,
  language: environment.language,
} as const;
