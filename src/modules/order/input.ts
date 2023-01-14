import { Field, InputType } from "type-graphql";

@InputType()
export class NewOrderInput {
  @Field()
  date: string;

  @Field(() => [SaleInput])
  sales: SaleInput[];
}

@InputType()
export class SaleInput {
  @Field()
  pizza: string;

  @Field()
  amount: number;
}

@InputType()
export class FilterInput {
  @Field()
  startDate!: string;

  @Field()
  endDate: string;

  @Field()
  pizza: string;
}

