import { Prefecture } from "~/domain/prefecture";
import { PrefectureAPI } from "../interface/pref";

export class RESASPrefectureAPI implements PrefectureAPI {
  private readonly apiKey: string;
  private readonly origin: string;

  constructor(apiKey: string, origin: string) {
    this.apiKey = apiKey;
    this.origin = origin;
  }

  fetchPrefectures(): Promise<Prefecture[]> {
    throw new Error("Method not implemented.");
  }
}
