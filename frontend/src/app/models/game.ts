import { Player } from "./player";

export class Game {
  score?: [number, number];
  players?: Player[];
  startTime?: Date;
  endTime?: Date;
  uploaded?: boolean;
}
