import { heroesService } from './../../services/heroes.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
})
export class NewPageComponent {

  // ahora trbajamos con formulario reactivo
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('',{nonNullable:true}), // le estas dicicendo que no tene que ser nulo
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
    //pero si es un numero
    //alt_img: new FormControl(0),
  }

  );

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

 get currentHero():Hero{
const hero = this.heroForm.value as Hero; // le estas diciendo que lo trates como un Hero
return hero;
 }


 // vamos a utilizar nuestro servicio (atravez de una infeccion)
constructor(private service:heroesService ){}

 onSubmit ():void{
  /* esto es para verificar si los campos estan siendo llenado
   console.log({
  formIsValid: this.heroForm.valid, // aca te va salir true o false depenediento si los parametros estan llenso si estna lleno lo llena con tru
  value:this.heroForm.value,  }) */
  if(this.heroForm.invalid) return ;
 //  this.service.updateHero(this.heroForm.value); // aca tu buscas la forma perfecta pitenes que crear un g
  if(this.currentHero.id){
  this.service.updateHero(this.currentHero)
  .subscribe(hero=>{
//TODO mostrar  (es un mansaje que indaca que el registro fue creado exitosamente)


  });
  return;
  }
  //si no tinees id quiere decir que quieres crear

  this.service.addHero(this.currentHero)
  .subscribe(hero=>{
    //TODO:mostar snackbar y navegar a /herores/edit/hero.id
  })

}


}
