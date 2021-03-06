import { PopulationChangeGraph } from "../populationChangeGraph";
import { renderStatefulComponent } from "~/test/renderStatefulComponent";

describe("Header component", () => {
  it("renders the suggestion correctly when no populationChange is supplied", async () => {
    const rendered = await renderStatefulComponent((root) => {
      root.render(<PopulationChangeGraph prefsToShow={[]} />);
    });

    expect(rendered).toMatchSnapshot();
  });

  it("renders the suggestion correctly when no populationChange is supplied", async () => {
    const rendered = await renderStatefulComponent((root) => {
      root.render(
        <PopulationChangeGraph
          prefsToShow={[
            { id: "0", name: "prefs-0" },
            { id: "1", name: "prefs-1" },
            { id: "2", name: "prefs-2" },
          ]}
        />
      );
    });

    expect(rendered).toMatchSnapshot();
  });
});
