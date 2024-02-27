import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Sort, MatSortModule } from '@angular/material/sort';

import { StatTable } from '../../models/stat';

@Component({
  selector: 'app-stats-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './stats-table.component.html',
  styleUrl: './stats-table.component.scss'
})
export class StatsTableComponent implements OnInit {
  @Input() data: StatTable[] = [];
  sortedData: StatTable[] = [];

  constructor() {
    this.sortedData = this.data.slice();
  }

  ngOnInit() {
    this.sortedData = this.data.slice();
  }

  sortData(sort: Sort) {
    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'games':
          return this.compare(a.games, b.games, isAsc);
        case 'wins':
          return this.compare(a.wins, b.wins, isAsc);
        case 'draws':
          return this.compare(a.draws, b.draws, isAsc);
        case 'losses':
          return this.compare(a.losses, b.losses, isAsc);
        case 'winPercentage':
          return this.compare(a.winPercentage, b.winPercentage, isAsc);
        case 'goals':
          return this.compare(a.goals, b.goals, isAsc);
        case 'gpg':
          return this.compare(a.gpg, b.gpg, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
