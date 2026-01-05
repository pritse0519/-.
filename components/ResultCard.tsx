import React, { useEffect, useState } from 'react';
import { DrawResult, Rarity, RARITY_BG_GRADIENTS, RARITY_LABELS } from '../types';
import { Sparkles, Star, Crown, Gem } from 'lucide-react';

interface ResultCardProps {
  result: DrawResult;
  index: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Stagger the flip animation based on index
    const flipTimer = setTimeout(() => {
      setIsFlipped(true);
    }, index * 200 + 100);

    const contentTimer = setTimeout(() => {
        setShowContent(true);
    }, index * 200 + 400); // Slightly after flip starts

    return () => {
        clearTimeout(flipTimer);
        clearTimeout(contentTimer);
    };
  }, [index]);

  const getIcon = () => {
    switch (result.rarity) {
      case Rarity.HIDDEN: return <Crown size={32} className="text-yellow-100 animate-pulse" />;
      case Rarity.COLLECTION: return <Gem size={32} className="text-purple-100" />;
      case Rarity.RARE: return <Star size={32} className="text-blue-100" />;
      default: return <Sparkles size={32} className="text-slate-300" />;
    }
  };

  const getGlowClass = () => {
     switch (result.rarity) {
        case Rarity.HIDDEN: return 'glow-hidden border-yellow-400';
        case Rarity.COLLECTION: return 'glow-collection border-purple-400';
        case Rarity.RARE: return 'glow-rare border-blue-400';
        default: return 'glow-basic border-slate-400';
     }
  };

  return (
    <div className="relative w-full h-48 perspective-1000 group">
      <div 
        className={`w-full h-full relative transform-style-3d transition-all duration-700 ease-out ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front of card (Card Back design) */}
        <div className="absolute w-full h-full backface-hidden rounded-xl bg-slate-800 border-2 border-slate-600 flex flex-col items-center justify-center overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600 mb-2">
                <span className="text-2xl font-bold text-slate-500">?</span>
            </div>
            <span className="text-sm font-bold text-slate-500 tracking-widest uppercase">Lucky Draw</span>
        </div>

        {/* Back of card (The Result) */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden shadow-xl border-2 ${showContent ? getGlowClass() : 'border-slate-700'}`}>
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_BG_GRADIENTS[result.rarity]} opacity-90`}></div>
            
            {/* Texture overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-4 text-center z-10">
                <div className="mb-3 transform transition-transform duration-500 hover:scale-110">
                   {getIcon()}
                </div>
                
                <h3 className="text-lg font-black text-white drop-shadow-md mb-1 leading-tight line-clamp-2">
                  {result.name}
                </h3>
                
                <div className="mt-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
                  <span className="text-xs font-bold text-white tracking-wider">
                    {RARITY_LABELS[result.rarity].split('(')[0]}
                  </span>
                </div>
            </div>
            
            {/* Shine effect for high rarity */}
            {(result.rarity === Rarity.HIDDEN || result.rarity === Rarity.COLLECTION) && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;