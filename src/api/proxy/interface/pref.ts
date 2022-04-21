import { Prefecture } from "~/domain/prefecture";

export interface PrefectureAPIProxy {
  fetchPrefectures(): Promise<Array<Prefecture>>;
}
