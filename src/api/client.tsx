import { APIClient } from "./hook/type";
import { buildMockClient } from "./interface/buildClient";

const buildClient = (): APIClient => {
  const mode = process.env.NEXT_PUBLIC_API_MODE;

  if (mode === "dev") {
    return buildMockClient();
  } else {
    throw new Error("not implemented");
  }
};

export const apiClient = buildClient();
