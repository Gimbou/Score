export class Stat {
  name: string = '';
  value: number = 0;
}

export class StatString {
  name: string = '';
  value: string = '';
}

export class StatTable {
  name: string = '';
  games: number = 0;
  wins: number = 0;
  draws: number = 0;
  losses: number = 0;
  winPercentage: number = 0;
  goals: number = 0;
  gpg: number = 0.0;
}

export class StatPlayerGame {
  name: string = '';
  goals: number = 0;
  result: string = '';
}

export class StatPlayerGames {
  name: string = '';
  games: StatPlayerGame[] = [];
}

export enum StatChartType {
  WinPercentage = 'Win-%',
  Goals = 'Goals',
  GoalsPerGame = 'Goals Per Game'
}
