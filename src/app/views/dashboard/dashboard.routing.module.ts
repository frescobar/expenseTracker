import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ExpenseComponent } from './expense/expense.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'expenses',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'expenses',
        component: ExpenseComponent,
      },
    ],
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
