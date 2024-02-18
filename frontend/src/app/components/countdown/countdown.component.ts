import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit {
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  soundPlayed: boolean = false;
  counter!: NodeJS.Timeout;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.soundPlayed = false;

    const endTime = new Date();
    const currentTime = new Date().getTime();
    endTime.setHours(
      Number(this.settingsService.settings.endTime.substring(0, 2))
    );
    endTime.setMinutes(
      Number(this.settingsService.settings.endTime.substring(3, 5))
    );
    endTime.setSeconds(0);

    if (this.counter) {
      clearInterval(this.counter);
    }

    if (endTime.getTime() - currentTime > 0) {
      this.startCountdown(endTime);
    }
  }

  ngOnDestroy() {
    clearInterval(this.counter);
  }

  startCountdown(endTime: Date): void {
    const countDownDate = endTime.getTime();

    this.counter = setInterval(() => {
      const currentTime = new Date().getTime();
      const distance = countDownDate - currentTime;

      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        this.hours = -(this.hours + 1);
        this.minutes = -(this.minutes + 1);
        this.seconds = -this.seconds;

        if (!this.soundPlayed) {
          const sound = new Audio('../../../assets/horn.mp3');
          sound.load();
          sound.play();
          this.soundPlayed = true;
          clearInterval(this.counter);
          this.hours = 0;
          this.minutes = 0;
          this.seconds = 0;
        }
      }
    }, 1000);
  }
}
