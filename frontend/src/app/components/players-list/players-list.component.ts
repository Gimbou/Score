import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";

import { Player } from "../../models/player";
import { PlayerService } from "../../services/player.service";
import { GameService } from "../../services/game.service";

@Component({
  selector: "app-players-list",
  templateUrl: "./players-list.component.html",
  styleUrls: ["./players-list.component.sass"]
})
export class PlayersListComponent implements OnInit {
  @Input() showScore: boolean = false;
  @Input() showUnknownPlayer: boolean = false;
  @Input() addGoalAllowed: boolean = false;

  players: Player[];
  teamOne: Player[];
  teamTwo: Player[];
  showTeams: boolean = false;
  deleteAllowed: boolean = false;
  _subscription: Subscription;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService
  ) {
    this._subscription = this.playerService.playersChange.subscribe(value => {
      this.setDeleteAllowed();
      this.getPlayers();
      this.getTeams();
    });
  }

  ngOnInit() {
    this.setDeleteAllowed();
    this.getPlayers();
    this.getTeams();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  setDeleteAllowed(): void {
    if (!this.gameService.isGameStarted()) {
      this.deleteAllowed = true;
    }
  }

  getPlayers(): void {
    this.players = this.playerService.getPlayers();
  }

  getTeams(): void {
    this.teamOne = this.playerService.getTeam(1);
    this.teamTwo = this.playerService.getTeam(2);

    if (this.teamOne.length || this.teamTwo.length) {
      this.showTeams = true;
    }
  }

  addGoal(player: Player): void {
    this.gameService.addGoal(player.team);
    this.playerService.addGoal(player);
  }

  deletePlayer(player: Player): void {
    this.playerService.deletePlayer(player);
  }
}
