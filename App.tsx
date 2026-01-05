import React, { useState, useCallback, useMemo } from 'react';
import { GachaConfig, DEFAULT_CONFIG, DrawResult, Stats, Rarity } from './types';
import { performDraw } from './services/gachaService';
import Settings from './components/Settings';
import InputPanel from './components/InputPanel';
import ResultCard from './components/ResultCard';
import StatsPanel from './components/StatsPanel';
import { Hexagon, Sparkles } from 'lucide-react';

function App() {
  const [config, setConfig] = useState<GachaConfig>(DEFAULT_CONFIG);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentResults, setCurrentResults] = useState<DrawResult[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // History stats
  const [allResults, setAllResults] = useState<DrawResult[]>([]);

  const stats: Stats = useMemo(() => {
    return {
      total: allResults.length,
      basic: allResults.filter(r => r.rarity === Rarity.BASIC).length,
      rare: allResults.filter(r => r.rarity === Rarity.RARE).length,
      collection: allResults.filter(r => r.rarity === Rarity.COLLECTION).length,
      hidden: allResults.filter(r => r.rarity === Rarity.HIDDEN).length,
    };
  }, [allResults]);

  const handleDraw = useCallback((names: string[]) => {
    setIsDrawing(true);
    setCurrentResults([]); // Clear current view
    
    // Simulate API delay / Animation prep
    setTimeout(() => {
      const results = performDraw(names, config);
      setCurrentResults(results);
      setAllResults(prev => [...prev, ...results]);
      setIsDrawing(false);
      
      // Scroll to results if needed
      const resultsElement = document.getElementById('results-area');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 800);
  }, [config]);

  const resetStats = () => {
    setAllResults([]);
    setCurrentResults([]);
  };

  return (
    <div className="min-h-screen pb-20 bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black">
      
      {/* Header */}
      <header className="pt-10 pb-6 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="mb-4 p-3 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md">
             <Hexagon className="text-blue-400 animate-[spin_10s_linear_infinite]" size={48} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-white drop-shadow-sm mb-2">
            Lucky Gacha
          </h1>
          <p className="text-slate-400 font-medium tracking-wide">
            自定义概率抽奖系统 • Customizable Draw System
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 relative z-10">
        
        {/* Settings */}
        <Settings 
          config={config} 
          onConfigChange={setConfig} 
          isOpen={isSettingsOpen}
          setIsOpen={setIsSettingsOpen}
        />

        {/* Input */}
        <InputPanel onDraw={handleDraw} isDrawing={isDrawing} />

        {/* Results Area */}
        <div id="results-area" className="mt-12 w-full max-w-6xl mx-auto">
          {currentResults.length > 0 && (
            <div className="animate-in fade-in duration-700">
               <div className="flex items-center gap-2 mb-6 justify-center">
                 <Sparkles className="text-yellow-400" />
                 <h2 className="text-2xl font-bold text-white">本次结果 (Current Results)</h2>
                 <Sparkles className="text-yellow-400" />
               </div>
               
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                 {currentResults.map((result, index) => (
                   <ResultCard key={result.id} result={result} index={index} />
                 ))}
               </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <StatsPanel stats={stats} resetStats={resetStats} />

      </main>

      <footer className="mt-20 text-center text-slate-600 text-sm py-6">
        <p>© 2024 Lucky Gacha System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;