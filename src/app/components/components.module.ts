import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { NewExpenseFormComponent } from './new-expense-form/new-expense-form.component';
import { ModalComponent } from './modal/modal.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSpinModule,
    NzIconModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzDividerModule,
    NzTypographyModule,
    NzPopconfirmModule,
  ],
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    SidemenuComponent,
    DashboardHeaderComponent,
    NewExpenseFormComponent,
    ModalComponent,
    ExpenseDetailsComponent,
  ],
  exports: [
    LoginFormComponent,
    RegisterFormComponent,
    SidemenuComponent,
    DashboardHeaderComponent,
    NewExpenseFormComponent,
    ModalComponent,
    ExpenseDetailsComponent,
  ],
})
export class ComponentsModule {}
