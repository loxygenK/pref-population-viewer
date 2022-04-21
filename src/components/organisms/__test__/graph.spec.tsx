import renderer from "react-test-renderer";
import { PopulationChangeGraph } from "../populationChangeGraph";

describe("Header component", () => {
  it("renders the suggestion correctly when no populationChange is supplied", () => {
    const tree = renderer
      .create(<PopulationChangeGraph prefsToShow={[]} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders the suggestion correctly when no populationChange is supplied", () => {
    const tree = renderer
      .create(
        <PopulationChangeGraph
          prefsToShow={[
            { id: "0", name: "prefs-0" },
            { id: "1", name: "prefs-1" },
            { id: "2", name: "prefs-2" },
          ]}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
