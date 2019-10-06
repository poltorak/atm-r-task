import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class WithdrawGuard implements CanActivate {
  constructor(
    private stateService: StateService,
    private router: Router
    ) {}

  public canActivate(
    ): Observable<boolean | UrlTree> {
    return this.stateService.state$.pipe(
      map(state => {
        if (state.token) {
          return true;
        }
        this.router.navigate(['pin-auth']);
        return false;
      })
    );
  }

}
