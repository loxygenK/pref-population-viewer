import renderer from "react-test-renderer";
import { AsyncDataHandler } from "../asyncDataHandler";

describe("Async data handler", () => {
  it("renders the children with resolved data when data is available", async () => {
    const tree = renderer
      .create(
        <AsyncDataHandler data="Some data" error={undefined}>
          {(data) => <p>{data}</p>}
        </AsyncDataHandler>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders the error screen when error is provided", async () => {
    const tree = renderer
      .create(
        <AsyncDataHandler data={undefined} error={new Error("It failed")}>
          {(_) => {
            fail("This must not be rendered!");
          }}
        </AsyncDataHandler>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
