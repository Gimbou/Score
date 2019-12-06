import { Injectable } from "@angular/core";

import { Player } from "../models/player";
import { Goal } from "../models/goal";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  shuffled: boolean = false;
  nextGoalId: number = 1;
  players: Player[] = [];
  playersChange: Subject<Player[]> = new Subject<Player[]>();

  constructor() {}

  setLocalStorage() {
    const currentPlayers = {
      shuffled: this.shuffled,
      nextGoalId: this.nextGoalId,
      players: this.players
    };
    localStorage.setItem("currentPlayers", JSON.stringify(currentPlayers));
    this.playersChange.next(this.players);
  }

  getLocalStorage() {
    const currentPlayers = JSON.parse(localStorage.getItem("currentPlayers"));

    if (currentPlayers) {
      this.shuffled = currentPlayers.shuffled;
      this.nextGoalId = currentPlayers.nextGoalId;
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
        let nextTeam = 1;

        if (teamOneCount > teamTwoCount) {
          nextTeam = 2;
        }

        player.team = nextTeam;
      }

      player.goals = 0;
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
    let teamNumber = 1;

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

  setShuffled(shuffled: boolean) {
    this.shuffled = shuffled;
    this.setLocalStorage();
  }

  isPlayersShuffled() {
    this.getLocalStorage();
    return this.shuffled;
  }

  addGoal(player: Player) {
    this.getLocalStorage();

    let updatedPlayer: Player = player;
    updatedPlayer.goals += 1;

    if (!updatedPlayer.goalsTime) {
      updatedPlayer.goalsTime = [{ id: this.nextGoalId, time: new Date() }];
    } else {
      updatedPlayer.goalsTime.push({ id: this.nextGoalId, time: new Date() });
    }

    this.nextGoalId += 1;

    const index = this.players.findIndex(e => e.name === updatedPlayer.name);
    this.players[index] = updatedPlayer;

    this.setLocalStorage();
  }

  deleteGoal(id: number) {
    this.getLocalStorage();

    this.players.forEach(p => {
      if (p.goalsTime) {
        const index = p.goalsTime.findIndex(e => e.id === id);
        if (index > -1) {
          const playerIndex = this.players.indexOf(p);
          p.goalsTime.splice(index, 1);
          this.players[playerIndex].goalsTime = p.goalsTime;
          this.players[playerIndex].goals -= 1;
        }
      }
    });

    this.setLocalStorage();
  }

  getGoals() {
    this.getLocalStorage();
    let goals: [Goal];
    let appendedGoalsTime: Goal;

    if (this.players) {
      this.players.forEach(p => {
        if (p.goalsTime) {
          p.goalsTime.forEach(g => {
            appendedGoalsTime = {
              id: g.id,
              time: g.time,
              name: p.name,
              team: p.team
            };
            if (!goals) {
              goals = [appendedGoalsTime];
            } else {
              goals.push(appendedGoalsTime);
            }
          });
        }
      });
      if (goals) {
        goals.sort((a, b) => (a.id < b.id ? 1 : b.id < a.id ? -1 : 0));
      }
    }

    return goals;
  }

  reset() {
    this.clearLocalStorage();
    this.shuffled = false;
    this.players = [];
  }
}
