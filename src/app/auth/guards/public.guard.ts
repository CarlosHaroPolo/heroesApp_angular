import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class publicGuard implements CanMatch,CanActivate{
  constructor(private authService:AuthService,
    private router:Router,
  ) { }

  checkAuthstatus(): MaybeAsync<GuardResult>
  {
    // true existe false no exite
    return this.authService.checkAuthentication()
    .pipe(
    tap(isAuththenticated =>{
      if(isAuththenticated){
        this.router.navigate(['./heroes/list'])
      }
    }),
    map(isAuththenticated=> !isAuththenticated )

    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.checkAuthstatus();

  }
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.checkAuthstatus();
  }

}
