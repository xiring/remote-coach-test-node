import { add, differenceInCalendarDays, Duration, format, isBefore, isEqual } from "date-fns";

export const formatDate = (date: string | Date = new Date(), dateFormat = "yyyy-MM-dd") => {
  return format(typeof date === "string" ? new Date(date) : date, dateFormat);
};

export const dateDifferenceInDays = (dateA: Date | number, dateB: Date | number) => {
  return differenceInCalendarDays(dateA, dateB);
};

export const addDate = (date: Date, duration: Duration) => {
  return add(date, duration);
};

export const prepareDateFilter = (query: { dateFrom: string; dateTo?: string }) => {
  let dateTo = query.dateTo ? new Date(query.dateTo) : new Date();
  let dateFrom = query.dateFrom ? new Date(query.dateFrom) : addDate(new Date(), { days: -30 });

  const dateDifference = Math.abs(dateDifferenceInDays(dateFrom, dateTo));
  if (dateDifference > 28) dateFrom.setDate(dateTo.getDate() - 30);

  return { dateFrom, dateTo };
};

export const isDateBeforeOrEqual = (
  date: Date | string | number,
  dateToCompare: Date | string | number = new Date(),
) => {
  return (
    isBefore(new Date(date), new Date(dateToCompare)) ||
    isEqual(new Date(date), new Date(dateToCompare))
  );
};

export const addTimeStringToDate = (
  initialDate: Date | string | number,
  time: `${number}:${number}`,
) => {
  const date = new Date(initialDate);

  date.setHours(Number(time.split(":")[0]));
  date.setMinutes(Number(time.split(":")[1]));

  return date;
};
