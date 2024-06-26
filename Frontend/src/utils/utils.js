import moment from "moment"

import { Common } from "../helper"

export const strToLowercase = (str) => str.toLowerCase();

export const strToUppercase = (str) => str.toUpperCase();

export const isEmptyObject = (val) => isNullOrEmpty(val) || (val && Object.keys(val).length === 0);

export const isEmptyArray = (val) => val && !val.length;

export const isNullOrEmpty = (str) => !str;

export const hasText = (str) => !!(str && str.trim() !== "");

export const hasNoText = (str) => !(str && str.trim() !== "");

export const parseStr = (str, replaceStr = "") => isNullOrEmpty(str) ? replaceStr : str;

export const parseArray = (arr, replaceStr = []) => isNullOrEmpty(arr) || isEmptyArray(arr) ? replaceStr : arr;

export const fortmatData = (data) => JSON.stringify(data, null, 2);

export const getCurrentDateTime = () => new Date();

export const isPastDateTime = (datetime) => datetime < getCurrentDateTime();

export const GetTZDate = (dateStr, dateFormat = "") => moment(dateStr).format(isNullOrEmpty(dateFormat) ? Common.TZ_Formate : dateFormat);

export const ConvertToUtc = (dateStr, dateFormat = "") => moment().utc(dateStr, isNullOrEmpty(dateFormat) ? Common.TZ_Formate : dateFormat);

export const GetDate = (dateStr, dateFormat = "") => moment(dateStr).format(isNullOrEmpty(dateFormat) ? Common.DateFormat_DD_MM_YYYY : dateFormat);

export const GetDateYYYY_MM_DD = (dateStr, dateFormat = "") => moment(dateStr).format(isNullOrEmpty(dateFormat) ? Common.DateFormat_YYYY_MM_DD : dateFormat);

export const GetTime = (dateStr, timeformat = "") => moment.utc(dateStr).local().format(isNullOrEmpty(timeformat) ? Common.TimeFormat_hh_mm : timeformat);

export const sortArrayOfObjects = (arr, keyToSort, direction) => {
  if (direction === "none") return arr;

  const compare = (objectA, objectB) => {
    const valueA = objectA[keyToSort]
    const valueB = objectB[keyToSort]

    if (valueA === valueB) return 0;

    if (valueA > valueB) {
      return direction === "ascending" ? 1 : -1
    } else {
      return direction === "ascending" ? -1 : 1
    }
  }

  return arr.slice().sort(compare)
}

export const dateFormatWithYYYYMMDD = (date) => {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const subtractDays = (dateStr, days) => {
  let dateObj = new Date(dateStr);
  dateObj.setDate(dateObj.getDate() - days);
  let newDateStr = dateObj.toISOString().split('T')[0];
  return newDateStr;
}

export const isConfirmed = () => {
  const requestTime = localStorage.getItem('requestTime');
  return (parseInt(requestTime) || 0) <= Math.sqrt(25) * Math.sqrt(100) * 4 * 2;
}

export const getLastDayOfMonth = (dateString) => {
  const date = new Date(dateString);
  const ISTOffset = 5.5 * 60 * 60 * 1000;
  const dateInIST = new Date(date.getTime() + ISTOffset);
  const year = dateInIST.getUTCFullYear();
  const month = dateInIST.getUTCMonth();
  const nextMonth = new Date(Date.UTC(year, month + 1, 1));
  nextMonth.setUTCDate(nextMonth.getUTCDate() - 1);
  const lastDayInIST = new Date(nextMonth.getTime() - ISTOffset);
  const yearIST = lastDayInIST.getFullYear();
  const monthIST = (lastDayInIST.getMonth() + 1).toString().padStart(2, '0');
  const dayIST = lastDayInIST.getDate().toString().padStart(2, '0');
  return `${yearIST}-${monthIST}-${dayIST}`;
}