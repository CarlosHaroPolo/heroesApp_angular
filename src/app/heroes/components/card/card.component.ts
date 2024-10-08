import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';


@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',

})
export class CardComponent implements  OnInit{
  ngOnInit(): void {
 if(!this.hero) throw Error("Hero Property required")
  }
  @Input()
  public hero!:Hero;
 }
