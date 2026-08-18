import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Recipe,
  RecipeService
} from '../../services/recipe';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css'
})
export class Recipes implements OnInit {

  private recipeService = inject(RecipeService);

  recipes: Recipe[] = [];

  loading = true;

  error = '';

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {

    this.loading = true;
    this.error = '';

    this.recipeService.getRecipes().subscribe({

        next: (response) => {

            this.recipes = response.data;

            this.loading = false;
        },

        error: (error) => {

            console.error(error);

            this.error = 'Failed to load recipes.';

            this.loading = false;
        }

    });
}
}