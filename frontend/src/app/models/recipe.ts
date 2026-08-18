export interface Product {
  _id: string;
  name: string;
  price: number;
}

export interface RecipeIngredient {
  product: Product;
  quantity: number;
}

export interface Recipe {
  _id: string;
  name: string;
  category: string;
  ingredients: RecipeIngredient[];
  steps: string;
}

export interface RecipesResponse {
  message: string;
  page: number;
  limit: number;
  data: Recipe[];
}

export interface RecipeResponse {
  message: string;
  data: Recipe;
}