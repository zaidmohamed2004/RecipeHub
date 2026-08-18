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
  ) { }

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