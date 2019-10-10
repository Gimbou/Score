import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PlayersComponent } from "./players/players.component";
import { ScoreComponent } from "./score/score.component";

const routes: Routes = [
  { path: "", redirectTo: "/players", pathMatch: "full" },
  { path: "players", component: PlayersComponent },
  { path: "score", component: ScoreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
