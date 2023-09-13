import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class shortUrlInfoGuard implements CanActivate {
  constructor(private router: Router, @Inject(AuthService) private authService: AuthService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (await this.authService.checkIsLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/logIn']);
      return false;
    }
  }
}

