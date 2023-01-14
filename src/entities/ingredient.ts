import { Unit } from './unit';
import { ObjectType, Field } from "type-graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType()
export class Ingredient {
  @prop()
  @Field()
  _id!: string;

  @prop()
  @Field()
  name!: string;

  @prop()
  @Field()
  cost!: number;

  @prop()
  @Field()
  unit_currency!: string;

  @prop()
  @Field(type => Unit, { nullable: true })
  unit!: Unit;
}
