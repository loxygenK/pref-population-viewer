import { APIProxyClientSet } from "../types";
import { ExternalPopulationChangeAPIProxy } from "./population";
import { ExternalPrefectureAPIProxy } from "./pref";
import { ProxyRequestConfig } from "./types";

export const buildExternalProxyClient = (): APIProxyClientSet => {
  const apiOrigin = process.env.NEXT_PUBLIC_API_ORIGIN;
  if (apiOrigin === undefined) {
    throw new Error("NEXT_PUBLIC_API_ORIGIN must be set");
  }
  const config: ProxyRequestConfig = {
    origin: apiOrigin,
  };

  return {
    pref: new ExternalPrefectureAPIProxy(config),
    population: new ExternalPopulationChangeAPIProxy(config),
  };
};
