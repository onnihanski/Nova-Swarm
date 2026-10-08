# Expansion plan

Snapshots of where Nova Swarm stands and the expansions built from them. In each round, every expansion is developed in its own session and branch, in parallel, off the same base.

## Round 2: three gameplay expansions

**Status:** all three expansions are built, reviewed and merged into the default branch. The README describes how they play.

### Where the game stands

- **Healthy build.** `index.html` (about 6,300 lines, 335 KB) loads with no console errors, and a headless Chromium smoke test clears wave 1. There is still no build step, no dependency and no test suite; balance comes from bot playtests run in each expansion's session.
- **Content.** Round 1 added controller support and an options screen, the Hive Heart finale with the Hive Mind and an ending, a pilot record with 36 medals, a signature ability for every hull plus a fourth hull (the Lancer), and the elite swarm (Phantom, Brood, Sentry, squadron dives and scaling past wave 13). That sits on challenging stages, tractor beams and twin fighters, 5 sector events, 7 power-ups, smart bombs, charge shots, combo and graze scoring, 16 missions, a seeded daily challenge, 10 regions, 298 collectibles and a scrap economy with optional, odds-labelled gambles.

#### Gaps

Round 1 closed the gaps in input, goals and content. What is left is how a run plays:

1. **Every run is built the same way.** All choices come before take-off: hull, shop upgrades, course. In flight, power-ups are random and last seconds, so the ship at wave 15 is the ship from wave 1, and two runs on the same hull feel alike.
2. **Bosses are rare and can't be practised.** Each boss comes once every five waves in a fixed rotation. A Sector 9 run meets the Mothership only at wave 15, past where many runs end, and the Hive Mind needs the Hive Heart charted. Apart from the daily variant, there is one mode.
3. **Every wave asks the same thing.** A regular wave always ends when the formation is destroyed. Sector events change the conditions (meteors, darkness, wind) but never the goal, and the challenging stage is the only other kind of stage.

### The three expansions

| # | Expansion | Branch | Closes gap |
| --- | --- | --- | --- |
| 1 | Salvage draft: perks that build your ship during a run | `claude/expansion-salvage-draft` | 1 |
| 2 | Boss Rush: every boss back to back, against the clock | `claude/expansion-boss-rush` | 2 |
| 3 | Convoy escort: waves where you protect friendly freighters | `claude/expansion-convoys` | 3 |

#### 1. Salvage draft

- After every boss and every challenging stage, you are dealt three perk cards. Pick one, or skip the hand for a little scrap. Perks last until the run ends, and a few stack.
- About 15 perks across offense, defense, scoring and the hull ability, each simple enough to read on a card: for example a faster charge shot, a wider graze field, a longer combo window, an extra bomb slot, or foes that burst and damage their neighbours.
- What you hold shows on the pause screen and the results. The daily challenge deals seeded hands, so everyone gets the same cards. No build lets a boss die much faster than it does today.

#### 2. Boss Rush

- A new mode from the title screen (B): the Hive Queen, the Iron Maw and the Mothership back to back at rising strength, each in a region it guards, with that region's backdrop and local name. Once you have destroyed the Hive Mind in the Hive Heart, it joins as the fourth and last fight.
- A pit stop between fights (pick a shield, a smart bomb or a repaired ship), a timer with splits for each fight, and best times and scores saved for each course.
- You fly your own hull with its ability, but with no loadout, missions, relics, charting or gambles. Scrap pays a modest flat amount per fight, so the rush is never a better scrap farm than a normal run.

#### 3. Convoy escort

- From wave 7, every fifth wave (7, 12, 17 and so on) is a convoy wave: three friendly freighters cross the screen below the formation while you fight it. Waves 1 to 6 don't change.
- Enemy shots, mines, beams and divers hit the freighters, and some divers go for them on purpose. A freighter also blocks enemy fire, so sheltering under one protects you at the convoy's expense.
- Each freighter that gets through pays scrap and points. All three is CONVOY SAFE, which sends a supply crate (a power-up) for the next wave. Convoys come on the same waves in every region and are seeded in the daily challenge.

### Working in parallel

All three branches edit the same `index.html` and `README.md`, so merges will need care:

- **Code placement.** As in round 1: each expansion keeps its code in its own `/* ===== ... ===== */` section and makes small, surgical edits to shared code (the update loop, `nextWave`, `waveClear`, the debrief flow, input, the gamepad tables, the HUD, the README).
- **Keys.** B starts a Boss Rush on the title screen, and 1, 2 and 3 pick a card on the draft screen. There are no other new keys.
- **Album.** The total stays at 298; none of the three adds collectibles.
- **Save keys.** New data uses its own versioned `nova-swarm-*-v1` key through the existing `store` helper (Boss Rush bests: `nova-swarm-rush-v1`). Lifetime stats go in the pilot record.
- **Medals.** Each expansion may add up to two medals at the end of `MEDALS`. The README's medal counts are reconciled when the branches merge.
- **Left for the merge.** Once both are in, Boss Rush pit stops could deal a salvage draft. At the merge they were kept to their three supply picks, so rush times stay a test of skill rather than of the hand dealt. Boss Rush only spawns bosses, so it never has convoys or challenging stages.

## Round 1: five expansions

**Status:** all five expansions are built, reviewed and merged into the default branch. The README describes how they play.

### Where the game stands

- **Healthy build.** `index.html` (about 4,700 lines, 240 KB) loads with no console errors, and a headless Chromium smoke test plays wave 1 cleanly. There is no build step, no dependency and no test suite; balance so far came from ad-hoc bot playtests.
- **Content.** 6 enemy types plus splitter minis, 3 bosses in rotation, challenging stages, tractor beams and twin fighters, 5 sector events, 7 power-ups, smart bombs, charge shots, combo and graze scoring, missions, a seeded daily challenge, 3 hulls, 9 regions on a star map, 268 cosmetic collectibles, and a scrap economy with optional, odds-labelled gambles.

#### Gaps

1. **Input and accessibility.** Keyboard and touch only: no gamepad. Sound is a three-way toggle (on / SFX only / off) with no volume control, there is no settings screen, and motion effects follow the OS reduced-motion setting only.
2. **No destination.** The star map ends at the ninth region with no finale or ending. The 3 bosses rotate under local names, so there is no unique final fight.
3. **Thin long-term goals.** Persistent progress is almost all cosmetic collection. There are no lifetime stats or achievements; the only saved stat is bonus-stage history.
4. **Hulls differ only by stats.** The Striker, Interceptor and Bulwark change speed, fire rate and shields, but none gives the player anything new to do.
5. **Difficulty flattens.** Warden count caps at wave 9; entry speed, spawn gap and dive interval cap around wave 13; the newest enemy (the Aegis) arrives at wave 7. Only enemy fire rate keeps rising, so waves 10+ repeat the same mix while playtest runs reach waves 9 to 15.

### The five expansions

| # | Expansion | Branch | Closes gap |
| --- | --- | --- | --- |
| 1 | Controller support and an options screen | `claude/expansion-gamepad-options` | 1 |
| 2 | The Hive Heart: a finale region, final boss and ending | `claude/expansion-hive-heart` | 2 |
| 3 | Pilot record and medals | `claude/expansion-medals` | 3 |
| 4 | Hull signature abilities and a fourth hull | `claude/expansion-hull-abilities` | 4 |
| 5 | Elite swarm: late-wave enemies and squadron dives | `claude/expansion-elite-swarm` | 5 |

#### 1. Controller support and an options screen

- Gamepad API with the standard mapping: stick and D-pad move, A fires (hold to auto-fire, release to charge), B bombs, Start pauses. RB is reserved for the hull ability from expansion 4.
- Every menu (title, hangar, map, debrief, wager, wheel, initials entry) works from the pad: the D-pad moves focus, A activates, B goes back.
- An options screen (title and pause): music and SFX volume, screen shake, flash intensity, high-contrast enemy shots, controller rumble. Saved in the browser; defaults follow reduced-motion.

#### 2. The Hive Heart

- A tenth node on the star map, charted after the Prism Rift like every other region, with its own twist, backdrop and 30-item collectible set (298 collectibles in all).
- The **Hive Mind**, a fourth boss with three phases that echo the Queen, the Maw and the Mothership. It opens the region's boss rotation; other regions' rotations stay as they are.
- A one-time ending and credits the first time it falls, after which the run continues.

#### 3. Pilot record and medals

- Lifetime stats saved in the browser: runs, time flown, kills by enemy type, bosses by kind and region, best combo, grazes, perfect stages, rescues, relics and more.
- About 30 medals in bronze, silver and gold tiers, each paying scrap once, with a few secret ones. Existing saves are credited on first load.
- A records screen from the title. Medals never change gameplay and add no album items.

#### 4. Hull signature abilities and a fourth hull

- An ability meter fed by kills and grazes, fired with V (RB on a pad, a button on touch):
  - **Striker:** Overdrive (a burst of rapid spread fire).
  - **Interceptor:** Phase Dash (a short dash with brief invulnerability).
  - **Bulwark:** Barrier (a shield wall above the ship that soaks shots).
- A fourth hull, the **Lancer**, built around the charge shot, with its own beam ability.
- Tuned to about one use per wave, so abilities never trivialize bosses.

#### 5. Elite swarm

- Three new enemy types for the late waves, each with clear counterplay:
  - **Phantom:** cloaks while it dives.
  - **Brood:** refills empty formation slots until it is shot.
  - **Sentry:** fires a telegraphed aimed beam.
- Coordinated squadron dives from wave 10, and gentle scaling past wave 13 with a soft cap.
- Waves 1 to 8 stay as they are.

### Working in parallel

All five branches edit the same `index.html` and `README.md`, so merges will need care:

- **Code placement.** Each expansion keeps its code in its own `/* ===== ... ===== */` section and makes small, surgical edits to shared code (the update loop, input, HUD, README).
- **Keys.** O opens options, R opens records, V fires the hull ability, and RB is the ability button on a pad.
- **Album.** Only expansion 2 changes the album total. Medals pay scrap, not collectibles.
- **Save keys.** New data uses its own versioned `nova-swarm-*-v1` key through the existing `store` helper.
