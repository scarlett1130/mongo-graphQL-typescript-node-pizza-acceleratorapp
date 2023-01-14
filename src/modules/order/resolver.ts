import { Resolver, Arg, Query, Mutation, ID } from "type-graphql";
import { Service } from "typedi";

import { Order, WeeklyData } from "../../entities";
import OrderService from "./service";
import { NewOrderInput, FilterInput } from "./input";

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => Order)
export default class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query((returns) => Order)
  async getOrder(@Arg("id") id: string) {
    const order = await this.orderService.getById(id);

    return order;
  }

  @Query((returns) => [Order])
  async getAllOrders() {
    const orders = await this.orderService.getAllOrders();
    return orders;
  }

  @Query((returns) => [WeeklyData])
  async getFilterOrders(@Arg("filterCondition") filterCondition: FilterInput) {
    const filter_orders = await this.orderService.getFilterOrders(filterCondition);
    // console.log("resolver", filter_orders);
    return filter_orders;
  }

  @Mutation((returns) => Order)
  async createOrder(
    @Arg("createOrderData") createOrderData: NewOrderInput
  ): Promise<Order> {
    const order = await this.orderService.addOrder(createOrderData);
    return order;
  }
}
