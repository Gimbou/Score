import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NavigationGuard } from "./guards/navigation.guard";
import { GameGuard } from "./guards/game.guard";

import { PlayersComponent } from "./views/players/players.component";
import { TeamsComponent } from "./views/teams/teams.component";
import { ScoreComponent } from "./views/score/score.component";
import { ResultComponent } from "./views/result/result.component";
import { RunningGameErrorComponent } from "./views/running-game-error/running-game-error.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/players",
    pathMatch: "full",
    canActivate: [GameGuard],
    canDeactivate: [NavigationGuard]
  },
  {
    path: "players",
    component: PlayersComponent,
    canActivate: [GameGuard],
    canDeactivate: [NavigationGuard]
  },
  {
    path: "teams",
    component: TeamsComponent,
    canActivate: [GameGuard],
    canDeactivate: [NavigationGuard]
  },
  {
    path: "score",
    component: ScoreComponent,
    canDeactivate: [NavigationGuard]
  },
  {
    path: "result",
    component: ResultComponent,
    canActivate: [GameGuard],
    canDeactivate: [NavigationGuard]
  },
  {
    path: "running-game-error",
    component: RunningGameErrorComponent,
    canDeactivate: [NavigationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
