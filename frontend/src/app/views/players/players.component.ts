import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGear, faDice, faCirclePlay, faChartSimple } from '@fortawesome/free-solid-svg-icons';

import { PlayerService } from '../../../../src/app/services/player.service';
import { GameService } from '../../../../src/app/services/game.service';

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
  playersShuffled: boolean = false;
  faGear = faGear;
  faDice = faDice;
  faCirclePlay = faCirclePlay;
  faChartSimple = faChartSimple;
  private _subscription: Subscription;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    private router: Router
  ) {
    this._subscription = this.playerService.playersChange.subscribe((value) => {
      this.setPlayerCount();
      this.setPlayersShuffled();
    });
  }

  ngOnInit() {
    this.setPlayerCount();
    this.setPlayersShuffled();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  setPlayerCount(): void {
    this.playerCount = this.playerService.getPlayers().length;
  }

  setPlayersShuffled(): void {
    this.playersShuffled = this.playerService.isPlayersShuffled();
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
