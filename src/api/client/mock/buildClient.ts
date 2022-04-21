import { APIClient } from "../type";
import { MockPopulationChangeAPI } from "../mock/population";
import { MockPrefectureAPI } from "../mock/pref";

export function buildMockClient(): APIClient {
  return {
    pref: new MockPrefectureAPI(),
    population: new MockPopulationChangeAPI(),
  };
}
