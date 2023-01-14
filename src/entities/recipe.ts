import { Ingredient } from './ingredient';
import { ObjectType, Field } from "type-graphql";
import { prop, arrayProp, Ref } from "@typegoose/typegoose";

@ObjectType()
export class Recipe {
  @prop()
  @Field()
  _id!: string;

  @prop()
  @Field()
  pizza!: string;

  @prop()
  @Field(type => [Ingredients],  { nullable: true })
  // @arrayProp({ itemsRef: 'Ingredients' })
  ingredients!: Ingredients[];
}

@ObjectType()
export class Ingredients {
  @prop()
  @Field(type => Ingredient,  { nullable: true })
  ingredient!: Ingredient;

  @prop()
  @Field()
  amount!: number
}
