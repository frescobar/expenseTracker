import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { UserCredentials } from '../models/UserCredentials';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: Auth,
    private loadingService: LoadingService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login(userCredentials: UserCredentials) {
    this.loadingService.show();
    signInWithEmailAndPassword(
      this.afAuth,
      userCredentials.email,
      userCredentials.password
    )
      .then(() => {
        this.loadingService.hide();
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        this.loadingService.hide();
        console.log(error);
      });
  }

  async register(userCredentials: UserCredentials) {
    this.loadingService.show();
    try {
      const user = await createUserWithEmailAndPassword(
        this.afAuth,
        userCredentials.email,
        userCredentials.password
      );
      this.loadingService.hide();
      this.toastr.success('You have successfully registered!');
      this.router.navigate(['/login']);
    } catch (error) {
      this.loadingService.hide();
      console.log(error);
    }
  }

  logout(): void {
    this.afAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
