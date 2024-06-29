import { environment } from '../environments/environment';

export const GlobalSettings = {
  production: environment.production,
  logLevel: environment.logLevel,
  version: environment.version,
  usersServiceUrl: environment.usersServiceUrl,
  usersServiceVersion: environment.usersServiceVersion,
  tasksServiceUrl: environment.tasksServiceUrl,
  tasksServiceVersion: environment.tasksServiceVersion,
  startupUrl: environment.startupUrl,
  language: environment.language,
} as const;
