import renderer from "react-test-renderer";
import { PopulationChange } from "~/domain/polulationChange";
import Home from "~/pages/index";

describe("index page", () => {
  test("renders correctly", () => {
    const prefectures = Array.from({ length: 5 }).map((_, i) => ({
      id: `pref-${i}`,
      name: `Pref #${i}`,
    }));

    const populationChanges: Array<PopulationChange> = prefectures.map((p) => ({
      pref: p,
      forecastBoundary: 2010,
      changes: [
        { year: 2000, population: 100000 },
        { year: 2010, population: 200000 },
        { year: 2020, population: 300000 },
      ],
    }));

    const tree = renderer
      .create(
        <Home prefectures={prefectures} populationChanges={populationChanges} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
