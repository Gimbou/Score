import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
  view: [number, number] = [700, 200];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#232837';

  constructor() {}

  onSelect(event: any) {
    console.log(event);
  }
}
