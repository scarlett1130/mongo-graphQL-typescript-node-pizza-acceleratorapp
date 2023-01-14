import { Service } from "typedi";
import { ObjectId } from "mongodb";

import UnitModel from "./model";
import { Unit } from "../../entities";
import { NewUnitInput } from "./input";

@Service() 
export default class UnitService {
  constructor(private readonly unitModel: UnitModel) {}

  //get task by id
  public async getById(_id: string): Promise<Unit | null> {
    return this.unitModel.getById(_id);
  }

  public async getAllUnits(): Promise<Unit []| null> {
    return this.unitModel.getAllUnits();
  }
  
  public async addUnit(data: NewUnitInput): Promise<Unit> {
    const newUnit = await this.unitModel.create(data);
    return newUnit;
  }

}
