import renderer from "react-test-renderer";
import { CheckBoxList } from "../checkboxList";

describe("Checkbox list component", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(
        <CheckBoxList
          values={Array.from({ length: 10 }).map((_, i) => ({
            id: i.toString(),
            value: `ID ${i}`,
          }))}
          checkedIDs={Array.from({ length: 10 }).map((_, i) =>
            (i * 2).toString()
          )}
          onChange={() => {}}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
