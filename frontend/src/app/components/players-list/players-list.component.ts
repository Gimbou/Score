import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

import { Player } from '../../models/player';
import { PlayerService } from '../../services/player.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CdkDropList, CdkDrag, FontAwesomeModule],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss',
})
export class PlayersListComponent implements OnInit {
  @Input() showScore: boolean = false;
  @Input() addGoalAllowed: boolean = false;

  players!: Player[];
  teamOne!: Player[];
  teamTwo!: Player[];
  teamOnePlayerCount: number = 0;
  teamTwoPlayerCount: number = 0;
  showTeams: boolean = false;
  playerToggleAllowed: boolean = false;
  _subscription: Subscription;
  faTshirt = faTshirt;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService
  ) {
    this._subscription = this.playerService.playersChange.subscribe((value) => {
      this.setPlayerToggleAllowed();
      this.getPlayers();
      this.getTeams();
    });
  }

  ngOnInit() {
    this.setPlayerToggleAllowed();
    this.getPlayers();
    this.getTeams();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  setPlayerToggleAllowed(): void {
    if (!this.gameService.isGameStarted()) {
      this.playerToggleAllowed = true;
    }
  }

  getPlayers(): void {
    this.players = this.playerService.getPlayers();

    this.sortPlayersList();
  }

  getTeams(): void {
    this.teamOne = this.playerService.getTeam(1);
    this.teamOnePlayerCount = this.teamOne.length;
    this.teamTwo = this.playerService.getTeam(2);
    this.teamTwoPlayerCount = this.teamTwo.length;

    if (this.teamOne.length && this.teamTwo.length) {
      this.showTeams = true;
      this.sortPlayersList();
    } else {
      this.showTeams = false;
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

  togglePlayer(player: Player): void {
    if (this.showTeams) {
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
          this.playerService.togglePlayerSelect(player, true);
        }
      });
    } else {
      this.playerService.togglePlayerSelect(player);
    }
  }

  sortPlayersList(): void {
    if (this.players) {
      this.players.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (this.teamOne) {
      this.teamOne.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (this.teamTwo) {
      this.teamTwo.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      this.playerService.changePlayerTeam(event.item.data);
    }
  }
}
