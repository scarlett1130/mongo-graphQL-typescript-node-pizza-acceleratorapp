import { getModelForClass } from "@typegoose/typegoose";

import { Order, WeeklyData } from "../../entities";
import { NewOrderInput, FilterInput } from "./input";

// This generates the mongoose model for us
export const OrderMongooseModel = getModelForClass(Order);

export default class OrderModel {
  async getById(_id: string): Promise<Order | null> {
    // find Order
    return OrderMongooseModel.findById(_id).lean().exec();
  }
  
  // create Order
  async create(data: NewOrderInput): Promise<Order> {
    const order = new OrderMongooseModel({...data, date: convertDate(data.date)});
    return order.save();
  }

  // create Order
  // async makeData(){
  //   let data = []

  //   for (const order of data) {
  //     const insertData = new OrderMongooseModel({
  //       date: order.FIELD1,
  //       sales: [
  //         {
  //           pizza: "0",
  //           amount: order.Pepperoni
  //         },
  //         {
  //           pizza: "1",
  //           amount: order.Branco
  //         },
  //         {
  //           pizza: "2",
  //           amount: order["All Dressed"]
  //         }
  //       ]
  //     });
  //     await insertData.save();
  //   }
  // }

  async getAllOrders(): Promise<Order[] | null> {
    // return all Orders
    return OrderMongooseModel.find().populate({
      path: "sales.pizza",
      model: "Pizza",
      populate: {
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
      }
    });
  } 

  //filter order and do analyse
  async getFilterOrders(data: FilterInput): Promise<WeeklyData[] | null> {
    // return filter Orders
    const {pizza, startDate, endDate} = data;
    
    let filterCondition = {};                 //for mogno find
    
    if(endDate != ""){        //if exist endDate
      filterCondition = {
        date: {
          $gte: convertDate(startDate),
          $lte: convertDate(endDate)
        }
      }
    }else{    //if not endDate
      let tmp_start = convertDate(startDate);
      let start = new Date(tmp_start.getFullYear(), tmp_start.getMonth(), 1);
      let end = new Date(tmp_start.getFullYear(), tmp_start.getMonth() + 1, 0);

      filterCondition = {
        date: {
          $gte: start,
          $lte: end
        }
      }
    }

    //get order data using filter
    const filteredOrders = await OrderMongooseModel.find({
      ...filterCondition
    }).populate({
      path: "sales.pizza",
      model: "Pizza",
      populate: {
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
      }
    });

    // Group the data by week
    const weeklyData: Record<number, WeeklyData> = {}

    // data for each week analyse
    let ingredient_amount: number[];  
    let ingredient_cost: number[];

    filteredOrders.forEach(order => {
      const week = getWeek(order.date)
      // console.log("week", week);
      if (!weeklyData[week]) {
        //initialize
        ingredient_amount = Array.from({length: order.sales[0].pizza.recipe.ingredients.length}, () => 0);
        ingredient_cost = Array.from({length: order.sales[0].pizza.recipe.ingredients.length}, () => 0);
        weeklyData[week] = {
          week: week.toString(),
          unitSold: 0,
          ingredientsUsed: [],
          costOfIngredients: 0,
          sales: 0,
          profit: 0,
        }
      }
      
      order.sales.forEach(sale => {
        // console.log("sales",sale);
        if(pizza === "all"){    //if select all pizza
          weeklyData[week].unitSold += sale.amount      
          sale.pizza.recipe.ingredients.map((ingredient, index) => {
            ingredient_amount[index] += ingredient.amount * sale.amount;
            ingredient_cost[index] += Number((ingredient.amount * sale.amount * ingredient.ingredient.cost).toFixed(2));
            weeklyData[week].ingredientsUsed[index] = { ingredient: ingredient.ingredient, amount: 0, cost: 0 }
          })
          weeklyData[week].sales += sale.amount * sale.pizza.cost
        }else if(sale.pizza._id == pizza){    // if select only one
          weeklyData[week].unitSold += sale.amount      
          sale.pizza.recipe.ingredients.map((ingredient, index) => {
            ingredient_amount[index] += ingredient.amount * sale.amount;
            ingredient_cost[index] += Number((ingredient.amount * sale.amount * ingredient.ingredient.cost).toFixed(2));
            weeklyData[week].ingredientsUsed[index] = { ingredient: ingredient.ingredient, amount: 0, cost: 0 }
          })
          weeklyData[week].sales += sale.amount * sale.pizza.cost
        }
      })
      ingredient_amount.map((amount, index) => {
        weeklyData[week].ingredientsUsed[index] = { ...weeklyData[week].ingredientsUsed[index], amount: amount, cost: Number(ingredient_cost[index].toFixed(2)) }
        weeklyData[week].costOfIngredients +=  Number(ingredient_cost[index].toFixed(2))
      })
    })

    let result: WeeklyData[] = []
    Object.entries(weeklyData).forEach(([week, data]) => {
      result = [...result, {
        ...data, 
        costOfIngredients: Number(data.costOfIngredients.toFixed(2)),
        profit: Number(Number(data.sales - data.costOfIngredients).toFixed(2))
      }]
    });

    return result;
  }
  
}

const convertDate = (dateString: string): Date => {
  const [month, day, year] = dateString.split(/[ ,]+/);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = months.indexOf(month);
  return new Date(`20${year}-${monthIndex + 1}-${day}`);
}

function getWeek(date: Date): number {
  const onejan = new Date(date.getFullYear(),0,1);
  return Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay()+1)/7);
}

