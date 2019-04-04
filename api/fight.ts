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
  error?: string;
  start?: string;
  end?: string;
}

export interface DownloadsResponse {
  [key: string]: PackageEntry;
}

export const getFightData = async (packages: string): Promise<any> => {
  if (!packages) return;
  const twoDaysBefore = format(subDays(new Date(), 2), "YYYY-MM-DD");
  const oneDayBefore = format(subDays(new Date(), 1), "YYYY-MM-DD");
  const responses = await Promise.all(
    packages
      .split(",")
      .map((p) =>
        fetch(`/api/npm/downloads/range/${twoDaysBefore}:${oneDayBefore}/${p}`),
      ),
  );

  const payload = await Promise.all(
    responses.filter((r) => r.status === 200).map((r) => r.json()),
  );

  return payload.reduce(
    (packages, p) => ({
      ...packages,
      [p.package]: p,
    }),
    {},
  );
};
