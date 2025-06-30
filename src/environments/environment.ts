import { secretApiKey } from './environment.secret';

export const headers = {
  apikey: secretApiKey,
};

export const authHeaders = {
  apikey: secretApiKey,
  'Content-Type': 'application/json',
};
