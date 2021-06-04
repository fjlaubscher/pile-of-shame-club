export const getStats = (piles: PileOfShame.Pile[]): Stats => {
  let total = 0;
  let totalOnSprues = 0;
  let totalAssembled = 0;
  let totalPrimed = 0;
  let totalPainted = 0;
  let totalBased = 0;

  for (let i = 0; i < piles.length; i++) {
    for (let j = 0; j < piles[i].models.length; j++) {
      const model = piles[i].models[j];
      totalOnSprues += model.totalOnSprues;
      totalAssembled += model.totalAssembled;
      totalPrimed += model.totalPrimed;
      totalPainted += model.totalPainted;
      totalBased += model.totalBased;

      total +=
        model.totalOnSprues +
        model.totalAssembled +
        model.totalPrimed +
        model.totalPainted +
        model.totalBased;
    }
  }

  return {
    total,
    totalOnSprues,
    totalAssembled,
    totalPrimed,
    totalPainted,
    totalBased
  };
};
