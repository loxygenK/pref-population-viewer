import { getEnvironmentVariable } from "~/util/getEnvironmentVariable";
import { APIClient } from "../type";
import { RESASPopulationChangeAPI } from "../resas/population";
import { RESASPrefectureAPI } from "../resas/pref";
import { RESASRequestConfig } from "../resas/types";

export function buildRESASClient(): APIClient {
  const config: RESASRequestConfig = {
    apiKey: getEnvironmentVariable("RESAS_API_KEY"),
    origin: getEnvironmentVariable("RESAS_API_ORIGIN"),
  };

  return {
    pref: new RESASPrefectureAPI(config),
    population: new RESASPopulationChangeAPI(config),
  };
}
