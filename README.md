# Nova Swarm

A retro pixel space shooter in the spirit of Galaga. It runs in the browser from a single file with no build step and no dependencies.

The hive has reached Sector 9. Enemies fly in along swooping paths, lock into formation, then peel off to dive at you. Survive the waves, bank power-ups, and beat the boss that guards every fifth wave.

## Play

Open `index.html` in any modern browser. Everything lives in that one file: the pixel sprites are drawn in code and the chiptune music and sound effects are synthesized with WebAudio. The two pixel fonts load from Google Fonts, and the game falls back to a monospace font when offline.

| Action | Keyboard | Touch |
| --- | --- | --- |
| Move | WASD (arrow keys also work) | Drag anywhere on the screen |
| Fire | Space / Z (hold for auto-fire) | Fires automatically while your finger is down |
| Pause | P / Esc | Pause button under the screen |
| Sound | M (cycles on / SFX only / off) | Sound button under the screen |
| Hangar | H (title screen and between waves) | Hangar button |

## What's in it

- **Three enemy types.** Drones swoop, Stingers zig-zag, and Wardens take two hits and fire 3-way spreads. Diving enemies are worth double or more.
- **Bosses every 5th wave**, alternating between two. Each fight opens with a supply drop (a shield, or rapid fire if you're already shielded):
  - **Hive Queen:** fan volleys, aimed streams, summoned escorts, and a spiral barrage below 1/3 health.
  - **Iron Maw:** a telegraphed laser beam, twin cannons, and bullet rings.
- **Challenging stages** after waves 3, 8, 13 and so on: 40 enemies loop through without firing. Every hit scores 100, and hitting all 40 is a PERFECT worth 10,000.
- **Six power-ups:** Spread Shot, Rapid Fire, Shield, Time Warp, Nova Blast (clears the screen), and Extra Ship.
- **Scoring:**
  - A no-hit bonus for clearing a wave without dying.
  - Extra ships at 20,000 points and then every 60,000.
  - An arcade-style results screen with shots fired, number of hits, and hit-miss ratio.
- **Top 10 table** with 3-letter initials, saved in your browser's local storage.
- **Chiptune soundtrack** with separate boss and bonus-stage themes, generated live with no audio files.
- **CRT scanlines**, screen shake, and pixel explosions. All motion effects respect the reduced-motion setting.

## Scrap, the hangar and the album

- **Scrap** drops from destroyed enemies as small bolts that fly to your ship when you get close. Bosses pay 120+ scrap, a PERFECT challenging stage pays 100, and a no-hit wave adds a scrap bonus. Your scrap total is saved in the browser.
- **Wave debrief:** after each wave you see your bonus (points + scrap). From there you can continue, open the hangar, or try **double or nothing** on that bonus: a coin flip (50/50) or a reflex test (stop the needle in a green zone that covers 20% of the bar). Your saved scrap is never at risk, only that wave's bonus.
- **Hangar** (title screen and between waves):
  - **Shop:** upgrades that last one run: Shield, Spread Start, Fast Fire, Extra Ship, Scrap Magnet. Buying from the title screen applies them to your next run.
  - **Slots** (10 scrap): three of a kind gives that power-up next wave, three ships is the jackpot (an extra ship), and any pair returns 5 scrap. The exact odds of each outcome are listed under the reels.
  - **Mystery capsule** (60 scrap): rolls a collectible: Common 60%, Rare 28%, Epic 10%, Legendary 2%. Duplicates refund scrap.
  - **Album:** 24 cosmetic collectibles across four rarities: ship paint jobs, engine trails, pilot badges (shown next to your name in the high-score table), and enemy trophy cards. Every item can also be bought outright, and beating each boss or scoring a PERFECT stage awards its trophy card.
- **Challenging-stage wager:** before a bonus stage you can bet scrap on hitting at least 20, 30, 36 or all 40 enemies (pays 1.5x, 2x, 3x or 6x). It shows how often you've hit each target before.
- **Prize wheel:** one free spin after every game over. 10 equal slices: scrap (40%), blank (30%), a mystery capsule, a shield for your next run, or an extra ship for your next run (10% each).

**Guardrails:** scrap is earned only by playing, never with real money. Every gamble shows its odds and can be skipped. Nothing you need to progress is locked behind a gamble: upgrades and collectibles can all be bought directly.
