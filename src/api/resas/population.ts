import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import { PopulationChangeAPI } from "../interface/population";

export class RESASPopulationChangeAPI implements PopulationChangeAPI {
  private readonly apiKey: string;
  private readonly origin: string;

  constructor(apiKey: string, origin: string) {
    this.apiKey = apiKey;
    this.origin = origin;
  }

  fetchPopulationChange(prefs: Prefecture[]): Promise<PopulationChange[]> {
    throw new Error("Method not implemented.");
  }
}
