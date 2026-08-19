import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService, CartResponse } from '../../services/cart';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {

  cart: CartResponse['cart'] | null = null;
  loading = false;
  error = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.error = '';

    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cart = response.cart;
        this.loading = false;

        console.log('Cart:', this.cart);
      },

      error: (err) => {
        this.loading = false;

        console.error('Cart error:', err);

        this.error = err.error?.message || 'Failed to load cart';
      }
    });
  }

  getTotal(): number {
    if (!this.cart) {
      return 0;
    }

    return this.cart.items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    );
  }
}