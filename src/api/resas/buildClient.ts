import { APIClient } from "../hook/type";
import { RESASPopulationChangeAPI } from "../resas/population";
import { RESASPrefectureAPI } from "../resas/pref";
import { RESASRequestConfig } from "../resas/types";

export function buildRESASClient(): APIClient {
  const config: RESASRequestConfig = {
    // TODO: throw error when the environment variable is not set
    apiKey: process.env.RESAS_API_KEY ?? "",
    origin: process.env.RESAS_API_ORIGIN ?? "",
  };

  return {
    pref: new RESASPrefectureAPI(config),
    population: new RESASPopulationChangeAPI(config),
  };
}
