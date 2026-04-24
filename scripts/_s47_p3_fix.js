// S47 P3: bus-lane / cyclist qualifier batch
// Apply 3 fixes to data/questions.json programmatically.

const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '..', 'data', 'questions.json');
const qs = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
const findQ = id => qs.find(q => q.id === id);

// ============ FIX 1: s39-013 option C ============
const q1 = findQ('s39-013');
q1.options.C.fr = "Les vélos (selon signalisation locale) et les véhicules d'urgence en intervention";
q1.options.C.en = "Bicycles (per local signage) and emergency vehicles on call";
q1.explanationFr = "Voie bus : autobus toujours autorisés. Taxis et vélos uniquement si signalisation locale l'autorise (panneau Bus+Vélo, panonceau taxi). Véhicules d'urgence en intervention : toujours autorisés (R412-5 priorité). Voitures particulières : interdites — 135 € + points.";
q1.explanationEn = "Bus lane: buses always allowed. Taxis and bicycles only if local signage authorizes (Bus+Vélo sign, taxi sub-panel). Emergency vehicles on call: always allowed (R412-5 priority). Private cars: forbidden — €135 + points.";
q1.trapNote = "Default rule for bus lanes (couloirs réservés) is FORBIDDEN for non-buses. Cyclists and taxis need explicit local signage. Only emergency vehicles in active intervention (gyrophare + sirène) have unconditional access per R412-5.";

// ============ FIX 2: circ-027 option B ============
const q2 = findQ('circ-027');
q2.options.B.fr = "Les vélos (si signalisation locale l'autorise)";
q2.options.B.en = "Bicycles (if local signage authorizes)";
q2.explanationFr = "Voies de bus : bus toujours autorisés ; taxis et vélos seulement si signalisation locale l'indique (panneau Bus+Vélo, sub-panel taxi) ; véhicules de secours en intervention toujours (R412-5 priorité). Voitures particulières y compris électriques : interdites sauf dérogation locale.";
q2.explanationEn = "Bus lanes: buses always authorized; taxis and cyclists only if local signage indicates (Bus+Vélo sign, taxi sub-panel); emergency vehicles in intervention always authorized (R412-5 priority). Private cars including electric: forbidden unless local exemption.";
q2.trapNote = "Cyclists need EXPLICIT local signage to use a bus lane. The general rule (R412-7) is that bus lanes are reserved for buses; all other uses require signage authorization. Emergency-vehicle-on-intervention access is the only unconditional exception (R412-5).";

// ============ FIX 3: rout-153 option B (CRITICAL: direction flip) ============
const q3 = findQ('rout-153');
q3.options.B.fr = "Les vélos peuvent circuler dans les voies de bus uniquement si la signalisation locale l'autorise";
q3.options.B.en = "Bicycles may use bus lanes only if local signage authorizes it";
q3.explanationFr = "Voies réservées bus : les vélos ne peuvent y circuler QUE si une signalisation locale (panneau Bus+Vélo ou marquage spécifique) l'autorise. Le défaut est l'INTERDICTION. R412-7 régit la réservation de la voie ; R412-5 permet les véhicules d'urgence en intervention à tout moment.";
q3.explanationEn = "Reserved bus lanes: bicycles may circulate there ONLY when local signage (Bus+Vélo sign or specific marking) authorizes it. The default is FORBIDDEN. R412-7 governs lane reservation; R412-5 permits emergency vehicles on intervention at all times.";
q3.trapNote = "CRITICAL trap: the default rule for bus lanes is FORBIDDEN for non-buses. 'Sauf interdiction' (unless forbidden) would imply allowed-by-default, which is the REVERSE of the actual rule. Always look for local signage authorizing cyclist use before using a bus lane on a bicycle.";
q3.distractorNotes = Object.assign({}, q3.distractorNotes || {}, {
  C: "You may not use a bus lane to turn right unless a specific marking (usually a dashed line at the intersection) indicates it. Default = forbidden.",
  D: "Bus lanes operate full-time unless signage (hours panel) specifies otherwise. 'Only at peak hours' is the reverse of the default."
});

fs.writeFileSync(JSON_PATH, JSON.stringify(qs, null, 2));
console.log('s39-013 C:', q1.options.C.fr);
console.log('circ-027 B:', q2.options.B.fr);
console.log('rout-153 B:', q3.options.B.fr);
