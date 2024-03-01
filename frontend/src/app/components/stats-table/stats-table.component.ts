import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';

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
  @Output() onPlayerSelect = new EventEmitter<string>();

  columns: Object[] = [];
  selected: StatTable[] = [];
  SelectionType = SelectionType;

  constructor() {
    this.columns = [{prop: 'name'}, {name: 'Games'}, {name: 'Wins'}, {name: 'Draws'}, {name: 'Losses'}, {name: 'WinPercentage'}, {name: 'Goals'}, {name: 'GPG'}];
  }

  onSelect(selected: Event) {
    this.onPlayerSelect.emit(this.selected[0].name);
  }
}
