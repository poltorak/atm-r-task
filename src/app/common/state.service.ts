import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuthState {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  // tslint:disable-next-line
  private readonly _state: BehaviorSubject<AuthState>;
  public readonly state$: Observable<AuthState>;

  constructor() {
    this._state = new BehaviorSubject({ token: null });
    this.state$ = this._state.asObservable();
  }

  private set state(data: AuthState) {
    this._state.next({ token: data.token });
  }

  public authAction(pin: string): void {
    const isNumerical = !!pin.match(/\d+/);

    if (isNumerical && pin === '0123') {
      this.state = { token: '321' };
    } else {
      throw Error('Unauthorized');
    }
  }

  public destroySessionAction(): void {
    this.state = { token: null };
  }
}
