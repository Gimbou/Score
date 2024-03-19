import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

import { StatChartType } from '../../models/stat';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-stats-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './stats-chart.component.html',
  styleUrl: './stats-chart.component.scss',
})
export class StatsChartComponent implements OnChanges {
  @Input() data!: ChartData<'bar'>;
  @Input() chartType!: StatChartType;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    responsive: true,
    elements: {
      bar: {
        backgroundColor: 'rgba(255, 102, 0, 0.3)',
        borderColor: 'rgba(255, 102, 0, 1)',
        borderWidth: 2,
        borderRadius: 4,
      },
    },
    scales: {
      x: {},
      y: {
        min: 0,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  constructor() {}

  ngOnChanges() {
    if (
      this.chartType === StatChartType.WinPercentage &&
      this.barChartOptions &&
      this.barChartOptions.scales &&
      this.barChartOptions.scales['y']
    ) {
      this.barChartOptions.scales['y'].max = 100;
    } else if (
      this.barChartOptions &&
      this.barChartOptions.scales &&
      this.barChartOptions.scales['y']
    ) {
      this.barChartOptions.scales['y'].max = undefined;
    }
  }
}
