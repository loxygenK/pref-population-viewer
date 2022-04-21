import { Prefecture } from "~/domain/prefecture";

export interface PrefectureAPI {
  fetchPrefectures(): Promise<Array<Prefecture>>;
}
