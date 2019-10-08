import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { WithDrawalForm } from '../withdrawal-form.interface';

@Component({
  selector: 'atm-withdrawal-form',
  templateUrl: './withdrawal-form.component.html',
})
export class WithdrawalFormComponent {
  @Output()
  public withdraw: EventEmitter<WithDrawalForm>;
  public form: FormGroup;

  constructor() {
    this.withdraw = new EventEmitter();
    this.form = new FormGroup({
      amount: new FormControl('', [Validators.pattern(/\d+/)]),
      hideEmptyNotes: new FormControl(false),
    });
  }

  public onSubmit(): void {
    this.withdraw.emit(this.form.value);
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }

}
