import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

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

    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Settings saved"
    });
  }
}
