import { Component, OnInit } from "@angular/core";

import { PlayerService } from "../../services/player.service";

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.sass"]
})
export class TeamsComponent implements OnInit {
  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.shuffle(false);
  }

  shuffle(forceShuffle: Boolean): void {
    if (!this.playerService.isPlayersShuffled() || forceShuffle) {
      this.playerService.shuffleTeams();
      this.playerService.setShuffled(true);
    }
  }
}
