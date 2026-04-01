import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';

// ── Marketplace Data ──────────────────────────────────────────────────────────
const SHOP_DATA = {
  weapons: [
    { id: 'w1', name: "Cutlass",              icon: '🗡',  desc: "A trusty pirate blade.",                    price: 25,  rarity: 'common',    stats: ['+12 ATK', '+5 SPD'] },
    { id: 'w2', name: "Flintlock Pistol",     icon: '🔫', desc: "One shot. Make it count.",                  price: 55,  rarity: 'uncommon',  stats: ['+28 ATK', '-8 SPD', 'Ranged'] },
    { id: 'w3', name: "Blackbread's Saber",   icon: '⚔',  desc: "Stolen from the feared pirate himself.",   price: 130, rarity: 'rare',      stats: ['+40 ATK', '+15 SPD', 'Cursed'] },
    { id: 'w4', name: "Trident of Davy",      icon: '🔱', desc: "Forged in the ocean abyss.",               price: 280, rarity: 'epic',      stats: ['+65 ATK', 'Water DMG', '+20 DEF'] },
    { id: 'w5', name: "The Golden Hook",      icon: '🪝',  desc: "A hook that drags fate itself.",           price: 500, rarity: 'legendary', stats: ['+90 ATK', 'Fate Bind', '+30 SPD'] },
  ],
  armor: [
    { id: 'a1', name: "Sailor's Coat",        icon: '🧥', desc: "Worn, smells of salt and adventure.",      price: 20,  rarity: 'common',    stats: ['+8 DEF', '+3 SPD'] },
    { id: 'a2', name: "Leather Vest",         icon: '🦺', desc: "Supple hide from a kraken's side.",        price: 45,  rarity: 'uncommon',  stats: ['+18 DEF', '-2 SPD'] },
    { id: 'a3', name: "Iron Breastplate",     icon: '🛡',  desc: "Dented but dependable.",                   price: 100, rarity: 'rare',      stats: ['+35 DEF', '-10 SPD'] },
    { id: 'a4', name: "Ghost Ship Armor",     icon: '👻', desc: "Phased from another realm.",               price: 250, rarity: 'epic',      stats: ['+55 DEF', 'Ethereal', '+10 SPD'] },
    { id: 'a5', name: "Poseidon's Plate",     icon: '🌊', desc: "The ocean itself yields to its wearer.",   price: 480, rarity: 'legendary', stats: ['+80 DEF', 'Sea Ward', 'Breathe Water'] },
  ],
  potions: [
    { id: 'p1', name: "Grog Flask",           icon: '🍺', desc: "What doesn't kill ye makes ye stronger.",  price: 10,  rarity: 'common',    stats: ['+20 HP', 'Stackable'] },
    { id: 'p2', name: "Sea Witch's Brew",     icon: '🧪', desc: "Green and bubbling. Probably fine.",       price: 30,  rarity: 'uncommon',  stats: ['+50 HP', 'Random Buff'] },
    { id: 'p3', name: "Mermaid's Tears",      icon: '💧', desc: "Rare and potent healing essence.",         price: 80,  rarity: 'rare',      stats: ['+120 HP', 'Cure Poison'] },
    { id: 'p4', name: "Kraken Ink",           icon: '🦑', desc: "Grants brief invincibility + ink cloud.",  price: 180, rarity: 'epic',      stats: ['Invincible 10s', 'Blind Foes'] },
    { id: 'p5', name: "Elixir of Eternity",   icon: '✨', desc: "A single drop of liquid immortality.",     price: 420, rarity: 'legendary', stats: ['Full HP', 'Revive', '+50 All Stats'] },
  ],
  maps: [
    { id: 'm1', name: "Torn Map Fragment",    icon: '📄', desc: "A piece of a greater treasure map.",       price: 15,  rarity: 'common',    stats: ['Fragment 1/4'] },
    { id: 'm2', name: "Isle of Skulls Map",   icon: '🗺',  desc: "Marks a hidden cove full of gold.",        price: 60,  rarity: 'uncommon',  stats: ['+Gold Finder', 'Region: North'] },
    { id: 'm3', name: "Sunken City Chart",    icon: '🌐', desc: "The drowned city of Atlantis awaits.",     price: 140, rarity: 'rare',      stats: ['Depth: 900ft', 'Rare Loot'] },
    { id: 'm4', name: "Blackbread's Secret",  icon: '☠',  desc: "His most guarded route.",                  price: 320, rarity: 'epic',      stats: ['Boss Route', 'All Ports'] },
    { id: 'm5', name: "Map of All Seas",      icon: '🧭', desc: "Reveals every treasure hoard.",            price: 600, rarity: 'legendary', stats: ['Global', 'All Secrets', 'Legendary Loot'] },
  ],
  misc: [
    { id: 'x1', name: "Ship's Parrot",        icon: '🦜', desc: "Loudmouthed but loyal.",                   price: 35,  rarity: 'uncommon',  stats: ['+Ambush Warn', 'Companion'] },
    { id: 'x2', name: "Spy Glass",            icon: '🔭', desc: "See enemies before they see you.",         price: 50,  rarity: 'uncommon',  stats: ['+200 View', '+Scout'] },
    { id: 'x3', name: "Haunted Lantern",      icon: '🏮', desc: "Lights the way in cursed darkness.",       price: 90,  rarity: 'rare',      stats: ['Night Vision', 'Ghost Talk'] },
    { id: 'x4', name: "Bottled Typhoon",      icon: '🌀', desc: "Unleash a storm upon thine enemies.",      price: 200, rarity: 'epic',      stats: ['AOE Storm', '1-Use'] },
    { id: 'x5', name: "Immortal's Compass",   icon: '⭐', desc: "Always points to what you desire most.",   price: 450, rarity: 'legendary', stats: ['Desire Track', 'Never Lost'] },
  ],
};

// ── CSS injected once ─────────────────────────────────────────────────────────
const MARKETPLACE_CSS = (path) => `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&display=swap');

#marketplace-overlay {
  position: fixed;
  inset: 0;
  z-index: 99998;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.78);
  backdrop-filter: blur(3px);
  animation: mpFadeIn 0.25s ease;
}
@keyframes mpFadeIn { from { opacity:0 } to { opacity:1 } }

#marketplace-panel {
  width: min(980px, 96vw);
  max-height: 90vh;
  background: linear-gradient(160deg, #1a0e04 0%, #0d0804 100%);
  border: 3px solid #8a5010;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 0 60px rgba(200,120,20,0.18), inset 0 0 80px rgba(0,0,0,0.5);
  font-family: 'IM Fell English', serif;
}

/* Header */
#mp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 22px;
  border-bottom: 2px solid #5a3010;
  background: rgba(0,0,0,0.4);
  gap: 12px;
  flex-shrink: 0;
}

#mp-title {
  font-family: 'Cinzel Decorative', cursive;
  color: #e8b030;
  font-size: 18px;
  letter-spacing: 2px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.8);
}
#mp-title small {
  display: block;
  color: #a07838;
  font-size: 10px;
  letter-spacing: 3px;
  margin-top: 2px;
  font-family: 'IM Fell English', serif;
}

/* Ruby HUD */
#mp-hud {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0,0,0,0.55);
  border: 2px solid #6a3808;
  border-radius: 30px;
  padding: 6px 16px;
}
#mp-ruby-icon {
  width: 28px; height: 28px;
  background-image: url('${path}/images/gamebuilder/sprites/ruby.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
  filter: drop-shadow(0 0 4px rgba(255,80,80,0.55));
}
#mp-ruby-count {
  font-family: 'Cinzel Decorative', cursive;
  color: #f5c030;
  font-size: 20px;
  min-width: 40px;
  text-align: right;
}

/* Close */
#mp-close-btn {
  background: rgba(120,30,10,0.5);
  border: 1.5px solid #8a3010;
  border-radius: 8px;
  color: #e8a030;
  font-family: 'Cinzel Decorative', cursive;
  font-size: 11px;
  padding: 7px 14px;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background 0.15s;
}
#mp-close-btn:hover { background: rgba(200,60,20,0.55); color: #fff; }

/* Coin-collect bar removed — coins live on the map */

/* ── Map rubies (spawned on game canvas, outside shop UI) ── */
.mp-map-ruby {
  position: fixed;
  width: 36px; height: 36px;
  background-image: url('${path}/images/gamebuilder/sprites/ruby.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
  cursor: pointer;
  pointer-events: auto;
  z-index: 9990;
  filter: drop-shadow(0 0 5px rgba(255,60,60,0.65));
  animation: mapRubyBob 1.6s ease-in-out infinite;
  transition: transform 0.12s, opacity 0.15s;
}
.mp-map-ruby:hover {
  transform: scale(1.4) translateY(-4px) !important;
  filter: drop-shadow(0 0 10px rgba(255,130,60,1));
}
@keyframes mapRubyBob {
  0%,100% { transform: translateY(0px);  }
  50%      { transform: translateY(-6px); }
}

/* Tabs */
#mp-tabs {
  display: flex;
  gap: 5px;
  padding: 10px 22px 0;
  border-bottom: 2px solid rgba(180,110,30,0.3);
  flex-shrink: 0;
  flex-wrap: wrap;
}
.mp-tab {
  background: rgba(0,0,0,0.4);
  border: 1.5px solid rgba(180,110,30,0.3);
  border-bottom: none;
  border-radius: 7px 7px 0 0;
  color: #a07838;
  font-family: 'Cinzel Decorative', cursive;
  font-size: 10px;
  padding: 7px 14px;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background 0.15s, color 0.15s;
}
.mp-tab:hover:not(.active) { background: rgba(160,100,20,0.2); color: #e0a040; }
.mp-tab.active { background: rgba(140,80,10,0.45); color: #f5c030; border-color: #9a6010; border-bottom-color: transparent; }

/* Shop grid */
#mp-shopgrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
  gap: 14px;
  padding: 18px 22px;
  overflow-y: auto;
  flex: 1;
}
#mp-shopgrid::-webkit-scrollbar { width: 5px; }
#mp-shopgrid::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
#mp-shopgrid::-webkit-scrollbar-thumb { background: #6a3808; border-radius: 4px; }

/* Item cards */
.mp-card {
  background: linear-gradient(160deg, rgba(44,22,5,0.94) 0%, rgba(24,10,2,0.96) 100%);
  border: 2px solid rgba(140,80,20,0.45);
  border-radius: 11px;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.15s;
}
.mp-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(220,160,40,0.05) 0%, transparent 65%);
  pointer-events: none;
}
.mp-card:hover { border-color: rgba(220,150,30,0.75); transform: translateY(-3px); }
.mp-card.owned { border-color: rgba(50,170,70,0.5); }
.mp-card.owned::after {
  content: 'OWNED';
  position: absolute;
  top: 8px; right: 8px;
  background: rgba(30,140,55,0.85);
  color: #a0ffb0;
  font-family: 'Cinzel Decorative', cursive;
  font-size: 8px;
  padding: 3px 7px;
  border-radius: 4px;
  letter-spacing: 1px;
}

.mp-rarity {
  position: absolute;
  top: 7px; left: 9px;
  font-size: 8px;
  font-family: 'Cinzel Decorative', cursive;
  letter-spacing: 1px;
  padding: 2px 6px;
  border-radius: 4px;
}
.r-common    { background: rgba(90,90,90,0.5);  color: #ccc; }
.r-uncommon  { background: rgba(20,110,35,0.5); color: #90ee90; }
.r-rare      { background: rgba(25,55,150,0.5); color: #80b0ff; }
.r-epic      { background: rgba(90,15,130,0.5); color: #dd90ff; }
.r-legendary { background: rgba(160,90,0,0.5);  color: #ffc060; }

.mp-icon  { font-size: 38px; text-align: center; padding-top: 18px; line-height: 1; }
.mp-name  { font-family: 'Cinzel Decorative', cursive; color: #e8b030; font-size: 11px; text-align: center; letter-spacing: 0.5px; }
.mp-desc  { color: rgba(210,175,115,0.7); font-size: 11px; font-style: italic; text-align: center; line-height: 1.4; }
.mp-stats { display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; }
.mp-stat  { background: rgba(0,0,0,0.4); border: 1px solid rgba(180,130,40,0.2); border-radius: 4px; padding: 2px 7px; font-size: 10px; color: #c49840; }
.mp-stat.pos { color: #78e878; border-color: rgba(60,180,60,0.25); }
.mp-stat.neg { color: #e87878; border-color: rgba(180,60,60,0.25); }

.mp-price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding-top: 4px;
  border-top: 1px solid rgba(180,130,40,0.15);
}
.mp-price-ruby {
  width: 18px; height: 18px;
  background-image: url('${path}/images/gamebuilder/sprites/ruby.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
}
.mp-price-num { font-family: 'Cinzel Decorative', cursive; color: #f0c030; font-size: 15px; }

.mp-buy-btn, .mp-sell-btn {
  width: 100%;
  padding: 7px;
  border-radius: 6px;
  font-family: 'Cinzel Decorative', cursive;
  font-size: 10px;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background 0.15s, transform 0.1s;
}
.mp-buy-btn {
  background: rgba(140,75,8,0.7);
  border: 1.5px solid #b07010;
  color: #f0c030;
}
.mp-buy-btn:hover:not(:disabled) { background: rgba(210,120,15,0.75); color: #fff; transform: scale(1.02); }
.mp-buy-btn:disabled { opacity: 0.38; cursor: not-allowed; }
.mp-sell-btn {
  background: rgba(15,70,25,0.6);
  border: 1.5px solid rgba(50,150,50,0.5);
  color: #80ee80;
}
.mp-sell-btn:hover { background: rgba(30,120,40,0.7); }

/* Inventory panel */
#mp-inv-panel {
  position: absolute;
  right: -360px;
  top: 0; bottom: 0;
  width: 320px;
  background: linear-gradient(180deg, rgba(18,6,1,0.99) 0%, rgba(8,4,1,1) 100%);
  border-left: 3px solid #6a3808;
  z-index: 10;
  padding: 20px 16px;
  overflow-y: auto;
  transition: right 0.28s cubic-bezier(0.4,0,0.2,1);
}
#mp-inv-panel.open { right: 0; }
#mp-inv-panel::-webkit-scrollbar { width: 4px; }
#mp-inv-panel::-webkit-scrollbar-thumb { background: #5a2808; border-radius: 3px; }

#mp-inv-title {
  font-family: 'Cinzel Decorative', cursive;
  color: #e8b030;
  font-size: 14px;
  text-align: center;
  padding-bottom: 12px;
  border-bottom: 1.5px solid rgba(180,110,30,0.3);
  margin-bottom: 14px;
  letter-spacing: 2px;
}
#mp-inv-close {
  float: right;
  background: none;
  border: none;
  color: #a07028;
  font-size: 18px;
  cursor: pointer;
  margin-top: -3px;
  transition: color 0.15s;
}
#mp-inv-close:hover { color: #f0c030; }
.mp-inv-empty { color: rgba(160,120,60,0.45); font-style: italic; text-align: center; padding: 20px 0; font-size: 13px; }
.mp-inv-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px;
  border: 1px solid rgba(180,120,40,0.18);
  border-radius: 7px;
  margin-bottom: 7px;
  background: rgba(35,14,3,0.6);
}
.mp-inv-icon { font-size: 24px; flex-shrink: 0; line-height: 1; }
.mp-inv-name { font-family: 'Cinzel Decorative', cursive; color: #e0a828; font-size: 11px; letter-spacing: 0.5px; }
.mp-inv-meta { color: rgba(180,140,70,0.65); font-size: 10px; font-style: italic; }

/* Inv toggle (lives inside the game overlay, not the panel) */
#mp-inv-toggle {
  background: rgba(25,10,2,0.97);
  border: 2px solid #7a4010;
  border-radius: 40px;
  padding: 9px 18px;
  color: #e8b030;
  font-family: 'Cinzel Decorative', cursive;
  font-size: 11px;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}
#mp-inv-toggle:hover { background: rgba(80,35,5,0.97); }

/* Toast */
#mp-toast {
  position: absolute;
  bottom: 24px; left: 50%;
  transform: translateX(-50%) translateY(60px);
  background: rgba(18,8,2,0.97);
  border: 2px solid #7a4010;
  border-radius: 9px;
  padding: 11px 26px;
  color: #f0c030;
  font-family: 'Cinzel Decorative', cursive;
  font-size: 11px;
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  letter-spacing: 1px;
  text-align: center;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s;
  white-space: nowrap;
}
#mp-toast.show      { transform: translateX(-50%) translateY(0); opacity: 1; }
#mp-toast.t-success { border-color: #30b050; color: #80ff90; }
#mp-toast.t-err     { border-color: #c02020; color: #ff8888; }
`;

// ── MarketplaceUI class ────────────────────────────────────────────────────────
class MarketplaceUI {
  constructor(path, onClose) {
    this.path   = path;
    this.onClose = onClose;
    this.coins   = 0;
    this.inventory = [];
    this.currentTab = 'weapons';
    this._toastTimer = null;

    this._injectCSS(path);
    this._buildDOM();
    this._bindEvents();
    this._spawnCoins(6);
    this._startAutoSpawn();
    this._renderShop();
    this._renderInventory();
  }

  // ── CSS ──
  _injectCSS(path) {
    if (document.getElementById('marketplace-style')) return;
    const style = document.createElement('style');
    style.id    = 'marketplace-style';
    style.textContent = MARKETPLACE_CSS(path);
    document.head.appendChild(style);
  }

  // ── DOM ──
  _buildDOM() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'marketplace-overlay';

    this.overlay.innerHTML = `
      <div id="marketplace-panel">

        <!-- Header -->
        <div id="mp-header">
          <div id="mp-title">
            ☠ The Black Market
            <small>Port o' Thieves — Est. 1689</small>
          </div>
          <div id="mp-hud">
            <div id="mp-ruby-icon"></div>
            <div id="mp-ruby-count">0</div>
          </div>
          <button id="mp-inv-toggle">🎒 Bag <span id="mp-inv-badge" style="display:none; background:#b02020; color:#fff; border-radius:50%; padding:1px 5px; font-size:9px; margin-left:3px;"></span></button>
          <button id="mp-close-btn">✕ Leave</button>
        </div>

        <!-- Coin-collect bar REMOVED — rubies now spawn on the map -->

        <!-- Tabs -->
        <div id="mp-tabs">
          <button class="mp-tab active" data-tab="weapons">⚔ Weapons</button>
          <button class="mp-tab" data-tab="armor">🛡 Armor</button>
          <button class="mp-tab" data-tab="potions">🧪 Potions</button>
          <button class="mp-tab" data-tab="maps">🗺 Maps</button>
          <button class="mp-tab" data-tab="misc">🔮 Misc</button>
        </div>

        <!-- Shop grid -->
        <div id="mp-shopgrid"></div>

        <!-- Inventory slide-panel -->
        <div id="mp-inv-panel">
          <div id="mp-inv-title">
            <button id="mp-inv-close">✕</button>
            McArchie's Bag
          </div>
          <div id="mp-invlist"></div>
        </div>

        <!-- Toast -->
        <div id="mp-toast"></div>
      </div>
    `;

    document.body.appendChild(this.overlay);

    // Cache refs
    this.shopGrid    = document.getElementById('mp-shopgrid');
    this.invList     = document.getElementById('mp-invlist');
    this.invPanel    = document.getElementById('mp-inv-panel');
    this.countEl     = document.getElementById('mp-ruby-count');
    this.badge       = document.getElementById('mp-inv-badge');
    this.toast       = document.getElementById('mp-toast');
  }

  _bindEvents() {
    document.getElementById('mp-close-btn').addEventListener('click', () => this.destroy());
    document.getElementById('mp-inv-toggle').addEventListener('click', () => this._toggleInv());
    document.getElementById('mp-inv-close').addEventListener('click', () => this._toggleInv());

    document.querySelectorAll('.mp-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mp-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.dataset.tab;
        this._renderShop();
      });
    });
  }

  // ── Coins (called by the game level when player walks over a ruby) ──
  _updateHUD() {
    this.countEl.textContent = this.coins;
  }

  addRuby(n = 1) {
    this.coins += n;
    this._updateHUD();
    this._renderShop();
    this._toast(`+${n} Ruby!`, 'success');
  }

  // ── Shop ──
  _renderShop() {
    this.shopGrid.innerHTML = '';
    const items = SHOP_DATA[this.currentTab] || [];
    items.forEach(item => {
      const owned  = this.inventory.some(i => i.id === item.id);
      const canBuy = this.coins >= item.price;
      const card   = document.createElement('div');
      card.className = 'mp-card' + (owned ? ' owned' : '');

      const statsHtml = item.stats.map(s =>
        `<span class="mp-stat ${s.startsWith('+') ? 'pos' : s.startsWith('-') ? 'neg' : ''}">${s}</span>`
      ).join('');

      const actionHtml = owned
        ? `<button class="mp-sell-btn" data-id="${item.id}">Sell for ${Math.floor(item.price * 0.5)} ◈</button>`
        : `<button class="mp-buy-btn" data-id="${item.id}" ${canBuy ? '' : 'disabled'}>
             ${canBuy ? 'Purchase' : 'Need ' + (item.price - this.coins) + ' more'}
           </button>`;

      card.innerHTML = `
        <div class="mp-rarity r-${item.rarity}">${item.rarity.toUpperCase()}</div>
        <div class="mp-icon">${item.icon}</div>
        <div class="mp-name">${item.name}</div>
        <div class="mp-desc">${item.desc}</div>
        <div class="mp-stats">${statsHtml}</div>
        <div class="mp-price">
          <div class="mp-price-ruby"></div>
          <div class="mp-price-num">${item.price}</div>
        </div>
        ${actionHtml}
      `;

      const btn = card.querySelector('[data-id]');
      if (btn) {
        btn.addEventListener('click', () => {
          owned ? this._sell(item.id) : this._buy(item.id);
        });
      }
      this.shopGrid.appendChild(card);
    });
  }

  _buy(id) {
    const item = this._findItem(id);
    if (!item) return;
    if (this.coins < item.price) { this._toast('Not enough rubies!', 'err'); return; }
    this.coins -= item.price;
    this.inventory.push(item);
    this._updateHUD();
    this._renderShop();
    this._renderInventory();
    this._toast(`${item.icon} ${item.name} acquired!`, 'success');
  }

  _sell(id) {
    const idx  = this.inventory.findIndex(i => i.id === id);
    if (idx < 0) return;
    const item = this.inventory[idx];
    const gain = Math.floor(item.price * 0.5);
    this.coins += gain;
    this.inventory.splice(idx, 1);
    this._updateHUD();
    this._renderShop();
    this._renderInventory();
    this._toast(`Sold ${item.name} for ${gain} rubies.`);
  }

  _findItem(id) {
    for (const cat of Object.values(SHOP_DATA)) {
      const found = cat.find(x => x.id === id);
      if (found) return found;
    }
    return null;
  }

  // ── Inventory ──
  _renderInventory() {
    this.badge.textContent = this.inventory.length;
    this.badge.style.display = this.inventory.length ? 'inline' : 'none';
    if (!this.inventory.length) {
      this.invList.innerHTML = '<p class="mp-inv-empty">Thy satchel is empty, sailor.</p>';
      return;
    }
    this.invList.innerHTML = this.inventory.map(item => `
      <div class="mp-inv-item">
        <div class="mp-inv-icon">${item.icon}</div>
        <div>
          <div class="mp-inv-name">${item.name}</div>
          <div class="mp-inv-meta">${item.rarity} · ${item.stats[0] || ''}</div>
        </div>
      </div>
    `).join('');
  }

  _toggleInv() {
    this.invPanel.classList.toggle('open');
  }

  // ── Toast ──
  _toast(msg, type = '') {
    this.toast.textContent = msg;
    this.toast.className   = 'mp-toast show' + (type ? ` t-${type}` : '');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      this.toast.className = 'mp-toast' + (type ? ` t-${type}` : '');
    }, 2400);
  }

  // ── Teardown ──
  destroy() {
    if (this.overlay && this.overlay.parentNode) this.overlay.remove();
    if (typeof this.onClose === 'function') this.onClose();
  }

  /** Returns whatever is in the player's inventory — useful for the game level */
  getInventory() { return [...this.inventory]; }

  /** Returns current ruby count */
  getRubies() { return this.coins; }
}

// ── Game Level ────────────────────────────────────────────────────────────────
class MarketPirateGame {
  constructor(gameEnv) {
    this.gameEnv   = gameEnv;
    this.continue  = true;
    this._ui       = null;
    this._open     = false;

    const width  = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;
    const path   = gameEnv.path;

    // ── Background ──
    const image_data_marketplace = {
      name: 'marketplace',
      src:  path + '/images/MarketPlaceRPG.png',
      pixels: { height: 580, width: 1038 }
    };

    // ── Player (McArchie, same config as MegaGame2) ──
    const sprite_data_MA = {
      id: 'McArchie',
      src: path + '/images/gamebuilder/sprites/mcarchie.png',
      SCALE_FACTOR: 8,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 30,
      INIT_POSITION: { x: 150, y: height * 0.75 },
      pixels: { height: 256, width: 256 },
      orientation: { rows: 4, columns: 4 },
      down:      { row: 0, start: 0, columns: 4 },
      downRight: { row: 2, start: 0, columns: 3, rotate: Math.PI / 16 },
      downLeft:  { row: 1, start: 0, columns: 3, rotate: -Math.PI / 16 },
      right:     { row: 2, start: 0, columns: 4 },
      left:      { row: 1, start: 0, columns: 4 },
      up:        { row: 3, start: 0, columns: 4 },
      upRight:   { row: 2, start: 0, columns: 3, rotate: -Math.PI / 16 },
      upLeft:    { row: 1, start: 0, columns: 3, rotate: Math.PI / 16 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    this.classes = [
      { class: GameEnvBackground, data: image_data_marketplace },
      { class: Player,            data: sprite_data_MA },
    ];

    // ── Open-shop zone (center of map) ──
    this.shopZone = {
      x: width  * 0.38,
      y: height * 0.30,
      width:  width  * 0.24,
      height: height * 0.40,
    };

    // ── Hint label ──
    this.hintEl = document.createElement('div');
    Object.assign(this.hintEl.style, {
      position: 'absolute',
      bottom: '28px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '9px 18px',
      background: 'rgba(0,0,0,0.76)',
      color: '#ffd',
      fontFamily: '"Cinzel Decorative", Courier, monospace',
      fontSize: '13px',
      border: '1.5px solid #c08030',
      borderRadius: '7px',
      zIndex: '9999',
      display: 'none',
      letterSpacing: '1px',
    });
    this.hintEl.textContent = '⚓ Enter the market — press E to shop';
    document.body.appendChild(this.hintEl);

    // ── E-key listener ──
    this._keyHandler = (e) => {
      if (e.key !== 'e' && e.key !== 'E') return;
      const player = this.gameEnv.gameObjects?.find(o => o instanceof Player);
      if (!player) return;
      if (this._playerInBattleZone(player)) {
        this._openBattleSublevel();
      } else if (this._playerInZone(player)) {
        this._openShop();
      }
    };
    window.addEventListener('keydown', this._keyHandler);

    // ── Tux Dungeon gateway ──
    this._bagInventory = [];
    this._battleOpen = false;
    this._battleArena = null;
    this._bankedGems = 0;
    this.battleZone = {
      x: width * 0.08,
      y: height * 0.58,
      width: width * 0.18,
      height: height * 0.22,
    };
    this._renderBattleEntrance();
  }

  // ── Map ruby spawning ──
  _spawnMapRubies(n = 1) {
    const container = this.gameEnv.gameContainer || document.getElementById('gameContainer') || document.body;
    const rect = container.getBoundingClientRect();

    const margin = 48;
    const availableWidth  = Math.max(0, rect.width  - margin * 2);
    const availableHeight = Math.max(0, rect.height - margin * 2);

    for (let i = 0; i < n; i++) {
      // Random position inside the visible game container, with a small edge margin
      const x = margin + Math.random() * availableWidth;
      const y = margin + Math.random() * availableHeight;
      const pageX = rect.left + x;
      const pageY = rect.top  + y;

      const el = document.createElement('div');
      el.className = 'mp-map-ruby';
      el.style.left = pageX + 'px';
      el.style.top  = pageY + 'px';
      el.title = 'Ruby!';

      // Also clickable directly
      el.addEventListener('click', () => this._collectMapRuby(el));
      document.body.appendChild(el);

      this._mapRubies.push({ el, x, y });
    }
  }

  _collectMapRuby(el) {
    const idx = this._mapRubies.findIndex(r => r.el === el);
    if (idx < 0) return;
    this._mapRubies.splice(idx, 1);
    el.style.transform = 'scale(0) translateY(-12px)';
    el.style.opacity   = '0';
    setTimeout(() => el.remove(), 220);
    // Credit ruby to open shop if any, otherwise bank it for when shop opens
    if (this._ui) {
      this._ui.addRuby(1);
    } else {
      this._bankedRubies = (this._bankedRubies || 0) + 1;
    }
  }

  _playerInZone(player) {
    if (!player?.position) return false;
    return (
      player.position.x + player.width  > this.shopZone.x &&
      player.position.x                 < this.shopZone.x + this.shopZone.width &&
      player.position.y + player.height > this.shopZone.y &&
      player.position.y                 < this.shopZone.y + this.shopZone.height
    );
  }

  _playerInBattleZone(player) {
    if (!player?.position) return false;
    return (
      player.position.x + player.width  > this.battleZone.x &&
      player.position.x                 < this.battleZone.x + this.battleZone.width &&
      player.position.y + player.height > this.battleZone.y &&
      player.position.y                 < this.battleZone.y + this.battleZone.height
    );
  }

  _renderBattleEntrance() {
    const container = this.gameEnv.gameContainer || document.getElementById('gameContainer') || document.body;
    const rect = container.getBoundingClientRect();
    if (!this._battleEntranceEl) {
      this._battleEntranceEl = document.createElement('div');
      this._battleEntranceEl.id = 'mp-battle-entrance';
      document.body.appendChild(this._battleEntranceEl);
    }
    Object.assign(this._battleEntranceEl.style, {
      position: 'absolute',
      left: `${rect.left + this.battleZone.x}px`,
      top: `${rect.top + this.battleZone.y}px`,
      width: `${this.battleZone.width}px`,
      height: `${this.battleZone.height}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '12px',
      background: 'radial-gradient(circle at 30% 20%, rgba(120,220,255,0.35), rgba(0,40,70,0.85))',
      border: '2px solid rgba(120,200,255,0.8)',
      borderRadius: '18px',
      color: '#e8f8ff',
      fontFamily: 'Courier, monospace',
      fontSize: '12px',
      lineHeight: '1.3',
      zIndex: '9998',
      pointerEvents: 'none',
      textShadow: '0 0 6px rgba(0,120,180,0.8)',
      boxShadow: '0 0 30px rgba(80,180,255,0.2)',
    });
    this._battleEntranceEl.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:6px;">
        <strong style="font-size:14px;">Tux Den</strong>
        <span style="font-size:11px;">Press E to enter</span>
      </div>
    `;
  }

  _openBattleSublevel() {
    if (this._battleOpen || this._open) return;
    this._battleOpen = true;
    this._battleArena = new TuxBattleArena(
      this.gameEnv.path,
      (earned) => this._closeBattleSublevel(earned),
      () => this._bagInventory
    );
  }

  _closeBattleSublevel(gemsEarned) {
    this._battleOpen = false;
    this._battleArena = null;
    if (!gemsEarned) return;
    if (this._ui) {
      this._ui.addRuby(gemsEarned);
    } else {
      this._bankedGems = (this._bankedGems || 0) + gemsEarned;
    }
  }

  _openShop() {
    if (this._open) return;
    const player = this.gameEnv.gameObjects?.find(o => o instanceof Player);
    if (!player || !this._playerInZone(player)) return;
    this._open = true;
    this._ui = new MarketplaceUI(this.gameEnv.path, () => {
      this._open = false;
      this._ui   = null;
    }, this._bagInventory);
    // Deposit any gems picked up before the shop opened
    if (this._bankedGems) {
      this._ui.addRuby(this._bankedGems);
      this._bankedGems = 0;
    }
  }

  // ── Game loop ──
  update() {
    if (!this.gameEnv?.gameObjects) return;
    const player = this.gameEnv.gameObjects.find(o => o instanceof Player);
    if (!player) return;

    if (this._open || this._battleOpen) {
      this.hintEl.style.display = 'none';
      return;
    }

    const nearShop = this._playerInZone(player);
    const nearBattle = this._playerInBattleZone(player);
    if (nearBattle) {
      this.hintEl.textContent = '⚔ Enter the Tux Den — press E';
      this.hintEl.style.display = 'block';
    } else if (nearShop) {
      this.hintEl.textContent = '⚓ Enter the market — press E to shop';
      this.hintEl.style.display = 'block';
    } else {
      this.hintEl.style.display = 'none';
    }
  }

  draw()   {}

  resize() {
    this._renderBattleEntrance();
  }

  destroy() {
    window.removeEventListener('keydown', this._keyHandler);
    if (this._battleEntranceEl?.parentNode) this._battleEntranceEl.remove();
    if (this._battleArena) this._battleArena.destroy();
    if (this.hintEl?.parentNode) this.hintEl.remove();
    if (this._ui) this._ui.destroy();
  }
}

export default MarketPirateGame;