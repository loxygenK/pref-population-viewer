import { createRoot, Root } from "react-dom/client";

export const testUnpureComponent = async (
  testProcedure: (root: Root, container: Element) => Promise<void>
) => {
  (global as any).IS_REACT_ACT_ENVIRONMENT = true;

  const container = document.createElement("div");
  // const root = createRoot(container);
  document.body.appendChild(container);

  await testProcedure(undefined!, container);

  // root.unmount();
  document.body.removeChild(container);
};
