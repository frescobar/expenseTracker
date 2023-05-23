import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ChartOptions } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { Expense } from 'src/app/models/Expense';
import { AuthService } from 'src/app/services/auth.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent {
  isVisible$ = this.sharedService.isVisible$;
  showCharts$ = this.sharedService.showCharts$;
  currentUser: User | null = null;
  expenses: Expense[] = [];
  unSubscribe$ = new Subject();
  typeCounts: number[] = [];
  types: string[] = [];
  pieChartLabels: string[] = [];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartDatasets = [
    {
      data: this.typeCounts,
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private sharedService: SharedService,
    private auth: AuthService,
    private expensesService: ExpensesService
  ) {}
  ngOnInit(): void {
    if (this.auth.currentUser) {
      this.expensesService
        .getExpenses(this.auth.currentUser)
        .pipe(takeUntil(this.unSubscribe$))
        .subscribe((expense) => {
          this.expenses = expense;
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
          this.pieChartDatasets = [
            {
              data: this.typeCounts,
            },
          ];
        });
    }
  }

  openModal(): void {
    this.sharedService.setIsVisible(true);
  }

  async getExpenses(userId: string): Promise<void> {
    try {
      await this.expensesService.getExpenses(userId);
    } catch (error) {}
  }

  showCharts(): void {
    this.sharedService.setShowCharts(true);
  }
  showDashboard(): void {
    this.sharedService.setShowCharts(false);
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }
}
