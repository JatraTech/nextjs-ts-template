import {
  DATE_TIME_API_FORMAT,
  DATE_TIME_PICKER_FORMAT,
} from "@/constants/dateTime";
import dayjs, { type ConfigType } from "dayjs";

export const convertDate = (date: ConfigType): string => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const convertDateWithTime = (date: ConfigType): string => {
  return dayjs(date).format(DATE_TIME_PICKER_FORMAT);
};

export const convertDateForApi = (date: ConfigType): string => {
  return dayjs(date).format(DATE_TIME_API_FORMAT);
};

export const convertDateToISO = (date: ConfigType): string => {
  return dayjs(date).toISOString();
};
