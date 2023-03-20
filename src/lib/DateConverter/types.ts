export interface DateObject {
  year: number;
  month: number;
  date: number;
  day?: number;
}

export type FullDateObject = DateObject & Partial<{
  hour: number,
  minute: number,
  second: number,
  timezone: string,
}>

export type DateValueArg = Date | number | string | FullDateObject
export type DateSetterKey = keyof Omit<FullDateObject, "day" | "timezone">
