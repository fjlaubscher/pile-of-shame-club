declare namespace PileOfShame {
  interface Model {
    key: string;
    name: string;
    totalOnSprues: number;
    totalAssembled: number;
    totalPrimed: number;
    totalPainted: number;
    totalBased: number;
    notes: string;
    created: string;
  }

  interface Pile {
    key: string;
    name: string;
    game: string;
    models: Model[];
    notes: string;
    created: string;
  }

  interface User {
    piles: Pile[];
  }
}
