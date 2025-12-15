import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { MergedDailyData, PlayerStats } from '../types';
import { PLAYER_COLORS } from '../constants';

interface EarningsChartProps {
  data: MergedDailyData[];
  playersStats: PlayerStats[];
}

export const EarningsChart: React.FC<EarningsChartProps> = ({ data, playersStats }) => {
  // Filter out days where all are 0
  const activeData = data.filter(d => {
    return playersStats.some(p => (d[`player${p.index}`] as number) > 0);
  });

  return (
    <div className="w-full h-[450px] bg-[#151725] p-6 rounded-2xl border border-slate-800">
      <h3 className="text-lg font-bold brand-font text-white mb-6">Earnings Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={activeData.length > 0 ? activeData : data.slice(0, 15)}
          margin={{
            top: 10,
            right: 10,
            left: -10,
            bottom: 10,
          }}
        >
          <defs>
            {playersStats.map((player) => (
              <linearGradient key={player.index} id={`colorP${player.index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PLAYER_COLORS[player.index]} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={PLAYER_COLORS[player.index]} stopOpacity={0}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
          <XAxis 
            dataKey="day" 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value.toFixed(0)}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f111a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ fontSize: '14px', fontWeight: 600 }}
            formatter={(value: number) => [value.toFixed(3), 'Dust']}
            labelFormatter={(label) => `December ${label}`}
          />
          <Legend wrapperStyle={{ paddingTop: '30px' }} iconType="circle" />
          
          {playersStats.map((player) => (
            <Area 
              key={player.username}
              type="monotone" 
              dataKey={`player${player.index}`} 
              name={player.username} 
              stroke={PLAYER_COLORS[player.index]} 
              fillOpacity={1} 
              fill={`url(#colorP${player.index})`} 
              strokeWidth={3}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};