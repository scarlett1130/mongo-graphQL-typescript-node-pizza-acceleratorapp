import { Service } from "typedi";

import OrderModel from "./model";
import { Order, WeeklyData } from "../../entities";
import { NewOrderInput, FilterInput } from "./input";

@Service() 
export default class OrderService {
  constructor(private readonly orderModel: OrderModel) {}

  //get task by id
  public async getById(_id: string): Promise<Order | null> {
    return this.orderModel.getById(_id);
  }

  public async getAllOrders(): Promise<Order []| null> {
    return this.orderModel.getAllOrders();
  }

  public async getFilterOrders(data: FilterInput): Promise<WeeklyData [] | null> {
    return this.orderModel.getFilterOrders(data);
  }
  
  public async addOrder(data: NewOrderInput): Promise<Order> {
    const newOrder = await this.orderModel.create(data);
    return newOrder;
  }

}
