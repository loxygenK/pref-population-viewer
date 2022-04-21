import { Prefecture } from "~/domain/prefecture";
import { PrefectureAPIProxy } from "../interface/pref";
import { buildProxyReqeuster, ProxyRequester } from "./request";
import { ProxyRequestConfig } from "./types";

export class ExternalPrefectureAPIProxy implements PrefectureAPIProxy {
  private readonly executeRequest: ProxyRequester;

  constructor(config: ProxyRequestConfig) {
    this.executeRequest = buildProxyReqeuster(config);
  }

  async fetchPrefectures(): Promise<Prefecture[]> {
    return await this.executeRequest("/api/proxy/pref");
  }
}
