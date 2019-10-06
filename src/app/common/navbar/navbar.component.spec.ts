import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthState, StateService } from '../state.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let MockStateService;
  let state$;

  beforeEach(async(() => {
    state$ = new BehaviorSubject({ token: null });
    MockStateService = {
      state: state$,
      state$: state$.asObservable(),
    };
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ NavbarComponent ],
      providers: [
        { provide: StateService, useValue: MockStateService }
      ]
    })
    .compileComponents();
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

  it('should display Authorize info when StateService.token is not provided', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    const authInfo = compiled.querySelector('#auth-state');
    expect(authInfo).toBeNull();

    state$.next({ token: '123' });
    tick();
    fixture.detectChanges();
    const authInfoAfter = compiled.querySelector('#auth-state');
    expect(authInfoAfter.textContent).toContain('Authorized');
  }));
});
