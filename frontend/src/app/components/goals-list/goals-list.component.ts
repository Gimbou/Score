import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

import { Goal } from '../../models/goal';
import { PlayerService } from '../../services/player.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-goals-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './goals-list.component.html',
  styleUrl: './goals-list.component.scss',
})
export class GoalsListComponent implements OnInit {
  goals!: [Goal];
  faTshirt = faTshirt;

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
      text: 'Remove goal from ' + goal.name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.gameService.deleteGoal(goal.team!);
        this.playerService.deleteGoal(goal.id!);
        this.router.navigate(['/game']);
      }
    });
  }
}
