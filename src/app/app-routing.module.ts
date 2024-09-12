import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/page/error404-page/error404-page.component';

const routes: Routes = [{
 path:'auth',
 loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
},
{
  path:'heroes',
  loadChildren:()=>import('./heroes/heroes.module').then(m=>m.HeroesModule)
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
