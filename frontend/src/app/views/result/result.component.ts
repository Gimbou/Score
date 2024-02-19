import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

import { Game } from '../../models/game';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
import { PlayersListComponent } from '../../components/players-list/players-list.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [RouterLink, PlayersListComponent, FontAwesomeModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
  game: Game = new Game();
  faTshirt = faTshirt;

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
  }
}
