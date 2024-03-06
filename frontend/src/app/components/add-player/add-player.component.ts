import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

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
  playerList: Player[] = [];
  _subscription: Subscription;

  constructor(private playerService: PlayerService) {
    this._subscription = this.playerService.playersChange.subscribe((value) => {
      this.getPlayerList();
    });
  }

  ngOnInit() {
    this.getPlayerList();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  getPlayerList(): void {
    this.playerList = this.playerService.getPlayerList();
    this.playerList.sort((a, b) => a.name.localeCompare(b.name));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.playerService.addPlayer({ name: name, selected: true } as Player);
  }
}
