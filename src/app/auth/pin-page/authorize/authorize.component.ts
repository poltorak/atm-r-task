import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthForm } from '../auth-form.interface';

@Component({
  selector: 'atm-authorize',
  templateUrl: './authorize.component.html',
})
export class AuthorizeComponent implements OnInit {
  @Output()
  public authorize: EventEmitter<AuthForm>;
  public form: FormGroup;

  constructor() {
    this.authorize = new EventEmitter();
    this.form = new FormGroup({
      pin: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern(/\d{4}/)
      ])
    });
  }

  public ngOnInit() { }

  public onSubmit() {
    this.authorize.emit(this.form.value);
  }

  get pin() {
    return this.form.get('pin');
  }

}
