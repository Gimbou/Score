import { Component, ViewChild, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-stats-player-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './stats-player-chart.component.html',
  styleUrl: './stats-player-chart.component.scss'
})
export class StatsPlayerChartComponent {
  @Input() data!: ChartData <'line', {name: string, value: number} []>;

  constructor() {}

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
        backgroundColor: 'rgba(255, 102, 0, 0.3)',
        borderColor: 'rgba(255, 102, 0, 1)',
        fill: 'origin',
      },
      point: {
        backgroundColor: 'rgba(255, 102, 0, 1)',
        borderColor: '#fff',
        hoverBackgroundColor: '#fff',
        hoverBorderColor: 'rgba(255, 102, 0, 0.8)',
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
        min: 0,
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}
