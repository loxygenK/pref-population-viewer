import { Prefecture } from "~/domain/prefecture";
import { PrefectureAPI } from "../interface/pref";

export class MockPrefectureAPI implements PrefectureAPI {
  fetchPrefectures(): Promise<Prefecture[]> {
    throw new Error("Method not implemented.");
  }
}
