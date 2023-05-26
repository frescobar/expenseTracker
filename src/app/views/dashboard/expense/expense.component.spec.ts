import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseComponent } from './expense.component';
import { AuthService } from 'src/app/services/auth.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { SharedService } from 'src/app/services/shared.service';
import { Subject, of } from 'rxjs';

describe('ExpenseComponent', () => {
  let component: ExpenseComponent;
  let fixture: ComponentFixture<ExpenseComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let expensesService: jasmine.SpyObj<ExpensesService>;
  let sharedService: jasmine.SpyObj<SharedService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['currentUser']);
    authServiceSpy.currentUser = 'user';

    const expensesServiceSpy = jasmine.createSpyObj('ExpensesService', [
      'getExpenses',
      'addExpense',
      'deleteExpense',
    ]);
    expensesServiceSpy.getExpenses.and.returnValue(of(true));

    const sharedServiceSpy = jasmine.createSpyObj('SharedService', [
      'isVisible$',
      'showCharts$',
      'setIsVisible',
      'setShowCharts',
    ]);
    sharedServiceSpy.isVisible$ = of(true); // Initialize isVisible$ as an observable
    sharedServiceSpy.showCharts$ = of(true); // Initialize showCharts$ as an observable
    const buttonClickEmmiter$ = new Subject<boolean>(); // Create a new subject as buttonClickEmmiter
    sharedServiceSpy.buttonClickEmmiter = buttonClickEmmiter$.asObservable(); // Use the subject's asObservable method

    await TestBed.configureTestingModule({
      declarations: [ExpenseComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ExpensesService, useValue: expensesServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    expensesService = TestBed.inject(
      ExpensesService
    ) as jasmine.SpyObj<ExpensesService>;
    sharedService = TestBed.inject(
      SharedService
    ) as jasmine.SpyObj<SharedService>;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component', () => {
    component.ngOnInit();
    const user = authService.currentUser;
    expect(expensesService.getExpenses).toHaveBeenCalledWith(user || '');
  });

  it('should filter expenses by type', () => {
    component.expenses = [
      {
        userId: '123',
        name: 'Expense 1',
        type: 'Type A',
        amount: 100,
        date: new Date(),
        description: 'Expense 1 description',
      },
      {
        userId: '123',
        name: 'Expense 2',
        type: 'Type B',
        amount: 200,
        date: new Date(),
        description: 'Expense 2 description',
      },
    ];

    component.expenseType = 'Type A';
    component.filterExpenses();

    expect(component.filteredExpenses.length).toBe(1);
    expect(component.filteredExpenses[0].name).toBe('Expense 1');
  });
  it('should filter expenses by date', () => {
    component.expenses = [
      {
        userId: '123',
        name: 'Expense 1',
        type: 'Type A',
        amount: 100,
        date: new Date('2021-01-01'),
        description: 'Expense 1 description',
      },
      {
        userId: '123',
        name: 'Expense 2',
        type: 'Type B',
        amount: 200,
        date: new Date('2021-02-01'),
        description: 'Expense 2 description',
      },
    ];

    component.date = [new Date('2021-01-01'), new Date('2021-01-31')];
    component.filterExpenses();

    expect(component.filteredExpenses.length).toBe(1);
    expect(component.filteredExpenses[0].name).toBe('Expense 1');
  });

  it('should filter expenses by type and date', () => {
    component.expenses = [
      {
        userId: '123',
        name: 'Expense 1',
        type: 'Type A',
        amount: 100,
        date: new Date('2021-01-01'),
        description: 'Expense 1 description',
      },
      {
        userId: '123',
        name: 'Expense 2',
        type: 'Type B',
        amount: 200,
        date: new Date('2021-02-01'),
        description: 'Expense 2 description',
      },
    ];

    component.expenseType = 'Type A';
    component.date = [new Date('2021-01-01'), new Date('2021-01-31')];
    component.filterExpenses();

    expect(component.filteredExpenses.length).toBe(1);
    expect(component.filteredExpenses[0].name).toBe('Expense 1');
  });
});
