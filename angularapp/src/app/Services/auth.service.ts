import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',       // глобальный сервис
})
export class AuthService {
  private isLoggedIn: boolean;

  constructor(private http: HttpClient) { }

  async checkIsLoggedIn() {
    this.isLoggedIn = await this.http.get<boolean>("/LogIn").toPromise();      

    return this.isLoggedIn;
  }
}
