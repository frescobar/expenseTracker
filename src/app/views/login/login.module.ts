import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutes],
})
export class LoginModule {}
