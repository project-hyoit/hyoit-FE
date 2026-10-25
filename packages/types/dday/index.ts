export interface DdayRequest {
  title: string;
  targetDate: string;
  memo?: string;
}

export interface DdayResponse {
  id: number;
  title: string;
  targetDate: string;
  memo?: string | null;
  daysUntil: number;
  ddayText: string;
  past: boolean;
}
