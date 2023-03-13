import { addMinutes } from "date-fns";

export const hour = (date: Date, minutes: number) => {
  const hour = addMinutes(date, minutes);
  return hour;
};
