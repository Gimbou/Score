import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTshirt, faChevronUp, faChevronDown, faGear } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import { Game } from '../../models/game';
import { GameService } from '../../services/game.service';
import { CountdownComponent } from '../../components/countdown/countdown.component';
import { AddPlayerComponent } from '../../components/add-player/add-player.component';
import { PlayersListComponent } from '../../components/players-list/players-list.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    RouterLink,
    CountdownComponent,
    PlayersListComponent,
    AddPlayerComponent,
    FontAwesomeModule,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  faTshirt = faTshirt;
  actionButtonsVisible: boolean = false;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faGear = faGear;
  _subscription: Subscription;

  constructor(private router: Router, private gameService: GameService) {
    this._subscription = this.gameService.gameChange.subscribe((value) => {
      this.getGame();
    });
  }

  ngOnInit() {
    this.getGame();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  getGame(): void {
    this.game = this.gameService.getGame();
  }

  endGame(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, end game!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.gameService.endGame();
        this.router.navigateByUrl('/result');
      }
    });
  }

  toggleActionButtons(): void {
    const gameGridContainer = document.getElementById('gameGridContainer');
    const gameButtons = document.getElementById('gameButtons');

    if(gameButtons && gameGridContainer) {
      if (!gameButtons.style.display || gameButtons.style.display === 'none') {
        gameGridContainer.style.gridTemplateAreas = '"countdown" "score" "playersList" "toggleActionButtons" "actionButtons"';
        gameGridContainer.style.gridTemplateRows = '30px 1fr 3fr 30px 80px';
        gameButtons.style.display = 'flex';
        this.actionButtonsVisible = true;
      } else {
        gameGridContainer.style.gridTemplateAreas = '"countdown" "score" "playersList" "toggleActionButtons"';
        gameGridContainer.style.gridTemplateRows = '30px 1fr 3fr 30px';
        gameButtons.style.display = 'none';
        this.actionButtonsVisible = false;
      }
    }
  }
}
