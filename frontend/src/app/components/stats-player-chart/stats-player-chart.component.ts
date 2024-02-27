import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { StatPlayer } from '../../models/stat';

@Component({
  selector: 'app-stats-player-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './stats-player-chart.component.html',
  styleUrl: './stats-player-chart.component.scss'
})
export class StatsPlayerChartComponent {
  @Input() data: StatPlayer[] = [];

  // Chart settings
  view: [number, number] = [700, 400];

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = '';
  yAxisLabel: string = 'Goals';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {}

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
