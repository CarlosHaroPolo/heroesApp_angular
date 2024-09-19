import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/page/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { publicGuard } from './auth/guards/public.guard';

const routes: Routes = [{
 path:'auth',
                         // primero le indicas el module de tu hija
 loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),
 canActivate:[publicGuard],
  canMatch:[publicGuard]
},                                            //luego vez que module vas a utilizar
{
  path:'heroes',
  loadChildren:()=>import('./heroes/heroes.module').then(m=>m.HeroesModule),
  //Aca le dices que guards vas a utilizar
  canActivate:[AuthGuard],
  canMatch:[AuthGuard]

 },
 {
  path:'404',
  component:Error404PageComponent
 },{
  path:'',
  redirectTo:'heroes',
  pathMatch:'full' // le estas diciendo que la direccion url a que le vas a mandar deve estar completamentevacia
 },
 {
  path:'**',
  redirectTo:'404'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
