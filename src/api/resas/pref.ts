import { Prefecture } from "~/domain/prefecture";
import { PrefectureAPI } from "../interface/pref";
import { RESASRequestConfig } from "./types";

export class RESASPrefectureAPI implements PrefectureAPI {
  private readonly config: RESASRequestConfig;

  constructor(config: RESASRequestConfig) {
    this.config = config;
  }

  fetchPrefectures(): Promise<Prefecture[]> {
    throw new Error("Method not implemented.");
  }
}
