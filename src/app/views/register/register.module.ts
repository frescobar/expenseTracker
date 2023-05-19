import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutes } from './register.routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutes, ComponentsModule],
})
export class RegisterModule {}
