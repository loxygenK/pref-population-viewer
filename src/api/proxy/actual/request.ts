import axios from "axios";
import { ProxyRequestConfig } from "./types";

export type ProxyRequester = <T>(endpoint: string) => Promise<T>;
export const buildProxyReqeuster = (
  config: ProxyRequestConfig
): ProxyRequester => {
  return async <T>(endpoint: string): Promise<T> => {
    const trimmedOrigin = config.origin.endsWith("/")
      ? config.origin.substring(0, config.origin.length - 1)
      : config.origin;
    const prefixedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

    const request = await axios({
      method: "GET",
      url: `${trimmedOrigin}${prefixedEndpoint}`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return request.data;
  };
};
