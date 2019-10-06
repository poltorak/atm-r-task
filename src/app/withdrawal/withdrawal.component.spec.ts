import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InvalidArgumentException, NoteUnavailableException, WithdrawService } from './withdraw.service';
import { WithdrawalComponent } from './withdrawal.component';

describe('WithdrawalComponent', () => {
  let component: WithdrawalComponent;
  let fixture: ComponentFixture<WithdrawalComponent>;
  let MockWithdrawService: WithdrawService;
  const breakdownResult = [
          { note: 100, notesAmount: 1 },
      { note: 50, notesAmount: 1 },
      { note: 20, notesAmount: 0 },
      { note: 10, notesAmount: 1 },
        ];

  beforeEach(async(() => {

    MockWithdrawService = {
      getNotesBreakdown: jasmine.createSpy('getNotesBreakdown')
        .withArgs(160, jasmine.any(Object)).and.returnValue(breakdownResult)
        .withArgs(-100, jasmine.any(Object)).and.callFake(() => { throw new InvalidArgumentException(); })
        .withArgs(105, jasmine.any(Object)).and.callFake(() => { throw new NoteUnavailableException(); })
    } as any as WithdrawService;
    TestBed.configureTestingModule({
      declarations: [ WithdrawalComponent ],
      providers: [
        { provide: WithdrawService, useValue: MockWithdrawService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Withdraw service and assign result withdrawalBreakdown', () => {
    component.onWithdraw({ amount: 160, hideEmptyNotes: false });
    fixture.detectChanges();

    expect(MockWithdrawService.getNotesBreakdown).toHaveBeenCalledWith(160, { skipEmptyNotes: false });
    expect(component.withdrawalBreakdown).toEqual(breakdownResult);
  });

  it('should catch error when given amount is negative and set amountError', () => {
    component.onWithdraw({ amount: -100, hideEmptyNotes: false });
    fixture.detectChanges();

    expect(MockWithdrawService.getNotesBreakdown).toHaveBeenCalledWith(-100, { skipEmptyNotes: false });
    expect(component.withdrawalBreakdown).toEqual([]);
    expect(component.amountError).toBe('InvalidArgumentException');
  });

  it('should catch error when given amount is not dividable by 10 and set amountError', () => {
    component.onWithdraw({ amount: 105, hideEmptyNotes: false });
    fixture.detectChanges();

    expect(MockWithdrawService.getNotesBreakdown).toHaveBeenCalledWith(105, { skipEmptyNotes: false });
    expect(component.withdrawalBreakdown).toEqual([]);
    expect(component.amountError).toBe('NoteUnavailableException');
  });
});
