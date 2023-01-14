import { Resolver, Arg, Query, Mutation, ID } from "type-graphql";
import { Service } from "typedi";

import { Recipe } from "../../entities";
import RecipeService from "./service";
import { NewRecipeInput } from "./input";

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => Recipe)
export default class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Query((returns) => Recipe)
  async getRecipe(@Arg("id") id: string) {
    const recipe = await this.recipeService.getById(id);

    return recipe;
  }

  @Query((returns) => [Recipe])
  async getAllRecipes() {
    const recipes = await this.recipeService.getAllRecipes();
    return recipes;
  }

  @Mutation((returns) => Recipe)
  async createRecipe(
    @Arg("createRecipeData") createRecipeData: NewRecipeInput
  ): Promise<Recipe> {
    const recipe = await this.recipeService.addRecipe(createRecipeData);
    return recipe;
  }
}
