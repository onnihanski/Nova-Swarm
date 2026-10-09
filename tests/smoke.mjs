// Nova Swarm smoke test: a bot plays the game in headless Chromium through every mode, and the run fails on any page error or on a
// scenario that doesn't reach its goal. The game stays one file with no build step; this folder exists only for the test.
//
//   cd tests && npm ci && npx playwright install chromium && npm test
//   npm test -- tutorial rush     runs only the scenarios named
//
// A tiny local server hands out the page at a loopback address, a secure context like GitHub Pages, and each scenario gets a fresh
// browser profile, so it starts from an empty save. Google Fonts is stubbed and every other outside request is refused: the game must work offline.
// Online versus and co-op link two pages through a local PeerJS server (the `peer` package), never the public one.
import { chromium } from 'playwright';
import { PeerServer } from 'peer';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(here, 'out');
const PAGE_PORT = 9136, ORIGIN = `http://127.0.0.1:${PAGE_PORT}/`;
const PEER_PORT = 9137;
const only = process.argv.slice(2);

// The bot runs inside the game's script, so the test hooks into two lines of index.html. If either changes, update it here.
const HOOKS = {
  boot: 'window.claude?.hot?.ready ? window.claude.hot.ready(start)',
  frame: "if (state === 'play' || state === 'over' || state === 'entry') update(dt);"
};
function instrument(html) {
  for (const [k, line] of Object.entries(HOOKS)) if (!html.includes(line)) throw new Error(`index.html no longer has the ${k} line the smoke test hooks into:\n  ${line}\nUpdate HOOKS in tests/smoke.mjs.`);
  const bot = fs.readFileSync(path.join(here, 'bot.js'), 'utf8');
  return html
    .replace(HOOKS.boot, bot + '\n' + HOOKS.boot)
    // while flying, run the game's update several times per frame: the same game, sped up
    .replace(HOOKS.frame, "if (state === 'play' || state === 'over' || state === 'entry') { const reps = state === 'play' ? Math.max(1, window.__ns.speed | 0) : 1; for (let k = 0; k < reps && (state === 'play' || state === 'over' || state === 'entry'); k++) update(dt); }");
}
const GAME = fs.readFileSync(path.join(here, '..', 'index.html'), 'utf8');
const PAGE = instrument(GAME);
const PEERJS = fs.readFileSync(path.join(here, 'node_modules', 'peerjs', 'dist', 'peerjs.min.js'), 'utf8');

class Fail extends Error {}
const check = (ok, msg) => { if (!ok) throw new Fail(msg); };

/* ---- pages ---- */
// A fresh profile with the game loaded. seen: whether the tutorial counts as answered (most scenarios skip the offer).
async function open(browser, { seen = true, storage = {}, viewport = { width: 900, height: 900 }, touch = false, online = false } = {}) {
  const ctx = await browser.newContext({ viewport, hasTouch: touch, isMobile: touch });
  const errors = [];
  await ctx.addInitScript(({ seen, storage }) => {
    try {
      if (seen) localStorage.setItem('nova-swarm-tutorial-v1', JSON.stringify({ seen: true }));
      for (const [k, v] of Object.entries(storage)) localStorage.setItem(k, JSON.stringify(v));
    } catch (e) { /* storage blocked */ }
  }, { seen, storage });
  if (online) {
    // PeerJS is preloaded, so the game skips its CDN; every Peer the game makes talks to the local server, with no STUN.
    await ctx.addInitScript({ content: PEERJS });
    await ctx.addInitScript(port => {
      const Real = window.Peer, local = { host: '127.0.0.1', port, path: '/', secure: false, config: { iceServers: [] } };
      window.Peer = class extends Real {
        constructor(id, opts) { if (typeof id === 'string') super(id, { ...opts, ...local }); else super({ ...id, ...local }); }
      };
    }, PEER_PORT);
  }
  await ctx.route('**/*', route => {
    const url = route.request().url();
    if (/^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(url)) return route.fulfill({ contentType: 'text/css', body: '' });
    if (url === ORIGIN || url.startsWith('data:') || (online && url.startsWith(`http://127.0.0.1:${PEER_PORT}/`))) return route.continue();
    errors.push('unexpected request: ' + url);
    return route.abort();
  });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push('page error: ' + e.message + '\n' + String(e.stack || '').split('\n').slice(1, 4).join('\n')));
  page.on('console', m => { if (m.type() === 'error') errors.push('console error: ' + m.text()); });
  await page.goto(ORIGIN);
  await page.waitForFunction(() => window.__ns && window.__ns.state === 'title', null, { timeout: 15000 });
  return { ctx, page, errors };
}
const ns = (page, fn, arg) => page.evaluate(fn, arg);
const set = (page, opts) => ns(page, o => Object.assign(window.__ns, o), opts);
const snap = page => ns(page, () => { const n = window.__ns; return { state: n.state, wave: n.G.wave, lives: n.G.lives, score: n.G.score, region: n.G.region }; });
// Wait for a condition inside the page, polling; a timeout names what was awaited and where the game was.
async function until(page, fn, arg, { secs = 60, what = 'the condition' } = {}) {
  try { await page.waitForFunction(fn, arg, { timeout: secs * 1000, polling: 250 }); }
  catch (e) { throw new Fail(`timed out after ${secs}s waiting for ${what} (game: ${JSON.stringify(await snap(page).catch(() => ({})))})`); }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function key(page, code, hold = 40) { await page.keyboard.down(code); await sleep(hold); await page.keyboard.up(code); }
// Chart a region and set course for it, as the star map would.
const course = (page, id) => ns(page, id => { const n = window.__ns; n.regions.charted[id] = 1; n.regions.sel = id; }, id);

/* ---- scenarios ---- */
const SCENARIOS = {
  // The title and every menu reachable from it open and close cleanly; a fresh save waits to offer the tutorial.
  async boot({ browser, use }) {
    const { page } = await use(open(browser, { seen: false }));
    check(await page.isVisible('#ovTitle'), 'the title screen is not showing');
    check((await ns(page, () => localStorage.getItem('nova-swarm-tutorial-v1'))) === '{"seen":false}', 'a fresh save should wait to offer the tutorial');
    for (const [k, st] of [['KeyH', 'hangar'], ['KeyG', 'map'], ['KeyR', 'records']]) {
      await key(page, k);
      await until(page, s => window.__ns.state === s, st, { secs: 5, what: 'the ' + st + ' screen' });
      await sleep(400);
      await key(page, 'Escape');
      await until(page, () => window.__ns.state === 'title', null, { secs: 5, what: 'the title after ' + st });
    }
    await key(page, 'KeyO');
    await page.waitForSelector('#ovOptions', { state: 'visible', timeout: 5000 });
    await sleep(300);
    await key(page, 'Escape');
    await page.waitForSelector('#ovTitle', { state: 'visible', timeout: 5000 });
    return 'title, hangar, map, records and options';
  },

  // Yes to the offer: the tips follow the run, from the controls through the first boss, then the tutorial ends.
  async tutorial({ browser, use }) {
    const { page } = await use(open(browser, { seen: false }));
    await key(page, 'Space');
    await until(page, () => window.__ns.state === 'tutor', null, { secs: 5, what: 'the tutorial offer' });
    check(await page.isVisible('#ovTutor'), 'the tutorial offer is not showing');
    const wave = await ns(page, () => window.__ns.G.phase);
    await sleep(800);
    check((await ns(page, () => window.__ns.G.phase)) === wave && wave === 'intro', 'wave 1 should wait while the offer is up');
    await key(page, 'KeyY');
    await until(page, () => window.__ns.state === 'play' && window.__ns.tut.on, null, { secs: 5, what: 'the tutorial to start' });
    check((await ns(page, () => localStorage.getItem('nova-swarm-tutorial-v1'))) === '{"seen":true}', 'the answer should be saved');
    await until(page, () => !document.getElementById('tutBox').hidden, null, { secs: 5, what: 'the first tip' });
    check((await page.textContent('#tutSr')).startsWith('MOVE WITH WASD'), 'the first tip should teach moving with the keyboard');
    await set(page, { god: true, speed: 4 });
    await until(page, () => ['move', 'fire', 'dive', 'charge'].every(k => window.__ns.tut.done[k]), null, { secs: 120, what: 'the four control tips' });
    await until(page, () => !window.__ns.tut.on, null, { secs: 240, what: 'the tutorial to finish after the first boss' });
    const t = await ns(page, () => ({ shown: Object.keys(window.__ns.tut.shown), wave: window.__ns.G.wave }));
    check(t.shown.includes('boss') && t.shown.includes('end'), 'the boss and closing tips should have shown, got ' + t.shown.join(' '));
    return `${t.shown.length} tips by wave ${t.wave}: ${t.shown.join(', ')}`;
  },

  // No to the offer: one line on how to get it back, no tips, no second offer; the options row brings the offer back.
  async tutorialNo({ browser, use }) {
    const { page } = await use(open(browser, { seen: false }));
    await key(page, 'Space');
    await until(page, () => window.__ns.state === 'tutor', null, { secs: 5, what: 'the tutorial offer' });
    await sleep(500);
    await key(page, 'KeyN');
    await until(page, () => !document.getElementById('tutBox').hidden, null, { secs: 5, what: 'the closing line' });
    check((await page.textContent('#tutSr')).startsWith('NO PROBLEM'), 'declining should show how to get the tutorial back');
    await until(page, () => !window.__ns.tut.on, null, { secs: 15, what: 'the closing line to go' });
    await key(page, 'KeyP');
    await until(page, () => window.__ns.state === 'paused', null, { secs: 5, what: 'the pause screen' });
    check(!(await page.isVisible('#tutSkipBtn')), 'the pause screen should not offer to skip a tutorial that is off');
    await key(page, 'KeyQ');
    await until(page, () => window.__ns.state === 'title', null, { secs: 5, what: 'the title after quitting' });
    await key(page, 'Space');
    await sleep(600);
    check((await ns(page, () => window.__ns.state)) === 'play', 'the second run should not ask again');
    await key(page, 'KeyP'); await sleep(200); await key(page, 'KeyQ');
    await until(page, () => window.__ns.state === 'title', null, { secs: 5, what: 'the title' });
    await key(page, 'KeyO');
    await page.waitForSelector('#ovOptions', { state: 'visible', timeout: 5000 });
    const row = page.locator('.opt-row[data-k="tutorial"]');
    check((await row.locator('.opt-v').textContent()) === 'OFF', 'the options row should read OFF');
    await row.locator('.opt-next').click();
    check((await row.locator('.opt-v').textContent()) === 'ASK NEXT RUN', 'the options row should switch to ASK NEXT RUN');
    await key(page, 'Escape');
    await page.waitForSelector('#ovTitle', { state: 'visible', timeout: 5000 });
    await sleep(300);
    await key(page, 'Space');
    await until(page, () => window.__ns.state === 'tutor', null, { secs: 5, what: 'the offer again after the options row' });
    return 'declined, no repeat offer, options row asks again';
  },

  // A save from before the tutorial existed has flown already, so it is never offered.
  async oldSave({ browser, use }) {
    const { page } = await use(open(browser, { seen: false, storage: { 'nova-swarm-scores-v1': [{ name: 'OLD', score: 123456, wave: 9 }] } }));
    check((await ns(page, () => localStorage.getItem('nova-swarm-tutorial-v1'))) === '{"seen":true}', 'an existing save should count as having answered');
    await key(page, 'Space');
    await sleep(600);
    check((await ns(page, () => window.__ns.state)) === 'play', 'an existing pilot should go straight into the run');
    return 'existing pilots skip the offer';
  },

  // A real run, ships and all: play until game over, then the prize wheel, initials and back to the title.
  async run({ browser, use }) {
    const { page } = await use(open(browser));
    await set(page, { speed: 6 });
    await key(page, 'Space');
    await until(page, () => window.__ns.states.includes('over'), null, { secs: 240, what: 'game over' });
    await until(page, () => window.__ns.state === 'title', null, { secs: 30, what: 'the wheel and initials to finish' });
    const r = await ns(page, () => ({ wave: window.__ns.maxWave, score: window.__ns.G.score, states: window.__ns.states, table: JSON.parse(localStorage.getItem('nova-swarm-scores-v1') || '[]') }));
    check(r.states.includes('wheel'), 'the prize wheel should follow a game over');
    check(r.table.some(s => s.score === r.score), 'the score should be in the top-10 table');
    return `game over on wave ${r.wave} with ${r.score} points`;
  },

  // Deep into Sector 9: three bosses, convoys, bonus stages, the salvage draft and the elite swarm.
  async deep({ browser, use }) {
    const { page } = await use(open(browser));
    await set(page, { god: true, speed: 8 });
    await key(page, 'Space');
    await until(page, () => window.__ns.maxWave >= 16, null, { secs: 300, what: 'wave 16' });
    const r = await ns(page, () => ({ bosses: window.__ns.bosses, drafts: window.__ns.drafts, convoys: window.__ns.convoys, bonus: window.__ns.bonus, charges: window.__ns.charges, events: window.__ns.events, perks: Object.keys(window.__ns.G.perks).length }));
    for (const b of ['HIVE QUEEN', 'IRON MAW', 'MOTHERSHIP']) check(r.bosses.includes(b), b + ' never appeared (saw ' + r.bosses.join(', ') + ')');
    check(r.drafts >= 3, 'expected at least 3 salvage drafts, got ' + r.drafts);
    check(r.convoys >= 7, 'no convoy wave was seen');
    check(r.bonus >= 4, 'no challenging stage was seen');
    check(r.charges > 0, 'no charge shot was fired');
    return `wave 16: ${r.bosses.length} bosses, ${r.drafts} drafts, ${r.perks} perks, events ${r.events.join(' ') || 'none'}`;
  },

  // The Hive Heart: the Hive Mind falls and the ending plays.
  async hive({ browser, use }) {
    const { page } = await use(open(browser));
    await course(page, 'hive');
    await set(page, { god: true, speed: 8 });
    await key(page, 'Space');
    await until(page, () => window.__ns.hive.seen, null, { secs: 240, what: 'the Hive Mind to fall' });
    await until(page, () => window.__ns.states.includes('ending') && window.__ns.state === 'play', null, { secs: 60, what: 'the ending to play and the run to go on' });
    return 'Hive Mind destroyed, ending played, run went on';
  },

  // Boss Rush: every boss back to back, with the pit stops.
  async rush({ browser, use }) {
    const { page } = await use(open(browser));
    await set(page, { god: true, speed: 8 });
    await key(page, 'KeyB');
    await until(page, () => window.__ns.state === 'rushend', null, { secs: 240, what: 'the rush results' });
    const r = await ns(page, () => ({ won: window.__ns.rush.won, n: window.__ns.rush.fights.length, pit: window.__ns.states.includes('pit') }));
    check(r.won === r.n, `won ${r.won} of ${r.n} fights`);
    check(r.pit, 'no pit stop was seen');
    return `cleared ${r.won} fights`;
  },

  // The daily challenge, in the day's region.
  async daily({ browser, use }) {
    const { page } = await use(open(browser));
    await set(page, { god: true, speed: 8 });
    await key(page, 'KeyC');
    await until(page, () => window.__ns.maxWave >= 4, null, { secs: 180, what: 'wave 4 of the daily' });
    const r = await ns(page, () => ({ day: window.__ns.daily, region: window.__ns.G.region }));
    check(!!r.day, 'the run should be a daily challenge');
    return `${r.day} in ${r.region}`;
  },

  // The Prism Rift: shifting colors and an event in most waves.
  async prism({ browser, use }) {
    const { page } = await use(open(browser));
    await course(page, 'prism');
    await set(page, { god: true, speed: 8 });
    await key(page, 'Space');
    await until(page, () => window.__ns.maxWave >= 8, null, { secs: 200, what: 'wave 8 in the Prism Rift' });
    return 'events: ' + (await ns(page, () => window.__ns.events.join(' ')));
  },

  // A phone held upright: no sideways scrolling, and the offer and first tip use touch words and fit the screen.
  async phone({ browser, use }) {
    const { page } = await use(open(browser, { seen: false, viewport: { width: 390, height: 844 }, touch: true }));
    const wide = await ns(page, () => document.documentElement.scrollWidth - innerWidth);
    check(wide <= 0, 'the page scrolls sideways by ' + wide + 'px');
    await page.tap('#startBtn');
    await until(page, () => window.__ns.state === 'tutor', null, { secs: 5, what: 'the tutorial offer' });
    await sleep(500);
    await page.tap('#tutYes');
    await until(page, () => !document.getElementById('tutBox').hidden, null, { secs: 5, what: 'the first tip' });
    check((await page.textContent('#tutSr')).startsWith('DRAG ANYWHERE'), 'the first tip should use touch words');
    const fit = await ns(page, () => { const b = document.getElementById('tutBox').getBoundingClientRect(), s = document.getElementById('screen').getBoundingClientRect(); return b.left >= s.left && b.right <= s.right; });
    check(fit, 'the tip box spills out of the screen');
    await page.tap('#tutX');
    check(!(await ns(page, () => window.__ns.tut.on)), 'SKIP should end the tutorial');
    return 'touch offer, touch tip, SKIP';
  },

  // Online versus: host a room, join it by code, fly the same waves, then the host forfeits.
  async versus({ browser, use }) { return online(browser, use, 'versus'); },
  // Online co-op: the same link, lockstep waves, then one pilot leaves and the other flies on solo.
  async coop({ browser, use }) { return online(browser, use, 'coop'); }
};

async function online(browser, use, mode) {
  const a = await use(open(browser, { online: true })), b = await use(open(browser, { online: true }));
  const lobby = mode === 'coop' ? 'KeyT' : 'KeyV';
  await key(a.page, lobby);
  await until(a.page, () => window.__ns.state === 'versus', null, { secs: 5, what: 'the host lobby' });
  await sleep(400);
  await a.page.click('#vsHost');
  await until(a.page, () => /^[A-Z0-9]{4}$/.test(document.getElementById('vsRoomCode').textContent) && window.__ns.vs.peer && window.__ns.vs.peer.open, null, { secs: 20, what: 'a room code' });
  const code = await a.page.textContent('#vsRoomCode');
  await key(b.page, 'KeyV');   // the guest takes the host's mode, whichever lobby it joins from
  await until(b.page, () => window.__ns.state === 'versus', null, { secs: 5, what: 'the guest lobby' });
  await sleep(400);
  await b.page.fill('#vsCode', code);
  await b.page.click('#vsJoin');
  for (const p of [a.page, b.page]) await until(p, () => window.__ns.state === 'play' && window.__ns.vs.on, null, { secs: 30, what: 'the match to start' });
  const deal = await Promise.all([a.page, b.page].map(p => ns(p, () => ({ mode: window.__ns.vs.mode, seed: window.__ns.vs.seed, region: window.__ns.vs.region }))));
  check(deal[0].mode === mode && deal[1].mode === mode, 'both pilots should be in ' + mode + ', got ' + deal.map(d => d.mode).join(' / '));
  check(deal[0].seed === deal[1].seed && deal[0].region === deal[1].region, 'both pilots should fly the same seeded waves');
  for (const p of [a.page, b.page]) await set(p, { god: true, speed: 3 });
  for (const p of [a.page, b.page]) await until(p, () => window.__ns.vs.rival.score > 0 && window.__ns.G.wave >= 2, null, { secs: 120, what: 'wave 2 with the rival\'s score coming in' });
  await set(a.page, { god: false });
  await key(a.page, 'KeyP');
  await until(a.page, () => window.__ns.state === 'paused', null, { secs: 5, what: 'the host\'s pause screen' });
  await key(a.page, 'KeyQ');
  if (mode === 'versus') {
    for (const p of [a.page, b.page]) await until(p, () => window.__ns.state === 'vsover', null, { secs: 20, what: 'the result screen' });
    const res = await Promise.all([a.page, b.page].map(p => ns(p, () => window.__ns.vs.result)));
    check(res[0] === 'lose' && res[1] === 'win', 'a forfeit should lose for the host and win for the guest, got ' + res.join(' / '));
    return `room ${code}: same waves in ${deal[0].region}, forfeit decided it`;
  }
  await until(b.page, () => window.__ns.co.solo && window.__ns.state === 'play', null, { secs: 20, what: 'the wingmate to fly on solo' });
  await until(a.page, () => window.__ns.state === 'vsover', null, { secs: 20, what: 'the host\'s result screen' });
  return `room ${code}: lockstep waves in ${deal[0].region}, wingmate flew on solo`;
}

/* ---- running ---- */
async function main() {
  const names = only.length ? only : Object.keys(SCENARIOS);
  for (const n of names) if (!SCENARIOS[n]) { console.error('no scenario named ' + n + '. Scenarios: ' + Object.keys(SCENARIOS).join(', ')); process.exit(2); }
  fs.mkdirSync(OUT, { recursive: true });
  const sri = /VS_SRI = '([^']+)'/.exec(GAME)[1], lib = 'sha384-' + crypto.createHash('sha384').update(fs.readFileSync(path.join(here, 'node_modules', 'peerjs', 'dist', 'peerjs.min.js'))).digest('base64');
  let failed = sri === lib ? 0 : 1;
  console.log((sri === lib ? 'ok  ' : 'FAIL') + '  peerjs-sri  ' + (sri === lib ? 'the page\'s integrity hash matches PeerJS ' + JSON.parse(fs.readFileSync(path.join(here, 'node_modules', 'peerjs', 'package.json'))).version : 'VS_SRI in index.html does not match the PeerJS release: ' + lib));
  const pageServer = http.createServer((req, res) => {
    if (req.url === '/') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }); res.end(PAGE); }
    else { res.writeHead(404); res.end(); }
  });
  await new Promise(res => pageServer.listen(PAGE_PORT, '127.0.0.1', res));
  let peerServer = null;
  if (names.includes('versus') || names.includes('coop')) peerServer = await new Promise(res => { PeerServer({ host: '127.0.0.1', port: PEER_PORT, path: '/' }, srv => res(srv)); });
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--disable-features=WebRtcHideLocalIpsWithMdns'] });
  for (const name of names) {
    const t0 = Date.now(), opened = [];
    const use = async p => { const o = await p; opened.push(o); return o; };
    let note = '', err = null;
    try { note = await SCENARIOS[name]({ browser, use }); }
    catch (e) { err = e; }
    const errors = [];
    for (const [i, o] of opened.entries()) {
      errors.push(...o.errors);
      const log = await ns(o.page, () => window.__ns.log).catch(() => []);
      errors.push(...log.map(l => 'bot: ' + l));
      if (err || o.errors.length) await o.page.screenshot({ path: path.join(OUT, name + (opened.length > 1 ? '-' + (i + 1) : '') + '.png') }).catch(() => {});
      await o.ctx.close().catch(() => {});
    }
    const secs = ((Date.now() - t0) / 1000).toFixed(1);
    if (!err && !errors.length) { console.log(`ok    ${name}  ${secs}s  ${note}`); continue; }
    failed++;
    console.log(`FAIL  ${name}  ${secs}s`);
    if (err) console.log('      ' + (err instanceof Fail ? err.message : err.stack));
    for (const e of errors.slice(0, 12)) console.log('      ' + e.replace(/\n/g, '\n      '));
  }
  await browser.close();
  if (peerServer) peerServer.close();
  pageServer.close();
  console.log(failed ? `\n${failed} check(s) failed. Screenshots are in tests/out/.` : '\nall checks passed');
  process.exit(failed ? 1 : 0);
}
main().catch(e => { console.error(e); process.exit(1); });
