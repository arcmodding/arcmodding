// =============================================
//  VAULTDROP — Game Data
// =============================================

const RARITY = {
  legendary: { label: '⭐ Legendary', color: '#f0a500', class: 'legendary' },
  legendary: { label: '🎁 Developer', color: '#f40v7', class: 'Developer' },
  epic:      { label: '💜 Epic',      color: '#a855f7', class: 'epic'      },
  rare:      { label: '🔵 Rare',      color: '#3b82f6', class: 'rare'      },
  common:    { label: '🟢 Common',    color: '#22c55e', class: 'common'    },
};

const ALL_ITEMS = [
  // LEGENDARY
  { id: 'lux-watch',    emoji: '⌚', name: 'Rolex Submariner', value: 480,  rarity: 'legendary', odds: '0.4%'  },
  { id: 'gold-crown',   emoji: '👑', name: 'Gold Crown',       value: 390,  rarity: 'legendary', odds: '0.6%'  },
  { id: 'diamond',      emoji: '💎', name: 'Diamond Gem',      value: 650,  rarity: 'legendary', odds: '0.2%'  },
  { id: 'trophy',       emoji: '🏆', name: 'Grand Trophy',     value: 300,  rarity: 'legendary', odds: '0.8%'  },
  { id: 'gold-bar',     emoji: '🥇', name: 'Gold Bar',         value: 560,  rarity: 'legendary', odds: '0.3%'  },
  { id: 'gem-ring',     emoji: '💍', name: 'Diamond Ring',     value: 420,  rarity: 'legendary', odds: '0.5%'  },
  { id: 'jackpot',      emoji: '🎰', name: 'Jackpot Token',    value: 1000, rarity: 'legendary', odds: '0.1%'  },
  { id: 'dev shirt',    emoji: '👚', name: 'Developer Shirt', value: 99999999,  rarity: 'Developer', odds: '00.1%'  },
  // EPIC
  { id: 'crystal',      emoji: '🔮', name: 'Crystal Orb',      value: 95,   rarity: 'epic',      odds: '2.5%'  },
  { id: 'shadow-blade', emoji: '🗡️', name: 'Shadow Blade',    value: 80,   rarity: 'epic',      odds: '3.2%'  },
  { id: 'unicorn',      emoji: '🦄', name: 'Unicorn Token',    value: 110,  rarity: 'epic',      odds: '2.1%'  },
  { id: 'moon',         emoji: '🌙', name: 'Moon Shard',       value: 70,   rarity: 'epic',      odds: '3.8%'  },
  { id: 'lightning',    emoji: '⚡', name: 'Storm Core',       value: 85,   rarity: 'epic',      odds: '2.9%'  },
  { id: 'dragon',       emoji: '🐉', name: 'Dragon Scale',     value: 140,  rarity: 'epic',      odds: '1.5%'  },
  { id: 'galaxy',       emoji: '🌌', name: 'Galaxy Shard',     value: 120,  rarity: 'epic',      odds: '1.8%'  },
  // RARE
  { id: 'ocean',        emoji: '🌊', name: 'Ocean Pearl',      value: 34,   rarity: 'rare',      odds: '8%'    },
  { id: 'ice',          emoji: '❄️', name: 'Ice Crystal',      value: 28,   rarity: 'rare',      odds: '9%'    },
  { id: 'fire',         emoji: '🔥', name: 'Fire Ember',       value: 42,   rarity: 'rare',      odds: '7%'    },
  { id: 'butterfly',    emoji: '🦋', name: 'Blue Morpho',      value: 31,   rarity: 'rare',      odds: '8.5%'  },
  { id: 'comet',        emoji: '☄️', name: 'Comet Fragment',  value: 38,   rarity: 'rare',      odds: '7.5%'  },
  { id: 'gem-blue',     emoji: '🔷', name: 'Blue Sapphire',    value: 45,   rarity: 'rare',      odds: '6.5%'  },
  // COMMON
  { id: 'leaf',         emoji: '🌿', name: 'Forest Leaf',      value: 7,    rarity: 'common',    odds: '20%'   },
  { id: 'frog',         emoji: '🐸', name: 'Lucky Frog',       value: 5,    rarity: 'common',    odds: '22%'   },
  { id: 'clover',       emoji: '🍀', name: 'Four Leaf Clover', value: 12,   rarity: 'common',    odds: '18%'   },
  { id: 'sprout',       emoji: '🌱', name: 'Sprout',           value: 4,    rarity: 'common',    odds: '25%'   },
  { id: 'coin',         emoji: '🪙', name: 'Bronze Coin',      value: 3,    rarity: 'common',    odds: '28%'   },
  { id: 'pebble',       emoji: '🪨', name: 'Lucky Pebble',     value: 2,    rarity: 'common',    odds: '30%'   },
];

// Helper to get items by rarity
function itemsByRarity(r) { return ALL_ITEMS.filter(i => i.rarity === r); }

// Case definitions
const CASES = [
  {
    id: 1,
    emoji: '🟡',
    name: 'Gold Rush',
    price: 25.00,
    desc: 'High-roller gold case. Luxury items await.',
    tag: 'popular',
    glowColor: 'rgba(240,165,0,.15)',
    bgGradient: 'linear-gradient(135deg, #1a1208, #231a04)',
    items: [
      ...itemsByRarity('legendary').slice(0,4),
      ...itemsByRarity('epic').slice(0,3),
      ...itemsByRarity('rare').slice(0,3),
      ...itemsByRarity('common').slice(0,3),
    ],
    weights: [3,3,3,3, 8,8,8, 15,15,15, 22,22,22],
  },
  {
    id: 2,
    emoji: '🔵',
    name: 'Blue Wave',
    price: 10.00,
    desc: 'Ocean-themed drops. Balanced odds.',
    tag: 'new',
    glowColor: 'rgba(59,130,246,.14)',
    bgGradient: 'linear-gradient(135deg, #0d1a2a, #051122)',
    items: [
      ...itemsByRarity('legendary').slice(0,2),
      ...itemsByRarity('epic').slice(0,3),
      ...itemsByRarity('rare').slice(0,4),
      ...itemsByRarity('common').slice(0,4),
    ],
    weights: [1,1, 5,5,5, 18,18,18,18, 30,30,30,30],
  },
  {
    id: 3,
    emoji: '🟣',
    name: 'Mystic Vault',
    price: 50.00,
    desc: 'Rare mystical artifacts. Epic guaranteed.',
    tag: 'hot',
    glowColor: 'rgba(168,85,247,.14)',
    bgGradient: 'linear-gradient(135deg, #1a0a1a, #200d29)',
    items: [
      ...itemsByRarity('legendary').slice(0,3),
      ...itemsByRarity('epic').slice(0,5),
      ...itemsByRarity('rare').slice(0,3),
      ...itemsByRarity('common').slice(0,2),
    ],
    weights: [4,4,4, 10,10,10,10,10, 16,16,16, 25,25],
  },
  {
    id: 4,
    emoji: '🟢',
    name: 'Lucky Clover',
    price: 5.00,
    desc: 'Budget-friendly. Great for beginners.',
    tag: null,
    glowColor: 'rgba(34,197,94,.12)',
    bgGradient: 'linear-gradient(135deg, #0a1a12, #051209)',
    items: [
      ...itemsByRarity('legendary').slice(0,1),
      ...itemsByRarity('epic').slice(0,2),
      ...itemsByRarity('rare').slice(0,4),
      ...itemsByRarity('common').slice(0,6),
    ],
    weights: [0.5, 2,2, 10,10,10,10, 22,22,22,22,22,22],
  },
  {
    id: 5,
    emoji: '🔴',
    name: "Dragon's Hoard",
    price: 100.00,
    desc: 'Legendary dragon loot. Highest possible wins.',
    tag: 'rare',
    glowColor: 'rgba(239,68,68,.14)',
    bgGradient: 'linear-gradient(135deg, #1a0808, #200505)',
    items: [
      ...itemsByRarity('legendary'),
      ...itemsByRarity('Developer'),
      ...itemsByRarity('epic').slice(0,4),
      ...itemsByRarity('rare').slice(0,2),
      ...itemsByRarity('common').slice(0,1),
    ],
    weights: [5,5,5,5,5,5,5, 9,9,9,9, 12,12, 15],
  },
  {
    id: 6,
    emoji: '⚫',
    name: 'Shadow Case',
    price: 15.00,
    desc: 'Dark mystery drops. Anything is possible.',
    tag: null,
    glowColor: 'rgba(148,163,184,.08)',
    bgGradient: 'linear-gradient(135deg, #0e0e1a, #0a0a14)',
    items: [
      ...itemsByRarity('legendary').slice(0,2),
      ...itemsByRarity('epic').slice(0,4),
      ...itemsByRarity('rare').slice(0,4),
      ...itemsByRarity('common').slice(0,4),
    ],
    weights: [2,2, 7,7,7,7, 14,14,14,14, 22,22,22,22],
  },
];

// Fake player names for the live feed
const PLAYER_NAMES = [
  'xDragon', 'LuckyAce', 'CryptoKing', 'Viper99', 'StarGirl', 'HashKing',
  'NightWolf', 'EpicFox', 'RainbowBoy', 'GoldRush', 'Shadow_X', 'MoneyMike',
  'Titan99', 'LuckyLucy', 'SlotKing', 'DarkHorse', 'VaultBreaker', 'JetBlack',
  'IceQueen', 'FireStorm', 'CryptoApe', 'DiceRoller', 'BigWinner', 'NightShade',
  'DiamondHands', 'MoonShot', 'ZeroGrav', 'RedAlert', 'BlueChip', 'GoldDigger',
  'Kill Niggers', 'Jewish Nazi', 'Adolf Hitler', 'Arc (Lead Developer & Owner)',
];
