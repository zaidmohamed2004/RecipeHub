import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Recipes } from './pages/recipes/recipes';

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
        path: 'login',
        component: Login
    },

    {
        path: 'register',
        component: Register
    },

    {
        path: '**',
        redirectTo: ''
    }

];