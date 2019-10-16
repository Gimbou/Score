import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";

import { Player } from "../../models/player";
import { PlayerService } from "../../services/player.service";
import { Game } from "../../models/game";
import { GameService } from "../../services/game.service";

@Component({
  selector: "app-players-list",
  templateUrl: "./players-list.component.html",
  styleUrls: ["./players-list.component.sass"]
})
export class PlayersListComponent implements OnInit {
  @Input() showTeams: Boolean = false;
  @Input() showScore: Boolean = false;
  @Input() showUnknownPlayer: Boolean = false;
  @Input() addGoalAllowed: Boolean = false;
  @Input() reduceGoalAllowed: Boolean = false;

  players: Player[];
  teamOne: Player[];
  teamTwo: Player[];
  game: Game;
  _subscription: Subscription;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService
  ) {
    this._subscription = this.playerService.playersChange.subscribe(value => {
      this.getPlayers();
      this.getTeams();
    });
  }

  ngOnInit() {
    this.getPlayers();
    this.getTeams();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  getPlayers(): void {
    this.players = this.playerService.getPlayers();
  }

  getTeams(): void {
    this.teamOne = this.playerService.getTeam(1);
    this.teamTwo = this.playerService.getTeam(2);
  }

  goal(player: Player): void {
    this.game = this.gameService.addGoal(player.team);
    this.playerService.addGoal(player);
  }

  deletePlayer(player: Player): void {
    this.playerService.deletePlayer(player);
  }
}
