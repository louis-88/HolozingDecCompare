import React, { useState, useEffect } from 'react';
import { PlayerInput } from './components/PlayerInput';
import { StatCard } from './components/StatCard';
import { EarningsChart } from './components/EarningsChart';
import { CalendarView } from './components/CalendarView';
import { getComparisonData } from './services/holoService';
import { ComparisonData } from './types';
import { PLAYER_COLORS } from './constants';
import { Zap, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPlayers, setCurrentPlayers] = useState<string[]>(['louis88', 'acidyo']);

  const handleCompare = async (players: string[]) => {
    setLoading(true);
    setError(null);
    setCurrentPlayers(players);

    try {
      const result = await getComparisonData(players);
      setData(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch player data. Please check usernames and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    handleCompare(currentPlayers);
  }, []);

  // Determine grid columns based on player count
  const getGridCols = () => {
    const count = data?.playersStats.length || 0;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2';
    if (count === 3) return 'grid-cols-1 md:grid-cols-3';
    return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4';
  };

  // Find winner (highest total)
  const winnerIndex = data?.playersStats.reduce((maxIdx, stat, idx, arr) => 
    stat.total > arr[maxIdx].total ? idx : maxIdx
  , 0);

  return (
    <div className="min-h-screen bg-[#0b0c15] text-slate-200 pb-20 relative isolate overflow-hidden">
      {/* Background SVG Pattern */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none"></path>
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          ></path>
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        ></rect>
      </svg>

      {/* Navbar / Header */}
      <div className="border-b border-slate-800/50 bg-[#0f111a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://holozing.com/assets/logo_text-e5fea726.png" 
              alt="HoloZing" 
              className="h-8 md:h-10 object-contain"
            />
            <span className="mx-3 text-slate-600 text-2xl font-thin hidden sm:inline">/</span>
            <span className="text-lg font-bold text-slate-200 brand-font tracking-tight mt-1 hidden sm:inline">
              Compare
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-xs font-medium">
            <Zap size={14} />
            <span>Dec 2025 Bonus</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Input Section */}
        <section className="relative z-10">
          <PlayerInput onCompare={handleCompare} isLoading={loading} />
        </section>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-6 rounded-xl flex flex-col items-center justify-center text-center gap-2">
            <AlertCircle size={32} className="mb-2" />
            <h3 className="font-bold text-lg">Unable to load data</h3>
            <p>{error}</p>
            <p className="text-xs text-red-300/60 mt-2">Note: This might be due to API CORS restrictions. A proxy is being used to attempt to bypass this.</p>
          </div>
        )}

        {data && !loading && (
          <>
            {/* Stats Cards */}
            <section className={`grid gap-6 ${getGridCols()}`}>
              {data.playersStats.map((stat, idx) => (
                <StatCard 
                  key={stat.username}
                  stats={stat} 
                  color={PLAYER_COLORS[stat.index]} 
                  isWinner={idx === winnerIndex && data.playersStats.length > 1}
                />
              ))}
            </section>

            {/* Chart Section */}
            <section>
               <EarningsChart 
                data={data.merged} 
                playersStats={data.playersStats}
              />
            </section>

            {/* Calendar Grid */}
            <section>
              <CalendarView 
                data={data.merged} 
                playersStats={data.playersStats}
              />
            </section>
          </>
        )}
      </main>
      
      <footer className="border-t border-slate-800/50 mt-12 py-8 text-center text-slate-500 text-sm">
        <p className="mb-2">© 2025 HoloZing Fan Tool. Data provided by HoloZing API.</p>
        <p className="text-slate-400">
          Proudly presented by <span className="text-white font-medium">louis88</span> — Vote <span className="text-blue-400 font-medium">louis.witness</span> as Witness for the Hive Blockchain.
        </p>
      </footer>
    </div>
  );
};

export default App;