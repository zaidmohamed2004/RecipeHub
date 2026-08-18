import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id: string;
  name: string;
  price: number;
}

export interface RecipeIngredient {
  product: Product;
  quantity: number;
}

export interface Recipe {
  _id: string;
  name: string;
  category: string;
  ingredients: RecipeIngredient[];
  steps: string;
}

export interface RecipeResponse {
  message: string;
  page: number;
  limit: number;
  data: Recipe[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:7777/recipes';

  getRecipes(
    page: number = 1,
    limit: number = 10
  ): Observable<RecipeResponse> {

    return this.http.get<RecipeResponse>(
      `${this.apiUrl}?page=${page}&limit=${limit}`
    );
  }

  getRecipeById(id: string): Observable<{ message: string; data: Recipe }> {

    return this.http.get<{ message: string; data: Recipe }>(
      `${this.apiUrl}/${id}`
    );
  }
}