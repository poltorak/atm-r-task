import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/common/state.service';
import { PinPageComponent } from './pin-page.component';

describe('PinPageComponent', () => {
  let component: PinPageComponent;
  let fixture: ComponentFixture<PinPageComponent>;
  let MockStateService: StateService;
  let MockRouter: Router;

  beforeEach(async(() => {
    MockRouter = {
      navigate: jasmine.createSpy('navigate')
    } as any as Router;
    MockStateService = {
      authAction: jasmine.createSpy('authAction')
        .withArgs('0123').and.callFake(() => {})
        .withArgs('invalid').and.throwError('Unauthorized')
        .withArgs('other_invalid').and.throwError('Unhandled error')
    } as any as StateService;
    TestBed.configureTestingModule({
      declarations: [ PinPageComponent ],
      providers: [
        { provide: StateService, useValue: MockStateService },
        { provide: Router, useValue: MockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onAuthorize', () => {
    it('should reset error message', () => {
      component.error = 'error message';
      component.onAuthorize({ pin: '0123' });
      fixture.detectChanges();

      expect(component.error).toEqual('');
    });

    it('should call router navigate', () => {
      component.onAuthorize({ pin: '0123' });
      fixture.detectChanges();

      expect(MockRouter.navigate).toHaveBeenCalledWith(['withdrawal']);
    });

    it('should set error message to Invalid PIN when thrown error message is Unauthorized', () => {
      component.onAuthorize({ pin: 'invalid' });
      fixture.detectChanges();

      expect(component.error).toEqual('Invalid PIN');
    });

    it('should set error message from thrown error', () => {
      component.onAuthorize({ pin: 'other_invalid' });
      fixture.detectChanges();

      expect(component.error).toEqual('Unhandled error');
    });

  });
});
