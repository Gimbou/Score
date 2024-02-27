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
    const data = [{name: "Juha", games: 3, wins: 1, draws: 1, losses: 1, winPercentage: 33, goals: 10, gpg: 3.3}, {name: "Anssi", games: 2, wins: 1, draws: 1, losses: 0, winPercentage: 50, goals: 7, gpg: 3.5}];
    return data;
  }

  getChart(type: string) {
    let data;

    if (type === 'winPercentage') {
      data = [{"name": "Juha", "value": 33}, {"name": "Anssi", "value": 50}];
    } else if (type === 'goal') {
      data = [{"name": "Juha", "value": 10}, {"name": "Anssi", "value": 7}];
    } else if (type === 'goalsPerGame') {
      data = [{"name": "Juha", "value": 3.3}, {"name": "Anssi", "value": 3.5}];
    }

    return data!;
  }

  getPlayerChart(player: string) {
    const data = [{"name": "Juha", "series": [{"name": "2024-02-01", "value": 3}, {"name": "2024-02-08", "value": 2}]}];
    return data;
  }
}
