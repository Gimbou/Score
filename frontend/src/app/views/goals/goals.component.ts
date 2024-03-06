import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { GoalsListComponent } from '../../components/goals-list/goals-list.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [RouterLink, GoalsListComponent, FontAwesomeModule],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.scss',
})
export class GoalsComponent {
  faXmark = faXmark;
  
  constructor() {}
}
