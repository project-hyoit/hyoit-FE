export interface CalendarDay {
  date: Date;
  key: string;
  isCurrentMonth: boolean;
}

export const toDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const getDateKey = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

export const getDday = (date: string, today = new Date()) => {
  const target = toDate(date);
  const startOfTarget = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
  );
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const diff = Math.ceil(
    (startOfTarget.getTime() - startOfToday.getTime()) / 86400000,
  );

  if (diff === 0) return "D-Day";
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
};

export const createCalendarDays = (monthDate: Date): CalendarDay[] => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDate = new Date(year, month, 1);
  const start = new Date(year, month, 1 - firstDate.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      date,
      key: getDateKey(date),
      isCurrentMonth: date.getMonth() === month,
    };
  });
};

export const toCalendarRows = <T,>(days: T[]) =>
  Array.from({ length: Math.ceil(days.length / 7) }, (_, index) =>
    days.slice(index * 7, index * 7 + 7),
  );
