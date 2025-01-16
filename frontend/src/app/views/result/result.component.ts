import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'firebase/auth';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTshirt,
  faGear,
  faCloudArrowUp,
  faTrash,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';

import { Game } from '../../models/game';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
import { PlayersListComponent } from '../../components/players-list/players-list.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [RouterLink, PlayersListComponent, FontAwesomeModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
  game: Game = new Game();
  gameUploaded = false;
  currentUser: User | null = null;
  faTshirt = faTshirt;
  faGear = faGear;
  faCloudArrowUp = faCloudArrowUp;
  faTrash = faTrash;
  faChartSimple = faChartSimple;
  private _gameChangeSubscription: Subscription;
  private _currentUserSubscription: Subscription;

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private gameService: GameService,
    private apiService: ApiService
  ) {
    this._gameChangeSubscription = this.gameService.gameChange.subscribe((value) => {
      this.setGameUploaded();
    });
    this._currentUserSubscription = this.apiService.currentUser.subscribe(
      (value) => {
        this.currentUser = value;
      }
    );
  }

  ngOnInit() {
    this.getGame();
    this.setGameUploaded();
    this.getCurrentUser();
  }

  ngOnDestroy() {
    this._gameChangeSubscription.unsubscribe();
    this._currentUserSubscription.unsubscribe();
  }

  async getCurrentUser() {
    this.currentUser = await this.apiService.getCurrentUser();
  }

  setGameUploaded(): void {
    this.gameUploaded = this.gameService.isGameUploaded();
  }

  getGame(): void {
    this.game = this.gameService.getGame();
  }

  uploadGame(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "The game will be uploaded to cloud!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, upload game!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.apiService.addResult();
      }
    });
  }

  resetGame(): void {
    if (this.gameUploaded) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset game!',
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          this.playerService.reset();
          this.gameService.reset();
          this.router.navigateByUrl('/');
        }
      });
    } else if (!this.currentUser) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Seems like the game is not yet uploaded!",
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        denyButtonColor: '#05d899',
        confirmButtonText: 'Reset game anyway!',
        denyButtonText: 'Login',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.playerService.reset();
          this.gameService.reset();
          this.router.navigateByUrl('/');
        } else if(result.isDenied) {
          this.router.navigateByUrl('/settings');
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "Seems like the game is not yet uploaded!",
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        denyButtonColor: '#05d899',
        confirmButtonText: 'Reset game anyway!',
        denyButtonText: 'Upload result',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.playerService.reset();
          this.gameService.reset();
          this.router.navigateByUrl('/');
        } else if(result.isDenied) {
          this.uploadGame();
        }
      });
    }
  }
}
