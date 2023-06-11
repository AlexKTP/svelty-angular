import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, map, of, tap } from "rxjs";
import { AuthService } from "../services/auth-service/auth-service.service";

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.checkToken()
        .pipe(
            map((value) => {
                if (value != null && value.token != null) {
                    localStorage.setItem('svelty-token', value.token);
                }
                return true;
            }),
            catchError((error) => {
                console.log(error)
                router.navigate(['/']);
                localStorage.clear();
                return of(false);
            })
        )
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);