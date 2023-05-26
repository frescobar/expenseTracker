import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ComponentsModule } from 'src/app/components/components.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ExpenseComponent } from './expense/expense.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NgChartsModule } from 'ng2-charts';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
  declarations: [DashboardComponent, ExpenseComponent],
  imports: [
    CommonModule,
    DashboardRoutes,
    NzLayoutModule,
    NzMenuModule,
    ComponentsModule,
    NzIconModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NgChartsModule,
    NzTypographyModule,
    NzSelectModule,
    NzDatePickerModule,
    FormsModule,
    NzResultModule,
  ],
  exports: [DashboardComponent, ExpenseComponent],
})
export class DashboardModule {}
