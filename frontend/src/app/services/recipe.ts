import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Recipe,
  RecipesResponse,
  RecipeResponse
} from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:7777/recipes';

  getRecipes(
    page: number = 1,
    limit: number = 10
  ): Observable<RecipesResponse> {

    return this.http.get<RecipesResponse>(
      `${this.apiUrl}?page=${page}&limit=${limit}`
    );
  }

  getRecipeById(id: string): Observable<RecipeResponse> {

    return this.http.get<RecipeResponse>(
      `${this.apiUrl}/${id}`
    );
  }
}