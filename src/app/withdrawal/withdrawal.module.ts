import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { WithdrawService } from './withdraw.service';
import { WithdrawalErrorComponent } from './withdrawal-error/withdrawal-error.component';
import { WithdrawalFormComponent } from './withdrawal-form/withdrawal-form.component';
import { WithdrawalResultComponent } from './withdrawal-result/withdrawal-result.component';
import { WithdrawalComponent } from './withdrawal.component';

@NgModule({
  declarations: [WithdrawalComponent, WithdrawalFormComponent, WithdrawalResultComponent, WithdrawalErrorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    WithdrawService
  ]
})
export class WithdrawalModule { }
