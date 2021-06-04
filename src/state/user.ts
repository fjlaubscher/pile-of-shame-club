import { atom } from 'recoil';

export const UserAtom = atom<PileOfShame.User | null>({
  key: 'user',
  default: null
});
