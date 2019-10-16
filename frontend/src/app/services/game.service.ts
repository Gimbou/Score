import { Injectable } from "@angular/core";

import { Game } from "../models/game";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GameService {
  game: Game = { score: [0, 0] };
  gameChange: Subject<Game> = new Subject<Game>();

  constructor() {}

  setLocalStorage() {
    localStorage.setItem("currentGame", JSON.stringify(this.game));
    this.gameChange.next(this.game);
  }

  getLocalStorage() {
    const currentGame = JSON.parse(localStorage.getItem("currentGame"));

    if (currentGame) {
      this.game = currentGame;
    }
  }

  clearLocalStorage() {
    localStorage.removeItem("currentGame");
  }

  getGame() {
    this.getLocalStorage();
    return this.game;
  }

  startGame() {
    this.getLocalStorage();
    if (!this.isGameStarted()) {
      this.game.startTime = new Date();
      this.setLocalStorage();
    }
  }

  isGameStarted() {
    this.getLocalStorage();

    if (this.game.startTime) {
      return true;
    } else {
      return false;
    }
  }

  endGame() {
    this.getLocalStorage();
    if (!this.isGameEnded()) {
      this.game.endTime = new Date();
      this.setLocalStorage();
    }
  }

  isGameEnded() {
    this.getLocalStorage();

    if (this.game.endTime) {
      return true;
    } else {
      return false;
    }
  }

  addGoal(team: number) {
    this.game.score[team - 1] += 1;
    this.setLocalStorage();

    return this.game;
  }

  reset() {
    this.clearLocalStorage();
    this.game = { score: [0, 0] };
  }
}
