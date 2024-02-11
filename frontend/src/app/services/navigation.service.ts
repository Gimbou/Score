import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  backClicked: boolean = false;

  constructor() {}

  setBackClicked(value: boolean) {
    this.backClicked = value;
  }

  getBackClicked() {
    return this.backClicked;
  }
}
