import { Injectable } from '@angular/core';
import { ChartData, ScriptableContext } from 'chart.js';

import {
  StatPlayerGames,
  Stat,
  StatTable,
  StatGame,
  StatChartType,
  StatPlayerGame,
} from '../models/stat';
import { Game } from '../models/game';
import { ApiService } from './api.service';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private games: Game[] = [];
  private numbers: Stat[] = [];
  private playersTable: StatTable[] = [];
  private gamesTable: StatGame[] = [];
  private chart: ChartData<'bar'> = { labels: [], datasets: [] };
  private playersGames: StatPlayerGames[] = [];

  constructor(private apiService: ApiService) {}

  async getAllGames() {
    this.games = await this.apiService.getGames();
  }

  async generateStats(filterStartDate?: Date, filterEndDate?: Date) {
    let filteredGames: Game[] = [];
    this.numbers = [];
    this.playersTable = [];
    this.gamesTable = [];
    this.chart = { labels: [], datasets: [] };
    this.playersGames = [];

    if (!this.games.length) {
      await this.getAllGames();
    }

    if (filterStartDate && !filterEndDate) {
      filteredGames = this.games.filter((game) => game.startTime ? new Date(game.startTime).getTime() > filterStartDate.getTime() : 0);
    } else if (filterStartDate && filterEndDate) {
      filterEndDate.setDate(filterEndDate.getDate() + 1);
      filteredGames = this.games.filter((game) => game.startTime ? new Date(game.startTime).getTime() > filterStartDate.getTime() && new Date(game.startTime).getTime() < filterEndDate.getTime() : 0);
    } else {
      filteredGames = this.games;
    }
    
    this.numbers.push({ name: 'Games', value: filteredGames.length });

    let winsVestless = 0;
    let winsVest = 0;

    filteredGames.forEach((game) => {
      let winnerTeam = 0;
      let draw = false;
      
      if (game.score && game.score[0] > game.score[1]) {
        winsVestless += 1;
        winnerTeam = 1;
      } else if (game.score && game.score[1] > game.score[0]) {
        winsVest += 1;
        winnerTeam = 2;
      } else {
        draw = true;
      }

      const gameDate = new Date(game.startTime!);
      const gameDateString =
        gameDate.getDate().toString() +
        '.' +
        (gameDate.getMonth()+1).toString() +
        '.' +
        gameDate.getFullYear().toString();

      this.gamesTable.push({
        date: gameDate,
        vestlessScore: game.score && game.score[0] !== undefined ? game.score[0] : 0,
        vestScore: game.score && game.score[1] !== undefined ? game.score[1] : 0,
        playersCount: game.players ? game.players.length : 0,
        players: game.players ? game.players : [],
      });

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

          currentPlayer.winPercentage = Math.round(
            (currentPlayer.wins / currentPlayer.games) * 100
          );
          currentPlayer.gpg = Number(
            (currentPlayer.goals / currentPlayer.games).toFixed(1)
          );

          // Table

          const currentPlayerIndex = this.playersTable.findIndex(
            (findPlayer) => findPlayer.name === player.name
          );

          if (currentPlayerIndex !== -1) {
            this.playersTable[currentPlayerIndex].games += currentPlayer.games;
            this.playersTable[currentPlayerIndex].wins += currentPlayer.wins;
            this.playersTable[currentPlayerIndex].draws += currentPlayer.draws;
            this.playersTable[currentPlayerIndex].losses +=
              currentPlayer.losses;
            this.playersTable[currentPlayerIndex].winPercentage = Math.round(
              (this.playersTable[currentPlayerIndex].wins /
                this.playersTable[currentPlayerIndex].games) *
                100
            );
            this.playersTable[currentPlayerIndex].goals += currentPlayer.goals;
            this.playersTable[currentPlayerIndex].gpg = Number(
              (
                this.playersTable[currentPlayerIndex].goals /
                this.playersTable[currentPlayerIndex].games
              ).toFixed(1)
            );
          } else {
            this.playersTable.push(currentPlayer);
          }

          // Line chart

          const currentPlayerGamesIndex = this.playersGames.findIndex(
            (findPlayer) => findPlayer.name === player.name
          );

          if (currentPlayerGamesIndex !== -1) {
            this.playersGames[currentPlayerGamesIndex].games.push({
              name: gameDateString,
              goals: currentPlayer.goals,
              result: result,
            });
          } else {
            let currentPlayerGames: StatPlayerGames = {
              name: player.name,
              games: [],
            };

            currentPlayerGames.games.push({
              name: gameDateString,
              goals: currentPlayer.goals,
              result: result,
            });

            this.playersGames.push(currentPlayerGames);
          }
        });
      }
    });

    this.playersTable.sort((a, b) => a.name.localeCompare(b.name));

    this.numbers.push({ name: 'Players', value: this.playersTable.length });
    this.numbers.push({
      name: 'Vestless wins',
      value: Math.round((winsVestless / filteredGames.length) * 100),
    });
    this.numbers.push({
      name: 'Vest wins',
      value: Math.round((winsVest / filteredGames.length) * 100),
    });

    this.chart = {
      labels: [],
      datasets: [
        { data: [], label: StatChartType.WinPercentage },
        { data: [], label: StatChartType.Goals },
        { data: [], label: StatChartType.GoalsPerGame },
      ],
    };

    this.playersTable.forEach((player) => {
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
    return this.playersTable;
  }

  getGames() {
    /* const data = [
      {
        date: new Date,
        vestlessScore: 1,
        vestScore: 1,
        playersCount: 5,
      }
    ]; */

    return this.gamesTable;
  }

  getGame(games: Date[]) {
    let gameData: Player[] = [];

    games.forEach((game) => {
      const gameIndex = this.gamesTable.findIndex(
        (findGame) => findGame.date === game
      );

      if (gameIndex !== -1) {
        gameData = this.gamesTable[gameIndex].players;
      }
    });

    return gameData;
  }

  getChart(type: string) {
    /* const data = {
      labels: ['Juha', 'Matti', 'Maija'],
      datasets: [
        { data: [33, 50, 40], label: 'Win-%' },
        { data: [10, 7, 4], label: 'Goals' },
        { data: [5, 4, 2], label: 'Goals per Game' },
      ],
    }; */

    let chartData: ChartData<'bar'> = {
      labels: this.chart.labels,
      datasets: [],
    };

    if (type === StatChartType.WinPercentage) {
      chartData.datasets = this.chart.datasets.filter(
        (data) => data.label === StatChartType.WinPercentage
      );
    } else if (type === StatChartType.Goals) {
      chartData.datasets = this.chart.datasets.filter(
        (data) => data.label === StatChartType.Goals
      );
    } else if (type === StatChartType.GoalsPerGame) {
      chartData.datasets = this.chart.datasets.filter(
        (data) => data.label === StatChartType.GoalsPerGame
      );
    }

    return chartData;
  }

  getPlayerChart(players: string[]) {
    /* const data: ChartData <'line', {name: string, value: number} []> = {
      datasets: [
        {
          data: [{name:'01.02.2024', value:3}, {name:'08.02.2024', value:10}, {name:'15.02.2024', value:7}, {name:'22.02.2024', value:1}],
          parsing: {
            xAxisKey: 'name',
            yAxisKey: 'value'
          },
          label: 'Juha',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
      ]
    }; */

    let playerGames: ChartData<
      'line',
      { name: string; goals: number; result: string }[]
    > = {
      datasets: [],
    };

    players.forEach((player) => {
      const playerGamesIndex = this.playersGames.findIndex(
        (findPlayer) => findPlayer.name === player
      );

      if (playerGamesIndex !== -1) {
        const playerData = {
          data: this.playersGames[playerGamesIndex].games,
          parsing: {
            xAxisKey: 'name',
            yAxisKey: 'goals',
          },
          pointBackgroundColor: (context: ScriptableContext<'line'>) => {
            const index = context.dataIndex;
            const value = context.dataset.data[index] as unknown;
            const valueObject = value as StatPlayerGame;

            return valueObject.result === 'win'
              ? 'green'
              : valueObject.result === 'loss'
              ? 'red'
              : 'yellow';
          },
          pointBorderColor: (context: ScriptableContext<'line'>) => {
            const index = context.dataIndex;
            const value = context.dataset.data[index] as unknown;
            const valueObject = value as StatPlayerGame;

            return valueObject.result === 'win'
              ? 'green'
              : valueObject.result === 'loss'
              ? 'red'
              : 'yellow';
          },
          labelColor: 'red',
          label: player,
        };

        playerGames.datasets.push(playerData);
      }
    });

    return playerGames;
  }
}
