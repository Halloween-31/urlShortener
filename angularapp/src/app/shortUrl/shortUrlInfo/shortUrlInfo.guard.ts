import { Inject, Injectable, numberAttribute } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class shortUrlInfoGuard implements CanActivate {
  constructor(private router: Router, @Inject(AuthService) private authService: AuthService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    /*let param = route.params["id"];
    param = Number(param);
    if (Number.isNaN(param)) {
      return true;
    }
    if (Number.isInteger(param)) {
      console.log("int");
    }*/


    if (await this.authService.checkIsLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/logIn']);
      return false;
    }
  }
}

