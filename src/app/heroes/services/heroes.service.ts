import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class heroesService {
  private baseUrl:string = environments.baseUrl;

  constructor(private http: HttpClient) { }


 getHeroes():Observable<Hero[]>{
   return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
 }
 getHeroById (id:string):Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError(error=>of(undefined))); // el of es para crear un boserbable
 }

 getSuggestions(query:string):Observable<Hero[]>{
  return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)

    }
 addHero(hero:Hero):Observable<Hero>{
   return this.http.post<Hero>(`${this.baseUrl}/heroes`,hero); //le das la url ademas le vas a entregar el body para agregar el hero
 }
 //updateHero con el patch (actualizar parcialmente no quiero destruir solo quiero caer a los registrso)
 updateHero(hero:Hero):Observable<Hero>{
  if(!hero.id) throw Error("hero id is required")
  return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero); //le das la url ademas le vas a entregar el body para agregar el hero
}
 deleteHero(id:string):Observable<boolean>{
  // el delid envia un estatu 404
    return this.http.delete<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError(err=> of(false)),
      map(resp=>true )  // me sirve para trasformar la respuesta
    )

 }
}
