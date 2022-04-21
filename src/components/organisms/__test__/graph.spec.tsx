import { createRoot } from "react-dom/client";
import { act } from "react-test-renderer";
import { testUnpureComponent } from "~/test/testUnpureComponent";
import { PopulationChangeGraph } from "../populationChangeGraph";

import "jest-canvas-mock";
global.ResizeObserver = class MockResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}

  disconnect() {}
  observe(_target: Element, _options?: ResizeObserverOptions) {}
  unobserve(_target: Element) {}
};

describe("Header component", () => {
  it("renders the suggestion correctly when no populationChange is supplied", async () => {
    await testUnpureComponent(async (root, container) => {
      await act(async () => {
        createRoot(container).render(
          <PopulationChangeGraph prefsToShow={[]} />
        );

        await new Promise((res) => setTimeout(res, 1500));
      });
      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  it("renders the suggestion correctly when no populationChange is supplied", async () => {
    await testUnpureComponent(async (root, container) => {
      await act(async () => {
        createRoot(container).render(
          <PopulationChangeGraph
            prefsToShow={[
              { id: "0", name: "prefs-0" },
              { id: "1", name: "prefs-1" },
              { id: "2", name: "prefs-2" },
            ]}
          />
        );

        await new Promise((res) => setTimeout(res, 1500));
      });

      expect(container.innerHTML).toMatchSnapshot();
    });
  });
});
