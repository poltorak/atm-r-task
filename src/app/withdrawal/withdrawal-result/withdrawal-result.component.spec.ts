import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { WithdrawalResultComponent } from './withdrawal-result.component';

describe('WithdrawalResultComponent', () => {
  let component: WithdrawalResultComponent;
  let fixture: ComponentFixture<WithdrawalResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have children element when breakdown result array is empty', () => {
    component.withdrawalBreakdown = [];
    fixture.detectChanges();

    expect(fixture.debugElement.children.length).toBe(0);
  });

  it('should display list of notes from result', () => {
    component.withdrawalBreakdown = [
      { note: 100, notesAmount: 3 },
      { note: 50, notesAmount: 2 },
      { note: 20, notesAmount: 1 },
      { note: 10, notesAmount: 0 },
    ];
    fixture.detectChanges();

    const list = fixture.debugElement.query(By.css('ul'));
    expect(list.children.length).toBe(4);
    expect(list.children[0].nativeElement.textContent).toContain('$100 ×3');
    expect(list.children[1].nativeElement.textContent).toContain('$50 ×2');
    expect(list.children[2].nativeElement.textContent).toContain('$20 ×1');
    expect(list.children[3].nativeElement.textContent).toContain('$10 ×0');
  });
});
