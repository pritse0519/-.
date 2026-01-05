export enum Rarity {
  BASIC = 'BASIC',
  RARE = 'RARE',
  COLLECTION = 'COLLECTION',
  HIDDEN = 'HIDDEN'
}

export interface GachaConfig {
  basic: number;
  rare: number;
  collection: number;
  hidden: number;
}

export interface DrawResult {
  id: string;
  name: string; // The name of the person or the draw index
  rarity: Rarity;
  timestamp: number;
}

export interface Stats {
  total: number;
  basic: number;
  rare: number;
  collection: number;
  hidden: number;
}

export const DEFAULT_CONFIG: GachaConfig = {
  basic: 50,
  rare: 35,
  collection: 25,
  hidden: 8
};

export const RARITY_LABELS: Record<Rarity, string> = {
  [Rarity.BASIC]: '基础款 (Basic)',
  [Rarity.RARE]: '稀有款 (Rare)',
  [Rarity.COLLECTION]: '典藏款 (Epic)',
  [Rarity.HIDDEN]: '隐藏款 (Legendary)'
};

export const RARITY_COLORS: Record<Rarity, string> = {
  [Rarity.BASIC]: 'bg-slate-200 text-slate-800 border-slate-300',
  [Rarity.RARE]: 'bg-blue-100 text-blue-800 border-blue-300',
  [Rarity.COLLECTION]: 'bg-purple-100 text-purple-800 border-purple-300',
  [Rarity.HIDDEN]: 'bg-yellow-100 text-yellow-800 border-yellow-300'
};

export const RARITY_BG_GRADIENTS: Record<Rarity, string> = {
  [Rarity.BASIC]: 'from-slate-500 to-slate-700',
  [Rarity.RARE]: 'from-blue-500 to-indigo-600',
  [Rarity.COLLECTION]: 'from-purple-500 to-fuchsia-600',
  [Rarity.HIDDEN]: 'from-yellow-400 via-orange-500 to-red-500'
};