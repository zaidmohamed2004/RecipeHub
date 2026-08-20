import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { forkJoin } from 'rxjs';

import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-recipe-details',

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './recipe-details.html',

  styleUrl: './recipe-details.css'
})
export class RecipeDetails implements OnInit {

  // =========================
  // Recipe
  // =========================

  recipe: Recipe | null = null;

  loading = true;

  loadingRecipe = false;

  error = '';


  // =========================
  // Messages
  // =========================

  message = '';

  messageType: 'success' | 'error' | '' = '';


  // =========================
  // Cart Loading
  // =========================

  addingRecipe = false;

  private addingProducts = new Set<string>();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.error =
        'Recipe ID was not provided.';

      this.loading = false;

      return;
    }

    this.loadRecipe(id);
  }


  // =========================
  // LOAD RECIPE
  // =========================

  loadRecipe(id: string): void {

    this.loading = true;

    this.loadingRecipe = true;

    this.error = '';

    this.message = '';

    this.messageType = '';


    this.recipeService
      .getRecipeById(id)
      .subscribe({

        next: (response) => {

          console.log(
            'Recipe details response:',
            response
          );

          this.recipe = response.data;

          this.loading = false;

          this.loadingRecipe = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error loading recipe:',
            error
          );

          this.error =
            'Recipe not found or could not be loaded.';

          this.loading = false;

          this.loadingRecipe = false;

          this.cdr.detectChanges();
        }

      });
  }


  // =========================
  // ADD ONE PRODUCT TO CART
  // =========================

  addIngredientToCart(
    productId: string,
    quantity: number
  ): void {

    if (!productId) {
      return;
    }


    // Prevent duplicate clicks
    if (this.addingProducts.has(productId)) {
      return;
    }


    this.addingProducts.add(productId);

    this.message = '';

    this.messageType = '';


    this.cartService
      .addToCart(
        productId,
        quantity
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Product added to cart:',
            response
          );


          this.message =
            'Product added to cart successfully!';

          this.messageType =
            'success';


          this.addingProducts
            .delete(productId);


          this.cdr.detectChanges();
        },


        error: (error) => {

          console.error(
            'Error adding product to cart:',
            error
          );


          console.error(
            'Backend response:',
            error?.error
          );


          if (error?.status === 401) {

            this.message =
              'Please login first to add products to cart.';

          } else {

            this.message =
              error?.error?.message ||
              'Could not add product to cart.';

          }


          this.messageType =
            'error';


          this.addingProducts
            .delete(productId);


          this.cdr.detectChanges();
        }

      });
  }


  // =========================
  // CHECK PRODUCT LOADING
  // =========================

  isAddingProduct(
    productId: string
  ): boolean {

    return this.addingProducts
      .has(productId);
  }


  // =========================
  // ADD ALL INGREDIENTS
  // =========================

  addAllIngredientsToCart(): void {

    if (
      !this.recipe ||
      !this.recipe.ingredients ||
      this.recipe.ingredients.length === 0
    ) {

      this.message =
        'This recipe has no ingredients.';

      this.messageType =
        'error';

      return;
    }


    this.addingRecipe = true;

    this.message = '';

    this.messageType = '';


    const requests =
      this.recipe.ingredients.map(
        ingredient => {

          return this.cartService.addToCart(
            ingredient.product._id,
            ingredient.quantity
          );

        }
      );


    forkJoin(requests)
      .subscribe({

        next: (responses) => {

          console.log(
            'All products added to cart:',
            responses
          );


          this.message =
            'All products added to cart successfully!';

          this.messageType =
            'success';


          this.addingRecipe = false;


          this.cdr.detectChanges();
        },


        error: (error) => {

          console.error(
            'Error adding all products:',
            error
          );


          console.error(
            'Backend response:',
            error?.error
          );


          if (error?.status === 401) {

            this.message =
              'Please login first to add products to cart.';

          } else {

            this.message =
              error?.error?.message ||
              'Could not add all products to cart.';

          }


          this.messageType =
            'error';


          this.addingRecipe = false;


          this.cdr.detectChanges();
        }

      });
  }


  // =========================
  // GO TO STORE
  // =========================

  goToStore(
    productId: string
  ): void {

    this.router.navigate(
      ['/store'],
      {
        queryParams: {
          product: productId
        }
      }
    );
  }


  // =========================
  // VIEW CART
  // =========================

  viewCart(): void {

    this.router.navigate([
      '/cart'
    ]);
  }


  // =========================
  // STEPS
  // =========================

  getStepList(): string[] {

    if (!this.recipe?.steps) {
      return [];
    }


    return this.recipe.steps
      .split(/\r?\n/)
      .map(
        step => step.trim()
      )
      .filter(
        step => step.length > 0
      );
  }
  getIngredientIcon(productName: string): string {

  const icons: { [key: string]: string } = {

    // Meat & Chicken
    'Chicken Breast': '🍗',
    'Chicken Thighs': '🍗',
    'Ground Beef': '🥩',
    'Beef Steak': '🥩',
    'Bacon': '🥓',

    // Vegetables
    'Tomato': '🍅',
    'Onion': '🧅',
    'Garlic': '🧄',
    'Bell Pepper': '🫑',
    'Mushrooms': '🍄',
    'Spinach': '🥬',
    'Potato': '🥔',
    'Carrot': '🥕',
    'Cucumber': '🥒',
    'Lettuce': '🥬',

    // Dairy
    'Milk': '🥛',
    'Butter': '🧈',
    'Cheddar Cheese': '🧀',
    'Mozzarella Cheese': '🧀',
    'Parmesan Cheese': '🧀',
    'Cream': '🥛',

    // Grains
    'Flour': '🌾',
    'Pasta': '🍝',
    'Rice': '🍚',
    'Bread': '🍞',
    'Tortilla': '🌯',

    // Pantry
    'Egg': '🥚',
    'Olive Oil': '🫒',
    'Salt': '🧂',
    'Black Pepper': '🌶️',
    'Tomato Sauce': '🍅'
  };

  return icons[productName] || '🛒';
}

}