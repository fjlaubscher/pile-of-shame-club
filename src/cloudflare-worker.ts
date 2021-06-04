import Fetch from './helpers/fetch';

export const getUserDataAsync = (key: string) =>
  Fetch<PileOfShame.User>(`/api/${key}`, { method: 'GET' });

export const uploadUserDataAsync = (key: string, body: PileOfShame.User) =>
  Fetch<PileOfShame.User>(`/api/${key}`, { method: 'POST', body });
