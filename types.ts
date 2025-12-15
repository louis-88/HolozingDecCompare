export interface DailyAmount {
  date: number;
  amount: number;
}

export interface HoloZingResponse {
  december2025: DailyAmount[];
}

export interface MergedDailyData {
  day: number;
  [key: string]: number; // Dynamic keys: player0, player1, etc.
}

export interface PlayerStats {
  username: string;
  total: number;
  average: number;
  highestDay: number;
  highestAmount: number;
  index: number;
}

export interface ComparisonData {
  merged: MergedDailyData[];
  playersStats: PlayerStats[];
}