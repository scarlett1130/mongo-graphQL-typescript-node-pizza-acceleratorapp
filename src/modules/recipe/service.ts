import { Service } from "typedi";

import RecipeModel from "./model";
import { Recipe } from "../../entities";
import { NewRecipeInput } from "./input";

@Service() 
export default class RecipeService {
  constructor(private readonly ingredientModel: RecipeModel) {}

  //get ingredient by id
  public async getById(_id: string): Promise<Recipe | null> {
    return this.ingredientModel.getById(_id);
  }

  public async getAllRecipes(): Promise<Recipe []| null> {
    return this.ingredientModel.getAllRecipes();
  }
  public async addRecipe(data: NewRecipeInput): Promise<Recipe> {
    const newRecipe = await this.ingredientModel.create(data);
    return newRecipe;
  }

}
