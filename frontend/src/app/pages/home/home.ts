import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Hero } from '../../components/hero/hero';
import { RecipeCard } from '../../components/recipe-card/recipe-card';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-home',
 imports: [
  RouterLink,
  Hero,
  RecipeCard,
  ProductCard
],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
