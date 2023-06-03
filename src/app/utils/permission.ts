import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthServiceComponent } from "../services/auth-service/auth-service.component";
import { catchError, map, of } from "rxjs";

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthServiceComponent);
    const router = inject(Router);

    return authService.checkToken().pipe(
        map(() => true),
        catchError((error) => {
            console.log(error)
            router.navigate(['/']);
            return of(false);
        })
    );
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);