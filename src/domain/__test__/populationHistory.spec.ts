import { Population, PopulationChange } from "../polulationChange";
import { Prefecture } from "../prefecture";

const mockedPrefecture = new Prefecture("000", "Any Pref.");
const mockedPopulation = [
  new Population(2000, 100000),
  new Population(2005, 200000),
  new Population(2010, 300000),
  new Population(2015, 400000),
  new Population(2020, 500000),
];

describe("Population change object", () => {
  test("forecast boundary must be included in the list", () => {
    expect(
      () => new PopulationChange(mockedPrefecture, 2000, mockedPopulation)
    ).not.toThrowError();
    expect(
      () => new PopulationChange(mockedPrefecture, 2001, mockedPopulation)
    ).toThrowError();
  });

  test("sorted actual or forecast changes can be get", () => {
    const populationChange = new PopulationChange(
      mockedPrefecture,
      2010,
      mockedPopulation
    );

    const actual = populationChange.getSortedActualChanges();
    const forecast = populationChange.getSortedForecastChanges();
    const all = populationChange.getSortedChanges();

    expect(actual.length).toBe(3);
    expect(actual[2].year).toBe(2010);

    expect(forecast.length).toBe(2);
    expect(forecast[0].year).toBe(2015);

    expect(all.length).toBe(5);
  });
});
