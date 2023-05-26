import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private isToggleSubject = new BehaviorSubject<boolean>(false);
  isToggle$ = this.isToggleSubject.asObservable();

  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  private showChartsSubject = new BehaviorSubject<boolean>(false);
  showCharts$ = this.showChartsSubject.asObservable();

  buttonClickEmmiter = new EventEmitter();

  setIsToggle(value: boolean) {
    this.isToggleSubject.next(value);
  }

  setIsVisible(value: boolean) {
    this.isVisibleSubject.next(value);
  }

  setShowCharts(value: boolean) {
    this.showChartsSubject.next(value);
  }

  buttonClick() {
    this.buttonClickEmmiter.emit();
  }
}
