import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
 }
