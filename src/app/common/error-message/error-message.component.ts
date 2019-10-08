import { Component, Input } from '@angular/core';

@Component({
  selector: 'atm-error-message',
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input()
  public error: string;
}
