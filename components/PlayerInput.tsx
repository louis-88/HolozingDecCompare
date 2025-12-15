import React, { useState } from 'react';
import { Search, Plus, X, Users } from 'lucide-react';

interface PlayerInputProps {
  onCompare: (players: string[]) => void;
  isLoading: boolean;
}

export const PlayerInput: React.FC<PlayerInputProps> = ({ onCompare, isLoading }) => {
  const [players, setPlayers] = useState<string[]>(['louis88', 'acidyo']);

  const handleInputChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    if (players.length < 4) {
      setPlayers([...players, '']);
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      const newPlayers = players.filter((_, i) => i !== index);
      setPlayers(newPlayers);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty strings if needed, or validate
    if (players.every(p => p.trim() !== '')) {
      onCompare(players);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#151725] p-6 rounded-2xl border border-slate-800 shadow-xl">
      <div className="flex items-center gap-2 mb-4 text-slate-400">
        <Users size={18} />
        <span className="text-xs font-semibold uppercase tracking-wider">Compare up to 4 players</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {players.map((player, index) => (
          <div key={index} className="flex-1 w-full">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Player {index + 1}
              </label>
              {players.length > 2 && (
                <button
                  type="button"
                  onClick={() => removePlayer(index)}
                  className="text-slate-600 hover:text-red-400 transition-colors"
                  title="Remove player"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="relative group">
              <input
                type="text"
                value={player}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-full bg-[#0b0c15] border border-slate-700 text-white px-4 py-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all group-hover:border-slate-600"
                placeholder="Username..."
              />
              <Search className="absolute left-3 top-3.5 text-slate-500" size={18} />
            </div>
          </div>
        ))}
        
        {players.length < 4 && (
          <div className="flex items-end">
            <button
              type="button"
              onClick={addPlayer}
              className="w-full h-[50px] border border-dashed border-slate-700 rounded-xl flex items-center justify-center gap-2 text-slate-500 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
            >
              <Plus size={20} />
              <span className="font-medium text-sm">Add Player</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Loading...
            </>
          ) : (
            'Compare Players'
          )}
        </button>
      </div>
    </form>
  );
};