import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';

const SHOP_DATA = {
  weapons: [
    { id: 'w1', name: "Wooden Sword",              icon: '🗡',  desc: "A trusty pirate blade.",                    price: 25,  rarity: 'common',    stats: ['+12 ATK', '+5 SPD'] },
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
    { id: 'p1', name: "Monke Drink",         icon: '🍺', desc: "Tastes awful. Heals a little.",             price: 10,  rarity: 'common',    stats: ['+8 HP',  'Stackable'] },
    { id: 'p2', name: "Sea Witch's Brew",    icon: '🧪', desc: "Green and bubbling. Barely fine.",          price: 30,  rarity: 'uncommon',  stats: ['+18 HP', 'Random Buff'] },
    { id: 'p3', name: "Mermaid's Tears",     icon: '💧', desc: "Rare essence — hard to get, worth it.",     price: 80,  rarity: 'rare',      stats: ['+35 HP', 'Cure Poison'] },
    { id: 'p4', name: "Kraken Ink",          icon: '🦑', desc: "Grants brief invincibility + ink cloud.",   price: 180, rarity: 'epic',      stats: ['Invincible 10s', 'Blind Foes'] },
    { id: 'p5', name: "Elixir of Eternity",  icon: '⚔️', desc: "A single drop of liquid immortality.",      price: 420, rarity: 'legendary', stats: ['Full HP', 'Revive', '+50 All Stats'] },
  ],
  maps: [
    { id: 'm1', name: "Torn Map Fragment",    icon: '📄', desc: "A piece of a greater treasure map.",       price: 15,  rarity: 'common',    stats: ['Fragment 1/4'] },
    { id: 'm2', name: "Isle of Skulls Map",   icon: '🗺',  desc: "Marks a hidden cove full of gold.",        price: 60,  rarity: 'uncommon',  stats: ['+Gold Finder', 'Region: North'] },
    { id: 'm3', name: "Sunken City Chart",    icon: '🌐', desc: "The drowned city of Atlantis awaits.",     price: 140, rarity: 'rare',      stats: ['Depth: 900ft', 'Rare Loot'] },
    { id: 'm4', name: "Blackbread's Secret",  icon: '☠',  desc: "His most guarded route.",                  price: 320, rarity: 'epic',      stats: ['Boss Route', 'All Ports'] },
    { id: 'm5', name: "Map of All Seas",      icon: '🧭', desc: "Reveals every treasure hoard.",            price: 600, rarity: 'legendary', stats: ['Global', 'All Secrets', 'Legendary Loot'] },
  ],
  misc: [
    { id: 'x1', name: "Ship's Parrot",        icon: '🦜', desc: "Loudmouthed but loyal. Will help you out only if you feed him.",                   price: 35,  rarity: 'uncommon',  stats: ['+Ambush Warn', 'Companion'] },
    { id: 'x2', name: "Spy Glass",            icon: '🔭', desc: "See enemies before they see you.",         price: 50,  rarity: 'uncommon',  stats: ['+200 View', '+Scout'] },
    { id: 'x3', name: "Haunted Lantern",      icon: '🏮', desc: "Lights the way in cursed darkness.",       price: 90,  rarity: 'rare',      stats: ['Night Vision', 'Ghost Talk'] },
    { id: 'x4', name: "Bottled Typhoon",      icon: '🌀', desc: "Unleash a storm upon thine enemies.",      price: 200, rarity: 'epic',      stats: ['AOE Storm', '1-Use'] },
    { id: 'x5', name: "Immortal's Compass",   icon: '⭐', desc: "Always points to what you desire most.",   price: 450, rarity: 'legendary', stats: ['Desire Track', 'Never Lost'] },
  ],
};

const ENEMY_TYPES = [
  { id: 'skeleton', name: 'Skeleton Guard',           icon: '💀', hp: 30,  atk: 10, def: 2,  reward: [3,  6],  rarity: 'common'   },
  { id: 'rat',      name: 'Giant Rat',                icon: '🐀', hp: 20,  atk: 7,  def: 1,  reward: [2,  4],  rarity: 'common'   },
  { id: 'ghost',    name: 'Ghost Sailor',             icon: '👻', hp: 45,  atk: 14, def: 4,  reward: [6,  10], rarity: 'uncommon' },
  { id: 'pirate',   name: 'Rival Pirate',             icon: '🏴‍☠️', hp: 55,  atk: 18, def: 5,  reward: [8,  14], rarity: 'uncommon' },
  { id: 'kraken',   name: 'Baby Fire Bird',           icon: '🐦‍🔥', hp: 80,  atk: 24, def: 8,  reward: [15, 22], rarity: 'rare'     },
  { id: 'davy',     name: "Luffy the Monke's Wrath",  icon: '⚓', hp: 120, atk: 32, def: 12, reward: [25, 35], rarity: 'epic'     },
];

const BATTLE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&display=swap');
#battle-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.88);backdrop-filter:blur(4px);animation:bFadeIn .22s ease}
@keyframes bFadeIn{from{opacity:0}to{opacity:1}}
#battle-panel{width:min(640px,96vw);background:linear-gradient(160deg,#110800 0%,#06030a 100%);border:3px solid #7a3a08;border-radius:18px;overflow:hidden;font-family:'IM Fell English',serif;box-shadow:0 0 80px rgba(180,80,10,.25),inset 0 0 60px rgba(0,0,0,.6)}
#battle-header{background:rgba(0,0,0,.45);border-bottom:2px solid #4a2406;padding:12px 20px;display:flex;align-items:center;justify-content:space-between}
#battle-title{font-family:'Cinzel Decorative',cursive;color:#e8a020;font-size:15px;letter-spacing:2px}
#battle-arena{display:flex;align-items:center;justify-content:space-around;padding:28px 24px 16px;gap:16px}
.b-fighter{display:flex;flex-direction:column;align-items:center;gap:8px;flex:1}
.b-fighter-icon{font-size:64px;line-height:1;filter:drop-shadow(0 4px 12px rgba(0,0,0,.7));transition:transform .15s}
.b-fighter-icon.shake{animation:bShake .35s ease}
@keyframes bShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(10px)}60%{transform:translateX(-6px)}80%{transform:translateX(5px)}}
.b-fighter-name{font-family:'Cinzel Decorative',cursive;color:#e8a020;font-size:11px;letter-spacing:1px;text-align:center}
.b-hp-bar-wrap{width:100%;max-width:160px;background:rgba(0,0,0,.5);border:1.5px solid rgba(180,100,20,.3);border-radius:8px;height:14px;overflow:hidden}
.b-hp-bar{height:100%;border-radius:7px;transition:width .4s ease}
.b-hp-bar.player{background:linear-gradient(90deg,#20a050,#40e080)}
.b-hp-bar.enemy{background:linear-gradient(90deg,#c02020,#e85030)}
.b-hp-text{font-family:'Cinzel Decorative',cursive;font-size:11px;color:#c8a040}
#b-vs{font-family:'Cinzel Decorative',cursive;color:#e03020;font-size:26px;text-shadow:0 0 18px rgba(220,60,20,.7);flex-shrink:0}
#battle-log{background:rgba(0,0,0,.4);border-top:1px solid rgba(180,100,20,.2);border-bottom:1px solid rgba(180,100,20,.2);margin:0 20px 14px;border-radius:8px;padding:10px 14px;min-height:52px;max-height:72px;overflow-y:auto;font-size:13px;color:rgba(220,190,120,.85);font-style:italic;line-height:1.5}
#battle-log::-webkit-scrollbar{width:4px}#battle-log::-webkit-scrollbar-thumb{background:#5a2808;border-radius:3px}
.b-log-entry{margin-bottom:2px}.b-log-entry.hit-player{color:#ff8868}.b-log-entry.hit-enemy{color:#68e888}.b-log-entry.special{color:#f0c030}
#battle-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 20px 20px}
.b-action-btn{padding:12px;border-radius:8px;font-family:'Cinzel Decorative',cursive;font-size:11px;cursor:pointer;letter-spacing:1px;border:1.5px solid;transition:background .15s,transform .1s,opacity .2s;display:flex;flex-direction:column;align-items:center;gap:4px}
.b-action-btn .b-action-icon{font-size:22px}
.b-action-btn .b-action-sub{font-size:9px;opacity:.7;font-family:'IM Fell English',serif}
.b-action-btn:hover:not(:disabled){transform:translateY(-2px)}
.b-action-btn:disabled{opacity:.35;cursor:not-allowed}
.b-btn-attack{background:rgba(140,30,10,.6);border-color:#b04010;color:#f08030}.b-btn-attack:hover:not(:disabled){background:rgba(200,60,20,.7)}
.b-btn-special{background:rgba(80,20,120,.6);border-color:#9040c0;color:#d080ff}.b-btn-special:hover:not(:disabled){background:rgba(120,40,180,.7)}
.b-btn-defend{background:rgba(20,60,100,.6);border-color:#3080c0;color:#60b8ff}.b-btn-defend:hover:not(:disabled){background:rgba(30,90,150,.7)}
.b-btn-flee{background:rgba(40,40,40,.6);border-color:#606060;color:#b0b0b0}.b-btn-flee:hover:not(:disabled){background:rgba(70,70,70,.7)}
#battle-reward{display:none;flex-direction:column;align-items:center;gap:14px;padding:28px 20px;text-align:center}
#battle-reward.show{display:flex}
#b-reward-icon{font-size:52px}
#b-reward-title{font-family:'Cinzel Decorative',cursive;color:#f5c030;font-size:20px;letter-spacing:2px;text-shadow:0 0 20px rgba(240,180,20,.5)}
#b-reward-rubies{display:flex;align-items:center;gap:8px;font-family:'Cinzel Decorative',cursive;font-size:28px;color:#f0c030}
.b-ruby-icon-lg{font-size:30px;filter:drop-shadow(0 0 6px rgba(255,80,60,.8))}
#b-reward-btn{margin-top:8px;background:rgba(140,75,8,.7);border:1.5px solid #b07010;border-radius:8px;color:#f0c030;font-family:'Cinzel Decorative',cursive;font-size:12px;padding:11px 32px;cursor:pointer;letter-spacing:1px;transition:background .15s}
#b-reward-btn:hover{background:rgba(210,120,15,.75);color:#fff}
#battle-defeat{display:none;flex-direction:column;align-items:center;gap:14px;padding:28px 20px;text-align:center}
#battle-defeat.show{display:flex}
#b-defeat-title{font-family:'Cinzel Decorative',cursive;color:#e03030;font-size:20px;letter-spacing:2px}
#b-defeat-btn{background:rgba(80,20,10,.7);border:1.5px solid #802010;border-radius:8px;color:#f08060;font-family:'Cinzel Decorative',cursive;font-size:12px;padding:11px 32px;cursor:pointer;letter-spacing:1px;transition:background .15s}
#b-defeat-btn:hover{background:rgba(140,40,20,.8)}
.world-enemy{position:fixed;display:flex;flex-direction:column;align-items:center;gap:2px;z-index:9988;pointer-events:none;transition:opacity .3s;transform:translate(-50%,-50%);transform-origin:center center}
.world-enemy.defeated{opacity:0;pointer-events:none}
.world-enemy-icon{font-size:34px;animation:enemyBob 2s ease-in-out infinite;filter:drop-shadow(0 3px 8px rgba(0,0,0,.7))}
@keyframes enemyBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.world-enemy-label{background:rgba(0,0,0,.75);border:1px solid rgba(200,60,20,.5);border-radius:4px;padding:2px 7px;font-family:'Cinzel Decorative',cursive;font-size:9px;color:#ff8860;white-space:nowrap}
.world-enemy-hpbar{width:48px;height:5px;background:rgba(0,0,0,.5);border-radius:3px;overflow:hidden;border:1px solid rgba(200,60,20,.3)}
.world-enemy-hpfill{height:100%;background:#c02020;border-radius:3px;transition:width .3s}
.world-enemy-action{display:none;position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%);background:rgba(0,0,0,.9);border:1px solid rgba(200,120,40,.65);border-radius:8px;padding:6px 10px;font-family:'Cinzel Decorative',cursive;font-size:10px;color:#ffb970;white-space:nowrap;pointer-events:none;z-index:9990}
.world-enemy.has-hint .world-enemy-action{display:block}
#gameover-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0);backdrop-filter:blur(0px);transition:background 1.2s ease,backdrop-filter 1.2s ease;pointer-events:none}
#gameover-overlay.show{background:rgba(0,0,0,.92);backdrop-filter:blur(6px);pointer-events:all}
#gameover-panel{display:flex;flex-direction:column;align-items:center;gap:18px;padding:48px 52px;background:linear-gradient(160deg,#1a0000 0%,#060006 100%);border:3px solid #6a0000;border-radius:20px;box-shadow:0 0 100px rgba(180,0,0,.4),inset 0 0 80px rgba(0,0,0,.7);font-family:'IM Fell English',serif;opacity:0;transform:scale(.88);transition:opacity .8s ease .4s,transform .8s ease .4s}
#gameover-overlay.show #gameover-panel{opacity:1;transform:scale(1)}
#gameover-skull{font-size:80px;animation:goFloat 3s ease-in-out infinite}
@keyframes goFloat{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-10px) rotate(3deg)}}
#gameover-title{font-family:'Cinzel Decorative',cursive;color:#cc0000;font-size:36px;letter-spacing:4px;text-shadow:0 0 40px rgba(200,0,0,.8),0 0 80px rgba(200,0,0,.4)}
#gameover-sub{color:rgba(200,140,100,.7);font-size:14px;font-style:italic;text-align:center;line-height:1.7;max-width:320px}
#gameover-stats{display:flex;gap:28px;padding:14px 24px;background:rgba(0,0,0,.4);border:1px solid rgba(150,50,50,.3);border-radius:10px}
.go-stat{display:flex;flex-direction:column;align-items:center;gap:4px}
.go-stat-val{font-family:'Cinzel Decorative',cursive;color:#e8a020;font-size:22px}
.go-stat-lbl{color:rgba(180,130,80,.6);font-size:10px;font-family:'Cinzel Decorative',cursive;letter-spacing:1px}
#gameover-btn{margin-top:8px;background:rgba(140,0,0,.7);border:2px solid #aa0000;border-radius:10px;color:#ff6060;font-family:'Cinzel Decorative',cursive;font-size:13px;padding:13px 40px;cursor:pointer;letter-spacing:2px;transition:background .2s,transform .15s;text-transform:uppercase}
#gameover-btn:hover{background:rgba(200,20,20,.8);color:#fff;transform:scale(1.04)}
`;

class BattleUI {
  constructor(enemyType, onClose, startingHp = 80) {
    this.onClose       = onClose;
    this.enemy         = { ...enemyType, curHp: enemyType.hp };
    this.player        = { name: 'McArchie', maxHp: 80, curHp: startingHp, atk: 10, def: 3 };
    this.defending     = false;
    this.busy          = false;
    this._earnedRubies = 0;
    this._build();
    this._bind();
    this._log(`⚔ A ${this.enemy.name} appears! Fight or flee!`, 'special');
  }

  _build() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'battle-overlay';
    this.overlay.innerHTML = `
      <div id="battle-panel">
        <div id="battle-header">
          <div id="battle-title">☠ COMBAT</div>
          <div id="b-rarity-badge" style="font-family:'Cinzel Decorative',cursive;font-size:10px;padding:3px 10px;border-radius:5px;letter-spacing:1px;"></div>
        </div>
        <div id="battle-arena">
          <div class="b-fighter">
            <div class="b-fighter-icon" id="b-player-icon">🏴‍☠️</div>
            <div class="b-fighter-name">McArchie</div>
            <div class="b-hp-bar-wrap"><div class="b-hp-bar player" id="b-player-hp" style="width:100%"></div></div>
            <div class="b-hp-text" id="b-player-hp-text">${this.player.curHp} / ${this.player.maxHp}</div>
          </div>
          <div id="b-vs">VS</div>
          <div class="b-fighter">
            <div class="b-fighter-icon" id="b-enemy-icon"></div>
            <div class="b-fighter-name" id="b-enemy-name"></div>
            <div class="b-hp-bar-wrap"><div class="b-hp-bar enemy" id="b-enemy-hp" style="width:100%"></div></div>
            <div class="b-hp-text" id="b-enemy-hp-text"></div>
          </div>
        </div>
        <div id="battle-log"></div>
        <div id="battle-actions">
          <button class="b-action-btn b-btn-attack" id="b-attack"><span class="b-action-icon">⚔</span>Attack<span class="b-action-sub">Deal steady damage</span></button>
          <button class="b-action-btn b-btn-special" id="b-special"><span class="b-action-icon">💥</span>Special<span class="b-action-sub">High risk, high reward</span></button>
          <button class="b-action-btn b-btn-defend" id="b-defend"><span class="b-action-icon">🛡</span>Defend<span class="b-action-sub">Halve next hit taken</span></button>
          <button class="b-action-btn b-btn-flee" id="b-flee"><span class="b-action-icon">💨</span>Flee<span class="b-action-sub">50% chance to escape</span></button>
        </div>
        <div id="battle-reward">
          <div id="b-reward-icon">💰</div>
          <div id="b-reward-title">VICTORY!</div>
          <div id="b-reward-rubies"><span class="b-ruby-icon-lg">💎</span><span id="b-ruby-amount">0</span> Rubies</div>
          <button id="b-reward-btn">Claim Reward</button>
        </div>
        <div id="battle-defeat">
          <div style="font-size:52px">💀</div>
          <div id="b-defeat-title">DEFEATED!</div>
          <div style="font-family:'IM Fell English',serif;color:rgba(200,150,100,.7);font-size:13px;">Ye fought bravely, sailor...</div>
          <button id="b-defeat-btn">Retreat</button>
        </div>
      </div>
    `;
    document.body.appendChild(this.overlay);
    document.getElementById('b-enemy-icon').textContent    = this.enemy.icon;
    document.getElementById('b-enemy-name').textContent    = this.enemy.name;
    document.getElementById('b-enemy-hp-text').textContent = `${this.enemy.hp} / ${this.enemy.hp}`;

    // Set player HP bar to reflect carried-over HP
    this._updateBars();

    const rarityColors = {
      common:    { bg: 'rgba(80,80,80,.5)',  color: '#ccc'    },
      uncommon:  { bg: 'rgba(20,100,30,.5)', color: '#90ee90' },
      rare:      { bg: 'rgba(25,55,150,.5)', color: '#80b0ff' },
      epic:      { bg: 'rgba(90,15,130,.5)', color: '#dd90ff' },
      legendary: { bg: 'rgba(160,90,0,.5)', color: '#ffc060' },
    };
    const rc    = rarityColors[this.enemy.rarity] || rarityColors.common;
    const badge = document.getElementById('b-rarity-badge');
    badge.textContent      = this.enemy.rarity.toUpperCase();
    badge.style.background = rc.bg;
    badge.style.color      = rc.color;
  }

  _bind() {
    document.getElementById('b-attack').addEventListener('click',  () => this._playerAction('attack'));
    document.getElementById('b-special').addEventListener('click', () => this._playerAction('special'));
    document.getElementById('b-defend').addEventListener('click',  () => this._playerAction('defend'));
    document.getElementById('b-flee').addEventListener('click',    () => this._playerAction('flee'));
    document.getElementById('b-reward-btn').addEventListener('click', () => {
      const r  = this._earnedRubies;
      const hp = this.player.curHp;
      this.destroy();
      this.onClose?.(r, false, hp);
    });
    document.getElementById('b-defeat-btn').addEventListener('click', () => {
      this.destroy();
      this.onClose?.(0, true, 0);
    });
  }

  _log(msg, cls = '') {
    const log = document.getElementById('battle-log');
    if (!log) return;
    const el = document.createElement('div');
    el.className   = 'b-log-entry' + (cls ? ' ' + cls : '');
    el.textContent = msg;
    log.appendChild(el);
    log.scrollTop  = log.scrollHeight;
  }

  _updateBars() {
    const pp = Math.max(0, this.player.curHp / this.player.maxHp * 100);
    const ep = Math.max(0, this.enemy.curHp  / this.enemy.hp    * 100);
    const playerBar = document.getElementById('b-player-hp');
    if (playerBar) {
      playerBar.style.width = pp + '%';
      // Change colour based on HP level
      if (pp > 50) {
        playerBar.style.background = 'linear-gradient(90deg,#20a050,#40e080)';
      } else if (pp > 25) {
        playerBar.style.background = 'linear-gradient(90deg,#a08020,#e0c030)';
      } else {
        playerBar.style.background = 'linear-gradient(90deg,#a02020,#e05030)';
      }
    }
    const enemyBar = document.getElementById('b-enemy-hp');
    if (enemyBar) enemyBar.style.width = ep + '%';
    const pText = document.getElementById('b-player-hp-text');
    if (pText) pText.textContent = `${Math.max(0, this.player.curHp)} / ${this.player.maxHp}`;
    const eText = document.getElementById('b-enemy-hp-text');
    if (eText) eText.textContent = `${Math.max(0, this.enemy.curHp)} / ${this.enemy.hp}`;
  }

  _shake(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 400);
  }

  _setButtons(disabled) {
    ['b-attack', 'b-special', 'b-defend', 'b-flee'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = disabled;
    });
  }

  async _playerAction(action) {
    if (this.busy) return;
    this.busy = true;
    this._setButtons(true);

    if (action === 'attack') {
      const dmg = Math.max(1, this.player.atk + Math.floor(Math.random() * 8) - this.enemy.def);
      this._shake('b-enemy-icon');
      this._log(`⚔ McArchie strikes for ${dmg} damage!`, 'hit-enemy');
      this.enemy.curHp -= dmg;
      this._updateBars();
    } else if (action === 'special') {
      if (Math.random() < 0.35) {
        this._log(`💥 Special missed! The enemy dodged!`);
      } else {
        const dmg = Math.max(1, this.player.atk * 2 + Math.floor(Math.random() * 14) - this.enemy.def);
        this._shake('b-enemy-icon');
        this._log(`💥 SPECIAL ATTACK for ${dmg} damage!`, 'special');
        this.enemy.curHp -= dmg;
        this._updateBars();
      }
    } else if (action === 'defend') {
      this.defending = true;
      this._log(`🛡 McArchie braces for the next blow!`);
    } else if (action === 'flee') {
      if (Math.random() < 0.5) {
        this._log(`💨 McArchie escaped!`, 'special');
        await this._wait(900);
        this.busy = false;
        this.destroy();
        this.onClose?.(0, false, this.player.curHp);
        return;
      }
      this._log(`💨 Couldn't flee — the enemy blocks the way!`);
    }

    await this._wait(480);

    if (this.enemy.curHp <= 0) {
      await this._showVictory();
      this.busy = false;
      return;
    }

    // Enemy counter-attack
    const isPower = Math.random() < 0.2;
    let dmg = Math.max(1, this.enemy.atk + Math.floor(Math.random() * 6) - this.player.def);
    if (isPower)        dmg = Math.floor(dmg * 1.8);
    if (this.defending) dmg = Math.floor(dmg * 0.5);
    this._log(
      isPower
        ? `${this.enemy.icon} ${this.enemy.name} unleashes a powerful blow for ${dmg} damage!`
        : `${this.enemy.icon} ${this.enemy.name} attacks for ${dmg} damage!`,
      'hit-player'
    );
    this._shake('b-player-icon');
    this.player.curHp -= dmg;
    this._updateBars();
    this.defending = false;

    await this._wait(400);

    if (this.player.curHp <= 0) {
      await this._showDefeat();
      this.busy = false;
      return;
    }

    this.busy = false;
    this._setButtons(false);
  }

  async _showVictory() {
    const [min, max]   = this.enemy.reward;
    this._earnedRubies = min + Math.floor(Math.random() * (max - min + 1));
    document.getElementById('battle-actions').style.display = 'none';
    document.getElementById('battle-log').style.display    = 'none';
    document.getElementById('b-ruby-amount').textContent   = this._earnedRubies;
    document.getElementById('battle-reward').classList.add('show');
  }

  async _showDefeat() {
    document.getElementById('battle-actions').style.display = 'none';
    document.getElementById('battle-log').style.display    = 'none';
    document.getElementById('battle-defeat').classList.add('show');
  }

  _wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  destroy() {
    if (this.overlay?.parentNode) this.overlay.remove();
  }
}

const MARKETPLACE_CSS = (path) => `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&display=swap');
#marketplace-overlay{position:fixed;inset:0;z-index:99998;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.78);backdrop-filter:blur(3px);animation:mpFadeIn .25s ease}
@keyframes mpFadeIn{from{opacity:0}to{opacity:1}}
#marketplace-panel{width:min(980px,96vw);max-height:90vh;background:linear-gradient(160deg,#1a0e04 0%,#0d0804 100%);border:3px solid #8a5010;border-radius:16px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 0 60px rgba(200,120,20,.18),inset 0 0 80px rgba(0,0,0,.5);font-family:'IM Fell English',serif}
#mp-header{display:flex;align-items:center;justify-content:space-between;padding:14px 22px;border-bottom:2px solid #5a3010;background:rgba(0,0,0,.4);gap:12px;flex-shrink:0}
#mp-title{font-family:'Cinzel Decorative',cursive;color:#e8b030;font-size:18px;letter-spacing:2px;text-shadow:0 2px 10px rgba(0,0,0,.8)}
#mp-title small{display:block;color:#a07838;font-size:10px;letter-spacing:3px;margin-top:2px;font-family:'IM Fell English',serif}
#mp-hud{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,.55);border:2px solid #6a3808;border-radius:30px;padding:6px 16px}
#mp-ruby-icon{width:28px;height:28px;background-image:url('${path}/images/gamebuilder/sprites/ruby.png');background-size:contain;background-repeat:no-repeat;background-position:center;image-rendering:pixelated;filter:drop-shadow(0 0 4px rgba(255,80,80,.55))}
#mp-ruby-count{font-family:'Cinzel Decorative',cursive;color:#f5c030;font-size:20px;min-width:40px;text-align:right}
#mp-close-btn{background:rgba(120,30,10,.5);border:1.5px solid #8a3010;border-radius:8px;color:#e8a030;font-family:'Cinzel Decorative',cursive;font-size:11px;padding:7px 14px;cursor:pointer;letter-spacing:1px;transition:background .15s}
#mp-close-btn:hover{background:rgba(200,60,20,.55);color:#fff}
#mp-tabs{display:flex;gap:5px;padding:10px 22px 0;border-bottom:2px solid rgba(180,110,30,.3);flex-shrink:0;flex-wrap:wrap}
.mp-tab{background:rgba(0,0,0,.4);border:1.5px solid rgba(180,110,30,.3);border-bottom:none;border-radius:7px 7px 0 0;color:#a07838;font-family:'Cinzel Decorative',cursive;font-size:10px;padding:7px 14px;cursor:pointer;letter-spacing:1px;transition:background .15s,color .15s}
.mp-tab:hover:not(.active){background:rgba(160,100,20,.2);color:#e0a040}
.mp-tab.active{background:rgba(140,80,10,.45);color:#f5c030;border-color:#9a6010;border-bottom-color:transparent}
#mp-shopgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:14px;padding:18px 22px;overflow-y:auto;flex:1}
#mp-shopgrid::-webkit-scrollbar{width:5px}#mp-shopgrid::-webkit-scrollbar-track{background:rgba(0,0,0,.3)}#mp-shopgrid::-webkit-scrollbar-thumb{background:#6a3808;border-radius:4px}
.mp-card{background:linear-gradient(160deg,rgba(44,22,5,.94) 0%,rgba(24,10,2,.96) 100%);border:2px solid rgba(140,80,20,.45);border-radius:11px;padding:14px 12px;display:flex;flex-direction:column;gap:8px;position:relative;overflow:hidden;transition:border-color .2s,transform .15s}
.mp-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(220,160,40,.05) 0%,transparent 65%);pointer-events:none}
.mp-card:hover{border-color:rgba(220,150,30,.75);transform:translateY(-3px)}
.mp-card.owned{border-color:rgba(50,170,70,.5)}
.mp-card.owned::after{content:'OWNED';position:absolute;top:8px;right:8px;background:rgba(30,140,55,.85);color:#a0ffb0;font-family:'Cinzel Decorative',cursive;font-size:8px;padding:3px 7px;border-radius:4px;letter-spacing:1px}
.mp-rarity{position:absolute;top:7px;left:9px;font-size:8px;font-family:'Cinzel Decorative',cursive;letter-spacing:1px;padding:2px 6px;border-radius:4px}
.r-common{background:rgba(90,90,90,.5);color:#ccc}.r-uncommon{background:rgba(20,110,35,.5);color:#90ee90}.r-rare{background:rgba(25,55,150,.5);color:#80b0ff}.r-epic{background:rgba(90,15,130,.5);color:#dd90ff}.r-legendary{background:rgba(160,90,0,.5);color:#ffc060}
.mp-icon{font-size:38px;text-align:center;padding-top:18px;line-height:1}
.mp-name{font-family:'Cinzel Decorative',cursive;color:#e8b030;font-size:11px;text-align:center;letter-spacing:.5px}
.mp-desc{color:rgba(210,175,115,.7);font-size:11px;font-style:italic;text-align:center;line-height:1.4}
.mp-stats{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}
.mp-stat{background:rgba(0,0,0,.4);border:1px solid rgba(180,130,40,.2);border-radius:4px;padding:2px 7px;font-size:10px;color:#c49840}
.mp-stat.pos{color:#78e878;border-color:rgba(60,180,60,.25)}.mp-stat.neg{color:#e87878;border-color:rgba(180,60,60,.25)}
.mp-price{display:flex;align-items:center;justify-content:center;gap:5px;padding-top:4px;border-top:1px solid rgba(180,130,40,.15)}
.mp-price-ruby{width:18px;height:18px;background-image:url('${path}/images/gamebuilder/sprites/ruby.png');background-size:contain;background-repeat:no-repeat;background-position:center;image-rendering:pixelated}
.mp-price-num{font-family:'Cinzel Decorative',cursive;color:#f0c030;font-size:15px}
.mp-buy-btn,.mp-sell-btn{width:100%;padding:7px;border-radius:6px;font-family:'Cinzel Decorative',cursive;font-size:10px;cursor:pointer;letter-spacing:1px;transition:background .15s,transform .1s}
.mp-buy-btn{background:rgba(140,75,8,.7);border:1.5px solid #b07010;color:#f0c030}
.mp-buy-btn:hover:not(:disabled){background:rgba(210,120,15,.75);color:#fff;transform:scale(1.02)}
.mp-buy-btn:disabled{opacity:.38;cursor:not-allowed}
.mp-sell-btn{background:rgba(15,70,25,.6);border:1.5px solid rgba(50,150,50,.5);color:#80ee80}
.mp-sell-btn:hover{background:rgba(30,120,40,.7)}
#mp-inv-panel{position:absolute;right:-360px;top:0;bottom:0;width:320px;background:linear-gradient(180deg,rgba(18,6,1,.99) 0%,rgba(8,4,1,1) 100%);border-left:3px solid #6a3808;z-index:10;padding:20px 16px;overflow-y:auto;transition:right .28s cubic-bezier(.4,0,.2,1)}
#mp-inv-panel.open{right:0}
#mp-inv-panel::-webkit-scrollbar{width:4px}#mp-inv-panel::-webkit-scrollbar-thumb{background:#5a2808;border-radius:3px}
#mp-inv-title{font-family:'Cinzel Decorative',cursive;color:#e8b030;font-size:14px;text-align:center;padding-bottom:12px;border-bottom:1.5px solid rgba(180,110,30,.3);margin-bottom:14px;letter-spacing:2px}
#mp-inv-close{float:right;background:none;border:none;color:#a07028;font-size:18px;cursor:pointer;margin-top:-3px;transition:color .15s}
#mp-inv-close:hover{color:#f0c030}
.mp-inv-empty{color:rgba(160,120,60,.45);font-style:italic;text-align:center;padding:20px 0;font-size:13px}
.mp-inv-item{display:flex;align-items:center;gap:9px;padding:9px;border:1px solid rgba(180,120,40,.18);border-radius:7px;margin-bottom:7px;background:rgba(35,14,3,.6)}
.mp-inv-icon{font-size:24px;flex-shrink:0;line-height:1}
.mp-inv-name{font-family:'Cinzel Decorative',cursive;color:#e0a828;font-size:11px;letter-spacing:.5px}
.mp-inv-meta{color:rgba(180,140,70,.65);font-size:10px;font-style:italic}
#mp-inv-toggle{background:rgba(25,10,2,.97);border:2px solid #7a4010;border-radius:40px;padding:9px 18px;color:#e8b030;font-family:'Cinzel Decorative',cursive;font-size:11px;cursor:pointer;letter-spacing:1px;transition:background .15s;white-space:nowrap;flex-shrink:0}
#mp-inv-toggle:hover{background:rgba(80,35,5,.97)}
#mp-toast{position:absolute;bottom:24px;left:50%;transform:translateX(-50%) translateY(60px);background:rgba(18,8,2,.97);border:2px solid #7a4010;border-radius:9px;padding:11px 26px;color:#f0c030;font-family:'Cinzel Decorative',cursive;font-size:11px;z-index:9999;opacity:0;pointer-events:none;letter-spacing:1px;text-align:center;transition:transform .3s cubic-bezier(.34,1.56,.64,1),opacity .3s;white-space:nowrap}
#mp-toast.show{transform:translateX(-50%) translateY(0);opacity:1}
#mp-toast.t-success{border-color:#30b050;color:#80ff90}
#mp-toast.t-err{border-color:#c02020;color:#ff8888}
`;

class MarketplaceUI {
  constructor(path, onClose, initialInventory = [], initialRubies = 0, onHeal = null) {
    this.path        = path;
    this.onClose     = onClose;
    this.onHeal      = onHeal;   // callback(healAmount) fired when player drinks a potion
    this.coins       = initialRubies;
    this.inventory   = [...initialInventory];
    this.currentTab  = 'weapons';
    this._toastTimer = null;
    const old = document.getElementById('marketplace-style');
    if (old) old.remove();
    this._injectCSS(path);
    this._buildDOM();
    this._bindEvents();
    this._updateHUD();
    this._renderShop();
    this._renderInventory();
  }

  _injectCSS(path) {
    const s = document.createElement('style');
    s.id = 'marketplace-style';
    s.textContent = MARKETPLACE_CSS(path);
    document.head.appendChild(s);
  }

  _buildDOM() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'marketplace-overlay';
    this.overlay.innerHTML = `
      <div id="marketplace-panel">
        <div id="mp-header">
          <div id="mp-title">☠ The Black Market<small>Port o' Thieves — Est. 1689</small></div>
          <div id="mp-hud"><div id="mp-ruby-icon"></div><div id="mp-ruby-count">0</div></div>
          <button id="mp-inv-toggle">🎒 Bag <span id="mp-inv-badge" style="display:none;background:#b02020;color:#fff;border-radius:50%;padding:1px 5px;font-size:9px;margin-left:3px;"></span></button>
          <button id="mp-close-btn">✕ Leave</button>
        </div>
        <div id="mp-tabs">
          <button class="mp-tab active" data-tab="weapons">⚔ Weapons</button>
          <button class="mp-tab" data-tab="armor">🛡 Armor</button>
          <button class="mp-tab" data-tab="potions">🧪 Potions</button>
          <button class="mp-tab" data-tab="maps">🗺 Maps</button>
          <button class="mp-tab" data-tab="misc">🔮 Misc</button>
        </div>
        <div id="mp-shopgrid"></div>
        <div id="mp-inv-panel">
          <div id="mp-inv-title"><button id="mp-inv-close">✕</button> McArchie's Bag</div>
          <div id="mp-invlist"></div>
        </div>
        <div id="mp-toast"></div>
      </div>
    `;
    document.body.appendChild(this.overlay);
    this.shopGrid = document.getElementById('mp-shopgrid');
    this.invList  = document.getElementById('mp-invlist');
    this.invPanel = document.getElementById('mp-inv-panel');
    this.countEl  = document.getElementById('mp-ruby-count');
    this.badge    = document.getElementById('mp-inv-badge');
    this.toast    = document.getElementById('mp-toast');
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

  _updateHUD() { this.countEl.textContent = this.coins; }

  addRuby(n = 1) {
    this.coins += n;
    this._updateHUD();
    this._renderShop();
    this._toast(`+${n} ${n === 1 ? 'Ruby' : 'Rubies'}!`, 'success');
  }

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
      const isPotion = this.currentTab === 'potions';
      let actionHtml;
      if (isPotion) {
        // Potions: always purchasable (stackable), button buys AND uses immediately
        actionHtml = `<button class="mp-buy-btn" data-id="${item.id}" data-potion="1" ${canBuy ? '' : 'disabled'}>${canBuy ? '🍺 Drink Now' : 'Need ' + (item.price - this.coins) + ' more'}</button>`;
      } else {
        actionHtml = owned
          ? `<button class="mp-sell-btn" data-id="${item.id}">Sell for ${Math.floor(item.price * 0.5)} ◈</button>`
          : `<button class="mp-buy-btn" data-id="${item.id}" ${canBuy ? '' : 'disabled'}>${canBuy ? 'Purchase' : 'Need ' + (item.price - this.coins) + ' more'}</button>`;
      }
      card.innerHTML = `
        <div class="mp-rarity r-${item.rarity}">${item.rarity.toUpperCase()}</div>
        <div class="mp-icon">${item.icon}</div>
        <div class="mp-name">${item.name}</div>
        <div class="mp-desc">${item.desc}</div>
        <div class="mp-stats">${statsHtml}</div>
        <div class="mp-price"><div class="mp-price-ruby"></div><div class="mp-price-num">${item.price}</div></div>
        ${actionHtml}
      `;
      card.querySelector('[data-id]')?.addEventListener('click', (e) => {
        if (e.currentTarget.dataset.potion) {
          this._drinkPotion(item.id);
        } else {
          owned ? this._sell(item.id) : this._buy(item.id);
        }
      });
      this.shopGrid.appendChild(card);
    });
  }

  _buy(id) {
    const item = this._findItem(id);
    if (!item || this.coins < item.price) { this._toast('Not enough rubies!', 'err'); return; }
    this.coins -= item.price;
    this.inventory.push(item);
    this._updateHUD(); this._renderShop(); this._renderInventory();
    this._toast(`${item.icon} ${item.name} acquired!`, 'success');
  }

  _drinkPotion(id) {
    const item = this._findItem(id);
    if (!item || this.coins < item.price) { this._toast('Not enough rubies!', 'err'); return; }
    // Parse heal amount from the stats array e.g. '+20 HP', '+50 HP', 'Full HP'
    let healAmt = 0;
    const fullHeal = item.stats.some(s => s === 'Full HP');
    if (fullHeal) {
      healAmt = 9999; // signal to heal to max
    } else {
      for (const s of item.stats) {
        const m = s.match(/\+(\d+)\s*HP/i);
        if (m) { healAmt = parseInt(m[1], 10); break; }
      }
    }
    this.coins -= item.price;
    this._updateHUD();
    this._renderShop();
    this.onHeal?.(healAmt, item, fullHeal);
    this._toast(`${item.icon} ${item.name} — restored ${fullHeal ? 'full' : healAmt} HP!`, 'success');
  }

  _sell(id) {
    const idx = this.inventory.findIndex(i => i.id === id);
    if (idx < 0) return;
    const item = this.inventory[idx];
    const gain = Math.floor(item.price * 0.5);
    this.coins += gain;
    this.inventory.splice(idx, 1);
    this._updateHUD(); this._renderShop(); this._renderInventory();
    this._toast(`Sold ${item.name} for ${gain} rubies.`);
  }

  _findItem(id) {
    for (const cat of Object.values(SHOP_DATA)) {
      const f = cat.find(x => x.id === id);
      if (f) return f;
    }
    return null;
  }

  _renderInventory() {
    this.badge.textContent   = this.inventory.length;
    this.badge.style.display = this.inventory.length ? 'inline' : 'none';
    if (!this.inventory.length) {
      this.invList.innerHTML = '<p class="mp-inv-empty">Thy satchel is empty, sailor.</p>';
      return;
    }
    this.invList.innerHTML = this.inventory.map(item => `
      <div class="mp-inv-item">
        <div class="mp-inv-icon">${item.icon}</div>
        <div><div class="mp-inv-name">${item.name}</div><div class="mp-inv-meta">${item.rarity} · ${item.stats[0] || ''}</div></div>
      </div>
    `).join('');
  }

  _toggleInv() { this.invPanel.classList.toggle('open'); }

  _toast(msg, type = '') {
    this.toast.textContent = msg;
    this.toast.className   = 'mp-toast show' + (type ? ` t-${type}` : '');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      this.toast.className = 'mp-toast' + (type ? ` t-${type}` : '');
    }, 2400);
  }

  destroy() {
    if (this.overlay?.parentNode) this.overlay.remove();
    this.onClose?.();
  }

  getInventory() { return [...this.inventory]; }
  getRubies()    { return this.coins; }
}


class WorldEnemy {
  constructor(enemyType, logicalX, logicalY, container) {
    this.type     = enemyType;
    this.defeated = false;
    this.logicalX = logicalX;
    this.logicalY = logicalY;
    this._container = container;

    this.el = document.createElement('div');
    this.el.className = 'world-enemy';
    this.el.innerHTML = `
      <div class="world-enemy-icon">${enemyType.icon}</div>
      <div class="world-enemy-label">${enemyType.name}</div>
      <div class="world-enemy-hpbar"><div class="world-enemy-hpfill" style="width:100%"></div></div>
      <div class="world-enemy-action"></div>
    `;
    this.hintEl = this.el.querySelector('.world-enemy-action');

    document.body.appendChild(this.el);
    this._syncPosition();
  }

  _syncPosition() {
    const rect    = this._container.getBoundingClientRect();
    const screenX = rect.left + this.logicalX;
    const screenY = rect.top  + this.logicalY;
    this.el.style.left = screenX + 'px';
    this.el.style.top  = screenY + 'px';
  }

  syncPosition() { this._syncPosition(); }

  markDefeated() {
    this.defeated = true;
    this.hideHint();
    this.el.classList.add('defeated');
    setTimeout(() => this.el.remove(), 400);
  }

  showHint(text) {
    if (!this.hintEl) return;
    this.hintEl.textContent = text;
    this.el.classList.add('has-hint');
  }

  hideHint() {
    if (!this.hintEl) return;
    this.el.classList.remove('has-hint');
  }

  remove() { this.el?.remove(); }
}

class MarketPirateGame {
  constructor(gameEnv) {
    this.gameEnv = gameEnv;

    const width  = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;
    const path   = gameEnv.path;

    this.classes = [
      { class: GameEnvBackground, data: {
        name: 'marketplace',
        src: path + '/images/MarketPlaceRPG.png',
        pixels: { height: 580, width: 1038 }
      }},
      { class: Player, data: {
        id: 'McArchie',
        src: path + '/images/gamebuilder/sprites/mcarchie.png',
        SCALE_FACTOR: 8, STEP_FACTOR: 1000, ANIMATION_RATE: 30,
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
      }},
    ];

    this._shopZoneRatios = { x: 0.38, y: 0.30, w: 0.24, h: 0.40 };
    this.shopZone        = this._computeShopZone();

    this._bagInventory  = [];
    this._totalRubies   = 0;
    this._bankedRubies  = 0;
    this._battleOpen    = false;
    this._battleUI      = null;
    this._worldEnemies  = [];
    this._nearbyEnemy   = null;
    this._open          = false;
    this._ui            = null;

    // ── Persistent player HP ──────────────────────────────────────────────
    this._playerMaxHp  = 80;
    this._playerCurHp  = 80;

    if (!document.getElementById('battle-style')) {
      const s = document.createElement('style');
      s.id = 'battle-style';
      s.textContent = BATTLE_CSS;
      document.head.appendChild(s);
    }

    // ── World health bar (top-left HUD) ───────────────────────────────────
    this.healthBarEl = document.createElement('div');
    this.healthBarEl.id = 'world-health-hud';
    this.healthBarEl.innerHTML = `
      <div style="font-family:'Cinzel Decorative',cursive;color:#e8a020;font-size:10px;letter-spacing:1px;margin-bottom:5px;">⚔ McArchie</div>
      <div style="background:rgba(0,0,0,.55);border:1.5px solid rgba(80,200,80,.25);border-radius:7px;height:15px;width:170px;overflow:hidden;">
        <div id="world-hp-fill" style="height:100%;width:100%;background:linear-gradient(90deg,#20a050,#40e080);border-radius:6px;transition:width .45s ease,background .45s ease;"></div>
      </div>
      <div id="world-hp-text" style="font-family:'Cinzel Decorative',cursive;font-size:10px;color:#c8a040;margin-top:4px;text-align:right;">80 / 80</div>
    `;
    Object.assign(this.healthBarEl.style, {
      position:     'fixed',
      bottom:       '28px',
      left:         '16px',
      padding:      '10px 16px',
      background:   'rgba(0,0,0,.75)',
      border:       '1.5px solid #7a3a08',
      borderRadius: '10px',
      zIndex:       '9990',
      display:      'block',
      boxShadow:    '0 0 18px rgba(180,80,10,.2)',
    });
    document.body.appendChild(this.healthBarEl);

    // ── Hint bar ──────────────────────────────────────────────────────────
    this.hintEl = document.createElement('div');
    Object.assign(this.hintEl.style, {
      position:     'fixed',
      bottom:       '28px',
      left:         '50%',
      transform:    'translateX(-50%)',
      padding:      '9px 18px',
      background:   'rgba(0,0,0,.76)',
      color:        '#ffd',
      fontFamily:   '"Cinzel Decorative",Courier,monospace',
      fontSize:     '13px',
      border:       '1.5px solid #c08030',
      borderRadius: '7px',
      zIndex:       '9999',
      display:      'none',
      letterSpacing:'1px',
    });
    document.body.appendChild(this.hintEl);

    this._keyHandler = (e) => {
      if (e.key !== 'e' && e.key !== 'E') return;
      if (this._battleOpen || this._open) return;
      if (this._nearbyEnemy) {
        this._startBattle(this._nearbyEnemy);
      } else {
        const player = this.gameEnv.gameObjects?.find(o => o instanceof Player);
        if (player && this._playerInZone(player)) this._openShop();
      }
    };
    window.addEventListener('keydown', this._keyHandler);

    this._spawnEnemies(8);

    this._respawnTimer = setInterval(() => {
      this._worldEnemies = this._worldEnemies.filter(e => !e.defeated);
      if (this._worldEnemies.length < 4) this._spawnEnemies(3);
    }, 25000);
  }

  // ── helpers ──────────────────────────────────────────────────────────────

  _computeShopZone() {
    const w  = this.gameEnv.innerWidth;
    const h  = this.gameEnv.innerHeight;
    const rz = this._shopZoneRatios;
    return { x: w * rz.x, y: h * rz.y, width: w * rz.w, height: h * rz.h };
  }

  _getContainer() {
    return this.gameEnv.canvas
      || document.getElementById('gameCanvas')
      || this.gameEnv.gameContainer
      || document.getElementById('gameContainer')
      || document.body;
  }

  _randomEnemyType() {
    const pool    = [];
    const weights = { common: 50, uncommon: 30, rare: 13, epic: 7 };
    ENEMY_TYPES.forEach(e => {
      const w = weights[e.rarity] || 10;
      for (let i = 0; i < w; i++) pool.push(e);
    });
    return pool[Math.floor(Math.random() * pool.length)];
  }

  _spawnEnemies(n) {
    const container = this._getContainer();
    const rect      = container.getBoundingClientRect();
    const width     = rect.width  || this.gameEnv.innerWidth;
    const height    = rect.height || this.gameEnv.innerHeight;
    const margin    = 80;
    const shopCx    = this.shopZone.x + this.shopZone.width  / 2;
    const shopCy    = this.shopZone.y + this.shopZone.height / 2;

    for (let i = 0; i < n; i++) {
      let lx, ly, tries = 0;
      do {
        lx = margin + Math.random() * Math.max(0, width  - margin * 2);
        ly = margin + Math.random() * Math.max(0, height - margin * 2);
        tries++;
      } while (Math.hypot(lx - shopCx, ly - shopCy) < 130 && tries < 25);

      this._worldEnemies.push(
        new WorldEnemy(this._randomEnemyType(), lx, ly, container)
      );
    }
  }

  _playerLogicalPos() {
    const player = this.gameEnv.gameObjects?.find(o => o instanceof Player);
    if (!player?.position) return null;
    return {
      x: player.position.x + (player.width  || 0) * 0.5,
      y: player.position.y + (player.height || 0) * 0.8,
    };
  }

  _findNearbyEnemy(threshold = 120) {
    const pos = this._playerLogicalPos();
    if (!pos) return null;
    let closest = null, best = threshold;
    for (const e of this._worldEnemies) {
      if (e.defeated) continue;
      const dist = Math.hypot(pos.x - e.logicalX, pos.y - e.logicalY);
      if (dist < best) { best = dist; closest = e; }
    }
    return closest;
  }

  // ── Persistent HP helpers ─────────────────────────────────────────────────

  _updateWorldHP() {
    const fill = document.getElementById('world-hp-fill');
    const text = document.getElementById('world-hp-text');
    if (!fill || !text) return;
    const pct = Math.max(0, (this._playerCurHp / this._playerMaxHp) * 100);
    fill.style.width = pct + '%';
    if (pct > 50) {
      fill.style.background = 'linear-gradient(90deg,#20a050,#40e080)';
    } else if (pct > 25) {
      fill.style.background = 'linear-gradient(90deg,#a08020,#e0c030)';
    } else {
      fill.style.background = 'linear-gradient(90deg,#a02020,#e05030)';
    }
    text.textContent = `${Math.max(0, this._playerCurHp)} / ${this._playerMaxHp}`;
  }

  // ── Battle ────────────────────────────────────────────────────────────────

  _startBattle(worldEnemy) {
    if (this._battleOpen) return;
    this._battleOpen  = true;
    this._nearbyEnemy = null;
    this._worldEnemies.forEach(e => e.hideHint());

    this._battleUI = new BattleUI(
      worldEnemy.type,
      (rubyReward, wasDefeated, remainingHp) => {
        this._battleOpen = false;
        this._battleUI   = null;

        if (wasDefeated) {
          // Full game over — show screen then wipe all progress
          this._showGameOver();
        } else {
          this._playerCurHp = Math.max(1, remainingHp);
          this._updateWorldHP();
          if (rubyReward > 0) {
            worldEnemy.markDefeated();
            this._killCount = (this._killCount || 0) + 1;
            if (this._ui) this._ui.addRuby(rubyReward);
            else          this._bankedRubies += rubyReward;
          }
        }
      },
      this._playerCurHp
    );
  }

  _playerInZone(player) {
    if (!player?.position) return false;
    const px = player.position.x + (player.width  || 0) * 0.5;
    const py = player.position.y + (player.height || 0) * 0.5;
    return (
      px > this.shopZone.x &&
      px < this.shopZone.x + this.shopZone.width  &&
      py > this.shopZone.y &&
      py < this.shopZone.y + this.shopZone.height
    );
  }

  _openShop() {
    if (this._open) return;
    const player = this.gameEnv.gameObjects?.find(o => o instanceof Player);
    if (!player || !this._playerInZone(player)) return;
    this._open = true;

    const startingRubies = this._totalRubies + this._bankedRubies;
    this._bankedRubies   = 0;

    this._ui = new MarketplaceUI(
      this.gameEnv.path,
      () => {
        this._bagInventory = this._ui.getInventory();
        this._totalRubies  = this._ui.getRubies();
        this._open = false;
        this._ui   = null;
      },
      this._bagInventory,
      startingRubies,
      (healAmt, item, fullHeal) => this._healPlayer(healAmt, fullHeal)
    );
  }

  _healPlayer(healAmt, fullHeal = false) {
    if (fullHeal) {
      this._playerCurHp = this._playerMaxHp;
    } else {
      this._playerCurHp = Math.min(this._playerMaxHp, this._playerCurHp + healAmt);
    }
    this._updateWorldHP();
  }

  _showGameOver() {
    // Close any open UI first
    if (this._ui) { this._ui.destroy(); this._ui = null; }

    const rubiesEarned = this._totalRubies + this._bankedRubies;
    const kills        = this._killCount || 0;

    const overlay = document.createElement('div');
    overlay.id = 'gameover-overlay';
    overlay.innerHTML = `
      <div id="gameover-panel">
        <div id="gameover-skull">💀</div>
        <div id="gameover-title">GAME OVER</div>
        <div id="gameover-sub">
          The seas claimed another soul...<br>
          Ye fought bravely, but death waits for all pirates.
        </div>
        <div id="gameover-stats">
          <div class="go-stat">
            <div class="go-stat-val">${kills}</div>
            <div class="go-stat-lbl">Enemies Slain</div>
          </div>
          <div class="go-stat">
            <div class="go-stat-val">💎 ${rubiesEarned}</div>
            <div class="go-stat-lbl">Rubies Earned</div>
          </div>
        </div>
        <button id="gameover-btn">⚓ Try Again</button>
      </div>
    `;
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('show'));
    });

    document.getElementById('gameover-btn').addEventListener('click', () => {
      overlay.remove();
      this._hardReset();
    });
  }

  _hardReset() {
    // Wipe all progress — rubies, inventory, HP, enemies, kill count
    this._playerCurHp  = this._playerMaxHp;
    this._totalRubies  = 0;
    this._bankedRubies = 0;
    this._bagInventory = [];
    this._killCount    = 0;
    this._updateWorldHP();

    // Clear all existing enemies and respawn fresh
    const existing = [...this._worldEnemies];
    this._worldEnemies = [];
    existing.forEach(e => e.remove());
    this._spawnEnemies(8);
  }

  // ── game-loop callbacks ───────────────────────────────────────────────────

  update() {
    if (!this.gameEnv?.gameObjects) return;
    const player = this.gameEnv.gameObjects.find(o => o instanceof Player);
    if (!player) return;

    if (this._open || this._battleOpen) {
      this.hintEl.style.display = 'none';
      this._worldEnemies.forEach(e => e.hideHint());
      return;
    }

    const nearby      = this._findNearbyEnemy(120);
    this._nearbyEnemy = nearby;

    this._worldEnemies.forEach(e => e.hideHint());

    if (nearby) {
      nearby.showHint(`⚔ Fight ${nearby.type.name} — press E`);
      this.hintEl.style.display = 'none';
    } else if (this._playerInZone(player)) {
      this.hintEl.textContent   = '⚓ Enter the market — press E to shop';
      this.hintEl.style.display = 'block';
    } else {
      this.hintEl.style.display = 'none';
    }
  }

  draw() {}

  resize() {
    this.shopZone = this._computeShopZone();
    const container = this._getContainer();
    this._worldEnemies.forEach(e => {
      e._container = container;
      e.syncPosition();
    });
  }

  destroy() {
    window.removeEventListener('keydown', this._keyHandler);
    if (this._respawnTimer != null) clearInterval(this._respawnTimer);
    const enemies = [...this._worldEnemies];
    this._worldEnemies = [];
    enemies.forEach(e => e.remove());
    if (this._battleUI)                this._battleUI.destroy();
    if (this.hintEl?.parentNode)       this.hintEl.remove();
    if (this.healthBarEl?.parentNode)  this.healthBarEl.remove();
    if (this._ui)                      this._ui.destroy();
    document.getElementById('gameover-overlay')?.remove();
  }
}

export default MarketPirateGame;