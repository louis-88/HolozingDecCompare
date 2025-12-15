import { API_BASE_URL } from '../constants';
import { DailyAmount, HoloZingResponse, ComparisonData, MergedDailyData, PlayerStats } from '../types';

/**
 * Fetches data for a single user with CORS proxy handling.
 */
async function fetchUserHistory(username: string): Promise<DailyAmount[]> {
  if (!username.trim()) return [];
  
  // Use a CORS proxy to avoid CORS issues in browser environments
  const targetUrl = `${API_BASE_URL}?user=${username}`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
  
  try {
    const response = await fetch(proxyUrl);
    
    // Handle 404 specifically
    if (response.status === 404) {
      console.warn(`User ${username} not found, returning empty data.`);
      return [];
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const json: HoloZingResponse = await response.json();
    return json.december2025 || [];
  } catch (error) {
    console.error(`Failed to fetch data for ${username}:`, error);
    throw error;
  }
}

/**
 * Calculates aggregate stats for a player.
 */
function calculateStats(username: string, data: DailyAmount[]): Omit<PlayerStats, 'index'> {
  if (data.length === 0) {
    return { username, total: 0, average: 0, highestDay: 0, highestAmount: 0 };
  }

  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const average = total / data.length;
  
  // Find highest day
  const highest = data.reduce((prev, current) => (prev.amount > current.amount) ? prev : current, data[0]);

  return {
    username,
    total,
    average,
    highestDay: highest.date,
    highestAmount: highest.amount
  };
}

/**
 * Merges datasets for multiple users.
 */
export async function getComparisonData(usernames: string[]): Promise<ComparisonData> {
  // Fetch all in parallel
  const results = await Promise.all(usernames.map(u => fetchUserHistory(u)));

  const merged: MergedDailyData[] = [];
  
  // December has 31 days
  for (let i = 1; i <= 31; i++) {
    const dayData: MergedDailyData = { day: i };
    
    results.forEach((userDailyData, index) => {
      const entry = userDailyData.find(d => d.date === i);
      dayData[`player${index}`] = entry ? entry.amount : 0;
    });

    merged.push(dayData);
  }

  const playersStats = results.map((data, index) => ({
    ...calculateStats(usernames[index], data),
    index
  }));

  return {
    merged,
    playersStats
  };
}