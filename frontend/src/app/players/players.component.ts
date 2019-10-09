import { Component, OnInit } from "@angular/core";

import { Player } from "../player";
import { PlayerService } from "../player.service";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.sass"]
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.players = this.playerService.getPlayers();
  }

  getPlayers(): void {
    this.players = this.playerService.getPlayers();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.players = this.playerService.addPlayer({ name } as Player);
  }

  delete(player: Player): void {
    this.players = this.playerService.deletePlayer(player);
  }

  shuffle(): void {
    this.players = this.playerService.shuffleTeams();
  }
}
