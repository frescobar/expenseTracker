import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/models/UserCredentials';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { passwordMatchValidator } from 'src/app/helpers/customValidations';
import { Regex } from 'src/app/helpers/regex';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;
  loading$ = this.loadingService.loading$;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}
  submitForm(): void {
    if (this.registerForm.valid) {
      const userCredentials: UserCredentials = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      this.authService.register(userCredentials);
    } else {
      Object.values(this.registerForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: [null, [Validators.required, Validators.pattern(Regex.email)]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, [Validators.required]],
      },
      { validator: passwordMatchValidator }
    );
  }
}
