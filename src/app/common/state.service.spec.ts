import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { StateService } from './state.service';

describe('StateService', () => {
  let service: StateService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error when given pin is invalid', () => {
    expect(() => { service.authAction('3333'); }).toThrowError('Unauthorized');
  });

  it('should set token in observable when pin is correct', () => {
    service.authAction('0123');
    service.state$.subscribe(state => {
      expect(state.token).toEqual('321');
    })
    .unsubscribe();
  });

  it('should set token to null after destroying session', () => {
    service.authAction('0123');
    service.state$.subscribe(state => {
      expect(state.token).toEqual('321');
    })
    .unsubscribe();

    service.destroySession();
    service.state$.subscribe(state => {
      expect(state.token).toBeNull();
    })
    .unsubscribe();
  });
});
