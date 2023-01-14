import { Field, InputType, ID } from "type-graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class NewPizzaInput {
  @Field()
  @MinLength(1)
  _id: string;

  @Field()
  @MaxLength(20)
  @MinLength(1)
  name: string;

  @Field()
  recipe: string;

  @Field()
  cost: number;

  @Field()
  unit_currency: string;
}
