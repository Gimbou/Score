import { Component, Input } from '@angular/core';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { SettingsService } from '../../services/settings.service';
import { ApiService } from '../../services/api.service';

import packageJson from '../../../../package.json';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  emailSent: Boolean = false;
  currentUser: User | null = null;
  currentUserEmail: string | null | undefined = null;
  faXmark = faXmark;
  version: string = packageJson.version;
  private _emailSentSubscription: Subscription;
  private _currentUserSubscription: Subscription;

  constructor(
    private settingsService: SettingsService,
    private apiService: ApiService
  ) {
    this.endTime = this.settingsService.settings.endTime;
    this._emailSentSubscription = this.apiService.emailSent.subscribe(
      (value) => {
        this.emailSent = value;
      }
    );
    this._currentUserSubscription = this.apiService.currentUser.subscribe(
      (value) => {
        this.currentUser = value;

        if (value) {
          this.currentUserEmail = value.email;
        }
      }
    );
  }

  @Input() endTime;

  ngOnInit() {
    this.currentUser = this.apiService.getCurrentUser();

    if (this.currentUser) {
      this.currentUserEmail = this.currentUser.email;
    }
  }

  setTime(time: string): void {
    this.settingsService.setSettings(time);
  }

  login(email: string): void {
    this.apiService.sendEmailLink(email);
  }

  logout(): void {
    this.apiService.logout();
  }
}
