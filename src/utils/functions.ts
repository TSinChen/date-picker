export const dateFormatter = (date: Date) =>
  `${date.getFullYear()} / ${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )} / ${String(date.getDate()).padStart(2, "0")}`;

export const getStartTime = (date: Date) =>
  new Date(new Date(date).setHours(0, 0, 0, 0));

export const getEndTime = (date: Date) =>
  new Date(new Date(date).setHours(23, 59, 59, 999));

export const getStartDayOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1).getDay();

export const getDaysInMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const getDateOfPrevMonth = (date: Date) =>
  new Date(
    date.getMonth() === 0
      ? new Date().setFullYear(date.getFullYear() - 1, 11)
      : new Date().setMonth(date.getMonth() - 1)
  );
