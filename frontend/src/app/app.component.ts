import { Component } from "@angular/core";
import { LocationStrategy } from "@angular/common";
import { NavigationService } from "./services/navigation.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Score";

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
