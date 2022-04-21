import React from "react";
import { APIProxyClientSet } from "../types";
import { buildProxyClient } from "./buildClient";

const apiProxyClientContext = React.createContext<APIProxyClientSet>(
  buildProxyClient()
);

export const useAPIProxyClient = () => {
  return React.useContext(apiProxyClientContext);
};
