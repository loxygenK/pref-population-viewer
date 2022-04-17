import renderer from "react-test-renderer";
import Home from "~/pages/index";

describe("index page", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<Home />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
