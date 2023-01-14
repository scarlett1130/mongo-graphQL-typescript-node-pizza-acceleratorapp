import { getModelForClass } from "@typegoose/typegoose";

import { Recipe } from "../../entities";
import { NewRecipeInput } from "./input";

// This generates the mongoose model for us
export const RecipeMongooseModel = getModelForClass(Recipe);

export default class RecipeModel {
  async getById(_id: string): Promise<Recipe | null> {
    // find Recipe
    return RecipeMongooseModel.findById(_id).lean().exec();
  }
  
  // create Recipe
  async create(data: NewRecipeInput): Promise<Recipe> {
    const recipe = new RecipeMongooseModel(data);
    return recipe.save();
  }

  async getAllRecipes(): Promise<Recipe[] | null> {
    // return all Recipes
    
    return RecipeMongooseModel.find().populate({
      path : "ingredients.ingredient",
      model: 'Ingredient',
      populate : {
        path : 'unit',
        model: 'Unit'
      }
    }).exec()
  }
}
