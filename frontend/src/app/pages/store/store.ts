import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ProductService, Product } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-store',
  standalone: true,
  templateUrl: './store.html',
  styleUrl: './store.css'
})
export class Store implements OnInit {

  private cdr = inject(ChangeDetectorRef);

  private readonly productService = inject(ProductService);
  constructor(
    private cartService: CartService
  ) { }


  products: Product[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  addToCart(product: Product): void {
    console.log('PRODUCT TO ADD:', product);


    this.cartService.addToCart(product._id, 1).subscribe({

      next: (response) => {
        console.log('Product added to cart:', response);
      },

      error: (err) => {
        console.error('Failed to add product to cart:', err);
      }

    });

  }

  loadProducts(): void {
    this.loading = true;

    this.productService.getProducts().subscribe({

      next: (response) => {
        console.log('Products response:', response);

        this.products = response.products;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Products error:', error);

        this.errorMessage = 'Failed to load products.';
        this.loading = false;
      }
    });
  }
}