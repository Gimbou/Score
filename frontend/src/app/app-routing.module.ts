import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NavigationGuard } from "./guards/navigation.guard";
import { GameGuard } from "./guards/game.guard";

import { PlayersComponent } from "./views/players/players.component";
import { GameComponent } from "./views/game/game.component";
import { GoalsComponent } from "./views/goals/goals.component";
import { ResultComponent } from "./views/result/result.component";

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
    path: "game",
    component: GameComponent,
    canDeactivate: [NavigationGuard]
  },
  {
    path: "goals",
    component: GoalsComponent,
    canDeactivate: [NavigationGuard]
  },
  {
    path: "result",
    component: ResultComponent,
    canActivate: [GameGuard],
    canDeactivate: [NavigationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
