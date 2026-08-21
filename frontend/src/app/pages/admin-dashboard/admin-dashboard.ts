import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { timeout } from 'rxjs';

import { AdminService } from '../../services/admin';
import { Product } from '../../services/product';
import { Recipe } from '../../models/recipe';
import { NewRecipe } from '../../services/admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  private readonly adminService = inject(AdminService);

  products: Product[] = [];
  recipes: Recipe[] = [];
  productsLoading = true;
  recipesLoading = true;
  savingProduct = false;
  savingRecipe = false;
  message = '';
  error = '';
  productForm = { name: '', price: 0 };
  recipeForm: NewRecipe = {
    name: '',
    category: '',
    image: '',
    ingredients: [{ product: '', quantity: 1 }],
    steps: ''
  };

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.productsLoading = true;
    this.recipesLoading = true;
    this.error = '';

    this.adminService.getProducts().pipe(timeout(10000)).subscribe({
      next: (response) => {
        this.products = response.products;
        this.productsLoading = false;
      },
      error: () => {
        this.productsLoading = false;
        this.error = 'Products could not be loaded. Check that the backend is running on port 7777.';
      }
    });

    this.adminService.getRecipes().pipe(timeout(10000)).subscribe({
      next: (response) => {
        this.recipes = response.data;
        this.recipesLoading = false;
      },
      error: () => {
        this.recipesLoading = false;
        this.error = 'Recipes could not be loaded. Check that the backend is running on port 7777.';
      }
    });
  }

  addProduct(): void {
    if (!this.productForm.name.trim() || this.productForm.price <= 0) {
      this.error = 'Enter a product name and a price greater than zero.';
      return;
    }

    this.savingProduct = true;
    this.error = '';
    this.message = '';

    this.adminService.addProduct({
      name: this.productForm.name.trim(),
      price: Number(this.productForm.price)
    }).subscribe({
      next: (response) => {
        this.products = [...this.products, response.product];
        this.productForm = { name: '', price: 0 };
        this.savingProduct = false;
        this.message = 'Product added successfully.';
      },
      error: (err) => {
        this.savingProduct = false;
        this.error = err.error?.error || 'Unable to add product.';
      }
    });
  }

  deleteRecipe(recipe: Recipe): void {
    if (!confirm(`Delete ${recipe.name}?`)) {
      return;
    }

    this.adminService.deleteRecipe(recipe._id).subscribe({
      next: () => {
        this.recipes = this.recipes.filter((item) => item._id !== recipe._id);
        this.message = 'Recipe deleted successfully.';
      },
      error: () => {
        this.error = 'Unable to delete recipe.';
      }
    });
  }

  deleteProduct(product: Product): void {
    if (!confirm(`Delete ${product.name}?`)) {
      return;
    }

    this.adminService.deleteProduct(product._id).subscribe({
      next: () => {
        this.products = this.products.filter((item) => item._id !== product._id);
        this.message = 'Product deleted successfully.';
      },
      error: (err) => {
        this.error = err.error?.error || 'Unable to delete product.';
      }
    });
  }

  addIngredient(): void {
    this.recipeForm.ingredients.push({ product: '', quantity: 1 });
  }

  removeIngredient(index: number): void {
    if (this.recipeForm.ingredients.length > 1) {
      this.recipeForm.ingredients.splice(index, 1);
    }
  }

  addRecipe(): void {
    const hasInvalidIngredient = this.recipeForm.ingredients.some(
      (ingredient) => !ingredient.product || ingredient.quantity < 1
    );

    if (
      !this.recipeForm.name.trim() ||
      !this.recipeForm.category.trim() ||
      !this.recipeForm.image.trim() ||
      this.recipeForm.steps.trim().length < 10 ||
      hasInvalidIngredient
    ) {
      this.error = 'Complete all recipe fields and add at least one valid ingredient.';
      return;
    }

    this.savingRecipe = true;
    this.error = '';
    this.message = '';

    this.adminService.addRecipe({
      ...this.recipeForm,
      name: this.recipeForm.name.trim(),
      category: this.recipeForm.category.trim(),
      image: this.recipeForm.image.trim(),
      steps: this.recipeForm.steps.trim()
    }).subscribe({
      next: (response) => {
        this.recipes = [...this.recipes, response.data];
        this.recipeForm = {
          name: '',
          category: '',
          image: '',
          ingredients: [{ product: '', quantity: 1 }],
          steps: ''
        };
        this.savingRecipe = false;
        this.message = 'Recipe added successfully.';
      },
      error: (err) => {
        this.savingRecipe = false;
        this.error = err.error?.error || 'Unable to add recipe.';
      }
    });
  }
}
