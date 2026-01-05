import { GachaConfig, Rarity, DrawResult } from '../types';

/**
 * Calculates a single draw result based on weighted probabilities.
 * Normalizes the weights if they don't sum to 100.
 */
const getRarity = (config: GachaConfig): Rarity => {
  const totalWeight = config.basic + config.rare + config.collection + config.hidden;
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;

  // Check Basic
  cumulativeWeight += config.basic;
  if (random < cumulativeWeight) return Rarity.BASIC;

  // Check Rare
  cumulativeWeight += config.rare;
  if (random < cumulativeWeight) return Rarity.RARE;

  // Check Collection
  cumulativeWeight += config.collection;
  if (random < cumulativeWeight) return Rarity.COLLECTION;

  // Fallback to Hidden
  return Rarity.HIDDEN;
};

export const performDraw = (
  names: string[],
  config: GachaConfig
): DrawResult[] => {
  return names.map((name, index) => {
    const rarity = getRarity(config);
    return {
      id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim() || `Draw #${index + 1}`,
      rarity,
      timestamp: Date.now(),
    };
  });
};