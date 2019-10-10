import { Component, OnInit } from "@angular/core";

import { Game } from "../game";
import { GameService } from "../game.service";

import { Player } from "../player";
import { PlayerService } from "../player.service";

@Component({
  selector: "app-score",
  templateUrl: "./score.component.html",
  styleUrls: ["./score.component.sass"]
})
export class ScoreComponent implements OnInit {
  game: Game;
  players: Player[] = [];

  constructor(
    private gameService: GameService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.game = this.gameService.getGame();
    this.players = this.playerService.getPlayers();
  }

  goal(player: Player): void {
    this.game = this.gameService.addGoal(player.team);
    this.playerService.addGoal(player);
  }
}
