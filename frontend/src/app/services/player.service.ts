import { Injectable } from "@angular/core";

import { Player } from "../models/player";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  shuffled: Boolean = false;
  players: Player[] = [];
  playersChange: Subject<Player[]> = new Subject<Player[]>();

  constructor() {}

  setLocalStorage() {
    const currentPlayers = { shuffled: this.shuffled, players: this.players };
    localStorage.setItem("currentPlayers", JSON.stringify(currentPlayers));
    this.playersChange.next(this.players);
  }

  getLocalStorage() {
    const currentPlayers = JSON.parse(localStorage.getItem("currentPlayers"));

    if (currentPlayers) {
      this.shuffled = currentPlayers.shuffled;
      this.players = currentPlayers.players;
    }
  }

  clearLocalStorage() {
    localStorage.removeItem("currentPlayers");
  }

  getPlayers() {
    this.getLocalStorage();
    return this.players;
  }

  addPlayer(player: Player) {
    this.getLocalStorage();

    if (!this.players.filter(p => p.name === player.name).length) {
      if (this.shuffled) {
        const teamOneCount = this.players.filter(p => p.team === 1).length;
        const teamTwoCount = this.players.filter(p => p.team === 2).length;
        let nextTeam = 2;

        if (teamOneCount < teamTwoCount) {
          nextTeam = 1;
        }

        player.team = nextTeam;
      }

      this.players.push(player);
      this.setLocalStorage();
    } else {
      window.alert("Player with the same name already added!");
    }
  }

  deletePlayer(player: Player) {
    this.getLocalStorage();
    this.players = this.players.filter(p => p.name !== player.name);
    this.setLocalStorage();
  }

  getTeam(teamNumber: number) {
    this.getLocalStorage();
    return this.players.filter(p => p.team === teamNumber);
  }

  shuffleTeams() {
    this.getLocalStorage();

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

    this.setLocalStorage();
  }

  setShuffled(shuffled: Boolean) {
    this.shuffled = shuffled;
    this.setLocalStorage();
  }

  isPlayersShuffled() {
    this.getLocalStorage();
    return this.shuffled;
  }

  addGoal(player: Player) {
    this.getLocalStorage();

    let updatedPlayer = player;

    if (updatedPlayer.goals) {
      updatedPlayer.goals += 1;
    } else {
      updatedPlayer.goals = 1;
    }

    const index = this.players.findIndex(e => e.name === updatedPlayer.name);
    this.players[index] = updatedPlayer;

    this.setLocalStorage();
  }

  reset() {
    this.clearLocalStorage();
    this.players = [];
  }
}
