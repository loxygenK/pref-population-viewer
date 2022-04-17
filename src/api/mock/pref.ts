import { Prefecture } from "~/domain/prefecture";
import { PrefectureAPI } from "../interface/pref";
import { delay } from "./util";

export class MockPrefectureAPI implements PrefectureAPI {
  async fetchPrefectures(): Promise<Prefecture[]> {
    await delay(500);

    return Array.from({ length: 50 }).map(
      (_, i) => new Prefecture(`pref-${i}`, `Pref. #${i}`)
    );
  }
}
