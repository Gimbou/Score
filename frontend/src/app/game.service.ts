import { Injectable } from "@angular/core";

import { Game } from "./game";

@Injectable({
  providedIn: "root"
})
export class GameService {
  game: Game = { score: [0, 0] };

  constructor() {}

  getGame() {
    return this.game;
  }

  addGoal(team: number) {
    this.game.score[team - 1] += 1;
    return this.game;
  }
}
