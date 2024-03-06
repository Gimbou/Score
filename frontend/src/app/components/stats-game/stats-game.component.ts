import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxDatatableModule, ColumnMode } from '@swimlane/ngx-datatable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

import { StatGame } from '../../models/stat';

@Component({
  selector: 'app-stats-game',
  standalone: true,
  imports: [CommonModule, NgxDatatableModule, FontAwesomeModule],
  templateUrl: './stats-game.component.html',
  styleUrl: './stats-game.component.scss',
})
export class StatsGameComponent {
  @Input() data: StatGame[] = [];

  faTshirt = faTshirt;

  columns: Object[] = [];
  ColumnMode = ColumnMode;

  constructor() {}
}
