import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthorizeComponent } from './pin-page/authorize/authorize.component';
import { PinPageComponent } from './pin-page/pin-page.component';

@NgModule({
  declarations: [PinPageComponent, AuthorizeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
