import { DownloadsResponse } from "../api/fight";

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

const generateMatchUp = (data: DownloadsResponse): string[][][] => {
  const keys = Object.keys(data);
  if (keys.length === 0) {
    return [];
  }

  const initialRound = groupInPairs(keys);
  const matchup: string[][][] = [initialRound];

  const getWinners = (arr: string[][]): string[] =>
    arr.reduce((acc, items) => {
      const [a, b] = items;
      const winner = data[a].outcome! < data[b].outcome! ? a : b;
      return [...acc, winner];
    }, []);

  const generateMatches = (matches: string[][]): void => {
    const firstMatch = matches[0];
    if (firstMatch.length === 1) {
      return;
    }

    const nextRoundMatches = groupInPairs(getWinners(matches));
    matchup.push(nextRoundMatches);
    generateMatches(nextRoundMatches);
  };

  generateMatches(initialRound);
  return matchup;
};

export default generateMatchUp;
