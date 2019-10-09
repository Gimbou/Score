import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

import { PlayersComponent } from "./players/players.component";
import { ResultComponent } from "./result/result.component";
import { ScoreComponent } from "./score/score.component";
import { TeamsComponent } from "./teams/teams.component";

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    ResultComponent,
    ScoreComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
