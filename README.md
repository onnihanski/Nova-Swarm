# Nova Swarm

A retro pixel space shooter in the spirit of Galaga. It runs in the browser from a single file with no build step and no dependencies.

The hive has reached Sector 9. Enemies fly in along swooping paths, lock into formation, then peel off to dive at you. Survive the waves, bank power-ups, and beat the boss that guards every fifth wave. Then chart a course across the star map to eight new regions, each with its own swarm, twist and set of collectibles.

## Play

Open `index.html` in any modern browser. Everything lives in that one file: the pixel sprites are drawn in code and the chiptune music and sound effects are synthesized with WebAudio. The two pixel fonts load from Google Fonts, and the game falls back to a monospace font when offline.

| Action | Keyboard | Touch |
| --- | --- | --- |
| Move | WASD (arrow keys also work) | Drag anywhere on the screen |
| Fire | Space / Z (hold for auto-fire) | Fires automatically while your finger is down |
| Charge shot | Let go of fire for a second; your next shot pierces | Lift your finger for a second |
| Smart bomb | X | Tap with a second finger |
| Pause | P / Esc | Pause button under the screen |
| Sound | M (cycles on / SFX only / off) | Sound button under the screen |
| Hangar | H (title screen and between waves) | Hangar button |
| Star map | G (title screen) | Map button |
| Daily challenge | C (title screen) | Daily button |

## What's in it

- **Six enemy types.** Drones swoop, Stingers zig-zag, and Wardens take two hits and fire 3-way spreads. From wave 4, Splitters burst into two fast minis when shot. From wave 6, Minelayers sweep across the screen dropping drifting mines. From wave 7, the Aegis's front armor stops straight shots: hit it side-on while it turns in a dive, or use spread shots, a charge shot or a bomb. Diving enemies are worth double or more.
- **Tractor beams.** From wave 3, a Warden can swoop down and beam your ship up. It never takes your last ship, and a shield repels the beam. Shoot that Warden to free your ship (+1,000). The freed ship docks beside you and you fly twin fighters with double shots; a hit knocks out one ship, not a life. Shoot the captured ship itself and it's gone for good.
- **Bosses every 5th wave**, in rotation. Each fight opens with a supply drop (a shield, or rapid fire if you're already shielded):
  - **Hive Queen:** fan volleys, aimed streams, summoned escorts, and a spiral barrage below 1/3 health.
  - **Iron Maw:** a telegraphed laser beam, twin cannons, and bullet rings.
  - **Mothership:** two wing turrets and two shield generators (500 points each) guard a core that stays shielded until both generators are down. It fires turret volleys, drops lines of mines, launches drones, and fires bursts from the core once the shield is gone.
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
- **Seven power-ups:** Spread Shot, Rapid Fire, Shield, Time Warp, Nova Blast (clears the screen), Wingmen (two drones that add shots until you are hit), and Extra Ship.
- **Scoring:**
  - **Combo multiplier:** kills in quick succession build up to x8.
  - **Graze bonus:** bullets that pass close by without hitting you pay 20 points each, and every 4th graze pays 1 scrap.
  - **No-hit bonus:** for clearing a wave without getting hit.
  - **Extra ships:** at 30,000 points and then every 100,000.
  - **Results screen:** arcade-style, with shots fired, number of hits and hit-miss ratio.
- **Missions:** three random goals per run (for example: reach a x4 combo, rescue a captured fighter, shoot 5 mines), each paying scrap. The title screen shows the next run's missions and the pause screen shows your progress.
- **Daily challenge:** the same seeded region, waves, events, drops and missions for everyone on a given (UTC) day. The day's region is open even if you haven't charted it yet. Everyone flies a Striker with no loadout, hangar, gambles or wager. The day's best score is kept separately from the top-10 table.
- **Top 10 table** with 3-letter initials, saved in your browser's local storage.
- **Chiptune soundtrack** with separate boss and bonus-stage themes, generated live with no audio files.
- **CRT scanlines**, screen shake, and pixel explosions. All motion effects respect the reduced-motion setting.

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

- **Charting:** regions open in map order. Clear wave 5 (beat the first boss) in a region to chart the next one, or chart it early for 150 to 500 scrap once the region before it is charted.
- **Collectible sets:** every new region has its own set of 30 collectibles: 8 paint jobs, 7 engine trails, 7 pilot badges and 8 trophy cards (the local swarm, a native creature, a landmark and the local boss). Most sets are 12 Common, 9 Rare, 6 Epic and 3 Legendary; the Prism Rift's is 10 / 9 / 7 / 4. Sector 9 keeps the original 28, for 268 in all.
- **Patterns:** many region collectibles are patterned. Paint jobs come in stripes, checkers, chevrons, scales, spots, speckles, rings, circuits, gradients, glitch and split hulls, and each region's Legendary paint job is animated (marquee flames, aurora, pulse, twinkle, shimmer, hazard stripes, prism and static). Trails come as confetti (mixed colors), color cycles, twin jets (a different color per engine) and sparklers; badges and trophy cards have patterns too. A striped corner on an album tile marks a patterned item.
- **Relics:** in the eight new regions, every boss drops a relic, and one kill per wave has a 2% chance to drop one too. Catch it to get a random item from that region's set (duplicates refund scrap like a capsule). Relics still on screen when a wave ends fly to you. Beating a region's first boss also awards its boss trophy card, and a PERFECT challenging stage there awards a patterned card of its native creature.

## Scrap, the hangar and the album

- **Scrap** drops from destroyed enemies as small bolts that fly to your ship when you get close. Bosses pay 120+ scrap, a PERFECT challenging stage pays 100, missions pay 30 to 60, and a no-hit wave adds a scrap bonus. Your scrap total is saved in the browser.
- **Wave debrief:** after each wave you see your bonus (points + scrap). From there you can continue, open the hangar, or try **double or nothing** on that bonus: a coin flip (50/50) or a reflex test (stop the needle in a green zone that covers 20% of the bar). Your saved scrap is never at risk, only that wave's bonus.
- **Hangar** (title screen and between waves):
  - **Shop:** upgrades that last one run: Shield, Spread Start, Fast Fire, Extra Ship, Scrap Magnet, Smart Bomb. Buying from the title screen applies them to your next run.
  - **Ships:** the Striker (free, balanced), the Interceptor (300 scrap: faster, quicker single shots), and the Bulwark (400 scrap: slow, fires two bolts per shot, and starts every life shielded). Paint jobs recolor all three.
  - **Slots** (10 scrap): three of a kind gives that power-up next wave, three ships is the jackpot (an extra ship), and any pair returns 5 scrap. The exact odds of each outcome are listed under the reels.
  - **Mystery capsule** (60 scrap): pick a set with the arrows, then roll a collectible from it: Common 60%, Rare 28%, Epic 10%, Legendary 2%. Duplicates refund scrap.
  - **Album:** 268 cosmetic collectibles in nine sets (use the arrows or the arrow keys to switch sets), across four rarities: ship paint jobs, engine trails, pilot badges (shown next to your name in the high-score table), and trophy cards. Every item can also be bought outright, from any set, charted or not. Beating each boss or scoring a PERFECT stage, in any region, also awards its Sector 9 trophy card.
- **Challenging-stage wager:** before a bonus stage you can bet scrap on hitting at least 20, 30, 36 or all 40 enemies (pays 1.5x, 2x, 3x or 6x). It shows how often you've hit each target before.
- **Prize wheel:** one free spin after every game over. 10 equal slices: scrap (40%), blank (30%), a mystery capsule from the region you just flew, a shield for your next run, or an extra ship for your next run (10% each).

**Guardrails:** scrap is earned only by playing, never with real money. Every gamble shows its odds and can be skipped. Nothing you need to progress is locked behind a gamble: upgrades, ships and collectibles can all be bought directly. A prize is saved the moment a capsule, slot spin or wheel spin starts, so closing the page mid-animation never loses it.
