import * as React from "react";

interface Bounds {
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

  const ref = React.useCallback((node) => {
    if (node !== null) {
      setBounds(getBounds(node));
    }
  }, []);

  return [bounds, ref];
};

export default useBounds;
