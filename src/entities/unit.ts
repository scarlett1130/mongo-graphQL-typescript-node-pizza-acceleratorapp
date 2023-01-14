import { ObjectType, Field } from "type-graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType()
export class Unit {
  @prop()
  @Field()
  _id!: string;

  @prop()
  @Field()
  name!: string;
}
