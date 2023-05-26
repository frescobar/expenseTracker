import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let formBuilder: FormBuilder;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    formBuilder = TestBed.inject(FormBuilder);

    component.loginForm = formBuilder.group({
      email: '',
      password: '',
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login when form is valid', () => {
    const loginForm = component.loginForm;
    loginForm.controls['email'].setValue('test@example.com');
    loginForm.controls['password'].setValue('password');
    loginForm.markAllAsTouched();

    component.submitForm();

    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should mark form controls as dirty and update validity when form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    fixture.detectChanges();
    expect(component.loginForm.controls['email'].invalid).toBe(true);
    expect(component.loginForm.controls['password'].invalid).toBe(true);
  });
});
