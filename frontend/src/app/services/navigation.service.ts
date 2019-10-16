import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NavigationService {
  backClicked: Boolean = false;

  constructor() {}

  setBackClicked(value: Boolean) {
    this.backClicked = value;
  }

  getBackClicked() {
    return this.backClicked;
  }
}
