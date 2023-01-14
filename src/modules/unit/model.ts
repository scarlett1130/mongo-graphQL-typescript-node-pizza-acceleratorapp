import { getModelForClass } from "@typegoose/typegoose";

import { Unit } from "../../entities";
import { NewUnitInput } from "./input";

// This generates the mongoose model for us
export const UnitMongooseModel = getModelForClass(Unit);

export default class UnitModel {
  async getById(_id: string): Promise<Unit | null> {
    // find Unit
    return UnitMongooseModel.findById(_id).lean().exec();
  }
  
  // create Unit
  async create(data: NewUnitInput): Promise<Unit> {
    const unit = new UnitMongooseModel(data);
    return unit.save();
  }

  async getAllUnits(): Promise<Unit[] | null> {
    // return all Units
    return UnitMongooseModel.find();
  }
}
