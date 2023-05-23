import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Expense } from 'src/app/models/Expense';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss'],
})
export class ExpenseDetailsComponent {
  @Input() expenseDetails: Expense | undefined;

  constructor(
    private expensesService: ExpensesService,
    private toastService: ToastrService
  ) {}

  async delete(id: string) {
    try {
      await this.expensesService.deleteExpense(id);
      this.toastService.success('Expense deleted successfully');
    } catch (err) {
      this.toastService.success('Could not delete expense');
    }
  }
  cancel() {}
}
