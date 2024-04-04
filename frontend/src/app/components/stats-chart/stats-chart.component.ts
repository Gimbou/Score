import { Component, ViewChild, Input, OnChanges, OnInit } from '@angular/core';
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
export class StatsChartComponent implements OnInit, OnChanges {
  @Input() data!: ChartData<'bar'>;
  @Input() chartType!: StatChartType;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  private colors: any = {
    orange: {
      default: 'rgba(255, 102, 0, 0.5)',
      half: 'rgba(255, 102, 0, 0.25)',
      quarter: 'rgba(255, 102, 0, 0.12)',
      zero: 'rgba(255, 102, 0, 0)',
    },
  };

  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    responsive: true,
    elements: {
      bar: {
        backgroundColor: 'rgba(255, 102, 0, 0.2)',
        borderColor: 'rgba(255, 102, 0, 1)',
        borderWidth: 1,
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

  ngOnInit() {
    const canvas = <HTMLCanvasElement>document.getElementById('stats-chart');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.canvas.height = 100;

      const gradient = ctx.createLinearGradient(0, 25, 0, 300);
      gradient.addColorStop(0, this.colors.orange.half);
      gradient.addColorStop(0.35, this.colors.orange.quarter);
      gradient.addColorStop(1, this.colors.orange.zero);

      if (
        this.barChartOptions &&
        this.barChartOptions.elements &&
        this.barChartOptions.elements.bar
      ) {
        this.barChartOptions.elements.bar.backgroundColor = gradient;
      }
    }
  }

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
