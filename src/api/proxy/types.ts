import { PopulationChangeAPIProxy } from "./interface/population";
import { PrefectureAPIProxy } from "./interface/pref";

export interface APIProxyClientSet {
  pref: PrefectureAPIProxy;
  population: PopulationChangeAPIProxy;
}
