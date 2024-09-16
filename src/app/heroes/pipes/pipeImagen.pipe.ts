import { Pipe, type PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage',
})
export class PipeImagenPipe implements PipeTransform {

  transform(hero : Hero): string {
    if(!hero.id && !hero.alt_img){
     return 'heroes/no-image.png'
    }
    if(hero.alt_img) return hero.alt_img;
     return `heroes/${hero.id}.jpg`
  }

}

