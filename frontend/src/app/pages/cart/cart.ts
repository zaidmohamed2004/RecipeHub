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
  getProductIcon(productName: string): string {

  const name = productName.toLowerCase();

  if (name.includes('chicken breast')) return '🍗';
  if (name.includes('chicken thighs')) return '🍗';
  if (name.includes('ground beef')) return '🥩';
  if (name.includes('beef steak')) return '🥩';
  if (name.includes('bacon')) return '🥓';

  if (name.includes('tomato')) return '🍅';
  if (name.includes('onion')) return '🧅';
  if (name.includes('garlic')) return '🧄';
  if (name.includes('bell pepper')) return '🫑';
  if (name.includes('mushroom')) return '🍄';
  if (name.includes('spinach')) return '🥬';
  if (name.includes('potato')) return '🥔';
  if (name.includes('carrot')) return '🥕';
  if (name.includes('cucumber')) return '🥒';
  if (name.includes('lettuce')) return '🥬';

  if (name.includes('milk')) return '🥛';
  if (name.includes('butter')) return '🧈';
  if (name.includes('cheddar')) return '🧀';
  if (name.includes('mozzarella')) return '🧀';
  if (name.includes('parmesan')) return '🧀';
  if (name.includes('cream')) return '🥛';

  if (name.includes('flour')) return '🌾';
  if (name.includes('pasta')) return '🍝';
  if (name.includes('rice')) return '🍚';
  if (name.includes('bread')) return '🍞';
  if (name.includes('tortilla')) return '🌯';

  if (name.includes('egg')) return '🥚';
  if (name.includes('olive oil')) return '🫒';
  if (name.includes('salt')) return '🧂';
  if (name.includes('black pepper')) return '🌶️';
  if (name.includes('tomato sauce')) return '🍅';

  return '🛒';
}
}