import { LOG_LEVEL } from '../utils/log/log.service';

export const environment = {
  production: true,
  logLevel: LOG_LEVEL.info,
  version: '0.0.0',
  usersServiceUrl: 'http://localhost:8080',
  usersServiceVersion: 'v1',
  tasksServiceUrl: 'http://localhost:8080',
  tasksServiceVersion: 'v1',
  startupUrl: '/home',
  language: 'en',
} as const;
