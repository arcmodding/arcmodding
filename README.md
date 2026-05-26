# 🔐 VaultDrop.gg

A realistic, fully client-side case opening website inspired by Rainbet / PackDraw. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, just open `index.html`.

![VaultDrop Preview](https://img.shields.io/badge/status-live-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![Zero dependencies](https://img.shields.io/badge/dependencies-zero-orange)

---

## ✨ Features

- 🎁 **6 unique cases** with different price points ($5–$100) and item pools
- 🎰 **Animated spinning reel** with weighted probability and realistic settle animation
- 📊 **Dynamic hero stats** — Paid Out, Cases Opened, Uptime, and Online count randomize on every page load
- 🔴 **Live drops feed** — auto-updates every few seconds with simulated player wins
- 🎒 **Inventory system** — keep items, filter by rarity, sell individually or all at once
- 💰 **Balance system** with deposit button
- 🔁 **Open Again** — re-open the same case after a win
- 📱 Responsive layout

---

## 🚀 Getting Started

### Option 1 — Just open it

```bash
git clone https://github.com/YOUR_USERNAME/vaultdrop.git
cd vaultdrop
open index.html   # macOS
# or double-click index.html in your file explorer
```

No build step. No npm install. No server required.

### Option 2 — Serve locally (optional)

```bash
# Python
python3 -m http.server 3000

# Node (npx)
npx serve .
```

Then visit `http://localhost:3000`

---

## 📁 Project Structure

```
vaultdrop/
├── index.html          # Main HTML shell + modal markup
├── css/
│   └── style.css       # All styles (dark theme, animations, responsive)
├── js/
│   ├── data.js         # All items, cases, player names
│   └── app.js          # Game logic, UI, state management
└── README.md
```

---

## 🎲 How the Odds Work

Each case has a **weighted item pool**. Items are assigned a weight — higher weight = more likely to land. Legendary items have very low weights (0.5–5), while Common items have high weights (20–30).

The spin reel places the winning item at a random position near slot 48–51 (out of 60), then animates with a cubic-bezier easing curve for a realistic deceleration effect.

```js
// Example case weights (Gold Rush)
weights: [3,3,3,3,  8,8,8,  15,15,15,  22,22,22]
//        ^^^^^^^^  ^^^^^^^  ^^^^^^^^^  ^^^^^^^^^^^
//        legendary  epic      rare       common
```

---

## 🛠 Customization

### Add a new case

In `js/data.js`, add an entry to the `CASES` array:

```js
{
  id: 7,
  emoji: '🌈',
  name: 'Rainbow Case',
  price: 20.00,
  desc: 'Colorful surprise drops.',
  tag: 'new',                              // 'popular' | 'hot' | 'new' | 'rare' | null
  glowColor: 'rgba(168,85,247,.14)',
  bgGradient: 'linear-gradient(135deg, #1a0a1a, #200d29)',
  items: [...itemsByRarity('epic'), ...itemsByRarity('common')],
  weights: [10,10,10,10,10,10,10, 30,30,30,30,30,30],
}
```

### Add a new item

```js
{ id: 'my-item', emoji: '🦊', name: 'Fox Token', value: 55, rarity: 'epic', odds: '3%' }
```

### Change starting balance

In `js/app.js`, line 8:
```js
let balance = 250.00;  // change this
```

---

## 📜 License

MIT — free to use, fork, and modify.

---

## ⚠️ Disclaimer

This is a **demo/entertainment project only**. No real money is involved. All "currency" is fictional. Do not use this for real gambling of any kind.
