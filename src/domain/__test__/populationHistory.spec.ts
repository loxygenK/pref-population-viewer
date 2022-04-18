import {
  getActualMeasuredChanges,
  getSortedPopulationChange,
  Population,
  PopulationChange,
} from "../polulationChange";
import { Prefecture } from "../prefecture";

const mockedPrefecture: Prefecture = {
  id: "000",
  name: "Hoge",
};
const mockedPopulation: Array<Population> = [
  { year: 2000, population: 100000 },
  { year: 2005, population: 200000 },
  { year: 2010, population: 300000 },
  { year: 2015, population: 400000 },
  { year: 2020, population: 500000 },
];
const mockedPopulationChange: PopulationChange = {
  pref: mockedPrefecture,
  changes: mockedPopulation,
  forecastBoundary: 2010,
};

const isSorted = (array: Array<Population>) => {
  for (let i = 1; i < array.length; i++) {
    if (array[i].year - array[i - 1].year < 0) {
      return false;
    }
  }

  return true;
};

describe("Population change object", () => {
  test("sorted actual changes can be get", () => {
    const actual = getActualMeasuredChanges(mockedPopulationChange);

    expect(actual.length).toBe(3);
    expect(actual[2].year).toBe(2010);
  });
  test("All changes and actual changes can be sorted", () => {
    const sortedAllChange = getSortedPopulationChange(mockedPopulationChange);
    const sortedActualChange = getActualMeasuredChanges(mockedPopulationChange);

    expect(isSorted(sortedAllChange)).toBe(true);
    expect(isSorted(sortedActualChange)).toBe(true);
  });
});
