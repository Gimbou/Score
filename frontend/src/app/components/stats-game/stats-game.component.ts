import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  NgxDatatableModule,
  SelectionType,
  SortType,
  ColumnMode,
} from '@swimlane/ngx-datatable';

import { StatGame } from '../../models/stat';

@Component({
  selector: 'app-stats-game',
  standalone: true,
  imports: [CommonModule, NgxDatatableModule],
  templateUrl: './stats-game.component.html',
  styleUrl: './stats-game.component.scss',
})
export class StatsGameComponent {
  @Input() data: StatGame[] = [];

  columns: Object[] = [];
  ColumnMode = ColumnMode;

  constructor() {}
}
