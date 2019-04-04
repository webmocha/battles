import { DownloadsResponse } from "../api/fight";
import get from "lodash/get";

const groupInPairs = (arr: string[]): string[][] =>
  arr.reduce(
    (acc, _item, index) => {
      if (index % 2 === 0) {
        const items = arr.slice(index, index + 2);
        acc.push(items);
      }
      return acc;
    },
    [] as string[][],
  );

export const getWinners = (
  contenders: string[][],
  data: DownloadsResponse = {},
): string[] =>
  contenders.reduce((acc, items) => {
    const [a, b] = items;
    if (!b) {
      return [...acc, a];
    }
    const outcomeA = get(data, `${a}.outcome`, 0);
    const outcomeB = get(data, `${b}.outcome`, 0);
    const winner = outcomeA > outcomeB ? a : b;
    return [...acc, winner];
  }, []);

const generateMatchUp = (data: DownloadsResponse): string[][][] => {
  const keys = Object.keys(data);
  if (keys.length === 0) {
    return [];
  }

  const initialRound = groupInPairs(keys);
  const matchup: string[][][] = [initialRound];

  const generateMatches = (matches: string[][]): void => {
    const firstMatch = matches[0];
    if (firstMatch.length === 1) {
      return;
    }

    const nextRoundMatches = groupInPairs(getWinners(matches, data));
    matchup.push(nextRoundMatches);
    generateMatches(nextRoundMatches);
  };

  generateMatches(initialRound);
  return matchup;
};

export default generateMatchUp;
