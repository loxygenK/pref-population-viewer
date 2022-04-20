import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import { PopulationChangeAPI } from "../interface/population";
import { buildRESASReqeuster, RESASRequester } from "./request";
import { RESASRequestConfig } from "./types";

export class RESASPopulationChangeAPI implements PopulationChangeAPI {
  private readonly executeRequest: RESASRequester;

  constructor(config: RESASRequestConfig) {
    fetch;
    this.executeRequest = buildRESASReqeuster(config);
  }

  fetchPopulationChange(prefs: Prefecture[]): Promise<PopulationChange[]> {
    throw new Error("Method not implemented.");
  }
}
