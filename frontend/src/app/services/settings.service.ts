import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: { endTime: string } = { endTime: '' };

  constructor() {
    this.getLocalStorage();
  }

  private setLocalStorage() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  private getLocalStorage() {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');

    if (Object.keys(settings).length !== 0) {
      this.settings = {
        endTime: settings.endTime,
      };
    }
  }

  setSettings(endTime: string) {
    this.settings = {
      endTime: endTime,
    };
    this.setLocalStorage();
  }
}
