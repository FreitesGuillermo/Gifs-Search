import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-gifs',
  templateUrl: './card-gifs.component.html',
})
export class CardGifsComponent {

  @Input()
  public gifs : Gif[] = []
}
