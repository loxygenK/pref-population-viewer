import { getEnvironmentVariable } from "~/util/getEnvironmentVariable";
import { APIProxyClientSet } from "../types";
import { ExternalPopulationChangeAPIProxy } from "./population";
import { ExternalPrefectureAPIProxy } from "./pref";
import { ProxyRequestConfig } from "./types";

export const buildExternalProxyClient = (): APIProxyClientSet => {
  const apiOrigin = getEnvironmentVariable("NEXT_PUBLIC_API_ORIGIN");
  const config: ProxyRequestConfig = {
    origin: apiOrigin,
  };

  return {
    pref: new ExternalPrefectureAPIProxy(config),
    population: new ExternalPopulationChangeAPIProxy(config),
  };
};
