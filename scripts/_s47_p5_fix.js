// S47 P5: s42-009 color-mapping CRITICAL flip (both-model-consensus-scrutinized)
// The only CRITICAL regulatory flip warranted from the 154-Q signalisation triage.
// All other Grok flags turned out false positives on verification; Gemini's 2
// flags were minor-wording concerns; 10-Q broken-data cluster (sign-161..170)
// deferred to P6 with croi-138 + circ-81.

const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '..', 'data', 'questions.json');
const qs = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
const findQ = id => qs.find(q => q.id === id);

// ============ s42-009: color-mapping swap ============
// Before: A+:"Verts=autoroutes" (WRONG), B+:"Bleus=nationales" (WRONG)
// All OTHER color Qs (sign-022/034/183, media-058/083, sign-016) teach:
//   Bleu = autoroute (R411-24)
//   Vert = route nationale / grand itinéraire
//   Blanc = locale / communale
// Fix: REWRITE option A and B to state the correct rule, keep C+D as-is.

const q = findQ('s42-009');
q.options.A.fr = "Les panneaux bleus indiquent les autoroutes";
q.options.A.en = "Blue signs indicate motorways";
q.options.B.fr = "Les panneaux verts indiquent les routes nationales ou les grands itinéraires";
q.options.B.en = "Green signs indicate national roads or major routes";
q.correctAnswers = ['A', 'B', 'C'];
q.answerCount = 3;
q.explanationFr = "Code couleur officiel des panneaux de direction (R411-24) : Bleu = autoroutes ; Vert = routes nationales et grands itinéraires ; Blanc = directions locales (communales, départementales). La couleur d'un panneau directionnel a une valeur réglementaire informative.";
q.explanationEn = "Official color code for directional signs (R411-24): Blue = motorways; Green = national roads and major routes; White = local directions (municipal, departmental). The color of a directional sign carries informative regulatory meaning.";
q.trapNote = "Classic swap trap: some materials confuse bleu/vert. The correct mapping is Bleu=autoroute, Vert=nationale. Cross-reference with sign-022, sign-034, sign-183, media-058, media-083, and sign-016 — all consistently teach this.";
q.distractorNotes = Object.assign({}, q.distractorNotes || {}, {
  D: "The color of a directional sign has a defined regulatory meaning — it is not arbitrary or purely decorative."
});

fs.writeFileSync(JSON_PATH, JSON.stringify(qs, null, 2));
console.log('s42-009:', q.correctAnswers, 'answerCount:', q.answerCount);
console.log('A.fr:', q.options.A.fr);
console.log('B.fr:', q.options.B.fr);
