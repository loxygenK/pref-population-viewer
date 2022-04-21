import { Prefecture } from "~/domain/prefecture";
import { PrefectureAPIProxy } from "../interface/pref";

export class MockPrefectureAPIProxy implements PrefectureAPIProxy {
  async fetchPrefectures(): Promise<Prefecture[]> {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: `pref-${i}`,
      name: `Pref. #${i}`,
    }));
  }
}
