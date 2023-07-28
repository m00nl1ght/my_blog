import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication-service/authentication.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {

//   if(auth.isAuthenticated()) {
//     this.router.na
//   }
//   return true;
// };

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
