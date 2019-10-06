import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AuthorizeComponent } from './authorize.component';

describe('AuthorizeComponent', () => {
  let component: AuthorizeComponent;
  let fixture: ComponentFixture<AuthorizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have disabled authorize button at the start', () => {
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button[type="submit"]');

    expect(button.disabled).toBeTruthy();
  });

  it('should set class "is-danger" when pin input is invalid', () => {
    const compiled = fixture.debugElement.nativeElement;
    const input = compiled.querySelector('input');
    const pinControl = component.form.get('pin');

    pinControl.setValue('asd');
    pinControl.markAsTouched();
    fixture.detectChanges();

    expect(input.classList.contains('is-danger')).toBe(true);
  });

  it('should call emit when valid form is submitted', () => {
    component.authorize.emit = jasmine.createSpy('emit');

    const form = fixture.debugElement.query(By.css('form'));
    const pinControl = component.form.get('pin');

    pinControl.setValue('0123');
    pinControl.markAsTouched();
    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(component.authorize.emit).toHaveBeenCalledWith({ pin: '0123'});
  });
});
