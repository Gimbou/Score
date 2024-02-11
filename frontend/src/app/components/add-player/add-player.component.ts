import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../../services/player.service';
import { Player } from '../../../../src/app/models/player';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.scss',
})
export class AddPlayerComponent {
  constructor(private playerService: PlayerService) {}

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.playerService.addPlayer({ name } as Player);
  }
}
