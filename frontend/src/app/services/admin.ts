import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from './product';
import { RecipeResponse, RecipesResponse } from '../models/recipe';

export interface NewProduct {
  name: string;
  price: number;
}

export interface NewRecipe {
  name: string;
  category: string;
  image: string;
  ingredients: { product: string; quantity: number }[];
  steps: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly productsUrl = 'http://localhost:7777/products';
  private readonly recipesUrl = 'http://localhost:7777/recipes';

  getProducts(): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(this.productsUrl);
  }

  addProduct(product: NewProduct): Observable<{ product: Product }> {
    return this.http.post<{ product: Product }>(this.productsUrl, product);
  }

  getRecipes(): Observable<RecipesResponse> {
    return this.http.get<RecipesResponse>(`${this.recipesUrl}?page=1&limit=10`);
  }

  addRecipe(recipe: NewRecipe): Observable<RecipeResponse> {
    return this.http.post<RecipeResponse>(this.recipesUrl, recipe);
  }

  deleteProduct(id: string): Observable<{ product: Product }> {
    return this.http.delete<{ product: Product }>(`${this.productsUrl}/${id}`);
  }

  deleteRecipe(id: string): Observable<RecipeResponse> {
    return this.http.delete<RecipeResponse>(`${this.recipesUrl}/${id}`);
  }
}
