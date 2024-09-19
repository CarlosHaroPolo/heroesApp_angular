import { heroesService } from './../../services/heroes.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {
  //searchInput.value es el encargado de mostrarme lo que esta en la caja
  public searchInput  = new FormControl(''); // estas que inicializas con ''
  public heroes:Hero[]=[];

  public selectHero ?:Hero; // este es la informacion del hero seleccionado

constructor(
  private service:heroesService,
  private router:Router
){

}
//------------------------------
  searchHero(){
    const value:string= this.searchInput.value ||'';
    this.service.getSuggestions(value)
    .subscribe(heroes=> this.heroes= heroes

    );
  }
  // este metodo es propio de angular materiasl
  onSelectedOption(event:MatAutocompleteSelectedEvent):void{
   //  console.log(event.option.value)
   if(!event.option.value){
     this.selectHero = undefined;
     return
   }
  const hero:Hero = event.option.value;
  this.searchInput.setValue(hero.superhero); // este es para poner el nombre que estas buscando
  this.selectHero= hero;
  }
//------------------------------

  goBack(){
  this.router.navigateByUrl('heroes/list');
  }

}
