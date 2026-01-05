import React from 'react';
import { Stats, Rarity } from '../types';

interface StatsPanelProps {
  stats: Stats;
  resetStats: () => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, resetStats }) => {
  if (stats.total === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-slate-800/80 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">统计数据 (Statistics)</h3>
        <button 
          onClick={resetStats}
          className="px-3 py-1 rounded bg-slate-700 hover:bg-red-900/50 hover:text-red-200 text-slate-300 text-xs transition-colors"
        >
          清空记录 (Clear History)
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
          <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Draws</div>
          <div className="text-2xl font-black text-white">{stats.total}</div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-slate-400"></div>
          <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Basic</div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-black text-white">{stats.basic}</div>
            <div className="text-xs text-slate-500 mb-1">{stats.total > 0 ? ((stats.basic / stats.total) * 100).toFixed(1) : 0}%</div>
          </div>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-900/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-blue-500"></div>
          <div className="text-blue-300 text-xs uppercase tracking-wider mb-1">Rare</div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-black text-blue-100">{stats.rare}</div>
            <div className="text-xs text-blue-400 mb-1">{stats.total > 0 ? ((stats.rare / stats.total) * 100).toFixed(1) : 0}%</div>
          </div>
        </div>

        <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-900/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-purple-500"></div>
          <div className="text-purple-300 text-xs uppercase tracking-wider mb-1">Epic</div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-black text-purple-100">{stats.collection}</div>
            <div className="text-xs text-purple-400 mb-1">{stats.total > 0 ? ((stats.collection / stats.total) * 100).toFixed(1) : 0}%</div>
          </div>
        </div>

        <div className="bg-yellow-900/20 p-4 rounded-xl border border-yellow-900/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-yellow-500"></div>
          <div className="text-yellow-300 text-xs uppercase tracking-wider mb-1">Legendary</div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-black text-yellow-100">{stats.hidden}</div>
            <div className="text-xs text-yellow-400 mb-1">{stats.total > 0 ? ((stats.hidden / stats.total) * 100).toFixed(1) : 0}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;