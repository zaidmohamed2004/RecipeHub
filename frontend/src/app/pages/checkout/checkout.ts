import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  FormsModule,
  NgForm
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  CartService,
  CartResponse
} from '../../services/cart';

import {
  OrderService
} from '../../services/order';


@Component({
  selector: 'app-checkout',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {

  cart: CartResponse['cart'] | null = null;

  loading = false;

  submitting = false;

  error = '';

  success = false;

  orderId = '';

  orderTotal = 0;


  checkoutData = {
    shippingAddress: '',
    phone: '',
    paymentMethod: 'Cash on Delivery'
  };


  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


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

        if (this.cart.items.length === 0) {

          this.router.navigate(['/cart']);

          return;

        }

        this.cdr.detectChanges();

      },


      error: (err) => {

        console.error(
          'Failed to load cart:',
          err
        );

        this.error =
          err.error?.message ||
          'Failed to load cart';

        this.loading = false;

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


  getTotalItems(): number {

    if (!this.cart) {
      return 0;
    }

    return this.cart.items.reduce(
      (total, item) => {

        return total +
          item.quantity;

      },
      0
    );

  }


  getProductIcon(
    productName: string
  ): string {

    const name =
      productName.toLowerCase();


    if (name.includes('chicken')) {
      return '🍗';
    }

    if (name.includes('beef')) {
      return '🥩';
    }

    if (name.includes('bacon')) {
      return '🥓';
    }

    if (name.includes('tomato')) {
      return '🍅';
    }

    if (name.includes('onion')) {
      return '🧅';
    }

    if (name.includes('garlic')) {
      return '🧄';
    }

    if (name.includes('mushroom')) {
      return '🍄';
    }

    if (name.includes('potato')) {
      return '🥔';
    }

    if (name.includes('carrot')) {
      return '🥕';
    }

    if (name.includes('milk')) {
      return '🥛';
    }

    if (name.includes('cheese')) {
      return '🧀';
    }

    if (name.includes('pasta')) {
      return '🍝';
    }

    if (name.includes('rice')) {
      return '🍚';
    }

    if (name.includes('bread')) {
      return '🍞';
    }

    if (name.includes('egg')) {
      return '🥚';
    }


    return '🛒';

  }


  placeOrder(
    form: NgForm
  ): void {

    if (form.invalid) {
      return;
    }

    if (!this.cart ||
        this.cart.items.length === 0) {

      this.router.navigate(['/cart']);

      return;

    }


    this.submitting = true;

    this.error = '';


    this.orderService
      .checkout(
        this.checkoutData
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Order created:',
            response
          );


          this.success = true;

          this.orderId =
            response.order._id;

          this.orderTotal =
            response.order.totalAmount;


          this.cart = null;

          this.submitting = false;

          this.cdr.detectChanges();

        },


        error: (err) => {

          console.error(
            'Checkout failed:',
            err
          );

          this.error =
            err.error?.msg ||
            err.error?.message ||
            'Failed to place your order';


          this.submitting = false;

          this.cdr.detectChanges();

        }

      });

  }

}