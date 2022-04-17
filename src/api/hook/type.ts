import { PopulationChangeAPI } from "../interface/population";
import { PrefectureAPI } from "../interface/pref";

export interface APIClient {
  pref: PrefectureAPI;
  population: PopulationChangeAPI;
}
