import { Component, Input } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

import { Stat } from '../../models/stat';

@Component({
  selector: 'app-stats-numbers',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './stats-numbers.component.html',
  styleUrl: './stats-numbers.component.scss'
})
export class StatsNumbersComponent {
  @Input() data: Stat[] = [];

  // Card settings
  view: [number, number] = [700, 150];

  colorScheme: Color = {
    name: 'orangeScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#ff6600', '#ff6600', '#ff6600', '#ff6600']
  };
  cardColor: string = '#3a3a3a';

  constructor() {}
}
