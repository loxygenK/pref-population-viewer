import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";

export interface PopulationChangeAPI {
  fetchPopulationChange(
    prefs: Array<Prefecture>
  ): Promise<Array<PopulationChange>>;
}
