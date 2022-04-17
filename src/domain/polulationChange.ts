import { Prefecture } from "./prefecture";

export type Year = number;

export class Population {
  readonly year: Year;
  readonly population: number;

  constructor(year: Year, population: number) {
    this.year = year;
    this.population = population;
  }
}

export class PopulationChange {
  readonly pref: Prefecture;
  readonly forecastBoundary: Year;

  private readonly changes: Array<Population>;

  /**
   * @param forecastBoundary The boundary where the population switches from actual measured datas to forecast data.
   *        The data which the year is {forecastBoundary} must be actual measured data.
   * @param changes The list of the annual prefecture. The list will be cloned and sorted internally, and does not have to be sorted.
   */
  constructor(
    pref: Prefecture,
    forecastBoundary: Year,
    changes: Array<Population>
  ) {
    if (changes.find((c) => c.year === forecastBoundary) === undefined) {
      throw new RangeError(
        `Forecast boundary year ${forecastBoundary} is not included in the changes list`
      );
    }

    this.pref = pref;
    this.forecastBoundary = forecastBoundary;
    this.changes = [...changes].sort((c) => c.year);
  }

  getSortedChanges() {
    return this.changes;
  }

  getSortedActualChanges() {
    return this.changes.filter((c) => c.year <= this.forecastBoundary);
  }

  getSortedForecastChanges() {
    return this.changes.filter((c) => c.year > this.forecastBoundary);
  }
}
