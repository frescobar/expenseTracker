import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutes } from './register.routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutes],
})
export class RegisterModule {}
