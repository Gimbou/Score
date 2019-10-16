import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Game } from "../../models/game";
import { GameService } from "../../services/game.service";
import { PlayerService } from "../../services/player.service";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.sass"]
})
export class ResultComponent implements OnInit {
  game: Game;

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.getGame();
  }

  getGame(): void {
    this.game = this.gameService.getGame();
  }

  resetGame(): void {
    this.playerService.reset();
    this.gameService.reset();
    this.router.navigateByUrl("/");
  }
}
