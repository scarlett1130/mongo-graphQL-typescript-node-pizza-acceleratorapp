import UnitResolver from "./unit/resolver";
import IngredientResolver from "./ingredient/resolver";
import RecipeResolver from "./recipe/resolver";
import PizzaResolver from "./pizza/resolver";
import OrderResolver from "./order/resolver";

// Important: Add all your module's resolver in this
export const resolvers: [Function, ...Function[]] = [
  UnitResolver,         
  IngredientResolver,   
  RecipeResolver,       
  PizzaResolver,        
  OrderResolver     //main part of this project
];
