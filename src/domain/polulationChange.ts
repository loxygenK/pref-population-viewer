import { Prefecture } from "./prefecture";

export type Year = number;

export interface Population {
  year: Year;
  population: number;
}

export interface PopulationChange {
  pref: Prefecture;
  changes: Array<Population>;

  /**
   * The boundary where the population switches from actual measured datas to forecast data.
   * The data which the year is {forecastBoundary} must be actual measured data.
   */
  forecastBoundary: Year;
}

export const getSortedPopulationChange = (
  change: PopulationChange
): Array<Population> => {
  return change.changes.sort((c) => c.year);
};

export const getActualMeasuredChanges = (
  change: PopulationChange
): Array<Population> => {
  return getSortedPopulationChange(change).filter(
    (c) => c.year <= change.forecastBoundary
  );
};
