import React from 'react';
import { GachaConfig, DEFAULT_CONFIG } from '../types';
import { Settings2, RefreshCw } from 'lucide-react';

interface SettingsProps {
  config: GachaConfig;
  onConfigChange: (config: GachaConfig) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ config, onConfigChange, isOpen, setIsOpen }) => {
  const handleChange = (key: keyof GachaConfig, value: string) => {
    const numValue = Math.max(0, parseFloat(value) || 0);
    onConfigChange({ ...config, [key]: numValue });
  };

  const handleReset = () => {
    onConfigChange(DEFAULT_CONFIG);
  };

  const totalWeight = config.basic + config.rare + config.collection + config.hidden;

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 text-sm font-medium"
      >
        <Settings2 size={16} />
        {isOpen ? '收起设置 (Hide Settings)' : '概率设置 (Probability Settings)'}
      </button>

      {isOpen && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">概率权重配置 (Probability Weights)</h3>
            <button 
              onClick={handleReset}
              className="text-xs flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
            >
              <RefreshCw size={12} /> 重置 (Reset)
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">基础款 (Basic)</label>
              <div className="relative">
                <input
                  type="number"
                  value={config.basic}
                  onChange={(e) => handleChange('basic', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="absolute right-3 top-2 text-slate-500 text-sm">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-blue-400 mb-1">稀有款 (Rare)</label>
              <div className="relative">
                <input
                  type="number"
                  value={config.rare}
                  onChange={(e) => handleChange('rare', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="absolute right-3 top-2 text-slate-500 text-sm">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-purple-400 mb-1">典藏款 (Epic)</label>
              <div className="relative">
                <input
                  type="number"
                  value={config.collection}
                  onChange={(e) => handleChange('collection', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <span className="absolute right-3 top-2 text-slate-500 text-sm">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-yellow-400 mb-1">隐藏款 (Hidden)</label>
              <div className="relative">
                <input
                  type="number"
                  value={config.hidden}
                  onChange={(e) => handleChange('hidden', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-yellow-500 outline-none"
                />
                <span className="absolute right-3 top-2 text-slate-500 text-sm">%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center text-xs">
             <span className="text-slate-400">
               总权重 (Total Weight): <span className={totalWeight === 100 ? "text-green-400" : "text-yellow-400"}>{totalWeight}</span>
             </span>
             <span className="text-slate-500">
               *如果总和不为100，系统将自动按比例归一化计算
               (Auto-normalized if sum ≠ 100)
             </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;