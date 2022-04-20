import renderer from "react-test-renderer";
import { ToggleButton } from "../toggleButton";

describe("Section wrapper component", () => {
  it("renders correctly when button is not pressed", () => {
    const tree = renderer
      .create(
        <ToggleButton
          captionWhenUnpressed="Unpressed"
          captionWhenPressed="Pressed"
          pressed={false}
          onChange={() => {}}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when button is pressed", () => {
    const tree = renderer
      .create(
        <ToggleButton
          captionWhenUnpressed="Unpressed"
          captionWhenPressed="Pressed"
          pressed={true}
          onChange={() => {}}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
