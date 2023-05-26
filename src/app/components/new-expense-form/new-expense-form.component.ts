import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ExpensesService } from 'src/app/services/expenses.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-expense-form',
  templateUrl: './new-expense-form.component.html',
  styleUrls: ['./new-expense-form.component.scss'],
})
export class NewExpenseFormComponent {
  isConfirmLoading = false;
  expensesForm: FormGroup;

  expensesTypes = [
    { id: self.crypto.randomUUID(), label: 'Food', value: 'food' },
    { id: self.crypto.randomUUID(), label: 'Transport', value: 'transport' },
    {
      id: self.crypto.randomUUID(),
      label: 'Entertainment',
      value: 'entertainment',
    },
    { id: self.crypto.randomUUID(), label: 'Health', value: 'health' },
    { id: self.crypto.randomUUID(), label: 'Education', value: 'education' },
    { id: self.crypto.randomUUID(), label: 'Shopping', value: 'shopping' },
    { id: self.crypto.randomUUID(), label: 'Bills', value: 'bills' },
    { id: self.crypto.randomUUID(), label: 'Gifts', value: 'gifts' },
    { id: self.crypto.randomUUID(), label: 'Other', value: 'other' },
  ];

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private expensesService: ExpensesService,
    private afAuth: Auth,
    private toastrService: ToastrService
  ) {
    this.expensesForm = this.fb.group({
      name: ['', Validators.required],
      amount: [null, Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.maxLength(30)],
    });
  }
  async submitForm(): Promise<void> {
    if (this.expensesForm.valid) {
      this.isConfirmLoading = true;
      try {
        const expensePayload = {
          ...this.expensesForm.value,
          date: new Date(this.expensesForm.value.date).toISOString(),
          userId: this.afAuth.currentUser?.uid,
        };
        const res = await this.expensesService.addExpense(expensePayload);
        this.toastrService.success('Expense added successfully');
        this.isConfirmLoading = false;
        this.closeModal();
        console.log(res);
      } catch (error) {
        console.log(error);
        this.toastrService.error('Something went wrong');
        this.isConfirmLoading = false;
        this.closeModal();
      }
    }
  }
  closeModal(): void {
    this.sharedService.setIsVisible(false);
  }
  formatCurrency = (value: NzSafeAny) => (value ? value.toFixed(2) : '');
  parseCurrency = (value: NzSafeAny) => (value ? value.toString() : '');
  disabledDate = (current: Date): boolean => current > new Date();

  ngOnDestroy(): void {
    this.closeModal();
  }
}
