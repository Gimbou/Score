import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { Goal } from "../../models/goal";
import { PlayerService } from "../../services/player.service";
import { GameService } from "../../services/game.service";

@Component({
  selector: "app-goals-list",
  templateUrl: "./goals-list.component.html",
  styleUrls: ["./goals-list.component.scss"]
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
    Swal.fire({
      text: "Remove goal at from " + goal.name + "?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.gameService.deleteGoal(goal.team);
        this.playerService.deleteGoal(goal.id);
        this.router.navigate(["/game"]);
      }
    });
  }
}
