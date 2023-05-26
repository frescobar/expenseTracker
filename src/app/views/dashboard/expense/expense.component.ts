import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ChartOptions } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { Expense } from 'src/app/models/Expense';
import { AuthService } from 'src/app/services/auth.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { SharedService } from 'src/app/services/shared.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
  isVisible$ = this.sharedService.isVisible$;
  showCharts$ = this.sharedService.showCharts$;
  currentUser: User | null = null;
  expenses: Expense[] = [];
  unSubscribe$ = new Subject();
  typeCounts: number[] = [];
  types: string[] = [];
  pieChartLabels: string[] = [];
  expenseType = '';
  date: Date[] = [];
  filteredExpenses: Expense[] = [];
  expenseTypeOtions: string[] = [];

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  pieChartDatasets = [
    {
      data: this.typeCounts,
    },
  ];
  pieChartLegend = true;
  pieChartPlugins = [];

  constructor(
    private sharedService: SharedService,
    private auth: AuthService,
    private expensesService: ExpensesService
  ) {}

  ngOnInit(): void {
    if (this.auth.currentUser !== null) {
      this.expensesService
        .getExpenses(this.auth.currentUser)
        .pipe(takeUntil(this.unSubscribe$))
        .subscribe((expenses) => {
          if (Array.isArray(expenses)) {
            this.expenses = expenses;
            this.filteredExpenses = this.expenses;

            const types = [
              ...new Set(this.expenses.map((expense) => expense.type)),
            ];

            this.typeCounts = types.map((type) => {
              const count = this.expenses.filter(
                (expense) => expense.type === type
              ).length;
              return count;
            });
            this.pieChartLabels = types;
            this.expenseTypeOtions = types;
            this.pieChartDatasets = [
              {
                data: this.typeCounts,
              },
            ];
          }
        });
    }

    this.sharedService.buttonClickEmmiter
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe(() => {
        this.exportToCsv();
      });
  }

  onChange(result: Date[]): void {
    this.date = result;
    this.filterExpenses();
  }

  exportToCsv(): void {
    const data = this.filteredExpenses.map((expense) => {
      return {
        name: expense.name,
        type: expense.type,
        amount: expense.amount,
        date: expense.date.toDateString(),
        description: expense.description,
      };
    });
    const options = {
      headers: ['Name', 'Type', 'Amount', 'Date', 'Description'],
    };
    new ngxCsv(data, 'expenses', options);
  }

  async getExpenses(userId: string): Promise<void> {
    try {
      this.expensesService.getExpenses(userId);
    } catch (error) {}
  }
  filterExpenses(): void {
    if (this.expenseType && this.date.length === 0) {
      this.filteredExpenses = this.expenses.filter((expense) => {
        return expense.type === this.expenseType;
      });
    }
    if (this.expenseType && this.date.length > 0) {
      this.filteredExpenses = this.expenses.filter((expense) => {
        return (
          expense.type === this.expenseType &&
          expense.date >= this.date[0] &&
          expense.date <= this.date[1]
        );
      });
    }
    if (!this.expenseType && this.date.length > 1) {
      this.filteredExpenses = this.expenses.filter((expense) => {
        return expense.date >= this.date[0] && expense.date <= this.date[1];
      });
    }
  }
  resetFilters(): void {
    this.expenseType = '';
    this.date = [];
    this.filteredExpenses = this.expenses;
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
    this.sharedService.setIsVisible(false);
    this.sharedService.setShowCharts(false);
  }
}
