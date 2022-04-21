import { getEnvironmentVariable } from "~/util/getEnvironmentVariable";
import { APIClient } from "./type";
import { buildMockClient } from "./mock/buildClient";
import { buildRESASClient } from "./resas/buildClient";

const buildClient = (): APIClient => {
  const mode = getEnvironmentVariable("API_MODE");

  if (mode === "dev") {
    return buildMockClient();
  } else if (mode === "prod") {
    return buildRESASClient();
  } else {
    throw new Error("Invalid value, set either of 'dev' or 'prod'");
  }
};

export const apiClient = buildClient();
