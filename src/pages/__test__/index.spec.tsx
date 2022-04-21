import { createRoot } from "react-dom/client";
import { act } from "react-test-renderer";
import Home from "~/pages/index.page";
import { testUnpureComponent } from "~/test/testUnpureComponent";

describe("index page", () => {
  it("renders correctly", async () => {
    await testUnpureComponent(async (_, container) => {
      await act(async () => {
        createRoot(container).render(<Home />);

        await new Promise((res) => setTimeout(res, 1500));
      });

      expect(container.innerHTML).toMatchSnapshot();
    });
  });
});
