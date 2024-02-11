import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Score';

  constructor(
    private location: LocationStrategy,
    private navigationService: NavigationService
  ) {
    // Check if back or forward button is pressed
    this.location.onPopState(() => {
      this.navigationService.setBackClicked(true);
      return false;
    });
  }
}
