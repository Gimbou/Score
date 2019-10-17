import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

import { PlayersComponent } from "./views/players/players.component";
import { ResultComponent } from "./views/result/result.component";
import { ScoreComponent } from "./views/score/score.component";
import { PlayersListComponent } from "./components/players-list/players-list.component";
import { AddPlayerComponent } from "./components/add-player/add-player.component";

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    ResultComponent,
    ScoreComponent,
    PlayersListComponent,
    AddPlayerComponent
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
