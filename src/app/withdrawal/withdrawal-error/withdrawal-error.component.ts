import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'atm-withdrawal-error',
  templateUrl: './withdrawal-error.component.html',
})
export class WithdrawalErrorComponent implements OnInit {
  @Input()
  public error: string;

  public ngOnInit() { }

}
