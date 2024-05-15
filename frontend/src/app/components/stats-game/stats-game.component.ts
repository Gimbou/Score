import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgxDatatableModule, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
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
  @Output() onGameSelect = new EventEmitter<Date>();

  faTshirt = faTshirt;

  columns: Object[] = [];
  ColumnMode = ColumnMode;
  selected: StatGame[] = [];
  SelectionType = SelectionType;

  constructor() {}

  onSelect(selected: Event) {
    this.onGameSelect.emit(this.selected[0].date);
  }
}
