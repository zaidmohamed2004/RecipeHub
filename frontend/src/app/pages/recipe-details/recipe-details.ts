import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  Recipe
} from '../../models/recipe';

import {
  RecipeService
} from '../../services/recipe';

@Component({
  selector: 'app-recipe-details',

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './recipe-details.html',

  styleUrl: './recipe-details.css'
})
export class RecipeDetails implements OnInit {

  recipe: Recipe | null = null;

  loading = true;

  error = '';

  constructor(
    private route: ActivatedRoute,

    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.error = 'Recipe ID was not provided.';

      this.loading = false;

      return;
    }

    this.loadRecipe(id);
  }

  loadRecipe(id: string): void {

    this.loading = true;

    this.recipeService
      .getRecipeById(id)
      .subscribe({

        next: (response) => {

          this.recipe = response.data;

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Error loading recipe:',
            error
          );

          this.error =
            'Recipe not found or could not be loaded.';

          this.loading = false;

        }

      });
  }

  getRecipeImage(): string {

    if (!this.recipe) {
      return '';
    }

    const name =
      this.recipe.name.toLowerCase();

    if (name.includes('pizza')) {
      return 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=85';
    }

    if (name.includes('pasta')) {
      return 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=1200&q=85';
    }

    if (name.includes('burger')) {
      return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85';
    }

    if (name.includes('chicken')) {
      return 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=85';
    }

    if (name.includes('salad')) {
      return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85';
    }

    if (name.includes('rice')) {
      return 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1200&q=85';
    }

    return 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85';
  }

  getStepList(): string[] {

    if (!this.recipe?.steps) {
      return [];
    }

    return this.recipe.steps
      .split(/\r?\n/)
      .map(step => step.trim())
      .filter(step => step.length > 0);
  }

}