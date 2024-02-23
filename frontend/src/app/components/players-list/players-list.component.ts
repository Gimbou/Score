import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

import { Player } from '../../models/player';
import { PlayerService } from '../../services/player.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss',
})
export class PlayersListComponent implements OnInit {
  @Input() showScore: boolean = false;
  @Input() addGoalAllowed: boolean = false;

  players!: Player[];
  teamOne!: Player[];
  teamTwo!: Player[];
  showTeams: boolean = false;
  deleteAllowed: boolean = false;
  _subscription: Subscription;
  faTshirt = faTshirt;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService
  ) {
    this._subscription = this.playerService.playersChange.subscribe((value) => {
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
    Swal.fire({
      text: 'Add goal for ' + player.name + '?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, it was a goal!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value && player.team) {
        this.gameService.addGoal(player.team);
        this.playerService.addGoal(player);
      }
    });
  }

  deletePlayer(player: Player): void {
    Swal.fire({
      text: 'Remove player ' + player.name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove him/her!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.playerService.deletePlayer(player);
      }
    });
  }
}
