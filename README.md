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

## What's in it

- **Three enemy types.** Drones swoop, Stingers zig-zag, and Wardens take two hits and fire 3-way spreads. Diving enemies are worth double or more.
- **Bosses every 5th wave**, alternating between two:
  - **Hive Queen:** fan volleys, aimed streams, summoned escorts, and a spiral barrage below 1/3 health.
  - **Iron Maw:** a telegraphed laser beam, twin cannons, and bullet rings.
- **Six power-ups:** Spread Shot, Rapid Fire, Shield, Time Warp, Nova Blast (clears the screen), and Extra Ship.
- **Scoring:**
  - A no-hit bonus for clearing a wave without dying.
  - Extra ships at 20,000 points and then every 60,000.
  - An arcade-style results screen with shots fired, number of hits, and hit-miss ratio.
- **Top 10 table** with 3-letter initials, saved in your browser's local storage.
- **Chiptune soundtrack** with a separate boss theme, generated live with no audio files.
- **CRT scanlines**, screen shake, and pixel explosions. All motion effects respect the reduced-motion setting.
