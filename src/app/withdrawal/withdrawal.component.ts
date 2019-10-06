import { Component, OnInit } from '@angular/core';
import { WithdrawService } from './withdraw.service';
import { WithDrawalForm } from './withdrawal-form.interface';

@Component({
  selector: 'atm-withdrawal',
  templateUrl: './withdrawal.component.html',
})
export class WithdrawalComponent implements OnInit {
  public withdrawalBreakdown: Array<any>;
  public amountError: string;

  constructor(
    private withdrawService: WithdrawService
  ) {
    this.withdrawalBreakdown = [];
  }

  public ngOnInit() { }

  public onWithdraw(data: WithDrawalForm) {
    this.reset();
    // Simulating possibility that API returns error
    try {
      this.withdrawalBreakdown = this.withdrawService.getNotesBreakdown(data.amount, { skipEmptyNotes: data.hideEmptyNotes });
    } catch (exception) {
      this.amountError = exception.message || exception.name;
    }
  }

  private reset() {
    this.withdrawalBreakdown = [];
    this.amountError = null;
  }
}
