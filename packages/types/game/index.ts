export interface GameRecordRequest {
  result: boolean;
  level: string;
  live: number;
}

export interface GameRecord {
  result: boolean;
  level: string;
  live: number;
  createdAt: string;
}
