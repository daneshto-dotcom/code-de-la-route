// S47 P2: R414-6 regulatory-flip batch
// Apply 5 fixes to data/questions.json programmatically.

const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '..', 'data', 'questions.json');
const qs = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

const findQ = id => qs.find(q => q.id === id);

// ============ FIX 1: s41-001 ============
const q1 = findQ('s41-001');
q1.correctAnswers = ['A'];
q1.answerCount = 1;
q1.explanationFr = "En sens unique, le stationnement est possible des deux côtés (sauf signalisation contraire). Le dépassement par la droite reste en principe INTERDIT (R414-6) : il n'est autorisé qu'en présence d'un véhicule signalant un virage à gauche, ou d'un tramway circulant sur la chaussée. Sens unique seul ne crée pas d'exception.";
q1.explanationEn = "In one-way streets, parking on both sides is permitted (unless signage forbids it). Overtaking on the right remains FORBIDDEN by default (R414-6): it is only authorized when a vehicle ahead signals a left turn, or to pass a tram running on the roadway. Being a one-way street alone does NOT create an exception.";
q1.trapNote = "R414-6 par. II lists only 2 exceptions for right-overtake: (1) vehicle signaling a left turn, (2) tram on the roadway. Being on a sens-unique multi-lane road does NOT in itself authorize right-overtake. R414-6 par. III has a \"files parallèles\" clause where faster traffic in one lane is legally NOT classified as dépassement, but this requires DENSE traffic forming uninterrupted queues on all lanes — not the general case. Ornikar teaches the strict rule: \"even on multi-lane roads, overtaking on the right is forbidden.\" For the ETG, stick with the strict R414-6 reading.";
q1.distractorNotes = {
  B: "Per R414-6, overtaking on the right is forbidden except in 2 specific cases (left-turn signal, tram on roadway). A sens-unique street does NOT authorize it. Ornikar and primary-source R414-6 agree.",
  C: "Pedestrians always have a duty of care before crossing. One-way streets do not suspend their safety obligations.",
  D: "Cyclists may use any lane on a sens-unique street, including turning left from the leftmost lane (R415-3/R415-4 before turning)."
};

// ============ FIX 2: croi-043 ============
const q2 = findQ('croi-043');
q2.correctAnswers = ['D'];
q2.answerCount = 1;
q2.explanationFr = "Sur autoroute, le dépassement par la droite est interdit (R414-6 par. I). La seule tolérance légale est la clause \"files parallèles\" de R414-6 par. III — elle ne classifie PAS comme dépassement le fait de rouler plus vite qu'une autre file quand la circulation forme une file ininterrompue sur toutes les voies à cause de sa densité. Mais l'ETG et la Sécurité Routière enseignent la règle stricte : ne dépassez jamais par la droite sur autoroute. La réponse D est la plus conforme à la doctrine enseignée.";
q2.explanationEn = "On motorways, overtaking on the right is forbidden (R414-6 par. I). The only legal latitude is R414-6 par. III's \"parallel files\" clause — it legally classifies faster movement in one lane as NOT overtaking, but only when traffic density forms an uninterrupted queue on every lane. ETG teaching and Sécurité Routière stick with the strict rule: never overtake on the right on a motorway. Answer D is the teaching-aligned answer.";
q2.trapNote = "Same pattern as s41-001: R414-6 par. III's \"files parallèles\" technicality exists, but the ETG curriculum (Ornikar, Rousseau) aligns with the strict par. I reading: no right-overtake on autoroute. Options A and B invoke the nuance incorrectly — they describe normal lane-speed differences, not the restricted dense-queue condition.";
q2.distractorNotes = {
  A: "The files-parallèles clause only applies to DENSE uninterrupted queue traffic on all lanes, not to general lane-speed differences. ETG expects you to answer \"forbidden\" on autoroute right-overtake.",
  B: "Dense traffic with all lanes occupied is closer to the files-parallèles scenario, but the question stem asks about \"dépassement par la droite autorisé\" — per R414-6 par. I and ETG teaching, this is forbidden on autoroute regardless.",
  C: "Speed alone never authorizes a right-overtake. Speed limit is a ceiling, not a license."
};

// ============ FIX 3: croi-051 ============
const q3 = findQ('croi-051');
q3.correctAnswers = ['A'];
q3.answerCount = 1;
q3.explanationFr = "Le seul cas d'autorisation générale de dépasser par la droite est quand le véhicule devant signale ou effectue un virage à gauche (R414-6 par. II 1°). Le dépassement \"files parallèles en agglomération\" est une zone grise : R414-6 par. III reconnaît que rouler plus vite dans une autre file dans une circulation dense n'est PAS classifié comme dépassement — mais cela exige une circulation ininterrompue sur toutes les voies. L'ETG enseigne la règle stricte.";
q3.explanationEn = "The only broadly authorized case of right-overtake is when the vehicle ahead signals or performs a left turn (R414-6 par. II 1°). The \"parallel files in town\" scenario is a legal gray area: R414-6 par. III classifies faster lane-speed in dense queued traffic as NOT overtaking, but requires uninterrupted queues on every lane. ETG teaches the strict rule.";
q3.trapNote = "Classic exam trap: \"files parallèles\" sounds permissive but R414-6 par. III requires a very specific condition (uninterrupted-queue traffic on every lane) and the ETG curriculum (Ornikar, Rousseau) teaches the strict par. I reading.";
q3.distractorNotes = {
  B: "R414-6 par. III's files-parallèles clause requires uninterrupted-queue density on ALL lanes, not just \"parallel files\" generally. ETG teaching aligns with the strict par. I reading.",
  C: "Slow left lane does not legally authorize right-overtake on autoroute. Must change lanes left and overtake left.",
  D: "Being in a hurry never authorizes right-overtake."
};

// ============ FIX 4: croi-149 ============
const q4 = findQ('croi-149');
q4.correctAnswers = ['A'];
q4.answerCount = 1;
q4.explanationFr = "Seul le cas A est un cas général d'autorisation : quand le véhicule devant tourne ou signale un virage à gauche (R414-6 par. II 1°). Sens unique multi-voies (B) et files dense (D) relèvent de R414-6 par. III — une tolérance légale conditionnelle à une circulation ininterrompue sur toutes les voies. L'ETG enseigne la règle stricte \"interdit par la droite\".";
q4.explanationEn = "Only case A is a broad authorization: when the vehicle ahead turns or signals a left turn (R414-6 par. II 1°). Multi-lane one-way (B) and dense-file scenarios (D) fall under R414-6 par. III — a conditional legal tolerance requiring uninterrupted queue traffic on all lanes. ETG teaches the strict rule: right-overtake forbidden.";
q4.trapNote = "The par. III files-parallèles clause is conditional on DENSE uninterrupted-queue traffic. Isolating sens-unique or general dense-file as authorizations is overreach; ETG curriculum takes the strict par. I reading.";
q4.distractorNotes = {
  B: "Multi-lane sens-unique alone does NOT authorize right-overtake. The files-parallèles clause (R414-6 par. III) requires dense uninterrupted-queue traffic; ETG teaching maintains the strict prohibition.",
  C: "Slow left lane on autoroute does NOT authorize right-overtake — you must change lanes left.",
  D: "Lane-speed differences alone do not qualify. The par. III files-parallèles exception is for DENSE queued traffic; ETG teaches the strict rule regardless."
};

// ============ FIX 5: croi-170 ============
const q5 = findQ('croi-170');
q5.correctAnswers = ['A', 'B'];
q5.answerCount = 2;
q5.explanationFr = "R414-6 : interdit en règle générale (par. I), 2 exceptions (par. II) : véhicule signalant un virage à gauche, tramway sur la chaussée. Sanction : 135 € + 3 points. \"Files parallèles en agglomération\" (C) est une technicalité de par. III qui ne s'applique qu'en circulation ininterrompue sur toutes les voies — ce n'est pas la règle générale enseignée par l'ETG.";
q5.explanationEn = "R414-6: forbidden by default (par. I), 2 exceptions (par. II): vehicle signaling a left turn, tram on roadway. Penalty: 135 € + 3 points. \"Parallel files in town\" (C) is a par. III technicality that only applies to uninterrupted-queue traffic on every lane — not the general rule taught by ETG.";
q5.trapNote = "R414-6 par. III's files-parallèles is a specific legal concept requiring uninterrupted-queue density, NOT a general agglomération rule. ETG teaches the strict par. I reading.";
q5.distractorNotes = {
  C: "R414-6 par. III's files-parallèles clause requires uninterrupted-queue density on ALL lanes, not general \"parallel lanes in town\". ETG teaches the strict par. I reading.",
  D: "Right-overtake is NEVER authorized \"partout, sans restriction\" — R414-6 is the default prohibition."
};

fs.writeFileSync(JSON_PATH, JSON.stringify(qs, null, 2));
console.log('questions.json updated');
console.log('s41-001:', JSON.stringify(q1.correctAnswers), 'answerCount:', q1.answerCount);
console.log('croi-043:', JSON.stringify(q2.correctAnswers), 'answerCount:', q2.answerCount);
console.log('croi-051:', JSON.stringify(q3.correctAnswers), 'answerCount:', q3.answerCount);
console.log('croi-149:', JSON.stringify(q4.correctAnswers), 'answerCount:', q4.answerCount);
console.log('croi-170:', JSON.stringify(q5.correctAnswers), 'answerCount:', q5.answerCount);
