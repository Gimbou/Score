import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxDatatableModule, ColumnMode } from '@swimlane/ngx-datatable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

import { Player } from '../../models/player';

@Component({
  selector: 'app-stats-single-game',
  standalone: true,
  imports: [CommonModule, NgxDatatableModule, FontAwesomeModule],
  templateUrl: './stats-single-game.component.html',
  styleUrl: './stats-single-game.component.scss',
})
export class StatsSingleGameComponent {
  @Input() data: Player[] = [];

  faTshirt = faTshirt;

  columns: Object[] = [];
  ColumnMode = ColumnMode;

  constructor() {}
}
