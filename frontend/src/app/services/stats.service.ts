import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor() { }

  getNumbers() {
    const data = [{"name": "Games", "value": 4}, {"name": "Players", "value": 15}, {"name": "Win-% vestless", "value": 40}, {"name": "Win-% vest", "value": 60}];
    return data;
  }

  getTable() {
    const data = [{name: "Juha", games: 3, wins: 1, draws: 1, losses: 1, winPercentage: 33, goals: 10, gpg: 3.3}, {name: "Matti", games: 2, wins: 1, draws: 1, losses: 0, winPercentage: 50, goals: 7, gpg: 3.5}];
    return data;
  }

  getChart() {
    const data = {
      labels: ['Juha', 'Matti', 'Maija'],
      datasets: [
        { data: [33, 50, 40], label: 'Win-%' },
        { data: [10, 7, 4], label: 'Goals' },
        { data: [5, 4, 2], label: 'Goals per Game' },
      ],
    };

    return data;
  }

  getPlayerChart(player: string) {
    const data = {
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
    };

    return data;
  }
}
