import React, { useState } from 'react';
import { Users, Trash2, Wand2 } from 'lucide-react';

interface InputPanelProps {
  onDraw: (names: string[]) => void;
  isDrawing: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ onDraw, isDrawing }) => {
  const [inputText, setInputText] = useState<string>('');
  const [useCountMode, setUseCountMode] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);

  const handleDrawClick = () => {
    let names: string[] = [];
    
    if (useCountMode) {
      names = Array.from({ length: Math.max(1, count) }, (_, i) => `Draw #${i + 1}`);
    } else {
      names = inputText
        .split('\n')
        .map(n => n.trim())
        .filter(n => n.length > 0);
        
      if (names.length === 0) {
        // Fallback if empty
        names = ['Lucky Draw'];
      }
    }
    
    onDraw(names);
  };

  const clearInput = () => {
    setInputText('');
    setCount(1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Users className="text-blue-400" size={20} />
            <h2 className="text-xl font-bold text-white">抽奖名单 (Participants)</h2>
          </div>
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setUseCountMode(false)}
              className={`px-3 py-1 rounded-full transition-colors ${!useCountMode ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
            >
              按名字 (Names)
            </button>
            <button
              onClick={() => setUseCountMode(true)}
              className={`px-3 py-1 rounded-full transition-colors ${useCountMode ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
            >
              按次数 (Count)
            </button>
          </div>
        </div>

        {useCountMode ? (
           <div className="mb-6">
             <label className="block text-sm text-slate-400 mb-2">输入抽奖次数 (Number of draws)</label>
             <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg"
             />
           </div>
        ) : (
          <div className="mb-4 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="输入名字，每行一个... (Enter names, one per line)&#10;Alice&#10;Bob&#10;Charlie"
              className="w-full h-32 px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
            {inputText && (
              <button 
                onClick={clearInput}
                className="absolute right-3 top-3 text-slate-500 hover:text-red-400 transition-colors p-1"
                title="Clear"
              >
                <Trash2 size={16} />
              </button>
            )}
            <div className="text-right text-xs text-slate-500 mt-2">
              当前名单数: {inputText.split('\n').filter(n => n.trim()).length}
            </div>
          </div>
        )}

        <button
          onClick={handleDrawClick}
          disabled={isDrawing || (!useCountMode && !inputText.trim())}
          className={`
            w-full py-4 rounded-xl font-black text-lg tracking-wider uppercase flex items-center justify-center gap-3
            transition-all duration-300 transform active:scale-95
            ${isDrawing 
              ? 'bg-slate-600 cursor-not-allowed opacity-75' 
              : 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-900/50 hover:shadow-blue-900/80'}
          `}
        >
          {isDrawing ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Drawing...
            </>
          ) : (
            <>
              <Wand2 size={24} />
              开始抽奖 (Start Draw)
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputPanel;