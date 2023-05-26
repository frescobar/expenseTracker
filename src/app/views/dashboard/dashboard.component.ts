import { Component, OnInit, ViewChild } from '@angular/core';
import { User, onAuthStateChanged } from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private afAuth: Auth,
    private sharedService: SharedService,
    private authSvc: AuthService
  ) {}

  currentUser: User | null = null;
  isToggle = false;
  showCharts$ = this.sharedService.showCharts$;
  unSubscribe$ = new Subject();

  ngOnInit(): void {
    this.sharedService.isToggle$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((isToggle) => {
        this.isToggle = isToggle;
      });
  }

  logout(): void {
    this.authSvc.logout();
  }

  setIsToggle(): void {
    const isToggle = !this.isToggle;
    this.sharedService.setIsToggle(isToggle);
  }

  openModal(): void {
    this.sharedService.setIsVisible(true);
  }

  showCharts(): void {
    this.sharedService.setShowCharts(true);
  }

  downloadCSV(): void {
    this.sharedService.buttonClick();
  }

  showDashboard(): void {
    this.sharedService.setShowCharts(false);
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }
}
