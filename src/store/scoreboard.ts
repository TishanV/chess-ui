import { selector, atomFamily, atom, DefaultValue } from "recoil";

interface Score {
  value: string;
  isSelected: boolean;
}

export const score = atomFamily<Score, number>({
  key: "score",
  default: {
    value: "",
    isSelected: false,
  },
});

const selectedScoreID = atom<number>({
  key: "selected-score-id",
  default: 0,
});

export const scoreIDs = atom<number[]>({
  key: "score-ids",
  default: [],
});

export const selectScore = selector<number>({
  key: "select-score-by-id",
  get: ({ get }) => get(selectedScoreID),
  set: ({ set, get }, id) => {
    if (id instanceof DefaultValue) return;
    set(score(get(selectedScoreID)), (v) => ({ ...v, isSelected: false }));
    set(score(id), (v) => ({ ...v, isSelected: true }));
    set(selectedScoreID, id);
  },
});

export const pushScore = selector<string>({
  key: "push-score",
  get: () => "",
  set: ({ set, get }, score_value) => {
    if (score_value instanceof DefaultValue) return;
    const new_id = get(scoreIDs).length + 1;
    set(selectScore, new_id);
    set(score(new_id), { value: score_value, isSelected: true });
    set(scoreIDs, (v) => [...v, new_id]);
  },
});

export const popScore = selector({
  key: "pop-score",
  get: ({ get }) => get(score(get(scoreIDs).length)),
  set: ({ set, get, reset }) => {
    const last_id = get(scoreIDs).length;
    if (last_id == 0) return;
    reset(score(last_id));
    set(selectedScoreID, last_id - 1);
    set(scoreIDs, (v) => v.slice(0, -1));
  },
});
