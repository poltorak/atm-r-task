import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PinPageComponent } from './auth/pin-page/pin-page.component';
import { WithdrawGuard } from './common/withdraw.guard';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';

const routes: Routes = [
  { path: '', redirectTo: 'pin-auth', pathMatch: 'full'},
  { path: 'pin-auth', component: PinPageComponent },
  { path: 'withdrawal', component: WithdrawalComponent, canActivate: [WithdrawGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
