import { renderStatefulComponent } from "~/test/renderStatefulComponent";
import { PrefectureCheckBoxList } from "../prefectureCheckboxList";

describe("Header component", () => {
  it("renders correctly", async () => {
    const rendered = await renderStatefulComponent((root) => {
      root.render(
        <PrefectureCheckBoxList selectedPrefs={[]} onChange={() => {}} />
      );
    });

    expect(rendered).toMatchSnapshot();
  });
});
