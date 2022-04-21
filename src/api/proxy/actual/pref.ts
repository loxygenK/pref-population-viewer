import { Prefecture } from "~/domain/prefecture";
import { ProxyAPIResponse } from "~/dto/proxyAPIResponse";
import { PrefectureAPIProxy } from "../interface/pref";
import { buildProxyReqeuster, ProxyRequester } from "./request";
import { ProxyRequestConfig } from "./types";

export class ExternalPrefectureAPIProxy implements PrefectureAPIProxy {
  private readonly executeRequest: ProxyRequester;

  constructor(config: ProxyRequestConfig) {
    this.executeRequest = buildProxyReqeuster(config);
  }

  async fetchPrefectures(): Promise<Array<Prefecture>> {
    const response = await this.executeRequest<
      ProxyAPIResponse<Array<Prefecture>>
    >("/api/proxy/pref");
    if (response.status !== "success") {
      throw new Error(`Request failed with ${response.status}`);
    }

    return response.data;
  }
}
