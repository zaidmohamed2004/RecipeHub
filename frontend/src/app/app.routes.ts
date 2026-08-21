import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Recipes } from './pages/recipes/recipes';
import { RecipeDetails } from './pages/recipe-details/recipe-details';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Store } from './pages/store/store';


export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'recipes',
    component: Recipes
  },

  {
    path: 'recipes/:id',
    component: RecipeDetails
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'cart',
    component: Cart,
    canActivate: [authGuard]
  },

  {
    path: 'checkout',
    component: Checkout,
    canActivate: [authGuard]
  },

  {
    path: 'store',
    component: Store
  },

  {
    path: '**',
    redirectTo: ''
  }

];