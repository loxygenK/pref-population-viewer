import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";

export interface PopulationChangeAPIProxy {
  fetchPopulationChange(
    prefs: Array<Prefecture>
  ): Promise<Array<PopulationChange>>;
}
