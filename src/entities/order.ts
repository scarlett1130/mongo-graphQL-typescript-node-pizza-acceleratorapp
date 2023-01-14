import { Ingredient } from './ingredient';
import { Pizza } from './pizza';
import { ObjectType, Field } from "type-graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType()
export class Order {
  @prop()
  @Field()
  date!: Date;

  @prop()
  @Field(() => [Sales], { nullable: true })
  sales!: Sales[]
}

@ObjectType()
export class Sales {
  @prop()
  @Field(() => Pizza)
  pizza!: Pizza;

  @prop()
  @Field()
  amount!: number;
}

@ObjectType()
export class WeeklyData {
  @Field()
  week!: string;

  @Field()
  unitSold!: number;

  @Field(() => [UsedIngredient], { nullable: true })
  ingredientsUsed!: UsedIngredient[];

  @Field()
  costOfIngredients!: number;

  @Field()
  sales!: number;

  @Field()
  profit!: number;
}

@ObjectType()
export class UsedIngredient {
  @Field(() => Ingredient, { nullable: true })
  ingredient!: Ingredient;
  
  @Field()
  amount!: number;
  
  @Field()
  cost!: number;
}
