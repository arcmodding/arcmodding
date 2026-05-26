// =============================================
//  VAULTDROP — App Logic
// =============================================

// ---- STATE ----
let balance       = 250.00;

saveGame();
let inventory     = [];

// ===== 1 WEEK SAVE SYSTEM =====

const SAVE_KEY = "vaultdropSave";
const SAVE_CHOICE = "vaultdropChoice";

function sevenDaysFromNow() {
    return Date.now() + (7*24*60*60*1000);
}

// ask player only once
if(localStorage.getItem(SAVE_CHOICE) === null){

setTimeout(()=>{

const save = confirm(
"We will keep your inventory and money for 1 week.\n\nPress OK = Accept\nPress Cancel = Continue without saving"
);

if(save){
localStorage.setItem(SAVE_CHOICE,"accepted");
saveGame();
}
else{
localStorage.setItem(SAVE_CHOICE,"nosave");
}

},500);

let currentCase   = null;
let currentWin    = null;
let openQty       = 1;
let spinning      = false;
let feedCount     = 0;
let feedDrops     = 0;
let tickerTimeout = null;

}


// load save
function loadGame(){

if(localStorage.getItem(SAVE_CHOICE)!=="accepted") return;

const data=JSON.parse(
localStorage.getItem(SAVE_KEY)
);

if(!data) return;

if(Date.now()>data.expires){

localStorage.removeItem(SAVE_KEY);

return;
}

balance=data.balance || 250;
inventory=data.inventory || [];

}


// save game
function saveGame(){

if(localStorage.getItem(SAVE_CHOICE)!=="accepted") return;

const data={

balance:balance,
inventory:inventory,
expires:sevenDaysFromNow()

};

localStorage.setItem(
SAVE_KEY,
JSON.stringify(data)
);

}

loadGame();

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  generateHeroStats();
  renderCases();
  seedLiveFeed();
  startLiveFeed();
  startTicker();
  updateBalance();
  bindNavTabs();
});

// =============================================
//  HERO STATS — randomize on each page load
// =============================================
function generateHeroStats() {
  // Paid Out Today: $800k–$3.8M
  const paid = (800000 + Math.random() * 3000000);
  const paidStr = paid >= 1000000
    ? '$' + (paid / 1000000).toFixed(2) + 'M'
    : '$' + Math.round(paid / 1000).toFixed(0) + 'K';

  // Cases Opened: 12,000–98,000
  const opened = Math.floor(12000 + Math.random() * 86000);

  // Uptime: 99.90–99.99%
  const uptime = (99.90 + Math.random() * 0.09).toFixed(2) + '%';

  // Online Now: 800–6,400
  const online = Math.floor(800 + Math.random() * 5600).toLocaleString();

  animateStatTo('stat-paidout', paidStr);
  animateStatTo('stat-opened',  opened.toLocaleString());
  animateStatTo('stat-uptime',  uptime);
  animateStatTo('stat-online',  online);

  // Slowly increment online count every ~8s
  setInterval(() => {
    const el = document.getElementById('stat-online');
    if (!el) return;
    const cur = parseInt(el.textContent.replace(/,/g, ''));
    const delta = Math.floor(Math.random() * 20) - 8; // -8 to +12
    const next = Math.max(400, cur + delta);
    el.textContent = next.toLocaleString();
  }, 8000);
}

function animateStatTo(id, finalVal) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateY(6px)';
  setTimeout(() => {
    el.textContent = finalVal;
    el.style.transition = 'opacity .5s, transform .5s';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 200 + Math.random() * 300);
}

// =============================================
//  NAV / TABS
// =============================================
function bindNavTabs() {
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => showTab(btn.dataset.tab));
  });
  document.querySelectorAll('.sort-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function showTab(tab) {
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.getElementById('tab-' + tab)?.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  if (tab === 'inventory') renderInventory();
}

function scrollToCases() {
  document.getElementById('cases-anchor')?.scrollIntoView({ behavior: 'smooth' });
}

// =============================================
//  BALANCE
// =============================================
function updateBalance() {
  document.getElementById('balance-display').textContent = balance.toFixed(2);
  const cb = document.getElementById('ctrl-balance');
  if (cb) cb.textContent = '$' + balance.toFixed(2);
}

function addFunds() {
  balance += 100;
  updateBalance();
  toast('+ $100.00 added to balance!', 'success');
}

// =============================================
//  RENDER CASES
// =============================================
function renderCases() {
  const grid = document.getElementById('cases-grid');
  grid.innerHTML = CASES.map(c => {
    const tagHtml = c.tag
      ? `<span class="case-tag ${c.tag}">${c.tag.charAt(0).toUpperCase() + c.tag.slice(1)}</span>`
      : '';
    const bestVal = Math.max(...c.items.map(i => i.value));
    return `
      <div class="case-card" onclick="openCaseModal(${c.id})">
        <div class="case-thumb" style="background:${c.bgGradient}">
          <div class="case-thumb-glow" style="--glow-col:${c.glowColor}"></div>
          <span class="case-emoji-big">${c.emoji}</span>
          <div class="case-open-overlay"><span>OPEN CASE</span></div>
        </div>
        <div class="case-info">
          <div class="case-name">${c.name}</div>
          <div class="case-desc">${c.desc}</div>
          <div class="case-footer">
            <span class="case-price">$${c.price.toFixed(2)}</span>
            <span style="font-size:11px;color:var(--muted)">Best: <span style="color:var(--col-legendary)">$${bestVal}</span></span>
          </div>
          ${tagHtml ? `<div style="margin-top:8px">${tagHtml}</div>` : ''}
        </div>
      </div>`;
  }).join('');
}

// =============================================
//  LIVE FEED
// =============================================
function randItem() {
  const all = ALL_ITEMS;
  // Weighted random — commons more likely
  const weights = all.map(i => {
    switch (i.rarity) {
      case 'legendary': return 1;
      case 'epic':      return 5;
      case 'rare':      return 14;
      case 'common':    return 30;
    }
  });
  return weightedRand(all, weights);
}

function randPlayer() {
  return PLAYER_NAMES[Math.floor(Math.random() * PLAYER_NAMES.length)];
}

function timeAgo(seconds) {
  if (seconds < 5)  return 'just now';
  if (seconds < 60) return seconds + 's ago';
  return Math.floor(seconds / 60) + 'm ago';
}

function seedLiveFeed() {
  // Pre-populate feed with 8 entries spread over the last few minutes
  const feed = document.getElementById('live-feed');
  const entries = [];
  for (let i = 0; i < 8; i++) {
    const item = randItem();
    const caseRef = CASES[Math.floor(Math.random() * CASES.length)];
    const secs = (i + 1) * 18 + Math.floor(Math.random() * 15);
    entries.push({ item, caseRef, secs });
  }
  feed.innerHTML = entries.map(e => buildFeedRow(randPlayer(), e.item, e.caseRef, timeAgo(e.secs))).join('');
  feedDrops = 8 + Math.floor(Math.random() * 200) + 1000;
  updateFeedCount();
}

function buildFeedRow(player, item, caseRef, timeStr) {
  return `
    <div class="feed-row">
      <span class="feed-player">${player}</span>
      <div class="feed-item-cell">
        <span class="feed-item-emoji">${item.emoji}</span>
        <span class="feed-item-label">${item.name}</span>
      </div>
      <span class="feed-case">${caseRef.emoji} ${caseRef.name}</span>
      <span class="feed-val ${item.rarity}">$${item.value.toFixed(2)}</span>
      <span class="feed-time">${timeStr}</span>
    </div>`;
}

function addFeedEntry(item, caseRef) {
  const feed = document.getElementById('live-feed');
  const row = document.createElement('div');
  row.className = 'feed-row';
  row.innerHTML = buildFeedRow(randPlayer(), item, caseRef, 'just now').replace('<div class="feed-row">', '').replace('</div>', '');
  feed.insertBefore(row, feed.firstChild);
  while (feed.children.length > 12) feed.removeChild(feed.lastChild);
  feedDrops++;
  updateFeedCount();
}

function updateFeedCount() {
  const el = document.getElementById('feed-count');
  if (el) el.textContent = feedDrops.toLocaleString() + ' drops today';
}

function startLiveFeed() {
  // Random interval between 2.5–6 seconds
  const schedule = () => {
    const delay = 2500 + Math.random() * 3500;
    setTimeout(() => {
      const item = randItem();
      const caseRef = CASES[Math.floor(Math.random() * CASES.length)];
      const feed = document.getElementById('live-feed');
      if (feed) {
        const row = document.createElement('div');
        row.innerHTML = buildFeedRow(randPlayer(), item, caseRef, 'just now');
        feed.insertBefore(row.firstElementChild, feed.firstChild);
        while (feed.children.length > 12) feed.removeChild(feed.lastChild);
        feedDrops++;
        updateFeedCount();
      }
      schedule();
    }, delay);
  };
  schedule();
}

// =============================================
//  TICKER
// =============================================
function startTicker() {
  const ticker = document.getElementById('ticker-text');
  const show = () => {
    const item = randItem();
    const player = randPlayer();
    if (ticker) ticker.textContent = `${player} just won ${item.emoji} ${item.name} ($${item.value})`;
    tickerTimeout = setTimeout(show, 4000 + Math.random() * 3000);
  };
  show();
}

// =============================================
//  CASE MODAL
// =============================================
function openCaseModal(id) {
  currentCase = CASES.find(c => c.id === id);
  if (!currentCase) return;
  openQty = 1;
  spinning = false;
  currentWin = null;

  document.getElementById('modal-case-emoji').textContent = currentCase.emoji;
  document.getElementById('modal-title').textContent = currentCase.name;
  document.getElementById('modal-subtitle').textContent = currentCase.desc;
  document.getElementById('ctrl-price').textContent = '$' + currentCase.price.toFixed(2);
  document.getElementById('ctrl-balance').textContent = '$' + balance.toFixed(2);

  const best = Math.max(...currentCase.items.map(i => i.value));
  document.getElementById('ctrl-best').textContent = '$' + best;

  updateOpenBtn();
  buildDropsGrid();
  resetSpinner();

  document.getElementById('state-spinner').style.display = 'block';
  document.getElementById('state-win').style.display = 'none';
  document.getElementById('modal').classList.add('open');

  // Reset qty buttons
  document.querySelectorAll('.qty-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.qty) === 1);
  });
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  spinning = false;
  currentCase = null;
  currentWin = null;
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}

function setQty(qty, btn) {
  openQty = qty;
  document.querySelectorAll('.qty-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updateOpenBtn();
}

function updateOpenBtn() {
  const btn = document.getElementById('open-btn');
  if (!btn || !currentCase) return;
  const total = currentCase.price * openQty;
  const canAfford = balance >= total;
  btn.disabled = !canAfford;
  if (canAfford) {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> OPEN ${openQty > 1 ? openQty + 'x ' : ''}CASE — $${total.toFixed(2)}`;
  } else {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> INSUFFICIENT BALANCE`;
  }
}

function buildDropsGrid() {
  const grid = document.getElementById('drops-grid');
  // Show a sample of items, sorted by value desc
  const sorted = [...currentCase.items].sort((a, b) => b.value - a.value);
  const show = sorted.slice(0, 12);
  grid.innerHTML = show.map(item => `
    <div class="drop-item rarity-${item.rarity}">
      <div class="d-emoji">${item.emoji}</div>
      <div class="d-name">${item.name}</div>
      <div class="d-val drop-val ${item.rarity}">$${item.value.toFixed(2)}</div>
      <div class="d-odds">${item.odds}</div>
    </div>
  `).join('');
}

function resetSpinner() {
  const track = document.getElementById('spinner-track');
  if (track) { track.style.transition = 'none'; track.style.transform = 'translateX(0)'; track.innerHTML = ''; }
}

// =============================================
//  SPIN LOGIC
// =============================================
function spinCase() {
  if (spinning || !currentCase) return;
  const total = currentCase.price * openQty;
  if (balance < total) { toast('Insufficient balance!', 'error'); return; }

  balance -= total;
  updateBalance();
  spinning = true;

  const btn = document.getElementById('open-btn');
  btn.disabled = true;
  btn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:8px">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    SPINNING...
  </span>`;

  // Pick winning item
  const winItem = weightedRand(currentCase.items, currentCase.weights);
  currentWin = winItem;

  // Build spinner track
  const track = document.getElementById('spinner-track');
  track.style.transition = 'none';
  track.style.transform = 'translateX(0)';

  // Fill track with ~60 items, winner near position 50
  const totalSlots = 60;
  const winPos = 48 + Math.floor(Math.random() * 4); // 48–51
  const slotItems = [];
  for (let i = 0; i < totalSlots; i++) {
    if (i === winPos) {
      slotItems.push(winItem);
    } else {
      // Random from pool, biased toward commons
      slotItems.push(weightedRand(currentCase.items, currentCase.weights));
    }
  }

  const itemW = 132; // 124px width + 8px gap
  track.innerHTML = slotItems.map((item, idx) => `
    <div class="spin-item rarity-${item.rarity}" id="spin-${idx}">
      <div class="si-emoji">${item.emoji}</div>
      <div class="si-name">${item.name}</div>
    </div>
  `).join('');

  // Force reflow
  track.offsetHeight;

  // Calculate target: center the win item in the viewport
  const viewportW = track.parentElement.offsetWidth;
  const centerOffset = viewportW / 2 - itemW / 2;
  const targetX = -(winPos * itemW) + centerOffset;

  // Add slight overshoot offset for realism
  const overshoot = (Math.random() * 40) - 20;

  setTimeout(() => {
    track.style.transition = 'transform 5.2s cubic-bezier(0.02, 0.9, 0.1, 1)';
    track.style.transform = `translateX(${targetX + overshoot}px)`;
  }, 60);

  // Settle overshoot
  setTimeout(() => {
    track.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1)';
    track.style.transform = `translateX(${targetX}px)`;
    document.getElementById('spin-' + winPos)?.classList.add('winner');
  }, 5280);

  // Show win
  setTimeout(() => {
    spinning = false;
    showWinState(winItem);
    addFeedEntry(winItem, currentCase);
  }, 5750);
}

function showWinState(item) {
  document.getElementById('state-spinner').style.display = 'none';
  const ws = document.getElementById('state-win');
  ws.style.display = 'block';

  document.getElementById('win-emoji').textContent = item.emoji;
  document.getElementById('win-item-name').textContent = item.name;

  const valEl = document.getElementById('win-item-value');
  valEl.textContent = '$' + item.value.toFixed(2);
  valEl.className = 'win-item-value ' + item.rarity;

  const badge = document.getElementById('win-rarity-badge');
  badge.textContent = RARITY[item.rarity].label;
  badge.className = 'win-rarity-badge ' + item.rarity;

  document.getElementById('sell-amount').textContent = '$' + item.value.toFixed(2);

  // Glow effect
  const glow = document.getElementById('win-glow');
  const colors = { legendary: 'rgba(240,165,0,.2)', epic: 'rgba(168,85,247,.2)', rare: 'rgba(59,130,246,.18)', common: 'rgba(34,197,94,.15)' };
  glow.style.background = `radial-gradient(circle, ${colors[item.rarity]} 0%, transparent 70%)`;
}

function sellWin() {
  if (!currentWin) return;
  balance += currentWin.value;
  updateBalance();
  toast(`Sold ${currentWin.name} for $${currentWin.value.toFixed(2)}!`, 'gold');
  closeModal();
}

function keepWin() {
  if (!currentWin) return;
  inventory.push({ ...currentWin, uid: Date.now() + Math.random() });

  saveGame(); // ADD THIS LINE

  updateInvBadge();
  toast(`${currentWin.name} added to inventory!`, 'success');
  closeModal();
}

function openAgain() {
  if (!currentCase) return;
  document.getElementById('state-spinner').style.display = 'block';
  document.getElementById('state-win').style.display = 'none';
  resetSpinner();
  updateOpenBtn();
  currentWin = null;
}

// =============================================
//  INVENTORY
// =============================================
let invFilter = 'all';

function filterInv(f, btn) {
  invFilter = f;
  document.querySelectorAll('.inv-filter').forEach(b => b.classList.remove('active'));
  btn?.classList.add('active');
  renderInventory();
}

function renderInventory() {
  const grid = document.getElementById('inv-grid');
  const empty = document.getElementById('inv-empty');
  const filtered = invFilter === 'all' ? inventory : inventory.filter(i => i.rarity === invFilter);

  // Total value
  const total = inventory.reduce((sum, i) => sum + i.value, 0);
  const tvEl = document.getElementById('inv-total-val');
  if (tvEl) tvEl.textContent = inventory.length ? `${inventory.length} items • $${total.toFixed(2)} total` : '';

  if (!filtered.length) {
    grid.innerHTML = '';
    if (empty) {
      empty.style.display = 'block';
      grid.appendChild(empty);
    }
    return;
  }

  if (empty) empty.style.display = 'none';
  grid.innerHTML = filtered.sort((a, b) => b.value - a.value).map(item => `
    <div class="inv-card rarity-border-${item.rarity}">
      <div class="ic-emoji">${item.emoji}</div>
      <div class="ic-name">${item.name}</div>
      <div class="ic-val ${item.rarity}" style="color:var(--col-${item.rarity})">$${item.value.toFixed(2)}</div>
      <button class="ic-sell" onclick="sellInvItem('${item.uid}', event)" title="Sell">✕</button>
    </div>
  `).join('');
}

function sellInvItem(uid, e) {
  e?.stopPropagation();
  const idx = inventory.findIndex(i => String(i.uid) === String(uid));
  if (idx === -1) return;
  const item = inventory.splice(idx, 1)[0];
  balance += item.value;
  updateBalance();
  updateInvBadge();
  toast(`Sold ${item.name} for $${item.value.toFixed(2)}!`, 'gold');
  renderInventory();
}

function sellAllInventory() {
  if (!inventory.length) { toast('No items to sell.', 'error'); return; }
  const total = inventory.reduce((sum, i) => sum + i.value, 0);
  inventory = [];
  balance += total;
  updateBalance();
  updateInvBadge();
  toast(`Sold all items for $${total.toFixed(2)}!`, 'gold');
  renderInventory();
}

function updateInvBadge() {
  const badge = document.getElementById('inv-badge');
  if (!badge) return;
  if (inventory.length) {
    badge.textContent = inventory.length;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

// =============================================
//  UTILITIES
// =============================================
function weightedRand(items, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

let toastTimer = null;
function toast(msg, type = '') {
  const el = document.getElementById('toast');
  if (!el) return;
  clearTimeout(toastTimer);
  el.textContent = msg;
  el.className = 'toast show ' + type;
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// Inject spin keyframe
const style = document.createElement('style');
style.textContent = '@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }';
document.head.appendChild(style);
