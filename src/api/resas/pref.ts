import { Prefecture } from "~/domain/prefecture";
import { PrefectureAPI } from "../interface/pref";
import { buildRESASReqeuster, RESASRequester } from "./request";
import { RESASRequestConfig } from "./types";

export class RESASPrefectureAPI implements PrefectureAPI {
  private readonly executeRequest: RESASRequester;

  constructor(config: RESASRequestConfig) {
    this.executeRequest = buildRESASReqeuster(config);
  }

  fetchPrefectures(): Promise<Prefecture[]> {
    throw new Error("Method not implemented.");
  }
}
