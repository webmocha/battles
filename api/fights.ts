import fetch from "isomorphic-unfetch";

export const getFightData = (): Promise<any> =>
  fetch("/api/npm/downloads/point/last-day/react");
