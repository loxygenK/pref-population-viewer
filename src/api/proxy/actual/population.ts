import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import { ProxyAPIResponse } from "~/dto/proxyAPIResponse";
import { PopulationChangeAPIProxy } from "../interface/population";
import { buildProxyReqeuster, ProxyRequester } from "./request";
import { ProxyRequestConfig } from "./types";

export class ExternalPopulationChangeAPIProxy
  implements PopulationChangeAPIProxy
{
  private readonly executeRequest: ProxyRequester;

  constructor(config: ProxyRequestConfig) {
    this.executeRequest = buildProxyReqeuster(config);
  }

  async fetchPopulationChange(
    prefs: Prefecture[]
  ): Promise<PopulationChange[]> {
    const prefIDs = prefs.map((p) => p.id);
    const response = await this.executeRequest<
      ProxyAPIResponse<Array<PopulationChange>>
    >(`/api/proxy/population?prefIDs=${prefIDs.join(",")}`);

    if (response.status !== "success") {
      throw new Error(`Request failed with ${response.status}`);
    }

    return response.data;
  }
}
