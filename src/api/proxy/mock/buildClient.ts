import { APIProxyClientSet } from "../types";
import { MockPopulationChangeAPIProxy } from "./population";
import { MockPrefectureAPIProxy } from "./pref";

export const buildMockProxyClient = (): APIProxyClientSet => {
  return {
    pref: new MockPrefectureAPIProxy(),
    population: new MockPopulationChangeAPIProxy(),
  };
};
