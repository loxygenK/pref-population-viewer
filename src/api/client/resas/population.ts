import { Population, PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import { safelyParseNumber } from "~/util/safelyParseNumber";
import { PopulationChangeAPI } from "../interface/population";
import { buildRESASReqeuster, RESASRequester } from "./request";
import { RESASRequestConfig, RESASResponse } from "./types";

interface AnnualPopulationChangeResponse {
  year: string;
  value: string;
}
interface PopulationChangeLabelResponse {
  label: string;
  data: Array<AnnualPopulationChangeResponse>;
}
interface PopulationChangeResponse {
  boundaryYear: number;
  data: Array<PopulationChangeLabelResponse>;
}
type Response = RESASResponse<PopulationChangeResponse>;

export class RESASPopulationChangeAPI implements PopulationChangeAPI {
  private readonly executeRequest: RESASRequester;

  constructor(config: RESASRequestConfig) {
    this.executeRequest = buildRESASReqeuster(config);
  }

  async fetchPopulationChange(
    prefs: Prefecture[]
  ): Promise<PopulationChange[]> {
    const resp: [Prefecture, Response][] = await Promise.all(
      prefs.map(async (p) => [
        p,
        await this.executeRequest<Response>(
          `/population/composition/perYear?prefCode=${p.id}&cityCode=-`
        ),
      ])
    );

    return resp.map(([pref, change]) =>
      this.convertResponseToPopulationChange(pref, change.result)
    );
  }

  private convertResponseToPopulationChange(
    pref: Prefecture,
    response: PopulationChangeResponse
  ): PopulationChange {
    const summaryPopulationChange = response.data.find(
      (d) => d.label === "総人口"
    );
    if (summaryPopulationChange === undefined) {
      // safety: API Scheme specifies there is the data with label '総人口', so this must not be occured.
      throw new Error(
        "Expected the data with label '総人口', but it didn't exist"
      );
    }

    return {
      pref,
      changes: summaryPopulationChange.data.map(
        this.convertResponseToPopulation
      ),
      forecastBoundary: response.boundaryYear,
    };
  }

  private convertResponseToPopulation(
    change: AnnualPopulationChangeResponse
  ): Population {
    const year = safelyParseNumber(change.year);
    const population = safelyParseNumber(change.value);

    if (year === undefined || population === undefined) {
      // safety: API Scheme specifies this is numeric string, so this must not be occurred.
      throw new Error("Couldn't parse year or population into number");
    }

    return { year, population };
  }
}
