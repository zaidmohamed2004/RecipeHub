import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Recipes } from './pages/recipes/recipes';
import { RecipeDetails } from './pages/recipe-details/recipe-details';
import { Cart } from './pages/cart/cart';
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
        path: 'recipe-details/:id',
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
        component: Cart
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