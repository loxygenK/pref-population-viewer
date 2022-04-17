import React from "react";
import { buildMockClient } from "../interface/buildClient";
import { APIClient } from "./type";

const buildClient = (): APIClient => {
  const mode = process.env.NEXT_PUBLIC_API_MODE;

  if (mode === "dev") {
    return buildMockClient();
  } else {
    throw new Error("not implemented");
  }
};

const APIClientContext = React.createContext<APIClient>(buildClient());

export const useAPIClient = (): APIClient => {
  return React.useContext(APIClientContext);
};
