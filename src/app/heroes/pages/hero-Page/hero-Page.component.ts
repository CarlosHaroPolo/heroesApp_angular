import { heroesService } from './../../services/heroes.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-Page.component.html',
})
export class HeroPageComponent implements OnInit {

  public hero?:Hero; // es opcional

  constructor(
    private heroesService:heroesService,
    private ActivatedRoute:ActivatedRoute  ,// este es omportante
    private router: Router,
  ){
    // esto es para leer la url
  }
  ngOnInit(): void {
  // antes que nada primero hay que tener que leer el id que nos an enviado
  this.ActivatedRoute.params.pipe(
  switchMap(({id})=>this.heroesService.getHeroById(id) )  // sirve para agarrar los params peros olo quiero agarar el id
  ).subscribe(hero=>{ // tecnicamente te devuelve los params
     if(!hero) return   this.router.navigate(['/heroes/list']);   // si no tiene tienes que redireccinarlo con agular router
      this.hero = hero;
      return;
  })
  }

}
