import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../common/common.module';
import { WithdrawService } from './withdraw.service';
import { WithdrawalFormComponent } from './withdrawal-form/withdrawal-form.component';
import { WithdrawalResultComponent } from './withdrawal-result/withdrawal-result.component';
import { WithdrawalComponent } from './withdrawal.component';

@NgModule({
  declarations: [WithdrawalComponent, WithdrawalFormComponent, WithdrawalResultComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    WithdrawService
  ]
})
export class WithdrawalModule { }
