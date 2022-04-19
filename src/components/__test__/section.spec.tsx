import renderer from "react-test-renderer";
import { Section } from "../section";

describe("Section wrapper component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Section title="Section">
          <p>Random content</p>
        </Section>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
