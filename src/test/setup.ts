import dotenv from "dotenv";
import path from "path";

import "jest-canvas-mock";

class MockResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}

  disconnect() {}
  observe(_target: Element, _options?: ResizeObserverOptions) {}
  unobserve(_target: Element) {}
}
global.ResizeObserver = MockResizeObserver;

export default (): void => {
  dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
};
