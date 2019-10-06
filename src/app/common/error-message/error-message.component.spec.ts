import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
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
