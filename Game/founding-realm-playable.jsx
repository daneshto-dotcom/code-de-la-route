
import { useState, useEffect, useCallback, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// EMBEDDED SIMULATION ENGINE (distilled from TypeScript core)
// ═══════════════════════════════════════════════════════════════

const CLASSES = {
  PEASANT:    { balance: 20,  label: "Peasant",    zone: "ashwood",   desc: "Start poor. Rise highest. Claim land, build settlements, become Village Elder." },
  MERCHANT:   { balance: 200, label: "Merchant",   zone: "market",    desc: "Start rich in coin. Buy low, sell high. Control the economy." },
  ARTISAN:    { balance: 80,  label: "Artisan",    zone: "anvil",     desc: "Start with tools. Craft goods the realm needs. Found a guild." },
  KNIGHT:     { balance: 150, label: "Knight",     zone: "garrison",  desc: "Start armed. Patrol, fight, protect. Earn Honor through valor." },
  NOBLE:      { balance: 400, label: "Noble",      zone: "court",     desc: "Start wealthy. Spend to gain influence. Shape the laws." },
  ROGUE:      { balance: 60,  label: "Rogue",      zone: "fringe",    desc: "Start in shadow. Steal, spy, trade secrets. The underworld awaits." },
  MONK:       { balance: 40,  label: "Monk",       zone: "scriptorium", desc: "Start wise. Research lore, draft documents, counsel the powerful." },
  RANGER:     { balance: 60,  label: "Ranger",     zone: "wild",      desc: "Start free. Scout the wilderness. Find what others cannot." },
  ADVENTURER: { balance: 100, label: "Adventurer", zone: "hearth",    desc: "Start flexible. Quest for coin and glory. Go where the wind takes you." },
};

const RANK_TITLES = {
  PEASANT:    ["Peasant","Freeholder","Yeoman","Steward","Village Elder"],
  MERCHANT:   ["Peddler","Trader","Merchant","Master Merchant","Consortium Elder"],
  ARTISAN:    ["Apprentice","Journeyman","Craftsman","Master Artisan","Guild Master"],
  KNIGHT:     ["Squire","Man-at-Arms","Knight","Knight-Captain","Knight-Commander"],
  NOBLE:      ["Courtier","Lord","High Lord","Councillor","Regent"],
  ROGUE:      ["Cutpurse","Footpad","Rogue","Shadow Agent","Shadow Master"],
  MONK:       ["Novice","Scholar","Sage","Lorekeeper","Chancellor"],
  RANGER:     ["Tracker","Pathfinder","Ranger","Warden","Grand Warden"],
  ADVENTURER: ["Wanderer","Adventurer","Veteran","Champion","Legend"],
};

const REP_THRESHOLDS = [
  { t: 50, titles: { HONOR:"Trusted", GUILD:"Recognized", SHADOW:"Known", CROWN:"Noted" }},
  { t: 100, titles: { HONOR:"Honorable", GUILD:"Established", SHADOW:"Trusted (Shadow)", CROWN:"Favored" }},
  { t: 250, titles: { HONOR:"Knight's Regard", GUILD:"Master-Grade", SHADOW:"Inner Circle", CROWN:"Privy Counsel" }},
  { t: 500, titles: { HONOR:"Paragon", GUILD:"Guild Pillar", SHADOW:"Shadow Lieutenant", CROWN:"Lord Protector" }},
];

const ZONES = [
  { id:"court",       name:"The Sovereign's Court", ring:0, safe:"safe",     build:false, desc:"Seat of power. Council sessions, audiences, ceremonies." },
  { id:"scriptorium", name:"The Scriptorium",       ring:0, safe:"safe",     build:false, desc:"Knowledge and law. Lore research, legal documents, Chronicle." },
  { id:"gate",        name:"The Crown Gate",         ring:1, safe:"safe",     build:false, desc:"The threshold. Where new arrivals enter the Realm." },
  { id:"market",      name:"Market Row",             ring:1, safe:"moderate", build:false, desc:"Commerce. Buy, sell, trade. The economic heart." },
  { id:"commons",     name:"The Commons",            ring:1, safe:"safe",     build:false, desc:"Public gathering. Announcements, festivals, community." },
  { id:"anvil",       name:"The Anvil Quarter",      ring:1, safe:"safe",     build:false, desc:"Craft workshops. Forges ring, looms weave, goods are made." },
  { id:"hearth",      name:"The Hearth",             ring:1, safe:"safe",     build:false, desc:"Main tavern. Food, drink, quests, gossip, gambling." },
  { id:"sanctuary",   name:"The Sanctuary",          ring:1, safe:"safe",     build:false, desc:"Healing. Rest. Recovery. The physician tends all." },
  { id:"ashwood",     name:"Ashwood",                ring:2, safe:"moderate", build:true,  desc:"First settlement zone. Build your home. Grow a community." },
  { id:"millbrook",   name:"Millbrook",              ring:2, safe:"moderate", build:true,  desc:"Second settlement. The old mill ruins. A fresh start." },
  { id:"ferriers",    name:"Ferrier's Rest",         ring:2, safe:"moderate", build:true,  desc:"Third settlement. Pastoral land near the Stable Yard." },
  { id:"garrison",    name:"The Garrison",           ring:2, safe:"moderate", build:false, desc:"Military HQ. Training, patrols, the Order of the Gate." },
  { id:"lists",       name:"The Lists",              ring:2, safe:"moderate", build:false, desc:"Tournament grounds. PvP combat. Glory and wagering." },
  { id:"tankard",     name:"The Silver Tankard",     ring:2, safe:"moderate", build:false, desc:"Rough tavern. Syndicate whispers. High-stakes gambling." },
  { id:"stable",      name:"The Stable Yard",        ring:2, safe:"moderate", build:false, desc:"Trade caravans. Delivery quests. Future mount system." },
  { id:"fringe",      name:"The Fringe",             ring:3, safe:"low",     build:false, desc:"Criminal underworld. Shadow economy. The Syndicate." },
  { id:"wild",        name:"The Wild",               ring:3, safe:"low",     build:false, desc:"Untamed forest. Exploration, rare resources, danger." },
];

const RING_NAMES = ["The Heart","The Town","The Settlements","The Frontier"];

const QUEST_POOL = [
  { title:"Haul Stone to Market", type:"LABOR", reward:12, rep:{track:"HONOR",amt:2}, desc:"Carry stone from the quarry." },
  { title:"Clear the North Path", type:"LABOR", reward:15, rep:{track:"HONOR",amt:3}, desc:"Remove debris blocking the road." },
  { title:"Letter to the Chancellor", type:"DELIVERY", reward:8, rep:{track:"CROWN",amt:3}, desc:"Deliver a sealed letter." },
  { title:"Herbs for the Sanctuary", type:"GATHERING", reward:18, rep:{track:"GUILD",amt:3}, desc:"Gather healing herbs from the Wild." },
  { title:"Bandit Camp", type:"COMBAT", reward:40, rep:{track:"HONOR",amt:10}, desc:"Clear a bandit camp near the Wild." },
  { title:"The Missing Grain", type:"INVESTIGATION", reward:30, rep:{track:"CROWN",amt:5}, desc:"Find the lost grain shipment." },
  { title:"Dig a Well", type:"LABOR", reward:16, rep:{track:"HONOR",amt:5}, desc:"Help settlers dig a communal well." },
  { title:"Iron for the Smith", type:"GATHERING", reward:20, rep:{track:"GUILD",amt:4}, desc:"Mine iron ore from the eastern ridge." },
  { title:"Supply the Garrison", type:"DELIVERY", reward:12, rep:{track:"HONOR",amt:3}, desc:"Deliver rations to Captain Dael." },
  { title:"Gather Petition Signatures", type:"POLITICAL", reward:25, rep:{track:"CROWN",amt:8}, desc:"Collect 5 signatures from elders." },
  { title:"Scout the Eastern Ridge", type:"GATHERING", reward:22, rep:{track:"HONOR",amt:4}, desc:"Map the terrain beyond Ashwood." },
  { title:"Deliver Ale to the Tankard", type:"DELIVERY", reward:10, rep:{track:"GUILD",amt:2}, desc:"The Silver Tankard needs restocking." },
];

function genId() { return Math.random().toString(36).slice(2,10); }

function createRealm(charName, charClass, householdName) {
  const cls = CLASSES[charClass];
  const charId = "c_" + genId();
  const hhId = "hh_" + genId();
  const quests = shuffle(QUEST_POOL).slice(0,5).map(q => ({...q, id:"q_"+genId(), status:"AVAILABLE"}));
  return {
    clock: { day:1, season:"SPRING", year:1601, phase:"DAWN", dayPhase:0 },
    character: {
      id:charId, name:charName, class:charClass, rank:1, age:18, birthYear:1583,
      status:"ACTIVE", zone:cls.zone, hunger:80, balance:cls.balance,
    },
    household: { id:hhId, name:householdName, treasury:0, generation:1, repAggregate:0 },
    reputation: { HONOR:0, GUILD:0, SHADOW:0, CROWN:0 },
    titles: [],
    settlements: [],
    guilds: [],
    quests,
    chronicle: [],
    transactions: [],
    log: [],
    totalDays: 0,
  };
}

function shuffle(arr) { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

function addLog(realm, msg) {
  realm.log = [`[Y${realm.clock.year} ${realm.clock.season} D${realm.clock.day}] ${msg}`, ...realm.log.slice(0,99)];
}

function addChronicle(realm, title, desc, sig, tags=[]) {
  realm.chronicle.push({
    id:"ce_"+genId(), year:realm.clock.year, season:realm.clock.season, day:realm.clock.day,
    title, description:desc, significance:sig, tags, sealed:false,
  });
}

function checkTitles(realm) {
  for (const {t, titles} of REP_THRESHOLDS) {
    for (const track of ["HONOR","GUILD","SHADOW","CROWN"]) {
      if (realm.reputation[track] >= t && !realm.titles.find(x => x.name === titles[track])) {
        const title = titles[track];
        realm.titles.push({ name:title, track, threshold:t, year:realm.clock.year });
        addLog(realm, `🏅 Title earned: "${title}" (${track} ${t})`);
        addChronicle(realm, `Title Granted: ${title}`, `${realm.character.name} earned the title "${title}" for reaching ${t} ${track.toLowerCase()}.`, "MINOR", ["title"]);
      }
    }
  }
}

function checkRankUp(realm) {
  const c = realm.character;
  const repSum = realm.reputation.HONOR + realm.reputation.GUILD + realm.reputation.CROWN;
  const thresholds = [0, 80, 200, 400, 700];
  const newRank = Math.min(5, thresholds.filter(t => repSum >= t).length);
  if (newRank > c.rank) {
    c.rank = newRank;
    const title = RANK_TITLES[c.class]?.[newRank-1] || `Rank ${newRank}`;
    addLog(realm, `⬆️ Advanced to ${title} (Rank ${newRank})`);
    addChronicle(realm, `${realm.character.name} Advances`, `${realm.character.name} was recognized as ${title}.`, "MINOR", ["rank"]);
  }
}

function advanceDay(realm) {
  const ck = realm.clock;
  ck.day++;
  realm.totalDays++;
  realm.character.hunger = Math.max(0, realm.character.hunger - 15);

  // Season boundaries
  if (ck.day === 16) { ck.season = "SUMMER"; addLog(realm, "☀️ Summer begins."); }
  if (ck.day === 31) { ck.season = "AUTUMN"; addLog(realm, "🍂 Autumn begins. Harvest time."); }
  if (ck.day === 46) { ck.season = "WINTER"; addLog(realm, "❄️ Winter begins. Scarcity ahead."); }

  // Year rollover
  if (ck.day > 60) {
    const oldYear = ck.year;
    ck.year++; ck.day = 1; ck.season = "SPRING";
    realm.character.age = ck.year - realm.character.birthYear;
    // Seal chronicle
    realm.chronicle.forEach(e => { if (e.year === oldYear) e.sealed = true; });
    addLog(realm, `📜 Year ${oldYear} ends. The Chronicle is sealed. Year ${ck.year} begins.`);
    addChronicle(realm, `Year ${ck.year} Begins`, `A new year dawns over the Realm of Chazeuil.`, "MAJOR", ["year"]);
    // Settlement decay
    realm.settlements.forEach(s => { s.condition = Math.max(0, s.condition - 5); });
    // Refresh quests
    realm.quests = shuffle(QUEST_POOL).slice(0,5).map(q => ({...q, id:"q_"+genId(), status:"AVAILABLE"}));
  }

  // Daily quest refresh (every 3 days)
  if (ck.day % 3 === 0) {
    const avail = realm.quests.filter(q => q.status === "AVAILABLE").length;
    if (avail < 3) {
      const newQ = shuffle(QUEST_POOL).slice(0,3).map(q => ({...q, id:"q_"+genId(), status:"AVAILABLE"}));
      realm.quests = [...realm.quests.filter(q => q.status !== "AVAILABLE"), ...newQ];
    }
  }

  // Food price modifier by season
  const foodCost = ck.season === "WINTER" ? 5 : ck.season === "AUTUMN" ? 2 : 3;
  return { foodCost };
}

function getSeasonalWageMultiplier(season) {
  return season === "WINTER" ? 0.7 : season === "SUMMER" ? 1.2 : 1.0;
}

// ═══════════════════════════════════════════════════════════════
// ZONE-BASED ACTIONS
// ═══════════════════════════════════════════════════════════════

function getActionsForZone(zoneId, realm) {
  const actions = [];
  const c = realm.character;
  const zone = ZONES.find(z => z.id === zoneId);
  if (!zone) return actions;

  // Universal actions
  actions.push({ id:"rest", label:"Rest", icon:"🛏️", desc:"Rest to recover hunger (+30)", category:"basic" });

  // Zone-specific
  if (zone.id === "market") {
    actions.push({ id:"trade_sell", label:"Sell Goods", icon:"💰", desc:`Sell crafted goods (earn 15-25d)`, category:"economy" });
    actions.push({ id:"trade_buy", label:"Buy Supplies", icon:"🛒", desc:"Buy materials (cost 8-15d)", category:"economy" });
  }
  if (zone.id === "hearth" || zone.id === "tankard") {
    const cost = realm.clock.season === "WINTER" ? 5 : 3;
    actions.push({ id:"eat", label:`Eat (${cost}d)`, icon:"🍞", desc:`Eat a meal. Restores hunger to 100.`, category:"basic" });
    if (zone.id === "tankard") {
      actions.push({ id:"gamble", label:"Gamble", icon:"🎲", desc:"Roll dice. Win or lose 5-20d.", category:"economy" });
    }
  }
  if (zone.id === "anvil") {
    actions.push({ id:"craft", label:"Craft Goods", icon:"🔨", desc:"Craft items (earn 10-20d, +3 Guild)", category:"economy" });
  }
  if (zone.id === "garrison") {
    actions.push({ id:"patrol", label:"Patrol", icon:"⚔️", desc:"Patrol the roads (earn 12-20d, +5 Honor)", category:"combat" });
    actions.push({ id:"train", label:"Train", icon:"🏋️", desc:"Combat training (+3 Honor)", category:"combat" });
  }
  if (zone.id === "court") {
    actions.push({ id:"petition", label:"Petition Sovereign", icon:"👑", desc:"Seek audience (+5 Crown, costs 10d)", category:"political" });
    if (c.class === "NOBLE") {
      actions.push({ id:"patronage", label:"Commission Work", icon:"📜", desc:"Fund construction (costs 50d, +10 Crown)", category:"political" });
    }
  }
  if (zone.id === "scriptorium") {
    actions.push({ id:"research", label:"Research Lore", icon:"📚", desc:"Study (+5 Crown, +3 Guild)", category:"knowledge" });
  }
  if (zone.id === "fringe") {
    actions.push({ id:"shadow_work", label:"Shadow Work", icon:"🗡️", desc:"Syndicate job (earn 15-30d, +8 Shadow)", category:"criminal" });
  }
  if (zone.id === "wild") {
    actions.push({ id:"forage", label:"Forage", icon:"🌿", desc:"Gather herbs and resources (earn 8-18d, +2 Guild)", category:"gathering" });
    actions.push({ id:"scout", label:"Scout", icon:"🔭", desc:"Explore unknown areas (+5 Honor)", category:"gathering" });
  }
  if (zone.build) {
    actions.push({ id:"work_labor", label:"Do Labor", icon:"⛏️", desc:`Work for wages (earn 8-15d)`, category:"economy" });
    const stl = realm.settlements.find(s => s.zone === zoneId);
    if (!stl) {
      actions.push({ id:"found_settlement", label:"Found Settlement", icon:"🏘️", desc:"Claim this land. Found a new settlement.", category:"settlement" });
    } else {
      actions.push({ id:"build", label:"Build Structure", icon:"🏗️", desc:`Build in ${stl.name} (costs 20d)`, category:"settlement" });
      actions.push({ id:"maintain", label:"Maintain", icon:"🔧", desc:`Repair structures (+15 condition)`, category:"settlement" });
    }
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════
// MAIN GAME COMPONENT
// ═══════════════════════════════════════════════════════════════

const SCREENS = { TITLE:"TITLE", CREATE:"CREATE", GAME:"GAME" };
const TABS = { MAP:"MAP", STATUS:"STATUS", ACTIONS:"ACTIONS", QUESTS:"QUESTS", CHRONICLE:"CHRONICLE", REGISTRY:"REGISTRY", HOUSEHOLD:"HOUSEHOLD" };

export default function FoundingRealm() {
  const [screen, setScreen] = useState(SCREENS.TITLE);
  const [tab, setTab] = useState(TABS.MAP);
  const [realm, setRealm] = useState(null);
  const [charName, setCharName] = useState("");
  const [charClass, setCharClass] = useState("PEASANT");
  const [hhName, setHhName] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Try load on mount
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("realm-save");
        if (result?.value) {
          const parsed = JSON.parse(result.value);
          setRealm(parsed);
          setScreen(SCREENS.GAME);
        }
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const saveGame = useCallback(async (r) => {
    try { await window.storage.set("realm-save", JSON.stringify(r)); } catch {}
  }, []);

  const update = useCallback((fn) => {
    setRealm(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      fn(next);
      checkTitles(next);
      checkRankUp(next);
      saveGame(next);
      return next;
    });
  }, [saveGame]);

  const doAction = useCallback((actionId) => {
    update((r) => {
      const c = r.character;
      const season = r.clock.season;
      const wm = getSeasonalWageMultiplier(season);
      const roll = (min,max) => min + Math.floor(Math.random()*(max-min+1));

      switch(actionId) {
        case "rest":
          c.hunger = Math.min(100, c.hunger + 30);
          addLog(r, "You rest and recover.");
          break;
        case "eat": {
          const cost = season === "WINTER" ? 5 : 3;
          if (c.balance < cost) { addLog(r, "❌ Not enough coin for food."); return; }
          c.balance -= cost; c.hunger = 100;
          r.transactions.push({type:"FOOD",amount:cost,day:r.clock.day,year:r.clock.year});
          addLog(r, `Ate a meal for ${cost}d. Hunger restored.`);
          break;
        }
        case "work_labor": {
          const wage = Math.round(roll(8,15) * wm);
          c.balance += wage;
          r.transactions.push({type:"LABOR",amount:wage,day:r.clock.day,year:r.clock.year});
          addLog(r, `Worked for ${wage}d.`);
          break;
        }
        case "trade_sell": {
          const earn = roll(15,25);
          c.balance += earn;
          r.reputation.GUILD += 2;
          r.transactions.push({type:"SELL",amount:earn,day:r.clock.day,year:r.clock.year});
          addLog(r, `Sold goods for ${earn}d. (+2 Guild)`);
          break;
        }
        case "trade_buy": {
          const cost = roll(8,15);
          if (c.balance < cost) { addLog(r, "❌ Not enough coin."); return; }
          c.balance -= cost;
          r.transactions.push({type:"BUY",amount:-cost,day:r.clock.day,year:r.clock.year});
          addLog(r, `Bought supplies for ${cost}d.`);
          break;
        }
        case "craft": {
          const earn = roll(10,20);
          c.balance += earn;
          r.reputation.GUILD += 3;
          addLog(r, `Crafted goods worth ${earn}d. (+3 Guild)`);
          break;
        }
        case "patrol": {
          const earn = roll(12,20);
          c.balance += earn;
          r.reputation.HONOR += 5;
          addLog(r, `Patrolled the roads. Earned ${earn}d. (+5 Honor)`);
          break;
        }
        case "train":
          r.reputation.HONOR += 3;
          addLog(r, "Trained at the Garrison. (+3 Honor)");
          break;
        case "petition":
          if (c.balance < 10) { addLog(r, "❌ Need 10d for audience fee."); return; }
          c.balance -= 10;
          r.reputation.CROWN += 5;
          addLog(r, "Petitioned the Sovereign. (+5 Crown)");
          break;
        case "patronage":
          if (c.balance < 50) { addLog(r, "❌ Need 50d for patronage."); return; }
          c.balance -= 50;
          r.reputation.CROWN += 10;
          addLog(r, "Commissioned construction work. (+10 Crown)");
          addChronicle(r, "Noble Patronage", `${c.name} funded construction in the realm.`, "MINOR", ["patronage"]);
          break;
        case "research":
          r.reputation.CROWN += 5;
          r.reputation.GUILD += 3;
          addLog(r, "Researched ancient lore. (+5 Crown, +3 Guild)");
          break;
        case "shadow_work": {
          const earn = roll(15,30);
          c.balance += earn;
          r.reputation.SHADOW += 8;
          addLog(r, `Completed shadow work. Earned ${earn}d. (+8 Shadow)`);
          break;
        }
        case "forage": {
          const earn = roll(8,18);
          c.balance += earn;
          r.reputation.GUILD += 2;
          addLog(r, `Foraged resources worth ${earn}d. (+2 Guild)`);
          break;
        }
        case "scout":
          r.reputation.HONOR += 5;
          addLog(r, "Scouted the wilderness. (+5 Honor)");
          break;
        case "gamble": {
          const bet = Math.min(20, c.balance);
          if (bet < 5) { addLog(r, "❌ Need at least 5d to gamble."); return; }
          const win = Math.random() > 0.55;
          if (win) { c.balance += bet; addLog(r, `🎲 Won ${bet}d gambling!`); }
          else { c.balance -= bet; addLog(r, `🎲 Lost ${bet}d gambling.`); }
          break;
        }
        case "found_settlement": {
          const zone = ZONES.find(z => z.id === c.zone);
          if (!zone?.build) return;
          const name = zone.name;
          r.settlements.push({
            id:"s_"+genId(), name, zone:c.zone, tier:1, population:1,
            structures:[], condition:100, foundedYear:r.clock.year, founderId:c.id,
          });
          addLog(r, `🏘️ Founded settlement: ${name}!`);
          addChronicle(r, `${name} Founded`, `${c.name} founded the settlement of ${name} in Year ${r.clock.year}.`, "MAJOR", ["settlement","founding"]);
          break;
        }
        case "build": {
          if (c.balance < 20) { addLog(r, "❌ Need 20d to build."); return; }
          c.balance -= 20;
          const stl = r.settlements.find(s => s.zone === c.zone);
          if (!stl) return;
          const structures = ["Well","Workshop","Guard Post","Granary","Chapel","Tavern","Palisade","Market Post","Fire Pit","Stable"];
          const existing = new Set(stl.structures);
          const available = structures.filter(s => !existing.has(s));
          if (available.length === 0) { addLog(r, "All structures already built."); c.balance += 20; return; }
          const built = available[Math.floor(Math.random()*available.length)];
          stl.structures.push(built);
          // Check tier
          const pop = stl.population;
          const str = stl.structures.length;
          if (pop >= 15 && str >= 6 && stl.tier < 3) { stl.tier = 3; addLog(r, `🏘️ ${stl.name} advanced to Village!`); addChronicle(r, `${stl.name} Grows`, `${stl.name} advanced to Village tier.`, "MAJOR", ["settlement","growth"]); }
          else if (pop >= 5 && str >= 3 && stl.tier < 2) { stl.tier = 2; addLog(r, `🏘️ ${stl.name} advanced to Hamlet!`); addChronicle(r, `${stl.name} Grows`, `${stl.name} advanced to Hamlet tier.`, "MAJOR", ["settlement","growth"]); }
          addLog(r, `🏗️ Built ${built} in ${stl.name}.`);
          addChronicle(r, `Structure Built`, `A ${built} was built in ${stl.name}.`, "MINOR", ["settlement","structure"]);
          break;
        }
        case "maintain": {
          const stl = r.settlements.find(s => s.zone === c.zone);
          if (!stl) return;
          stl.condition = Math.min(100, stl.condition + 15);
          addLog(r, `🔧 Maintained ${stl.name}. Condition: ${stl.condition}%`);
          break;
        }
      }
    });
  }, [update]);

  const doAdvanceDay = useCallback(() => {
    update((r) => {
      advanceDay(r);
      addLog(r, `— Day ${r.clock.day}, ${r.clock.season}, Year ${r.clock.year} —`);
    });
  }, [update]);

  const doAcceptQuest = useCallback((questId) => {
    update((r) => {
      const q = r.quests.find(q => q.id === questId);
      if (q && q.status === "AVAILABLE") {
        q.status = "ACCEPTED";
        addLog(r, `📋 Accepted quest: "${q.title}"`);
      }
    });
  }, [update]);

  const doCompleteQuest = useCallback((questId) => {
    update((r) => {
      const q = r.quests.find(q => q.id === questId);
      if (q && q.status === "ACCEPTED") {
        q.status = "COMPLETED";
        r.character.balance += q.reward;
        if (q.rep) r.reputation[q.rep.track] = (r.reputation[q.rep.track]||0) + q.rep.amt;
        addLog(r, `✅ Completed "${q.title}": +${q.reward}d${q.rep ? `, +${q.rep.amt} ${q.rep.track}` : ""}`);
        if (q.type === "COMBAT" || q.type === "INVESTIGATION") {
          addChronicle(r, `Quest: ${q.title}`, `${r.character.name} completed the quest "${q.title}".`, "MINOR", ["quest"]);
        }
      }
    });
  }, [update]);

  const doTravel = useCallback((zoneId) => {
    update((r) => {
      const zone = ZONES.find(z => z.id === zoneId);
      r.character.zone = zoneId;
      addLog(r, `🚶 Traveled to ${zone?.name || zoneId}.`);
    });
  }, [update]);

  const doCharterGuild = useCallback((name, type) => {
    update((r) => {
      if (r.character.balance < 30) { addLog(r, "❌ Need 30d for charter fee."); return; }
      r.character.balance -= 30;
      r.guilds.push({ id:"g_"+genId(), name, type, status:"ACTIVE", members:1, treasury:0, foundedYear:r.clock.year });
      r.reputation.GUILD += 10;
      addLog(r, `⚒️ Chartered guild: ${name} (+10 Guild)`);
      addChronicle(r, `${name} Chartered`, `${r.character.name} founded the ${name} guild.`, "MAJOR", ["guild","charter"]);
    });
  }, [update]);

  const doNewGame = useCallback(() => {
    if (!charName.trim() || !hhName.trim()) return;
    const r = createRealm(charName.trim(), charClass, hhName.trim());
    addLog(r, `${charName} of ${hhName} arrives at the Crown Gate.`);
    addChronicle(r, "A New Arrival", `${charName}, a ${CLASSES[charClass].label}, arrived at the Realm of Chazeuil in Year 1601.`, "MINOR", ["arrival"]);
    setRealm(r);
    saveGame(r);
    setScreen(SCREENS.GAME);
    setTab(TABS.MAP);
  }, [charName, charClass, hhName, saveGame]);

  const doDeleteSave = useCallback(async () => {
    try { await window.storage.delete("realm-save"); } catch {}
    setRealm(null);
    setScreen(SCREENS.TITLE);
  }, []);

  if (!loaded) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#0d1520",color:"#c4a44e",fontFamily:"Georgia,serif",fontSize:18}}>Loading the Realm...</div>;

  // ── TITLE SCREEN ────────────────────────────────────
  if (screen === SCREENS.TITLE) {
    return (
      <div style={{minHeight:"100vh",background:"linear-gradient(180deg,#0d1520 0%,#1B2A4A 50%,#0d1520 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"Georgia,serif",color:"#F5F0E1",padding:20}}>
        <div style={{fontSize:14,letterSpacing:6,color:"#8B6914",marginBottom:8,textTransform:"uppercase"}}>Legacy of the Realm</div>
        <h1 style={{fontSize:42,fontWeight:"bold",color:"#F5F0E1",margin:"0 0 4px",textAlign:"center"}}>Founding Realm</h1>
        <div style={{width:60,height:2,background:"#8B6914",margin:"12px 0 20px"}}/>
        <p style={{color:"#8a8577",fontSize:15,maxWidth:420,textAlign:"center",lineHeight:1.6,margin:"0 0 36px"}}>
          The year is 1601. The Great Troubles are over. A Sovereign calls all people to rebuild the Realm of Chazeuil. You are nobody — yet.
        </p>
        <button onClick={() => setScreen(SCREENS.CREATE)} style={{...btnStyle, fontSize:16, padding:"12px 36px", background:"#8B6914", color:"#0d1520", fontWeight:"bold", border:"none"}}>
          Enter the Realm
        </button>
        {realm && (
          <button onClick={() => setScreen(SCREENS.GAME)} style={{...btnStyle, fontSize:14, padding:"10px 28px", marginTop:12, background:"transparent", color:"#8B6914", border:"1px solid #8B6914"}}>
            Continue ({realm.character.name}, Year {realm.clock.year})
          </button>
        )}
      </div>
    );
  }

  // ── CHARACTER CREATION ──────────────────────────────
  if (screen === SCREENS.CREATE) {
    return (
      <div style={{minHeight:"100vh",background:"#0d1520",fontFamily:"Georgia,serif",color:"#F5F0E1",padding:"24px 16px",maxWidth:700,margin:"0 auto"}}>
        <div style={{fontSize:12,letterSpacing:4,color:"#8B6914",textTransform:"uppercase",marginBottom:16}}>Character Creation</div>
        <div style={{marginBottom:20}}>
          <label style={{display:"block",fontSize:13,color:"#8a8577",marginBottom:6}}>Your Name</label>
          <input value={charName} onChange={e=>setCharName(e.target.value)} placeholder="Elara Renard" style={inputStyle}/>
        </div>
        <div style={{marginBottom:20}}>
          <label style={{display:"block",fontSize:13,color:"#8a8577",marginBottom:6}}>Household Name</label>
          <input value={hhName} onChange={e=>setHhName(e.target.value)} placeholder="House Renard" style={inputStyle}/>
        </div>
        <div style={{marginBottom:20}}>
          <label style={{display:"block",fontSize:13,color:"#8a8577",marginBottom:10}}>Choose Your Class</label>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8}}>
            {Object.entries(CLASSES).map(([key, cls]) => (
              <button key={key} onClick={() => setCharClass(key)}
                style={{
                  background: charClass === key ? "#1e3354" : "#111c2e",
                  border: charClass === key ? "1px solid #8B6914" : "1px solid #1e3354",
                  borderRadius:6, padding:"10px 12px", textAlign:"left", cursor:"pointer", color:"#F5F0E1",
                }}>
                <div style={{fontWeight:"bold",fontSize:14,fontFamily:"Georgia,serif"}}>{cls.label}</div>
                <div style={{fontSize:11,color:"#8a8577",marginTop:2,lineHeight:1.4}}>{cls.desc}</div>
                <div style={{fontSize:11,color:"#8B6914",marginTop:4}}>Starting: {cls.balance}d</div>
              </button>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:12,marginTop:24}}>
          <button onClick={doNewGame} disabled={!charName.trim()||!hhName.trim()} style={{...btnStyle, background:charName.trim()&&hhName.trim()?"#8B6914":"#333", color:"#0d1520", fontWeight:"bold", fontSize:15, padding:"10px 28px", border:"none", opacity:charName.trim()&&hhName.trim()?1:0.5}}>
            Begin Your Legacy
          </button>
          <button onClick={() => setScreen(SCREENS.TITLE)} style={{...btnStyle, background:"transparent", color:"#8a8577", border:"1px solid #333", padding:"10px 20px"}}>Back</button>
        </div>
      </div>
    );
  }

  // ── MAIN GAME ───────────────────────────────────────
  if (!realm) return null;
  const c = realm.character;
  const currentZone = ZONES.find(z => z.id === c.zone);
  const currentStl = realm.settlements.find(s => s.zone === c.zone);
  const actions = getActionsForZone(c.zone, realm);
  const repTotal = realm.reputation.HONOR + realm.reputation.GUILD + realm.reputation.CROWN;
  const rankTitle = RANK_TITLES[c.class]?.[c.rank-1] || `Rank ${c.rank}`;

  const tierNames = ["—","Campsite","Hamlet","Village","Town","City"];

  return (
    <div style={{minHeight:"100vh",background:"#0d1520",fontFamily:"Georgia,serif",color:"#F5F0E1",display:"flex",flexDirection:"column"}}>
      {/* HEADER BAR */}
      <div style={{background:"#111c2e",borderBottom:"1px solid #1e3354",padding:"8px 16px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap",fontSize:13}}>
        <span style={{color:"#8B6914",fontWeight:"bold"}}>{c.name}</span>
        <span style={{color:"#8a8577"}}>{rankTitle}</span>
        <span style={{color:"#c4a44e"}}>💰 {c.balance}d</span>
        <span style={{color: c.hunger > 50 ? "#6b8f5e" : c.hunger > 20 ? "#b89c3e" : "#a63d2f"}}>🍞 {c.hunger}%</span>
        <span style={{color:"#8a8577"}}>Y{realm.clock.year} {realm.clock.season} D{realm.clock.day}</span>
        <span style={{color:"#8a8577"}}>Age {c.age}</span>
        <div style={{marginLeft:"auto",display:"flex",gap:8}}>
          <button onClick={doAdvanceDay} style={{...btnSmall,background:"#1e3354",color:"#c4a44e"}}>Next Day →</button>
          <button onClick={doDeleteSave} style={{...btnSmall,background:"transparent",color:"#5a5347",border:"1px solid #2a2520"}}>🗑️</button>
        </div>
      </div>

      {/* TAB BAR */}
      <div style={{background:"#0f1824",borderBottom:"1px solid #1a2740",display:"flex",gap:0,overflowX:"auto"}}>
        {Object.entries(TABS).map(([key, val]) => (
          <button key={key} onClick={() => setTab(val)}
            style={{
              padding:"8px 14px",fontSize:12,fontFamily:"Georgia,serif",cursor:"pointer",border:"none",borderBottom: tab===val ? "2px solid #8B6914" : "2px solid transparent",
              background:"transparent", color: tab===val ? "#F5F0E1" : "#5a5347",
            }}>
            {val}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"auto"}}>
        <div style={{flex:1,padding:"12px 16px",maxWidth:900,margin:"0 auto",width:"100%"}}>

          {/* MAP TAB */}
          {tab === TABS.MAP && (
            <div>
              <div style={{fontSize:13,color:"#8a8577",marginBottom:12}}>
                You are at <span style={{color:"#c4a44e"}}>{currentZone?.name}</span>
                {currentZone && <span> — Ring {currentZone.ring}: {RING_NAMES[currentZone.ring]}</span>}
              </div>
              {[0,1,2,3].map(ring => (
                <div key={ring} style={{marginBottom:16}}>
                  <div style={{fontSize:11,color:"#8B6914",letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>{RING_NAMES[ring]}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {ZONES.filter(z => z.ring === ring).map(z => {
                      const here = z.id === c.zone;
                      const stl = realm.settlements.find(s => s.zone === z.id);
                      return (
                        <button key={z.id} onClick={() => !here && doTravel(z.id)}
                          style={{
                            background: here ? "#1e3354" : "#111c2e",
                            border: here ? "1px solid #8B6914" : "1px solid #1a2740",
                            borderRadius:6,padding:"8px 12px",cursor: here?"default":"pointer",
                            textAlign:"left",minWidth:140,color:"#F5F0E1",
                            opacity: here ? 1 : 0.8,
                          }}>
                          <div style={{fontSize:13,fontWeight:here?"bold":"normal"}}>{here?"📍 ":""}{z.name}</div>
                          <div style={{fontSize:10,color:z.safe==="safe"?"#4a7a4a":z.safe==="moderate"?"#8a7a3a":"#8a3a3a",marginTop:2}}>
                            {z.safe.toUpperCase()}{z.build?" · Buildable":""}
                          </div>
                          {stl && <div style={{fontSize:10,color:"#8B6914",marginTop:1}}>{tierNames[stl.tier]} · Pop: {stl.population}</div>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ACTIONS TAB */}
          {tab === TABS.ACTIONS && (
            <div>
              <div style={{fontSize:13,color:"#8a8577",marginBottom:12}}>
                Actions at <span style={{color:"#c4a44e"}}>{currentZone?.name}</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:8}}>
                {actions.map(a => (
                  <button key={a.id} onClick={() => doAction(a.id)}
                    style={{background:"#111c2e",border:"1px solid #1a2740",borderRadius:6,padding:"10px 12px",cursor:"pointer",textAlign:"left",color:"#F5F0E1"}}>
                    <div style={{fontSize:14}}>{a.icon} {a.label}</div>
                    <div style={{fontSize:11,color:"#8a8577",marginTop:3,lineHeight:1.4}}>{a.desc}</div>
                  </button>
                ))}
              </div>
              <div style={{marginTop:16,fontSize:12,color:"#8a8577"}}>
                {currentZone?.desc}
              </div>
            </div>
          )}

          {/* STATUS TAB */}
          {tab === TABS.STATUS && (
            <div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                <div style={cardStyle}>
                  <div style={cardHeader}>Character</div>
                  <div style={statRow}><span>Name</span><span style={{color:"#c4a44e"}}>{c.name}</span></div>
                  <div style={statRow}><span>Class</span><span>{CLASSES[c.class]?.label}</span></div>
                  <div style={statRow}><span>Rank</span><span>{c.rank}/5 — {rankTitle}</span></div>
                  <div style={statRow}><span>Age</span><span>{c.age}</span></div>
                  <div style={statRow}><span>Balance</span><span style={{color:"#c4a44e"}}>{c.balance}d</span></div>
                  <div style={statRow}><span>Hunger</span><span style={{color: c.hunger > 50 ? "#6b8f5e" : "#a63d2f"}}>{c.hunger}%</span></div>
                  <div style={statRow}><span>Location</span><span>{currentZone?.name}</span></div>
                  <div style={statRow}><span>Days Alive</span><span>{realm.totalDays}</span></div>
                </div>
                <div style={cardStyle}>
                  <div style={cardHeader}>Reputation</div>
                  {["HONOR","GUILD","SHADOW","CROWN"].map(track => {
                    const val = realm.reputation[track];
                    const next = REP_THRESHOLDS.find(t => t.t > val);
                    return (
                      <div key={track} style={{marginBottom:10}}>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
                          <span>{track}</span>
                          <span style={{color:"#c4a44e"}}>{val}</span>
                        </div>
                        <div style={{height:6,background:"#1a2740",borderRadius:3,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${Math.min(100,val/8)}%`,background: track==="SHADOW"?"#5a3a6a":track==="HONOR"?"#4a6a8a":track==="GUILD"?"#6a8a4a":"#8a7a3a",borderRadius:3,transition:"width 0.3s"}}/>
                        </div>
                        {next && <div style={{fontSize:10,color:"#5a5347",marginTop:2}}>Next: {next.titles[track]} at {next.t}</div>}
                      </div>
                    );
                  })}
                  <div style={{...statRow,marginTop:8,borderTop:"1px solid #1a2740",paddingTop:8}}><span>Combined (non-Shadow)</span><span style={{color:"#c4a44e"}}>{repTotal}</span></div>
                </div>
              </div>
              {realm.titles.length > 0 && (
                <div style={cardStyle}>
                  <div style={cardHeader}>Titles Earned</div>
                  {realm.titles.map((t,i) => (
                    <div key={i} style={{fontSize:13,padding:"4px 0",borderBottom:"1px solid #111c2e"}}>
                      <span style={{color:"#c4a44e"}}>{t.name}</span>
                      <span style={{color:"#5a5347",fontSize:11,marginLeft:8}}>{t.track} ≥{t.threshold} · Year {t.year}</span>
                    </div>
                  ))}
                </div>
              )}
              {realm.guilds.length > 0 && (
                <div style={{...cardStyle,marginTop:12}}>
                  <div style={cardHeader}>Guilds</div>
                  {realm.guilds.map((g,i) => (
                    <div key={i} style={{fontSize:13,padding:"4px 0"}}>{g.name} <span style={{color:"#5a5347"}}>({g.type} · {g.status} · {g.members} members)</span></div>
                  ))}
                </div>
              )}
              {realm.guilds.length === 0 && (
                <div style={cardStyle}>
                  <div style={cardHeader}>Guild</div>
                  <p style={{fontSize:12,color:"#5a5347",margin:0}}>No guild membership yet.</p>
                  <button onClick={() => {
                    const name = prompt("Guild name:");
                    if (name) doCharterGuild(name, c.class === "KNIGHT" ? "MILITARY" : c.class === "ROGUE" ? "CRIMINAL" : "TRADE");
                  }} style={{...btnSmall,marginTop:8,background:"#1e3354",color:"#c4a44e"}}>Charter a Guild (30d)</button>
                </div>
              )}
            </div>
          )}

          {/* QUESTS TAB */}
          {tab === TABS.QUESTS && (
            <div>
              <div style={cardHeader}>Available Quests</div>
              {realm.quests.filter(q => q.status === "AVAILABLE").map(q => (
                <div key={q.id} style={{...cardStyle,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:"bold"}}>{q.title}</div>
                    <div style={{fontSize:11,color:"#8a8577",marginTop:2}}>{q.desc}</div>
                    <div style={{fontSize:11,color:"#c4a44e",marginTop:2}}>+{q.reward}d{q.rep ? ` · +${q.rep.amt} ${q.rep.track}` : ""} · {q.type}</div>
                  </div>
                  <button onClick={() => doAcceptQuest(q.id)} style={{...btnSmall,background:"#1e3354",color:"#c4a44e",whiteSpace:"nowrap"}}>Accept</button>
                </div>
              ))}
              <div style={{...cardHeader,marginTop:16}}>Active Quests</div>
              {realm.quests.filter(q => q.status === "ACCEPTED").length === 0 && <p style={{fontSize:12,color:"#5a5347"}}>No active quests.</p>}
              {realm.quests.filter(q => q.status === "ACCEPTED").map(q => (
                <div key={q.id} style={{...cardStyle,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:14}}>{q.title}</div>
                    <div style={{fontSize:11,color:"#c4a44e"}}>+{q.reward}d{q.rep ? ` · +${q.rep.amt} ${q.rep.track}` : ""}</div>
                  </div>
                  <button onClick={() => doCompleteQuest(q.id)} style={{...btnSmall,background:"#2d4a1e",color:"#c4a44e",whiteSpace:"nowrap"}}>Complete ✓</button>
                </div>
              ))}
              <div style={{...cardHeader,marginTop:16}}>Completed ({realm.quests.filter(q => q.status === "COMPLETED").length})</div>
              {realm.quests.filter(q => q.status === "COMPLETED").slice(0,5).map(q => (
                <div key={q.id} style={{fontSize:12,color:"#5a5347",padding:"3px 0"}}>{q.title} ✓</div>
              ))}
            </div>
          )}

          {/* CHRONICLE TAB */}
          {tab === TABS.CHRONICLE && (
            <div>
              <div style={cardHeader}>The Chronicle of the Realm</div>
              {realm.chronicle.length === 0 && <p style={{fontSize:12,color:"#5a5347"}}>The Chronicle is empty. History awaits your deeds.</p>}
              {[...realm.chronicle].reverse().map((e,i) => (
                <div key={i} style={{...cardStyle,marginBottom:6,borderLeft: e.significance === "MAJOR" ? "3px solid #8B6914" : "3px solid #1a2740"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:14,fontWeight: e.significance==="MAJOR"?"bold":"normal"}}>{e.title}</span>
                    <span style={{fontSize:10,color:"#5a5347"}}>{e.sealed?"🔒 ":""}Y{e.year} {e.season} D{e.day}</span>
                  </div>
                  <div style={{fontSize:12,color:"#8a8577",marginTop:3,lineHeight:1.5}}>{e.description}</div>
                  {e.tags.length > 0 && <div style={{fontSize:10,color:"#5a5347",marginTop:3}}>{e.tags.join(" · ")}</div>}
                </div>
              ))}
            </div>
          )}

          {/* REGISTRY TAB */}
          {tab === TABS.REGISTRY && (
            <div>
              <div style={cardHeader}>Registry of the Realm</div>
              <div style={cardStyle}>
                <div style={{...cardHeader,fontSize:12}}>Character</div>
                <div style={statRow}><span>Name</span><span>{c.name}</span></div>
                <div style={statRow}><span>Class</span><span>{CLASSES[c.class]?.label} (Rank {c.rank})</span></div>
                <div style={statRow}><span>Title</span><span>{rankTitle}</span></div>
                <div style={statRow}><span>Household</span><span>{realm.household.name}</span></div>
                <div style={statRow}><span>Reputation Titles</span><span>{realm.titles.map(t=>t.name).join(", ")||"None"}</span></div>
                <div style={statRow}><span>Chronicle Mentions</span><span>{realm.chronicle.filter(e => true).length}</span></div>
                <div style={statRow}><span>Days in Realm</span><span>{realm.totalDays}</span></div>
              </div>
              {realm.settlements.length > 0 && (
                <div style={{...cardStyle,marginTop:12}}>
                  <div style={{...cardHeader,fontSize:12}}>Settlements</div>
                  {realm.settlements.map((s,i) => (
                    <div key={i} style={statRow}>
                      <span>{s.name}</span>
                      <span>{tierNames[s.tier]} · Pop: {s.population} · Founded Y{s.foundedYear}</span>
                    </div>
                  ))}
                </div>
              )}
              {realm.guilds.length > 0 && (
                <div style={{...cardStyle,marginTop:12}}>
                  <div style={{...cardHeader,fontSize:12}}>Guilds</div>
                  {realm.guilds.map((g,i) => (
                    <div key={i} style={statRow}>
                      <span>{g.name}</span>
                      <span>{g.type} · {g.status} · Founded Y{g.foundedYear}</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{...cardStyle,marginTop:12}}>
                <div style={{...cardHeader,fontSize:12}}>Laws of the Realm</div>
                <div style={{fontSize:12,color:"#8a8577"}}>Market Tax: 3d/day · Property Tax: 2%/year · No laws amended yet.</div>
              </div>
            </div>
          )}

          {/* HOUSEHOLD TAB */}
          {tab === TABS.HOUSEHOLD && (
            <div>
              <div style={cardHeader}>{realm.household.name}</div>
              <div style={cardStyle}>
                <div style={statRow}><span>Generation</span><span>{realm.household.generation}</span></div>
                <div style={statRow}><span>Treasury</span><span>{realm.household.treasury}d</span></div>
                <div style={statRow}><span>Reputation Aggregate</span><span>{realm.household.repAggregate}</span></div>
                <div style={statRow}><span>Current Member</span><span>{c.name} ({CLASSES[c.class]?.label})</span></div>
                <div style={statRow}><span>Settlements Owned</span><span>{realm.settlements.length}</span></div>
              </div>
              {realm.settlements.length > 0 && realm.settlements.map((s,i) => (
                <div key={i} style={{...cardStyle,marginTop:12}}>
                  <div style={cardHeader}>{s.name}</div>
                  <div style={statRow}><span>Tier</span><span>{tierNames[s.tier]}</span></div>
                  <div style={statRow}><span>Population</span><span>{s.population}</span></div>
                  <div style={statRow}><span>Condition</span><span style={{color: s.condition > 70 ? "#6b8f5e" : s.condition > 40 ? "#b89c3e" : "#a63d2f"}}>{s.condition}%</span></div>
                  <div style={statRow}><span>Structures</span><span>{s.structures.join(", ") || "None"}</span></div>
                  <div style={statRow}><span>Founded</span><span>Year {s.foundedYear}</span></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LOG */}
        <div style={{background:"#0a1018",borderTop:"1px solid #1a2740",padding:"8px 16px",maxHeight:120,overflowY:"auto",fontSize:11,color:"#5a5347",lineHeight:1.6}}>
          {realm.log.slice(0,20).map((msg,i) => (
            <div key={i} style={{opacity: 1 - i * 0.04}}>{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Shared Styles ─────────────────────────────────────
const btnStyle = { borderRadius:6, cursor:"pointer", fontFamily:"Georgia,serif", transition:"all 0.15s" };
const btnSmall = { ...btnStyle, fontSize:11, padding:"5px 12px", border:"none", borderRadius:4 };
const inputStyle = { width:"100%", padding:"10px 12px", background:"#111c2e", border:"1px solid #1e3354", borderRadius:6, color:"#F5F0E1", fontSize:15, fontFamily:"Georgia,serif", boxSizing:"border-box" };
const cardStyle = { background:"#111c2e", border:"1px solid #1a2740", borderRadius:8, padding:"12px 14px" };
const cardHeader = { fontSize:14, color:"#8B6914", fontWeight:"bold", marginBottom:10, fontFamily:"Georgia,serif" };
const statRow = { display:"flex", justifyContent:"space-between", fontSize:12, padding:"3px 0", borderBottom:"1px solid #0d1520", color:"#F5F0E1" };
