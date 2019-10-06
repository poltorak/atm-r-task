import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'atm-withdrawal-result',
  templateUrl: './withdrawal-result.component.html',
})
export class WithdrawalResultComponent implements OnInit {
  @Input()
  public withdrawalBreakdown: any[];

  constructor() {
    this.withdrawalBreakdown = [];
  }

  public ngOnInit() { }

}
