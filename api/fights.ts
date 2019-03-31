import * as fetch from "isomorphic-unfetch";

export const getFightData = (query) =>
  fetch("/api/npm/downloads/point/last-day/react");
