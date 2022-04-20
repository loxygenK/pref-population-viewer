import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import { safelyParseNumber } from "~/util/safelyParseNumber";
import { PopulationChangeAPI } from "../interface/population";
import { buildRESASReqeuster, RESASRequester } from "./request";
import { RESASRequestConfig, RESASResponse } from "./types";

interface AnnualPopulationChangeResponse {
  year: string;
  value: string;
}
interface PopulationChangeResponse {
  boundaryYear: number;
  data: Array<AnnualPopulationChangeResponse>;
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
    return {
      pref,
      changes: response.data.map((d) => ({
        year: safelyParseNumber(d.year),
        population: safelyParseNumber(d.value),
      })),
      forecastBoundary: response.boundaryYear,
    };
  }
}
