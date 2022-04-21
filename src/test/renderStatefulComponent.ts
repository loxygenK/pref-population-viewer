import { createRoot, Root } from "react-dom/client";
import { act } from "react-test-renderer";

export const renderStatefulComponent = async (
  render: (root: Root) => void
): Promise<string> => {
  const previousEnvironmentConfig = (global as any).IS_REACT_ACT_ENVIRONMENT;
  (global as any).IS_REACT_ACT_ENVIRONMENT = true;

  const container = document.createElement("div");
  document.body.appendChild(container);

  let root: Root | undefined;
  await act(async () => {
    const root = createRoot(container);
    render(root);
    await new Promise((res) => setTimeout(res, 1500));
  });

  const innerHTML = container.innerHTML;
  document.body.removeChild(container);
  root?.unmount();

  (global as any).IS_REACT_ACT_ENVIRONMENT = previousEnvironmentConfig;

  return innerHTML;
};
