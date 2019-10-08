import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState, StateService } from '../state.service';

@Component({
  selector: 'atm-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public state$: Observable<AuthState>;
  public isBurgerMenuActive: boolean;

  constructor(
    private stateService: StateService,
    private router: Router
    ) {
    this.isBurgerMenuActive = false;
    this.state$ = this.stateService.state$;
  }

  // TODO check state should be in on init
  public ngOnInit(): void { }

  public toggleBurger(): void {
    this.isBurgerMenuActive = !this.isBurgerMenuActive;
  }

  public destroySession(): void {
    this.router.navigate(['']);
    this.stateService.destroySessionAction();
  }

}
