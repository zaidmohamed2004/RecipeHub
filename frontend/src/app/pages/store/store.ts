import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-store',
  standalone: true,
  templateUrl: './store.html',
  styleUrl: './store.css'
})
export class Store implements OnInit {

  private cdr = inject(ChangeDetectorRef);

  private readonly productService = inject(ProductService);

  products: Product[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadProducts();
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