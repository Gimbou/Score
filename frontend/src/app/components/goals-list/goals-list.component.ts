import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Goal } from "../../models/goal";
import { PlayerService } from "../../services/player.service";
import { GameService } from "../../services/game.service";

@Component({
  selector: "app-goals-list",
  templateUrl: "./goals-list.component.html",
  styleUrls: ["./goals-list.component.sass"]
})
export class GoalsListComponent implements OnInit {
  goals: [Goal];

  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit() {
    this.goals = this.playerService.getGoals();
  }

  deleteGoal(goal: Goal): void {
    this.gameService.deleteGoal(goal.team);
    this.playerService.deleteGoal(goal.id);
    this.router.navigate(["/game"]);
  }
}
