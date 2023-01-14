import { Service } from "typedi";

import PizzaModel from "./model";
import { Pizza } from "../../entities";
import { NewPizzaInput } from "./input";

@Service() 
export default class PizzaService {
  constructor(private readonly pizzaModel: PizzaModel) {}

  //get pizza by id
  public async getById(_id: string): Promise<Pizza | null> {
    return this.pizzaModel.getById(_id);
  }

  public async getAllPizzas(): Promise<Pizza []| null> {
    return this.pizzaModel.getAllPizzas();
  }
  public async addPizza(data: NewPizzaInput): Promise<Pizza> {
    const newPizza = await this.pizzaModel.create(data);
    return newPizza;
  }

}
