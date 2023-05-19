import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutes, ComponentsModule],
})
export class LoginModule {}
