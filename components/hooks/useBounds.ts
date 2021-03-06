import * as React from "react";
import throttle from "lodash/throttle";

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

const getBounds = (node?: SVGSVGElement): Bounds => {
  const rect = node
    ? Boolean(node.getBBox)
      ? node.getBBox()
      : (node.getBoundingClientRect() as DOMRect)
    : null;

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

  React.useEffect(() => {
    if (node) {
      const updateBounds = throttle(
        (): number =>
          window.requestAnimationFrame(() => setBounds(getBounds(node))),
        200,
      );
      updateBounds();

      // Helps Firefox render correctly..
      const timeoutID = setTimeout(() => {
        updateBounds();
      }, 0);

      window.addEventListener("resize", updateBounds);
      return () => {
        window.removeEventListener("resize", updateBounds);
        window.clearTimeout(timeoutID);
      };
    }
  }, [node, bounds.height, bounds.width]);

  return [bounds, ref];
};

export default useBounds;
