# Nova Swarm

A retro pixel space shooter in the spirit of Galaga. It runs in the browser from a single file with no build step and no dependencies.

The hive has reached Sector 9. Enemies fly in along swooping paths, lock into formation, then peel off to dive at you. Survive the waves, bank power-ups, and beat the boss that guards every fifth wave. Then chart a course across the star map to nine new regions, each with its own swarm, twist and set of collectibles, ending at the Hive Heart, where the swarm comes from.

## Play

Play it online at **https://onnihanski.github.io/Nova-Swarm/** (GitHub Pages), or open `index.html` in any modern browser. Everything lives in that one file: the pixel sprites are drawn in code and the chiptune music and sound effects are synthesized with WebAudio. The two pixel fonts load from Google Fonts, and the game falls back to a monospace font when offline.

| Action | Keyboard | Gamepad | Touch |
| --- | --- | --- | --- |
| Move | WASD (arrow keys also work) | Left stick (analog) or D-pad | Drag anywhere on the screen |
| Fire | Space / Z (hold for auto-fire) | A (hold for auto-fire) | Fires automatically while your finger is down |
| Charge shot | Let go of fire for a second; your next shot pierces | Let go of A for a second | Lift your finger for a second |
| Smart bomb | X | B or X | Tap with a second finger |
| Hull ability | V | RB | Ability button under the screen |
| Pause | P / Esc | Start | Pause button under the screen |
| Sound | M (cycles on / SFX only / off) | Back / Select | Sound button under the screen |
| Options | O (title and pause screens) | Options button | Options button |
| Hangar | H (title screen and between waves) | Hangar button | Hangar button |
| Star map | G (title screen) | Map button | Map button |
| Daily challenge | C (title screen) | Daily button | Daily button |
| Records | R (title screen) | Records button | Records button |
| Skip the ending | Space / Enter / Esc (after a moment) | A, B or Start | Tap |
| Menus | Tab, arrow keys, Space / Enter, Esc | D-pad or left stick moves focus, A picks, B goes back, LB / RB flip tabs | Tap |

## What's in it

- **Six enemy types.** Drones swoop, Stingers zig-zag, and Wardens take two hits and fire 3-way spreads. From wave 4, Splitters burst into two fast minis when shot. From wave 6, Minelayers sweep across the screen dropping drifting mines. From wave 7, the Aegis's front armor stops straight shots: hit it side-on while it turns in a dive, or use spread shots, a charge shot or a bomb. Diving enemies are worth double or more.
- **Tractor beams.** From wave 3, a Warden can swoop down and beam your ship up. It never takes your last ship, and a shield repels the beam. Shoot that Warden to free your ship (+1,000). The freed ship docks beside you and you fly twin fighters with double shots; a hit knocks out one ship, not a life. Shoot the captured ship itself and it's gone for good.
- **Bosses every 5th wave**, in rotation (four of them, counting the Hive Mind, which only the Hive Heart has). Each fight opens with a supply drop (a shield, or rapid fire if you're already shielded):
  - **Hive Queen:** fan volleys, aimed streams, summoned escorts, and a spiral barrage below 1/3 health.
  - **Iron Maw:** a telegraphed laser beam, twin cannons, and bullet rings.
  - **Mothership:** two wing turrets and two shield generators (500 points each) guard a core that stays shielded until both generators are down. It fires turret volleys, drops lines of mines, launches drones, and fires bursts from the core once the shield is gone.
  - **Hive Mind** (the Hive Heart's wave-5 boss, and the biggest of them all): its health bar has three phases, and each one echoes an earlier boss. Phase 1 fires Queen-style fans and aimed streams and summons escorts. Phase 2 adds Maw-style telegraphed lasers (three beams at once, so slip between them), cannons and bullet rings. Phase 3 grows six nodes around its core: four shield generators and two turrets guard it like the Mothership's, and once the core is exposed and badly hurt, a desperation pattern begins. Each phase change is a flash, a banner and a short beat where it cannot be hurt, and a Nova or bomb cannot skip one. It has its own music.
- **Challenging stages** after waves 3, 8, 13 and so on: 40 enemies loop through without firing. Every hit scores 100, and hitting all 40 is a PERFECT worth 10,000.
- **Sector events.** In Sector 9, about 3 in 10 regular waves from wave 4 get a twist, announced in the wave banner. The other regions have their own mix (see below):
  - **Meteor shower:** rocks to dodge or shoot.
  - **Dark sector:** you can only see around your ship.
  - **Double time:** the swarm is 30% faster, but scrap pays double.
  - **Crosswind:** a sideways push on your ship that flips direction every few seconds. The HUD arrow shows which way it blows.
  - **Swarm surge:** more enemies dive at once, and every kill pays 1 extra scrap.
- **Weapons:**
  - **Smart bombs:** two per run, bought in the shop for 40 scrap each (up to five). A bomb clears enemy fire and hits every enemy on screen.
  - **Charge shot:** fire a piercing bolt through a whole column.
- **Hull abilities:** every hull has one signature move, fired with V or the ability button under the screen.
  - **Meter:** kills fill it (divers fill more), grazes add a little, and so does damage to a boss. It is ready about once per regular wave and two or three times in a boss fight. It starts every run empty and is kept when you lose a ship (only a running ability ends), and it can't fill while a long ability is running.
  - **Striker, Overdrive:** about 4 seconds of rapid spread fire, with a glowing aura.
  - **Interceptor, Phase Dash:** an instant dash in your move direction (sideways when idle) with 0.4 seconds of invulnerability and an afterimage. Grazes during the dash pay double, and it slips you out of a tractor beam.
  - **Bulwark, Barrier:** a shield wall above the ship for 5 seconds that soaks enemy shots and mines, but not diving enemies.
  - **Lancer, Lance:** a beam straight up for 1.5 seconds that hits everything in its column; it does at most 12 damage to a boss.
  - Abilities work with twin fighters, wingmen, shields and Time Warp, and the daily challenge's Striker has Overdrive.
- **Seven power-ups:** Spread Shot, Rapid Fire, Shield, Time Warp, Nova Blast (clears the screen), Wingmen (two drones that add shots until you are hit), and Extra Ship.
- **Scoring:**
  - **Combo multiplier:** kills in quick succession build up to x8.
  - **Graze bonus:** bullets that pass close by without hitting you pay 20 points each, and every 4th graze pays 1 scrap.
  - **No-hit bonus:** for clearing a wave without getting hit.
  - **Extra ships:** at 30,000 points and then every 100,000.
  - **Results screen:** arcade-style, with shots fired, number of hits and hit-miss ratio.
- **Missions:** three random goals per run (for example: reach a x4 combo, rescue a captured fighter, shoot 5 mines, use your ability 3 times, defeat 8 foes with your ability), each paying scrap. The title screen shows the next run's missions and the pause screen shows your progress.
- **Daily challenge:** the same seeded region, waves, events, drops and missions for everyone on a given (UTC) day. The day's region is open even if you haven't charted it yet; the Hive Heart is never the day's region, so the finale stays something you reach. Everyone flies a Striker with no loadout, hangar, gambles or wager. The day's best score is kept separately from the top-10 table.
- **Pilot record and medals:** lifetime stats and 35 medals in bronze, silver and gold, each tier paying scrap once (see below).
- **Top 10 table** with 3-letter initials, saved in your browser's local storage.
- **Chiptune soundtrack** with separate boss, bonus-stage and Hive Mind themes, generated live with no audio files.
- **CRT scanlines**, screen shake, and pixel explosions. All motion effects respect the reduced-motion setting, and the options screen can tune them (see below).

## Gamepad and options

- **Gamepad:** any controller with the standard mapping works through the browser's Gamepad API. Press a button once so the browser sees it. The game toasts CONTROLLER CONNECTED and CONTROLLER DISCONNECTED, and pauses if the pad drops out mid-run. The left stick has a deadzone and analog speed, and the D-pad moves at full speed. A fires (hold to auto-fire; let go for a second to charge), B or X drops a smart bomb, Start pauses, Back / Select cycles the sound, and RB fires your hull ability.
- **Menus from the pad:** every screen works without a keyboard: title and its tabs, hangar, album, star map, debrief, wager, prize wheel, initials entry, pause, game over and options. The D-pad or stick moves a bright focus ring between the buttons, A presses the focused one, B goes back like Esc, Start takes the screen's safe default (start, next wave, no bet, resume), and LB / RB flip the title panels, hangar tabs and records views. On the initials screen the D-pad picks letters. While a pad is in use, the on-screen hints name pad buttons; they switch back when you touch the keyboard, mouse or screen.
- **Rumble:** pads that support it buzz when your ship is hit, on a smart bomb and when a boss dies.
- **Options screen:** press O on the title or pause screen, or use the Options button. Everything is saved in your browser, and Reset Defaults puts it all back.
  - **Sound, music and SFX:** M and the Sound row cycle on / SFX only / off. Music and SFX set how loud each is when it is on, from 0 to 10. A muted row is dimmed, so it is clear what M is doing. Your old sound setting carries over.
  - **Screen shake:** on, reduced (half) or off.
  - **Flashes:** full, or reduced to dim the white flashes from bombs, Nova Blasts, boss kills and ship losses.
  - **Hi-contrast shots:** draws enemy bullets and mines with a dark halo, a white edge and a hot core, so they stand out on every region's backdrop, in Dark Sector waves and in the Prism Rift.
  - **Pad rumble:** on or off.
  - Shake and flashes start from your device's reduced-motion setting (off and reduced when it is on) until you pick a value; a choice you make overrides it.

## Regions and the star map

Press G (or the Map button) on the title screen to open the star map. Pick a region and **set course**: your next run is flown there, and the title screen shows your course. Each region has its own backdrop, swarm colors, opening boss (with a local name) and twist:

| Region | Twist | First boss |
| --- | --- | --- |
| Sector 9 | The classic swarm, where it all started. | Hive Queen |
| Ember Belt | Meteor showers in most waves, from wave 2. | Magma Maw |
| Frost Reach | Enemy shots fly 20% slower but come more often. Watch for crosswinds and dark sectors. | Rime Queen |
| Void Hollow | Dark sectors in half the waves, from wave 2. | Null Carrier |
| Verdant Nebula | 50% more power-ups, but the swarm fires more often. Swarm surges are common. | Bloom Queen |
| Solar Crown | Crosswinds in most waves, from wave 2. | Corona Maw |
| Coral Drift | The formation sways far wider and faster. | Reef Carrier |
| Iron Foundry | Aegis shield-bearers join from wave 3. Double time is common. | Chrome Queen |
| Prism Rift | A sector event in most waves, and the swarm changes color every wave. | Prism Maw |
| Hive Heart | The finale, and the hardest region: a pulsing, organic nebula, an event in most waves, Aegis shield-bearers from wave 3, a faster swarm that fires more often. | Hive Mind |

- **Charting:** regions open in map order. Clear wave 5 (beat the first boss) in a region to chart the next one, or chart it early for 150 to 600 scrap once the region before it is charted.
- **Collectible sets:** every new region has its own set of 30 collectibles: 8 paint jobs, 7 engine trails, 7 pilot badges and 8 trophy cards (the local swarm, a native creature, a landmark and the local boss). Most sets are 12 Common, 9 Rare, 6 Epic and 3 Legendary; the Prism Rift's is 10 / 9 / 7 / 4. Sector 9 keeps the original 28, for 298 in all.
- **Patterns:** many region collectibles are patterned. Paint jobs come in stripes, checkers, chevrons, scales, spots, speckles, rings, circuits, gradients, glitch and split hulls, and each region's Legendary paint job is animated (marquee flames, aurora, pulse, twinkle, shimmer, hazard stripes, prism, static and heartbeat). Trails come as confetti (mixed colors), color cycles, twin jets (a different color per engine) and sparklers; badges and trophy cards have patterns too. A striped corner on an album tile marks a patterned item.
- **The Hive Heart:** the tenth and last node, up in the corner of the map. Clear wave 5 in the Prism Rift to chart it, or chart it early for 600 scrap. Its swarm is tinted flesh-red, its nebula throbs like a heartbeat (still when reduced motion is on), and its wave-5 boss is the Hive Mind, which then joins the other three in its boss rotation (every other region keeps its three-boss rotation). Its set has 12 Common, 9 Rare, 6 Epic and 3 Legendary collectibles, with an animated Heartbeat paint job as the Legendary one. Destroy the Hive Mind for the first time and a short ending plays: a story crawl, then the credits. Space, Enter or a tap skips it after a moment. The run then goes on (the swarm fights on) and the score keeps counting. The ending is remembered in your browser, so later kills show only a banner, and the Hive Heart wears a crown on the star map once its Hive Mind has fallen.
- **Relics:** in the nine new regions, every boss drops a relic, and one kill per wave has a 2% chance to drop one too. Catch it to get a random item from that region's set (duplicates refund scrap like a capsule). Relics still on screen when a wave ends fly to you. Beating a region's first boss also awards its boss trophy card, and a PERFECT challenging stage there awards a patterned card of its native creature.

## Pilot record and medals

Press R (or the Records button) on the title screen to open your pilot record. It has two views, switched with the tabs or the 1 and 2 keys:

- **Medals:** 35 medals in a grid of pixel icons, colored bronze, silver or gold by the tier you hold, each with a progress bar toward the next tier. Pick one (tap it, or use the arrow keys) to see what it asks for, your progress and what the next tier pays. A small amber corner marks a medal you haven't looked at yet, and the title screen's Records button counts them.
- **Stats:** your lifetime record: runs started (daily challenges included), time flown, waves cleared, total and best score, enemies destroyed by type, bosses destroyed by kind and by region, best combo, grazes, smart bombs used, best charge-shot pierce, perfect challenging stages, fighters rescued, missions completed, relics caught and scrap earned.

Medals come in tiers: most have bronze, silver and gold (for example 500 / 5,000 / 25,000 enemies destroyed, reaching wave 10 / 15 / 20, collecting 50 / 150 / all album items, completing 25 / 100 / 300 missions). Some have a single tier, such as flying the Interceptor, the Bulwark or the Lancer past wave 10, or destroying the Hive Mind. Four are secret and show as "???" until you earn them. Each tier pays scrap once, 20 to 150 depending on how hard it is; all 89 tiers together pay 5,675 scrap, against roughly 200 to 1,000 for a run. Medals never award album items and never change gameplay. The daily challenge counts toward every stat and medal.

An unlock shows a short toast under the HUD, one at a time, so it doesn't pile onto the wave banner or other messages. The first time you load the game with an existing save, medals your save already earns (album count, charted regions, best waves, high scores, challenging-stage history) are credited once, with one summary toast. The record is saved in your browser under its own key, at the end of every wave, at game over and when the page is hidden.

## Scrap, the hangar and the album

- **Scrap** drops from destroyed enemies as small bolts that fly to your ship when you get close. Bosses pay 120+ scrap, a PERFECT challenging stage pays 100, missions pay 30 to 60, and a no-hit wave adds a scrap bonus. Your scrap total is saved in the browser.
- **Wave debrief:** after each wave you see your bonus (points + scrap). From there you can continue, open the hangar, or try **double or nothing** on that bonus: a coin flip (50/50) or a reflex test (stop the needle in a green zone that covers 20% of the bar). Your saved scrap is never at risk, only that wave's bonus.
- **Hangar** (title screen and between waves):
  - **Shop:** upgrades that last one run: Shield, Spread Start, Fast Fire, Extra Ship, Scrap Magnet, Smart Bomb. Buying from the title screen applies them to your next run.
  - **Ships:** the Striker (free, balanced), the Interceptor (300 scrap: faster, quicker single shots), the Bulwark (400 scrap: slow, fires two bolts per shot, and starts every life shielded), and the Lancer (500 scrap: slower single shots, but its charge shot is ready in 0.7 seconds instead of 1 and hits regular enemies harder). Each has its own ability (see above). Paint jobs and engine trails fit all four.
  - **Slots** (10 scrap): three of a kind gives that power-up next wave, three ships is the jackpot (an extra ship), and any pair returns 5 scrap. The exact odds of each outcome are listed under the reels.
  - **Mystery capsule** (60 scrap): pick a set with the arrows, then roll a collectible from it: Common 60%, Rare 28%, Epic 10%, Legendary 2%. Duplicates refund scrap.
  - **Album:** 298 cosmetic collectibles in ten sets (use the arrows or the arrow keys to switch sets), across four rarities: ship paint jobs, engine trails, pilot badges (shown next to your name in the high-score table), and trophy cards. Every item can also be bought outright, from any set, charted or not. Beating each boss or scoring a PERFECT stage, in any region, also awards its Sector 9 trophy card (the Hive Mind has none: its card comes only from the Hive Heart).
- **Challenging-stage wager:** before a bonus stage you can bet scrap on hitting at least 20, 30, 36 or all 40 enemies (pays 1.5x, 2x, 3x or 6x). It shows how often you've hit each target before.
- **Prize wheel:** one free spin after every game over. 10 equal slices: scrap (40%), blank (30%), a mystery capsule from the region you just flew, a shield for your next run, or an extra ship for your next run (10% each).

**Guardrails:** scrap is earned only by playing, never with real money. Every gamble shows its odds and can be skipped. Nothing you need to progress is locked behind a gamble: upgrades, ships and collectibles can all be bought directly. A prize is saved the moment a capsule, slot spin or wheel spin starts, so closing the page mid-animation never loses it.
