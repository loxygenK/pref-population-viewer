import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import { PopulationChangeAPIProxy } from "../interface/population";

export class MockPopulationChangeAPIProxy implements PopulationChangeAPIProxy {
  async fetchPopulationChange(
    prefs: Array<Prefecture>
  ): Promise<Array<PopulationChange>> {
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
