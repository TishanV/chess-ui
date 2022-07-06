import { PGNObject } from "./types";

export const newPGNObject = (score: string[]): PGNObject => ({
  Event: "",
  White: "",
  Black: "",
  Date: "",
  score: score,
});

const stringifyPGNMeta = (meta: PGNObject) =>
  Object.keys(meta)
    .map((key) => `[${key} "${meta[key as keyof PGNObject]}"]`)
    .join("\n");

const sanWord = (san: string, i: number) =>
  i % 2 ? san : `${Math.floor(i / 2) + 1}.${san}`;

const stringifyScore = (score: string[]) =>
  score.map((e, i) => sanWord(e, i)).join(" ");

export const toPGN = (pgnObj: PGNObject): string =>
  stringifyPGNMeta(
    Object.fromEntries(
      Object.entries(pgnObj).filter(([k, _]) => k !== "score")
    ) as PGNObject
  ) +
  "\n\n" +
  stringifyScore(pgnObj.score);

//

const decodeMeta = (metaWord: string) => {
  const metaEntry = metaWord
    .replace(/[\[\]]/g, "")
    .split('"')
    .slice(0, 2);
  metaEntry[0] = metaEntry[0]?.replace(/[^a-zA-Z]/g, "");
  return metaEntry.length === 2 ? metaEntry : null;
};

const getMetas = (word: string) =>
  word.match(/\[.+\]/g)?.map((m) => decodeMeta(m)) || [];

const getScore = (word: string) =>
  word
    .replace(/\n/g, " ")
    .replace(/\[.+\]|{.+}|[{}]|[0-9]+\./g, "")
    .split(" ")
    .filter((e) => e && !["1-0", "0-1", "1/2-1/2"].includes(e));

export const fromPGN = (pgn: string): PGNObject[] => {
  const pgnGames = pgn.split(/\n1\./g);
  const metas = pgnGames.slice(0, -1).map((w) => getMetas(w));
  const scores = pgnGames.slice(1).map((w) => getScore(w));
  return scores.map((score, i) => ({
    ...Object.fromEntries((metas[i] as []) || []),
    score,
  })) as PGNObject[];
};
