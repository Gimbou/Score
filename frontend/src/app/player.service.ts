import { Injectable } from "@angular/core";

import { Player } from "./player";

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  players: Player[] = [];

  constructor() {}

  getPlayers() {
    return this.players;
  }

  addPlayer(player: Player) {
    this.players.push(player);
    return this.players;
  }

  deletePlayer(player: Player) {
    this.players = this.players.filter(p => p !== player);
    return this.players;
  }

  getTeam(teamNumber: number) {
    return this.players.filter(p => p.team === teamNumber);
  }

  shuffleTeams() {
    let currentIndex = this.players.length;
    let teamNumber = 2;

    // While there remain elements to shuffle
    while (0 !== currentIndex) {
      // Pick a remaining element
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element
      let temporaryValue = this.players[currentIndex];
      this.players[currentIndex] = this.players[randomIndex];
      this.players[randomIndex] = temporaryValue;

      // Assign team to player
      this.players[currentIndex].team = teamNumber;
      if (teamNumber === 1) {
        teamNumber = 2;
      } else {
        teamNumber = 1;
      }
    }

    return this.players;
  }
}
