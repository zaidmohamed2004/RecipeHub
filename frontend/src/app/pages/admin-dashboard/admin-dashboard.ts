import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, timeout } from 'rxjs';

import { AdminService } from '../../services/admin';
import { Product } from '../../services/product';
import { Recipe } from '../../models/recipe';

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
  loading = true;
  savingProduct = false;
  message = '';
  error = '';
  productForm = { name: '', price: 0 };

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.error = '';

    forkJoin({
      products: this.adminService.getProducts(),
      recipes: this.adminService.getRecipes()
    }).pipe(timeout(10000)).subscribe({
      next: (response) => {
        this.products = response.products.products;
        this.recipes = response.recipes.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load dashboard data. Check that the backend is running on port 7777, then try again.';
        this.loading = false;
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
}
