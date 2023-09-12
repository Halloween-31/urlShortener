import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',       // глобальный сервис
})
export class AuthService {
  isLoggedIn = false;
  login(): void { this.isLoggedIn = true; }
  logout(): void { this.isLoggedIn = false; }
}
