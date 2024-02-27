import { Component, Input } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { StatTable } from '../../models/stat';

@Component({
  selector: 'app-stats-table',
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: './stats-table.component.html',
  styleUrl: './stats-table.component.scss'
})
export class StatsTableComponent {
  @Input() data: StatTable[] = [];
  columns: Object[] = [];

  constructor() {
    this.columns = [{prop: 'name'}, {name: 'Games'}, {name: 'Wins'}, {name: 'Draws'}, {name: 'Losses'}, {name: 'Win-%'}, {name: 'Goals'}, {name: 'GPG'}];
  }
}
