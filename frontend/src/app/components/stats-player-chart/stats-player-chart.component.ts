import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-stats-player-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './stats-player-chart.component.html',
  styleUrl: './stats-player-chart.component.scss',
})
export class StatsPlayerChartComponent implements OnInit {
  @Input() data!: ChartData<
    'line',
    { name: string; goals: number; result: string }[]
  >;

  private colors: any = {
    orange: {
      default: 'rgba(255, 102, 0, 0.5)',
      half: 'rgba(255, 102, 0, 0.25)',
      quarter: 'rgba(255, 102, 0, 0.12)',
      zero: 'rgba(255, 102, 0, 0)',
    },
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.3,
        borderColor: 'rgba(255, 102, 0, 1)',
        borderWidth: 2,
        fill: 'origin',
      },
      point: {
        hoverBackgroundColor: '#fff',
        hoverBorderColor: 'rgba(255, 102, 0, 0.8)',
        radius: 5,
      },
    },
    scales: {
      y: {
        position: 'left',
        min: 0,
        suggestedMax: 5,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Goals',
        },
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() {}

  ngOnInit() {
    const canvas = <HTMLCanvasElement>document.getElementById('player-chart');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.canvas.height = 100;

      const gradient = ctx.createLinearGradient(0, 25, 0, 300);
      gradient.addColorStop(0, this.colors.orange.half);
      gradient.addColorStop(0.35, this.colors.orange.quarter);
      gradient.addColorStop(1, this.colors.orange.zero);

      if (
        this.lineChartOptions &&
        this.lineChartOptions.elements &&
        this.lineChartOptions.elements.line
      ) {
        this.lineChartOptions.elements.line.backgroundColor = gradient;
      }
    }
  }
}
