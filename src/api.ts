// helpers
import { GAME_TYPES } from './helpers/standing-data';
import { USER_KEY } from './helpers/storage';

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? (JSON.parse(user) as PileOfShame.User) : undefined;
};

export const createUser = () => {
  const newUser: PileOfShame.User = {
    piles: []
  };
  localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  return newUser;
};

export const updateUser = (body: PileOfShame.User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(body));
  return getUser();
};

export const deleteUser = () => {
  localStorage.removeItem(USER_KEY);
  return createUser();
}

export const getPile = (key: string) => {
  const user = getUser();

  if (user) {
    return user.piles.filter((p) => p.key === key)[0];
  }

  return undefined;
};

export const createPile = (key: string) => {
  const user = getUser();
  if (user) {
    return updateUser({
      ...user,
      piles: [
        ...user.piles,
        {
          key,
          game: GAME_TYPES[0].value,
          name: 'New Pile',
          models: [] as PileOfShame.Model[],
          created: new Date().toISOString()
        } as PileOfShame.Pile
      ]
    });
  }

  return undefined;
};

export const updatePile = (key: string, pile: PileOfShame.Pile) => {
  const user = getUser();

  if (user) {
    const existingPiles = user.piles.filter((p) => p.key !== key);
    return updateUser({
      ...user,
      piles: [...existingPiles, { ...pile }]
    });
  }

  return undefined;
};

export const deletePile = (key: string) => {
  const user = getUser();
  if (user) {
    return updateUser({
      ...user,
      piles: user.piles.filter((p) => p.key !== key)
    });
  }

  return undefined;
};

export const getPileModels = (key: string) => {
  const pile = getPile(key);
  return pile ? pile.models : undefined;
};

export const getPileModel = (pileKey: string, key: string) => {
  const models = getPileModels(pileKey);

  if (models) {
    return models.filter((m) => m.key === key)[0];
  }

  return undefined;
};

export const createPileModel = (pileKey: string, model: PileOfShame.Model) => {
  const pile = getPile(pileKey);

  if (pile) {
    return updatePile(pileKey, { ...pile, models: [...pile.models, { ...model }] });
  }

  return undefined;
};

export const updatePileModel = (pileKey: string, model: PileOfShame.Model) => {
  const pile = getPile(pileKey);

  if (pile) {
    const models = pile.models.filter((m) => m.key !== model.key);
    return updatePile(pileKey, { ...pile, models: [...models, { ...model }] });
  }

  return undefined;
};

export const deletePileModel = (pileKey: string, key: string) => {
  const pile = getPile(pileKey);

  if (pile) {
    const models = pile.models.filter((p) => p.key !== key);
    return updatePile(pileKey, { ...pile, models });
  }

  return undefined;
};
