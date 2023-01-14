import { Resolver, Arg, Query, Mutation, ID } from "type-graphql";
import { Service } from "typedi";

import { Unit } from "../../entities";
import UnitService from "./service";
import { NewUnitInput } from "./input";

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => Unit)
export default class UnitResolver {
  constructor(private readonly unitService: UnitService) {}

  @Query((returns) => Unit)
  async getUnit(@Arg("id") id: string) {
    const unit = await this.unitService.getById(id);

    return unit;
  }

  @Query((returns) => [Unit])
  async getAllUnits() {
    const units = await this.unitService.getAllUnits();
    return units;
  }

  @Mutation((returns) => Unit)
  async createUnit(
    @Arg("createUnitData") createUnitData: NewUnitInput
  ): Promise<Unit> {
    const unit = await this.unitService.addUnit(createUnitData);
    return unit;
  }
}
