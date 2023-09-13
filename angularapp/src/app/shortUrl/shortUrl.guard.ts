import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class shortUrlGuard implements CanActivate {
  constructor(private router: Router, @Inject(AuthService) private authService: AuthService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {    
    const queryParams = route.queryParams;
    if (Object.keys(queryParams).length == 0) {
      return true;
    }
    //const authService = inject(AuthService);    // получаем сервис
    if (await this.authService.checkIsLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/logIn']);
      return false;
    }    
  }
}

