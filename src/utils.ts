// SHARED HELPERS

export function toCorePos(UIPos: number) {
  return 10 * (1 + Math.floor(UIPos / 8)) + (UIPos % 8) + 1;
}

// NON SHARED BUT SEPERATE

export function boundNum(num: number, first: number, last: number) {
  /**
   *  first <= num <= last : if condition fails
   *  return the respective outlier
   */
  if (num < first) return first;
  if (num > last) return last;
  return num;
}
