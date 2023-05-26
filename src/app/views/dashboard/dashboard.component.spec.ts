import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { Auth } from '@angular/fire/auth';
import { of } from 'rxjs';

const authMock = jasmine.createSpyObj('Auth', ['method1', 'method2']);
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['logout']);
    const sharedServiceMock = jasmine.createSpyObj('SharedService', [
      'setIsToggle',
      'setIsVisible',
      'setShowCharts',
      'buttonClick',
    ]);
    sharedServiceMock.showCharts$ = of(true);
    sharedServiceMock.isVisible$ = of(true);
    sharedServiceMock.isToggle$ = of(true);
    sharedServiceMock.buttonClickEmmiter = of(true);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DashboardComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: SharedService, useValue: sharedServiceMock },
        { provide: Auth, useValue: authMock },
      ],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    sharedServiceSpy = TestBed.inject(
      SharedService
    ) as jasmine.SpyObj<SharedService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService logout method when logout is called', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });

  it('should call SharedService setIsVisible method when openModal is called', () => {
    component.openModal();
    expect(sharedServiceSpy.setIsVisible).toHaveBeenCalledWith(true);
  });

  it('should call SharedService setShowCharts method when showCharts is called', () => {
    component.showCharts();
    expect(sharedServiceSpy.setShowCharts).toHaveBeenCalledWith(true);
  });

  it('should call SharedService buttonClick method when downloadCSV is called', () => {
    component.downloadCSV();
    expect(sharedServiceSpy.buttonClick).toHaveBeenCalled();
  });

  it('should call SharedService setShowCharts method when showDashboard is called', () => {
    component.showDashboard();
    expect(sharedServiceSpy.setShowCharts).toHaveBeenCalledWith(false);
  });

  it('should unsubscribe from observables when ngOnDestroy is called', () => {
    spyOn(component.unSubscribe$, 'next');
    spyOn(component.unSubscribe$, 'complete');
    component.ngOnDestroy();
    expect(component.unSubscribe$.next).toHaveBeenCalledWith(true);
    expect(component.unSubscribe$.complete).toHaveBeenCalled();
  });
});
