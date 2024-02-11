import { Component } from '@angular/core';

import { GoalsListComponent } from '../../components/goals-list/goals-list.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [GoalsListComponent],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.scss',
})
export class GoalsComponent {
  constructor() {}
}
