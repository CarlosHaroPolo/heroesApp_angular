import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

import { MatDialog } from '@angular/material/dialog';

@Injectable({providedIn: 'root'})
export class heroesService {
  private baseUrl:string = environments.baseUrl;

  // tienes que inyectarlo
  constructor(private http: HttpClient) { }



// Este es para buscar dependiendo el url
 getHeroById (id:string):Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    // que pasa si viene un id que no existe para eso utiliza los pipe
    .pipe(
      catchError(error=>of(undefined))); // el of es para crear un boserbable
                      // este of: es la forma de crear observable
    }

//----------------------------------------------------------------------------------------

 getSuggestions(query:string):Observable<Hero[]>{
  return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
    }


//_______________________________________________________________________________________
//listar
getHeroes():Observable<Hero[]>{
  return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
}

//agregar
 addHero(hero:Hero):Observable<Hero>{
   return this.http.post<Hero>(`${this.baseUrl}/heroes`,hero); //le das la url ademas le vas a entregar el body para agregar el hero
 }
 //ACTUALIZAR
 //updateHero con el patch (actualizar parcialmente no quiero destruir solo quiero caer a los registrso)
 updateHero(hero:Hero):Observable<Hero>{
  if(!hero.id) throw Error("hero id is required")
  return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero); //le das la url ademas le vas a entregar el body para agregar el hero
}
//ELIMINAR
deleteHeroById(id:string):Observable<boolean>{
  // el delid envia un estatu 404
    return this.http.delete<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      map(resp=>true ),  // me sirve para trasformar la respuesta
      catchError(err=> of(false)),
    )

 }

}
