import { AuthService } from './../services/auth.service';


// los guards son servicios para que se a un guard tines que implementar una interface POR LO MENOS
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard  implements CanMatch,CanActivate{

  constructor(private AuthService:AuthService,
    private router:Router
  ) { }

private checkAuthstatus():MaybeAsync<GuardResult>{
  return this.AuthService.checkAuthentication()
  .pipe(
    tap(isAuththenticated=>{
        // si no esta autentificado
      if(!isAuththenticated){
        this.router.navigate(['./auth/login'])
      }
    }
    ),
    // si esta autenticado muesta esto:
    tap(isAuththenticated=>console.log(isAuththenticated))
  )
}

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
  // si es true muestras pero si es false no muestras
   // console.log('Can Match');
   // console.log(route, segments);
   // return of(false);
   return this.checkAuthstatus();

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

   // console.log('Can Activate');

    //console.log(route,state);

    //return of(true);
    return this.checkAuthstatus();

  }

}
