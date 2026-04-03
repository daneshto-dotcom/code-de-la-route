**LEGACY OF THE REALM**  
Music System  ·  Suno Prompts \+ Phaser 3 Implementation Guide  
*6 Tracks  ·  Full Zone Mapping  ·  TypeScript Audio Manager  ·  March 2026*

| ENGINE Phaser 3 (WebAudio) | FORMAT MP3 primary · OGG fallback | TRACKS 6 contextual tracks | LOCATION public/assets/audio/music/ |
| :---- | :---- | :---- | :---- |

# **1  The Six Tracks — Prompts and Context**

| Generate each track in Suno using the style prompt below. Download as MP3 (primary) and OGG (fallback). Name the files exactly as specified — the TypeScript audio manager references these names directly. |
| :---- |

| T1 | The Weight of Legacy | *Epic · Fate · Dynasty* |
| :---: | :---- | ----: |

| File name | theme\_main.mp3 |
| :---- | :---- |
| **Plays when** | Title screen on first load. Chronicle seal moments (year sealed). Dynasty succession completion (after new character inherits). Any moment the game wants to say: this matters. |
| **Loop** | No — plays once, fades to silence or transitions to ambient |

| SUNO STYLE PROMPT |
| :---- |
| epic medieval orchestral, haunting choir, solo cello lead,slow build, cinematic, parchment and iron, fate and dynasty,Hans Zimmer meets Howard Shore, 85 BPM, minor key,sweeping strings, distant horn, no drums until final act |

| T2 | Market Day | *Warm · Busy · Safe* |
| :---: | :---- | ----: |

| File name | ambient\_town.mp3 |
| :---- | :---- |
| **Plays when** | Any settlement zone (Ironhold, Ashenveil or any founded settlement) during DAWN or DAY phase. Safety ring 1–2 zones. Default fallback when no other context is active. |
| **Loop** | Yes — seamless loop |

| SUNO STYLE PROMPT |
| :---- |
| medieval folk, lute and hurdy-gurdy, warm tavern acoustic,bustling but calm, Skyrim ambient meets Witcher 3 folk,100 BPM, major key, woodwind countermelody, light percussion,merchant square at noon, lived-in world, no vocals |

| T3 | Candles and Cobblestones | *Quiet · Intimate · Safe* |
| :---: | :---- | ----: |

| File name | ambient\_town\_night.mp3 |
| :---- | :---- |
| **Plays when** | Settlement zones during DUSK or NIGHT phase. Interior zones (taverns, guildhalls) at any hour. Resting in owned property. |
| **Loop** | Yes — seamless loop |

| SUNO STYLE PROMPT |
| :---- |
| medieval night ambient, solo lute fingerpicking, distant owl,crackling hearth texture, intimate and still, 65 BPM,minor pentatonic, no percussion, warm candlelight atmosphere,The Witcher tavern at closing time, no vocals |

| T4 | The Fringe at Dusk | *Tense · Dangerous · Unknown* |
| :---: | :---- | ----: |

| File name | ambient\_fringe.mp3 |
| :---- | :---- |
| **Plays when** | Any fringe or wilderness zone (Thornwood Fringe, Ironspire Peaks, Ashfen Mire, Verdant Expanse, Sundrift Coast, Ember Reach, etc.). Night phase in any zone with safety ring 3–5. After DUSK in low-safety areas. |
| **Loop** | Yes — seamless loop |

| SUNO STYLE PROMPT |
| :---- |
| dark medieval ambient, slow dissonant strings, distant war drums,tension without resolution, low drone, sparse plucked lute,fog and torchlight, 60 BPM, no melody just atmosphere,Elder Ring meets medieval noir, no vocals, unsettling silence gaps |

| T5 | Iron and Blood | *Aggressive · Visceral · Immediate* |
| :---: | :---- | ----: |

| File name | combat.mp3 |
| :---- | :---- |
| **Plays when** | FIGHT\_PVE action initiated. TOURNAMENT entered. DUEL\_ACCEPT triggered. Plays for the full duration of the combat resolution sequence. Stops on combat end — previous ambient resumes. |
| **Loop** | Yes during combat — cross-fades out on combat resolution |

| SUNO STYLE PROMPT |
| :---- |
| aggressive medieval battle, war drums, brass stabs,fast string ostinato, 140 BPM, percussive and relentless,Conan the Barbarian energy meets medieval folk metal,minor key, no vocals, visceral and immediate, full orchestra |

| T6 | A Life Remembered | *Melancholic · Reverent · Permanent* |
| :---: | :---- | ----: |

| File name | succession.mp3 |
| :---- | :---- |
| **Plays when** | Character death confirmed (CharacterDied event). RETIRE action completed. Chronicle year sealed with a death entry. Plays once, fully, then returns to ambient. Never loops. |
| **Loop** | No — plays once to completion, no skip |

| SUNO STYLE PROMPT |
| :---- |
| solo piano and cello duet, melancholic and reverent,slow 55 BPM, sparse medieval modal harmony,the weight of a life lived, no drums, fading into silence,Max Richter meets medieval elegy, intimate grief, no choir |

# **2  File Delivery Specification**

Download each track from Suno in both MP3 and OGG format. Place all 12 files in the following directory (create it if it does not exist):

founding-realm/public/assets/audio/music/

| Filename (exact) | Track | Context |
| :---- | :---- | :---- |
| theme\_main.mp3 / .ogg | **T1 — The Weight of Legacy** | Title, chronicle seal, succession |
| ambient\_town.mp3 / .ogg | **T2 — Market Day** | Settlement zones, daytime |
| ambient\_town\_night.mp3 / .ogg | **T3 — Candles and Cobblestones** | Settlement zones, night |
| ambient\_fringe.mp3 / .ogg | **T4 — The Fringe at Dusk** | Wilderness, danger zones, night |
| combat.mp3 / .ogg | **T5 — Iron and Blood** | All combat: PvE, tournament, duel |
| succession.mp3 / .ogg | **T6 — A Life Remembered** | Death, retirement, year seal |

## **Format requirements**

* MP3: 192 kbps minimum, 44.1 kHz, stereo. This is the primary format loaded by Phaser.

* OGG: same quality settings. This is the browser fallback (Firefox prefers OGG). Phaser’s sound manager accepts both and picks the first supported format.

* Duration: aim for 2–4 minutes per looping track so loops are not noticeable. T1 and T6 (non-looping) can be any length.

* Normalise to −14 LUFS before export. Suno tracks vary in volume — consistent loudness prevents jarring transitions.

| Do not rename files after placing them. The TypeScript audio manager uses these exact names as keys. A single typo causes a silent audio failure with no error — Phaser will simply play nothing. |
| :---- |

# **3  Zone-to-Track Mapping**

Every zone in the world module maps to a default ambient track plus transition rules. The audio manager reads the player’s current zone and the current day phase to determine which track to play.

| Zone | Ring | Type | Track | Notes |
| :---- | ----- | :---- | :---- | :---- |
| **Court of the Sovereign** | 1 | Settlement — civic hub | **T2 day / T3 night** | Highest-safety zone. Laws enacted here. Royal feel. |
| **Ironhold Market** | 1 | Settlement — trading | **T2 day / T3 night** | Commerce hub. Market Day suits it perfectly. |
| **Guild Quarter** | 1 | Settlement — professional | **T2 day / T3 night** | Guild halls, charters, skilled trades. |
| **The Commons** | 2 | Settlement — residential | **T2 day / T3 night** | Where most starting characters live. |
| **Craftsmen’s Row** | 2 | Settlement — workshop | **T2 day / T3 night** | Workshops, forges. Slightly louder/busier feel. |
| **Dockside** | 2 | Settlement — waterfront | **T2 day / T3 night** | Trade routes, sailors, slightly rougher crowd. |
| **Temple District** | 1 | Settlement — spiritual | **T3 all hours** | Quiet reverence all day — use night ambient always. |
| **Outer Fields** | 3 | Transitional — fringe edge | **T4** | First zone outside the walls. Risk begins here. |
| **Thornwood Fringe** | 3 | Wilderness | **T4** | Dense forest edge. Tension building. |
| **Ironspire Peaks** | 4 | Wilderness — mountainous | **T4** | Harsh terrain. High monster density. |
| **Ashfen Mire** | 4 | Wilderness — swamp | **T4** | Fog, danger, isolation. |
| **Verdant Expanse** | 3 | Wilderness — open plains | **T4** | Safer wilderness but still fringe rules. |
| **Sundrift Coast** | 3 | Wilderness — coastal | **T4** | Wind, open water, isolation. |
| **Ember Reach** | 4 | Wilderness — volcanic | **T4** | High danger. Deep fringe atmosphere. |
| **Shadowmere Crossing** | 5 | Danger — deep wilderness | **T4** | Highest danger. Maximum tension. |
| **The Contested Grounds** | 4 | Danger — PvP/conflict | **T4 → T5 on combat** | Fringe ambient until combat starts. |
| **Tournament Grounds** | 2 | Special — arena | **T2 → T5 on enter** | Town ambient until tournament begins, then combat. |

## **Zone mapping logic (plain language)**

* Safety ring 1–2 AND (DAWN or DAY or DUSK phase) → play T2 (Market Day)

* Safety ring 1–2 AND (NIGHT phase) → play T3 (Candles and Cobblestones)

* Temple District → always T3 regardless of phase

* Safety ring 3–5 (any phase) → play T4 (The Fringe at Dusk)

* Combat started (any zone) → cross-fade to T5 (Iron and Blood), remember previous track

* Combat ended → cross-fade back to remembered previous track

* CharacterDied or RETIRE → fade everything out, play T6 (A Life Remembered) once, return to ambient

* Title screen or Chronicle seal → play T1 (The Weight of Legacy) once

# **4  TypeScript Audio Manager — Full Implementation**

| Create this as a new file: public/js/audio-manager.ts (or audio-manager.js if not using a build step for the client). It is a self-contained module with zero Phaser scene coupling — it receives the Phaser sound manager as a dependency and manages all music transitions. |
| :---- |

## **4A  File: public/js/audio-manager.ts**

**Track key constants**

// public/js/audio-manager.ts

export const TRACKS \= {

  MAIN\_THEME:   'theme\_main',

  TOWN\_DAY:     'ambient\_town',

  TOWN\_NIGHT:   'ambient\_town\_night',

  FRINGE:       'ambient\_fringe',

  COMBAT:       'combat',

  SUCCESSION:   'succession',

} as const;

export type TrackKey \= typeof TRACKS\[keyof typeof TRACKS\];

const FADE\_DURATION\_MS \= 1500;  // cross-fade time in milliseconds

const MUSIC\_VOLUME     \= 0.45;  // master music volume (0.0 – 1.0)

**Zone safety ring lookup**

// Mirror of world module’s zone classification — keep in sync with src/modules/world/index.ts

const ZONE\_RING: Record\<string, number\> \= {

  'Court of the Sovereign':  1,

  'Ironhold Market':         1,

  'Guild Quarter':           1,

  'Temple District':         1,

  'The Commons':             2,

  'Craftsmen\\'s Row':       2,

  'Dockside':                2,

  'Tournament Grounds':      2,

  'Outer Fields':            3,

  'Thornwood Fringe':        3,

  'Verdant Expanse':         3,

  'Sundrift Coast':          3,

  'Ironspire Peaks':         4,

  'Ashfen Mire':             4,

  'Ember Reach':             4,

  'The Contested Grounds':   4,

  'Shadowmere Crossing':     5,

};

const ALWAYS\_NIGHT\_ZONES \= new Set(\['Temple District'\]);

**AudioManager class**

export class AudioManager {

  private sound: Phaser.Sound.WebAudioSoundManager;

  private current: Phaser.Sound.WebAudioSound | null \= null;

  private currentKey: TrackKey | null \= null;

  private precombtKey: TrackKey | null \= null;  // track to resume after combat

  private muted \= false;

  constructor(soundManager: Phaser.Sound.WebAudioSoundManager) {

    this.sound \= soundManager;

  }

**preload() — call from Phaser scene preload()**

  preload(scene: Phaser.Scene): void {

    const base \= 'assets/audio/music/';

    Object.values(TRACKS).forEach(key \=\> {

      scene.load.audio(key, \[

        \`${base}${key}.mp3\`,

        \`${base}${key}.ogg\`,

      \]);

    });

  }

**play() — cross-fade to a new track**

  play(key: TrackKey, loop \= true): void {

    if (this.muted) return;

    if (this.currentKey \=== key) return;  // already playing

    const incoming \= this.sound.add(key, { loop, volume: 0 });

    incoming.play();

    incoming.setVolume(0);

    // Fade out current track

    if (this.current) {

      const outgoing \= this.current;

      this.fadeVolume(outgoing, MUSIC\_VOLUME, 0, FADE\_DURATION\_MS, () \=\> {

        outgoing.stop();

        outgoing.destroy();

      });

    }

    // Fade in new track

    this.fadeVolume(incoming, 0, MUSIC\_VOLUME, FADE\_DURATION\_MS);

    this.current    \= incoming;

    this.currentKey \= key;

  }

**playOnce() — non-looping tracks (T1 and T6), callback on end**

  playOnce(key: TrackKey, onComplete?: () \=\> void): void {

    if (this.muted) return;

    this.play(key, false);

    if (onComplete && this.current) {

      this.current.once('complete', onComplete);

    }

  }

**resolveTrack() — determines correct track for a zone \+ phase**

  resolveTrack(zoneName: string, phase: string): TrackKey {

    if (ALWAYS\_NIGHT\_ZONES.has(zoneName)) return TRACKS.TOWN\_NIGHT;

    const ring \= ZONE\_RING\[zoneName\] ?? 3;

    if (ring \<= 2\) {

      return (phase \=== 'NIGHT' || phase \=== 'LATE\_NIGHT')

        ? TRACKS.TOWN\_NIGHT

        : TRACKS.TOWN\_DAY;

    }

    return TRACKS.FRINGE;

  }

**onZoneChange() — call when player moves to a new zone**

  onZoneChange(zoneName: string, phase: string): void {

    if (this.currentKey \=== TRACKS.COMBAT) return;  // never interrupt combat

    if (this.currentKey \=== TRACKS.SUCCESSION) return;  // never interrupt succession

    const track \= this.resolveTrack(zoneName, phase);

    this.play(track);

  }

**onCombatStart() / onCombatEnd()**

  onCombatStart(): void {

    this.precombtKey \= this.currentKey;  // remember what was playing

    this.play(TRACKS.COMBAT);

  }

  onCombatEnd(zoneName: string, phase: string): void {

    const resumeKey \= this.precombtKey ?? this.resolveTrack(zoneName, phase);

    this.precombtKey \= null;

    this.play(resumeKey);

  }

**onCharacterDeath() / onRetire()**

  onCharacterDeath(zoneName: string, phase: string): void {

    // Fade out everything, play succession theme once, return to ambient

    const returnTo \= this.resolveTrack(zoneName, phase);

    this.playOnce(TRACKS.SUCCESSION, () \=\> {

      this.play(returnTo);

    });

  }

  onRetire(zoneName: string, phase: string): void {

    this.onCharacterDeath(zoneName, phase);  // same music flow

  }

**onTitleScreen() / onChronicleSeal()**

  onTitleScreen(): void {

    this.playOnce(TRACKS.MAIN\_THEME, () \=\> {

      // Silence after title — ambient starts when player enters world

    });

  }

  onChronicleSeal(): void {

    // Remember current ambient, play theme, return

    const returnKey \= this.currentKey ?? TRACKS.TOWN\_DAY;

    this.playOnce(TRACKS.MAIN\_THEME, () \=\> {

      if (returnKey) this.play(returnKey);

    });

  }

**mute() / unmute() / setVolume()**

  mute(): void {

    this.muted \= true;

    this.current?.setVolume(0);

  }

  unmute(): void {

    this.muted \= false;

    this.current?.setVolume(MUSIC\_VOLUME);

  }

  setVolume(v: number): void {

    this.current?.setVolume(this.muted ? 0 : v);

  }

**fadeVolume() — internal helper using Phaser tweens**

  private fadeVolume(

    sound: Phaser.Sound.WebAudioSound,

    from: number, to: number,

    duration: number,

    onComplete?: () \=\> void

  ): void {

    let elapsed \= 0;

    const step \= 50;  // ms per tick

    const interval \= setInterval(() \=\> {

      elapsed \+= step;

      const t \= Math.min(elapsed / duration, 1);

      sound.setVolume(from \+ (to \- from) \* t);

      if (t \>= 1\) {

        clearInterval(interval);

        onComplete?.();

      }

    }, step);

  }

}

| Note on Phaser.Sound.WebAudioSoundManager: game2d.html currently uses Phaser’s default sound config. To enable WebAudio explicitly, add { type: Phaser.WEBGL, audio: { disableWebAudio: false } } to the Phaser game config. Mobile browsers may require a user gesture before audio can play — the first tap/click on the title screen satisfies this requirement. |
| :---- |

# **5  Wiring Into game2d.html**

All integration points are in game2d.html (the Phaser 3 client). If the client split from the efficiency protocol is in progress, wire into the equivalent module. The integration points are the same regardless of whether the code lives in one file or ten.

## **5A  Add AudioManager to the Phaser scene**

// At the top of the \<script\> block, after Phaser imports:

// import { AudioManager, TRACKS } from './js/audio-manager.js';

// (or inline the class if not using ES modules yet)

let audioManager;   // declared at scene/global scope

## **5B  Preload — inside Phaser scene preload()**

function preload() {

  // ... existing asset loads ...

  audioManager \= new AudioManager(this.sound);

  audioManager.preload(this);  // registers all 6 tracks with Phaser’s loader

}

## **5C  Create — inside Phaser scene create()**

function create() {

  // ... existing create logic ...

  audioManager.onTitleScreen();  // plays T1 once on first load

}

## **5D  WebSocket message handler — state update listener**

The server sends zone and phase data in the state sync message. Hook into the existing WebSocket message handler where the client processes server state updates:

ws.onmessage \= (event) \=\> {

  const msg \= JSON.parse(event.data);

  if (msg.type \=== 'state:sync' || msg.type \=== 'state:full') {

    const { zone, dayPhase } \= msg.data.character;

    // ... existing state update logic ...

    audioManager.onZoneChange(zone, dayPhase);

  }

  if (msg.type \=== 'combat:started') {

    audioManager.onCombatStart();

  }

  if (msg.type \=== 'combat:ended') {

    const { zone, dayPhase } \= msg.data.character;

    audioManager.onCombatEnd(zone, dayPhase);

  }

  if (msg.type \=== 'character:died') {

    const { zone, dayPhase } \= msg.data;

    audioManager.onCharacterDeath(zone, dayPhase);

  }

  if (msg.type \=== 'action:result' && msg.data.action \=== 'RETIRE') {

    const { zone, dayPhase } \= msg.data.character;

    audioManager.onRetire(zone, dayPhase);

  }

  if (msg.type \=== 'chronicle:yearSealed') {

    audioManager.onChronicleSeal();

  }

};

## **5E  Mute button in the HUD**

Add a mute toggle to the existing sidebar or HUD. Wire it to audioManager.mute() and audioManager.unmute(). Persist the preference in localStorage so it survives page refresh.

// In the sidebar HTML section:

// \<button id='mute-btn' onclick='toggleMute()'\>&\#128266;\</button\>

function toggleMute() {

  const btn \= document.getElementById('mute-btn');

  if (localStorage.getItem('musicMuted') \=== 'true') {

    audioManager.unmute();

    localStorage.setItem('musicMuted', 'false');

    btn.textContent \= '🔊';

  } else {

    audioManager.mute();

    localStorage.setItem('musicMuted', 'true');

    btn.textContent \= '🔇';

  }

}

// On page load, restore mute preference:

if (localStorage.getItem('musicMuted') \=== 'true') audioManager.mute();

# **6  Server-Side Event Additions — gateway.ts**

The audio manager on the client reacts to server messages. A few message types may not yet exist in gateway.ts. These are the additions needed.

## **6A  New WebSocket message types to emit**

| Message type | Emitted when | Payload needed by client |
| :---- | :---- | :---- |
| combat:started | FIGHT\_PVE, TOURNAMENT entered, DUEL\_ACCEPT processed | { characterId, zone, dayPhase } |
| combat:ended | Combat resolution completes (win or lose) | { characterId, zone, dayPhase, result: 'win'|'lose' } |
| character:died | killCharacter() called (already in character module) | { characterId, zone, dayPhase, cause } |
| chronicle:yearSealed | sealYear() called in chronicle module | { year, entryCount } |

## **6B  Where to add each emit in gateway.ts**

**combat:started — in the FIGHT\_PVE / TOURNAMENT / DUEL\_ACCEPT handlers**

// After validating the combat action but before processing:

ws.send(JSON.stringify({

  type: 'combat:started',

  data: { characterId: charId, zone: char.zone, dayPhase: gameState.dayPhase }

}));

**combat:ended — after combat resolution in the same handlers**

// After calculateCombatPower() resolves and result is determined:

ws.send(JSON.stringify({

  type: 'combat:ended',

  data: {

    characterId: charId,

    zone: char.zone,

    dayPhase: gameState.dayPhase,

    result: attackerWon ? 'win' : 'lose'

  }

}));

**character:died — subscribe to the CharacterDied event on the EventBus**

// In gateway.ts startup / init block — subscribe to the existing event:

eventBus.on('CharacterDied', ({ characterId, cause }) \=\> {

  const char \= gameState.characters.get(characterId);

  const ws   \= getConnectionForCharacter(characterId);  // your session lookup

  if (ws && char) {

    ws.send(JSON.stringify({

      type: 'character:died',

      data: { characterId, zone: char.zone, dayPhase: gameState.dayPhase, cause }

    }));

  }

});

**chronicle:yearSealed — subscribe to the YearSealed event**

eventBus.on('YearSealed', ({ year, entryCount }) \=\> {

  // Broadcast to all connected clients — it’s a world event

  broadcastToAll(JSON.stringify({

    type: 'chronicle:yearSealed',

    data: { year, entryCount }

  }));

});

| The EventBus already publishes CharacterDied (from character module) and the chronicle module already calls sealYear(). You are subscribing to existing events — not adding new logic to the simulation. This is architecturally clean. |
| :---- |

# **7  Implementation Checklist**

Complete in order. Steps 1–4 are file delivery (no code). Steps 5–12 are code. Steps 13–18 are live testing. Do not skip the tests — audio bugs are silent and easy to miss.

| \# | Step | Where |
| ----- | :---- | :---- |
| **1** | Generate T1–T6 in Suno using the style prompts in Section 1 | Suno |
| **2** | Download each track as MP3 and OGG | Suno export |
| **3** | Rename files exactly as specified in Section 2 | File system |
| **4** | Place all 12 files in public/assets/audio/music/ (create folder) | File system |
| **5** | Create public/js/audio-manager.ts with the full class from Section 4 | game2d.html or new file |
| **6** | Add preload() call in Phaser scene preload() | game2d.html |
| **7** | Add create() call (onTitleScreen) in Phaser scene create() | game2d.html |
| **8** | Wire all WebSocket message types in the ws.onmessage handler (Section 5D) | game2d.html |
| **9** | Add mute button to HUD with localStorage persistence (Section 5E) | game2d.html |
| **10** | Add combat:started and combat:ended emits in the relevant action handlers | gateway.ts or handlers/combat.ts |
| **11** | Subscribe to CharacterDied EventBus event and emit character:died WS message | gateway.ts |
| **12** | Subscribe to YearSealed EventBus event and broadcast chronicle:yearSealed | gateway.ts |
| **13** | Test: load title screen — T1 should play once | Browser |
| **14** | Test: walk from The Commons to Thornwood Fringe — T2 → T4 cross-fade | Browser |
| **15** | Test: start a FIGHT\_PVE — T5 starts. Combat ends — T4 resumes | Browser |
| **16** | Test: character death flow — T6 plays once then ambient resumes | Browser |
| **17** | Test: night phase in Ironhold Market — T3 plays instead of T2 | Browser |
| **18** | Test: mute button — audio stops. Refresh — stays muted. Unmute — resumes | Browser |

| Mobile note: iOS Safari and Chrome on Android require a user gesture before playing audio. The first tap on the title screen or the ‘Connect’ button satisfies this. If testing on mobile and audio does not play, add a one-time touch listener that calls audioManager.unmute() and then removes itself. |
| :---- |

