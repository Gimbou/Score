import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  faXmark = faXmark;

  constructor(private settingsService: SettingsService) {
    this.endTime = this.settingsService.settings.endTime;
  }

  @Input() endTime;

  setTime(time: string): void {
    this.settingsService.setSettings(time);
  }

  login(password: string): void {
    return;
  }
}
