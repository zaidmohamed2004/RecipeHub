import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { RouterLink } from '@angular/router';

import {
  CartService,
  CartResponse
} from '../../services/cart';

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

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('CART COMPONENT STARTED');

    this.loadCart();
  }

  loadCart(): void {

    this.loading = true;

    this.error = '';

    console.log('1 - loadCart started');

    this.cartService.getCart().subscribe({

      next: (response) => {

        console.log('2 - CART RESPONSE:', response);

        this.cart = response.cart;

        console.log('3 - CART:', this.cart);

        this.loading = false;

        console.log('4 - LOADING:', this.loading);

        // إجبار Angular على تحديث الـ UI
        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error('CART ERROR:', err);

        this.error =
          err.error?.message ||
          'Failed to load cart';

        this.loading = false;

        // تحديث الـ UI في حالة الخطأ
        this.cdr.detectChanges();
      }

    });
  }

  getTotal(): number {

    if (!this.cart) {
      return 0;
    }

    return this.cart.items.reduce(
      (total, item) => {

        return total +
          item.product.price *
          item.quantity;

      },
      0
    );
  }
}