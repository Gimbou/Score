import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'firebase/auth';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGear, faDice, faCirclePlay, faChartSimple, faPeopleGroup, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import { PlayerService } from '../../../../src/app/services/player.service';
import { GameService } from '../../../../src/app/services/game.service';
import { ApiService } from '../../services/api.service';

import { AddPlayerComponent } from '../../../../src/app/components/add-player/add-player.component';
import { PlayersListComponent } from '../../../../src/app/components/players-list/players-list.component';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [
    RouterLink,
    AddPlayerComponent,
    PlayersListComponent,
    FontAwesomeModule,
  ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
})
export class PlayersComponent implements OnInit {
  playerCount: number = 0;
  selectedPlayerCount: number = 0;
  playersShuffled: boolean = false;
  currentUser: User | null = null;
  faGear = faGear;
  faDice = faDice;
  faCirclePlay = faCirclePlay;
  faChartSimple = faChartSimple;
  faPeopleGroup = faPeopleGroup;
  faTrash = faTrash;
  private _playerChangeSubscription: Subscription;
  private _currentUserSubscription: Subscription;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    private apiService: ApiService,
    private router: Router
  ) {
    this._playerChangeSubscription = this.playerService.playersChange.subscribe((value) => {
      this.setPlayerCount();
      this.setPlayersShuffled();
    });
    this._currentUserSubscription = this.apiService.currentUser.subscribe(
      (value) => {
        this.currentUser = value;
      }
    );
  }

  ngOnInit() {
    this.setPlayerCount();
    this.setPlayersShuffled();
    this.currentUser = this.apiService.getCurrentUser();
  }

  ngOnDestroy() {
    this._playerChangeSubscription.unsubscribe();
    this._currentUserSubscription.unsubscribe();
  }

  setPlayerCount(): void {
    this.playerCount = this.playerService.getPlayers().length;
    this.selectedPlayerCount = this.playerService.getPlayers().filter((p) => p.selected).length;
  }

  setPlayersShuffled(): void {
    this.playersShuffled = this.playerService.isPlayersShuffled();
  }

  downloadPlayers(): void {
    if (this.currentUser && !this.playerCount) {
      this.apiService.getPlayersList();
    }
  }

  resetPlayers(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset players!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.playerService.reset();
      }
    });
  }

  shuffle(): void {
    this.playerService.shuffleTeams();
    this.playerService.setShuffled(true);
  }

  startGame(): void {
    this.gameService.startGame();
    this.router.navigate(['/game']);
  }
}
