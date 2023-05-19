import { Component } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser: User | null = null;
  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }
}
