import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { PlayerService } from "src/app/services/player.service";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.sass"]
})
export class PlayersComponent implements OnInit {
  playerCount: Number = 0;
  playersShuffled: Boolean = false;
  _subscription: Subscription;

  constructor(private playerService: PlayerService) {
    this._subscription = this.playerService.playersChange.subscribe(value => {
      this.setPlayerCount();
      this.setPlayersShuffled();
    });
  }

  ngOnInit() {
    this.setPlayerCount();
    this.setPlayersShuffled();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  setPlayerCount(): void {
    this.playerCount = this.playerService.getPlayers().length;
  }

  setPlayersShuffled(): void {
    this.playersShuffled = this.playerService.isPlayersShuffled();
  }

  shuffle(): void {
    this.playerService.shuffleTeams();
    this.playerService.setShuffled(true);
  }
}
