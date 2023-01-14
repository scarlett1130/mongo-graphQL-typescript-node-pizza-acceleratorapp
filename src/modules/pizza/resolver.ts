import { Resolver, Arg, Query, Mutation, ID } from "type-graphql";
import { Service } from "typedi";

import { Pizza } from "../../entities";
import PizzaService from "./service";
import { NewPizzaInput } from "./input";

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => Pizza)
export default class PizzaResolver {
  constructor(private readonly pizzaService: PizzaService) {}

  @Query((returns) => Pizza)
  async getPizza(@Arg("id") id: string) {
    const pizza = await this.pizzaService.getById(id);

    return pizza;
  }

  @Query((returns) => [Pizza])
  async getAllPizzas() {
    const pizzas = await this.pizzaService.getAllPizzas();
    return pizzas;
  }

  @Mutation((returns) => Pizza)
  async createPizza(
    @Arg("createPizzaData") createPizzaData: NewPizzaInput
  ): Promise<Pizza> {
    const pizza = await this.pizzaService.addPizza(createPizzaData);
    return pizza;
  }
}
