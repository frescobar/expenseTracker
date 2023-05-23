import { Component, OnInit } from '@angular/core';
import { User, onAuthStateChanged } from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}
  currentUser: User | null = null;
  isToggle = false;
  unSubscribe$ = new Subject();

  ngOnInit(): void {
    onAuthStateChanged(this.afAuth, (user) => {
      this.currentUser = user;
      localStorage.setItem('userId', this.currentUser?.uid || '');
    });
    this.sharedService.isToggle$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((isToggle) => {
        this.isToggle = isToggle;
      });
  }
  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
  setIsToggle(): void {
    const isToggle = !this.isToggle;
    this.sharedService.setIsToggle(isToggle);
  }
  ngOnDestroy(): void {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }
}
