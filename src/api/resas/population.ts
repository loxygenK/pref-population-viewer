import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import { PopulationChangeAPI } from "../interface/population";
import { RESASRequestConfig } from "./types";

export class RESASPopulationChangeAPI implements PopulationChangeAPI {
  private readonly config: RESASRequestConfig;

  constructor(config: RESASRequestConfig) {
    this.config = config;
  }

  fetchPopulationChange(prefs: Prefecture[]): Promise<PopulationChange[]> {
    throw new Error("Method not implemented.");
  }
}
