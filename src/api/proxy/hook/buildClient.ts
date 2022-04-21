import { getEnvironmentVariable } from "~/util/getEnvironmentVariable";
import { buildExternalProxyClient } from "../actual/buildClient";
import { buildMockProxyClient } from "../mock/buildClient";
import { APIProxyClientSet } from "../types";

export const buildProxyClient = (): APIProxyClientSet => {
  const mode = getEnvironmentVariable("PROXY_MODE");

  if (mode === "dev") {
    return buildMockProxyClient();
  } else if (mode === "prod") {
    return buildExternalProxyClient();
  } else {
    throw new Error("Invalid value, set either of 'dev' or 'prod'");
  }
};
