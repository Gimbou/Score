import { Component, OnInit } from "@angular/core";

import { PlayerService } from "../../services/player.service";
import { Player } from "src/app/models/player";

@Component({
  selector: "app-add-player",
  templateUrl: "./add-player.component.html",
  styleUrls: ["./add-player.component.sass"]
})
export class AddPlayerComponent implements OnInit {
  constructor(private playerService: PlayerService) {}

  ngOnInit() {}

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.playerService.addPlayer({ name } as Player);
  }
}
