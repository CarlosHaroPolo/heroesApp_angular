import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environments.baseUrl;
  //cuadno se carga por primera ves va ser nulo
  private user?: User;
  constructor(private http: HttpClient) { }
//esto te va dar acceso a user
  get currentUser(): User | undefined {
    if (!this.user) return undefined
    // return this.user
    //  return  {...this.user};
    // el de abajo hace un clon del mismo
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    //esto es de manera ideal :this.http('login',{email,password})
    //lo siguiente es una manera no ideal (porque el obejtivo es parender guards)
    //vas a traer infromacin del user 1
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user), // el tap no cambia el flujo normal e tu observable
        tap(user => localStorage.setItem('token', 'asdasdd.sdasd.sdadxc'))
      //  tap(user => localStorage.setItem('token', user.id.toString()))  //guardas en el localstorage
      )

  }
// este es para salir del login borrando el user ademas de climpiar el localstorage
logout(){
this.user=undefined;
localStorage.clear();
}

 // este es para ver si tiene tocken a la oread e reiniciar no se cierre la cuenta
 checkAuthentication():Observable<boolean>{
  if(!localStorage.getItem('token')) return of(false) // el of lo trasforma en un observable
  const token = localStorage.getItem('token');

  return  this.http.get<User>(`${this.baseUrl}/users/1`)
  .pipe(
    tap(user=>this.user= user),
    map(user=>!!user),
    catchError(err =>of(false) )
  )

  }


}
