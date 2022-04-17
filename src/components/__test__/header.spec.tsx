import renderer from "react-test-renderer";
import { Header } from "../header";

describe("Header component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Header />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
