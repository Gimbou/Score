import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { first, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  constructor(private appRef: ApplicationRef, private swUpdate: SwUpdate) {}

  checkForUpdates(): void {
    if (this.swUpdate.isEnabled) {
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
  
      appIsStable$.subscribe(async () => {
        try {
          const updateAvailable = await this.swUpdate.checkForUpdate();
          
          if (updateAvailable) {
            const versionReady$ = this.swUpdate.versionUpdates.pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'));

            versionReady$.subscribe(async () => {
              // TODO: This might not work as I never got it to reach this far :O
              this.swUpdate.activateUpdate().then(() => document.location.reload());
            });
          }
        } catch (err) {
          console.error('Failed to check for updates:', err);
        }
      });
    }
  }
}