import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  imports: [],
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