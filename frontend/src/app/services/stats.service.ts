import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';

import { PlayerGames, Stat, StatTable } from '../models/stat';
import { Game } from '../models/game';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private games: Game[] = [];
  private numbers: Stat[] = [];
  private table: StatTable[] = [];
  private chart: ChartData<'bar'> = { labels: [], datasets: [] };
  private playersGames: PlayerGames[] = [];

  constructor(private apiService: ApiService) {}

  async generateStats() {
    this.games = [];
    this.numbers = [];
    this.table = [];
    this.chart = { labels: [], datasets: [] };
    this.playersGames = [];

    this.games = await this.apiService.getGames();
    this.numbers.push({ name: 'Games', value: this.games.length });

    let winsVestless = 0;
    let winsVest = 0;
    let winnerTeam = 0;
    let draw = false;

    this.games.forEach((game) => {
      if (game.score && game.score[0] > game.score[1]) {
        winsVestless += 1;
        winnerTeam = 1;
      } else if (game.score && game.score[1] > game.score[0]) {
        winsVest += 1;
        winnerTeam = 2;
      } else {
        draw = true;
      }

      if (game.players) {
        game.players.forEach((player) => {
          let currentPlayer: StatTable = {
            name: player.name,
            games: 1,
            wins: 0,
            draws: 0,
            losses: 0,
            winPercentage: 0,
            goals: 0,
            gpg: 0.0,
          };

          let result = '';

          if (draw) {
            currentPlayer.draws = 1;
            result = 'draw';
          } else if (winnerTeam === player.team) {
            currentPlayer.wins = 1;
            result = 'win';
          } else {
            currentPlayer.losses = 1;
            result = 'loss';
          }

          if (player.goals) {
            currentPlayer.goals = player.goals;
          }

          currentPlayer.winPercentage =
            (currentPlayer.wins / currentPlayer.games) * 100;
          currentPlayer.gpg = currentPlayer.goals / currentPlayer.games;

          const currentPlayerIndex = this.table.findIndex(
            (findPlayer) => findPlayer.name === player.name
          );

          if (currentPlayerIndex !== -1) {
            this.table[currentPlayerIndex].games += currentPlayer.games;
            this.table[currentPlayerIndex].wins += currentPlayer.wins;
            this.table[currentPlayerIndex].draws += currentPlayer.draws;
            this.table[currentPlayerIndex].losses += currentPlayer.losses;
            this.table[currentPlayerIndex].winPercentage =
              (this.table[currentPlayerIndex].wins /
                this.table[currentPlayerIndex].games) *
              100;
            this.table[currentPlayerIndex].goals += currentPlayer.goals;
            this.table[currentPlayerIndex].gpg =
              this.table[currentPlayerIndex].goals /
              this.table[currentPlayerIndex].games;
          } else {
            this.table.push(currentPlayer);
          }

          const currentPlayerGamesIndex = this.playersGames.findIndex(
            (findPlayer) => findPlayer.name === player.name
          );

          if (currentPlayerGamesIndex !== -1) {
            this.playersGames[currentPlayerGamesIndex].results.push(result);
            this.playersGames[currentPlayerGamesIndex].goals.push(
              currentPlayer.goals
            );

            if (game.startTime) {
              const gameDate = new Date(game.startTime);
              this.playersGames[currentPlayerGamesIndex].dates.push(
                gameDate.getDate().toString() +
                  '.' +
                  gameDate.getMonth().toString() +
                  '.' +
                  gameDate.getFullYear().toString()
              );
            }
          } else {
            let currentPlayerGames: PlayerGames = {
              name: player.name,
              results: [],
              goals: [],
              dates: [],
            };

            currentPlayerGames.results.push(result);
            currentPlayerGames.goals.push(currentPlayer.goals);

            if (game.startTime) {
              const gameDate = new Date(game.startTime);
              currentPlayerGames.dates.push(
                gameDate.getDate().toString() +
                  '.' +
                  gameDate.getMonth().toString() +
                  '.' +
                  gameDate.getFullYear().toString()
              );
            }

            this.playersGames.push(currentPlayerGames);
          }
        });
      }
    });

    this.table.sort((a, b) => a.name.localeCompare(b.name));

    this.numbers.push({ name: 'Players', value: this.table.length });
    this.numbers.push({
      name: 'Win-% vestless',
      value: (winsVestless / this.games.length) * 100,
    });
    this.numbers.push({
      name: 'Win-% vest',
      value: (winsVest / this.games.length) * 100,
    });

    this.chart = {
      labels: [],
      datasets: [
        { data: [], label: 'Win-%' },
        { data: [], label: 'Goals' },
        { data: [], label: 'Goals per Game' },
      ],
    };

    this.table.forEach((player) => {
      this.chart.labels?.push(player.name);
      this.chart.datasets[0].data.push(player.winPercentage);
      this.chart.datasets[1].data.push(player.goals);
      this.chart.datasets[2].data.push(player.gpg);
    });
  }

  getNumbers() {
    /* const data = [
      { name: 'Games', value: 4 },
      { name: 'Players', value: 15 },
      { name: 'Win-% vestless', value: 40 },
      { name: 'Win-% vest', value: 60 },
    ]; */
    return this.numbers;
  }

  getTable() {
    /* const data = [
      {
        name: 'Juha',
        games: 3,
        wins: 1,
        draws: 1,
        losses: 1,
        winPercentage: 33,
        goals: 10,
        gpg: 3.3,
      },
      {
        name: 'Matti',
        games: 2,
        wins: 1,
        draws: 1,
        losses: 0,
        winPercentage: 50,
        goals: 7,
        gpg: 3.5,
      },
    ]; */
    return this.table;
  }

  getChart() {
    /* const data = {
      labels: ['Juha', 'Matti', 'Maija'],
      datasets: [
        { data: [33, 50, 40], label: 'Win-%' },
        { data: [10, 7, 4], label: 'Goals' },
        { data: [5, 4, 2], label: 'Goals per Game' },
      ],
    }; */

    return this.chart;
  }

  getPlayerChart(player: string) {
    /* const data = {
      datasets: [
        {
          data: [3, 10, 7, 1],
          label: 'Juha',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
      ],
      labels: ['01.02.2024', '08.02.2024', '15.02.2024', '22.02.2024'],
    }; */

    let playerGames: ChartConfiguration['data'] = { datasets: [], labels: [] };

    const playerGamesIndex = this.playersGames.findIndex(
      (findPlayer) => findPlayer.name === player
    );

    if (playerGamesIndex !== -1) {
      const playerData = {
        data: this.playersGames[playerGamesIndex].goals,
        label: player,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      };

      playerGames.datasets.push(playerData);
      playerGames.labels = this.playersGames[playerGamesIndex].dates;
    }

    return playerGames;
  }
}
