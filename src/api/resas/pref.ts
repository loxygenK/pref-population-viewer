import { Prefecture } from "~/domain/prefecture";
import { PrefectureAPI } from "../interface/pref";
import { buildRESASReqeuster, RESASRequester } from "./request";
import { RESASRequestConfig, RESASResponse } from "./types";

interface PrefectureResponse {
  prefCode: string;
  prefName: string;
}
type Response = RESASResponse<Array<PrefectureResponse>>;

export class RESASPrefectureAPI implements PrefectureAPI {
  private readonly executeRequest: RESASRequester;

  constructor(config: RESASRequestConfig) {
    this.executeRequest = buildRESASReqeuster(config);
  }

  async fetchPrefectures(): Promise<Prefecture[]> {
    const response = await this.executeRequest<Response>("/prefectures");
    return response.result.map(this.convertResponseToPrefecture);
  }

  private convertResponseToPrefecture(
    response: PrefectureResponse
  ): Prefecture {
    return {
      id: response.prefCode,
      name: response.prefName,
    };
  }
}
