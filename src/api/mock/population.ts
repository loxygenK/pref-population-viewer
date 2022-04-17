import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import { PopulationChangeAPI } from "../interface/population";

export class MockPopulationChangeAPI implements PopulationChangeAPI {
  fetchPopulationChange(prefs: Prefecture[]): Promise<PopulationChange> {
    throw new Error("Method not implemented.");
  }
}
