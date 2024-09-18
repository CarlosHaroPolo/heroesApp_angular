import { heroesService } from './../../services/heroes.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirmDialog/confirmDialog.component';
@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
})
export class NewPageComponent implements OnInit{

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
constructor(private service:heroesService,

  private activatedRoute:ActivatedRoute,
  private router : Router,

//angular material ya tine todo para que trabajes
  private snackbar:MatSnackBar, // nos perminte hacer todo tipo de snackbar
  private dialog:MatDialog
){}



ngOnInit(): void {
  // Verifica si está en modo editar o en modo añadir
  if (!this.router.url.includes('edit')) {
    return; // Termina la ejecución si no está en modo editar
  }

  this.activatedRoute.params.pipe(
    switchMap(params => this.service.getHeroById(params['id']))
  ).subscribe(hero => {
    if (!hero) {
      return this.router.navigateByUrl('/'); // Redirige si no se encuentra el héroe

    }
    // this.heroForm.setValue({}) tines que indicar cada uno de los parametros pero hay otro mejor que esta abajo
    this.heroForm.reset(hero); // este se encarga de limpiar
    return;
    // Aquí puedes añadir más lógica si el héroe sí se encuentra
  });
}

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
this.showSnackbar(`${hero.superhero} updated!`);

  });
  return;
  }
  //si no tinees id quiere decir que quieres crear

  this.service.addHero(this.currentHero)
  .subscribe(hero =>{
    //TODO:mostar snackbar y navegar a /herores/edit/hero.id
    this.showSnackbar(`${hero.superhero} created!`);
    this.router.navigate(['/heroes/edit',hero.id])

  })

}


showSnackbar(message :string):void{
                    //mensaje -Acccion- ciertos parametros
  this.snackbar.open(message,'done',{
    duration:2500,
  })
}

onDeleteHero():void{
  if(!this.currentHero.id) throw Error('error');
                                  //es un componentes de angular
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data:this.heroForm.value,
  });



//ESTO ESTA BIEN PERO VAMOS A EVITAR TERNER UN SUSCRIBE DENTRO DE OTOR SUBCRIBE

/*
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if (result !== undefined) {
      //

      this.service.deleteHeroById(this.currentHero.id)
      .subscribe(wasDeleted=>{
        if(wasDeleted)
          this.router.navigateByUrl('/heroes/list')

      })
    }
  });
*/

dialogRef.afterClosed()
.pipe(
  // aplicamos un filter de rxjs
  filter((result:boolean) =>result), // si se cumple te deja pasar si no no te deja pasar
  switchMap(()=>this.service.deleteHeroById(this.currentHero.id)),
  //ahora desde aca ya sabemos que fue eliminado correctamente
  filter((wasDeleted:boolean)=>wasDeleted),
)
.subscribe(() => {
  this.router.navigate(['/heroes'])
})


}
// -----------

}
