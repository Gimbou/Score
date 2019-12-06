import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

import {
  FontAwesomeModule,
  FaIconLibrary
} from "@fortawesome/angular-fontawesome";
import { faTshirt } from "@fortawesome/free-solid-svg-icons";

import { PlayersComponent } from "./views/players/players.component";
import { ResultComponent } from "./views/result/result.component";
import { GameComponent } from "./views/game/game.component";
import { PlayersListComponent } from "./components/players-list/players-list.component";
import { AddPlayerComponent } from "./components/add-player/add-player.component";
import { GoalsListComponent } from "./components/goals-list/goals-list.component";
import { GoalsComponent } from "./views/goals/goals.component";
import { CountdownComponent } from "./components/countdown/countdown.component";

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    ResultComponent,
    GameComponent,
    PlayersListComponent,
    AddPlayerComponent,
    GoalsListComponent,
    GoalsComponent,
    CountdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTshirt);
  }
}
