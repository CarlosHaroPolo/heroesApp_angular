import { AuthService } from './auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent   {
  title = 'heroesApp';
  constructor(private AuthService:AuthService){

  }

}
//Este es el punto de entrada de nuestra aplicacion
