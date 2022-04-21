import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
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

  fetchPopulationChange(prefs: Prefecture[]): Promise<PopulationChange[]> {
    const prefIDs = prefs.map((p) => p.id);

    return this.executeRequest(
      `/api/proxy/population?prefIDs=${prefIDs.join(",")}`
    );
  }
}
