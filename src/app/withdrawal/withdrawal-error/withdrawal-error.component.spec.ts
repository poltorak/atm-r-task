import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { WithdrawalErrorComponent } from './withdrawal-error.component';

describe('WithdrawalErrorComponent', () => {
  let component: WithdrawalErrorComponent;
  let fixture: ComponentFixture<WithdrawalErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty template when error input is empty', () => {
    component.error = '';
    fixture.detectChanges();
    expect(fixture.debugElement.children.length).toBe(0);
  });

  it('should display provided error message', () => {
    component.error = 'Invalid';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('div')).nativeElement.textContent).toContain('Invalid');
    expect(fixture.debugElement.children.length).toBeGreaterThan(0);
  });
});
