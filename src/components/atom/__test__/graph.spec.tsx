import renderer from "react-test-renderer";
import { Graph } from "../graph";

describe("Header component", () => {
  it("renders correcrly", () => {
    const tree = renderer
      .create(
        <Graph
          dataSeries={[
            {
              name: "Hoge",
              data: [
                { x: 2000, y: 100000 },
                { x: 2010, y: 200000 },
                { x: 2020, y: 300000 },
              ],
            },
          ]}
          xUnit="Xunit"
          yUnit="Yunit"
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
