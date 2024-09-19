import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './loginPage.component.html',
})
export class LoginPageComponent {

  constructor(private service:AuthService,
    private router:Router){}

  onLogin():void{
    //OJo en un caso ideal (que no es el caso le
    //enviamos el gmail y la contraseña)
    //en este caso direcatmente se conecta al usario 1
    this.service.login('fernando@gmail.com','123456789')
    .subscribe(user=>{
      this.router.navigate(['/']); // porque ahi te auto redirecciones en router
    })

  }


}


