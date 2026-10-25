import type { DdayResponse } from "@hyoit/types";

export interface DdayViewItem {
  id: string;
  title: string;
  date: string;
  memo?: string;
}

export function toDdayItem(dday: DdayResponse): DdayViewItem {
  return {
    id: String(dday.id),
    title: dday.title,
    date: dday.targetDate,
    ...(dday.memo ? { memo: dday.memo } : {}),
  };
}

export function toDdayItems(ddays: DdayResponse[]): DdayViewItem[] {
  return ddays.map(toDdayItem);
}
