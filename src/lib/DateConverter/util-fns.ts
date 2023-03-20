import * as process from "process";

export * from "./types";
export const __DEV__ = process.env.enviroment;

export const splitArrayIntoGroupOfArray = (array: Array<any>, size: number) => {
  const grouped = [];
  for (let i = 0; i < array.length; i += size) grouped.push(array.slice(i, i + size));

  return grouped;
};

export const addZero = (dirtyNum: string | number) =>
  Number(dirtyNum) < 10 && Number(dirtyNum) > 0 ? `0${dirtyNum}` : String(dirtyNum);
