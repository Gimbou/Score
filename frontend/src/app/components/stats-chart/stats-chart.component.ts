import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { Stat } from '../../models/stat';

@Component({
  selector: 'app-stats-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './stats-chart.component.html',
  styleUrl: './stats-chart.component.scss'
})
export class StatsChartComponent implements OnInit {
  @Input() data: Stat[] = [];
  @Input() type: string = '';

  // Chart settings
  view: [number, number] = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel: string = '';
  showYAxisLabel = true;
  yAxisLabel = '';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {}

  ngOnInit(): void {
    switch (this.type) {
      case 'Win-%':
        this.yAxisLabel = 'Win-%';
        return;
      case 'Goals':
        this.yAxisLabel = 'Goals';
        return;
      case 'Goals Per Game':
        this.yAxisLabel = 'Goals Per Game';
        return;
      default:
        this.yAxisLabel = '';
        return;
    }
  }

  onSelect(event: any) {
    console.log(event);
  }
}
