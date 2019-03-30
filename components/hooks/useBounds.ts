import * as React from "react";

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

const getBounds = (node?: HTMLElement): Bounds => {
  const rect = node ? (node.getBoundingClientRect() as DOMRect) : null;
  return {
    x: rect ? rect.x : 0,
    y: rect ? rect.y : 0,
    height: rect ? rect.height : 0,
    width: rect ? rect.width : 0,
  };
};

const useBounds = (): [Bounds, any] => {
  const [bounds, setBounds] = React.useState(getBounds());
  const [node, setNode] = React.useState();

  const ref = React.useCallback((element) => {
    setNode(element);
  }, []);

  React.useLayoutEffect(() => {
    if (node) {
      const updateBounds = (): number =>
        window.requestAnimationFrame(() => setBounds(getBounds(node)));
      updateBounds();

      setTimeout(() => {
        updateBounds();
      }, 0);

      window.addEventListener("resize", updateBounds);
      return () => {
        window.removeEventListener("resize", updateBounds);
      };
    }
  }, [node, bounds.height, bounds.width]);

  return [bounds, ref];
};

export default useBounds;
