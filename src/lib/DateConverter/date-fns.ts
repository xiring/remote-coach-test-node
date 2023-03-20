import { BEGINNING_DATES, BS_DAY_DATA, DAYS_NUMBER, YEAR_MONTH_MAX_DATE } from "./date-constants";
import memoize from "./memoize";
import { REGEX } from "./regex";
import { error } from "./exceptions";
import { addZero } from "./util-fns";
import { DateObject, DateValueArg, FullDateObject } from "./types";

const daysMappings = Object.values(YEAR_MONTH_MAX_DATE);
const availableYears = Object.keys(YEAR_MONTH_MAX_DATE);

export const getDateObject = (date: string | Date) => {
  const dateInstance = new Date(date);

  return {
    year: dateInstance.getFullYear(),
    month: dateInstance.getMonth(),
    date: dateInstance.getDate(),
    day: dateInstance.getDay(),
    hour: dateInstance.getHours(),
    minute: dateInstance.getMinutes(),
    second: dateInstance.getSeconds(),
  };
};

function getAMPM(hour: number) {
  return hour >= 12 ? "pm" : "am";
}

function getIn12Hour(hour: number) {
  return hour % 12 || 12;
}

export const passedDaysAD = (start: Date | string, end: Date | string) => {
  const startDate =
    typeof start === "string" ? new Date(start) : new Date(start.toLocaleDateString());
  const endDate = typeof end === "string" ? new Date(end) : new Date(end.toLocaleDateString());
  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  // Calculating the time difference between two dates
  const diffInTime = endDate.getTime() - startDate.getTime();
  // Calculating the no. of days between two dates
  return Math.round(diffInTime / oneDay);
};

export const passedDaysBS = (date: Omit<DateObject, "day">) => {
  const yearIndex = date.year - BEGINNING_DATES.BS.year;
  const yearData = yearDaysMapping()[yearIndex];
  const monthData = monthDaysMapping()[yearIndex][date.month - 1];

  return yearData[1] + monthData[1] + date.date;
};

export const parseStringBSDate = (date: string) => {
  let dateObj: string[] = [];
  if (REGEX.DD_MM_YYYY.test(date)) dateObj = date.split(REGEX.DATE_SEPARATOR);
  else if (REGEX.YYYY_MM_DD.test(date)) dateObj = date.split(REGEX.DATE_SEPARATOR).reverse();
  else
    error(
      `Invalid Date Format: Provide date in format of "DDMMYYYY" OR "YYYYMMDD", seprator: {".","-","/"}`,
    );

  if (Number(dateObj[1]) > 12) error("Invalid Date: Month Must be smaller than 12");

  return { date: Number(dateObj[0]), month: Number(dateObj[1]), year: Number(dateObj[2]) };
};

const monthDaysMapping = memoize(() => {
  return daysMappings.map((yearDays) => {
    let daySum = 0;
    return yearDays.map((days) => {
      // here first index is sum of month days and second is actual passed days since start of the year
      const passedDays = [days, daySum];
      daySum += days;
      return passedDays;
    });
  });
});

const yearDaysMapping = memoize(() => {
  let passedDays = 0;
  return daysMappings.map((dayMapping) => {
    const yearDays = dayMapping.reduce((acc, x) => acc + x, 0);
    // here first index is sum of year days and second is actual passed days since epoch
    const passed = [yearDays, passedDays];
    passedDays += yearDays;
    return passed;
  });
});

const daysToBSDate = (days: number) => {
  if (days < DAYS_NUMBER.MIN || days > DAYS_NUMBER.MAX)
    error(`The date must be between "1913/02/13" - "2043/03/14"`);

  const yearIndex = yearDaysMapping().findIndex(
    (year) => year[1] < days && year[1] + year[0] >= days,
  );

  const remainingDays = days - yearDaysMapping()[yearIndex][1];

  const monthIndex = monthDaysMapping()[yearIndex].findIndex(
    (month) => month[1] < remainingDays && month[0] + month[1] >= remainingDays,
  );

  const date = remainingDays - monthDaysMapping()[yearIndex][monthIndex][1];

  return {
    year: Number(availableYears[yearIndex]),
    month: monthIndex - 1,
    date,
  };
};

const daysToADDate = (days: number) => {
  return getDateObject(
    new Date(BEGINNING_DATES.AD.year, BEGINNING_DATES.AD.month, BEGINNING_DATES.AD.date + days),
  );
};

export const parseADDate = (adDate: Date | string | DateObject | number) => {
  let date = new Date();

  if (adDate instanceof Date) date = adDate;
  else if (typeof adDate === "string" || typeof adDate === "number") date = new Date(adDate);
  else if (adDate.date && adDate.year && adDate.month)
    date = new Date(adDate.year, adDate.month, adDate.date);
  else error("Invalid Date provided");

  return date;
};

export const ADToBS = (adDate: DateValueArg): FullDateObject => {
  const parsedDate = parseADDate(adDate);
  const passedDays = passedDaysAD(
    new Date(BEGINNING_DATES.AD.year, BEGINNING_DATES.AD.month, BEGINNING_DATES.AD.date),
    parseADDate(adDate),
  );

  const dateObj = daysToBSDate(passedDays);
  return {
    ...dateObj,
    day: parsedDate.getDay(),
    hour: parsedDate.getHours(),
    minute: parsedDate.getMinutes(),
    second: parsedDate.getSeconds(),
  };
};

/**
 *
 * @param date provide date in format of "DDMMYYYY" OR "YYYYMMDD", seprator: { "." , "-" , "/" }
 * @example
 * Supported formats
 * -----------------
 * | DD-MM-YYYY    |
 * ----------------
 * | DD/MM/YYYY    |
 * ----------------
 * | DD.MM.YYYY    |
 * ----------------
 * | YYYY-MM-DD    |
 * ----------------
 * | YYYY/MM/DD    |
 * ----------------
 * | YYYY.MM.DD    |
 * ----------------
 */
export const BSToAD = (date: string | DateObject): DateObject => {
  const dateObj = typeof date === "string" ? parseStringBSDate(date) : date;
  if (!dateObj) error("Invalid Date provided");
  console.log(daysToADDate(passedDaysBS(dateObj)));
  return daysToADDate(passedDaysBS(dateObj));
};

const dateStringReplace = (dateObj: FullDateObject) => {
  return {
    YYYY: String(dateObj.year),
    M: String(dateObj.month + 1),
    MM: addZero(dateObj.month + 1),
    MMM: dateObj.month ? BS_DAY_DATA.en.month.short[dateObj.month] : "",
    MMMM: dateObj.month ? BS_DAY_DATA.en.month.long[dateObj.month] : "",
    DD: addZero(dateObj.date),
    D: String(dateObj.date),
    W: typeof dateObj.day === "number" ? String(dateObj.day + 1) : "",
    WW: typeof dateObj.day === "number" ? addZero(dateObj.day + 1) : "",
    WWW: typeof dateObj.day === "number" ? BS_DAY_DATA.en.weekday.short[dateObj.day] : "",
    WWWW: typeof dateObj.day === "number" ? BS_DAY_DATA.en.weekday.long[dateObj.day] : "",
    hh: dateObj.hour ? addZero(getIn12Hour(dateObj.hour)) : "",
    h: dateObj.hour ? String(getIn12Hour(dateObj.hour)) : "",
    HH: dateObj.hour ? addZero(dateObj.hour) : "",
    H: dateObj.hour ? String(dateObj.hour) : "",
    mm: dateObj.minute ? addZero(dateObj.minute) : "",
    m: dateObj.minute ? String(dateObj.minute) : "",
    ss: dateObj.second ? addZero(dateObj.second) : "",
    s: dateObj.minute ? String(dateObj.minute) : "",
    TZ: dateObj.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    AP: dateObj.hour ? getAMPM(dateObj.hour).toUpperCase() : "",
    ap: dateObj.hour ? getAMPM(dateObj.hour) : "",
  };
};

/**
 *
 * @param dirtyDate ( Date ) if dirtyDate is string or of type {{FullDateObject}}, it will be treated as BS Date.
 * @param formatStr the specified format of the date
 *
 * *** Replacer and Specifier Values ***
 * @example
 * *************** NOTE **********************
 * If same is repeated twice, 0 will be added,
 * Eg: for MM, if month is less than 10, 0 will be appended but not on case of M
 * Specifier case should be maintained to be formatted
 *
 * ------------------------------------------
 * | Specifier  | Replaced Value             |
 * ------------------------------------------
 * | YYYY       | Year
 * ------------------------------------------
 * | M          | month
 * ------------------------------------------
 * | MM         | month if(less than 10, 0 will be appended)
 * ------------------------------------------
 * | MMMM       | month long name - Eg: Baisakh
 * ------------------------------------------
 * | MMM        | month short name - Eg: Bai
 * ------------------------------------------
 * | DD         | Date
 * ------------------------------------------
 * | D          | Date
 * ------------------------------------------
 * | W          | Week day in number
 * ------------------------------------------
 * | WW         | Week day in number, 0 wil be appended if less than 10 (i.e. for all :))
 * ------------------------------------------
 * | WWW        | Week day Short name - Eg: Fri
 * ------------------------------------------
 * | WWWW       | Week day Long name - Eg: Friday
 * ------------------------------------------
 * | hh         | Hour (12 hour format)
 * ------------------------------------------
 * | h          | Hour (12 hour format)
 * ------------------------------------------
 * | HH         | Hour (24 hour format)
 * ------------------------------------------
 * | H          | Hour (24 hour format)
 * ------------------------------------------
 * | mm         | Minute
 * ------------------------------------------
 * | m          | Minute
 * ------------------------------------------
 * | ss         | Second
 * ------------------------------------------
 * | s          | Second
 * ------------------------------------------
 * | AP         | AM or PM (in upper case)
 * ------------------------------------------
 * | ap         | am or pm (in lower case)
 * ------------------------------------------
 * | TZ         | Timezone
 * ------------------------------------------
 **/
export const format = (dirtyDate: DateValueArg, formatStr: string) => {
  let date: FullDateObject;

  if (dirtyDate instanceof Date) {
    date = {
      ...ADToBS(dirtyDate),
      minute: dirtyDate.getMinutes(),
      hour: dirtyDate.getHours(),
      second: dirtyDate.getSeconds(),
    };
  } else if (typeof dirtyDate === "string") {
    date = ADToBS(parseADDate(BSToAD(dirtyDate)));
  } else if (typeof dirtyDate === "number") {
    date = getDateObject(new Date(dirtyDate));
  } else {
    date = dirtyDate;
  }

  const replacer = dateStringReplace(date);

  const formatted = formatStr.replace(REGEX.FORMAT_DATE, (substring) => {
    const key = substring.replace("[", "").replace("]", "") as keyof typeof replacer;
    const replaced = replacer[key] || substring;
    console.log(substring, replaced);
    return replaced;
  });

  console.log(formatted);

  return formatted;
};
