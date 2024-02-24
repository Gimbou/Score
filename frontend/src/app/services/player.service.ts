import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { Player } from '../models/player';
import { Goal } from '../models/goal';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private shuffled: boolean = false;
  private nextGoalId: number = 1;
  private players: Player[] = [];
  private playerList: Player[] = [];
  playersChange: Subject<Player[]> = new Subject<Player[]>();

  constructor() {}

  setLocalStorage() {
    const currentPlayers = {
      shuffled: this.shuffled,
      nextGoalId: this.nextGoalId,
      players: this.players,
    };
    localStorage.setItem('currentPlayers', JSON.stringify(currentPlayers));
    localStorage.setItem('playerList', JSON.stringify(this.playerList));
    this.playersChange.next(this.players);
  }

  getLocalStorage() {
    const currentPlayers = JSON.parse(
      localStorage.getItem('currentPlayers') as string
    );

    if (currentPlayers && Object.keys(currentPlayers).length) {
      this.shuffled = currentPlayers.shuffled;
      this.nextGoalId = currentPlayers.nextGoalId;
      this.players = currentPlayers.players;
    }

    const playerList = JSON.parse(localStorage.getItem('playerList') as string);

    if (playerList && playerList.length) {
      this.playerList = playerList;
    }
  }

  clearLocalStorage() {
    localStorage.removeItem('currentPlayers');
    localStorage.removeItem('playerList');
  }

  getPlayers() {
    this.getLocalStorage();

    if (this.shuffled && this.players.length < 2) {
      this.setShuffled(false);
    }

    return this.players || [];
  }

  getPlayerList() {
    this.getLocalStorage();
    return this.playerList || [];
  }

  addPlayer(player: Player) {
    this.getLocalStorage();

    if (
      this.players &&
      this.players.filter((p) => p.name === player.name).length
    ) {
      Swal.fire({
        title: 'Adding failed',
        text: 'Player with the same name already added!',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Return',
        reverseButtons: true,
      });
      return;
    }

    if (this.shuffled) {
      const teamOneCount = this.players.filter((p) => p.team === 1).length;
      const teamTwoCount = this.players.filter((p) => p.team === 2).length;
      let nextTeam = 1;

      if (teamOneCount > teamTwoCount) {
        nextTeam = 2;
      }

      player.team = nextTeam;
    }

    player.goals = 0;
    this.players.push(player);
    this.playerList = this.playerList.filter((p) => p.name !== player.name);
    this.setLocalStorage();
  }

  togglePlayerSelect(player: Player, deleteExtras: boolean = false) {
    this.getLocalStorage();

    const playerIndex = this.players.findIndex(
      (playerObj) => playerObj.name === player.name
    );

    if (player.selected) {
      this.players[playerIndex].selected = false;
      this.players[playerIndex].team = 0;
    } else {
      this.players[playerIndex].selected = true;
    }

    if (deleteExtras) {
      this.deleteExtraPlayers();
    }

    this.setLocalStorage();
  }

  deleteExtraPlayers() {
    const unselectedPlayers = this.players.filter((p) => !p.selected);

    this.playerList.push(...unselectedPlayers);

    this.players = this.players.filter((p) => p.selected);

    if (this.shuffled && this.players.length < 2) {
      this.setShuffled(false);
    }
  }

  getTeam(teamNumber: number) {
    this.getLocalStorage();
    const teamPlayers = this.players
    ? this.players.filter((p) => p.team === teamNumber)
    : [];

    if (this.shuffled && !teamPlayers.length) {
      this.setShuffled(false);
    }

    return teamPlayers;
  }

  shuffleTeams() {
    this.getLocalStorage();

    this.deleteExtraPlayers();

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
    if (updatedPlayer.goals !== undefined) {
      updatedPlayer.goals += 1;
    }

    if (!updatedPlayer.goalsTime) {
      updatedPlayer.goalsTime = [{ id: this.nextGoalId, time: new Date() }];
    } else {
      updatedPlayer.goalsTime.push({ id: this.nextGoalId, time: new Date() });
    }

    this.nextGoalId += 1;

    const index = this.players.findIndex((e) => e.name === updatedPlayer.name);
    this.players[index] = updatedPlayer;

    this.setLocalStorage();
  }

  deleteGoal(id: number) {
    this.getLocalStorage();

    this.players.forEach((p) => {
      if (p.goalsTime) {
        const index = p.goalsTime.findIndex((e) => e.id === id);
        if (index > -1) {
          const playerIndex = this.players.indexOf(p);
          p.goalsTime.splice(index, 1);
          this.players[playerIndex].goalsTime = p.goalsTime;
          this.players[playerIndex].goals! -= 1;
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
      this.players.forEach((p) => {
        if (p.goalsTime) {
          p.goalsTime.forEach((g) => {
            appendedGoalsTime = {
              id: g.id,
              time: g.time,
              name: p.name,
              team: p.team,
            };
            if (!goals) {
              goals = [appendedGoalsTime];
            } else {
              goals.push(appendedGoalsTime);
            }
          });
        }
      });
      if (goals!) {
        goals.sort((a, b) => (a.id! < b.id! ? 1 : b.id! < a.id! ? -1 : 0));
      }
    }

    return goals!;
  }

  reset() {
    this.clearLocalStorage();
    this.shuffled = false;
    this.players = [];
    this.playerList = [];
    this.playersChange.next(this.players);
  }
}
