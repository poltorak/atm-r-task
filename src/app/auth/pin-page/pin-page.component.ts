import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../common/state.service';
import { AuthForm } from './auth-form.interface';

@Component({
  selector: 'atm-pin-page',
  templateUrl: './pin-page.component.html',
})
export class PinPageComponent implements OnInit {
  public error: string;

  constructor(
    private authSerivce: StateService,
    private router: Router
  ) {}

  public ngOnInit() { }

  public onAuthorize(data: AuthForm) {
    this.error = '';
    try {
      this.authSerivce.authAction(data.pin.toString());
      this.router.navigate(['withdrawal']);
    } catch (exception) {
      this.error = exception.message === 'Unauthorized' ? 'Invalid PIN' : exception.message;
    }
  }

}
