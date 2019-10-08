import { Component, Input } from '@angular/core';
import { NotesBreakdownResult } from '../withdraw.service';

@Component({
  selector: 'atm-withdrawal-result',
  templateUrl: './withdrawal-result.component.html',
})
export class WithdrawalResultComponent {
  @Input()
  public withdrawalBreakdown: NotesBreakdownResult[];

  constructor() {
    this.withdrawalBreakdown = [];
  }
}
