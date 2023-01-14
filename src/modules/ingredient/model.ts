import { getModelForClass } from "@typegoose/typegoose";

import { Ingredient } from "../../entities";
import { NewIngredientInput } from "./input";

// This generates the mongoose model for us
export const IngredientMongooseModel = getModelForClass(Ingredient);

export default class IngredientModel {
  async getById(_id: string): Promise<Ingredient | null> {
    // find Ingredient
    return IngredientMongooseModel.findById(_id).lean().exec();
  }
  
  // create Ingredient
  async create(data: NewIngredientInput): Promise<Ingredient> {
    const ingredient = new IngredientMongooseModel(data);
    return ingredient.save();
  }

  async getAllIngredients(): Promise<Ingredient[] | null> {
    // return all Ingredients
    return IngredientMongooseModel.find().populate('unit');
  }
}
