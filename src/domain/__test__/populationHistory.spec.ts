import {
  getActualMeasuredChanges,
  getSortedPopulationChange,
  Population,
  PopulationChange,
} from "../polulationChange";

const mockedPopulationChange: PopulationChange = {
  pref: { id: "000", name: "Hoge" },
  changes: [
    { year: 2000, population: 100000 },
    { year: 2005, population: 200000 },
    { year: 2010, population: 300000 },
    { year: 2015, population: 400000 },
    { year: 2020, population: 500000 },
  ],
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
  test("Actual changes can be filtered out", () => {
    const actual = getActualMeasuredChanges(mockedPopulationChange);

    expect(actual.length).toBe(3);
    expect(actual[2].year).toBe(2010);
  });

  test("All changes and actual changes can be sorted by the year", () => {
    const sortedAllChange = getSortedPopulationChange(mockedPopulationChange);
    const sortedActualChange = getActualMeasuredChanges(mockedPopulationChange);

    expect(isSorted(sortedAllChange)).toBe(true);
    expect(isSorted(sortedActualChange)).toBe(true);
  });
});
