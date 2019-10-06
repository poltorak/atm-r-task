import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
  ],
  declarations: [
    NavbarComponent,
    ErrorMessageComponent,
  ],
  exports: [
    NavbarComponent,
    ErrorMessageComponent
  ]
})
export class AppCommonModule { }
