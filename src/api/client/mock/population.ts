import { Population, PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import { PopulationChangeAPI } from "../interface/population";
import { delay } from "./util";

export class MockPopulationChangeAPI implements PopulationChangeAPI {
  async fetchPopulationChange(
    prefs: Array<Prefecture>
  ): Promise<Array<PopulationChange>> {
    await delay(500);

    return prefs.map(this.generateMockPopulationChange);
  }

  private generateMockPopulationChange(pref: Prefecture): PopulationChange {
    const changes = Array.from({ length: 30 }).map((_, i) => ({
      year: 2000 + i * 5,
      population: 100000 * i,
    }));

    return { pref, forecastBoundary: 2020, changes };
  }
}
