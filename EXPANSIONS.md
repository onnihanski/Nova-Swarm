# Expansion plan

A snapshot of where Nova Swarm stands and the five expansions being built next. Each expansion is developed in its own session and branch, in parallel, off the same base.

**Status:** all five expansions are built, reviewed and merged into the default branch. The README describes how they play.

## Where the game stands

- **Healthy build.** `index.html` (about 4,700 lines, 240 KB) loads with no console errors, and a headless Chromium smoke test plays wave 1 cleanly. There is no build step, no dependency and no test suite; balance so far came from ad-hoc bot playtests.
- **Content.** 6 enemy types plus splitter minis, 3 bosses in rotation, challenging stages, tractor beams and twin fighters, 5 sector events, 7 power-ups, smart bombs, charge shots, combo and graze scoring, missions, a seeded daily challenge, 3 hulls, 9 regions on a star map, 268 cosmetic collectibles, and a scrap economy with optional, odds-labelled gambles.

### Gaps

1. **Input and accessibility.** Keyboard and touch only: no gamepad. Sound is a three-way toggle (on / SFX only / off) with no volume control, there is no settings screen, and motion effects follow the OS reduced-motion setting only.
2. **No destination.** The star map ends at the ninth region with no finale or ending. The 3 bosses rotate under local names, so there is no unique final fight.
3. **Thin long-term goals.** Persistent progress is almost all cosmetic collection. There are no lifetime stats or achievements; the only saved stat is bonus-stage history.
4. **Hulls differ only by stats.** The Striker, Interceptor and Bulwark change speed, fire rate and shields, but none gives the player anything new to do.
5. **Difficulty flattens.** Warden count caps at wave 9; entry speed, spawn gap and dive interval cap around wave 13; the newest enemy (the Aegis) arrives at wave 7. Only enemy fire rate keeps rising, so waves 10+ repeat the same mix while playtest runs reach waves 9 to 15.

## The five expansions

| # | Expansion | Branch | Closes gap |
| --- | --- | --- | --- |
| 1 | Controller support and an options screen | `claude/expansion-gamepad-options` | 1 |
| 2 | The Hive Heart: a finale region, final boss and ending | `claude/expansion-hive-heart` | 2 |
| 3 | Pilot record and medals | `claude/expansion-medals` | 3 |
| 4 | Hull signature abilities and a fourth hull | `claude/expansion-hull-abilities` | 4 |
| 5 | Elite swarm: late-wave enemies and squadron dives | `claude/expansion-elite-swarm` | 5 |

### 1. Controller support and an options screen

- Gamepad API with the standard mapping: stick and D-pad move, A fires (hold to auto-fire, release to charge), B bombs, Start pauses. RB is reserved for the hull ability from expansion 4.
- Every menu (title, hangar, map, debrief, wager, wheel, initials entry) works from the pad: the D-pad moves focus, A activates, B goes back.
- An options screen (title and pause): music and SFX volume, screen shake, flash intensity, high-contrast enemy shots, controller rumble. Saved in the browser; defaults follow reduced-motion.

### 2. The Hive Heart

- A tenth node on the star map, charted after the Prism Rift like every other region, with its own twist, backdrop and 30-item collectible set (298 collectibles in all).
- The **Hive Mind**, a fourth boss with three phases that echo the Queen, the Maw and the Mothership. It opens the region's boss rotation; other regions' rotations stay as they are.
- A one-time ending and credits the first time it falls, after which the run continues.

### 3. Pilot record and medals

- Lifetime stats saved in the browser: runs, time flown, kills by enemy type, bosses by kind and region, best combo, grazes, perfect stages, rescues, relics and more.
- About 30 medals in bronze, silver and gold tiers, each paying scrap once, with a few secret ones. Existing saves are credited on first load.
- A records screen from the title. Medals never change gameplay and add no album items.

### 4. Hull signature abilities and a fourth hull

- An ability meter fed by kills and grazes, fired with V (RB on a pad, a button on touch):
  - **Striker:** Overdrive (a burst of rapid spread fire).
  - **Interceptor:** Phase Dash (a short dash with brief invulnerability).
  - **Bulwark:** Barrier (a shield wall above the ship that soaks shots).
- A fourth hull, the **Lancer**, built around the charge shot, with its own beam ability.
- Tuned to about one use per wave, so abilities never trivialize bosses.

### 5. Elite swarm

- Three new enemy types for the late waves, each with clear counterplay:
  - **Phantom:** cloaks while it dives.
  - **Brood:** refills empty formation slots until it is shot.
  - **Sentry:** fires a telegraphed aimed beam.
- Coordinated squadron dives from wave 10, and gentle scaling past wave 13 with a soft cap.
- Waves 1 to 8 stay as they are.

## Working in parallel

All five branches edit the same `index.html` and `README.md`, so merges will need care:

- **Code placement.** Each expansion keeps its code in its own `/* ===== ... ===== */` section and makes small, surgical edits to shared code (the update loop, input, HUD, README).
- **Keys.** O opens options, R opens records, V fires the hull ability, and RB is the ability button on a pad.
- **Album.** Only expansion 2 changes the album total. Medals pay scrap, not collectibles.
- **Save keys.** New data uses its own versioned `nova-swarm-*-v1` key through the existing `store` helper.
