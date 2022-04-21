import Home from "~/pages/index.page";
import { renderStatefulComponent } from "~/test/renderStatefulComponent";

describe("index page", () => {
  it("renders correctly", async () => {
    const rendered = await renderStatefulComponent((root) => {
      root.render(<Home />);
    });

    expect(rendered).toMatchSnapshot();
  });
});
