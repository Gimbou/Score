import { Component, Input } from '@angular/core';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
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
