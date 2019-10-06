import { inject, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StateService } from './state.service';
import { WithdrawGuard } from './withdraw.guard';

describe('WithdrawGuard', () => {
  let MockStateService;
  let MockRouter;
  let state$;

  beforeEach(() => {
    state$ = new BehaviorSubject({ token: null });
    MockStateService = {
      state: state$,
      state$: state$.asObservable(),
    };
    MockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        WithdrawGuard,
        { provide: StateService, useValue: MockStateService },
        { provide: Router, useValue: MockRouter },
      ]
    });
  });

  it('should initialize guard', inject([WithdrawGuard], (guard: WithdrawGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return true when stateService has token', inject([WithdrawGuard], (guard: WithdrawGuard) => {
    state$.next({ token: '123' });
    guard.canActivate().subscribe(result => {
      expect(result).toEqual(true);
    });
  }));

  it('should return false when stateService does not have token '
  + 'and call router.navigate', inject([WithdrawGuard], (guard: WithdrawGuard) => {
    state$.next({ token: null });
    guard.canActivate().subscribe(result => {
      expect(result).toEqual(false);
      expect(MockRouter.navigate).toHaveBeenCalledWith(['pin-auth']);
    }).unsubscribe();
  }));
});
