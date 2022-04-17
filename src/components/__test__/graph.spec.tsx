import renderer from "react-test-renderer";
import { PopulationChangeGraph } from "../graph";

describe("Header component", () => {
  it("renders correctly", () => {
    // Using empty array for the props `populationChanges` because the snapshot of inside of canvas
    // (which the graph rendered) cannot be taken.
    const tree = renderer
      .create(<PopulationChangeGraph populationChanges={[]} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
