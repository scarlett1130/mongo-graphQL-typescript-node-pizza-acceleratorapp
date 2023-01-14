import { Recipe } from './recipe';
import { ObjectType, Field } from "type-graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType()
export class Pizza {
  @prop()
  @Field()
  _id!: string;

  @prop()
  @Field()
  name!: string;

  @prop()
  @Field(() => Recipe, { nullable: true })
  recipe!: Recipe;

  @prop()
  @Field()
  cost!: number;

  @prop()
  @Field()
  unit_currency!: string
}
