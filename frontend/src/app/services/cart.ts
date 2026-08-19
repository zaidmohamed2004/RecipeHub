import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
}

export interface CartResponse {
  cart: Cart;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private apiUrl = 'http://localhost:7777/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(this.apiUrl);
  }

  addToCart(product: string, quantity: number): Observable<CartResponse> {
    return this.http.post<CartResponse>(
      `${this.apiUrl}/add`,
      {
        product,
        quantity
      }
    );
  }

  addRecipeToCart(recipeId: string): Observable<CartResponse> {
    return this.http.post<CartResponse>(
      `${this.apiUrl}/add-recipe`,
      {
        recipeId
      }
    );
  }
}