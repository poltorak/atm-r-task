import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StateService } from '../state.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let state$;
  let MockStateService;
  let MockRouter;

  beforeEach(async(() => {
    state$ = new BehaviorSubject({ token: null });
    MockStateService = {
      state: state$,
      state$: state$.asObservable(),
      destroySessionAction: jasmine.createSpy('destroySessionAction')
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ NavbarComponent ],
      providers: [
        { provide: StateService, useValue: MockStateService },
      ]
    })
    .compileComponents();

    MockRouter = TestBed.get(Router);
    MockRouter.navigate = jasmine.createSpy('navigate');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isBurgerMenuActive on click on burger', () => {
    const compiled = fixture.debugElement.nativeElement;
    const toggleButton = compiled.querySelector('.navbar-burger');

    expect(component.isBurgerMenuActive).toBe(false);
    toggleButton.click();
    fixture.detectChanges();
    expect(component.isBurgerMenuActive).toBe(true);
  });

  it('should not display Authorize info when StateService.token is not provided', () => {
    const compiled = fixture.debugElement.nativeElement;
    const authInfo = compiled.querySelector('#auth-state');
    expect(authInfo).toBeNull();
  });

  it('should display Authorize info when StateService.token is provided', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    const authInfo = compiled.querySelector('#auth-state');
    expect(authInfo).toBeNull();

    state$.next({ token: '123' });
    tick();
    fixture.detectChanges();
    const authInfoAfter = compiled.querySelector('#auth-state');
    expect(authInfoAfter.textContent).toContain('Authorized');
  }));

  it('should not display logout button when user is not authorized', () => {
    const logoutBtn = fixture.debugElement.query(By.css('#logout'));

    expect(logoutBtn).toBeNull();
  });

  it('should display logout button when user is authorized', fakeAsync(() => {
    state$.next({ token: '123' });
    tick();
    fixture.detectChanges();

    const logoutBtn = fixture.debugElement.query(By.css('#logout'));
    expect(logoutBtn).toBeDefined();
  }));

  it('should call State service in orde to destroy service and redirect to auth page when user is authorized', fakeAsync(() => {
    state$.next({ token: '123' });
    tick();
    fixture.detectChanges();

    const logoutBtn = fixture.debugElement.query(By.css('#logout'));

    logoutBtn.triggerEventHandler('click', null);
    expect(MockStateService.destroySessionAction).toHaveBeenCalled();
    expect(MockRouter.navigate).toHaveBeenCalledWith(['']);
  }));
});
