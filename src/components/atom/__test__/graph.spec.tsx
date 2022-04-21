import renderer from "react-test-renderer";
import { PopulationChangeGraph } from "../graph";

describe("Header component", () => {
  it("renders the suggestion correctly when no populationChange is supplied", () => {
    const tree = renderer
      .create(<PopulationChangeGraph populationChanges={[]} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders the suggestion correctly when no populationChange is supplied", () => {
    const tree = renderer
      .create(
        <PopulationChangeGraph
          populationChanges={[
            {
              dataIndex: 0,
              populationChange: {
                forecastBoundary: 2010,
                pref: { id: "0", name: "Prefecture" },
                changes: [
                  { year: 2000, population: 100000 },
                  { year: 2010, population: 200000 },
                  { year: 2020, population: 300000 },
                ],
              },
            },
          ]}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
