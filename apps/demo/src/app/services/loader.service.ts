import { Injectable, signal, Signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private readonly loadingSignal = signal(false);
  readonly loading: Signal<boolean> = this.loadingSignal.asReadonly();

  show() {
    this.loadingSignal.set(true);
  }
  hide() {
    this.loadingSignal.set(false);
  }
}
