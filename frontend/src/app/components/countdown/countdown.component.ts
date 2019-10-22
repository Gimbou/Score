import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-countdown",
  templateUrl: "./countdown.component.html",
  styleUrls: ["./countdown.component.sass"]
})
export class CountdownComponent implements OnInit {
  @Input() endTimeHours: number;
  @Input() endTimeMinutes: number;

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  soundPlayed: boolean = false;
  counter;

  constructor() {}

  ngOnInit() {
    const endTime = new Date();
    endTime.setHours(this.endTimeHours);
    endTime.setMinutes(this.endTimeMinutes);
    endTime.setSeconds(0);

    this.startCountdown(endTime);
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
          const sound = new Audio("../../../assets/horn.mp3");
          sound.load();
          sound.play();
          this.soundPlayed = true;
        }
      }
    }, 1000);
  }
}
