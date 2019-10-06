import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'atm-error-message',
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent implements OnInit {
  @Input()
  public error: string;

  public ngOnInit() { }

}
