import { Injectable, inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

export const shortUrlGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const queryParams = route.queryParams;
  if (Object.keys(queryParams).length == 0) {
    return true;
  }
  const authService = inject(AuthService);    // получаем сервис
  return authService.isLoggedIn;
};
