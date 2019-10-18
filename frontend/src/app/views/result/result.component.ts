import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset game!",
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.playerService.reset();
        this.gameService.reset();
        this.router.navigateByUrl("/");
      }
    });
  }
}
