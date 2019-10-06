import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { WithdrawalFormComponent } from './withdrawal-form.component';

describe('WithdrawalFormComponent', () => {
  let component: WithdrawalFormComponent;
  let fixture: ComponentFixture<WithdrawalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ WithdrawalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have disabled submit button at the start', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should set class "is-danger" when amount input is invalid', () => {
    const input = fixture.debugElement.query(By.css('input[type="number"]'));
    const amountControl = component.form.get('amount');

    amountControl.setValue('abs');
    amountControl.markAsTouched();
    fixture.detectChanges();

    expect(input.nativeElement.classList.contains('is-danger')).toBeTruthy();
  });

  it('should call emit when valid form is submitted', () => {
    component.withdraw.emit = jasmine.createSpy('emit');

    const form = fixture.debugElement.query(By.css('form'));
    const amountControl = component.form.get('amount');

    amountControl.setValue('130');
    amountControl.markAsTouched();
    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(component.withdraw.emit).toHaveBeenCalledWith({ amount: '130', hideEmptyNotes: false });
  });
});
