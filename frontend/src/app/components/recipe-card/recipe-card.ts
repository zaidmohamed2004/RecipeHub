import {
  Component,
  Input
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

@Component({
  selector: 'app-recipe-card',

  imports: [
    RouterLink
  ],

  templateUrl: './recipe-card.html',

  styleUrl: './recipe-card.css'
})
export class RecipeCard {

  @Input()
  id = '';

  @Input()
  title = '';

  @Input()
  category = '';

  @Input()
  description = '';

  @Input()
  rating = 0;

  @Input()
  image = '';

}