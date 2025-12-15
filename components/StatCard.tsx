import React from 'react';
import { PlayerStats } from '../types';
import { Trophy, TrendingUp, Calendar, User } from 'lucide-react';

interface StatCardProps {
  stats: PlayerStats;
  color: string;
  isWinner?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ stats, color, isWinner }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className={`relative p-6 rounded-2xl bg-[#151725] border border-opacity-20 transition-all duration-300 ${isWinner ? 'border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'border-slate-700'}`}>
      {isWinner && (
        <div className="absolute -top-3 -right-3 bg-yellow-500 text-black p-2 rounded-full shadow-lg z-10">
          <Trophy size={20} />
        </div>
      )}
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative shrink-0">
          <div 
            className="w-16 h-16 rounded-full p-1 border-2" 
            style={{ borderColor: color, boxShadow: `0 0 10px ${color}40` }}
          >
            {!imgError ? (
              <img 
                src={`https://images.hive.blog/u/${stats.username}/avatar`}
                alt={stats.username}
                className="w-full h-full rounded-full object-cover bg-[#0b0c15]"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                <User size={24} style={{ color: color }} />
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Player</h3>
          <p className="text-2xl font-bold brand-font tracking-wide text-white">{stats.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl bg-[#0b0c15]">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-slate-500" />
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">Total Earned</span>
          </div>
          <p className="text-lg font-mono font-bold" style={{ color: color }}>
            {stats.total.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
          </p>
          <span className="text-[10px] text-slate-500">ZING DUST</span>
        </div>

        <div className="p-3 rounded-xl bg-[#0b0c15]">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-slate-500" />
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">Daily Avg</span>
          </div>
          <p className="text-lg font-mono font-bold text-white">
            {stats.average.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="col-span-2 p-3 rounded-xl bg-[#0b0c15] flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={14} className="text-slate-500" />
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">Best Day</span>
            </div>
            <p className="text-sm text-white">
              Dec {stats.highestDay}
            </p>
          </div>
           <p className="text-lg font-mono font-bold" style={{ color: color }}>
            {stats.highestAmount.toFixed(3)}
          </p>
        </div>
      </div>
    </div>
  );
};