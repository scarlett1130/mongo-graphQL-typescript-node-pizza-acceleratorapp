import { Service } from "typedi";

import IngredientModel from "./model";
import { Ingredient } from "../../entities";
import { NewIngredientInput } from "./input";

@Service() 
export default class IngredientService {
  constructor(private readonly ingredientModel: IngredientModel) {}

  //get ingredient by id
  public async getById(_id: string): Promise<Ingredient | null> {
    return this.ingredientModel.getById(_id);
  }

  public async getAllIngredients(): Promise<Ingredient []| null> {
    return this.ingredientModel.getAllIngredients();
  }
  public async addIngredient(data: NewIngredientInput): Promise<Ingredient> {
    const newIngredient = await this.ingredientModel.create(data);
    return newIngredient;
  }

}
