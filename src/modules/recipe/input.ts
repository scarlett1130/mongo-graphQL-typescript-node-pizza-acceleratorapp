import { Field, InputType, ID } from "type-graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class NewRecipeInput {
  @Field()
  @MinLength(1)
  _id: string;

  @Field()
  @MaxLength(20)
  @MinLength(1)
  pizza: string;

  @Field(() => [IngredientsInput])
  ingredients: IngredientsInput[];
}

@InputType()
export class IngredientsInput {
  @Field()
  @MinLength(1)
  ingredient: string;

  @Field()
  amount: number;
}
