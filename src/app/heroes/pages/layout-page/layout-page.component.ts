import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
})
export class LayoutPageComponent {
    public sideBarItems =[
      {label:'Listado',icon:'label',url:'./list'},
      {label:'Añadir',icon:'add',url:'./new-hero'},
      {label:'Buscar',icon:'search',url:'./search'},
    ]

    constructor(private authService:AuthService,
      private router:Router
    ){

    }
  //Con este tendremos acceso a la informacion de nuestro USer
    get user():User | undefined{
      return this.authService.currentUser;

    }

   //este es para salir
    onLogout(){
  this.authService.logout();
this.router.navigate(['/auth/login'])
    }
 }
