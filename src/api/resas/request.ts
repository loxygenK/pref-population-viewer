import axios from "axios";
import { RESASRequestConfig } from "./types";

export type RESASRequester = <T>(endpoint: string) => Promise<T>;
export const buildRESASReqeuster: (
  config: RESASRequestConfig
) => RESASRequester = (config) => {
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
        "X-API-KEY": config.apiKey,
      },
    });

    return request.data;
  };
};
