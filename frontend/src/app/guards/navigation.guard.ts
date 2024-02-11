import { Injectable, inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { GameService } from '../services/game.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationGuard {
  constructor(private gameService: GameService, private router: Router) {}

  checkGameStatus(state: RouterStateSnapshot): boolean {
    if (
      state.url !== '/players' &&
      !this.gameService.isGameStarted() &&
      !this.gameService.isGameEnded()
    ) {
      this.router.navigate(['/players']);
      return true;
    }

    if (
      state.url !== '/game' &&
      state.url !== '/goals' &&
      this.gameService.isGameStarted() &&
      !this.gameService.isGameEnded()
    ) {
      this.router.navigate(['/game']);
      return true;
    }

    if (
      state.url !== '/result' &&
      this.gameService.isGameStarted() &&
      this.gameService.isGameEnded()
    ) {
      this.router.navigate(['/result']);
      return true;
    }

    return true;
  }
}

export const navigationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(NavigationGuard).checkGameStatus(state);
};
