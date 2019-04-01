import { Bounds } from "../hooks/useBounds";

export const sumPreviousHeights = (
  elements: any[],
  index: number,
  margin: number,
): number =>
  elements
    .slice(0, index)
    .reduce((acc: number, bounds: Bounds) => acc + bounds.height + margin, 0);
