import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedIn()) { 

    const decodedToken = authService.decodeToken();
    const userRole = decodedToken.role as 'Admin' | 'User';

    const requiredRoles: string[] = route.data['roles'] || [];

    if (requiredRoles.length === 0 || requiredRoles.includes(userRole)) {
      return true;
    } else {
      return router.parseUrl(`/auth?redirectUrl=${state.url}`);
    }
  } else {
    router.navigateByUrl(`/auth?redirectUrl=${state.url}`);
    return false;
  }
};
