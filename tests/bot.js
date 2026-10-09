// The smoke test's autopilot. tests/smoke.mjs injects this file inside the game's script, just before boot, so it can read the game's
// own state. It is never part of the game itself. window.__ns is the test's handle: settings (god, speed, menus) and what the bot saw.
window.__ns = {
  get state() { return state; },
  get boss() { return boss; },
  get enemies() { return enemies; },
  get convoy() { return convoy; },
  get daily() { return daily; },
  get U() { return U; },
  G, player, ab, tut, vs, co, rush, hive, regions, record, pad,
  TUT_TIPS, tutShow, tutType, tutStop,   // the tip layout check renders every tip
  god: false,      // keep the ship invulnerable and topped up with lives
  speed: 1,        // game updates per frame while flying
  menus: true,     // take the safe choice on every between-wave and end-of-run screen
  maxWave: 0, bosses: [], events: [], states: [], drafts: 0, convoys: 0, bonus: 0, charges: 0, log: [],
  note(list, v) { if (v && !list.includes(v)) list.push(v); },
  tick() {
    const n = this;
    try {
      n.note(n.states, state);
      if (state === 'play') n.fly();
      else if (n.menus) n.menu();
    } catch (err) { n.log.push(state + ': ' + (err && err.message)); }
  },
  fly() {
    const n = this;
    if (n.god) { player.invuln = Math.max(player.invuln, 0.5); if (G.lives > 0 && G.lives < 3) G.lives = 3; }
    n.maxWave = Math.max(n.maxWave, G.wave);
    if (boss && boss.B) n.note(n.bosses, boss.B.name);
    if (G.event) n.note(n.events, G.event);
    if (convoy.on) n.convoys = Math.max(n.convoys, G.wave);
    if (G.bonus) n.bonus = Math.max(n.bonus, G.wave);
    if (pshots.some(s => s.pierce && !s.ally)) n.charges++;
    // hold fire, but let go for a moment every few seconds so a charge shot builds
    if (clock % 5 < 1.15) keys.delete('f'); else keys.add('f');
    // dodge the nearest shot coming down on the ship, otherwise line up under the lowest foe (or the boss)
    let tx = boss ? boss.x : player.x, low = -1, threat = null, td = 1e9;
    for (const e of enemies) if (!e.dead && e.state !== 'wait' && e.y > low) { low = e.y; tx = e.x; }
    for (const b of eshots) { const dy = player.y - b.y; if (dy > -2 && dy < 45 && Math.abs(b.x - player.x) < 9 && dy < td) { td = dy; threat = b; } }
    if (threat) tx = player.x + (threat.x < player.x ? 20 : -20);
    keys.delete('l'); keys.delete('r');
    if (tx < player.x - 2) keys.add('l'); else if (tx > player.x + 2) keys.add('r');
    if (ab.ready) useAbility();
    if (eshots.length > 14 && G.bombs > 0 && Math.random() < 0.02) useBomb();
  },
  menu() {
    const n = this;
    if (clock < (ui.readyAt || 0)) return;
    if (state === 'debrief') proceedFromDebrief();
    else if (state === 'wager') skipWager();
    else if (state === 'draft') { pickPerk(Math.floor(Math.random() * 3)); if (state !== 'draft') n.drafts++; }
    else if (state === 'hangar') closeHangar();
    else if (state === 'ending') skipEnding();
    else if (state === 'pit') rushPick(0);
    else if (state === 'over') continueFromOver();
    else if (state === 'wheel') spinWheel();
    else if (state === 'entry') saveEntry();
  }
};
setInterval(() => window.__ns.tick(), 30);
