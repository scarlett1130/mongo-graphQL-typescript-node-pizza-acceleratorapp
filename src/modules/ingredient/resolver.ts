import { Resolver, Arg, Query, Mutation, ID } from "type-graphql";
import { Service } from "typedi";
import { ObjectId } from "mongodb";

import { Ingredient } from "../../entities";
import IngredientService from "./service";
import { NewIngredientInput } from "./input";

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => Ingredient)
export default class IngredientResolver {
  constructor(private readonly ingredientService: IngredientService) {}

  @Query((returns) => Ingredient)
  async getIngredient(@Arg("id") id: string) {
    const ingredient = await this.ingredientService.getById(id);

    return ingredient;
  }

  @Query((returns) => [Ingredient])
  async getAllIngredients() {
    const ingredients = await this.ingredientService.getAllIngredients();
    return ingredients;
  }

  @Mutation((returns) => Ingredient)
  async createIngredient(
    @Arg("createIngredientData") createIngredientData: NewIngredientInput
  ): Promise<Ingredient> {
    const ingredient = await this.ingredientService.addIngredient(createIngredientData);
    return ingredient;
  }
}
