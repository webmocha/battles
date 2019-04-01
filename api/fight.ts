import fetch from "isomorphic-unfetch";
import { format, subDays } from "date-fns";

export interface Download {
  downloads: number;
  day: string;
}

export interface PackageEntry {
  downloads: Download[];
  package: string;
  outcome?: number;
}

export interface DownloadsResponse {
  [key: string]: PackageEntry;
}

export const getFightData = (packages: string): Promise<any> => {
  const twoDaysBefore = format(subDays(new Date(), 2), "YYYY-MM-DD");
  const oneDayBefore = format(subDays(new Date(), 1), "YYYY-MM-DD");
  const endpoint = `downloads/range/${twoDaysBefore}:${oneDayBefore}/${packages}`;
  return fetch(`/api/npm/${endpoint}`);
};
