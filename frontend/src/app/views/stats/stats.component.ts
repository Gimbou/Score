import { Component } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { StatsService } from '../../services/stats.service';
import { Stat, StatTable } from '../../models/stat';

import { StatsNumbersComponent } from '../../../../src/app/components/stats-numbers/stats-numbers.component';
import { StatsTableComponent } from '../../../../src/app/components/stats-table/stats-table.component';
import { StatsChartComponent } from '../../../../src/app/components/stats-chart/stats-chart.component';
import { StatsPlayerChartComponent } from '../../../../src/app/components/stats-player-chart/stats-player-chart.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [FontAwesomeModule, StatsNumbersComponent, StatsTableComponent, StatsChartComponent, StatsPlayerChartComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  numbersData: Stat[];
  tableData: StatTable[];
  chartData: ChartData<'bar'>;
  playerData: ChartConfiguration['data'];

  faXmark = faXmark;

  typeWinPercentage: string = 'Win-%';
  typeGoals: string = 'Goals';
  typeGPG: string = 'Goals Per Game';

  constructor(private statsService: StatsService) {
    this.numbersData = statsService.getNumbers();
    this.tableData = statsService.getTable();
    this.chartData = statsService.getChart();
    this.playerData = statsService.getPlayerChart('Juha');
  }
}
