import { Field, InputType, ID } from "type-graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class NewIngredientInput {
  @Field()
  @MinLength(1)
  _id: string;

  @Field()
  @MaxLength(20)
  @MinLength(1)
  name: string;

  @Field()
  cost: number;

  @Field()
  unit_currency: string;

  @Field()
  unit: string;
}
