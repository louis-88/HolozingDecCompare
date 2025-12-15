import React from 'react';
import { MergedDailyData, PlayerStats } from '../types';
import { PLAYER_COLORS } from '../constants';

interface CalendarViewProps {
  data: MergedDailyData[];
  playersStats: PlayerStats[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ data, playersStats }) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Identify the daily winner for highlighting? Or just show list.
  // With 4 players, showing dots/values is better than winner highlight.

  return (
    <div className="bg-[#151725] rounded-2xl border border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold brand-font text-white">December 2025 History</h3>
        
        <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider">
           {playersStats.map((player) => (
             <div key={player.username} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-600">
                  <img src={`https://images.hive.blog/u/${player.username}/avatar`} alt={player.username} className="w-full h-full object-cover" />
                </div>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PLAYER_COLORS[player.index] }}></div>
                <span className="text-slate-300">{player.username}</span>
             </div>
           ))}
        </div>
      </div>
      
      {/* Header Row */}
      <div className="grid grid-cols-7 border-b border-slate-800 bg-[#0f111a]">
        {daysOfWeek.map(day => (
          <div key={day} className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 auto-rows-[minmax(120px,_1fr)]">
        {data.map((dayData) => {
          // Check if any data exists for this day
          const hasData = playersStats.some(p => (dayData[`player${p.index}`] as number) > 0);
          
          return (
            <div 
              key={dayData.day} 
              className="relative border-r border-b border-slate-800/50 p-2 hover:bg-slate-800/30 transition-colors flex flex-col justify-start group"
            >
              <span className="text-slate-500 text-sm font-mono mb-2 block sticky top-0">{dayData.day}</span>
              
              {hasData ? (
                <div className="space-y-1 overflow-y-auto custom-scrollbar">
                  {playersStats.map((player) => {
                    const val = dayData[`player${player.index}`] as number;
                    // Find max for this day to highlight?
                    // Let's just show values.
                    
                    if (val === 0) return null;

                    return (
                       <div key={player.username} className="flex justify-between items-center text-xs font-bold gap-1" style={{ color: PLAYER_COLORS[player.index] }}>
                          <span className="truncate max-w-[50px] opacity-60 text-[10px] hidden lg:inline">{player.username}</span>
                          <span>{val.toFixed(2)}</span>
                       </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center opacity-10">
                   <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
        {/* Fill remaining empty cells for December 2025 (Ends on Wed, so 4 empty slots) */}
        {[...Array(4)].map((_, i) => (
           <div key={`empty-${i}`} className="bg-[#0b0c15] border-r border-b border-slate-800/50 opacity-50"></div>
        ))}
      </div>
    </div>
  );
};