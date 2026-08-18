import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css'
})
export class Recipes implements OnInit {

  private recipeService = inject(RecipeService);

  recipes: Recipe[] = [];

  loading = true;

  error = '';

  ngOnInit(): void {
    console.log('Recipes component loaded');

    this.loadRecipes();
  }

  loadRecipes(): void {

    console.log('Loading recipes...');

    this.loading = true;
    this.error = '';

    this.recipeService.getRecipes().subscribe({

      next: (response) => {

        console.log('Recipes response:', response);

        this.recipes = response.data;

        this.loading = false;

        console.log('Loading is now:', this.loading);
        console.log('Recipes count:', this.recipes.length);

      },

      error: (error) => {

        console.error('Recipes error:', error);

        this.error = 'Failed to load recipes.';

        this.loading = false;

      }

    });
  }
}