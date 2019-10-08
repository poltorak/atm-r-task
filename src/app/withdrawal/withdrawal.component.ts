import { Component } from '@angular/core';
import { NotesBreakdownResult, WithdrawService } from './withdraw.service';
import { WithDrawalForm } from './withdrawal-form.interface';

@Component({
  selector: 'atm-withdrawal',
  templateUrl: './withdrawal.component.html',
})
export class WithdrawalComponent {
  public withdrawalBreakdown: NotesBreakdownResult[];
  public amountError: string;

  constructor(
    private withdrawService: WithdrawService
  ) {
    this.withdrawalBreakdown = [];
  }

  public onWithdraw(data: WithDrawalForm): void {
    this.reset();
    // Simulating possibility that API returns error
    try {
      this.withdrawalBreakdown = this.withdrawService.getNotesBreakdown(data.amount, { skipEmptyNotes: data.hideEmptyNotes });
    } catch (exception) {
      this.amountError = exception.message || exception.name;
    }
  }

  private reset(): void {
    this.withdrawalBreakdown = [];
    this.amountError = null;
  }
}
