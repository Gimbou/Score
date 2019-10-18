import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { Game } from "../../models/game";
import { GameService } from "../../services/game.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.sass"]
})
export class GameComponent implements OnInit {
  game: Game;
  _subscription: Subscription;

  constructor(private router: Router, private gameService: GameService) {
    this._subscription = this.gameService.gameChange.subscribe(value => {
      this.getGame();
    });
  }

  ngOnInit() {
    this.getGame();
    this.startGame();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  getGame(): void {
    this.game = this.gameService.getGame();
  }

  startGame(): void {
    this.gameService.startGame();
  }

  endGame(): void {
    this.gameService.endGame();
    this.router.navigateByUrl("/result");
  }
}
