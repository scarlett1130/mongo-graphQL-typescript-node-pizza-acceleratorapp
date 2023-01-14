import { getModelForClass } from "@typegoose/typegoose";

import { Pizza } from "../../entities";
import { NewPizzaInput } from "./input";

// This generates the mongoose model for us
export const PizzaMongooseModel = getModelForClass(Pizza);

export default class PizzaModel {
  async getById(_id: string): Promise<Pizza | null> {
    // find Pizza
    return PizzaMongooseModel.findById(_id).lean().exec();
  }
  
  // create Pizza
  async create(data: NewPizzaInput): Promise<Pizza> {
    const pizza = new PizzaMongooseModel(data);
    return pizza.save();
  }

  async getAllPizzas(): Promise<Pizza[] | null> {
    // return all Pizzas
    return PizzaMongooseModel.find().populate({
      path : "recipe",
      model: 'Recipe',
      populate : {
        path : "ingredients.ingredient",
        model: 'Ingredient',
        populate : {
          path : 'unit',
          model: 'Unit'
        }
      }
    }).exec();
  }
}
