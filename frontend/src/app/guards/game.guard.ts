import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { GameService } from "../services/game.service";

@Injectable({
  providedIn: "root"
})
export class GameGuard implements CanActivate {
  constructor(private gameService: GameService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkGameStatus();
  }

  checkGameStatus(): boolean {
    if (this.gameService.isGameStarted() && !this.gameService.isGameEnded()) {
      this.router.navigate(["/score"]);
      return false;
    }

    return true;
  }
}
