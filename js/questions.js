/* ============================================
   Question Bank — 310 Bilingual Questions
   All 10 ETG themes, multi-answer support
   Based on French Code de la route public law
   ============================================ */

const QUESTION_BANK = [
    // === CIRCULATION (Traffic Rules) ===
    {
        id: 'circ-001',
        topic: 'circulation',
        difficulty: 2,
        signs: ['speed_50', 'town_entry'],
        questionFr: "En agglomération, quelle est la vitesse maximale autorisée sauf indication contraire ?",
        questionEn: "In built-up areas, what is the default maximum speed limit?",
        options: {
            A: { fr: "30 km/h", en: "30 km/h" },
            B: { fr: "50 km/h", en: "50 km/h" },
            C: { fr: "70 km/h", en: "70 km/h" },
            D: { fr: "90 km/h", en: "90 km/h" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "En agglomération, la vitesse est limitée à 50 km/h sauf signalisation contraire. Cette règle est définie par l'article R413-2 du Code de la route.",
        explanationEn: "In built-up areas (agglomération), the speed limit is 50 km/h unless otherwise indicated by signs. This is defined by Article R413-2 of the French Highway Code.",
        trapNote: "Don't confuse with the 30 km/h zones — those require specific signage. The default is always 50 km/h.",
        distractorNotes: {
            A: "30 km/h zones exist but require specific 'Zone 30' signs. They are not the default.",
            C: "70 km/h can apply on some urban expressways but is not the default speed in town.",
            D: "90 km/h is for roads outside built-up areas, not within them."
        },
        vocabulary: [
            { wordFr: "agglomération", wordEn: "built-up area", definition: "A zone between town name entry and exit signs" },
            { wordFr: "sauf indication contraire", wordEn: "unless otherwise indicated", definition: "Unless there is a sign showing a different rule" }
        ]
    },
    {
        id: 'circ-002',
        topic: 'circulation',
        difficulty: 3,
        signs: ['speed_80'],
        questionFr: "Hors agglomération, sur une route à double sens sans séparateur central, quelle est la vitesse maximale autorisée ?",
        questionEn: "Outside built-up areas, on a two-way road without a central divider, what is the maximum speed?",
        options: {
            A: { fr: "70 km/h", en: "70 km/h" },
            B: { fr: "80 km/h", en: "80 km/h" },
            C: { fr: "90 km/h", en: "90 km/h" },
            D: { fr: "110 km/h", en: "110 km/h" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Depuis le 1er juillet 2018, la vitesse maximale sur les routes à double sens sans séparateur central est de 80 km/h (au lieu de 90 km/h auparavant).",
        explanationEn: "Since July 1, 2018, the maximum speed on two-way roads without a central divider has been 80 km/h (reduced from the previous 90 km/h).",
        trapNote: "This was changed in 2018! Many older study materials still show 90 km/h. The current limit is 80 km/h.",
        distractorNotes: {
            A: "70 km/h is too low for open roads — this speed applies in some specific zones.",
            C: "90 km/h was the old limit before 2018. This is a very common trap answer!",
            D: "110 km/h is for dual carriageways (routes à chaussées séparées), not regular two-way roads."
        },
        vocabulary: [
            { wordFr: "hors agglomération", wordEn: "outside built-up areas", definition: "On roads between towns, in the countryside" },
            { wordFr: "séparateur central", wordEn: "central divider", definition: "A physical barrier between opposite traffic lanes" }
        ]
    },
    {
        id: 'circ-003',
        topic: 'circulation',
        difficulty: 2,
        signs: ['speed_110', 'speed_130', 'highway_start'],
        questionFr: "Sur autoroute, par temps de pluie, quelle est la vitesse maximale autorisée ?",
        questionEn: "On a motorway, in rainy conditions, what is the maximum speed limit?",
        options: {
            A: { fr: "90 km/h", en: "90 km/h" },
            B: { fr: "100 km/h", en: "100 km/h" },
            C: { fr: "110 km/h", en: "110 km/h" },
            D: { fr: "130 km/h", en: "130 km/h" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "Sur autoroute, la vitesse maximale est de 130 km/h par temps sec et de 110 km/h par temps de pluie.",
        explanationEn: "On motorways, the maximum speed is 130 km/h in dry conditions and 110 km/h in rain.",
        trapNote: "Remember the rain reduction: motorway drops from 130 to 110, dual carriageway from 110 to 100, regular road from 80 to 80 (no change).",
        distractorNotes: {
            A: "90 km/h is far too slow for a motorway even in rain.",
            B: "100 km/h is the rain limit for dual carriageways, not motorways.",
            D: "130 km/h is the dry-weather limit. In rain you must reduce to 110 km/h."
        },
        vocabulary: [
            { wordFr: "autoroute", wordEn: "motorway", definition: "A high-speed road with tolls and no intersections" },
            { wordFr: "temps de pluie", wordEn: "rainy weather", definition: "When it is raining" }
        ]
    },
    {
        id: 'circ-004',
        topic: 'circulation',
        difficulty: 3,
        signs: ['speed_130', 'highway_start'],
        questionFr: "Quelles affirmations sont vraies concernant les distances de sécurité sur autoroute ?",
        questionEn: "Which statements are true about safety distances on the motorway?",
        options: {
            A: { fr: "La distance de sécurité correspond à 2 secondes", en: "The safety distance equals 2 seconds" },
            B: { fr: "À 130 km/h, la distance de sécurité est d'environ 72 mètres", en: "At 130 km/h, the safety distance is about 72 meters" },
            C: { fr: "Les marques au sol sur autoroute permettent de vérifier cette distance", en: "Road markings on motorways help verify this distance" },
            D: { fr: "La distance de sécurité correspond à 1 seconde", en: "The safety distance equals 1 second" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "La distance de sécurité est de 2 secondes minimum. À 130 km/h, cela représente environ 72 mètres. Les bandes blanches sur autoroute sont espacées de 38 mètres pour aider à estimer cette distance.",
        explanationEn: "The safety distance is a minimum of 2 seconds. At 130 km/h, that equals about 72 meters. White stripes on motorways are spaced 38m apart to help estimate this distance.",
        trapNote: "It's 2 seconds, not 1. And at 130 km/h, that's about 72m — much further than most people think!",
        distractorNotes: {
            D: "1 second is far too short. The legal minimum is 2 seconds in all conditions."
        },
        vocabulary: [
            { wordFr: "distance de sécurité", wordEn: "safety distance", definition: "The minimum gap to maintain between your car and the one ahead" }
        ]
    },

    // === CONDUCTEUR (The Driver) ===
    {
        id: 'cond-001',
        topic: 'conducteur',
        difficulty: 2,
        questionFr: "Quel est le taux maximal d'alcoolémie autorisé pour un conducteur titulaire d'un permis probatoire ?",
        questionEn: "What is the maximum legal blood alcohol level for a driver with a probationary license?",
        options: {
            A: { fr: "0,2 g/l de sang", en: "0.2 g/l of blood" },
            B: { fr: "0,5 g/l de sang", en: "0.5 g/l of blood" },
            C: { fr: "0,8 g/l de sang", en: "0.8 g/l of blood" },
            D: { fr: "Tolérance zéro", en: "Zero tolerance" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Le taux maximal est de 0,2 g/l de sang pour les conducteurs en permis probatoire (3 ans après obtention du permis, ou 2 ans en conduite accompagnée).",
        explanationEn: "The maximum is 0.2 g/l of blood for probationary license holders (first 3 years after getting the license, or 2 years with accompanied driving).",
        trapNote: "0.2 g/l is essentially zero — one glass of wine puts you over. Don't confuse with the regular 0.5 g/l limit.",
        distractorNotes: {
            B: "0.5 g/l is the limit for experienced drivers, not probationary ones.",
            C: "0.8 g/l is the criminal threshold — driving above this is a crime, not just an offense.",
            D: "It's not absolute zero — the limit is 0.2 g/l, which allows for traces from food or medicine."
        },
        vocabulary: [
            { wordFr: "alcoolémie", wordEn: "blood alcohol level", definition: "The concentration of alcohol in the blood" },
            { wordFr: "permis probatoire", wordEn: "probationary license", definition: "The license you have for the first 3 years after passing" }
        ]
    },
    {
        id: 'cond-002',
        topic: 'conducteur',
        difficulty: 2,
        questionFr: "Quels sont les effets de la fatigue sur la conduite ?",
        questionEn: "What are the effects of fatigue on driving?",
        options: {
            A: { fr: "Allongement du temps de réaction", en: "Longer reaction time" },
            B: { fr: "Diminution de la vigilance", en: "Reduced alertness" },
            C: { fr: "Risque d'endormissement au volant", en: "Risk of falling asleep at the wheel" },
            D: { fr: "Amélioration de la concentration", en: "Improved concentration" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "La fatigue allonge le temps de réaction, diminue la vigilance et peut provoquer un endormissement au volant. Il est recommandé de faire une pause toutes les 2 heures.",
        explanationEn: "Fatigue increases reaction time, reduces alertness, and can cause you to fall asleep while driving. It's recommended to take a break every 2 hours.",
        trapNote: "Option D is the opposite of what happens — fatigue NEVER improves concentration.",
        distractorNotes: {
            D: "This is completely wrong. Fatigue always decreases concentration, never improves it."
        },
        vocabulary: [
            { wordFr: "vigilance", wordEn: "alertness", definition: "Being alert and paying attention to the road" },
            { wordFr: "endormissement", wordEn: "falling asleep", definition: "When you doze off involuntarily" }
        ]
    },
    {
        id: 'cond-003',
        topic: 'conducteur',
        difficulty: 3,
        questionFr: "L'usage du téléphone tenu en main en conduisant est sanctionné par :",
        questionEn: "Using a handheld phone while driving is punished by:",
        options: {
            A: { fr: "Un retrait de 3 points", en: "A loss of 3 points" },
            B: { fr: "Une amende de 135 €", en: "A fine of €135" },
            C: { fr: "Un retrait de 6 points", en: "A loss of 6 points" },
            D: { fr: "Une amende de 35 €", en: "A fine of €35" }
        },
        correctAnswers: ["A", "B"],
        answerCount: 2,
        explanationFr: "L'usage du téléphone tenu en main est puni d'une amende forfaitaire de 135 € et d'un retrait de 3 points sur le permis.",
        explanationEn: "Using a handheld phone while driving results in a €135 fine and a 3-point deduction from your license.",
        trapNote: "It's 3 points and €135. The sanctions have been reinforced — this is a serious offense.",
        distractorNotes: {
            C: "6 points would be for very serious offenses like drunk driving. Phone use is 3 points.",
            D: "€35 is for minor infractions like incorrect parking. Phone use is €135."
        },
        vocabulary: [
            { wordFr: "retrait de points", wordEn: "point deduction", definition: "Points removed from your driving license" },
            { wordFr: "amende forfaitaire", wordEn: "fixed fine", definition: "A standard fine amount set by law" }
        ]
    },
    {
        id: 'cond-004',
        topic: 'conducteur',
        difficulty: 2,
        questionFr: "Après une longue route, quel est le meilleur moment pour faire une pause ?",
        questionEn: "After a long drive, when is the best time to take a break?",
        options: {
            A: { fr: "Toutes les 2 heures de conduite", en: "Every 2 hours of driving" },
            B: { fr: "Toutes les 4 heures de conduite", en: "Every 4 hours of driving" },
            C: { fr: "Uniquement quand on est fatigué", en: "Only when you're tired" },
            D: { fr: "À chaque station-service", en: "At every gas station" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Il est recommandé de faire une pause d'au moins 15-20 minutes toutes les 2 heures de conduite pour rester vigilant.",
        explanationEn: "It is recommended to take a break of at least 15-20 minutes every 2 hours of driving to stay alert.",
        trapNote: "Don't wait until you feel tired — by then it may be too late. The 2-hour rule is preventive.",
        distractorNotes: {
            B: "4 hours is far too long. Fatigue can set in well before that.",
            C: "Waiting until you're tired is dangerous — fatigue impairs your judgment about how tired you actually are.",
            D: "Gas stations vary in distance. The 2-hour rule is time-based, not distance-based."
        },
        vocabulary: [
            { wordFr: "pause", wordEn: "break/rest", definition: "A stop to rest during a long drive" }
        ]
    },

    // === ROUTE (The Road) ===
    {
        id: 'route-001',
        topic: 'route',
        difficulty: 2,
        signs: ['dipped_headlights'],
        questionFr: "Quand doit-on allumer les feux de croisement ?",
        questionEn: "When must you turn on dipped headlights?",
        options: {
            A: { fr: "La nuit en agglomération", en: "At night in built-up areas" },
            B: { fr: "En cas de brouillard", en: "In fog" },
            C: { fr: "Quand la visibilité est insuffisante", en: "When visibility is insufficient" },
            D: { fr: "Uniquement sur autoroute la nuit", en: "Only on motorways at night" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Les feux de croisement doivent être allumés la nuit en agglomération, en cas de brouillard, et chaque fois que la visibilité est insuffisante (pluie, neige, etc.).",
        explanationEn: "Dipped headlights must be used at night in built-up areas, in fog, and whenever visibility is insufficient (rain, snow, etc.).",
        trapNote: "Dipped headlights aren't just for night — they're required ANY time visibility is reduced.",
        distractorNotes: {
            D: "Dipped headlights are required everywhere at night and in poor visibility, not just on motorways."
        },
        vocabulary: [
            { wordFr: "feux de croisement", wordEn: "dipped headlights / low beams", definition: "The standard headlights that don't blind oncoming traffic" },
            { wordFr: "brouillard", wordEn: "fog", definition: "Thick mist that reduces visibility" }
        ]
    },
    {
        id: 'route-002',
        topic: 'route',
        difficulty: 3,
        questionFr: "Sur une chaussée mouillée, la distance de freinage est :",
        questionEn: "On a wet road, the braking distance is:",
        options: {
            A: { fr: "Identique à celle sur route sèche", en: "The same as on a dry road" },
            B: { fr: "Multipliée par 2", en: "Multiplied by 2" },
            C: { fr: "Multipliée par 1,5", en: "Multiplied by 1.5" },
            D: { fr: "Réduite grâce à l'eau", en: "Reduced thanks to water" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Sur une chaussée mouillée, la distance de freinage est environ doublée par rapport à une route sèche. C'est pourquoi les vitesses maximales sont réduites par temps de pluie.",
        explanationEn: "On a wet road, the braking distance roughly doubles compared to a dry road. That's why maximum speeds are reduced in rain.",
        trapNote: "The braking distance doubles on wet roads — this is a fundamental fact that appears very often in the exam.",
        distractorNotes: {
            A: "Wet roads have significantly less grip. Braking distance always increases.",
            C: "1.5 times is for gravel or dirt roads. On wet tarmac, it's approximately 2 times.",
            D: "Water reduces friction — it never helps braking. This is a common misconception."
        },
        vocabulary: [
            { wordFr: "chaussée mouillée", wordEn: "wet road surface", definition: "The road surface when it is wet from rain" },
            { wordFr: "distance de freinage", wordEn: "braking distance", definition: "How far your car travels from when you brake to when it stops" }
        ]
    },

    // === AUTRES USAGERS (Other Road Users) ===
    {
        id: 'autr-001',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "À quelle distance minimale devez-vous dépasser un cycliste en agglomération ?",
        questionEn: "At what minimum distance must you overtake a cyclist in a built-up area?",
        options: {
            A: { fr: "0,5 mètre", en: "0.5 meters" },
            B: { fr: "1 mètre", en: "1 meter" },
            C: { fr: "1,5 mètre", en: "1.5 meters" },
            D: { fr: "2 mètres", en: "2 meters" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "En agglomération, la distance latérale minimale pour dépasser un cycliste est de 1 mètre. Hors agglomération, elle est de 1,5 mètre.",
        explanationEn: "In built-up areas, the minimum lateral distance when overtaking a cyclist is 1 meter. Outside built-up areas, it's 1.5 meters.",
        trapNote: "1 meter in town, 1.5 meters outside town. Don't mix them up!",
        distractorNotes: {
            A: "0.5 meters is dangerously close to a cyclist. The minimum is 1 meter.",
            C: "1.5 meters is the rule outside built-up areas, not inside them.",
            D: "2 meters is more than required, though always a good practice."
        },
        vocabulary: [
            { wordFr: "dépasser", wordEn: "to overtake", definition: "To pass another vehicle or cyclist" },
            { wordFr: "distance latérale", wordEn: "lateral distance", definition: "The side-to-side gap between your vehicle and the cyclist" }
        ]
    },
    {
        id: 'autr-002',
        topic: 'autres_usagers',
        difficulty: 2,
        signs: ['pedestrian_crossing'],
        questionFr: "À l'approche d'un passage piéton, un piéton s'engage. Que devez-vous faire ?",
        questionEn: "Approaching a pedestrian crossing, a pedestrian steps onto it. What must you do?",
        options: {
            A: { fr: "S'arrêter pour le laisser traverser", en: "Stop to let them cross" },
            B: { fr: "Klaxonner pour le prévenir", en: "Honk to warn them" },
            C: { fr: "Ralentir et passer derrière lui", en: "Slow down and pass behind them" },
            D: { fr: "Accélérer pour passer avant lui", en: "Speed up to pass before them" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Le conducteur doit s'arrêter pour laisser traverser tout piéton engagé sur un passage piéton. Le non-respect de cette règle est sanctionné de 6 points et 135 €.",
        explanationEn: "The driver must stop to let any pedestrian who has stepped onto a crossing to pass. Failing to do so results in a 6-point deduction and €135 fine.",
        trapNote: "Once a pedestrian has stepped onto the crossing, you MUST stop. No exceptions.",
        distractorNotes: {
            B: "Honking at a pedestrian on a crossing is both illegal and aggressive.",
            C: "Passing behind a pedestrian on a crossing is not allowed — you must stop completely.",
            D: "Accelerating near a pedestrian is extremely dangerous and illegal."
        },
        vocabulary: [
            { wordFr: "passage piéton", wordEn: "pedestrian crossing", definition: "The striped area where pedestrians cross the road" },
            { wordFr: "s'engager", wordEn: "to step onto / enter", definition: "When a pedestrian enters the crossing" }
        ]
    },

    // === PRIORITE (Priority Rules) ===
    {
        id: 'prio-001',
        topic: 'priorite',
        difficulty: 3,
        signs: ['priority_right'],
        scenario: 'four_way_no_signs',
        questionFr: "À une intersection sans signalisation, quelle règle s'applique ?",
        questionEn: "At an intersection with no signs, which rule applies?",
        options: {
            A: { fr: "Priorité au véhicule venant de droite", en: "Priority to the vehicle coming from the right" },
            B: { fr: "Priorité au premier arrivé", en: "Priority to whoever arrived first" },
            C: { fr: "Priorité au véhicule le plus gros", en: "Priority to the largest vehicle" },
            D: { fr: "Priorité au véhicule venant de gauche", en: "Priority to the vehicle coming from the left" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "À une intersection sans signalisation, c'est la règle de la priorité à droite qui s'applique (article R415-5 du Code de la route).",
        explanationEn: "At an intersection with no signs, the 'priority to the right' rule applies — you must yield to vehicles approaching from your right (Article R415-5).",
        trapNote: "Priorité à droite is THE fundamental priority rule in France. When in doubt at an unmarked intersection, always yield to the right.",
        distractorNotes: {
            B: "'First come, first served' is not a rule in French traffic law.",
            C: "Vehicle size is never a factor in priority rules.",
            D: "It's priority to the RIGHT, not the left — this is the opposite of the correct rule."
        },
        vocabulary: [
            { wordFr: "priorité à droite", wordEn: "priority to the right", definition: "The rule that you must yield to traffic coming from your right" },
            { wordFr: "intersection", wordEn: "intersection/crossroads", definition: "Where two or more roads meet" }
        ]
    },
    {
        id: 'prio-002',
        topic: 'priorite',
        difficulty: 3,
        signs: ['priority_road', 'yield', 'stop'],
        questionFr: "Quels panneaux indiquent que vous êtes sur une route prioritaire ?",
        questionEn: "Which signs indicate that you are on a priority road?",
        options: {
            A: { fr: "Un losange jaune sur fond blanc", en: "A yellow diamond on white background" },
            B: { fr: "Un triangle inversé rouge et blanc", en: "An inverted red and white triangle" },
            C: { fr: "Un panneau STOP", en: "A STOP sign" },
            D: { fr: "Une croix jaune sur fond blanc avec une barre noire", en: "A yellow cross on white with a black bar" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Le panneau de route prioritaire est un losange jaune sur fond blanc. Le triangle inversé signifie 'cédez le passage' et le STOP signifie 'arrêtez-vous'.",
        explanationEn: "The priority road sign is a yellow diamond on white background. The inverted triangle means 'yield' and the STOP sign means you must stop.",
        trapNote: "The yellow diamond = YOU have priority. The inverted triangle = YOU must yield. Don't confuse them!",
        distractorNotes: {
            B: "The inverted triangle means 'yield' — it's the OPPOSITE of having priority.",
            C: "A STOP sign means you must stop and yield — you do NOT have priority.",
            D: "This describes a secondary intersection marker, not a priority road sign."
        },
        vocabulary: [
            { wordFr: "losange", wordEn: "diamond shape", definition: "A four-sided shape rotated 45 degrees" },
            { wordFr: "cédez le passage", wordEn: "yield / give way", definition: "Let other vehicles go first" }
        ]
    },
    {
        id: 'prio-003',
        topic: 'priorite',
        difficulty: 2,
        signs: ['roundabout', 'yield'],
        scenario: 'roundabout_yield',
        questionFr: "Dans un rond-point (giratoire), qui a la priorité ?",
        questionEn: "In a roundabout, who has priority?",
        options: {
            A: { fr: "Les véhicules déjà engagés dans le rond-point", en: "Vehicles already in the roundabout" },
            B: { fr: "Les véhicules qui entrent dans le rond-point", en: "Vehicles entering the roundabout" },
            C: { fr: "Les véhicules les plus rapides", en: "The fastest vehicles" },
            D: { fr: "Les véhicules venant de droite", en: "Vehicles coming from the right" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Dans un giratoire, les véhicules circulant dans le rond-point ont la priorité. Les véhicules qui entrent doivent céder le passage.",
        explanationEn: "In a roundabout, vehicles already circulating inside have priority. Vehicles entering must yield to them.",
        trapNote: "In a roundabout, 'priority to the right' does NOT apply — vehicles inside have priority.",
        distractorNotes: {
            B: "Vehicles entering must yield, not the other way around.",
            C: "Speed is never a factor in priority rules.",
            D: "Priorité à droite is overridden by the roundabout-specific 'yield on entry' rule."
        },
        vocabulary: [
            { wordFr: "rond-point / giratoire", wordEn: "roundabout", definition: "A circular junction where traffic flows in one direction" },
            { wordFr: "engagé", wordEn: "already in / committed", definition: "Already driving inside the roundabout" }
        ]
    },

    // === CROISEMENT ET DEPASSEMENT (Meeting & Overtaking) ===
    {
        id: 'croi-001',
        topic: 'croisement_depassement',
        difficulty: 3,
        signs: ['pedestrian_crossing', 'no_overtaking'],
        questionFr: "Quand est-il interdit de dépasser ?",
        questionEn: "When is overtaking forbidden?",
        options: {
            A: { fr: "Au sommet d'une côte sans visibilité suffisante", en: "At the top of a hill without sufficient visibility" },
            B: { fr: "Dans un virage sans visibilité", en: "In a bend without visibility" },
            C: { fr: "Près d'un passage piéton", en: "Near a pedestrian crossing" },
            D: { fr: "Sur une ligne droite avec bonne visibilité", en: "On a straight road with good visibility" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Le dépassement est interdit au sommet d'une côte sans visibilité, dans un virage, et à proximité d'un passage piéton, car la visibilité est insuffisante pour assurer la manœuvre en sécurité.",
        explanationEn: "Overtaking is forbidden at the top of a hill without visibility, in a bend, and near a pedestrian crossing because visibility is insufficient to ensure the maneuver is safe.",
        trapNote: "All three dangerous situations share one thing: insufficient visibility. On a straight road with good visibility, overtaking is allowed.",
        distractorNotes: {
            D: "A straight road with good visibility is exactly where overtaking IS allowed (with proper procedure)."
        },
        vocabulary: [
            { wordFr: "dépasser", wordEn: "to overtake", definition: "To pass a slower vehicle in front of you" },
            { wordFr: "côte", wordEn: "hill", definition: "An uphill section of road" }
        ]
    },
    {
        id: 'croi-002',
        topic: 'croisement_depassement',
        difficulty: 2,
        questionFr: "Pour dépasser un véhicule, de quel côté devez-vous passer ?",
        questionEn: "To overtake a vehicle, which side must you pass on?",
        options: {
            A: { fr: "Par la gauche", en: "On the left" },
            B: { fr: "Par la droite", en: "On the right" },
            C: { fr: "Des deux côtés selon la situation", en: "Either side depending on the situation" },
            D: { fr: "Par le côté le plus large", en: "On the widest side" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "En France, le dépassement se fait toujours par la gauche, sauf cas exceptionnels (véhicule qui tourne à gauche, tramway).",
        explanationEn: "In France, overtaking is always done on the left, with rare exceptions (vehicle turning left, tram).",
        trapNote: "Always overtake on the LEFT in France. Overtaking on the right is a serious violation.",
        distractorNotes: {
            B: "Overtaking on the right is illegal in France in almost all situations.",
            C: "French law is very clear: overtake on the left. There is no 'it depends' except for rare exceptions.",
            D: "The width of the space is not the determining factor — it's always the left side."
        },
        vocabulary: [
            { wordFr: "par la gauche", wordEn: "on the left", definition: "Using the left lane to pass" }
        ]
    },

    // === ARRET ET STATIONNEMENT (Stopping & Parking) ===
    {
        id: 'arret-001',
        topic: 'arret_stationnement',
        difficulty: 2,
        signs: ['no_parking', 'no_stopping'],
        questionFr: "Quelle est la différence entre l'arrêt et le stationnement ?",
        questionEn: "What is the difference between stopping and parking?",
        options: {
            A: { fr: "L'arrêt est momentané et le conducteur reste au volant ou à proximité", en: "Stopping is momentary and the driver stays at the wheel or nearby" },
            B: { fr: "L'arrêt est toujours interdit en ville", en: "Stopping is always forbidden in town" },
            C: { fr: "Le stationnement signifie que le conducteur quitte le véhicule", en: "Parking means the driver leaves the vehicle" },
            D: { fr: "Il n'y a aucune différence", en: "There is no difference" }
        },
        correctAnswers: ["A", "C"],
        answerCount: 2,
        explanationFr: "L'arrêt est une immobilisation momentanée où le conducteur reste au volant ou à proximité immédiate. Le stationnement est une immobilisation prolongée où le conducteur quitte le véhicule ou s'absente.",
        explanationEn: "Stopping is a momentary halt where the driver stays at the wheel or very nearby. Parking means the driver leaves the vehicle or is away for a longer period.",
        trapNote: "The key difference is whether the driver stays with the vehicle (stopping) or leaves it (parking).",
        distractorNotes: {
            B: "Stopping is allowed in many places in town — only certain areas prohibit it.",
            D: "There is a clear legal distinction between stopping (arrêt) and parking (stationnement)."
        },
        vocabulary: [
            { wordFr: "arrêt", wordEn: "stopping", definition: "Brief halt — driver stays in or near the car" },
            { wordFr: "stationnement", wordEn: "parking", definition: "Longer halt — driver leaves the vehicle" }
        ]
    },
    {
        id: 'arret-002',
        topic: 'arret_stationnement',
        difficulty: 3,
        questionFr: "À quelle distance d'une intersection est-il interdit de stationner ?",
        questionEn: "At what distance from an intersection is parking forbidden?",
        options: {
            A: { fr: "3 mètres", en: "3 meters" },
            B: { fr: "5 mètres", en: "5 meters" },
            C: { fr: "10 mètres", en: "10 meters" },
            D: { fr: "15 mètres", en: "15 meters" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Le stationnement est interdit à moins de 5 mètres d'une intersection pour ne pas gêner la visibilité des autres usagers.",
        explanationEn: "Parking is forbidden within 5 meters of an intersection to avoid blocking visibility for other road users.",
        trapNote: "5 meters from intersections. This is a commonly tested number — memorize it!",
        distractorNotes: {
            A: "3 meters is too close — the legal minimum is 5 meters.",
            C: "10 meters is the rule for parking near bus stops, not intersections.",
            D: "15 meters is not the standard intersection distance."
        },
        vocabulary: [
            { wordFr: "stationner", wordEn: "to park", definition: "To leave your vehicle stopped for a period of time" }
        ]
    },

    // === TUNNELS ET PASSAGES A NIVEAU (Tunnels & Level Crossings) ===
    {
        id: 'tunn-001',
        topic: 'tunnels_passages_niveau',
        difficulty: 2,
        signs: ['tunnel'],
        questionFr: "Que devez-vous faire en cas de panne ou d'arrêt forcé dans un tunnel ?",
        questionEn: "What must you do in case of a breakdown or forced stop in a tunnel?",
        options: {
            A: { fr: "Allumer les feux de détresse", en: "Turn on hazard lights" },
            B: { fr: "Couper le moteur", en: "Turn off the engine" },
            C: { fr: "Se diriger vers un abri de sécurité", en: "Head to a safety shelter" },
            D: { fr: "Rester dans le véhicule et attendre les secours", en: "Stay in the vehicle and wait for help" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "En cas d'arrêt dans un tunnel : allumez les feux de détresse, coupez le moteur (pour éviter l'accumulation de gaz), et dirigez-vous vers un abri de sécurité ou une sortie.",
        explanationEn: "If you stop in a tunnel: turn on hazard lights, switch off the engine (to prevent gas buildup), and head to a safety shelter or exit.",
        trapNote: "Do NOT stay in your vehicle in a tunnel — leave it and go to a safety point!",
        distractorNotes: {
            D: "Staying in your vehicle is dangerous in a tunnel — you must evacuate to a safety shelter."
        },
        vocabulary: [
            { wordFr: "feux de détresse", wordEn: "hazard lights", definition: "Flashing indicators that warn other drivers" },
            { wordFr: "abri de sécurité", wordEn: "safety shelter", definition: "A protected space inside a tunnel for emergencies" }
        ]
    },
    {
        id: 'tunn-002',
        topic: 'tunnels_passages_niveau',
        difficulty: 3,
        signs: ['level_crossing'],
        questionFr: "À un passage à niveau, les feux rouges clignotent. Que devez-vous faire ?",
        questionEn: "At a level crossing, the red lights are flashing. What must you do?",
        options: {
            A: { fr: "S'arrêter avant le passage", en: "Stop before the crossing" },
            B: { fr: "Passer rapidement si la barrière n'est pas baissée", en: "Cross quickly if the barrier isn't down" },
            C: { fr: "Attendre l'extinction des feux", en: "Wait until the lights stop" },
            D: { fr: "Klaxonner et passer prudemment", en: "Honk and cross carefully" }
        },
        correctAnswers: ["A", "C"],
        answerCount: 2,
        explanationFr: "Quand les feux rouges clignotent à un passage à niveau, vous devez impérativement vous arrêter et attendre l'extinction complète des feux avant de passer.",
        explanationEn: "When red lights flash at a level crossing, you must stop and wait until the lights go completely off before crossing.",
        trapNote: "Even if the barrier isn't down yet, flashing red lights mean STOP. A train may be approaching.",
        distractorNotes: {
            B: "Crossing a level crossing while lights are flashing is extremely dangerous and illegal.",
            D: "Honking doesn't make a train stop. You must wait for the lights to go off."
        },
        vocabulary: [
            { wordFr: "passage à niveau", wordEn: "level crossing / railroad crossing", definition: "Where a road crosses railway tracks" },
            { wordFr: "barrière", wordEn: "barrier/gate", definition: "The arm that lowers to block traffic when a train is coming" }
        ]
    },

    // === SIGNALISATION (Road Signs & Signals) ===
    {
        id: 'sign-001',
        topic: 'signalisation',
        difficulty: 1,
        questionFr: "Que signifie un panneau rond à fond bleu ?",
        questionEn: "What does a round sign with a blue background mean?",
        options: {
            A: { fr: "Interdiction", en: "Prohibition" },
            B: { fr: "Obligation", en: "Obligation / mandatory" },
            C: { fr: "Danger", en: "Danger" },
            D: { fr: "Information", en: "Information" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Les panneaux ronds à fond bleu sont des panneaux d'obligation. Ils indiquent une direction ou une action obligatoire.",
        explanationEn: "Round signs with a blue background are obligation/mandatory signs. They indicate a required direction or action.",
        trapNote: "Round + blue = obligation. Round + red border = prohibition. Triangle = danger. Rectangle = information.",
        distractorNotes: {
            A: "Prohibition signs are round with a RED border on white background.",
            C: "Danger signs are TRIANGLES with red borders, not round blue signs.",
            D: "Information signs are RECTANGULAR, not round."
        },
        vocabulary: [
            { wordFr: "panneau d'obligation", wordEn: "mandatory sign", definition: "A sign that tells you what you MUST do" },
            { wordFr: "fond bleu", wordEn: "blue background", definition: "The background color of the sign" }
        ]
    },
    {
        id: 'sign-002',
        topic: 'signalisation',
        difficulty: 2,
        signs: ['traffic_light'],
        questionFr: "Un feu orange fixe signifie :",
        questionEn: "A steady amber/yellow traffic light means:",
        options: {
            A: { fr: "Passez rapidement", en: "Go quickly" },
            B: { fr: "Arrêtez-vous si possible, sinon passez avec prudence", en: "Stop if possible, otherwise proceed with caution" },
            C: { fr: "Accélérez avant que le feu passe au rouge", en: "Speed up before the light turns red" },
            D: { fr: "Tournez à gauche", en: "Turn left" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Un feu orange fixe signifie que vous devez vous arrêter, sauf si vous êtes trop près pour le faire en toute sécurité. Dans ce cas, passez avec prudence.",
        explanationEn: "A steady amber light means you should stop, unless you're too close to stop safely. In that case, proceed with caution.",
        trapNote: "Amber means STOP unless you can't safely. It does NOT mean 'hurry up and go'!",
        distractorNotes: {
            A: "You should not 'go quickly' — the purpose of amber is to prepare you to stop.",
            C: "Accelerating on amber is dangerous and illegal. The light is about to turn red.",
            D: "Amber has nothing to do with turning left."
        },
        vocabulary: [
            { wordFr: "feu orange", wordEn: "amber/yellow light", definition: "The middle traffic light between green and red" }
        ]
    },
    {
        id: 'sign-003',
        topic: 'signalisation',
        difficulty: 2,
        signs: ['no_overtaking'],
        questionFr: "Que signifie une ligne continue au milieu de la route ?",
        questionEn: "What does a continuous line in the middle of the road mean?",
        options: {
            A: { fr: "Interdiction de franchir ou de chevaucher la ligne", en: "Forbidden to cross or straddle the line" },
            B: { fr: "Dépassement autorisé avec prudence", en: "Overtaking allowed with caution" },
            C: { fr: "Voie réservée aux bus", en: "Bus lane" },
            D: { fr: "Zone de stationnement", en: "Parking zone" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Une ligne continue interdit de la franchir ou de la chevaucher. Vous ne pouvez ni dépasser ni changer de voie à cet endroit.",
        explanationEn: "A continuous line means you cannot cross or straddle it. You cannot overtake or change lanes at this point.",
        trapNote: "Continuous line = no crossing at all. Dashed line = you may cross. Simple rule!",
        distractorNotes: {
            B: "A continuous line prohibits ALL overtaking. Only a dashed line allows it.",
            C: "Bus lanes have their own specific markings and signs.",
            D: "Road center lines have nothing to do with parking zones."
        },
        vocabulary: [
            { wordFr: "ligne continue", wordEn: "continuous/solid line", definition: "An unbroken line painted on the road" },
            { wordFr: "franchir", wordEn: "to cross", definition: "To drive across the line to the other side" }
        ]
    },
    {
        id: 'sign-004',
        topic: 'signalisation',
        difficulty: 3,
        signs: ['danger'],
        questionFr: "Quelles affirmations sur les panneaux triangulaires sont correctes ?",
        questionEn: "Which statements about triangular signs are correct?",
        options: {
            A: { fr: "Ils signalent un danger", en: "They signal danger" },
            B: { fr: "Ils ont un bord rouge", en: "They have a red border" },
            C: { fr: "Ils sont placés environ 150m avant le danger hors agglomération", en: "They are placed about 150m before the danger outside built-up areas" },
            D: { fr: "Ils indiquent une obligation", en: "They indicate an obligation" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Les panneaux triangulaires à bord rouge sont des panneaux de danger. Hors agglomération, ils sont placés environ 150 mètres avant le danger. En agglomération, la distance est réduite (environ 50m).",
        explanationEn: "Triangular signs with red borders are danger signs. Outside built-up areas, they're placed about 150m before the danger. In town, the distance is reduced (about 50m).",
        trapNote: "Triangle + red = DANGER warning. They warn you in advance so you can prepare.",
        distractorNotes: {
            D: "Obligation signs are ROUND with BLUE backgrounds, not triangular."
        },
        vocabulary: [
            { wordFr: "panneau de danger", wordEn: "danger/warning sign", definition: "A sign that warns you of a hazard ahead" }
        ]
    },

    // === NOTIONS DIVERSES (Miscellaneous) ===
    {
        id: 'div-001',
        topic: 'notions_diverses',
        difficulty: 2,
        questionFr: "En cas d'accident, quels sont les premiers gestes à effectuer ?",
        questionEn: "In case of an accident, what are the first actions to take?",
        options: {
            A: { fr: "Protéger – Alerter – Secourir", en: "Protect – Alert – Help" },
            B: { fr: "Secourir – Protéger – Alerter", en: "Help – Protect – Alert" },
            C: { fr: "Alerter – Secourir – Protéger", en: "Alert – Help – Protect" },
            D: { fr: "Fuir – Appeler – Attendre", en: "Flee – Call – Wait" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "L'ordre est PAS: Protéger (sécuriser la zone), Alerter (appeler le 15, 18 ou 112), Secourir (premiers soins si formé).",
        explanationEn: "The order is PAS: Protect (secure the area), Alert (call 15, 18, or 112), Help (first aid if trained). PAS is the French acronym.",
        trapNote: "Remember PAS: Protéger, Alerter, Secourir. Always protect the scene first!",
        distractorNotes: {
            B: "You must protect the scene BEFORE helping victims — otherwise rescuers could get hurt too.",
            C: "Alerting before protecting risks additional accidents at the scene.",
            D: "Fleeing an accident scene is a criminal offense in France."
        },
        vocabulary: [
            { wordFr: "protéger", wordEn: "to protect", definition: "To secure the accident scene from further danger" },
            { wordFr: "alerter", wordEn: "to alert", definition: "To call emergency services (112, 15, or 18)" },
            { wordFr: "secourir", wordEn: "to help/rescue", definition: "To give first aid to injured people" }
        ]
    },
    {
        id: 'div-002',
        topic: 'notions_diverses',
        difficulty: 2,
        questionFr: "Quel numéro d'urgence européen est valable dans tous les pays de l'UE ?",
        questionEn: "Which European emergency number works in all EU countries?",
        options: {
            A: { fr: "15", en: "15" },
            B: { fr: "18", en: "18" },
            C: { fr: "112", en: "112" },
            D: { fr: "911", en: "911" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "Le 112 est le numéro d'urgence européen, gratuit et accessible depuis n'importe quel pays de l'UE, même sans carte SIM.",
        explanationEn: "112 is the European emergency number, free and accessible from any EU country, even without a SIM card.",
        trapNote: "112 works everywhere in Europe. 15 is French SAMU (medical), 18 is French firefighters. 911 is American.",
        distractorNotes: {
            A: "15 is the French medical emergency number (SAMU) — it doesn't work across all EU countries.",
            B: "18 is the French fire department number — it's France-specific.",
            D: "911 is the American emergency number, not European."
        },
        vocabulary: [
            { wordFr: "numéro d'urgence", wordEn: "emergency number", definition: "A phone number to call for help in an emergency" }
        ]
    },
    {
        id: 'div-003',
        topic: 'notions_diverses',
        difficulty: 2,
        questionFr: "Quels sont les principes de l'écoconduite ?",
        questionEn: "What are the principles of eco-driving?",
        options: {
            A: { fr: "Anticiper et conduire en souplesse", en: "Anticipate and drive smoothly" },
            B: { fr: "Maintenir une vitesse stable", en: "Maintain a stable speed" },
            C: { fr: "Vérifier régulièrement la pression des pneus", en: "Regularly check tire pressure" },
            D: { fr: "Accélérer fortement pour atteindre rapidement la vitesse souhaitée", en: "Accelerate hard to reach desired speed quickly" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "L'écoconduite repose sur l'anticipation, la conduite souple, le maintien d'une vitesse stable et l'entretien du véhicule (pression des pneus, etc.).",
        explanationEn: "Eco-driving is based on anticipation, smooth driving, maintaining stable speed, and vehicle maintenance (tire pressure, etc.).",
        trapNote: "Eco-driving is about smoothness and anticipation — harsh acceleration is the opposite of eco-driving.",
        distractorNotes: {
            D: "Hard acceleration wastes fuel and increases emissions — the opposite of eco-driving."
        },
        vocabulary: [
            { wordFr: "écoconduite", wordEn: "eco-driving", definition: "Driving techniques that save fuel and reduce emissions" },
            { wordFr: "anticiper", wordEn: "to anticipate", definition: "To look ahead and plan your actions in advance" }
        ]
    },

    // === Additional questions for exam coverage ===
    {
        id: 'circ-005',
        topic: 'circulation',
        difficulty: 1,
        questionFr: "Quand est-il obligatoire de porter la ceinture de sécurité ?",
        questionEn: "When is it mandatory to wear a seatbelt?",
        options: {
            A: { fr: "Uniquement sur autoroute", en: "Only on motorways" },
            B: { fr: "En toutes circonstances, à l'avant et à l'arrière", en: "In all circumstances, front and rear" },
            C: { fr: "Uniquement à l'avant du véhicule", en: "Only in the front of the vehicle" },
            D: { fr: "Uniquement en ville", en: "Only in town" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Le port de la ceinture est obligatoire pour tous les occupants du véhicule, à l'avant comme à l'arrière, sur tous les types de route.",
        explanationEn: "Wearing a seatbelt is mandatory for all vehicle occupants, both front and rear, on all types of road.",
        trapNote: "ALL passengers, ALL seats, ALL roads. No exceptions!",
        distractorNotes: {
            A: "Seatbelts are required on all roads, not just motorways.",
            C: "Since 1990, rear seatbelts are also mandatory in France.",
            D: "Seatbelts are required everywhere — town, countryside, motorway."
        },
        vocabulary: [
            { wordFr: "ceinture de sécurité", wordEn: "seatbelt", definition: "The strap that keeps you safe in your seat" }
        ]
    },
    {
        id: 'prio-004',
        topic: 'priorite',
        difficulty: 3,
        signs: ['priority_right'],
        scenario: 'emergency_vehicle',
        questionFr: "Un véhicule d'urgence (pompiers, SAMU) approche avec sirène et gyrophare. Que devez-vous faire ?",
        questionEn: "An emergency vehicle (fire truck, ambulance) approaches with siren and flashing lights. What must you do?",
        options: {
            A: { fr: "Vous ranger sur le côté droit pour le laisser passer", en: "Pull over to the right to let it pass" },
            B: { fr: "Accélérer pour ne pas le gêner", en: "Speed up so you don't block it" },
            C: { fr: "Continuer normalement", en: "Continue normally" },
            D: { fr: "S'arrêter immédiatement sur place", en: "Stop immediately where you are" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Vous devez vous ranger sur le côté droit de la chaussée pour laisser passer le véhicule d'urgence en toute sécurité.",
        explanationEn: "You must pull over to the right side of the road to let the emergency vehicle pass safely.",
        trapNote: "Pull to the RIGHT and stop if needed. Don't stop in the middle of the road or accelerate.",
        distractorNotes: {
            B: "Accelerating is dangerous — pull over safely instead.",
            C: "You must actively make way for emergency vehicles.",
            D: "Stopping where you are could block the emergency vehicle. Pull to the right first."
        },
        vocabulary: [
            { wordFr: "gyrophare", wordEn: "flashing light / beacon", definition: "The rotating or flashing light on emergency vehicles" },
            { wordFr: "se ranger", wordEn: "to pull over", definition: "To move your vehicle to the side of the road" }
        ]
    },
    {
        id: 'route-003',
        topic: 'route',
        difficulty: 2,
        signs: ['dipped_headlights'],
        questionFr: "Quand devez-vous utiliser les feux de route (pleins phares) ?",
        questionEn: "When should you use full beam headlights?",
        options: {
            A: { fr: "La nuit, hors agglomération, quand aucun véhicule n'approche", en: "At night, outside built-up areas, when no vehicle is approaching" },
            B: { fr: "En permanence la nuit", en: "Always at night" },
            C: { fr: "En agglomération la nuit", en: "In built-up areas at night" },
            D: { fr: "En cas de brouillard", en: "In fog" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Les feux de route ne doivent être utilisés que hors agglomération et en l'absence de véhicule en face pour éviter l'éblouissement.",
        explanationEn: "Full beam headlights should only be used outside built-up areas and when no vehicle is approaching, to avoid blinding other drivers.",
        trapNote: "Full beams blind other drivers! Switch to dipped headlights when you see another vehicle.",
        distractorNotes: {
            B: "You must switch to dipped headlights when vehicles approach.",
            C: "In built-up areas, street lighting means you should use dipped headlights, not full beams.",
            D: "In fog, full beams make visibility WORSE because light reflects off the fog particles. Use fog lights."
        },
        vocabulary: [
            { wordFr: "feux de route", wordEn: "full beam / high beam headlights", definition: "The brightest headlights that illuminate far ahead" },
            { wordFr: "éblouissement", wordEn: "glare / dazzle", definition: "When bright light blinds or disorients you" }
        ]
    },
    {
        id: 'autr-003',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "Quelles précautions devez-vous prendre à proximité d'un bus scolaire à l'arrêt ?",
        questionEn: "What precautions must you take near a stopped school bus?",
        options: {
            A: { fr: "Ralentir et être prêt à s'arrêter", en: "Slow down and be ready to stop" },
            B: { fr: "Klaxonner pour avertir les enfants", en: "Honk to warn the children" },
            C: { fr: "Continuer à vitesse normale", en: "Continue at normal speed" },
            D: { fr: "Dépasser rapidement le bus", en: "Quickly overtake the bus" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Vous devez ralentir et être prêt à vous arrêter car des enfants peuvent traverser de manière imprévisible.",
        explanationEn: "You must slow down and be ready to stop because children may cross unpredictably.",
        trapNote: "Children are unpredictable near school buses. Always expect them to run into the road.",
        distractorNotes: {
            B: "Honking near children can startle them and cause them to run into the road.",
            C: "Normal speed near a school bus is dangerous — children may cross at any moment.",
            D: "Overtaking a stopped school bus puts children in extreme danger."
        },
        vocabulary: [
            { wordFr: "bus scolaire", wordEn: "school bus", definition: "A bus that transports children to and from school" }
        ]
    },
    {
        id: 'cond-005',
        topic: 'conducteur',
        difficulty: 3,
        questionFr: "Quels médicaments peuvent affecter la conduite ?",
        questionEn: "Which medications can affect driving?",
        options: {
            A: { fr: "Les antihistaminiques (anti-allergiques)", en: "Antihistamines (anti-allergy)" },
            B: { fr: "Les somnifères et anxiolytiques", en: "Sleeping pills and anti-anxiety medication" },
            C: { fr: "Certains antidouleurs", en: "Certain painkillers" },
            D: { fr: "Les vitamines", en: "Vitamins" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Les antihistaminiques, les somnifères, les anxiolytiques et certains antidouleurs peuvent provoquer de la somnolence et affecter la conduite. Vérifiez les pictogrammes sur l'emballage.",
        explanationEn: "Antihistamines, sleeping pills, anti-anxiety medication, and some painkillers can cause drowsiness and affect driving. Check the pictograms on the packaging.",
        trapNote: "Look for warning pictograms on medication packaging: levels 1 (caution), 2 (be very careful), and 3 (do not drive).",
        distractorNotes: {
            D: "Vitamins do not affect your ability to drive."
        },
        vocabulary: [
            { wordFr: "somnolence", wordEn: "drowsiness", definition: "Feeling sleepy" },
            { wordFr: "pictogramme", wordEn: "pictogram", definition: "A small symbol/image on medication packaging warning about driving" }
        ]
    },
    {
        id: 'sign-005',
        topic: 'signalisation',
        difficulty: 1,
        signs: ['no_entry'],
        questionFr: "Que signifie un panneau rond avec un bord rouge et une barre horizontale blanche ?",
        questionEn: "What does a round sign with a red border and a white horizontal bar mean?",
        options: {
            A: { fr: "Sens interdit", en: "No entry" },
            B: { fr: "Passage obligatoire", en: "Mandatory passage" },
            C: { fr: "Route prioritaire", en: "Priority road" },
            D: { fr: "Voie sans issue", en: "Dead end" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Le panneau rond avec un bord rouge et une barre blanche horizontale signifie 'sens interdit'. Vous ne devez pas vous engager dans cette voie.",
        explanationEn: "The round sign with a red border and white horizontal bar means 'no entry'. You must not enter this road.",
        trapNote: "Red circle + white bar = NO ENTRY. This is one of the most recognizable signs — don't confuse it with other prohibition signs.",
        distractorNotes: {
            B: "Mandatory passage signs are round and BLUE, not red.",
            C: "The priority road sign is a yellow diamond, not a red circle.",
            D: "Dead end signs are rectangular with a specific cul-de-sac symbol."
        },
        vocabulary: [
            { wordFr: "sens interdit", wordEn: "no entry / wrong way", definition: "You cannot drive into this road from this direction" }
        ]
    },
    {
        id: 'div-004',
        topic: 'notions_diverses',
        difficulty: 2,
        questionFr: "Quels équipements de sécurité doivent obligatoirement se trouver dans un véhicule ?",
        questionEn: "Which safety equipment must be present in a vehicle?",
        options: {
            A: { fr: "Un gilet de haute visibilité", en: "A high-visibility vest" },
            B: { fr: "Un triangle de présignalisation", en: "A warning triangle" },
            C: { fr: "Un extincteur", en: "A fire extinguisher" },
            D: { fr: "Une trousse de secours", en: "A first aid kit" }
        },
        correctAnswers: ["A", "B"],
        answerCount: 2,
        explanationFr: "En France, un gilet de haute visibilité et un triangle de présignalisation sont obligatoires dans chaque véhicule. L'extincteur et la trousse de secours sont recommandés mais pas obligatoires pour les voitures particulières.",
        explanationEn: "In France, a high-visibility vest and a warning triangle are mandatory in every vehicle. A fire extinguisher and first aid kit are recommended but not legally required for private cars.",
        trapNote: "Only the vest and triangle are legally MANDATORY for private cars in France.",
        distractorNotes: {
            C: "Fire extinguishers are mandatory in commercial vehicles and buses, not private cars.",
            D: "First aid kits are required in some countries (like Germany) but not in France for private vehicles."
        },
        vocabulary: [
            { wordFr: "gilet de haute visibilité", wordEn: "high-visibility vest", definition: "A bright yellow/orange vest to make you visible at the roadside" },
            { wordFr: "triangle de présignalisation", wordEn: "warning triangle", definition: "A reflective triangle placed behind your car to warn other drivers" }
        ]
    },
    {
        id: 'croi-003',
        topic: 'croisement_depassement',
        difficulty: 2,
        questionFr: "En montagne, sur une route étroite, qui a la priorité entre un véhicule montant et un véhicule descendant ?",
        questionEn: "On a narrow mountain road, who has priority between a vehicle going up and one coming down?",
        options: {
            A: { fr: "Le véhicule montant", en: "The vehicle going uphill" },
            B: { fr: "Le véhicule descendant", en: "The vehicle going downhill" },
            C: { fr: "Le véhicule le plus gros", en: "The larger vehicle" },
            D: { fr: "Le premier arrivé", en: "Whoever arrived first" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Sur une route de montagne étroite, le véhicule montant a la priorité car il est plus difficile de s'arrêter et de redémarrer en côte.",
        explanationEn: "On a narrow mountain road, the vehicle going uphill has priority because stopping and restarting on a slope is more difficult.",
        trapNote: "Uphill vehicle has priority because stopping and restarting on a hill is harder than going downhill.",
        distractorNotes: {
            B: "The descending vehicle should yield because it's easier to stop and restart when going downhill.",
            C: "Vehicle size is not a factor in this priority rule.",
            D: "Arrival order doesn't determine priority in mountain road situations."
        },
        vocabulary: [
            { wordFr: "montant", wordEn: "going uphill", definition: "Driving up a slope" },
            { wordFr: "descendant", wordEn: "going downhill", definition: "Driving down a slope" }
        ]
    },
    {
        id: 'arret-003',
        topic: 'arret_stationnement',
        difficulty: 2,
        signs: ['no_parking'],
        questionFr: "Le stationnement en double file est :",
        questionEn: "Double parking is:",
        options: {
            A: { fr: "Toujours interdit", en: "Always forbidden" },
            B: { fr: "Autorisé pour une courte durée", en: "Allowed for a short time" },
            C: { fr: "Autorisé en dehors des heures de pointe", en: "Allowed outside rush hours" },
            D: { fr: "Autorisé avec les feux de détresse", en: "Allowed with hazard lights on" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Le stationnement en double file est toujours interdit. Il gêne la circulation et peut être dangereux.",
        explanationEn: "Double parking is always forbidden. It blocks traffic and can be dangerous.",
        trapNote: "No excuses — double parking is ALWAYS illegal, even with hazard lights, even for 'just a minute'.",
        distractorNotes: {
            B: "There is no 'short time' exception for double parking.",
            C: "Double parking is forbidden at all times, regardless of traffic conditions.",
            D: "Hazard lights do not make illegal parking legal."
        },
        vocabulary: [
            { wordFr: "double file", wordEn: "double parking", definition: "Parking alongside a car that is already parked at the curb" }
        ]
    },
    // Extra questions for better exam coverage
    {
        id: 'route-004',
        topic: 'route',
        difficulty: 3,
        questionFr: "Sur une route verglacée, la distance de freinage est multipliée par :",
        questionEn: "On an icy road, the braking distance is multiplied by:",
        options: {
            A: { fr: "2", en: "2" },
            B: { fr: "4", en: "4" },
            C: { fr: "6 à 8", en: "6 to 8" },
            D: { fr: "10", en: "10" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "Sur une route verglacée, la distance de freinage peut être multipliée par 6 à 8 fois par rapport à une route sèche. La prudence extrême est de mise.",
        explanationEn: "On an icy road, braking distance can be 6 to 8 times longer than on a dry road. Extreme caution is needed.",
        trapNote: "Wet = x2, Icy = x6 to x8. Ice is FAR more dangerous than rain!",
        distractorNotes: {
            A: "x2 is for wet roads, not icy ones.",
            B: "x4 underestimates the danger of ice.",
            D: "x10 is an overestimate, though being extra cautious on ice is never wrong."
        },
        vocabulary: [
            { wordFr: "verglas", wordEn: "black ice", definition: "A thin, transparent layer of ice on the road surface" }
        ]
    },
    {
        id: 'prio-005',
        topic: 'priorite',
        difficulty: 2,
        signs: ['stop'],
        scenario: 'four_way_stop',
        questionFr: "Un panneau 'STOP' vous oblige à :",
        questionEn: "A STOP sign requires you to:",
        options: {
            A: { fr: "Marquer un arrêt complet et céder le passage", en: "Come to a complete stop and yield" },
            B: { fr: "Simplement ralentir", en: "Simply slow down" },
            C: { fr: "S'arrêter uniquement si un véhicule approche", en: "Stop only if a vehicle is approaching" },
            D: { fr: "Klaxonner avant de passer", en: "Honk before passing" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Un panneau STOP impose un arrêt complet au niveau de la ligne d'arrêt, même si aucun véhicule n'est visible. Vous devez ensuite céder le passage.",
        explanationEn: "A STOP sign requires a complete stop at the stop line, even if no vehicles are visible. You must then yield to crossing traffic.",
        trapNote: "STOP means COMPLETE stop — even at 3 AM with nobody around. Then yield.",
        distractorNotes: {
            B: "Slowing down is not enough — you must come to a FULL stop.",
            C: "You must stop regardless of whether other vehicles are visible.",
            D: "Honking has nothing to do with STOP signs."
        },
        vocabulary: [
            { wordFr: "arrêt complet", wordEn: "complete stop", definition: "Your vehicle must be fully stopped, with zero speed" },
            { wordFr: "ligne d'arrêt", wordEn: "stop line", definition: "The white line on the road where you must stop" }
        ]
    },

    // ═══════════════════════════════════════════
    // BATCH 2 — 65 NEW QUESTIONS (Session 2)
    // ═══════════════════════════════════════════

    // === CIRCULATION (Traffic Rules) — 6 more ===
    {
        id: 'circ-006',
        topic: 'circulation',
        difficulty: 1,
        signs: ['no_overtaking'],
        questionFr: "Quel panneau indique une interdiction de dépasser ?",
        questionEn: "Which sign indicates a no-overtaking zone?",
        options: {
            A: { fr: "Un cercle rouge avec deux voitures côte à côte", en: "A red circle with two cars side by side" },
            B: { fr: "Un triangle avec deux flèches", en: "A triangle with two arrows" },
            C: { fr: "Un cercle bleu avec une flèche", en: "A blue circle with an arrow" },
            D: { fr: "Un carré bleu avec une voiture", en: "A blue square with a car" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "L'interdiction de dépasser est signalée par un panneau circulaire à bord rouge montrant deux voitures côte à côte, la rouge à gauche dépassant la noire.",
        explanationEn: "The no-overtaking sign is a circular sign with a red border showing two cars side by side, with the red car on the left overtaking the black one.",
        trapNote: "The red car is always on the left. If the sign has the cars with the black one in front, it's still no overtaking.",
        distractorNotes: {
            B: "Triangular signs are warning signs, not prohibition signs.",
            C: "Blue circular signs indicate mandatory directions, not prohibitions.",
            D: "Blue square signs are informational, not regulatory."
        },
        vocabulary: [
            { wordFr: "dépasser", wordEn: "to overtake", definition: "Passing another vehicle moving in the same direction" },
            { wordFr: "interdiction", wordEn: "prohibition", definition: "Something that is not allowed" }
        ]
    },
    {
        id: 'circ-007',
        topic: 'circulation',
        difficulty: 2,
        signs: ['speed_110'],
        questionFr: "Quelle est la vitesse maximale autorisée sur une route à chaussées séparées par un terre-plein central, hors agglomération ?",
        questionEn: "What is the maximum speed on a dual carriageway separated by a central reservation, outside built-up areas?",
        options: {
            A: { fr: "80 km/h", en: "80 km/h" },
            B: { fr: "90 km/h", en: "90 km/h" },
            C: { fr: "110 km/h", en: "110 km/h" },
            D: { fr: "130 km/h", en: "130 km/h" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "Sur une route à chaussées séparées par un terre-plein central, la vitesse maximale est de 110 km/h. C'est entre la route ordinaire (80 km/h) et l'autoroute (130 km/h).",
        explanationEn: "On a dual carriageway separated by a central reservation, the maximum speed is 110 km/h. This is between an ordinary road (80 km/h) and a motorway (130 km/h).",
        trapNote: "110 km/h is specifically for roads with physical separation — not just a painted line. Without a terre-plein, it's 80 km/h.",
        distractorNotes: {
            A: "80 km/h is for ordinary two-way roads without a central separator.",
            B: "90 km/h is no longer a standard limit since the 2018 reform.",
            D: "130 km/h is reserved for motorways (autoroutes) only."
        },
        vocabulary: [
            { wordFr: "chaussées séparées", wordEn: "dual carriageway", definition: "A road where opposing traffic lanes are physically separated" },
            { wordFr: "terre-plein central", wordEn: "central reservation", definition: "The strip of land dividing opposing lanes" }
        ]
    },
    {
        id: 'circ-008',
        topic: 'circulation',
        difficulty: 2,
        signs: ['dipped_headlights'],
        questionFr: "Quand devez-vous allumer vos feux de croisement ?",
        questionEn: "When must you turn on your dipped headlights?",
        options: {
            A: { fr: "Uniquement la nuit", en: "Only at night" },
            B: { fr: "La nuit et quand la visibilité est insuffisante", en: "At night and when visibility is poor" },
            C: { fr: "Uniquement par temps de pluie", en: "Only in rainy weather" },
            D: { fr: "Uniquement en agglomération", en: "Only in built-up areas" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Les feux de croisement doivent être allumés la nuit et chaque fois que la visibilité est insuffisante (pluie, brouillard, neige, crépuscule).",
        explanationEn: "Dipped headlights must be turned on at night and whenever visibility is poor (rain, fog, snow, twilight).",
        trapNote: "It's not just at night — poor visibility during the day (fog, heavy rain) also requires dipped headlights.",
        distractorNotes: {
            A: "Night is not the only time — any poor visibility condition requires them.",
            C: "Rain is one reason, but not the only one.",
            D: "Location doesn't determine when to use them — visibility conditions do."
        },
        vocabulary: [
            { wordFr: "feux de croisement", wordEn: "dipped headlights", definition: "Low beam headlights that illuminate without blinding oncoming traffic" },
            { wordFr: "visibilité insuffisante", wordEn: "poor visibility", definition: "When you cannot see clearly due to weather or darkness" }
        ]
    },
    {
        id: 'circ-009',
        topic: 'circulation',
        difficulty: 3,
        questionFr: "Quelles sont les conséquences possibles en cas de grand excès de vitesse (plus de 50 km/h au-dessus de la limite) ?",
        questionEn: "What are the possible consequences of a major speeding offence (more than 50 km/h over the limit)?",
        options: {
            A: { fr: "Retrait de 6 points sur le permis", en: "Loss of 6 points on the licence" },
            B: { fr: "Suspension du permis jusqu'à 3 ans", en: "Licence suspension up to 3 years" },
            C: { fr: "Amende de 1 500 euros maximum", en: "Maximum fine of 1,500 euros" },
            D: { fr: "Retrait de 2 points seulement", en: "Loss of only 2 points" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Un excès de vitesse de plus de 50 km/h entraîne un retrait de 6 points, une amende pouvant aller jusqu'à 1 500 euros, et une suspension de permis pouvant aller jusqu'à 3 ans.",
        explanationEn: "Speeding by more than 50 km/h results in a 6-point deduction, a fine up to 1,500 euros, and a licence suspension of up to 3 years.",
        trapNote: "This is one of the most severe traffic offences. It can also result in vehicle confiscation if repeated.",
        distractorNotes: {
            D: "2 points is far too lenient — a 50+ km/h excess is the maximum 6-point deduction."
        },
        vocabulary: [
            { wordFr: "excès de vitesse", wordEn: "speeding offence", definition: "Driving faster than the legal speed limit" },
            { wordFr: "retrait de points", wordEn: "point deduction", definition: "Points removed from your driving licence" }
        ]
    },
    {
        id: 'circ-010',
        topic: 'circulation',
        difficulty: 1,
        signs: ['traffic_light'],
        questionFr: "Que signifie un feu orange fixe ?",
        questionEn: "What does a steady amber traffic light mean?",
        options: {
            A: { fr: "Vous pouvez passer si la voie est libre", en: "You can proceed if the way is clear" },
            B: { fr: "Vous devez vous arrêter sauf si l'arrêt est dangereux", en: "You must stop unless stopping is dangerous" },
            C: { fr: "Vous devez accélérer pour passer", en: "You must speed up to pass" },
            D: { fr: "Le feu est en panne", en: "The light is broken" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Le feu orange fixe signifie que vous devez vous arrêter. La seule exception est si vous êtes si près que freiner serait dangereux.",
        explanationEn: "A steady amber light means you must stop. The only exception is if you are so close that braking would be dangerous.",
        trapNote: "Amber does NOT mean 'speed up to beat the red'. It means STOP unless stopping would cause an accident.",
        distractorNotes: {
            A: "This is incorrect — amber means stop, not proceed.",
            C: "Accelerating through an amber light is dangerous and illegal.",
            D: "A broken traffic light flashes amber — a steady amber is part of normal operation."
        },
        vocabulary: [
            { wordFr: "feu orange", wordEn: "amber light", definition: "The yellow/orange traffic light between green and red" },
            { wordFr: "arrêt dangereux", wordEn: "dangerous stop", definition: "When stopping suddenly would risk a rear-end collision" }
        ]
    },
    {
        id: 'circ-011',
        topic: 'circulation',
        difficulty: 2,
        signs: ['speed_30', 'town_entry'],
        questionFr: "Dans une zone 30, quelles règles s'appliquent ?",
        questionEn: "In a 30 km/h zone, which rules apply?",
        options: {
            A: { fr: "La vitesse est limitée à 30 km/h", en: "Speed is limited to 30 km/h" },
            B: { fr: "Les piétons ont toujours la priorité", en: "Pedestrians always have priority" },
            C: { fr: "Le stationnement est interdit", en: "Parking is prohibited" },
            D: { fr: "Les cyclistes peuvent rouler dans les deux sens", en: "Cyclists can ride in both directions" }
        },
        correctAnswers: ["A", "D"],
        answerCount: 2,
        explanationFr: "Dans une zone 30, la vitesse est limitée à 30 km/h et les cyclistes sont autorisés à circuler dans les deux sens, sauf signalisation contraire. Les piétons n'ont pas systématiquement la priorité.",
        explanationEn: "In a 30 km/h zone, speed is limited to 30 km/h and cyclists are allowed to ride in both directions unless otherwise indicated. Pedestrians do not automatically have priority.",
        trapNote: "Don't confuse zone 30 with an aire piétonne (pedestrian area) where pedestrians DO have priority.",
        distractorNotes: {
            B: "Pedestrians have priority in pedestrian zones (aires piétonnes), not in all zone 30 areas.",
            C: "Parking is not automatically prohibited in zone 30."
        },
        vocabulary: [
            { wordFr: "zone 30", wordEn: "30 km/h zone", definition: "A low-speed residential or urban area" },
            { wordFr: "double sens cyclable", wordEn: "two-way cycling", definition: "Cyclists can legally travel in both directions on a one-way street" }
        ]
    },

    // === CONDUCTEUR (The Driver) — 6 more ===
    {
        id: 'cond-006',
        topic: 'conducteur',
        difficulty: 2,
        questionFr: "Combien de points comporte le permis de conduire en France à l'issue de la période probatoire ?",
        questionEn: "How many points does a French driving licence have after the probationary period?",
        options: {
            A: { fr: "6 points", en: "6 points" },
            B: { fr: "8 points", en: "8 points" },
            C: { fr: "10 points", en: "10 points" },
            D: { fr: "12 points", en: "12 points" }
        },
        correctAnswers: ["D"],
        answerCount: 1,
        explanationFr: "Le permis de conduire comporte un capital maximal de 12 points. Pendant la période probatoire, le conducteur débute avec 6 points et gagne des points chaque année sans infraction.",
        explanationEn: "The driving licence has a maximum of 12 points. During the probationary period, drivers start with 6 points and gain points each year without offences.",
        trapNote: "New drivers start with 6, not 12. They reach 12 after 3 years (or 2 with accompanied driving) without infractions.",
        distractorNotes: {
            A: "6 points is the starting capital for new drivers, not the full amount.",
            B: "8 points is not a standard milestone in the French point system.",
            C: "10 points is not the maximum — the full licence has 12."
        },
        vocabulary: [
            { wordFr: "période probatoire", wordEn: "probationary period", definition: "The first 3 years after obtaining a licence (2 with accompanied driving)" },
            { wordFr: "capital de points", wordEn: "point balance", definition: "The total number of points on your licence" }
        ]
    },
    {
        id: 'cond-007',
        topic: 'conducteur',
        difficulty: 2,
        questionFr: "Après combien d'heures de conduite sans pause le risque d'accident augmente-t-il significativement ?",
        questionEn: "After how many hours of driving without a break does the risk of accident increase significantly?",
        options: {
            A: { fr: "1 heure", en: "1 hour" },
            B: { fr: "2 heures", en: "2 hours" },
            C: { fr: "4 heures", en: "4 hours" },
            D: { fr: "6 heures", en: "6 hours" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Après 2 heures de conduite continue, la fatigue diminue la vigilance et les réflexes. Il est recommandé de faire une pause de 15 à 20 minutes toutes les 2 heures.",
        explanationEn: "After 2 hours of continuous driving, fatigue reduces alertness and reaction time. A 15-20 minute break is recommended every 2 hours.",
        trapNote: "The recommendation is every 2 hours, not when you feel tired. Fatigue impairs judgment about your own tiredness.",
        distractorNotes: {
            A: "1 hour is too short — the standard recommendation is 2 hours.",
            C: "4 hours is far too long without a break — fatigue is significant well before this.",
            D: "6 hours without stopping would be extremely dangerous."
        },
        vocabulary: [
            { wordFr: "pause", wordEn: "break", definition: "A rest stop during a journey" },
            { wordFr: "vigilance", wordEn: "alertness", definition: "Being attentive and aware of your surroundings" }
        ]
    },
    {
        id: 'cond-008',
        topic: 'conducteur',
        difficulty: 3,
        questionFr: "Quels sont les effets de l'alcool sur la conduite ?",
        questionEn: "What are the effects of alcohol on driving?",
        options: {
            A: { fr: "Augmentation du temps de réaction", en: "Increased reaction time" },
            B: { fr: "Rétrécissement du champ visuel", en: "Narrowing of the field of vision" },
            C: { fr: "Surestimation de ses capacités", en: "Overestimation of one's abilities" },
            D: { fr: "Amélioration de la concentration", en: "Improved concentration" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "L'alcool augmente le temps de réaction, réduit le champ visuel (vision tunnel) et provoque une surestimation de ses capacités. Il n'améliore jamais la conduite.",
        explanationEn: "Alcohol increases reaction time, narrows the field of vision (tunnel vision), and causes overestimation of abilities. It never improves driving.",
        trapNote: "All three negative effects are true. Alcohol NEVER improves any driving skill, despite what a driver might feel.",
        distractorNotes: {
            D: "Alcohol always impairs concentration — it is a depressant, not a stimulant."
        },
        vocabulary: [
            { wordFr: "champ visuel", wordEn: "field of vision", definition: "The area you can see without moving your head" },
            { wordFr: "surestimation", wordEn: "overestimation", definition: "Thinking you are more capable than you actually are" }
        ]
    },
    {
        id: 'cond-009',
        topic: 'conducteur',
        difficulty: 1,
        questionFr: "L'utilisation du téléphone portable tenu en main en conduisant est-elle autorisée ?",
        questionEn: "Is using a handheld mobile phone while driving allowed?",
        options: {
            A: { fr: "Oui, si la conversation est courte", en: "Yes, if the conversation is short" },
            B: { fr: "Oui, en dehors de l'agglomération", en: "Yes, outside built-up areas" },
            C: { fr: "Non, c'est strictement interdit", en: "No, it is strictly prohibited" },
            D: { fr: "Oui, si le véhicule est à l'arrêt dans le trafic", en: "Yes, if the vehicle is stopped in traffic" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "L'utilisation d'un téléphone tenu en main est strictement interdite en conduisant. L'infraction entraîne un retrait de 3 points et une amende de 135 euros.",
        explanationEn: "Using a handheld phone while driving is strictly prohibited. The offence results in a 3-point deduction and a 135-euro fine.",
        trapNote: "Even stopped at a red light or in traffic, you cannot use a handheld phone. You must park and turn off the engine.",
        distractorNotes: {
            A: "The duration of the call doesn't matter — it's always illegal.",
            B: "The ban applies everywhere, not just in built-up areas.",
            D: "Stopped in traffic is NOT parked — you're still 'driving' and it's still illegal."
        },
        vocabulary: [
            { wordFr: "téléphone tenu en main", wordEn: "handheld phone", definition: "A phone held in your hand, not on a mount or hands-free" },
            { wordFr: "amende forfaitaire", wordEn: "fixed penalty fine", definition: "A standard fine amount for a specific offence" }
        ]
    },
    {
        id: 'cond-010',
        topic: 'conducteur',
        difficulty: 2,
        signs: ['speed_50'],
        questionFr: "Quelle est la distance de freinage approximative à 50 km/h sur route sèche ?",
        questionEn: "What is the approximate braking distance at 50 km/h on a dry road?",
        options: {
            A: { fr: "Environ 7 mètres", en: "About 7 metres" },
            B: { fr: "Environ 14 mètres", en: "About 14 metres" },
            C: { fr: "Environ 28 mètres", en: "About 28 metres" },
            D: { fr: "Environ 50 mètres", en: "About 50 metres" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "À 50 km/h, la distance de freinage est d'environ 14 mètres sur route sèche. Sur route mouillée, elle double à environ 28 mètres.",
        explanationEn: "At 50 km/h, braking distance is about 14 metres on a dry road. On a wet road, it doubles to about 28 metres.",
        trapNote: "Remember: braking distance doubles on wet roads. Also, total stopping distance = reaction distance + braking distance.",
        distractorNotes: {
            A: "7 metres is too short — that's closer to braking from 30 km/h.",
            C: "28 metres is the WET road braking distance at 50 km/h.",
            D: "50 metres would be the stopping distance at much higher speed."
        },
        vocabulary: [
            { wordFr: "distance de freinage", wordEn: "braking distance", definition: "Distance covered from when you press the brake to when the car stops" },
            { wordFr: "route sèche", wordEn: "dry road", definition: "Road surface without rain or moisture" }
        ]
    },
    {
        id: 'cond-011',
        topic: 'conducteur',
        difficulty: 2,
        questionFr: "Quelles sont les conséquences possibles de la prise de médicaments sur la conduite ?",
        questionEn: "What are the possible effects of medication on driving?",
        options: {
            A: { fr: "Somnolence et baisse de vigilance", en: "Drowsiness and reduced alertness" },
            B: { fr: "Vision floue", en: "Blurred vision" },
            C: { fr: "Aucun effet si le médicament est prescrit", en: "No effect if the medication is prescribed" },
            D: { fr: "Ralentissement des réflexes", en: "Slowed reflexes" }
        },
        correctAnswers: ["A", "B", "D"],
        answerCount: 3,
        explanationFr: "De nombreux médicaments provoquent somnolence, vision floue et ralentissement des réflexes. Même les médicaments prescrits peuvent affecter la conduite — vérifiez toujours le pictogramme sur la boîte.",
        explanationEn: "Many medications cause drowsiness, blurred vision, and slowed reflexes. Even prescribed medications can affect driving — always check the pictogram on the box.",
        trapNote: "A prescription does NOT mean it's safe to drive. Always check the coloured warning pictogram on the box (levels 1-3).",
        distractorNotes: {
            C: "Being prescribed does not make a medication safe for driving. Many prescribed drugs impair driving."
        },
        vocabulary: [
            { wordFr: "somnolence", wordEn: "drowsiness", definition: "A state of being sleepy" },
            { wordFr: "pictogramme", wordEn: "pictogram", definition: "A warning symbol on medicine packaging showing driving risk level" }
        ]
    },

    // === ROUTE (The Road) — 7 more ===
    {
        id: 'route-005',
        topic: 'route',
        difficulty: 2,
        signs: ['no_overtaking'],
        questionFr: "Que signifie une ligne blanche continue au centre de la chaussée ?",
        questionEn: "What does a continuous white centre line on the road mean?",
        options: {
            A: { fr: "Il est interdit de la franchir", en: "It is forbidden to cross it" },
            B: { fr: "On peut la franchir pour dépasser", en: "You can cross it to overtake" },
            C: { fr: "Elle délimite une zone de stationnement", en: "It marks a parking zone" },
            D: { fr: "Elle indique une zone de travaux", en: "It indicates a construction zone" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Une ligne blanche continue interdit tout franchissement ou chevauchement. Elle sépare les deux sens de circulation et ne peut être franchie pour dépasser.",
        explanationEn: "A continuous white line prohibits crossing or straddling. It separates opposing traffic and must not be crossed to overtake.",
        trapNote: "You cannot cross a continuous line even to overtake a cyclist — you must wait.",
        distractorNotes: {
            B: "Crossing a continuous line to overtake is a serious offence.",
            C: "Parking zones use different markings (usually blue).",
            D: "Construction zones use yellow markings, not white continuous lines."
        },
        vocabulary: [
            { wordFr: "ligne continue", wordEn: "continuous line", definition: "An unbroken line painted on the road" },
            { wordFr: "franchir", wordEn: "to cross over", definition: "To drive across a road marking" }
        ]
    },
    {
        id: 'route-006',
        topic: 'route',
        difficulty: 2,
        questionFr: "Que devez-vous faire en cas de brouillard épais ?",
        questionEn: "What should you do in thick fog?",
        options: {
            A: { fr: "Allumer les feux de brouillard avant et arrière", en: "Turn on front and rear fog lights" },
            B: { fr: "Allumer les feux de route", en: "Turn on full beam headlights" },
            C: { fr: "Réduire votre vitesse et augmenter les distances", en: "Reduce speed and increase distances" },
            D: { fr: "Suivre le véhicule devant de près pour ne pas le perdre", en: "Follow the vehicle ahead closely to not lose it" }
        },
        correctAnswers: ["A", "C"],
        answerCount: 2,
        explanationFr: "Par brouillard épais, utilisez les feux de brouillard avant et arrière, réduisez votre vitesse et augmentez les distances de sécurité. N'utilisez jamais les feux de route qui éblouissent dans le brouillard.",
        explanationEn: "In thick fog, use front and rear fog lights, reduce speed and increase safety distances. Never use full beam as it reflects off fog and blinds you.",
        trapNote: "Full beam headlights are WORSE in fog — the light reflects back off the water droplets and blinds you.",
        distractorNotes: {
            B: "Full beam lights reflect off fog and reduce visibility — use dipped beams or fog lights.",
            D: "Following closely is extremely dangerous in fog — you need MORE distance, not less."
        },
        vocabulary: [
            { wordFr: "brouillard", wordEn: "fog", definition: "Thick mist that significantly reduces visibility" },
            { wordFr: "feux de brouillard", wordEn: "fog lights", definition: "Special low-mounted lights designed for foggy conditions" }
        ]
    },
    {
        id: 'route-007',
        topic: 'route',
        difficulty: 1,
        signs: ['danger'],
        questionFr: "Que signifie un panneau triangulaire à bord rouge ?",
        questionEn: "What does a triangular sign with a red border mean?",
        options: {
            A: { fr: "Danger — attention requise", en: "Danger — attention required" },
            B: { fr: "Interdiction", en: "Prohibition" },
            C: { fr: "Obligation", en: "Obligation" },
            D: { fr: "Information", en: "Information" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Les panneaux triangulaires à bord rouge sont des panneaux de danger. Ils préviennent d'un danger à venir sur la route (virage, intersection, passage à niveau, etc.).",
        explanationEn: "Triangular signs with a red border are danger/warning signs. They warn of an upcoming hazard on the road (curve, intersection, level crossing, etc.).",
        trapNote: "Triangle = warning/danger. Circle = obligation or prohibition. Square/rectangle = information.",
        distractorNotes: {
            B: "Prohibition signs are circular with a red border.",
            C: "Obligation signs are circular with a blue background.",
            D: "Information signs are rectangular or square, usually blue or green."
        },
        vocabulary: [
            { wordFr: "panneau de danger", wordEn: "warning sign", definition: "A sign that warns of a potential hazard ahead" },
            { wordFr: "triangle", wordEn: "triangle", definition: "A three-sided shape used for warning signs" }
        ]
    },
    {
        id: 'route-008',
        topic: 'route',
        difficulty: 2,
        questionFr: "Que signifie une ligne blanche discontinue au centre de la chaussée ?",
        questionEn: "What does a broken white centre line mean?",
        options: {
            A: { fr: "Vous pouvez la franchir pour dépasser si c'est sûr", en: "You can cross it to overtake if safe" },
            B: { fr: "Il est interdit de la franchir", en: "It is forbidden to cross it" },
            C: { fr: "Vous êtes dans une zone de stationnement", en: "You are in a parking zone" },
            D: { fr: "La route est à sens unique", en: "The road is one-way" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Une ligne discontinue (tirets) peut être franchie pour dépasser, à condition que la manoeuvre soit sûre et que la visibilité soit suffisante.",
        explanationEn: "A broken line (dashes) can be crossed to overtake, provided the manoeuvre is safe and visibility is sufficient.",
        trapNote: "Even with a broken line, overtaking is only allowed if it's SAFE. The line gives permission, not obligation.",
        distractorNotes: {
            B: "A broken line allows crossing — only a continuous line prohibits it.",
            C: "Parking zones use different markings.",
            D: "One-way roads are indicated by specific signs, not centre line markings."
        },
        vocabulary: [
            { wordFr: "ligne discontinue", wordEn: "broken line", definition: "A dashed line on the road" },
            { wordFr: "manoeuvre", wordEn: "manoeuvre", definition: "A driving action like overtaking, turning, or parking" }
        ]
    },
    {
        id: 'route-009',
        topic: 'route',
        difficulty: 3,
        questionFr: "Quels facteurs augmentent la distance de freinage ?",
        questionEn: "Which factors increase braking distance?",
        options: {
            A: { fr: "La route mouillée", en: "A wet road" },
            B: { fr: "Des pneus usés", en: "Worn tyres" },
            C: { fr: "Une descente", en: "A downhill slope" },
            D: { fr: "Une route bien éclairée", en: "A well-lit road" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "La route mouillée réduit l'adhérence, les pneus usés offrent moins de grip, et une descente ajoute l'effet de la gravité. L'éclairage n'affecte pas la distance de freinage physique.",
        explanationEn: "A wet road reduces grip, worn tyres offer less traction, and a downhill slope adds gravity's effect. Lighting does not affect physical braking distance.",
        trapNote: "Braking distance on a wet road is roughly DOUBLE that on a dry road.",
        distractorNotes: {
            D: "Lighting affects your ability to see hazards but does not change the physical braking distance."
        },
        vocabulary: [
            { wordFr: "adhérence", wordEn: "grip/traction", definition: "The friction between tyres and road surface" },
            { wordFr: "pneus usés", wordEn: "worn tyres", definition: "Tyres with reduced tread depth" }
        ]
    },
    {
        id: 'route-010',
        topic: 'route',
        difficulty: 1,
        signs: ['highway_start'],
        questionFr: "Quelle est la fonction d'une bande d'arrêt d'urgence sur autoroute ?",
        questionEn: "What is the purpose of the hard shoulder on a motorway?",
        options: {
            A: { fr: "Stationner pour consulter une carte", en: "Park to look at a map" },
            B: { fr: "S'arrêter uniquement en cas d'urgence", en: "Stop only in case of emergency" },
            C: { fr: "Dépasser les véhicules lents", en: "Overtake slow vehicles" },
            D: { fr: "Faire une pause repas", en: "Take a meal break" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "La bande d'arrêt d'urgence est réservée exclusivement aux arrêts d'urgence (panne, malaise, crevaison). S'y arrêter sans raison valable est passible d'une amende.",
        explanationEn: "The hard shoulder is reserved exclusively for emergency stops (breakdown, illness, flat tyre). Stopping without a valid reason is fineable.",
        trapNote: "Looking at a map, eating, or taking a phone call are NOT emergencies. Use a service area instead.",
        distractorNotes: {
            A: "Looking at a map is not an emergency — use a service area.",
            C: "Overtaking on the hard shoulder is extremely dangerous and illegal.",
            D: "Meal breaks must be taken at service areas or rest stops."
        },
        vocabulary: [
            { wordFr: "bande d'arrêt d'urgence", wordEn: "hard shoulder", definition: "The strip on the right side of a motorway for emergency stops" },
            { wordFr: "panne", wordEn: "breakdown", definition: "When your vehicle stops working" }
        ]
    },
    {
        id: 'route-011',
        topic: 'route',
        difficulty: 2,
        questionFr: "Qu'est-ce que l'aquaplaning ?",
        questionEn: "What is aquaplaning?",
        options: {
            A: { fr: "Les pneus glissent sur une couche d'eau et perdent contact avec la route", en: "Tyres slide on a layer of water and lose contact with the road" },
            B: { fr: "Le moteur cale à cause de l'eau", en: "The engine stalls because of water" },
            C: { fr: "Les freins ne fonctionnent plus sous la pluie", en: "Brakes stop working in the rain" },
            D: { fr: "Le volant vibre à cause de la pluie", en: "The steering wheel vibrates because of rain" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "L'aquaplaning se produit quand une couche d'eau s'interpose entre les pneus et la route, provoquant une perte totale d'adhérence. Le véhicule glisse comme sur de la glace.",
        explanationEn: "Aquaplaning occurs when a layer of water builds up between the tyres and the road, causing a total loss of grip. The vehicle slides as if on ice.",
        trapNote: "If you start aquaplaning: do NOT brake hard. Ease off the accelerator and hold the steering wheel straight.",
        distractorNotes: {
            B: "Aquaplaning is about tyre contact, not engine function.",
            C: "While brakes can be less effective when wet, that's not what aquaplaning means.",
            D: "Steering vibration is not aquaplaning — aquaplaning feels like floating, not vibrating."
        },
        vocabulary: [
            { wordFr: "aquaplaning", wordEn: "aquaplaning", definition: "Loss of tyre contact with the road due to water buildup" },
            { wordFr: "adhérence", wordEn: "grip", definition: "The friction between tyre and road surface" }
        ]
    },

    // === AUTRES USAGERS (Other Road Users) — 7 more ===
    {
        id: 'autr-004',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "Quelle distance latérale minimale devez-vous respecter en dépassant un cycliste hors agglomération ?",
        questionEn: "What minimum lateral distance must you maintain when overtaking a cyclist outside built-up areas?",
        options: {
            A: { fr: "0,50 mètre", en: "0.50 metre" },
            B: { fr: "1 mètre", en: "1 metre" },
            C: { fr: "1,50 mètre", en: "1.50 metres" },
            D: { fr: "2 mètres", en: "2 metres" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "Hors agglomération, la distance latérale minimale pour dépasser un cycliste est de 1,50 mètre. En agglomération, elle est d'1 mètre.",
        explanationEn: "Outside built-up areas, the minimum lateral distance when overtaking a cyclist is 1.50 metres. In built-up areas, it's 1 metre.",
        trapNote: "1 metre in town, 1.5 metres outside town. This applies to all vulnerable road users (cyclists, pedestrians, horses).",
        distractorNotes: {
            A: "0.50 metre is far too close and dangerous.",
            B: "1 metre is the minimum in built-up areas, not outside.",
            D: "2 metres is not the legal minimum, though more is always safer."
        },
        vocabulary: [
            { wordFr: "distance latérale", wordEn: "lateral distance", definition: "The side-to-side gap between your vehicle and another road user" },
            { wordFr: "cycliste", wordEn: "cyclist", definition: "A person riding a bicycle" }
        ]
    },
    {
        id: 'autr-005',
        topic: 'autres_usagers',
        difficulty: 1,
        signs: ['pedestrian_crossing'],
        questionFr: "À l'approche d'un passage piéton, que devez-vous faire ?",
        questionEn: "When approaching a pedestrian crossing, what must you do?",
        options: {
            A: { fr: "Accélérer pour passer avant les piétons", en: "Speed up to pass before pedestrians" },
            B: { fr: "Céder le passage aux piétons engagés ou qui manifestent l'intention de traverser", en: "Yield to pedestrians who are crossing or showing intent to cross" },
            C: { fr: "Klaxonner pour prévenir les piétons", en: "Honk to warn pedestrians" },
            D: { fr: "S'arrêter uniquement si un agent l'ordonne", en: "Stop only if an officer orders it" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Les conducteurs doivent céder le passage aux piétons engagés dans la traversée ou manifestant clairement l'intention de traverser. Ne pas le faire entraîne un retrait de 6 points.",
        explanationEn: "Drivers must yield to pedestrians who are crossing or clearly showing intent to cross. Failure to do so results in a 6-point deduction.",
        trapNote: "6 points — one of the heaviest penalties! You must stop even if the pedestrian hasn't started crossing yet, if they show intent.",
        distractorNotes: {
            A: "Accelerating near a crossing is dangerous and illegal.",
            C: "Honking at pedestrians is inappropriate and not required.",
            D: "You must yield regardless of police presence."
        },
        vocabulary: [
            { wordFr: "passage piéton", wordEn: "pedestrian crossing", definition: "Marked area where pedestrians have the right to cross" },
            { wordFr: "céder le passage", wordEn: "to yield", definition: "To let another road user go first" }
        ]
    },
    {
        id: 'autr-006',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "Quelles précautions devez-vous prendre à proximité d'un bus scolaire à l'arrêt ?",
        questionEn: "What precautions must you take near a stopped school bus?",
        options: {
            A: { fr: "Ralentir et être prêt à s'arrêter", en: "Slow down and be ready to stop" },
            B: { fr: "Surveiller les enfants qui pourraient traverser", en: "Watch for children who might cross" },
            C: { fr: "Passer rapidement pour ne pas gêner le bus", en: "Pass quickly to not obstruct the bus" },
            D: { fr: "Klaxonner pour prévenir les enfants", en: "Honk to warn children" }
        },
        correctAnswers: ["A", "B"],
        answerCount: 2,
        explanationFr: "Près d'un bus scolaire à l'arrêt, ralentissez et surveillez attentivement les enfants qui pourraient traverser brusquement. Les enfants sont imprévisibles.",
        explanationEn: "Near a stopped school bus, slow down and watch carefully for children who might suddenly cross. Children are unpredictable.",
        trapNote: "Children often run across the road without looking. Always be prepared to stop when you see a school bus.",
        distractorNotes: {
            C: "Passing quickly is dangerous — children may step out suddenly.",
            D: "Honking can startle children and cause them to react unpredictably."
        },
        vocabulary: [
            { wordFr: "bus scolaire", wordEn: "school bus", definition: "A bus transporting schoolchildren" },
            { wordFr: "ralentir", wordEn: "to slow down", definition: "To reduce your speed" }
        ]
    },
    {
        id: 'autr-007',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "Comment devez-vous réagir face à un véhicule prioritaire avec sirène et gyrophare ?",
        questionEn: "How must you react to an emergency vehicle with siren and flashing lights?",
        options: {
            A: { fr: "Vous ranger à droite et le laisser passer", en: "Pull over to the right and let it pass" },
            B: { fr: "Accélérer pour le distancer", en: "Speed up to get away from it" },
            C: { fr: "Continuer normalement", en: "Continue normally" },
            D: { fr: "S'arrêter au milieu de la route", en: "Stop in the middle of the road" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Face à un véhicule prioritaire (pompiers, SAMU, police) avec sirène et gyrophare, vous devez vous ranger à droite pour lui faciliter le passage.",
        explanationEn: "When an emergency vehicle (fire, ambulance, police) approaches with siren and lights, you must pull over to the right to let it pass.",
        trapNote: "Don't stop in the middle — move RIGHT. And don't panic-brake; signal and move smoothly.",
        distractorNotes: {
            B: "Speeding up is illegal and prevents the emergency vehicle from passing.",
            C: "You cannot ignore emergency vehicles — you must make way.",
            D: "Stopping in the middle blocks the emergency vehicle's path."
        },
        vocabulary: [
            { wordFr: "véhicule prioritaire", wordEn: "emergency vehicle", definition: "A vehicle with legal right of way (police, fire, ambulance)" },
            { wordFr: "gyrophare", wordEn: "flashing light", definition: "The rotating/flashing blue light on emergency vehicles" }
        ]
    },
    {
        id: 'autr-008',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "Les piétons doivent-ils marcher sur le trottoir lorsqu'il y en a un ?",
        questionEn: "Must pedestrians walk on the pavement when there is one?",
        options: {
            A: { fr: "Oui, c'est obligatoire", en: "Yes, it is mandatory" },
            B: { fr: "Non, ils peuvent marcher sur la route", en: "No, they can walk on the road" },
            C: { fr: "Uniquement les enfants", en: "Only children" },
            D: { fr: "Uniquement la nuit", en: "Only at night" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Quand un trottoir existe et est praticable, les piétons sont obligés de l'emprunter. Marcher sur la chaussée est interdit sauf si le trottoir est impraticable.",
        explanationEn: "When a pavement exists and is usable, pedestrians must use it. Walking on the road is prohibited unless the pavement is impassable.",
        trapNote: "This applies to ALL pedestrians, not just children. If there's no pavement, walk facing traffic.",
        distractorNotes: {
            B: "Pedestrians cannot choose to walk on the road when a pavement is available.",
            C: "The rule applies to everyone, not just children.",
            D: "The obligation applies at all times, not just at night."
        },
        vocabulary: [
            { wordFr: "trottoir", wordEn: "pavement/sidewalk", definition: "The raised path alongside the road for pedestrians" },
            { wordFr: "chaussée", wordEn: "roadway", definition: "The part of the road used by vehicles" }
        ]
    },
    {
        id: 'autr-009',
        topic: 'autres_usagers',
        difficulty: 3,
        questionFr: "Quels usagers sont considérés comme vulnérables sur la route ?",
        questionEn: "Which road users are considered vulnerable?",
        options: {
            A: { fr: "Les piétons", en: "Pedestrians" },
            B: { fr: "Les cyclistes", en: "Cyclists" },
            C: { fr: "Les conducteurs de camion", en: "Truck drivers" },
            D: { fr: "Les utilisateurs de trottinettes", en: "Scooter riders" }
        },
        correctAnswers: ["A", "B", "D"],
        answerCount: 3,
        explanationFr: "Les usagers vulnérables sont ceux qui ne sont pas protégés par une carrosserie : piétons, cyclistes, utilisateurs de trottinettes, motocyclistes. Les conducteurs de camion sont protégés par leur véhicule.",
        explanationEn: "Vulnerable road users are those not protected by a vehicle body: pedestrians, cyclists, scooter riders, motorcyclists. Truck drivers are protected by their vehicle.",
        trapNote: "Vulnerability is about physical protection. A pedestrian hit at 50 km/h has a 50% chance of death.",
        distractorNotes: {
            C: "Truck drivers are inside a very large, heavy vehicle and are among the most physically protected road users."
        },
        vocabulary: [
            { wordFr: "usager vulnérable", wordEn: "vulnerable road user", definition: "A person on the road without the protection of a vehicle body" },
            { wordFr: "trottinette", wordEn: "scooter/kick scooter", definition: "A small personal vehicle standing on a platform" }
        ]
    },

    // === PRIORITE (Priority Rules) — 6 more ===
    {
        id: 'prio-006',
        topic: 'priorite',
        difficulty: 2,
        signs: ['priority_right'],
        scenario: 't_junction_no_signs',
        questionFr: "À un carrefour sans signalisation, quelle est la règle de priorité ?",
        questionEn: "At an intersection without any signs, what is the priority rule?",
        options: {
            A: { fr: "Le premier arrivé passe en premier", en: "First to arrive goes first" },
            B: { fr: "Priorité à droite", en: "Priority to the right" },
            C: { fr: "Le véhicule le plus gros a la priorité", en: "The biggest vehicle has priority" },
            D: { fr: "Priorité à gauche", en: "Priority to the left" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "En l'absence de signalisation, la règle par défaut en France est la priorité à droite : vous devez céder le passage aux véhicules venant de votre droite.",
        explanationEn: "Without any signs, the default rule in France is priority to the right: you must yield to vehicles coming from your right.",
        trapNote: "Priority to the right is the DEFAULT rule in France. It applies everywhere unless signs say otherwise.",
        distractorNotes: {
            A: "First-come-first-served is not a traffic rule in France.",
            C: "Vehicle size has no bearing on priority rules.",
            D: "Priority is to the RIGHT, not the left."
        },
        vocabulary: [
            { wordFr: "priorité à droite", wordEn: "priority to the right", definition: "The default rule requiring you to yield to traffic from your right" },
            { wordFr: "carrefour", wordEn: "intersection", definition: "A place where two or more roads meet" }
        ]
    },
    {
        id: 'prio-007',
        topic: 'priorite',
        difficulty: 3,
        signs: ['roundabout', 'yield'],
        scenario: 'roundabout_yield',
        questionFr: "Dans un rond-point (carrefour giratoire), qui a la priorité ?",
        questionEn: "In a roundabout, who has priority?",
        options: {
            A: { fr: "Les véhicules qui entrent dans le rond-point", en: "Vehicles entering the roundabout" },
            B: { fr: "Les véhicules déjà engagés dans le rond-point", en: "Vehicles already in the roundabout" },
            C: { fr: "Les véhicules les plus rapides", en: "The fastest vehicles" },
            D: { fr: "Les poids lourds", en: "Heavy goods vehicles" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Dans un carrefour giratoire (signalé par le panneau 'Cédez le passage'), les véhicules déjà engagés dans le rond-point ont la priorité. Ceux qui entrent doivent céder.",
        explanationEn: "In a roundabout (marked with a 'Give Way' sign), vehicles already in the roundabout have priority. Those entering must yield.",
        trapNote: "Don't confuse with a rond-point without 'Cédez le passage' sign — in that rare case, priority to the right applies (entering vehicles have priority!).",
        distractorNotes: {
            A: "Vehicles entering must YIELD to those already inside the roundabout.",
            C: "Speed has no bearing on priority.",
            D: "Vehicle type does not determine priority in a roundabout."
        },
        vocabulary: [
            { wordFr: "rond-point", wordEn: "roundabout", definition: "A circular junction where traffic flows in one direction" },
            { wordFr: "carrefour giratoire", wordEn: "traffic circle", definition: "Official term for a roundabout with yield-on-entry rules" }
        ]
    },
    {
        id: 'prio-008',
        topic: 'priorite',
        difficulty: 2,
        signs: ['yield'],
        questionFr: "Que signifie le panneau 'Cédez le passage' (triangle inversé) ?",
        questionEn: "What does the 'Give Way' sign (inverted triangle) mean?",
        options: {
            A: { fr: "Vous devez marquer un arrêt complet", en: "You must come to a complete stop" },
            B: { fr: "Vous devez ralentir et céder le passage", en: "You must slow down and yield" },
            C: { fr: "Vous avez la priorité", en: "You have priority" },
            D: { fr: "La route est interdite", en: "The road is closed" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Le panneau 'Cédez le passage' (triangle rouge inversé) signifie que vous devez ralentir et laisser passer les véhicules sur la route prioritaire. Vous ne devez pas forcément vous arrêter si la voie est libre.",
        explanationEn: "The 'Give Way' sign (inverted red triangle) means you must slow down and let vehicles on the priority road pass. You don't have to stop if the way is clear.",
        trapNote: "Cédez ≠ STOP. You must yield but you don't have to stop if no one is coming. STOP requires a complete stop every time.",
        distractorNotes: {
            A: "A complete stop is required by a STOP sign, not a Give Way sign.",
            C: "This sign means the opposite — you must give way to others.",
            D: "Road closures use different signs (red circle with white bar)."
        },
        vocabulary: [
            { wordFr: "cédez le passage", wordEn: "give way / yield", definition: "Let other vehicles pass before you proceed" },
            { wordFr: "triangle inversé", wordEn: "inverted triangle", definition: "Triangle pointing downward — the give way sign shape" }
        ]
    },
    {
        id: 'prio-009',
        topic: 'priorite',
        difficulty: 2,
        signs: ['priority_road', 'end_priority'],
        scenario: 'priority_road',
        questionFr: "Sur une route avec un panneau losange jaune, avez-vous la priorité ?",
        questionEn: "On a road with a yellow diamond sign, do you have priority?",
        options: {
            A: { fr: "Oui, vous êtes sur une route prioritaire", en: "Yes, you are on a priority road" },
            B: { fr: "Non, c'est un panneau de danger", en: "No, it's a warning sign" },
            C: { fr: "Seulement en agglomération", en: "Only in built-up areas" },
            D: { fr: "Seulement si vous allez tout droit", en: "Only if you go straight" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Le panneau losange jaune indique que vous êtes sur une route prioritaire. Vous avez la priorité à chaque intersection, sauf signalisation contraire.",
        explanationEn: "The yellow diamond sign means you are on a priority road. You have priority at every intersection unless otherwise indicated.",
        trapNote: "This priority applies at EVERY intersection along the road, not just the next one. It ends when you see the same sign with a black line through it.",
        distractorNotes: {
            B: "It's not a danger sign — it's a priority indicator.",
            C: "It applies everywhere, not just in built-up areas.",
            D: "You have priority whether going straight, turning left, or turning right."
        },
        vocabulary: [
            { wordFr: "route prioritaire", wordEn: "priority road", definition: "A road where your traffic has right of way at intersections" },
            { wordFr: "losange", wordEn: "diamond shape", definition: "A square rotated 45 degrees" }
        ]
    },
    {
        id: 'prio-010',
        topic: 'priorite',
        difficulty: 3,
        signs: ['stop', 'yield', 'priority_road'],
        questionFr: "Quand la priorité à droite ne s'applique-t-elle PAS ?",
        questionEn: "When does priority to the right NOT apply?",
        options: {
            A: { fr: "Quand il y a un panneau STOP ou Cédez le passage", en: "When there is a STOP or Give Way sign" },
            B: { fr: "Quand vous sortez d'un parking ou d'un chemin de terre", en: "When exiting a car park or dirt track" },
            C: { fr: "Quand vous êtes sur une route prioritaire", en: "When you are on a priority road" },
            D: { fr: "Quand vous tournez à gauche", en: "When you are turning left" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "La priorité à droite ne s'applique pas quand la signalisation l'annule (STOP, cédez le passage), quand vous sortez d'un accès privé, ou quand vous êtes sur une route prioritaire.",
        explanationEn: "Priority to the right does not apply when overridden by signs (STOP, Give Way), when exiting a private access road, or when you are on a priority road.",
        trapNote: "Exiting a car park = you NEVER have priority, even if the traffic comes from your left.",
        distractorNotes: {
            D: "Turning direction doesn't cancel priority to the right — if someone is to your right, they still have priority."
        },
        vocabulary: [
            { wordFr: "accès privé", wordEn: "private access", definition: "A driveway, parking exit, or private road joining the public road" },
            { wordFr: "chemin de terre", wordEn: "dirt track", definition: "An unpaved rural road or path" }
        ]
    },
    {
        id: 'prio-011',
        topic: 'priorite',
        difficulty: 2,
        questionFr: "Que devez-vous faire quand un agent de police règle la circulation ?",
        questionEn: "What must you do when a police officer is directing traffic?",
        options: {
            A: { fr: "Suivre les indications de l'agent, même si elles contredisent les feux", en: "Follow the officer's directions, even if they contradict traffic lights" },
            B: { fr: "Toujours suivre les feux de signalisation", en: "Always follow traffic lights" },
            C: { fr: "Demander à l'agent pourquoi il contredit les feux", en: "Ask the officer why they contradict the lights" },
            D: { fr: "Choisir entre l'agent et les feux", en: "Choose between the officer and the lights" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Les ordres d'un agent de police ont priorité sur tous les panneaux et feux de signalisation. Vous devez toujours obéir à un agent qui règle la circulation.",
        explanationEn: "A police officer's directions take priority over all signs and traffic lights. You must always obey an officer directing traffic.",
        trapNote: "The hierarchy is: Police officer > Traffic lights > Signs > Road markings > Default rules (priority to the right).",
        distractorNotes: {
            B: "When an officer is present, their directions override traffic lights.",
            C: "You must obey immediately — you don't question the officer at the intersection.",
            D: "There's no choice — the officer's directions always take precedence."
        },
        vocabulary: [
            { wordFr: "agent de police", wordEn: "police officer", definition: "A law enforcement officer directing traffic" },
            { wordFr: "régler la circulation", wordEn: "to direct traffic", definition: "To manually control the flow of traffic" }
        ]
    },

    // === CROISEMENT ET DEPASSEMENT — 6 more ===
    {
        id: 'croi-004',
        topic: 'croisement_depassement',
        difficulty: 2,
        questionFr: "De quel côté devez-vous dépasser en France ?",
        questionEn: "On which side must you overtake in France?",
        options: {
            A: { fr: "Par la droite", en: "On the right" },
            B: { fr: "Par la gauche", en: "On the left" },
            C: { fr: "Par le côté le plus large", en: "On the wider side" },
            D: { fr: "Peu importe le côté", en: "Either side" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "En France, le dépassement se fait toujours par la gauche. Dépasser par la droite est interdit sauf dans de rares cas (véhicule tournant à gauche, files parallèles).",
        explanationEn: "In France, overtaking must always be done on the left. Overtaking on the right is prohibited except in rare cases (vehicle turning left, parallel lanes).",
        trapNote: "On a motorway with multiple lanes, passing on the right (undertaking) is prohibited even if the left lane is slow.",
        distractorNotes: {
            A: "Overtaking on the right (dépassement par la droite) is generally prohibited.",
            C: "Road width doesn't determine the overtaking side.",
            D: "The side matters — it's always on the left in France."
        },
        vocabulary: [
            { wordFr: "dépasser par la gauche", wordEn: "overtake on the left", definition: "The standard and legal way to pass another vehicle in France" },
            { wordFr: "dépassement par la droite", wordEn: "undertaking", definition: "Passing a vehicle on the right — generally prohibited" }
        ]
    },
    {
        id: 'croi-005',
        topic: 'croisement_depassement',
        difficulty: 3,
        signs: ['no_overtaking', 'level_crossing'],
        questionFr: "Dans quelles situations le dépassement est-il interdit ?",
        questionEn: "In which situations is overtaking prohibited?",
        options: {
            A: { fr: "Au sommet d'une côte sans visibilité", en: "At the top of a hill without visibility" },
            B: { fr: "Dans un virage sans visibilité", en: "In a blind bend" },
            C: { fr: "À un passage à niveau", en: "At a level crossing" },
            D: { fr: "Sur une ligne droite avec bonne visibilité", en: "On a straight road with good visibility" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Le dépassement est interdit quand la visibilité est insuffisante : sommet de côte, virage sans visibilité, passage à niveau. Sur une ligne droite avec bonne visibilité et ligne discontinue, le dépassement est autorisé.",
        explanationEn: "Overtaking is prohibited when visibility is insufficient: hilltops, blind bends, level crossings. On a straight road with good visibility and a broken line, overtaking is allowed.",
        trapNote: "Even if there's no sign, you must NEVER overtake where you can't see far enough ahead.",
        distractorNotes: {
            D: "A straight road with good visibility is typically where overtaking IS allowed."
        },
        vocabulary: [
            { wordFr: "sommet de côte", wordEn: "hilltop/crest", definition: "The top of a hill where you can't see the other side" },
            { wordFr: "virage sans visibilité", wordEn: "blind bend", definition: "A curve where you can't see oncoming traffic" }
        ]
    },
    {
        id: 'croi-006',
        topic: 'croisement_depassement',
        difficulty: 2,
        questionFr: "Quand deux véhicules se croisent dans un passage étroit, qui doit céder ?",
        questionEn: "When two vehicles meet in a narrow passage, who must yield?",
        options: {
            A: { fr: "Celui qui monte cède à celui qui descend", en: "The one going uphill yields to the one going downhill" },
            B: { fr: "Celui qui descend cède à celui qui monte", en: "The one going downhill yields to the one going uphill" },
            C: { fr: "Le véhicule le plus petit", en: "The smaller vehicle" },
            D: { fr: "Le véhicule le plus lent", en: "The slowest vehicle" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "En règle générale, dans un passage étroit en pente, le véhicule qui descend doit reculer pour laisser passer celui qui monte, car il est plus difficile de redémarrer en montée.",
        explanationEn: "As a general rule, on a narrow slope, the vehicle going downhill must reverse to let the uphill vehicle pass, because restarting uphill is more difficult.",
        trapNote: "The vehicle going DOWNHILL backs up. It's easier to reverse downhill than to restart uphill.",
        distractorNotes: {
            A: "The opposite is true — the uphill driver has priority.",
            C: "Vehicle size doesn't determine who yields in this situation.",
            D: "Speed is not the determining factor."
        },
        vocabulary: [
            { wordFr: "croisement", wordEn: "meeting/passing", definition: "When two vehicles travelling in opposite directions meet" },
            { wordFr: "passage étroit", wordEn: "narrow passage", definition: "A section of road too narrow for two vehicles" }
        ]
    },
    {
        id: 'croi-007',
        topic: 'croisement_depassement',
        difficulty: 2,
        questionFr: "Avant de dépasser, que devez-vous vérifier ?",
        questionEn: "Before overtaking, what must you check?",
        options: {
            A: { fr: "Que personne ne vous dépasse ou n'est sur le point de le faire", en: "That nobody is overtaking you or about to" },
            B: { fr: "Que la voie en face est libre sur une distance suffisante", en: "That the oncoming lane is clear for sufficient distance" },
            C: { fr: "Que le véhicule devant n'a pas mis son clignotant gauche", en: "That the vehicle ahead hasn't indicated left" },
            D: { fr: "Uniquement votre rétroviseur intérieur", en: "Only your interior mirror" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Avant de dépasser : vérifiez les rétroviseurs et l'angle mort (personne ne vous dépasse), assurez-vous que la voie opposée est libre, et vérifiez que le véhicule devant ne tourne pas à gauche.",
        explanationEn: "Before overtaking: check mirrors and blind spot (nobody is passing you), ensure the oncoming lane is clear, and verify the vehicle ahead isn't turning left.",
        trapNote: "Check ALL three mirrors (interior + both exterior) AND glance over your shoulder for the blind spot.",
        distractorNotes: {
            D: "Checking only the interior mirror is not enough — you must check exterior mirrors and blind spots too."
        },
        vocabulary: [
            { wordFr: "angle mort", wordEn: "blind spot", definition: "The area beside your car that mirrors don't show" },
            { wordFr: "rétroviseur", wordEn: "mirror", definition: "Interior or exterior mirror on your vehicle" }
        ]
    },

    // === ARRET ET STATIONNEMENT — 6 more ===
    {
        id: 'arret-004',
        topic: 'arret_stationnement',
        difficulty: 1,
        questionFr: "Quelle est la différence entre un arrêt et un stationnement ?",
        questionEn: "What is the difference between stopping and parking?",
        options: {
            A: { fr: "L'arrêt est de courte durée, le conducteur reste à proximité", en: "Stopping is brief, the driver stays nearby" },
            B: { fr: "Il n'y a pas de différence", en: "There is no difference" },
            C: { fr: "L'arrêt est toujours interdit", en: "Stopping is always prohibited" },
            D: { fr: "Le stationnement est de courte durée", en: "Parking is brief" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "L'arrêt est une immobilisation de courte durée (montée/descente de passagers, chargement) pendant laquelle le conducteur reste à proximité. Le stationnement est une immobilisation plus longue.",
        explanationEn: "Stopping is a brief halt (picking up/dropping off passengers, loading) where the driver stays nearby. Parking is a longer immobilisation.",
        trapNote: "If you leave your vehicle or it's immobilised for more than a few minutes, it's parking, not stopping.",
        distractorNotes: {
            B: "The legal distinction matters — different rules apply to each.",
            C: "Stopping is allowed in many places where parking is not.",
            D: "It's the opposite — stopping is brief, parking is longer."
        },
        vocabulary: [
            { wordFr: "arrêt", wordEn: "stopping", definition: "A brief halt where the driver stays with or near the vehicle" },
            { wordFr: "stationnement", wordEn: "parking", definition: "Leaving a vehicle immobilised for a longer period" }
        ]
    },
    {
        id: 'arret-005',
        topic: 'arret_stationnement',
        difficulty: 2,
        questionFr: "À quelle distance minimale d'une intersection devez-vous stationner ?",
        questionEn: "At what minimum distance from an intersection must you park?",
        options: {
            A: { fr: "2 mètres", en: "2 metres" },
            B: { fr: "5 mètres", en: "5 metres" },
            C: { fr: "10 mètres", en: "10 metres" },
            D: { fr: "20 mètres", en: "20 metres" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Il est interdit de stationner à moins de 5 mètres d'une intersection. Cette distance permet aux autres conducteurs d'avoir une visibilité suffisante.",
        explanationEn: "Parking within 5 metres of an intersection is prohibited. This distance allows other drivers to have sufficient visibility.",
        trapNote: "5 metres from an intersection, 5 metres from a passage piéton. Easy to remember: 5 metres is the key distance.",
        distractorNotes: {
            A: "2 metres is too close to an intersection.",
            C: "10 metres is more than required, though parking further away is always fine.",
            D: "20 metres is the rule near railway crossings, not regular intersections."
        },
        vocabulary: [
            { wordFr: "intersection", wordEn: "intersection", definition: "Where two or more roads meet" },
            { wordFr: "visibilité", wordEn: "visibility", definition: "The ability to see clearly in all directions" }
        ]
    },
    {
        id: 'arret-006',
        topic: 'arret_stationnement',
        difficulty: 2,
        signs: ['no_parking', 'pedestrian_crossing'],
        questionFr: "Où est-il interdit de stationner ?",
        questionEn: "Where is parking prohibited?",
        options: {
            A: { fr: "Sur un trottoir", en: "On a pavement" },
            B: { fr: "Devant une entrée de garage", en: "In front of a garage entrance" },
            C: { fr: "Sur un passage piéton", en: "On a pedestrian crossing" },
            D: { fr: "Dans un parking public payant", en: "In a paid public car park" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Il est interdit de stationner sur un trottoir, devant une entrée de garage ou sur un passage piéton. Ces zones doivent rester dégagées pour la sécurité des piétons et l'accès des propriétaires.",
        explanationEn: "Parking is prohibited on pavements, in front of garage entrances, and on pedestrian crossings. These areas must remain clear for pedestrian safety and property access.",
        trapNote: "Parking on the pavement is illegal even if 'everyone does it'. You can be fined and towed.",
        distractorNotes: {
            D: "Paid public car parks are specifically designed for parking — that's where you should park."
        },
        vocabulary: [
            { wordFr: "stationner", wordEn: "to park", definition: "To leave your vehicle immobilised in a location" },
            { wordFr: "entrée de garage", wordEn: "garage entrance", definition: "The driveway or opening leading to a private garage" }
        ]
    },
    {
        id: 'arret-007',
        topic: 'arret_stationnement',
        difficulty: 2,
        questionFr: "Que devez-vous faire après avoir stationné sur une pente montante ?",
        questionEn: "What must you do after parking on an uphill slope?",
        options: {
            A: { fr: "Tourner les roues vers le trottoir", en: "Turn wheels towards the kerb" },
            B: { fr: "Tourner les roues vers la route", en: "Turn wheels towards the road" },
            C: { fr: "Laisser les roues droites", en: "Leave wheels straight" },
            D: { fr: "Mettre les feux de détresse", en: "Turn on hazard lights" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "En pente montante, tournez les roues vers la route (à gauche) et serrez le frein à main. Si le véhicule recule, les roues toucheront le trottoir et le bloqueront.",
        explanationEn: "On an uphill slope, turn wheels towards the road (left) and apply the handbrake. If the vehicle rolls back, the wheels will hit the kerb and stop it.",
        trapNote: "Uphill = wheels toward road. Downhill = wheels toward kerb. Think about which way the car would roll.",
        distractorNotes: {
            A: "Towards the kerb is correct for DOWNHILL parking, not uphill.",
            C: "Straight wheels provide no protection against rolling.",
            D: "Hazard lights are for emergencies, not routine parking."
        },
        vocabulary: [
            { wordFr: "pente montante", wordEn: "uphill slope", definition: "A road surface that goes up in the direction you're facing" },
            { wordFr: "frein à main", wordEn: "handbrake", definition: "The parking brake used to prevent the vehicle from rolling" }
        ]
    },

    // === TUNNELS ET PASSAGES A NIVEAU — 6 more ===
    {
        id: 'tunn-003',
        topic: 'tunnels_passages_niveau',
        difficulty: 2,
        signs: ['tunnel', 'dipped_headlights'],
        questionFr: "Que devez-vous faire en entrant dans un tunnel éclairé en plein jour ?",
        questionEn: "What must you do when entering a lit tunnel during the day?",
        options: {
            A: { fr: "Allumer les feux de croisement", en: "Turn on dipped headlights" },
            B: { fr: "Allumer les feux de route", en: "Turn on full beam" },
            C: { fr: "Ne rien changer", en: "Change nothing" },
            D: { fr: "Mettre les feux de détresse", en: "Turn on hazard lights" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "En entrant dans un tunnel, vous devez allumer vos feux de croisement, même si le tunnel est éclairé. Cela vous rend visible aux autres conducteurs.",
        explanationEn: "When entering a tunnel, you must turn on your dipped headlights, even if the tunnel is lit. This makes you visible to other drivers.",
        trapNote: "Always dipped headlights in a tunnel — never full beam, which would blind other drivers in the enclosed space.",
        distractorNotes: {
            B: "Full beam would blind other drivers in the confined tunnel space.",
            C: "Even in a lit tunnel, headlights are mandatory.",
            D: "Hazard lights are for emergencies, not normal tunnel driving."
        },
        vocabulary: [
            { wordFr: "tunnel", wordEn: "tunnel", definition: "An enclosed passage for traffic through a hill or under water" },
            { wordFr: "feux de croisement", wordEn: "dipped headlights", definition: "Low beam headlights" }
        ]
    },
    {
        id: 'tunn-004',
        topic: 'tunnels_passages_niveau',
        difficulty: 3,
        signs: ['tunnel'],
        questionFr: "Que devez-vous faire en cas de panne dans un tunnel ?",
        questionEn: "What must you do if you break down in a tunnel?",
        options: {
            A: { fr: "Allumer les feux de détresse", en: "Turn on hazard lights" },
            B: { fr: "Essayer de pousser le véhicule hors du tunnel", en: "Try to push the vehicle out of the tunnel" },
            C: { fr: "Se diriger vers la sortie de secours la plus proche", en: "Head to the nearest emergency exit" },
            D: { fr: "Rester dans le véhicule et attendre les secours", en: "Stay in the vehicle and wait for help" }
        },
        correctAnswers: ["A", "C"],
        answerCount: 2,
        explanationFr: "En cas de panne dans un tunnel : allumez les feux de détresse, coupez le moteur, ne verrouillez pas le véhicule, et dirigez-vous vers la sortie de secours la plus proche.",
        explanationEn: "If you break down in a tunnel: turn on hazard lights, turn off the engine, don't lock the vehicle, and head to the nearest emergency exit.",
        trapNote: "Do NOT stay in your vehicle in a tunnel breakdown. The risk of fire and toxic fumes is too high.",
        distractorNotes: {
            B: "Do not try to push your vehicle — evacuate to an emergency exit.",
            D: "Staying in the vehicle is dangerous due to fire and smoke risks in tunnels."
        },
        vocabulary: [
            { wordFr: "sortie de secours", wordEn: "emergency exit", definition: "A marked exit route for emergencies in a tunnel" },
            { wordFr: "feux de détresse", wordEn: "hazard lights", definition: "The warning flashers that blink all four indicators simultaneously" }
        ]
    },
    {
        id: 'tunn-005',
        topic: 'tunnels_passages_niveau',
        difficulty: 2,
        signs: ['level_crossing'],
        questionFr: "Quand les feux clignotent à un passage à niveau, que devez-vous faire ?",
        questionEn: "When lights are flashing at a level crossing, what must you do?",
        options: {
            A: { fr: "Passer rapidement avant le train", en: "Cross quickly before the train" },
            B: { fr: "Vous arrêter avant la ligne d'arrêt", en: "Stop before the stop line" },
            C: { fr: "Ralentir et passer avec prudence", en: "Slow down and cross carefully" },
            D: { fr: "Faire demi-tour immédiatement", en: "Make a U-turn immediately" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Quand les feux rouges clignotent à un passage à niveau, vous devez vous arrêter impérativement. Un train approche ou les barrières vont se fermer.",
        explanationEn: "When red lights flash at a level crossing, you must stop immediately. A train is approaching or barriers are about to close.",
        trapNote: "NEVER try to cross when lights are flashing. A train at 100 km/h needs 800 metres to stop — it cannot avoid you.",
        distractorNotes: {
            A: "Crossing before the train is extremely dangerous and often fatal.",
            C: "You must STOP completely, not just slow down.",
            D: "A U-turn could be dangerous if other vehicles are behind you."
        },
        vocabulary: [
            { wordFr: "passage à niveau", wordEn: "level crossing", definition: "Where a road crosses a railway track at the same level" },
            { wordFr: "barrière", wordEn: "barrier/gate", definition: "The arm that lowers to block the road at a level crossing" }
        ]
    },
    {
        id: 'tunn-006',
        topic: 'tunnels_passages_niveau',
        difficulty: 2,
        signs: ['tunnel'],
        questionFr: "Quelle distance minimale devez-vous respecter avec le véhicule devant vous dans un tunnel ?",
        questionEn: "What minimum distance must you keep from the vehicle ahead in a tunnel?",
        options: {
            A: { fr: "La distance habituelle de 2 secondes", en: "The usual 2-second distance" },
            B: { fr: "Au moins 50 mètres ou un intervalle de 2 tubes lumineux", en: "At least 50 metres or a 2 light-tube interval" },
            C: { fr: "Le plus près possible pour sortir vite", en: "As close as possible to exit quickly" },
            D: { fr: "10 mètres", en: "10 metres" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Dans un tunnel, la distance minimale recommandée est d'au moins 50 mètres (ou l'intervalle entre 2 réglettes lumineuses). Les tunnels sont des zones à risque accru.",
        explanationEn: "In a tunnel, the recommended minimum distance is at least 50 metres (or the interval between 2 light markers). Tunnels are higher-risk zones.",
        trapNote: "Tunnel distance markings on the walls help you verify you're keeping enough space.",
        distractorNotes: {
            A: "In a tunnel, more distance is needed than the usual 2 seconds.",
            C: "Being close is dangerous — you need more distance in tunnels.",
            D: "10 metres is far too close in a tunnel."
        },
        vocabulary: [
            { wordFr: "réglettes lumineuses", wordEn: "light markers", definition: "Illuminated strips on tunnel walls marking distance intervals" }
        ]
    },
    {
        id: 'tunn-007',
        topic: 'tunnels_passages_niveau',
        difficulty: 1,
        signs: ['tunnel'],
        questionFr: "Est-il permis de faire demi-tour dans un tunnel ?",
        questionEn: "Is it allowed to make a U-turn in a tunnel?",
        options: {
            A: { fr: "Oui, si le tunnel est long", en: "Yes, if the tunnel is long" },
            B: { fr: "Oui, en cas de bouchon", en: "Yes, in case of a traffic jam" },
            C: { fr: "Non, c'est strictement interdit", en: "No, it is strictly prohibited" },
            D: { fr: "Oui, si la voie est libre", en: "Yes, if the way is clear" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "Le demi-tour est strictement interdit dans un tunnel. C'est une infraction grave car elle met en danger tous les usagers du tunnel.",
        explanationEn: "U-turns are strictly prohibited in tunnels. This is a serious offence as it endangers all tunnel users.",
        trapNote: "Also forbidden: reversing, stopping (except emergency), and overtaking (in most tunnels).",
        distractorNotes: {
            A: "Tunnel length doesn't change the rule — U-turns are always forbidden.",
            B: "Even in a traffic jam, you must not turn around in a tunnel.",
            D: "It doesn't matter if the way looks clear — U-turns in tunnels are never allowed."
        },
        vocabulary: [
            { wordFr: "demi-tour", wordEn: "U-turn", definition: "Turning your vehicle around to go in the opposite direction" },
            { wordFr: "infraction grave", wordEn: "serious offence", definition: "A traffic violation with severe penalties" }
        ]
    },

    // === SIGNALISATION — 7 more ===
    {
        id: 'sign-006',
        topic: 'signalisation',
        difficulty: 1,
        questionFr: "Que signifie un panneau rond à fond bleu ?",
        questionEn: "What does a round sign with a blue background mean?",
        options: {
            A: { fr: "Obligation", en: "Obligation/mandatory" },
            B: { fr: "Interdiction", en: "Prohibition" },
            C: { fr: "Danger", en: "Danger" },
            D: { fr: "Information", en: "Information" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Un panneau rond à fond bleu indique une obligation. Par exemple : direction obligatoire, chemin obligatoire pour piétons, vitesse minimale.",
        explanationEn: "A round sign with a blue background indicates an obligation. For example: mandatory direction, mandatory pedestrian path, minimum speed.",
        trapNote: "Blue circle = you MUST do something. Red circle = you must NOT do something. Easy mnemonic!",
        distractorNotes: {
            B: "Prohibition signs are round with a RED border on a white background.",
            C: "Danger signs are triangular, not round.",
            D: "Information signs are rectangular or square."
        },
        vocabulary: [
            { wordFr: "obligation", wordEn: "obligation", definition: "Something you must do" },
            { wordFr: "direction obligatoire", wordEn: "mandatory direction", definition: "A sign telling you which way you must go" }
        ]
    },
    {
        id: 'sign-007',
        topic: 'signalisation',
        difficulty: 2,
        signs: ['parking'],
        questionFr: "Que signifie un panneau carré bleu avec un P blanc ?",
        questionEn: "What does a square blue sign with a white P mean?",
        options: {
            A: { fr: "Parking autorisé", en: "Parking allowed" },
            B: { fr: "Péage à venir", en: "Toll ahead" },
            C: { fr: "Police à proximité", en: "Police nearby" },
            D: { fr: "Passage piéton", en: "Pedestrian crossing" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Le panneau carré bleu avec un P blanc indique un parking. Il peut être complété par des informations sur le type de stationnement (payant, durée limitée, etc.).",
        explanationEn: "The square blue sign with a white P indicates parking. It may include additional information about the type of parking (paid, time-limited, etc.).",
        trapNote: "P = Parking. It's one of the simplest signs to recognise. Additional sub-signs may indicate restrictions.",
        distractorNotes: {
            B: "Toll signs show a barrier icon or the word 'Péage'.",
            C: "There's no standard 'police nearby' sign using the letter P.",
            D: "Pedestrian crossings use a different sign showing a person on stripes."
        },
        vocabulary: [
            { wordFr: "parking", wordEn: "car park", definition: "An area designated for parking vehicles" },
            { wordFr: "stationnement payant", wordEn: "paid parking", definition: "Parking that requires payment" }
        ]
    },
    {
        id: 'sign-008',
        topic: 'signalisation',
        difficulty: 2,
        questionFr: "Que signifie un panneau rond à bord rouge barré d'une ligne diagonale rouge ?",
        questionEn: "What does a round sign with a red border and a diagonal red line mean?",
        options: {
            A: { fr: "Fin d'interdiction", en: "End of prohibition" },
            B: { fr: "Début d'interdiction", en: "Start of prohibition" },
            C: { fr: "Sens interdit", en: "No entry" },
            D: { fr: "Voie fermée", en: "Road closed" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Un panneau rond avec des lignes diagonales noires sur fond blanc et un bord gris indique la fin de toutes les interdictions. Avec une seule barre, il annule une interdiction spécifique.",
        explanationEn: "A round sign with diagonal black lines on a white background and grey border indicates the end of all prohibitions. With a single bar, it cancels a specific prohibition.",
        trapNote: "Don't confuse with the 'no entry' sign which is a solid red circle with a white bar.",
        distractorNotes: {
            B: "The diagonal lines indicate END of prohibition, not the start.",
            C: "No entry is a solid red circle with a horizontal white bar.",
            D: "Road closed signs are different — they block the road entirely."
        },
        vocabulary: [
            { wordFr: "fin d'interdiction", wordEn: "end of prohibition", definition: "The restriction that was in effect no longer applies" },
            { wordFr: "panneau d'annulation", wordEn: "cancellation sign", definition: "A sign that ends a previous restriction" }
        ]
    },
    {
        id: 'sign-009',
        topic: 'signalisation',
        difficulty: 2,
        signs: ['highway_start', 'highway_end'],
        questionFr: "Quelles couleurs sont utilisées pour les panneaux d'indication sur autoroute ?",
        questionEn: "What colours are used for motorway information signs?",
        options: {
            A: { fr: "Fond bleu avec texte blanc", en: "Blue background with white text" },
            B: { fr: "Fond vert avec texte blanc", en: "Green background with white text" },
            C: { fr: "Fond blanc avec texte noir", en: "White background with black text" },
            D: { fr: "Fond jaune avec texte noir", en: "Yellow background with black text" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Sur autoroute, les panneaux d'indication sont à fond bleu avec texte blanc. Les panneaux verts concernent les routes nationales et départementales.",
        explanationEn: "On motorways, information signs have a blue background with white text. Green signs are for national and departmental roads.",
        trapNote: "Blue = motorway, Green = major roads, White = local roads, Yellow = temporary/diversion. Know the colour code!",
        distractorNotes: {
            B: "Green signs are for national and departmental roads, not motorways.",
            C: "White signs are for local roads and streets.",
            D: "Yellow signs indicate temporary diversions or construction detours."
        },
        vocabulary: [
            { wordFr: "panneau d'indication", wordEn: "information sign", definition: "A sign providing directional or informational guidance" },
            { wordFr: "autoroute", wordEn: "motorway", definition: "A high-speed toll road" }
        ]
    },
    {
        id: 'sign-010',
        topic: 'signalisation',
        difficulty: 3,
        questionFr: "Que signifient les lignes de rive (bord droit de la chaussée) selon leur type ?",
        questionEn: "What do edge lines (right side of the road) mean depending on their type?",
        options: {
            A: { fr: "Ligne continue = interdiction de stationner", en: "Continuous line = no parking" },
            B: { fr: "Ligne discontinue à grands traits = route étroite", en: "Long dashed line = narrow road" },
            C: { fr: "Ligne continue = limite de chaussée", en: "Continuous line = road edge" },
            D: { fr: "Ligne discontinue à petits traits = rive normale", en: "Short dashed line = normal edge" }
        },
        correctAnswers: ["C", "D"],
        answerCount: 2,
        explanationFr: "La ligne de rive continue marque la limite de la chaussée (ne pas rouler au-delà). La ligne discontinue à petits traits indique une rive normale que l'on peut franchir pour s'arrêter.",
        explanationEn: "A continuous edge line marks the road boundary (don't drive beyond). A short-dashed edge line indicates a normal edge that can be crossed to stop.",
        trapNote: "Edge lines are on the RIGHT side of the road. Centre lines are in the middle. Don't confuse the two!",
        distractorNotes: {
            A: "Edge lines indicate road boundaries, not parking restrictions.",
            B: "Long dashes in the centre indicate you can overtake, not road width."
        },
        vocabulary: [
            { wordFr: "ligne de rive", wordEn: "edge line", definition: "The line marking the edge of the usable road surface" },
            { wordFr: "chaussée", wordEn: "roadway", definition: "The part of the road used by vehicles" }
        ]
    },
    {
        id: 'sign-011',
        topic: 'signalisation',
        difficulty: 1,
        signs: ['no_entry'],
        questionFr: "Que signifie un panneau rouge circulaire avec une barre blanche horizontale ?",
        questionEn: "What does a round red sign with a horizontal white bar mean?",
        options: {
            A: { fr: "Sens interdit", en: "No entry" },
            B: { fr: "Stationnement interdit", en: "No parking" },
            C: { fr: "Fin de limitation", en: "End of restriction" },
            D: { fr: "Route barrée", en: "Road blocked" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Le panneau rond rouge avec une barre blanche horizontale signifie 'sens interdit'. Vous ne pouvez pas entrer dans cette voie.",
        explanationEn: "The round red sign with a horizontal white bar means 'no entry'. You cannot enter this road.",
        trapNote: "This is one of the most important signs. Entering a one-way street the wrong way can be fatal.",
        distractorNotes: {
            B: "No parking is a round blue sign with a red cross or diagonal.",
            C: "End of restriction signs have diagonal lines, not a horizontal bar.",
            D: "Road blocked uses a different sign format."
        },
        vocabulary: [
            { wordFr: "sens interdit", wordEn: "no entry", definition: "You are not allowed to enter from this direction" },
            { wordFr: "sens unique", wordEn: "one-way", definition: "Traffic flows in only one direction on this road" }
        ]
    },

    // === NOTIONS DIVERSES — 7 more ===
    {
        id: 'div-005',
        topic: 'notions_diverses',
        difficulty: 2,
        questionFr: "Quels documents devez-vous toujours avoir dans votre véhicule ?",
        questionEn: "Which documents must you always have in your vehicle?",
        options: {
            A: { fr: "Le permis de conduire", en: "The driving licence" },
            B: { fr: "La carte grise (certificat d'immatriculation)", en: "The registration certificate" },
            C: { fr: "L'attestation d'assurance", en: "The insurance certificate" },
            D: { fr: "Le carnet d'entretien du véhicule", en: "The vehicle maintenance logbook" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Vous devez toujours avoir sur vous votre permis de conduire, la carte grise du véhicule et l'attestation d'assurance. Le carnet d'entretien n'est pas obligatoire.",
        explanationEn: "You must always carry your driving licence, the vehicle registration certificate, and proof of insurance. The maintenance logbook is not mandatory.",
        trapNote: "Missing any of the three mandatory documents can result in a fine. Keep them in the car at all times.",
        distractorNotes: {
            D: "The maintenance logbook is useful but not legally required to carry in the vehicle."
        },
        vocabulary: [
            { wordFr: "carte grise", wordEn: "registration certificate", definition: "The official document proving vehicle registration" },
            { wordFr: "attestation d'assurance", wordEn: "insurance certificate", definition: "Proof that your vehicle is insured" }
        ]
    },
    {
        id: 'div-006',
        topic: 'notions_diverses',
        difficulty: 2,
        questionFr: "Qu'est-ce que l'écoconduite ?",
        questionEn: "What is eco-driving?",
        options: {
            A: { fr: "Conduire de manière à réduire la consommation de carburant et les émissions", en: "Driving to reduce fuel consumption and emissions" },
            B: { fr: "Conduire uniquement des véhicules électriques", en: "Driving only electric vehicles" },
            C: { fr: "Conduire en campagne uniquement", en: "Driving only in the countryside" },
            D: { fr: "Ne jamais dépasser 80 km/h", en: "Never exceeding 80 km/h" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "L'écoconduite est un style de conduite visant à réduire la consommation de carburant et les émissions polluantes : anticipation, souplesse, entretien du véhicule.",
        explanationEn: "Eco-driving is a driving style aimed at reducing fuel consumption and emissions: anticipation, smooth driving, vehicle maintenance.",
        trapNote: "Eco-driving can save 15-20% on fuel. Key principles: anticipate, shift early, maintain steady speed, check tyre pressure.",
        distractorNotes: {
            B: "Eco-driving applies to ALL vehicles, not just electric ones.",
            C: "Location doesn't define eco-driving — it's a driving technique.",
            D: "Speed management is part of it, but eco-driving is much broader than just speed limits."
        },
        vocabulary: [
            { wordFr: "écoconduite", wordEn: "eco-driving", definition: "Fuel-efficient and environmentally friendly driving techniques" },
            { wordFr: "consommation de carburant", wordEn: "fuel consumption", definition: "The amount of fuel used by the vehicle" }
        ]
    },
    {
        id: 'div-007',
        topic: 'notions_diverses',
        difficulty: 2,
        questionFr: "Que faire en cas d'accident sans blessé ?",
        questionEn: "What should you do in case of an accident with no injuries?",
        options: {
            A: { fr: "Remplir un constat amiable", en: "Fill in an accident report form" },
            B: { fr: "Quitter les lieux rapidement", en: "Leave the scene quickly" },
            C: { fr: "Sécuriser les lieux et prévenir les autres usagers", en: "Secure the scene and warn other road users" },
            D: { fr: "Ne rien faire si les dégâts sont mineurs", en: "Do nothing if the damage is minor" }
        },
        correctAnswers: ["A", "C"],
        answerCount: 2,
        explanationFr: "En cas d'accident sans blessé : sécurisez les lieux (gilet, triangle), prévenez les autres usagers, et remplissez un constat amiable avec l'autre conducteur.",
        explanationEn: "In an accident with no injuries: secure the scene (vest, triangle), warn other road users, and fill in a joint accident report form with the other driver.",
        trapNote: "Leaving the scene of an accident (délit de fuite) is a criminal offence, even if the damage seems minor.",
        distractorNotes: {
            B: "Leaving the scene is a criminal offence (hit and run).",
            D: "You must always exchange information and fill in a report, regardless of damage severity."
        },
        vocabulary: [
            { wordFr: "constat amiable", wordEn: "accident report form", definition: "A standard form both drivers fill in to document the accident" },
            { wordFr: "délit de fuite", wordEn: "hit and run", definition: "Leaving the scene of an accident without stopping" }
        ]
    },
    {
        id: 'div-008',
        topic: 'notions_diverses',
        difficulty: 1,
        questionFr: "Quel équipement de sécurité est obligatoire dans votre véhicule ?",
        questionEn: "Which safety equipment is mandatory in your vehicle?",
        options: {
            A: { fr: "Un gilet de haute visibilité", en: "A high-visibility vest" },
            B: { fr: "Un triangle de présignalisation", en: "A warning triangle" },
            C: { fr: "Une trousse de premiers secours", en: "A first aid kit" },
            D: { fr: "Un extincteur", en: "A fire extinguisher" }
        },
        correctAnswers: ["A", "B"],
        answerCount: 2,
        explanationFr: "En France, le gilet de haute visibilité et le triangle de présignalisation sont obligatoires dans chaque véhicule. La trousse de secours et l'extincteur sont recommandés mais non obligatoires.",
        explanationEn: "In France, a high-visibility vest and a warning triangle are mandatory in every vehicle. A first aid kit and fire extinguisher are recommended but not mandatory.",
        trapNote: "The vest must be accessible from INSIDE the car (not in the boot) so you can put it on before exiting.",
        distractorNotes: {
            C: "A first aid kit is recommended but not legally required in France.",
            D: "A fire extinguisher is not mandatory for private cars (it is for some professional vehicles)."
        },
        vocabulary: [
            { wordFr: "gilet de haute visibilité", wordEn: "high-visibility vest", definition: "A bright yellow or orange vest that makes you visible" },
            { wordFr: "triangle de présignalisation", wordEn: "warning triangle", definition: "A red triangle placed on the road to warn of a stopped vehicle" }
        ]
    },
    {
        id: 'div-009',
        topic: 'notions_diverses',
        difficulty: 2,
        questionFr: "Quelle est la profondeur minimale légale des sculptures de pneu ?",
        questionEn: "What is the minimum legal tyre tread depth?",
        options: {
            A: { fr: "1 mm", en: "1 mm" },
            B: { fr: "1,6 mm", en: "1.6 mm" },
            C: { fr: "3 mm", en: "3 mm" },
            D: { fr: "5 mm", en: "5 mm" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "La profondeur minimale légale des sculptures de pneu est de 1,6 mm. En dessous, les pneus sont considérés comme usés et doivent être remplacés.",
        explanationEn: "The minimum legal tyre tread depth is 1.6 mm. Below this, tyres are considered worn and must be replaced.",
        trapNote: "1.6 mm is the legal minimum, but experts recommend replacing tyres at 3 mm for safety, especially in wet conditions.",
        distractorNotes: {
            A: "1 mm is below the legal minimum — tyres at this depth are illegal.",
            C: "3 mm is a recommended safe minimum, not the legal requirement.",
            D: "5 mm is typical for new tyres, not the minimum depth."
        },
        vocabulary: [
            { wordFr: "sculptures de pneu", wordEn: "tyre tread", definition: "The grooves and patterns on the tyre surface that provide grip" },
            { wordFr: "usure", wordEn: "wear", definition: "The gradual loss of material from the tyre surface" }
        ]
    },
    {
        id: 'div-010',
        topic: 'notions_diverses',
        difficulty: 2,
        questionFr: "Quel numéro d'urgence européen pouvez-vous appeler en cas d'accident ?",
        questionEn: "Which European emergency number can you call in case of an accident?",
        options: {
            A: { fr: "112", en: "112" },
            B: { fr: "911", en: "911" },
            C: { fr: "999", en: "999" },
            D: { fr: "118", en: "118" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Le 112 est le numéro d'urgence européen, gratuit et accessible partout dans l'UE. En France, vous pouvez aussi appeler le 15 (SAMU), le 17 (police), ou le 18 (pompiers).",
        explanationEn: "112 is the European emergency number, free and available throughout the EU. In France, you can also call 15 (ambulance), 17 (police), or 18 (fire service).",
        trapNote: "112 works from any phone in Europe, even without a SIM card. It's the universal emergency number.",
        distractorNotes: {
            B: "911 is the North American emergency number, not European.",
            C: "999 is the UK emergency number, but 112 also works in the UK.",
            D: "118 is a directory enquiries number, not an emergency number."
        },
        vocabulary: [
            { wordFr: "numéro d'urgence", wordEn: "emergency number", definition: "A phone number for emergency services" },
            { wordFr: "SAMU", wordEn: "ambulance service", definition: "The French emergency medical service (Service d'Aide Médicale Urgente)" }
        ]
    },
    {
        id: 'div-011',
        topic: 'notions_diverses',
        difficulty: 3,
        questionFr: "Quels comportements relèvent de l'écoconduite ?",
        questionEn: "Which behaviours are part of eco-driving?",
        options: {
            A: { fr: "Anticiper le trafic et freiner en douceur", en: "Anticipate traffic and brake gently" },
            B: { fr: "Vérifier régulièrement la pression des pneus", en: "Regularly check tyre pressure" },
            C: { fr: "Accélérer fortement à chaque feu vert", en: "Accelerate hard at every green light" },
            D: { fr: "Couper le moteur dans les embouteillages prolongés", en: "Turn off the engine in prolonged traffic jams" }
        },
        correctAnswers: ["A", "B", "D"],
        answerCount: 3,
        explanationFr: "L'écoconduite inclut l'anticipation, le freinage en douceur, la vérification de la pression des pneus et l'arrêt du moteur lors de longs arrêts. L'accélération brutale augmente la consommation.",
        explanationEn: "Eco-driving includes anticipation, gentle braking, checking tyre pressure, and turning off the engine during long stops. Hard acceleration increases consumption.",
        trapNote: "Under-inflated tyres increase fuel consumption by up to 8%. Check pressure monthly.",
        distractorNotes: {
            C: "Hard acceleration wastes fuel — smooth acceleration is part of eco-driving."
        },
        vocabulary: [
            { wordFr: "anticiper", wordEn: "to anticipate", definition: "To look ahead and predict what will happen" },
            { wordFr: "pression des pneus", wordEn: "tyre pressure", definition: "The air pressure inside the tyres" }
        ]
    },

    // ═══════════════════════════════════════════
    // BATCH 3 — 8 BALANCE QUESTIONS (Sentinel C1)
    // Fills under-represented topics to 9+ each
    // ═══════════════════════════════════════════

    // +2 autres_usagers (9→11)
    {
        id: 'autr-010',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "Un cycliste peut-il rouler sur le trottoir ?",
        questionEn: "Can a cyclist ride on the pavement?",
        options: {
            A: { fr: "Oui, toujours", en: "Yes, always" },
            B: { fr: "Non, sauf les enfants de moins de 8 ans", en: "No, except children under 8" },
            C: { fr: "Oui, si la route est dangereuse", en: "Yes, if the road is dangerous" },
            D: { fr: "Oui, en agglomération uniquement", en: "Yes, in built-up areas only" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Seuls les enfants de moins de 8 ans peuvent rouler à vélo sur le trottoir, à condition de rouler au pas et de ne pas gêner les piétons.",
        explanationEn: "Only children under 8 may ride a bicycle on the pavement, provided they ride at walking pace and don't obstruct pedestrians.",
        trapNote: "Adults cycling on the pavement can be fined 135 euros. Use cycle lanes or the road.",
        distractorNotes: {
            A: "Adults are never allowed to cycle on pavements.",
            C: "Danger on the road doesn't justify cycling on the pavement for adults.",
            D: "Location doesn't change the rule — only age matters."
        },
        vocabulary: [
            { wordFr: "trottoir", wordEn: "pavement", definition: "The raised walkway alongside the road" },
            { wordFr: "au pas", wordEn: "at walking pace", definition: "Very slowly, at the speed of walking" }
        ]
    },
    {
        id: 'autr-011',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "Quelle est la vitesse maximale d'une trottinette électrique en ville ?",
        questionEn: "What is the maximum speed of an electric scooter in the city?",
        options: {
            A: { fr: "6 km/h", en: "6 km/h" },
            B: { fr: "15 km/h", en: "15 km/h" },
            C: { fr: "25 km/h", en: "25 km/h" },
            D: { fr: "45 km/h", en: "45 km/h" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "Les trottinettes électriques sont limitées à 25 km/h. Elles doivent circuler sur les pistes cyclables quand elles existent, sinon sur la chaussée.",
        explanationEn: "Electric scooters are limited to 25 km/h. They must use cycle lanes where available, otherwise the road.",
        trapNote: "Riding an e-scooter on the pavement is prohibited and can result in a 135 euro fine.",
        distractorNotes: {
            A: "6 km/h is walking pace — the speed required on pedestrian areas only.",
            B: "15 km/h is not a standard speed limit for e-scooters.",
            D: "45 km/h would classify the vehicle as a moped, requiring registration and insurance."
        },
        vocabulary: [
            { wordFr: "trottinette électrique", wordEn: "electric scooter", definition: "A battery-powered personal mobility device" },
            { wordFr: "piste cyclable", wordEn: "cycle lane", definition: "A lane reserved for cyclists and similar vehicles" }
        ]
    },

    // +2 croisement_depassement (7→9)
    {
        id: 'croi-008',
        topic: 'croisement_depassement',
        difficulty: 2,
        signs: ['pedestrian_crossing', 'no_overtaking'],
        questionFr: "Pouvez-vous dépasser un véhicule sur un passage piéton ?",
        questionEn: "Can you overtake a vehicle on a pedestrian crossing?",
        options: {
            A: { fr: "Oui, si aucun piéton ne traverse", en: "Yes, if no pedestrian is crossing" },
            B: { fr: "Non, c'est interdit", en: "No, it is prohibited" },
            C: { fr: "Oui, si vous le faites lentement", en: "Yes, if you do it slowly" },
            D: { fr: "Oui, en klaxonnant", en: "Yes, while honking" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Le dépassement est interdit sur et aux abords d'un passage piéton. Cette règle protège les piétons qui pourraient être masqués par le véhicule dépassé.",
        explanationEn: "Overtaking is prohibited on and near a pedestrian crossing. This rule protects pedestrians who might be hidden by the overtaken vehicle.",
        trapNote: "Even if you don't see anyone, a pedestrian could be hidden behind the vehicle you're passing.",
        distractorNotes: {
            A: "The prohibition applies regardless of whether pedestrians are visible.",
            C: "Speed doesn't matter — overtaking near a crossing is always prohibited.",
            D: "Honking doesn't make this manoeuvre legal."
        },
        vocabulary: [
            { wordFr: "aux abords de", wordEn: "near/in the vicinity of", definition: "Close to, in the area around" }
        ]
    },
    {
        id: 'croi-009',
        topic: 'croisement_depassement',
        difficulty: 1,
        questionFr: "Que devez-vous faire avant de vous rabattre après un dépassement ?",
        questionEn: "What must you do before pulling back in after overtaking?",
        options: {
            A: { fr: "Vérifier dans le rétroviseur que le véhicule dépassé est visible en entier", en: "Check in the mirror that the overtaken vehicle is fully visible" },
            B: { fr: "Klaxonner pour prévenir", en: "Honk to warn" },
            C: { fr: "Se rabattre immédiatement", en: "Pull back in immediately" },
            D: { fr: "Accélérer au maximum", en: "Accelerate as much as possible" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Avant de vous rabattre, vérifiez dans le rétroviseur intérieur que vous voyez le véhicule dépassé en entier. Cela garantit une distance de sécurité suffisante.",
        explanationEn: "Before pulling back in, check in your interior mirror that you can see the entire overtaken vehicle. This ensures sufficient safety distance.",
        trapNote: "See the FULL vehicle in your mirror before pulling back. If you can only see the bonnet, you're too close.",
        distractorNotes: {
            B: "Honking is not required or appropriate when completing an overtake.",
            C: "Pulling back in immediately could cut off the other driver dangerously.",
            D: "Maximum acceleration is unnecessary and dangerous."
        },
        vocabulary: [
            { wordFr: "se rabattre", wordEn: "to pull back in", definition: "Returning to your original lane after overtaking" },
            { wordFr: "rétroviseur intérieur", wordEn: "interior mirror", definition: "The rear-view mirror inside the car" }
        ]
    },

    // +2 arret_stationnement (7→9)
    {
        id: 'arret-008',
        topic: 'arret_stationnement',
        difficulty: 2,
        signs: ['no_stopping'],
        questionFr: "Que signifie un marquage jaune en zigzag au bord de la route ?",
        questionEn: "What does a yellow zigzag marking on the road edge mean?",
        options: {
            A: { fr: "Zone de livraison", en: "Delivery zone" },
            B: { fr: "Arrêt de bus — stationnement et arrêt interdits", en: "Bus stop — stopping and parking prohibited" },
            C: { fr: "Zone de stationnement payant", en: "Paid parking zone" },
            D: { fr: "Voie réservée aux taxis", en: "Lane reserved for taxis" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Le marquage jaune en zigzag indique un arrêt de bus. Il est interdit de s'y arrêter ou d'y stationner, même brièvement.",
        explanationEn: "Yellow zigzag markings indicate a bus stop. Stopping or parking there is prohibited, even briefly.",
        trapNote: "This is one of the few places where even a brief STOP (not just parking) is prohibited.",
        distractorNotes: {
            A: "Delivery zones use different markings (usually yellow dashes).",
            C: "Paid parking zones use blue markings and specific signs.",
            D: "Taxi lanes have specific signs, not zigzag markings."
        },
        vocabulary: [
            { wordFr: "zigzag", wordEn: "zigzag", definition: "A jagged line pattern painted on the road" },
            { wordFr: "arrêt de bus", wordEn: "bus stop", definition: "The designated area where buses pick up and drop off passengers" }
        ]
    },
    {
        id: 'arret-009',
        topic: 'arret_stationnement',
        difficulty: 2,
        questionFr: "Quand devez-vous utiliser le frein à main après avoir stationné ?",
        questionEn: "When must you use the handbrake after parking?",
        options: {
            A: { fr: "Uniquement en pente", en: "Only on a slope" },
            B: { fr: "Toujours, quel que soit le terrain", en: "Always, regardless of the terrain" },
            C: { fr: "Uniquement si vous quittez le véhicule longtemps", en: "Only if leaving the vehicle for a long time" },
            D: { fr: "Jamais si le véhicule est en vitesse", en: "Never if the vehicle is in gear" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Le frein à main doit toujours être serré quand vous quittez votre véhicule, même sur terrain plat. C'est une mesure de sécurité fondamentale.",
        explanationEn: "The handbrake must always be engaged when you leave your vehicle, even on flat ground. This is a fundamental safety measure.",
        trapNote: "Even on flat ground, a vehicle can roll if bumped by another vehicle or due to road vibration.",
        distractorNotes: {
            A: "The handbrake is required on ALL terrain, not just slopes.",
            C: "The duration doesn't matter — always use it.",
            D: "Being in gear is an extra precaution but doesn't replace the handbrake."
        },
        vocabulary: [
            { wordFr: "frein à main", wordEn: "handbrake", definition: "The parking brake" },
            { wordFr: "serré", wordEn: "engaged/applied", definition: "Pulled up and locked in position" }
        ]
    },

    // +2 tunnels_passages_niveau (7→9)
    {
        id: 'tunn-008',
        topic: 'tunnels_passages_niveau',
        difficulty: 2,
        signs: ['level_crossing'],
        questionFr: "Quels types de feux peuvent signaler un passage à niveau ?",
        questionEn: "What types of lights can signal a level crossing?",
        options: {
            A: { fr: "Feux rouges clignotants", en: "Flashing red lights" },
            B: { fr: "Feux verts fixes", en: "Steady green lights" },
            C: { fr: "Feux orange clignotants", en: "Flashing amber lights" },
            D: { fr: "Feux bleus", en: "Blue lights" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Les passages à niveau sont signalés par des feux rouges clignotants qui s'activent à l'approche d'un train. Certains ont aussi des barrières automatiques.",
        explanationEn: "Level crossings are signalled by flashing red lights that activate when a train approaches. Some also have automatic barriers.",
        trapNote: "If you see flashing red at a level crossing, STOP immediately. Do not attempt to cross.",
        distractorNotes: {
            B: "Green lights are not used at level crossings.",
            C: "Amber flashing lights mean 'proceed with caution' at traffic lights, not at level crossings.",
            D: "Blue lights are for emergency vehicles, not level crossings."
        },
        vocabulary: [
            { wordFr: "feux rouges clignotants", wordEn: "flashing red lights", definition: "Red lights that flash alternately at danger points" }
        ]
    },
    {
        id: 'tunn-009',
        topic: 'tunnels_passages_niveau',
        difficulty: 3,
        signs: ['level_crossing'],
        questionFr: "Que faire si votre véhicule est immobilisé sur un passage à niveau ?",
        questionEn: "What should you do if your vehicle is stuck on a level crossing?",
        options: {
            A: { fr: "Faire descendre tous les passagers immédiatement", en: "Get all passengers out immediately" },
            B: { fr: "Essayer de pousser le véhicule hors des voies", en: "Try to push the vehicle off the tracks" },
            C: { fr: "Appeler le numéro d'urgence affiché au passage à niveau", en: "Call the emergency number displayed at the level crossing" },
            D: { fr: "Attendre dans le véhicule que le prochain train passe", en: "Wait in the vehicle for the next train to pass" }
        },
        correctAnswers: ["A", "C"],
        answerCount: 2,
        explanationFr: "Priorité absolue : faites descendre tous les passagers et éloignez-les des voies. Appelez ensuite le numéro d'urgence affiché au passage à niveau pour alerter la SNCF.",
        explanationEn: "Absolute priority: get all passengers out and away from the tracks. Then call the emergency number displayed at the level crossing to alert the railway company.",
        trapNote: "NEVER stay in a vehicle on the tracks. Get everyone out FIRST, then try to alert the railway.",
        distractorNotes: {
            B: "Pushing the vehicle is secondary to evacuating passengers — people first, vehicle second.",
            D: "Staying in the vehicle on the tracks is extremely dangerous and potentially fatal."
        },
        vocabulary: [
            { wordFr: "immobilisé", wordEn: "stuck/immobilised", definition: "Unable to move" },
            { wordFr: "voies ferrées", wordEn: "railway tracks", definition: "The metal rails on which trains run" }
        ]
    },

    // ===== NEW: Balancing underserved topics (Cycles 13-15) =====

    // croisement_depassement #10
    {
        id: 'croi-010',
        topic: 'croisement_depassement',
        difficulty: 2,
        questionFr: "Vous arrivez face à face avec un véhicule sur une route étroite. Qui doit reculer ?",
        questionEn: "You meet a vehicle head-on on a narrow road. Who must reverse?",
        options: {
            A: { fr: "Le véhicule qui monte", en: "The vehicle going uphill" },
            B: { fr: "Le véhicule qui descend", en: "The vehicle going downhill" },
            C: { fr: "Le plus petit véhicule", en: "The smaller vehicle" },
            D: { fr: "Le dernier arrivé", en: "The last to arrive" }
        },
        correctAnswers: ['B'],
        answerCount: 1,
        explanationFr: "En cas de croisement difficile en pente, le véhicule qui descend doit reculer car il est plus facile de repartir en montant.",
        explanationEn: "On a slope, the vehicle going downhill must reverse because it is easier to restart going uphill.",
        trapNote: "It seems counterintuitive — the downhill vehicle reverses, not the uphill one.",
        distractorNotes: {
            A: "The uphill vehicle has priority — it's easier to restart going uphill.",
            C: "Vehicle size is not the criterion — slope direction determines who reverses.",
            D: "Order of arrival doesn't matter — the rule is always about slope direction."
        },
        vocabulary: [
            { wordFr: "reculer", wordEn: "to reverse", definition: "To drive backwards" },
            { wordFr: "pente", wordEn: "slope", definition: "An incline in the road" }
        ]
    },

    // croisement_depassement #11
    {
        id: 'croi-011',
        topic: 'croisement_depassement',
        difficulty: 3,
        questionFr: "Pouvez-vous dépasser un véhicule qui tourne à gauche ?",
        questionEn: "Can you overtake a vehicle turning left?",
        options: {
            A: { fr: "Oui, par la droite", en: "Yes, on the right" },
            B: { fr: "Oui, par la gauche", en: "Yes, on the left" },
            C: { fr: "Non, jamais", en: "No, never" },
            D: { fr: "Oui, des deux côtés", en: "Yes, from either side" }
        },
        correctAnswers: ['A'],
        answerCount: 1,
        explanationFr: "Lorsqu'un véhicule tourne à gauche, vous pouvez le dépasser par la droite si l'espace est suffisant.",
        explanationEn: "When a vehicle is turning left, you may overtake it on the right if there is sufficient space.",
        trapNote: "Normally overtaking is on the left, but when a vehicle turns left, you pass on the right.",
        distractorNotes: {
            B: "Overtaking on the left a vehicle turning left is dangerous — you'd collide.",
            C: "You can overtake on the right in this case — it's the exception to the normal rule.",
            D: "Only the right side is permitted when the vehicle ahead turns left."
        },
        vocabulary: [
            { wordFr: "dépasser", wordEn: "to overtake", definition: "To pass another vehicle" },
            { wordFr: "par la droite", wordEn: "on the right", definition: "From the right side" }
        ]
    },

    // arret_stationnement #10
    {
        id: 'arret-010',
        topic: 'arret_stationnement',
        difficulty: 2,
        questionFr: "À quelle distance minimale d'un passage piétons est-il interdit de stationner ?",
        questionEn: "What is the minimum distance from a pedestrian crossing where parking is prohibited?",
        options: {
            A: { fr: "3 mètres", en: "3 metres" },
            B: { fr: "5 mètres", en: "5 metres" },
            C: { fr: "10 mètres", en: "10 metres" },
            D: { fr: "15 mètres", en: "15 metres" }
        },
        correctAnswers: ['B'],
        answerCount: 1,
        signs: ['pedestrian_crossing'],
        explanationFr: "Il est interdit de stationner à moins de 5 mètres en amont d'un passage piétons.",
        explanationEn: "Parking is prohibited within 5 metres before a pedestrian crossing.",
        trapNote: "5 metres, not 3 or 10.",
        distractorNotes: {
            A: "3 metres is not enough — the legal minimum is 5 metres.",
            C: "10 metres is the rule for intersections, not pedestrian crossings.",
            D: "15 metres is too far — the rule is specifically 5 metres."
        },
        vocabulary: [
            { wordFr: "stationner", wordEn: "to park", definition: "To leave a vehicle in a parked position" },
            { wordFr: "en amont", wordEn: "before/upstream", definition: "On the approach side" }
        ]
    },

    // arret_stationnement #11
    {
        id: 'arret-011',
        topic: 'arret_stationnement',
        difficulty: 2,
        questionFr: "Que signifie une ligne jaune continue sur le bord du trottoir ?",
        questionEn: "What does a continuous yellow line on the kerb mean?",
        signs: ['no_stopping'],
        options: {
            A: { fr: "Stationnement interdit", en: "No parking" },
            B: { fr: "Arrêt et stationnement interdits", en: "No stopping and no parking" },
            C: { fr: "Stationnement payant", en: "Paid parking" },
            D: { fr: "Stationnement limité à 30 minutes", en: "Parking limited to 30 minutes" }
        },
        correctAnswers: ['B'],
        answerCount: 1,
        explanationFr: "Une ligne jaune continue sur le bord du trottoir signifie que l'arrêt et le stationnement sont interdits.",
        explanationEn: "A continuous yellow line on the kerb means both stopping and parking are prohibited.",
        trapNote: "Yellow continuous = no stopping at all. A broken yellow line means no parking but stopping is allowed.",
        distractorNotes: {
            A: "It's more than just parking — stopping is also banned with a continuous yellow line.",
            C: "Paid parking uses different markings (blue zones, meters), not yellow lines.",
            D: "There's no time limit — it's completely prohibited, no exceptions."
        },
        vocabulary: [
            { wordFr: "ligne jaune", wordEn: "yellow line", definition: "Kerb marking indicating restrictions" },
            { wordFr: "trottoir", wordEn: "pavement/kerb", definition: "The raised edge along a road" }
        ]
    },

    // tunnels_passages_niveau #10
    {
        id: 'tunn-010',
        topic: 'tunnels_passages_niveau',
        difficulty: 2,
        questionFr: "Que devez-vous faire en entrant dans un tunnel éclairé ?",
        questionEn: "What must you do when entering a lit tunnel?",
        signs: ['tunnel', 'dipped_headlights'],
        options: {
            A: { fr: "Allumer les feux de croisement", en: "Turn on dipped headlights" },
            B: { fr: "Allumer les feux de route", en: "Turn on full beam headlights" },
            C: { fr: "Garder les feux éteints si le tunnel est éclairé", en: "Keep lights off if the tunnel is lit" },
            D: { fr: "Allumer les feux de brouillard", en: "Turn on fog lights" }
        },
        correctAnswers: ['A'],
        answerCount: 1,
        explanationFr: "En tunnel, vous devez toujours allumer les feux de croisement, même si le tunnel est éclairé.",
        explanationEn: "In a tunnel, you must always turn on dipped headlights, even if the tunnel is lit.",
        trapNote: "Even in a well-lit tunnel, dipped headlights are mandatory — it's about being visible to others.",
        distractorNotes: {
            B: "Full beam headlights dazzle other drivers in the confined tunnel space.",
            C: "Lights are mandatory in tunnels, even lit ones — it's about being seen by others.",
            D: "Fog lights are not appropriate for tunnels — use dipped headlights."
        },
        vocabulary: [
            { wordFr: "feux de croisement", wordEn: "dipped headlights", definition: "Low beam headlights" },
            { wordFr: "éclairé", wordEn: "lit/illuminated", definition: "Having artificial lighting" }
        ]
    },

    // tunnels_passages_niveau #11
    {
        id: 'tunn-011',
        topic: 'tunnels_passages_niveau',
        difficulty: 3,
        questionFr: "Un feu rouge clignotant à un passage à niveau signifie que :",
        questionEn: "A flashing red light at a level crossing means:",
        signs: ['level_crossing'],
        options: {
            A: { fr: "Vous pouvez passer lentement", en: "You may pass slowly" },
            B: { fr: "Un train approche, vous devez vous arrêter", en: "A train is approaching, you must stop" },
            C: { fr: "Le passage est fermé pour maintenance", en: "The crossing is closed for maintenance" },
            D: { fr: "Vous devez klaxonner avant de passer", en: "You must honk before crossing" }
        },
        correctAnswers: ['B'],
        answerCount: 1,
        explanationFr: "Un feu rouge clignotant à un passage à niveau signifie qu'un train approche et que vous devez obligatoirement vous arrêter.",
        explanationEn: "A flashing red light at a level crossing means a train is approaching and you must stop.",
        trapNote: "Never cross when the red light is flashing — a train is on its way.",
        distractorNotes: {
            A: "You must not cross, even slowly — the train cannot stop in time.",
            C: "Maintenance is signaled differently — flashing red always means a train is approaching.",
            D: "Honking does not replace the mandatory stop — you must wait until the light stops."
        },
        vocabulary: [
            { wordFr: "clignotant", wordEn: "flashing", definition: "Blinking on and off" },
            { wordFr: "klaxonner", wordEn: "to honk", definition: "To sound the car horn" }
        ]
    },

    // ===== SESSION 5 EXPANSION — 90 NEW QUESTIONS (110 → 200) =====

    // === CIRCULATION 12-20 ===
    {
        id: 'circ-012', topic: 'circulation', difficulty: 2, signs: ['roundabout'],
        questionFr: "Dans un carrefour giratoire, qui a la priorité ?",
        questionEn: "In a roundabout, who has priority?",
        options: {
            A: { fr: "Les véhicules qui entrent", en: "Vehicles entering" },
            B: { fr: "Les véhicules déjà engagés", en: "Vehicles already in the roundabout" },
            C: { fr: "Les véhicules venant de droite", en: "Vehicles from the right" },
            D: { fr: "Les piétons uniquement", en: "Pedestrians only" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Dans un carrefour giratoire, les véhicules déjà engagés ont la priorité. Vous devez céder le passage avant d'entrer.",
        explanationEn: "In a roundabout, vehicles already circulating have priority. You must yield before entering.",
        trapNote: "This is the OPPOSITE of the old priority-to-the-right rule. Roundabouts reverse it!",
        distractorNotes: {
            A: "Entering vehicles must yield — they do NOT have priority.",
            C: "Priority-to-the-right does NOT apply in roundabouts — it's reversed.",
            D: "While pedestrians have rights at crossings, the rule here is about circulating traffic."
        },
        vocabulary: [
            { wordFr: "carrefour giratoire", wordEn: "roundabout", definition: "A circular intersection where traffic flows one way" },
            { wordFr: "engagé", wordEn: "entered/committed", definition: "Already inside the intersection" }
        ]
    },
    {
        id: 'circ-013', topic: 'circulation', difficulty: 1, signs: ['speed_30'],
        questionFr: "Quelle est la vitesse maximale dans une zone 30 ?",
        questionEn: "What is the maximum speed in a Zone 30?",
        options: {
            A: { fr: "20 km/h", en: "20 km/h" },
            B: { fr: "30 km/h", en: "30 km/h" },
            C: { fr: "40 km/h", en: "40 km/h" },
            D: { fr: "50 km/h", en: "50 km/h" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Les zones 30 limitent la vitesse à 30 km/h. Elles sont fréquentes près des écoles et dans les quartiers résidentiels.",
        explanationEn: "Zone 30 areas limit speed to 30 km/h. They are common near schools and in residential areas.",
        trapNote: "The name says it all — Zone 30 = 30 km/h. Don't overthink it.",
        distractorNotes: {
            A: "20 km/h is for pedestrian zones (zones de rencontre), not Zone 30.",
            C: "40 km/h is not a standard French speed limit.",
            D: "50 km/h is the default urban speed, not for Zone 30 areas."
        },
        vocabulary: [
            { wordFr: "zone 30", wordEn: "30 km/h zone", definition: "A traffic-calmed area with a 30 km/h speed limit" }
        ]
    },
    {
        id: 'circ-014', topic: 'circulation', difficulty: 3, signs: [],
        questionFr: "Quelle est la vitesse minimale sur autoroute en voie de gauche ?",
        questionEn: "What is the minimum speed on the motorway in the left lane?",
        options: {
            A: { fr: "60 km/h", en: "60 km/h" },
            B: { fr: "80 km/h", en: "80 km/h" },
            C: { fr: "90 km/h", en: "90 km/h" },
            D: { fr: "Il n'y a pas de vitesse minimale en voie de gauche", en: "There is no minimum speed in the left lane" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Sur autoroute, la vitesse minimale est de 80 km/h sur la voie la plus à gauche. En dessous, vous gênez la circulation.",
        explanationEn: "On motorways, the minimum speed in the leftmost lane is 80 km/h. Below this, you obstruct traffic flow.",
        trapNote: "Many think there's no minimum speed on the left lane, but 80 km/h is enforced.",
        distractorNotes: {
            A: "60 km/h is the general motorway minimum in the right lane, not the left.",
            C: "90 km/h is not the specific left-lane minimum.",
            D: "There IS a minimum speed of 80 km/h in the left lane on motorways."
        },
        vocabulary: [
            { wordFr: "voie de gauche", wordEn: "left lane", definition: "The overtaking/fast lane on a motorway" }
        ]
    },
    {
        id: 'circ-015', topic: 'circulation', difficulty: 2, signs: [],
        questionFr: "Quand devez-vous utiliser vos feux de détresse (warning) ?",
        questionEn: "When must you use your hazard warning lights?",
        options: {
            A: { fr: "En stationnement en double file", en: "When double-parked" },
            B: { fr: "En cas de panne ou de ralentissement soudain", en: "In case of breakdown or sudden slowdown" },
            C: { fr: "Pour remercier un autre conducteur", en: "To thank another driver" },
            D: { fr: "Par temps de pluie", en: "In rainy weather" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Les feux de détresse servent à signaler un danger : panne, ralentissement brusque, ou véhicule immobilisé sur la route.",
        explanationEn: "Hazard lights are used to signal danger: breakdown, sudden braking, or a stopped vehicle on the road.",
        trapNote: "Hazard lights are NOT for double parking or thanking people — they signal real danger.",
        distractorNotes: {
            A: "Double parking is illegal — hazard lights don't make it acceptable.",
            C: "Thanking is a common misuse. The law reserves hazard lights for emergencies.",
            D: "Rain alone does not justify hazard lights — use fog lights if visibility is very poor."
        },
        vocabulary: [
            { wordFr: "feux de détresse", wordEn: "hazard warning lights", definition: "Flashing all four indicators simultaneously" },
            { wordFr: "ralentissement", wordEn: "slowdown", definition: "A sudden reduction in speed" }
        ]
    },
    {
        id: 'circ-016', topic: 'circulation', difficulty: 2, signs: [],
        questionFr: "Quelles sont les règles pour l'utilisation du klaxon en ville ?",
        questionEn: "What are the rules for using the horn in town?",
        options: {
            A: { fr: "Autorisé à tout moment", en: "Allowed at any time" },
            B: { fr: "Uniquement en cas de danger immédiat", en: "Only in case of immediate danger" },
            C: { fr: "Interdit entre 22h et 7h", en: "Prohibited between 10pm and 7am" },
            D: { fr: "Toujours interdit en agglomération", en: "Always prohibited in built-up areas" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "En agglomération, le klaxon ne peut être utilisé qu'en cas de danger immédiat. L'usage abusif est passible d'une amende.",
        explanationEn: "In built-up areas, the horn may only be used in case of immediate danger. Misuse can result in a fine.",
        trapNote: "Many drivers use the horn casually but it's strictly for danger only in towns.",
        distractorNotes: {
            A: "The horn is restricted in towns — casual use is illegal.",
            C: "The time restriction applies to some noisy activities but the horn rule is stricter — danger only.",
            D: "It's not always prohibited — it's allowed when there is immediate danger."
        },
        vocabulary: [
            { wordFr: "klaxon", wordEn: "horn", definition: "The audible warning device on a vehicle" },
            { wordFr: "danger immédiat", wordEn: "immediate danger", definition: "A sudden, present threat requiring warning" }
        ]
    },
    {
        id: 'circ-017', topic: 'circulation', difficulty: 3, signs: [],
        questionFr: "Quelles affirmations sont correctes concernant la conduite par brouillard ?",
        questionEn: "Which statements are correct about driving in fog?",
        options: {
            A: { fr: "Utiliser les feux de brouillard avant", en: "Use front fog lights" },
            B: { fr: "Utiliser les feux de route", en: "Use full beam headlights" },
            C: { fr: "Réduire la vitesse et augmenter les distances", en: "Reduce speed and increase distances" },
            D: { fr: "Allumer les feux de détresse", en: "Turn on hazard lights" }
        },
        correctAnswers: ['A', 'C'], answerCount: 2,
        explanationFr: "Par brouillard, utilisez les feux de croisement et/ou antibrouillard avant. Réduisez la vitesse. Les feux de route éblouissent dans le brouillard.",
        explanationEn: "In fog, use dipped headlights and/or front fog lights. Reduce speed. Full beam reflects off fog and blinds you.",
        trapNote: "Two correct answers! Full beam is WRONG in fog — it reflects back and reduces visibility.",
        distractorNotes: {
            B: "Full beam headlights reflect off fog particles, making visibility WORSE.",
            D: "Hazard lights are for breakdowns and sudden stops, not for fog driving."
        },
        vocabulary: [
            { wordFr: "brouillard", wordEn: "fog", definition: "Thick mist that reduces visibility" },
            { wordFr: "feux de brouillard", wordEn: "fog lights", definition: "Low-mounted lights designed for foggy conditions" }
        ]
    },
    {
        id: 'circ-018', topic: 'circulation', difficulty: 2, signs: [],
        questionFr: "Que devez-vous faire à l'approche d'un véhicule d'urgence avec sirène et gyrophare ?",
        questionEn: "What must you do when an emergency vehicle approaches with siren and lights?",
        options: {
            A: { fr: "Accélérer pour le laisser passer derrière vous", en: "Speed up to let it pass behind you" },
            B: { fr: "Vous ranger sur le côté droit et vous arrêter si nécessaire", en: "Move to the right side and stop if necessary" },
            C: { fr: "Continuer à la même vitesse", en: "Continue at the same speed" },
            D: { fr: "Freiner brusquement", en: "Brake suddenly" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Vous devez faciliter le passage des véhicules prioritaires en vous rangeant à droite, voire en vous arrêtant si nécessaire.",
        explanationEn: "You must facilitate the passage of priority vehicles by moving to the right, or stopping if necessary.",
        trapNote: "Don't panic and brake suddenly — smoothly move right and stop if needed.",
        distractorNotes: {
            A: "Never accelerate in front of an emergency vehicle — move aside instead.",
            C: "Ignoring an emergency vehicle is illegal and dangerous.",
            D: "Sudden braking is dangerous — move aside smoothly instead."
        },
        vocabulary: [
            { wordFr: "véhicule d'urgence", wordEn: "emergency vehicle", definition: "Ambulance, fire truck, or police car on duty" },
            { wordFr: "gyrophare", wordEn: "flashing beacon", definition: "The rotating/flashing light on emergency vehicles" }
        ]
    },
    {
        id: 'circ-019', topic: 'circulation', difficulty: 2, signs: [],
        questionFr: "Sur une route à 3 voies dans le même sens, dans quelle voie devez-vous normalement circuler ?",
        questionEn: "On a road with 3 lanes in the same direction, which lane should you normally drive in?",
        options: {
            A: { fr: "La voie de gauche", en: "The left lane" },
            B: { fr: "La voie du milieu", en: "The middle lane" },
            C: { fr: "La voie de droite", en: "The right lane" },
            D: { fr: "N'importe quelle voie", en: "Any lane" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "En France, vous devez circuler sur la voie la plus à droite sauf pour dépasser. C'est la règle de base de la circulation.",
        explanationEn: "In France, you must drive in the rightmost lane except when overtaking. This is the fundamental traffic rule.",
        trapNote: "Many drivers stay in the middle lane by habit — this is illegal in France!",
        distractorNotes: {
            A: "The left lane is for overtaking only — not for cruising.",
            B: "The middle lane is not the default. 'Hogging' the middle lane is an offence.",
            D: "You cannot choose freely — you must use the rightmost available lane."
        },
        vocabulary: [
            { wordFr: "voie de droite", wordEn: "right lane", definition: "The default driving lane in France" },
            { wordFr: "dépasser", wordEn: "to overtake", definition: "To pass another vehicle" }
        ]
    },
    {
        id: 'circ-020', topic: 'circulation', difficulty: 3, signs: ['speed_50', 'speed_80'],
        questionFr: "Par temps de brouillard avec une visibilité inférieure à 50 mètres, quelle est la vitesse maximale ?",
        questionEn: "In fog with visibility below 50 metres, what is the maximum speed?",
        options: {
            A: { fr: "30 km/h", en: "30 km/h" },
            B: { fr: "50 km/h", en: "50 km/h" },
            C: { fr: "70 km/h", en: "70 km/h" },
            D: { fr: "La vitesse normale de la route", en: "The road's normal speed limit" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Lorsque la visibilité est inférieure à 50 mètres, la vitesse maximale est de 50 km/h sur toutes les routes.",
        explanationEn: "When visibility is below 50 metres, the maximum speed is 50 km/h on all roads, including motorways.",
        trapNote: "50 metres visibility = 50 km/h, even on the motorway! This overrides all other limits.",
        distractorNotes: {
            A: "30 km/h is too slow — though being cautious is wise, the legal limit is 50.",
            C: "70 km/h is too fast for visibility under 50 metres.",
            D: "The normal speed limit is overridden when visibility drops below 50 metres."
        },
        vocabulary: [
            { wordFr: "visibilité", wordEn: "visibility", definition: "The distance you can see clearly ahead" }
        ]
    },

    // === CONDUCTEUR 12-20 ===
    {
        id: 'cond-012', topic: 'conducteur', difficulty: 2, signs: [],
        questionFr: "Quel est le taux d'alcoolémie maximal autorisé pour un conducteur novice ?",
        questionEn: "What is the maximum blood alcohol level for a novice driver?",
        options: {
            A: { fr: "0,2 g/l de sang", en: "0.2 g/l blood" },
            B: { fr: "0,5 g/l de sang", en: "0.5 g/l blood" },
            C: { fr: "0,3 g/l de sang", en: "0.3 g/l blood" },
            D: { fr: "0,0 g/l de sang (tolérance zéro)", en: "0.0 g/l blood (zero tolerance)" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Les conducteurs en période probatoire ont un taux maximal de 0,2 g/l de sang (soit quasi zéro, car le seuil correspond à l'alcoolémie résiduelle).",
        explanationEn: "Novice drivers (probationary period) have a limit of 0.2 g/l blood — effectively near-zero, as it accounts for residual alcohol only.",
        trapNote: "It's 0.2 g/l, NOT 0.5 g/l. The 0.5 limit is for experienced drivers only.",
        distractorNotes: {
            B: "0.5 g/l is for experienced drivers only, not novice/probationary drivers.",
            C: "0.3 g/l is not the legal threshold — it's 0.2 g/l.",
            D: "It's not absolute zero — the 0.2 threshold allows for residual metabolic alcohol."
        },
        vocabulary: [
            { wordFr: "alcoolémie", wordEn: "blood alcohol level", definition: "The concentration of alcohol in the blood" },
            { wordFr: "conducteur novice", wordEn: "novice driver", definition: "Driver in the probationary period (typically 3 years)" }
        ]
    },
    {
        id: 'cond-013', topic: 'conducteur', difficulty: 2, signs: [],
        questionFr: "Combien de points possède un permis de conduire au total ?",
        questionEn: "How many points does a driving licence have in total?",
        options: {
            A: { fr: "6 points", en: "6 points" },
            B: { fr: "10 points", en: "10 points" },
            C: { fr: "12 points", en: "12 points" },
            D: { fr: "20 points", en: "20 points" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Le permis de conduire français comporte un capital de 12 points. Les infractions entraînent des retraits de 1 à 6 points.",
        explanationEn: "A French driving licence has 12 points. Offences result in deductions of 1 to 6 points.",
        trapNote: "12 points maximum. Novice drivers start with only 6 and gain points progressively.",
        distractorNotes: {
            A: "6 points is the starting balance for novice drivers, not the maximum.",
            B: "10 points is not used in the French system.",
            D: "20 points does not exist in the French points system."
        },
        vocabulary: [
            { wordFr: "permis à points", wordEn: "points-based licence", definition: "The French system where infractions reduce your point balance" }
        ]
    },
    {
        id: 'cond-014', topic: 'conducteur', difficulty: 3, signs: [],
        questionFr: "Combien de points un conducteur novice possède-t-il au début de sa période probatoire ?",
        questionEn: "How many points does a novice driver have at the start of their probationary period?",
        options: {
            A: { fr: "3 points", en: "3 points" },
            B: { fr: "6 points", en: "6 points" },
            C: { fr: "8 points", en: "8 points" },
            D: { fr: "12 points", en: "12 points" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Un conducteur novice commence avec 6 points. Il gagne 2 points par an sans infraction (3 avec AAC) jusqu'à 12.",
        explanationEn: "A novice driver starts with 6 points. They gain 2 points per year without offences (3 with accompanied driving) up to 12.",
        trapNote: "6 to start, not 12. Losing even 3 points early can trigger a licence review.",
        distractorNotes: {
            A: "3 points is too few — novice drivers start with 6.",
            C: "8 points is not the starting balance for any category.",
            D: "12 is the maximum after the probationary period, not the starting value."
        },
        vocabulary: [
            { wordFr: "période probatoire", wordEn: "probationary period", definition: "The 2-3 year period after obtaining a licence" },
            { wordFr: "conduite accompagnée", wordEn: "accompanied driving (AAC)", definition: "Learning to drive with a supervising adult" }
        ]
    },
    {
        id: 'cond-015', topic: 'conducteur', difficulty: 2, signs: [],
        questionFr: "Quelle est la sanction pour l'utilisation du téléphone portable tenu en main au volant ?",
        questionEn: "What is the penalty for using a hand-held mobile phone while driving?",
        options: {
            A: { fr: "Amende de 35 € et retrait d'1 point", en: "35 euro fine and 1 point deduction" },
            B: { fr: "Amende de 135 € et retrait de 3 points", en: "135 euro fine and 3 point deduction" },
            C: { fr: "Avertissement", en: "Warning" },
            D: { fr: "Amende de 90 € sans retrait de point", en: "90 euro fine with no point deduction" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "L'usage d'un téléphone tenu en main est sanctionné par une amende de 135 € et un retrait de 3 points du permis.",
        explanationEn: "Using a hand-held phone while driving results in a 135 euro fine and 3 point deduction.",
        trapNote: "It's a serious offence — 3 points, not just 1. Hands-free devices are allowed.",
        distractorNotes: {
            A: "35 euro is for minor parking offences, not phone use while driving.",
            C: "There is no warning system — it's an immediate fine and point deduction.",
            D: "There IS a point deduction — 3 points, plus the fine is 135 euro, not 90."
        },
        vocabulary: [
            { wordFr: "téléphone tenu en main", wordEn: "hand-held phone", definition: "A mobile phone held in the hand while driving" },
            { wordFr: "retrait de points", wordEn: "point deduction", definition: "Points removed from your licence for an offence" }
        ]
    },
    {
        id: 'cond-016', topic: 'conducteur', difficulty: 2, signs: [],
        questionFr: "Quels sont les signes de fatigue au volant qui doivent vous alerter ?",
        questionEn: "What are the warning signs of driver fatigue?",
        options: {
            A: { fr: "Bâillements fréquents et yeux qui piquent", en: "Frequent yawning and stinging eyes" },
            B: { fr: "Raideur dans la nuque et difficulté de concentration", en: "Stiff neck and difficulty concentrating" },
            C: { fr: "Envie de doubler tous les véhicules", en: "Urge to overtake every vehicle" },
            D: { fr: "Variations involontaires de trajectoire", en: "Unintentional lane drifting" }
        },
        correctAnswers: ['A', 'B', 'D'], answerCount: 3,
        explanationFr: "Les signes de fatigue incluent : bâillements, yeux qui piquent, raideur du cou, perte de concentration et écarts de trajectoire.",
        explanationEn: "Fatigue signs include: yawning, stinging eyes, stiff neck, loss of concentration, and lane drifting.",
        trapNote: "Three correct answers! Wanting to overtake is a sign of aggression, not fatigue.",
        distractorNotes: {
            C: "Wanting to overtake everyone is a sign of aggressive driving, not fatigue."
        },
        vocabulary: [
            { wordFr: "somnolence", wordEn: "drowsiness", definition: "A state of near-sleep" },
            { wordFr: "bâillement", wordEn: "yawn", definition: "An involuntary deep breath when tired" }
        ]
    },
    {
        id: 'cond-017', topic: 'conducteur', difficulty: 1, signs: [],
        questionFr: "Le port de la ceinture de sécurité est-il obligatoire à l'arrière du véhicule ?",
        questionEn: "Is wearing a seatbelt compulsory in the back seat?",
        options: {
            A: { fr: "Oui, pour tous les passagers", en: "Yes, for all passengers" },
            B: { fr: "Non, seulement à l'avant", en: "No, only in the front" },
            C: { fr: "Seulement pour les enfants", en: "Only for children" },
            D: { fr: "Seulement sur autoroute", en: "Only on motorways" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "La ceinture de sécurité est obligatoire pour tous les occupants du véhicule, à l'avant comme à l'arrière.",
        explanationEn: "Seatbelts are compulsory for all vehicle occupants, both front and rear.",
        trapNote: "ALL seats, ALL roads. No exceptions for rear passengers.",
        distractorNotes: {
            B: "Rear seatbelts have been mandatory in France since 1990.",
            C: "Adults must also wear seatbelts in the rear — not just children.",
            D: "Seatbelts are required on ALL roads, not just motorways."
        },
        vocabulary: [
            { wordFr: "ceinture de sécurité", wordEn: "seatbelt", definition: "Safety restraint in a vehicle" }
        ]
    },
    {
        id: 'cond-018', topic: 'conducteur', difficulty: 3, signs: [],
        questionFr: "Quelle est la durée de la période probatoire du permis de conduire ?",
        questionEn: "How long is the probationary period for a driving licence?",
        options: {
            A: { fr: "1 an", en: "1 year" },
            B: { fr: "2 ans (conduite accompagnée) ou 3 ans", en: "2 years (accompanied driving) or 3 years" },
            C: { fr: "5 ans", en: "5 years" },
            D: { fr: "6 mois", en: "6 months" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "La période probatoire dure 3 ans (ou 2 ans si vous avez fait la conduite accompagnée AAC).",
        explanationEn: "The probationary period lasts 3 years (or 2 years if you completed accompanied driving AAC).",
        trapNote: "2 years for AAC graduates, 3 years otherwise. Not 1 or 5.",
        distractorNotes: {
            A: "1 year is too short for the probationary period.",
            C: "5 years does not correspond to any probationary duration.",
            D: "6 months is far too short — the minimum is 2 years."
        },
        vocabulary: [
            { wordFr: "AAC", wordEn: "accompanied driving", definition: "A training program where learners drive with an approved adult" }
        ]
    },
    {
        id: 'cond-019', topic: 'conducteur', difficulty: 2, signs: [],
        questionFr: "Quels médicaments peuvent affecter votre capacité à conduire ?",
        questionEn: "Which medications can affect your ability to drive?",
        options: {
            A: { fr: "Les antihistaminiques", en: "Antihistamines" },
            B: { fr: "Les somnifères et tranquillisants", en: "Sleeping pills and tranquillizers" },
            C: { fr: "Les antalgiques puissants", en: "Strong painkillers" },
            D: { fr: "Tous les médicaments avec un pictogramme de danger", en: "All medications with a danger pictogram" }
        },
        correctAnswers: ['D'], answerCount: 1,
        explanationFr: "Les médicaments avec un pictogramme de niveau 2 ou 3 (triangle orange ou rouge) peuvent affecter la conduite. Vérifiez toujours la boîte.",
        explanationEn: "Medications with a level 2 or 3 pictogram (orange or red triangle) can affect driving. Always check the packaging.",
        trapNote: "All options A-C are true, but D is the BEST answer as it covers all categories.",
        distractorNotes: {
            A: "Correct but incomplete — many other medication types also affect driving.",
            B: "Correct but incomplete — the pictogram system covers all dangerous medications.",
            C: "Correct but incomplete — D is the comprehensive answer."
        },
        vocabulary: [
            { wordFr: "pictogramme", wordEn: "pictogram", definition: "A warning symbol on medication packaging" },
            { wordFr: "somnifère", wordEn: "sleeping pill", definition: "Medication that induces sleep" }
        ]
    },
    {
        id: 'cond-020', topic: 'conducteur', difficulty: 1, signs: [],
        questionFr: "Quels documents devez-vous avoir dans votre véhicule ?",
        questionEn: "Which documents must you carry in your vehicle?",
        options: {
            A: { fr: "Permis de conduire et carte grise", en: "Driving licence and vehicle registration" },
            B: { fr: "Attestation d'assurance", en: "Insurance certificate" },
            C: { fr: "Contrôle technique valide (si applicable)", en: "Valid MOT certificate (if applicable)" },
            D: { fr: "Toutes ces réponses", en: "All of the above" }
        },
        correctAnswers: ['D'], answerCount: 1,
        explanationFr: "Vous devez avoir : le permis, la carte grise, l'attestation d'assurance, et le contrôle technique si le véhicule a plus de 4 ans.",
        explanationEn: "You must carry: licence, registration, insurance certificate, and MOT if the vehicle is over 4 years old.",
        trapNote: "ALL documents are required. Missing any one can result in a fine.",
        distractorNotes: {
            A: "Correct but incomplete — you also need insurance and MOT.",
            B: "Correct but incomplete — licence and registration are also required.",
            C: "Correct but incomplete — all four documents are required."
        },
        vocabulary: [
            { wordFr: "carte grise", wordEn: "vehicle registration document", definition: "Official document proving vehicle ownership" },
            { wordFr: "contrôle technique", wordEn: "MOT/technical inspection", definition: "Mandatory vehicle safety inspection" }
        ]
    },

    // === ROUTE 12-20 ===
    {
        id: 'route-012', topic: 'route', difficulty: 2, signs: [],
        questionFr: "Que signifie une ligne blanche continue au milieu de la chaussée ?",
        questionEn: "What does a continuous white line in the middle of the road mean?",
        options: {
            A: { fr: "Dépassement autorisé", en: "Overtaking allowed" },
            B: { fr: "Interdiction de franchir ou chevaucher", en: "No crossing or straddling" },
            C: { fr: "Zone de stationnement", en: "Parking zone" },
            D: { fr: "Route prioritaire", en: "Priority road" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Une ligne blanche continue interdit de la franchir ou de la chevaucher. Elle sépare les sens de circulation.",
        explanationEn: "A continuous white line means you must not cross or straddle it. It separates opposing traffic.",
        trapNote: "You cannot cross it even to overtake a slow vehicle or cyclist.",
        distractorNotes: {
            A: "A continuous line means the OPPOSITE — overtaking is prohibited.",
            C: "Parking zones are marked differently (blue zones, signs).",
            D: "Priority is indicated by signs, not road markings."
        },
        vocabulary: [
            { wordFr: "ligne continue", wordEn: "continuous line", definition: "An unbroken painted line on the road" },
            { wordFr: "chevaucher", wordEn: "to straddle", definition: "To drive with one wheel on or over the line" }
        ]
    },
    {
        id: 'route-013', topic: 'route', difficulty: 2, signs: [],
        questionFr: "Les bandes rugueuses au bord de la chaussée servent à :",
        questionEn: "Rumble strips on the road edge are designed to:",
        options: {
            A: { fr: "Alerter le conducteur qui s'écarte de sa voie", en: "Alert the driver who is drifting out of lane" },
            B: { fr: "Indiquer une zone de stationnement", en: "Mark a parking zone" },
            C: { fr: "Réduire la vitesse des véhicules", en: "Reduce vehicle speed" },
            D: { fr: "Délimiter une piste cyclable", en: "Mark a cycle lane" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Les bandes rugueuses (ou sonores) vibrent sous les pneus pour réveiller un conducteur qui s'endort ou quitte sa voie.",
        explanationEn: "Rumble strips vibrate under tyres to alert a drowsy driver or one drifting out of lane.",
        trapNote: "They're safety devices against drowsy driving, not speed reduction measures.",
        distractorNotes: {
            B: "Rumble strips are safety devices, not parking markers.",
            C: "Speed bumps reduce speed — rumble strips alert inattentive drivers.",
            D: "Cycle lanes are marked with painted lines, not rumble strips."
        },
        vocabulary: [
            { wordFr: "bandes rugueuses", wordEn: "rumble strips", definition: "Textured road surface strips that create vibration and noise" }
        ]
    },
    {
        id: 'route-014', topic: 'route', difficulty: 3, signs: [],
        questionFr: "Sur une route de montagne, qui a la priorité lorsque deux véhicules se croisent sur un passage étroit ?",
        questionEn: "On a mountain road, who has priority when two vehicles meet at a narrow passage?",
        options: {
            A: { fr: "Le véhicule qui monte", en: "The vehicle going uphill" },
            B: { fr: "Le véhicule qui descend", en: "The vehicle going downhill" },
            C: { fr: "Le plus gros véhicule", en: "The larger vehicle" },
            D: { fr: "Le véhicule le plus proche de la place pour s'arrêter", en: "The vehicle closest to a safe stopping place" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Le véhicule qui monte a la priorité car il est plus difficile de redémarrer en côte. Le véhicule descendant doit reculer.",
        explanationEn: "The uphill vehicle has priority because it's harder to restart on a slope. The downhill vehicle must reverse.",
        trapNote: "Uphill always wins because restarting on a hill is difficult and dangerous.",
        distractorNotes: {
            B: "The downhill vehicle must reverse — not the uphill one.",
            C: "Vehicle size doesn't determine priority on mountain roads.",
            D: "Proximity to a stopping place is not the legal criterion."
        },
        vocabulary: [
            { wordFr: "route de montagne", wordEn: "mountain road", definition: "A road in hilly or mountainous terrain" }
        ]
    },
    {
        id: 'route-015', topic: 'route', difficulty: 2, signs: [],
        questionFr: "Que signifie une ligne discontinue (pointillée) au centre de la route ?",
        questionEn: "What does a broken (dashed) line in the centre of the road mean?",
        options: {
            A: { fr: "Dépassement autorisé avec prudence", en: "Overtaking allowed with caution" },
            B: { fr: "Dépassement interdit", en: "Overtaking prohibited" },
            C: { fr: "Voie réservée aux bus", en: "Bus lane" },
            D: { fr: "Zone de danger", en: "Danger zone" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Une ligne discontinue permet de franchir la ligne pour dépasser si les conditions le permettent (visibilité, espace).",
        explanationEn: "A broken line allows you to cross it to overtake if conditions permit (visibility, space).",
        trapNote: "Broken = can cross. Continuous = cannot cross. Simple rule!",
        distractorNotes: {
            B: "A broken line ALLOWS overtaking — it's the continuous line that prohibits it.",
            C: "Bus lanes have specific markings and signs.",
            D: "Danger zones are indicated by signs, not by broken centre lines."
        },
        vocabulary: [
            { wordFr: "ligne discontinue", wordEn: "broken line", definition: "A dashed line that can be crossed" }
        ]
    },
    {
        id: 'route-016', topic: 'route', difficulty: 3, signs: ['danger'],
        questionFr: "Que signifie un panneau triangulaire à bord rouge avec un point d'exclamation ?",
        questionEn: "What does a triangular sign with a red border and exclamation mark mean?",
        options: {
            A: { fr: "Danger non précisé", en: "Unspecified danger" },
            B: { fr: "Route prioritaire", en: "Priority road" },
            C: { fr: "Interdiction de circuler", en: "No through road" },
            D: { fr: "Zone de travaux", en: "Construction zone" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Le panneau A14 (triangle rouge avec !) signale un danger qui n'est pas représenté par un panneau spécifique. Un panonceau peut préciser la nature du danger.",
        explanationEn: "The A14 sign (red triangle with !) warns of a danger not covered by a specific sign. A supplementary panel may explain the nature of the danger.",
        trapNote: "It means 'some danger ahead' — always look for a supplementary panel below it.",
        distractorNotes: {
            B: "Priority roads are shown by a yellow diamond sign.",
            C: "No through road uses a different sign (red circle with horizontal bar).",
            D: "Construction zones have their own specific sign (man digging)."
        },
        vocabulary: [
            { wordFr: "panonceau", wordEn: "supplementary panel", definition: "A small sign placed under the main sign giving extra information" }
        ]
    },
    {
        id: 'route-017', topic: 'route', difficulty: 2, signs: [],
        questionFr: "Quelle est la couleur des panneaux de signalisation temporaire (travaux) ?",
        questionEn: "What colour are temporary (roadwork) signs?",
        options: {
            A: { fr: "Rouge", en: "Red" },
            B: { fr: "Jaune", en: "Yellow" },
            C: { fr: "Bleu", en: "Blue" },
            D: { fr: "Vert", en: "Green" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Les panneaux temporaires de travaux ont un fond jaune. Ils ont priorité sur la signalisation permanente.",
        explanationEn: "Temporary roadwork signs have a yellow background. They take priority over permanent signs.",
        trapNote: "Yellow background = temporary. These override permanent white-background signs.",
        distractorNotes: {
            A: "Red borders are for warnings and prohibitions, not the background of temporary signs.",
            C: "Blue signs indicate information or mandatory direction.",
            D: "Green signs are for motorway directions."
        },
        vocabulary: [
            { wordFr: "signalisation temporaire", wordEn: "temporary signage", definition: "Signs placed during roadworks or events" }
        ]
    },
    {
        id: 'route-018', topic: 'route', difficulty: 1, signs: [],
        questionFr: "Quelle couleur de panneau indique une autoroute ?",
        questionEn: "What colour sign indicates a motorway?",
        options: {
            A: { fr: "Vert", en: "Green" },
            B: { fr: "Bleu", en: "Blue" },
            C: { fr: "Blanc", en: "White" },
            D: { fr: "Jaune", en: "Yellow" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Les panneaux d'autoroute ont un fond bleu. Les routes nationales sont vertes et les routes départementales sont blanches.",
        explanationEn: "Motorway signs have a blue background. National roads are green and departmental roads are white.",
        trapNote: "Blue = motorway, Green = national road, White = local road. Different from UK!",
        distractorNotes: {
            A: "Green signs are for national roads (routes nationales), not motorways.",
            C: "White signs are for departmental and local roads.",
            D: "Yellow is for temporary/roadwork signs."
        },
        vocabulary: [
            { wordFr: "panneau de direction", wordEn: "direction sign", definition: "A sign indicating the route to a destination" }
        ]
    },
    {
        id: 'route-019', topic: 'route', difficulty: 2, signs: [],
        questionFr: "Quelle est la distance de sécurité recommandée sur autoroute ?",
        questionEn: "What is the recommended following distance on a motorway?",
        options: {
            A: { fr: "1 seconde", en: "1 second" },
            B: { fr: "2 secondes", en: "2 seconds" },
            C: { fr: "4 secondes", en: "4 seconds" },
            D: { fr: "6 secondes", en: "6 seconds" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "La distance de sécurité correspond à 2 secondes derrière le véhicule qui précède. Sur autoroute à 130 km/h, cela fait environ 73 mètres.",
        explanationEn: "The safe following distance is 2 seconds behind the vehicle ahead. At 130 km/h on a motorway, this is about 73 metres.",
        trapNote: "2-second rule: pick a fixed point, count 'one thousand one, one thousand two' after the car ahead passes it.",
        distractorNotes: {
            A: "1 second is far too close, especially at motorway speeds.",
            C: "4 seconds is extra cautious but the standard rule is 2 seconds.",
            D: "6 seconds is unnecessarily long for normal conditions."
        },
        vocabulary: [
            { wordFr: "distance de sécurité", wordEn: "following distance", definition: "The safe gap between your vehicle and the one ahead" }
        ]
    },
    {
        id: 'route-020', topic: 'route', difficulty: 3, signs: [],
        questionFr: "Sur une voie de décélération (bretelle de sortie d'autoroute), quand devez-vous freiner ?",
        questionEn: "On a deceleration lane (motorway exit slip road), when should you brake?",
        options: {
            A: { fr: "Avant d'entrer sur la voie de décélération", en: "Before entering the deceleration lane" },
            B: { fr: "Uniquement sur la voie de décélération", en: "Only on the deceleration lane" },
            C: { fr: "Sur la voie de droite de l'autoroute", en: "On the motorway's right lane" },
            D: { fr: "Au dernier moment", en: "At the last moment" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Vous ne devez décélérer que sur la voie de décélération, pas sur l'autoroute elle-même, pour ne pas gêner la circulation.",
        explanationEn: "You must only decelerate on the slip road, not on the motorway itself, to avoid disrupting traffic flow.",
        trapNote: "Never brake on the main motorway — only slow down AFTER entering the exit lane.",
        distractorNotes: {
            A: "Braking before entering the deceleration lane slows traffic on the motorway.",
            C: "Braking on the right lane of the motorway is dangerous for following vehicles.",
            D: "Last-moment braking is extremely dangerous at motorway speeds."
        },
        vocabulary: [
            { wordFr: "voie de décélération", wordEn: "deceleration lane", definition: "The exit slip road where you slow down" },
            { wordFr: "bretelle", wordEn: "slip road", definition: "A short road connecting to/from a motorway" }
        ]
    },

    // === AUTRES USAGERS 12-20 ===
    {
        id: 'autr-012', topic: 'autres_usagers', difficulty: 2, signs: [],
        questionFr: "Quelle distance latérale minimale devez-vous laisser en dépassant un cycliste hors agglomération ?",
        questionEn: "What minimum lateral distance must you leave when overtaking a cyclist outside built-up areas?",
        options: {
            A: { fr: "0,50 mètre", en: "0.50 metres" },
            B: { fr: "1 mètre", en: "1 metre" },
            C: { fr: "1,50 mètre", en: "1.50 metres" },
            D: { fr: "2 mètres", en: "2 metres" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Hors agglomération, la distance latérale minimale pour dépasser un cycliste est de 1,50 m. En ville, c'est 1 m.",
        explanationEn: "Outside built-up areas, the minimum lateral distance to overtake a cyclist is 1.50 m. In town, it's 1 m.",
        trapNote: "1.5 metres outside town, 1 metre in town. Many drivers don't leave enough space!",
        distractorNotes: {
            A: "0.50 m is dangerously close — far below the legal minimum.",
            B: "1 metre is the rule IN built-up areas, not outside.",
            D: "2 metres is not required by law, though more space is always safer."
        },
        vocabulary: [
            { wordFr: "distance latérale", wordEn: "lateral distance", definition: "The side gap between your vehicle and the cyclist" }
        ]
    },
    {
        id: 'autr-013', topic: 'autres_usagers', difficulty: 2, signs: [],
        questionFr: "Un bus scolaire est arrêté avec les feux clignotants. Que devez-vous faire ?",
        questionEn: "A school bus has stopped with flashing lights. What must you do?",
        options: {
            A: { fr: "Le dépasser rapidement", en: "Overtake it quickly" },
            B: { fr: "Ralentir et être prêt à s'arrêter", en: "Slow down and be ready to stop" },
            C: { fr: "Klaxonner pour avertir les enfants", en: "Honk to warn the children" },
            D: { fr: "Continuer normalement", en: "Continue normally" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Lorsqu'un bus scolaire est à l'arrêt avec les feux clignotants, vous devez ralentir et être prêt à vous arrêter car des enfants peuvent traverser.",
        explanationEn: "When a school bus has stopped with flashing lights, slow down and be ready to stop as children may cross.",
        trapNote: "Children are unpredictable — always expect them to run into the road.",
        distractorNotes: {
            A: "Overtaking a stopped school bus is extremely dangerous.",
            C: "Honking near children can startle them into running into traffic.",
            D: "Continuing normally ignores the danger of children crossing."
        },
        vocabulary: [
            { wordFr: "bus scolaire", wordEn: "school bus", definition: "A bus transporting school children" },
            { wordFr: "feux clignotants", wordEn: "flashing lights", definition: "Warning lights that blink on and off" }
        ]
    },
    {
        id: 'autr-014', topic: 'autres_usagers', difficulty: 3, signs: [],
        questionFr: "Un tramway arrive à un arrêt. Quel est votre obligation ?",
        questionEn: "A tram is arriving at a stop. What is your obligation?",
        options: {
            A: { fr: "Le dépasser par la gauche", en: "Overtake it on the left" },
            B: { fr: "S'arrêter pour laisser les passagers monter et descendre", en: "Stop to let passengers board and alight" },
            C: { fr: "Accélérer pour passer avant lui", en: "Accelerate to pass before it" },
            D: { fr: "Klaxonner pour que les passagers se dépêchent", en: "Honk to hurry the passengers" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Vous devez vous arrêter pour laisser les passagers du tramway descendre et monter en toute sécurité.",
        explanationEn: "You must stop to let tram passengers board and alight safely.",
        trapNote: "Trams have absolute priority at stops — you MUST wait for passengers.",
        distractorNotes: {
            A: "You cannot overtake a tram at a stop — passengers may cross.",
            C: "Accelerating near a tram stop is dangerous and illegal.",
            D: "Honking at pedestrians is prohibited in this context."
        },
        vocabulary: [
            { wordFr: "tramway", wordEn: "tram", definition: "A rail vehicle that runs on tracks in the street" },
            { wordFr: "arrêt", wordEn: "stop", definition: "A designated place where public transport picks up passengers" }
        ]
    },
    {
        id: 'autr-015', topic: 'autres_usagers', difficulty: 2, signs: ['pedestrian_crossing'],
        questionFr: "Un piéton est engagé sur un passage piétons. Que devez-vous faire ?",
        questionEn: "A pedestrian is on a pedestrian crossing. What must you do?",
        options: {
            A: { fr: "Klaxonner pour qu'il se dépêche", en: "Honk to hurry them" },
            B: { fr: "Le contourner par la gauche", en: "Go around them on the left" },
            C: { fr: "Vous arrêter et le laisser traverser", en: "Stop and let them cross" },
            D: { fr: "Ralentir mais continuer à avancer", en: "Slow down but keep moving" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Vous devez obligatoirement vous arrêter lorsqu'un piéton est engagé sur un passage piétons. Ne pas s'arrêter entraîne une amende et un retrait de 6 points.",
        explanationEn: "You must stop when a pedestrian is on a crossing. Failure to stop results in a fine and 6-point deduction.",
        trapNote: "6-point deduction — one of the most severe penalties! Pedestrians always have right of way on crossings.",
        distractorNotes: {
            A: "Honking at pedestrians on crossings is prohibited.",
            B: "Going around a pedestrian on a crossing is extremely dangerous and illegal.",
            D: "You must STOP completely, not just slow down."
        },
        vocabulary: [
            { wordFr: "passage piétons", wordEn: "pedestrian crossing", definition: "A marked area for pedestrians to cross the road" }
        ]
    },
    {
        id: 'autr-016', topic: 'autres_usagers', difficulty: 2, signs: [],
        questionFr: "Comment devez-vous réagir face à un tracteur agricole lent sur une route nationale ?",
        questionEn: "How should you react to a slow agricultural tractor on a national road?",
        options: {
            A: { fr: "Le dépasser immédiatement", en: "Overtake immediately" },
            B: { fr: "Attendre une zone de dépassement sûre", en: "Wait for a safe overtaking zone" },
            C: { fr: "Klaxonner pour qu'il s'écarte", en: "Honk for it to move aside" },
            D: { fr: "Le suivre de très près pour l'inciter à accélérer", en: "Tailgate to encourage it to speed up" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Patientez derrière le tracteur et ne dépassez que lorsque la visibilité et l'espace le permettent en toute sécurité.",
        explanationEn: "Wait behind the tractor and only overtake when visibility and space allow it safely.",
        trapNote: "Patience is key — rushing to overtake a tractor causes many rural road accidents.",
        distractorNotes: {
            A: "Immediate overtaking without checking conditions is dangerous.",
            C: "Agricultural vehicles have the right to use the road — honking is inappropriate.",
            D: "Tailgating is dangerous and illegal regardless of the vehicle ahead."
        },
        vocabulary: [
            { wordFr: "tracteur agricole", wordEn: "agricultural tractor", definition: "A slow-moving farm vehicle" },
            { wordFr: "zone de dépassement", wordEn: "overtaking zone", definition: "A section of road where overtaking is safe and legal" }
        ]
    },
    {
        id: 'autr-017', topic: 'autres_usagers', difficulty: 1, signs: [],
        questionFr: "Les enfants de moins de 10 ans doivent-ils voyager dans un siège auto adapté ?",
        questionEn: "Must children under 10 travel in an appropriate car seat?",
        options: {
            A: { fr: "Oui, obligatoirement", en: "Yes, compulsory" },
            B: { fr: "Non, la ceinture suffit", en: "No, the seatbelt is enough" },
            C: { fr: "Seulement sur autoroute", en: "Only on motorways" },
            D: { fr: "Seulement à l'arrière", en: "Only in the back" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Les enfants de moins de 10 ans (ou moins de 135 cm) doivent utiliser un dispositif de retenue adapté (siège auto ou rehausseur).",
        explanationEn: "Children under 10 (or under 135 cm) must use an appropriate restraint system (car seat or booster).",
        trapNote: "It's based on size (135 cm) AND age (10 years), whichever comes last.",
        distractorNotes: {
            B: "A standard seatbelt doesn't fit children properly — they need specific restraints.",
            C: "Car seats are required on ALL roads, not just motorways.",
            D: "Children can sit in the front in some cases, but always need a child seat."
        },
        vocabulary: [
            { wordFr: "siège auto", wordEn: "car seat", definition: "A child restraint device for vehicles" },
            { wordFr: "rehausseur", wordEn: "booster seat", definition: "A raised seat that positions the seatbelt correctly for older children" }
        ]
    },
    {
        id: 'autr-018', topic: 'autres_usagers', difficulty: 3, signs: [],
        questionFr: "Un véhicule prioritaire (police, ambulance) arrive derrière vous sur une route à sens unique étroite. Que faites-vous ?",
        questionEn: "A priority vehicle (police, ambulance) approaches from behind on a narrow one-way street. What do you do?",
        options: {
            A: { fr: "Accélérer pour dégager le passage", en: "Speed up to clear the way" },
            B: { fr: "Vous arrêter le plus à droite possible", en: "Stop as far right as possible" },
            C: { fr: "Continuer normalement", en: "Continue normally" },
            D: { fr: "Monter sur le trottoir si nécessaire", en: "Mount the pavement if necessary" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Sur une route étroite, serrez-vous le plus possible à droite et arrêtez-vous si nécessaire pour laisser passer le véhicule prioritaire.",
        explanationEn: "On a narrow road, move as far right as possible and stop if necessary to let the priority vehicle pass.",
        trapNote: "Never mount the pavement — just move right and stop. The emergency vehicle will find a way.",
        distractorNotes: {
            A: "Speeding up is dangerous and doesn't help the emergency vehicle.",
            C: "Continuing normally blocks the priority vehicle — this is illegal.",
            D: "Mounting the pavement endangers pedestrians and is not the correct response."
        },
        vocabulary: [
            { wordFr: "véhicule prioritaire", wordEn: "priority vehicle", definition: "An emergency vehicle with sirens and flashing lights" }
        ]
    },
    {
        id: 'autr-019', topic: 'autres_usagers', difficulty: 2, signs: [],
        questionFr: "Un motard remonte une file de voitures à l'arrêt (inter-file). Est-ce légal ?",
        questionEn: "A motorcyclist is filtering between lanes of stationary traffic. Is this legal?",
        options: {
            A: { fr: "Oui, partout en France", en: "Yes, everywhere in France" },
            B: { fr: "Oui, mais seulement sur les routes à 2x2 voies ou plus avec une limitation à 50 km/h ou moins", en: "Yes, but only on roads with 2+ lanes each way limited to 50 km/h or less" },
            C: { fr: "Non, c'est toujours interdit", en: "No, it is always prohibited" },
            D: { fr: "Oui, mais seulement sur autoroute", en: "Yes, but only on motorways" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Depuis 2021, la circulation inter-files est autorisée sur certaines routes (2x2 voies minimum, vitesse ≤ 50 km/h pour le motard) dans des zones expérimentales.",
        explanationEn: "Since 2021, lane filtering is allowed on certain roads (2+ lanes each way, motorcyclist speed ≤ 50 km/h) in experimental zones.",
        trapNote: "Lane filtering rules are complex and vary by area — it's not blanket legal or illegal.",
        distractorNotes: {
            A: "It's not allowed everywhere — only on specific road types in designated zones.",
            C: "It is experimentally authorized under strict conditions since 2021.",
            D: "It's allowed on various multi-lane roads, not just motorways."
        },
        vocabulary: [
            { wordFr: "circulation inter-files", wordEn: "lane filtering", definition: "A motorcyclist riding between two lanes of traffic" }
        ]
    },
    {
        id: 'autr-020', topic: 'autres_usagers', difficulty: 2, signs: [],
        questionFr: "Une personne aveugle avec une canne blanche s'apprête à traverser. Que devez-vous faire ?",
        questionEn: "A blind person with a white cane is about to cross. What must you do?",
        options: {
            A: { fr: "Klaxonner pour signaler votre présence", en: "Honk to signal your presence" },
            B: { fr: "Vous arrêter et attendre", en: "Stop and wait" },
            C: { fr: "Ralentir et passer derrière la personne", en: "Slow down and pass behind the person" },
            D: { fr: "Faire un appel de phares", en: "Flash your headlights" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Les personnes aveugles ou malvoyantes sont des usagers vulnérables. Vous devez vous arrêter et les laisser traverser.",
        explanationEn: "Blind or visually impaired people are vulnerable road users. You must stop and let them cross.",
        trapNote: "Do NOT honk or flash lights — this won't help a blind person and may startle them.",
        distractorNotes: {
            A: "Honking may frighten or disorient a blind person.",
            C: "Passing behind someone who can't see you is dangerous — they may change direction.",
            D: "Flashing headlights is useless for someone who cannot see."
        },
        vocabulary: [
            { wordFr: "canne blanche", wordEn: "white cane", definition: "A mobility aid used by blind or visually impaired people" },
            { wordFr: "usager vulnérable", wordEn: "vulnerable road user", definition: "Pedestrians, cyclists, children, elderly, disabled people" }
        ]
    },

    // === PRIORITE 12-20 ===
    {
        id: 'prio-012', topic: 'priorite', difficulty: 2, signs: ['yield'],
        questionFr: "Que signifie le panneau triangulaire inversé (pointe en bas) ?",
        questionEn: "What does the inverted triangle sign (point down) mean?",
        options: {
            A: { fr: "Route prioritaire", en: "Priority road" },
            B: { fr: "Cédez le passage", en: "Give way" },
            C: { fr: "Sens interdit", en: "No entry" },
            D: { fr: "Fin de priorité", en: "End of priority" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Le triangle inversé signifie 'cédez le passage'. Vous devez ralentir et laisser passer les véhicules prioritaires.",
        explanationEn: "The inverted triangle means 'give way'. You must slow down and yield to priority vehicles.",
        trapNote: "Inverted triangle = yield. Regular triangle = warning. Don't confuse the shapes!",
        distractorNotes: {
            A: "Priority road is shown by a yellow diamond, not an inverted triangle.",
            C: "No entry is a red circle with a white bar.",
            D: "End of priority uses a different sign (yellow diamond with diagonal line)."
        },
        vocabulary: [
            { wordFr: "cédez le passage", wordEn: "give way/yield", definition: "You must let other traffic go first" }
        ]
    },
    {
        id: 'prio-013', topic: 'priorite', difficulty: 3, signs: ['traffic_light'], scenario: 'police_directing',
        questionFr: "Un agent de police dirige la circulation et le feu est vert. Qui devez-vous suivre ?",
        questionEn: "A police officer is directing traffic and the light is green. Who must you follow?",
        options: {
            A: { fr: "Le feu vert", en: "The green light" },
            B: { fr: "L'agent de police", en: "The police officer" },
            C: { fr: "Le plus pratique des deux", en: "Whichever is more convenient" },
            D: { fr: "Les autres véhicules", en: "The other vehicles" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Les ordres d'un agent de police prévalent sur la signalisation lumineuse et les panneaux. Vous devez toujours obéir à l'agent.",
        explanationEn: "A police officer's instructions override traffic lights and signs. You must always obey the officer.",
        trapNote: "Hierarchy: police officer > traffic lights > signs > right-of-way rules.",
        distractorNotes: {
            A: "The officer overrides the green light — even if it's green, you must follow the officer.",
            C: "There's no choice — the officer's orders are absolute.",
            D: "Following other vehicles blindly can lead you to disobey the officer."
        },
        vocabulary: [
            { wordFr: "agent de police", wordEn: "police officer", definition: "A law enforcement officer directing traffic" }
        ]
    },
    {
        id: 'prio-014', topic: 'priorite', difficulty: 3, signs: [], scenario: 'four_way_no_signs',
        questionFr: "À une intersection sans signalisation, quelle règle s'applique ?",
        questionEn: "At an intersection with no signs, which rule applies?",
        options: {
            A: { fr: "Le premier arrivé passe en premier", en: "First come, first served" },
            B: { fr: "Priorité à droite", en: "Priority to the right" },
            C: { fr: "Le véhicule le plus rapide a la priorité", en: "The fastest vehicle has priority" },
            D: { fr: "Les deux véhicules doivent s'arrêter", en: "Both vehicles must stop" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Sans signalisation, la règle par défaut en France est la priorité à droite : le véhicule venant de votre droite a la priorité.",
        explanationEn: "Without signs, the default rule in France is priority to the right: the vehicle coming from your right has priority.",
        trapNote: "This is THE fundamental French traffic rule. When in doubt, yield to the right.",
        distractorNotes: {
            A: "Order of arrival does not determine priority in France.",
            C: "Speed has nothing to do with priority — this is dangerous thinking.",
            D: "Only STOP signs or red lights require both vehicles to stop."
        },
        vocabulary: [
            { wordFr: "priorité à droite", wordEn: "priority to the right", definition: "The default rule giving way to vehicles from the right" }
        ]
    },
    {
        id: 'prio-015', topic: 'priorite', difficulty: 2, signs: [],
        questionFr: "Un feu clignotant orange signifie :",
        questionEn: "A flashing amber light means:",
        options: {
            A: { fr: "Arrêt obligatoire", en: "Mandatory stop" },
            B: { fr: "Passez avec prudence, priorité à droite s'applique", en: "Proceed with caution, priority to the right applies" },
            C: { fr: "Feu en panne, continuez normalement", en: "Light broken, continue normally" },
            D: { fr: "Accélérez pour passer avant le rouge", en: "Accelerate to pass before it turns red" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Un feu orange clignotant signifie que le feu ne régule plus la circulation. La priorité à droite s'applique.",
        explanationEn: "A flashing amber light means the traffic light is no longer controlling traffic. Priority to the right applies.",
        trapNote: "Flashing amber = no active light control. Treat it as an uncontrolled intersection.",
        distractorNotes: {
            A: "Flashing amber doesn't require a stop — just caution and priority-to-right.",
            C: "It's not necessarily broken — it can be deliberately set to flash at night.",
            D: "There is no upcoming red — flashing amber is a constant state."
        },
        vocabulary: [
            { wordFr: "feu orange clignotant", wordEn: "flashing amber light", definition: "A traffic light blinking amber, indicating caution" }
        ]
    },
    {
        id: 'prio-016', topic: 'priorite', difficulty: 3, signs: [], scenario: 'parking_exit',
        questionFr: "Vous sortez d'un parking privé. Qui a la priorité ?",
        questionEn: "You are leaving a private car park. Who has priority?",
        options: {
            A: { fr: "Vous, car vous êtes sur la route en premier", en: "You, because you are on the road first" },
            B: { fr: "Tous les autres usagers de la route", en: "All other road users" },
            C: { fr: "Priorité à droite normale", en: "Normal priority to the right" },
            D: { fr: "Les piétons uniquement", en: "Pedestrians only" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "En sortant d'un chemin privé, d'un parking ou d'un garage, vous n'avez aucune priorité. Tous les usagers de la voie publique passent avant vous.",
        explanationEn: "When leaving a private path, car park, or garage, you have no priority. All public road users go before you.",
        trapNote: "Exiting private property = zero priority. You must yield to EVERYONE.",
        distractorNotes: {
            A: "Exiting private property gives you zero priority, regardless of who arrived first.",
            C: "Priority-to-right doesn't apply when leaving private property — you must yield to all.",
            D: "You must yield to ALL road users, not just pedestrians."
        },
        vocabulary: [
            { wordFr: "chemin privé", wordEn: "private path", definition: "A road or driveway belonging to private property" }
        ]
    },
    {
        id: 'prio-017', topic: 'priorite', difficulty: 2, signs: ['stop'],
        questionFr: "Au panneau STOP, devez-vous vous arrêter même si vous ne voyez aucun véhicule ?",
        questionEn: "At a STOP sign, must you stop even if you see no other vehicles?",
        options: {
            A: { fr: "Oui, l'arrêt est obligatoire dans tous les cas", en: "Yes, stopping is compulsory in all cases" },
            B: { fr: "Non, si la voie est libre vous pouvez continuer", en: "No, if the road is clear you can continue" },
            C: { fr: "Seulement de nuit", en: "Only at night" },
            D: { fr: "Seulement si un agent est présent", en: "Only if an officer is present" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Le panneau STOP impose un arrêt absolu et marqué, même si aucun véhicule n'est visible. Vous devez marquer l'arrêt à la ligne.",
        explanationEn: "A STOP sign requires a complete, marked stop even if no other vehicle is visible. You must stop at the line.",
        trapNote: "STOP means STOP — always, every time, no exceptions. A rolling stop is illegal.",
        distractorNotes: {
            B: "You must stop even if the road appears clear — this is the law.",
            C: "The obligation applies 24/7, not just at night.",
            D: "An officer's presence doesn't change the rule — STOP is always mandatory."
        },
        vocabulary: [
            { wordFr: "arrêt marqué", wordEn: "complete stop", definition: "Coming to a full stop with the vehicle motionless" }
        ]
    },
    {
        id: 'prio-018', topic: 'priorite', difficulty: 3, signs: ['priority_road'],
        questionFr: "Le panneau de route prioritaire (losange jaune) s'applique-t-il dans un carrefour giratoire ?",
        questionEn: "Does the priority road sign (yellow diamond) apply in a roundabout?",
        options: {
            A: { fr: "Oui, vous gardez la priorité", en: "Yes, you keep priority" },
            B: { fr: "Non, dans un giratoire les véhicules engagés ont toujours la priorité", en: "No, in a roundabout vehicles already in always have priority" },
            C: { fr: "Seulement si vous venez de la route principale", en: "Only if you come from the main road" },
            D: { fr: "Le panneau est annulé par le giratoire", en: "The sign is cancelled by the roundabout" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Dans un carrefour giratoire, la priorité est toujours aux véhicules engagés, quel que soit le statut de la route d'approche.",
        explanationEn: "In a roundabout, priority always goes to vehicles already circulating, regardless of the approach road's status.",
        trapNote: "Roundabouts override the priority road sign — always yield before entering.",
        distractorNotes: {
            A: "Priority road status is suspended inside a roundabout.",
            C: "The road you came from doesn't matter in a roundabout.",
            D: "The sign isn't 'cancelled' — its priority just doesn't apply within the roundabout itself."
        },
        vocabulary: [
            { wordFr: "losange jaune", wordEn: "yellow diamond", definition: "The priority road sign shape" }
        ]
    },
    {
        id: 'prio-019', topic: 'priorite', difficulty: 2, signs: [], scenario: 'traffic_light_failure',
        questionFr: "À un carrefour, un feu tricolore est en panne (éteint). Quelle règle s'applique ?",
        questionEn: "At a junction, a traffic light is off (broken). Which rule applies?",
        options: {
            A: { fr: "Tout le monde s'arrête", en: "Everyone stops" },
            B: { fr: "Priorité à droite", en: "Priority to the right" },
            C: { fr: "Le premier arrivé passe", en: "First arrived goes first" },
            D: { fr: "Pas de règle, c'est chacun pour soi", en: "No rule, it's every man for himself" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Lorsqu'un feu est en panne, la règle de priorité à droite s'applique par défaut, sauf si des panneaux de signalisation sont présents.",
        explanationEn: "When a traffic light is broken, the priority-to-the-right rule applies by default, unless road signs are present.",
        trapNote: "Broken light = same as no light = priority-to-right. Check for any remaining signs.",
        distractorNotes: {
            A: "There's no automatic 'all-stop' rule when a light breaks.",
            C: "Order of arrival doesn't determine priority in France.",
            D: "There IS a rule — priority to the right always applies as the default."
        },
        vocabulary: [
            { wordFr: "feu en panne", wordEn: "broken traffic light", definition: "A traffic light that is not functioning" }
        ]
    },
    {
        id: 'prio-020', topic: 'priorite', difficulty: 1, signs: ['stop', 'yield'],
        questionFr: "Quelle est la différence entre le STOP et le CÉDEZ LE PASSAGE ?",
        questionEn: "What is the difference between STOP and GIVE WAY?",
        options: {
            A: { fr: "STOP oblige à s'arrêter, CÉDEZ permet de passer si la voie est libre", en: "STOP requires stopping, GIVE WAY allows passing if the road is clear" },
            B: { fr: "Ils signifient la même chose", en: "They mean the same thing" },
            C: { fr: "CÉDEZ est plus strict que STOP", en: "GIVE WAY is stricter than STOP" },
            D: { fr: "STOP est seulement pour les poids lourds", en: "STOP is only for heavy vehicles" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "STOP = arrêt obligatoire (même si la voie est libre). Cédez le passage = ralentir et ne s'arrêter que si nécessaire.",
        explanationEn: "STOP = mandatory stop (even if the road is clear). Give way = slow down and stop only if necessary.",
        trapNote: "At STOP you MUST stop completely. At Give Way, you can proceed if safe.",
        distractorNotes: {
            B: "They are different — STOP is stricter than Give Way.",
            C: "STOP is stricter — it requires a full stop in all cases.",
            D: "STOP applies to ALL vehicles, not just heavy vehicles."
        },
        vocabulary: [
            { wordFr: "arrêt obligatoire", wordEn: "mandatory stop", definition: "You must bring the vehicle to a complete standstill" }
        ]
    },

    // === CIRCULATION 21-31 (Traffic Rules — Advanced) ===
    {
        id: 'circ-021',
        topic: 'circulation',
        difficulty: 2,
        questionFr: "Dans une zone 30, quelles affirmations sont correctes ?",
        questionEn: "In a zone 30, which statements are correct?",
        options: {
            A: { fr: "La vitesse est limitée à 30 km/h", en: "The speed limit is 30 km/h" },
            B: { fr: "Les piétons peuvent traverser partout", en: "Pedestrians can cross anywhere" },
            C: { fr: "Le stationnement est toujours interdit", en: "Parking is always prohibited" },
            D: { fr: "Les vélos peuvent circuler à contresens si signalé", en: "Bicycles can ride against traffic if signed" }
        },
        correctAnswers: ["A", "D"],
        answerCount: 2,
        explanationFr: "Une zone 30 impose une limitation à 30 km/h. Les vélos peuvent y circuler à contresens lorsque la signalisation l'autorise (double-sens cyclable). Les piétons doivent utiliser les passages piétons s'il y en a, et le stationnement n'est pas systématiquement interdit.",
        explanationEn: "A zone 30 imposes a 30 km/h limit. Cyclists may ride against traffic when signage permits (contra-flow cycling). Pedestrians must use crossings where available, and parking is not systematically prohibited.",
        trapNote: "People often think zone 30 = pedestrians can cross anywhere. That rule applies to zone de rencontre, not zone 30.",
        distractorNotes: {
            B: "Pedestrians crossing anywhere is a rule of the zone de rencontre (20 km/h), not zone 30.",
            C: "Parking rules in zone 30 depend on local signage, not a blanket prohibition."
        },
        vocabulary: [
            { wordFr: "zone 30", wordEn: "30 km/h zone", definition: "Urban area where speed is limited to 30 km/h with traffic calming" },
            { wordFr: "double-sens cyclable", wordEn: "contra-flow cycling", definition: "A street where cyclists may ride in the opposite direction to motor traffic" }
        ]
    },
    {
        id: 'circ-022',
        topic: 'circulation',
        difficulty: 2,
        questionFr: "Quelle est la vitesse maximale dans une zone de rencontre ?",
        questionEn: "What is the maximum speed in a 'zone de rencontre' (shared space)?",
        options: {
            A: { fr: "10 km/h", en: "10 km/h" },
            B: { fr: "20 km/h", en: "20 km/h" },
            C: { fr: "30 km/h", en: "30 km/h" },
            D: { fr: "50 km/h", en: "50 km/h" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "La zone de rencontre limite la vitesse à 20 km/h. Les piétons y sont prioritaires et peuvent traverser où ils le souhaitent. Article R110-2 du Code de la route.",
        explanationEn: "A zone de rencontre limits speed to 20 km/h. Pedestrians have priority and may cross anywhere. Article R110-2 of the Highway Code.",
        trapNote: "Don't confuse zone de rencontre (20 km/h, pedestrians priority) with zone 30 (30 km/h, cars still have right of way).",
        distractorNotes: {
            A: "10 km/h is for aire piétonne (pedestrian zone), not zone de rencontre.",
            C: "30 km/h is for zone 30, a different type of restricted zone.",
            D: "50 km/h is the default urban speed limit, far too fast for a shared space."
        },
        vocabulary: [
            { wordFr: "zone de rencontre", wordEn: "shared space / encounter zone", definition: "A zone where pedestrians have absolute priority and speed is limited to 20 km/h" },
            { wordFr: "aire piétonne", wordEn: "pedestrian zone", definition: "A zone reserved for pedestrians where vehicles may only enter for access at walking pace" }
        ]
    },
    {
        id: 'circ-023',
        topic: 'circulation',
        difficulty: 3,
        questionFr: "Dans un tunnel, quelle distance de sécurité minimale devez-vous respecter avec le véhicule qui vous précède ?",
        questionEn: "In a tunnel, what is the minimum safe following distance from the vehicle ahead?",
        options: {
            A: { fr: "Deux secondes comme sur route ouverte", en: "Two seconds like on open road" },
            B: { fr: "Au moins 50 mètres ou un repère de distance", en: "At least 50 metres or one distance marker" },
            C: { fr: "La longueur de votre véhicule", en: "The length of your vehicle" },
            D: { fr: "Au moins 100 mètres", en: "At least 100 metres" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Dans un tunnel, la distance de sécurité recommandée est d'au moins 50 mètres (ou un repère de distance). Des panneaux lumineux rappellent souvent cette obligation. La règle des 2 secondes s'applique sur route ouverte mais dans un tunnel la distance fixe de 50 m est préférable car les repères visuels sont limités.",
        explanationEn: "In a tunnel, the recommended safe following distance is at least 50 metres (or one distance marker). Illuminated signs often remind drivers of this requirement. The 2-second rule applies on open roads, but in tunnels the fixed 50m distance is preferred due to limited visual cues.",
        trapNote: "The standard 2-second rule is for open roads. Tunnels use fixed metre distances because judging time gaps is harder in enclosed spaces.",
        distractorNotes: {
            A: "The 2-second rule is for open roads. Tunnels require a fixed distance due to reduced visual references.",
            C: "Vehicle length is far too short — it would be only a few metres.",
            D: "100 metres is excessively cautious and not the standard recommendation."
        },
        vocabulary: [
            { wordFr: "distance de sécurité", wordEn: "safe following distance", definition: "The minimum gap to maintain behind the vehicle ahead" },
            { wordFr: "repère de distance", wordEn: "distance marker", definition: "Markers on tunnel walls indicating distance intervals" }
        ]
    },
    {
        id: 'circ-024',
        topic: 'circulation',
        difficulty: 1,
        questionFr: "Quand devez-vous allumer vos feux de croisement ?",
        questionEn: "When must you switch on your dipped headlights?",
        options: {
            A: { fr: "Uniquement la nuit", en: "Only at night" },
            B: { fr: "De jour comme de nuit", en: "Day and night" },
            C: { fr: "La nuit et lorsque la visibilité est insuffisante", en: "At night and when visibility is poor" },
            D: { fr: "Uniquement par temps de pluie", en: "Only in rainy conditions" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "Les feux de croisement doivent être allumés la nuit (de nuit) et de jour lorsque les conditions de visibilité sont insuffisantes (pluie, brouillard, neige). Article R416-4 du Code de la route.",
        explanationEn: "Dipped headlights must be switched on at night and during the day when visibility conditions are poor (rain, fog, snow). Article R416-4 of the Highway Code.",
        trapNote: "It's not ONLY at night — poor daytime visibility also requires dipped headlights.",
        distractorNotes: {
            A: "Night-only is incomplete — poor daytime visibility also requires them.",
            B: "Day AND night is the rule for daytime running lights (DRL/feux diurnes), not dipped headlights.",
            D: "Rain is one case of poor visibility, but not the only one."
        },
        vocabulary: [
            { wordFr: "feux de croisement", wordEn: "dipped headlights / low beams", definition: "Headlights that illuminate the road without blinding oncoming traffic" },
            { wordFr: "feux diurnes", wordEn: "daytime running lights", definition: "Low-intensity lights that run automatically during the day" }
        ]
    },
    {
        id: 'circ-025',
        topic: 'circulation',
        difficulty: 2,
        questionFr: "En agglomération, dans quels cas pouvez-vous utiliser l'avertisseur sonore (klaxon) ?",
        questionEn: "In built-up areas, when can you use the horn?",
        options: {
            A: { fr: "Pour saluer un ami", en: "To greet a friend" },
            B: { fr: "Pour signaler un danger immédiat", en: "To warn of immediate danger" },
            C: { fr: "Pour faire avancer un véhicule lent", en: "To make a slow vehicle move" },
            D: { fr: "En cas de dépassement hors agglomération", en: "When overtaking outside built-up areas" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "En agglomération, l'usage du klaxon est interdit sauf en cas de danger immédiat. Hors agglomération, il peut aussi être utilisé pour prévenir d'un dépassement. Article R416-1 du Code de la route.",
        explanationEn: "In built-up areas, the horn is prohibited except in cases of immediate danger. Outside built-up areas, it may also be used to warn of overtaking. Article R416-1 of the Highway Code.",
        trapNote: "Option D is correct for outside built-up areas, but the question specifically asks about IN built-up areas.",
        distractorNotes: {
            A: "Social honking is prohibited — the horn is a safety device, not a greeting tool.",
            C: "Using the horn to pressure other drivers is an infraction.",
            D: "This is valid outside built-up areas, but the question asks about within agglomeration."
        },
        vocabulary: [
            { wordFr: "avertisseur sonore", wordEn: "horn", definition: "The audible warning device on a vehicle" },
            { wordFr: "danger immédiat", wordEn: "immediate danger", definition: "A sudden, present threat requiring an urgent warning" }
        ]
    },
    {
        id: 'circ-026',
        topic: 'circulation',
        difficulty: 3,
        questionFr: "Sur une route à trois voies en sens unique, quelles affirmations sont vraies ?",
        questionEn: "On a three-lane one-way road, which statements are true?",
        options: {
            A: { fr: "Vous pouvez circuler sur n'importe quelle voie", en: "You can drive in any lane" },
            B: { fr: "La voie de droite est réservée aux véhicules lents", en: "The right lane is reserved for slow vehicles" },
            C: { fr: "Vous devez circuler le plus à droite possible sauf pour dépasser", en: "You must drive as far right as possible except to overtake" },
            D: { fr: "La voie du milieu est interdite aux poids lourds", en: "The middle lane is prohibited for heavy vehicles" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Sur une route à sens unique à trois voies, vous pouvez utiliser n'importe quelle voie. L'obligation de rouler à droite ne s'applique que sur les routes à double sens. Attention : sur autoroute à 3 voies en double sens, la voie de droite reste obligatoire sauf dépassement.",
        explanationEn: "On a three-lane one-way road, you may use any lane freely. The obligation to drive on the right only applies on two-way roads. Note: on a 3-lane motorway with two-way traffic, the right lane rule still applies except for overtaking.",
        trapNote: "Many candidates confuse one-way roads with dual carriageways. On one-way streets, there is no obligation to stay right.",
        distractorNotes: {
            B: "There is no formal reservation of the right lane for slow vehicles on one-way roads.",
            C: "This rule applies on two-way roads and motorways, not one-way streets.",
            D: "There is no such prohibition on one-way three-lane roads."
        },
        vocabulary: [
            { wordFr: "sens unique", wordEn: "one-way", definition: "A road where all traffic flows in one direction only" },
            { wordFr: "voie", wordEn: "lane", definition: "A marked section of road intended for a single line of vehicles" }
        ]
    },
    {
        id: 'circ-027',
        topic: 'circulation',
        difficulty: 2,
        questionFr: "Quels véhicules peuvent circuler sur une voie de bus ?",
        questionEn: "Which vehicles may use a bus lane?",
        options: {
            A: { fr: "Les taxis", en: "Taxis" },
            B: { fr: "Les vélos", en: "Bicycles" },
            C: { fr: "Les véhicules de secours en intervention", en: "Emergency vehicles on call" },
            D: { fr: "Les voitures électriques", en: "Electric cars" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Les voies de bus peuvent être empruntées par les bus, les taxis, les vélos et les véhicules de secours en intervention. Les voitures électriques n'ont pas d'autorisation spéciale sauf signalisation locale. La signalisation sur place précise souvent les véhicules autorisés.",
        explanationEn: "Bus lanes may be used by buses, taxis, bicycles, and emergency vehicles on call. Electric cars have no special authorization unless local signage permits it. On-site signage often specifies which vehicles are allowed.",
        trapNote: "Electric cars are NOT automatically allowed in bus lanes in France — unlike some other countries.",
        distractorNotes: {
            D: "Electric cars have no general right to use bus lanes in France. Some cities may allow it via local signage."
        },
        vocabulary: [
            { wordFr: "voie de bus", wordEn: "bus lane", definition: "A lane reserved primarily for public transport vehicles" },
            { wordFr: "véhicule de secours", wordEn: "emergency vehicle", definition: "Ambulance, fire truck, or police vehicle responding to an emergency" }
        ]
    },
    {
        id: 'circ-028',
        topic: 'circulation',
        difficulty: 1,
        questionFr: "Dans une rue à sens unique, pouvez-vous stationner des deux côtés ?",
        questionEn: "On a one-way street, can you park on both sides?",
        options: {
            A: { fr: "Oui, des deux côtés", en: "Yes, on both sides" },
            B: { fr: "Non, uniquement à droite", en: "No, only on the right" },
            C: { fr: "Non, uniquement à gauche", en: "No, only on the left" },
            D: { fr: "Non, le stationnement est interdit en sens unique", en: "No, parking is forbidden on one-way streets" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Dans une rue à sens unique, le stationnement est autorisé des deux côtés de la chaussée, sauf indication contraire. C'est une différence avec les routes à double sens où le stationnement se fait à droite dans le sens de la marche.",
        explanationEn: "On a one-way street, parking is allowed on both sides of the road, unless otherwise indicated. This differs from two-way roads where parking is on the right in the direction of travel.",
        trapNote: "On two-way roads you must park on the right. On one-way streets, both sides are allowed.",
        distractorNotes: {
            B: "Right-side-only parking applies to two-way roads, not one-way streets.",
            C: "Left-side-only is not a rule on any road type.",
            D: "There is no blanket prohibition on parking in one-way streets."
        },
        vocabulary: [
            { wordFr: "stationnement", wordEn: "parking", definition: "Leaving a vehicle stopped for a period of time" },
            { wordFr: "chaussée", wordEn: "roadway / carriageway", definition: "The part of the road used by vehicles" }
        ]
    },
    {
        id: 'circ-029',
        topic: 'circulation',
        difficulty: 3,
        questionFr: "Quelles sont les règles concernant les ralentisseurs (dos d'âne) ?",
        questionEn: "Which statements about speed bumps (dos d'âne) are correct?",
        options: {
            A: { fr: "Ils sont signalés par un panneau de danger", en: "They are indicated by a danger sign" },
            B: { fr: "Ils ne peuvent être installés que dans les zones limitées à 30 km/h", en: "They can only be installed in zones limited to 30 km/h" },
            C: { fr: "Il est interdit de les franchir à plus de 30 km/h", en: "It is forbidden to cross them at more than 30 km/h" },
            D: { fr: "Ils sont souvent précédés d'un panneau d'avertissement", en: "They are often preceded by a warning sign" }
        },
        correctAnswers: ["A", "D"],
        answerCount: 2,
        explanationFr: "Les ralentisseurs sont signalés par un panneau de danger (A2b) et souvent précédés d'un panneau d'avertissement. Ils peuvent être installés en zone 30 ou en zone 50 km/h. Il n'y a pas de vitesse légale fixe pour les franchir, mais il faut adapter sa vitesse.",
        explanationEn: "Speed bumps are indicated by a danger sign (A2b) and often preceded by a warning sign. They can be installed in 30 or 50 km/h zones. There is no fixed legal speed to cross them, but you must adapt your speed.",
        trapNote: "There is no specific legal speed limit for crossing speed bumps — you must adapt. And they are NOT limited to zone 30 areas.",
        distractorNotes: {
            B: "Speed bumps can be installed in zones up to 50 km/h, not only zone 30.",
            C: "There is no specific legal speed limit at speed bumps — drivers must adapt their speed."
        },
        vocabulary: [
            { wordFr: "ralentisseur", wordEn: "speed bump", definition: "A raised section of road designed to slow traffic" },
            { wordFr: "dos d'âne", wordEn: "speed hump", definition: "A type of raised road surface used as a traffic calming device" }
        ]
    },
    {
        id: 'circ-030',
        topic: 'circulation',
        difficulty: 2,
        questionFr: "Par temps de brouillard avec une visibilité de 40 mètres, à quelle vitesse maximale pouvez-vous rouler sur autoroute ?",
        questionEn: "In fog with visibility of 40 metres, what is the maximum speed on a motorway?",
        options: {
            A: { fr: "50 km/h", en: "50 km/h" },
            B: { fr: "70 km/h", en: "70 km/h" },
            C: { fr: "90 km/h", en: "90 km/h" },
            D: { fr: "110 km/h", en: "110 km/h" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Lorsque la visibilité est inférieure à 50 mètres, la vitesse maximale est de 50 km/h sur TOUTES les routes, y compris l'autoroute. Article R413-4 du Code de la route.",
        explanationEn: "When visibility is below 50 metres, the maximum speed is 50 km/h on ALL roads, including motorways. Article R413-4 of the Highway Code.",
        trapNote: "The 50 km/h rule for visibility <50m applies EVERYWHERE — even on the motorway where the normal limit is 130 km/h.",
        distractorNotes: {
            B: "70 km/h is the rain speed on routes nationales, not the fog-under-50m rule.",
            C: "90 km/h would be far too fast when you can only see 40 metres ahead.",
            D: "110 km/h is the motorway rain speed, not the severe fog speed."
        },
        vocabulary: [
            { wordFr: "brouillard", wordEn: "fog", definition: "Atmospheric condition reducing visibility significantly" },
            { wordFr: "visibilité", wordEn: "visibility", definition: "The furthest distance at which objects can be clearly seen" }
        ]
    },
    {
        id: 'circ-031',
        topic: 'circulation',
        difficulty: 3,
        questionFr: "Quelles affirmations sont correctes concernant la circulation dans une voie de bus à contresens ?",
        questionEn: "Which statements are correct about driving in a contra-flow bus lane?",
        options: {
            A: { fr: "Vous ne devez jamais y circuler en voiture", en: "You must never drive in it with a car" },
            B: { fr: "Les vélos peuvent l'emprunter si signalé", en: "Bicycles may use it if signed" },
            C: { fr: "Les taxis peuvent toujours l'emprunter", en: "Taxis can always use it" },
            D: { fr: "Les véhicules de secours en intervention peuvent l'emprunter", en: "Emergency vehicles on call may use it" }
        },
        correctAnswers: ["A", "B", "D"],
        answerCount: 3,
        explanationFr: "Une voie de bus à contresens est strictement réservée aux bus, vélos (si signalé) et véhicules de secours en intervention. Les voitures particulières et les taxis ne peuvent pas circuler à contresens dans cette voie. Les taxis ne peuvent emprunter les voies de bus que dans le sens normal de circulation.",
        explanationEn: "A contra-flow bus lane is strictly reserved for buses, bicycles (if signed), and emergency vehicles on call. Private cars and taxis cannot drive against traffic in this lane. Taxis may only use bus lanes in the normal direction of traffic.",
        trapNote: "Taxis can use bus lanes going WITH traffic, but NOT contra-flow bus lanes. This is a key distinction.",
        distractorNotes: {
            C: "Taxis can use normal bus lanes but NOT contra-flow bus lanes — they cannot drive against traffic."
        },
        vocabulary: [
            { wordFr: "contresens", wordEn: "contra-flow / against traffic", definition: "Travelling in the opposite direction to the normal flow" },
            { wordFr: "voie réservée", wordEn: "reserved lane", definition: "A lane designated for specific types of vehicles only" }
        ]
    },

    // === CONDUCTEUR 21-31 (The Driver — Advanced) ===
    {
        id: 'cond-021',
        topic: 'conducteur',
        difficulty: 2,
        questionFr: "Sur les boîtes de médicaments, que signifie un pictogramme de niveau 2 (orange) pour la conduite ?",
        questionEn: "On medication boxes, what does a level 2 (orange) pictogram for driving mean?",
        options: {
            A: { fr: "Aucun risque pour la conduite", en: "No risk for driving" },
            B: { fr: "Soyez prudent, ne conduisez pas sans l'avis d'un médecin", en: "Be careful, do not drive without medical advice" },
            C: { fr: "Conduite formellement interdite", en: "Driving strictly prohibited" },
            D: { fr: "Risque faible, conduite possible avec précaution", en: "Low risk, driving possible with caution" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Le pictogramme de niveau 2 (orange) signifie : ne pas conduire sans l'avis d'un professionnel de santé. Niveau 1 (jaune) = soyez prudent. Niveau 3 (rouge) = conduite interdite.",
        explanationEn: "The level 2 (orange) pictogram means: do not drive without medical advice. Level 1 (yellow) = be careful. Level 3 (red) = driving prohibited.",
        trapNote: "Level 2 is not 'be careful' (that's level 1) and not 'forbidden' (that's level 3). Level 2 requires medical approval.",
        distractorNotes: {
            A: "No risk would mean no pictogram at all.",
            C: "Driving strictly prohibited is level 3 (red), not level 2.",
            D: "Low risk with caution describes level 1 (yellow), not level 2."
        },
        vocabulary: [
            { wordFr: "pictogramme", wordEn: "pictogram", definition: "A symbol on medication packaging indicating driving risk level" },
            { wordFr: "professionnel de santé", wordEn: "healthcare professional", definition: "A doctor or pharmacist who can advise on medication effects" }
        ]
    },
    {
        id: 'cond-022',
        topic: 'conducteur',
        difficulty: 1,
        questionFr: "Quel est le pictogramme le plus dangereux sur les médicaments concernant la conduite ?",
        questionEn: "Which medication pictogram is the most dangerous for driving?",
        options: {
            A: { fr: "Niveau 1 — jaune", en: "Level 1 — yellow" },
            B: { fr: "Niveau 2 — orange", en: "Level 2 — orange" },
            C: { fr: "Niveau 3 — rouge", en: "Level 3 — red" },
            D: { fr: "Niveau 4 — noir", en: "Level 4 — black" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "Le niveau 3 (rouge) est le plus dangereux : la conduite est formellement interdite pendant toute la durée du traitement. Il n'existe pas de niveau 4.",
        explanationEn: "Level 3 (red) is the most dangerous: driving is strictly prohibited for the entire duration of treatment. There is no level 4.",
        trapNote: "There are only 3 levels (yellow, orange, red). Level 4 is a distractor — it doesn't exist.",
        distractorNotes: {
            A: "Level 1 (yellow) is the lowest risk — be careful but driving is possible.",
            B: "Level 2 (orange) is medium risk — requires medical advice before driving.",
            D: "Level 4 does not exist. The scale only goes to 3."
        },
        vocabulary: [
            { wordFr: "traitement", wordEn: "treatment", definition: "The course of medication or therapy being taken" }
        ]
    },
    {
        id: 'cond-023',
        topic: 'conducteur',
        difficulty: 3,
        questionFr: "Concernant la consommation de cannabis et la conduite, quelles affirmations sont correctes ?",
        questionEn: "Regarding cannabis use and driving, which statements are correct?",
        options: {
            A: { fr: "Le cannabis est détectable dans le sang pendant au moins 6 heures", en: "Cannabis is detectable in blood for at least 6 hours" },
            B: { fr: "Conduire sous l'emprise du cannabis est un délit", en: "Driving under the influence of cannabis is a criminal offence" },
            C: { fr: "La sanction est la même que pour l'alcool", en: "The penalty is the same as for alcohol" },
            D: { fr: "Le cumul cannabis + alcool double les peines encourues", en: "Combining cannabis + alcohol doubles the penalties" }
        },
        correctAnswers: ["A", "B"],
        answerCount: 2,
        explanationFr: "Le cannabis reste détectable dans le sang pendant au moins 6 heures après consommation. Conduire sous l'emprise de stupéfiants est un délit (pas une simple contravention) : 2 ans de prison et 4 500 € d'amende. Le cumul avec l'alcool aggrave les peines (3 ans et 9 000 €) mais ne les double pas exactement.",
        explanationEn: "Cannabis remains detectable in blood for at least 6 hours after use. Driving under the influence of drugs is a criminal offence (not a simple fine): 2 years imprisonment and 4,500 euro fine. Combining with alcohol increases penalties (3 years and 9,000 euros) but does not exactly double them.",
        trapNote: "The combination penalty is 3 years/9000 euros, which is more than double the fine but not exactly double the prison time. The question tests precise knowledge.",
        distractorNotes: {
            C: "Cannabis penalties (2 years, 4500 euros) are different from alcohol penalties which vary by BAC level.",
            D: "The combined penalty is 3 years/9000 euros — more severe but not an exact doubling."
        },
        vocabulary: [
            { wordFr: "stupéfiants", wordEn: "narcotics / drugs", definition: "Illegal substances that impair driving ability" },
            { wordFr: "délit", wordEn: "criminal offence", definition: "A serious infraction tried in criminal court, not just a traffic fine" }
        ]
    },
    {
        id: 'cond-024',
        topic: 'conducteur',
        difficulty: 2,
        questionFr: "Utiliser son téléphone tenu en main au volant est interdit. Cette règle s'applique-t-elle aussi quand le véhicule est à l'arrêt moteur tournant ?",
        questionEn: "Using a hand-held phone while driving is prohibited. Does this rule also apply when the vehicle is stopped with the engine running?",
        options: {
            A: { fr: "Non, seulement quand le véhicule roule", en: "No, only when the vehicle is moving" },
            B: { fr: "Oui, même à l'arrêt moteur tournant", en: "Yes, even when stopped with engine running" },
            C: { fr: "Non, si vous êtes sur une place de stationnement", en: "No, if you are in a parking space" },
            D: { fr: "Oui, sauf si le frein à main est enclenché", en: "Yes, except if the handbrake is engaged" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "L'interdiction de tenir un téléphone en main s'applique dès que le moteur tourne, même si le véhicule est à l'arrêt (par exemple à un feu rouge ou dans un embouteillage). Pour utiliser son téléphone, il faut couper le moteur et se garer.",
        explanationEn: "The prohibition on holding a phone applies whenever the engine is running, even if the vehicle is stopped (e.g., at a red light or in traffic). To use your phone, you must turn off the engine and park.",
        trapNote: "Many people think 'stopped = OK'. Wrong. Engine running = infraction, even at a red light.",
        distractorNotes: {
            A: "The law applies whenever the engine is running, not only when moving.",
            C: "Being in a parking space doesn't matter if the engine is running.",
            D: "The handbrake status is irrelevant — only the engine state matters."
        },
        vocabulary: [
            { wordFr: "téléphone tenu en main", wordEn: "hand-held phone", definition: "A phone physically held by the driver, as opposed to hands-free" },
            { wordFr: "moteur tournant", wordEn: "engine running", definition: "The vehicle's engine is on, even if the car is not moving" }
        ]
    },
    {
        id: 'cond-025',
        topic: 'conducteur',
        difficulty: 2,
        questionFr: "Le port d'écouteurs ou d'un casque audio est-il autorisé en conduisant ?",
        questionEn: "Is wearing earbuds or headphones permitted while driving?",
        options: {
            A: { fr: "Oui, un seul écouteur est autorisé", en: "Yes, a single earbud is allowed" },
            B: { fr: "Oui, si le volume est bas", en: "Yes, if the volume is low" },
            C: { fr: "Non, tout dispositif sonore porté à l'oreille est interdit", en: "No, any sound device worn in the ear is prohibited" },
            D: { fr: "Oui, pour le GPS uniquement", en: "Yes, for GPS only" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "Depuis le 1er juillet 2015, le port de tout dispositif sonore à l'oreille (écouteurs, casque, oreillettes) est interdit au volant. Même un seul écouteur est interdit. Seuls les appareils auditifs médicaux et les systèmes intégrés au véhicule sont autorisés.",
        explanationEn: "Since July 1, 2015, wearing any sound device in the ear (earbuds, headphones, earpieces) is prohibited while driving. Even a single earbud is forbidden. Only medical hearing aids and vehicle-integrated systems are allowed.",
        trapNote: "Even ONE earbud is forbidden. Many people believe a single earbud is acceptable — it is not.",
        distractorNotes: {
            A: "Even a single earbud is prohibited since 2015.",
            B: "Volume level is irrelevant — the device itself is banned.",
            D: "GPS audio must go through vehicle speakers or a Bluetooth system, not earbuds."
        },
        vocabulary: [
            { wordFr: "écouteurs", wordEn: "earbuds", definition: "Small audio devices inserted into or placed over the ears" },
            { wordFr: "oreillette", wordEn: "earpiece", definition: "A small device worn in one ear for communication" }
        ]
    },
    {
        id: 'cond-026',
        topic: 'conducteur',
        difficulty: 2,
        questionFr: "Quelles personnes peuvent être exemptées du port de la ceinture de sécurité ?",
        questionEn: "Who may be exempt from wearing a seat belt?",
        options: {
            A: { fr: "Les femmes enceintes", en: "Pregnant women" },
            B: { fr: "Les personnes disposant d'un certificat médical d'exemption", en: "People with a medical exemption certificate" },
            C: { fr: "Les chauffeurs de taxi en service en agglomération", en: "Taxi drivers on duty in built-up areas" },
            D: { fr: "Les conducteurs de véhicules de livraison en agglomération", en: "Delivery vehicle drivers in built-up areas" }
        },
        correctAnswers: ["B", "C"],
        answerCount: 2,
        explanationFr: "Sont exemptés du port de la ceinture : les personnes avec un certificat médical, les chauffeurs de taxi en service en agglomération, et les conducteurs de véhicules d'urgence. Les femmes enceintes NE sont PAS exemptées — elles doivent porter la ceinture (adaptée sous le ventre).",
        explanationEn: "Exempt from seat belt: people with a medical certificate, taxi drivers on duty in built-up areas, and emergency vehicle drivers. Pregnant women are NOT exempt — they must wear the belt (positioned below the belly).",
        trapNote: "Pregnant women are NOT exempt from the seat belt — this is a very common misconception.",
        distractorNotes: {
            A: "Pregnant women must wear their seat belt. They should position it under the belly and across the hips.",
            D: "Delivery drivers do not have a general exemption. Only specific professions like taxis have exemptions."
        },
        vocabulary: [
            { wordFr: "ceinture de sécurité", wordEn: "seat belt", definition: "The restraint strap that protects occupants in case of accident" },
            { wordFr: "certificat médical", wordEn: "medical certificate", definition: "An official document from a doctor granting an exemption" }
        ]
    },
    {
        id: 'cond-027',
        topic: 'conducteur',
        difficulty: 3,
        questionFr: "Concernant les sièges enfants, quelles règles sont correctes ?",
        questionEn: "Regarding child seats, which rules are correct?",
        options: {
            A: { fr: "Un enfant de moins de 10 ans doit être à l'arrière dans un siège adapté", en: "A child under 10 must be in the back in a suitable seat" },
            B: { fr: "Un enfant peut être à l'avant si tous les sièges arrière sont occupés", en: "A child may sit in front if all rear seats are occupied" },
            C: { fr: "Un siège dos à la route à l'avant nécessite la désactivation de l'airbag", en: "A rear-facing seat in front requires airbag deactivation" },
            D: { fr: "Les enfants de plus de 1,35 m n'ont plus besoin de rehausseur", en: "Children taller than 1.35m no longer need a booster" }
        },
        correctAnswers: ["A", "B", "C", "D"],
        answerCount: 4,
        explanationFr: "Toutes ces affirmations sont correctes. Les enfants de moins de 10 ans doivent voyager à l'arrière dans un dispositif adapté. Des exceptions existent (arrière complet, pas de banquette arrière). Un siège dos à la route à l'avant impose de désactiver l'airbag passager. Au-delà de 1,35 m, l'enfant peut utiliser la ceinture seule.",
        explanationEn: "All statements are correct. Children under 10 must travel in the back with a suitable device. Exceptions exist (rear full, no rear seats). A rear-facing seat in front requires passenger airbag deactivation. Above 1.35m, the child can use the seat belt alone.",
        trapNote: "All four are correct! Questions where everything is right catch people who always expect wrong answers.",
        distractorNotes: {},
        vocabulary: [
            { wordFr: "siège auto", wordEn: "child car seat", definition: "A seat designed to protect children in vehicles, adapted by weight/height" },
            { wordFr: "rehausseur", wordEn: "booster seat", definition: "A raised seat to position the seat belt correctly on a child" },
            { wordFr: "airbag", wordEn: "airbag", definition: "An inflatable cushion that deploys in a collision to protect occupants" }
        ]
    },
    {
        id: 'cond-028',
        topic: 'conducteur',
        difficulty: 2,
        questionFr: "Quelles restrictions s'appliquent aux conducteurs novices (permis probatoire) ?",
        questionEn: "Which restrictions apply to novice drivers (probationary licence)?",
        options: {
            A: { fr: "Taux d'alcoolémie limité à 0,2 g/l de sang", en: "Blood alcohol limit of 0.2 g/l" },
            B: { fr: "Vitesse limitée à 110 km/h sur autoroute", en: "Speed limited to 110 km/h on motorway" },
            C: { fr: "Obligation d'apposer le signe A à l'arrière", en: "Must display the A sign on the rear" },
            D: { fr: "Interdiction de conduire la nuit", en: "Prohibited from driving at night" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Les conducteurs novices doivent : respecter un taux d'alcool de 0,2 g/l (soit zéro verre en pratique), rouler à 110 km/h max sur autoroute (au lieu de 130), 100 km/h sur voie express (au lieu de 110), 80 km/h hors agglomération. Le signe A est obligatoire. Il n'y a pas d'interdiction de conduire la nuit.",
        explanationEn: "Novice drivers must: respect a 0.2 g/l alcohol limit (effectively zero drinks), drive at max 110 km/h on motorways (instead of 130), 100 km/h on expressways (instead of 110), 80 km/h outside built-up areas. The A sign is mandatory. There is no night driving prohibition.",
        trapNote: "0.2 g/l is effectively zero alcohol — even one drink can exceed this. And there is NO night driving ban for novices in France.",
        distractorNotes: {
            D: "There is no night driving prohibition for novice drivers in France."
        },
        vocabulary: [
            { wordFr: "permis probatoire", wordEn: "probationary licence", definition: "The licence period for new drivers (2-3 years) with restricted points and speed" },
            { wordFr: "signe A", wordEn: "A sign / novice sign", definition: "The letter A displayed on the rear of a novice driver's vehicle" }
        ]
    },
    {
        id: 'cond-029',
        topic: 'conducteur',
        difficulty: 3,
        questionFr: "Comment fonctionne la récupération de points sur le permis de conduire ?",
        questionEn: "How does point recovery work on the driving licence?",
        options: {
            A: { fr: "Récupération de tous les points après 2 ans sans infraction", en: "Full point recovery after 2 years without an offence" },
            B: { fr: "Récupération de tous les points après 3 ans sans infraction", en: "Full point recovery after 3 years without an offence" },
            C: { fr: "Un stage volontaire permet de récupérer 4 points", en: "A voluntary course recovers 4 points" },
            D: { fr: "On peut faire un stage tous les 6 mois", en: "You can take a course every 6 months" }
        },
        correctAnswers: ["B", "C"],
        answerCount: 2,
        explanationFr: "Après 3 ans sans infraction (2 ans pour les contraventions de 1ère à 3ème classe), le solde de points est reconstitué à 12. Un stage de sensibilisation volontaire permet de récupérer 4 points, limité à un stage par an (pas tous les 6 mois). Article L223-6 du Code de la route.",
        explanationEn: "After 3 years without an offence (2 years for class 1-3 infractions), points are restored to 12. A voluntary awareness course recovers 4 points, limited to one course per year (not every 6 months). Article L223-6 of the Highway Code.",
        trapNote: "The 2-year recovery exists but only for minor infractions (class 1-3). For class 4+ and délits, it's 3 years. Courses are once per YEAR, not every 6 months.",
        distractorNotes: {
            A: "2 years only applies to minor infractions (class 1-3). For most infractions, it's 3 years.",
            D: "Courses can only be taken once per year (12 months), not every 6 months."
        },
        vocabulary: [
            { wordFr: "stage de sensibilisation", wordEn: "awareness course", definition: "A 2-day road safety course that can recover licence points" },
            { wordFr: "reconstitution du capital de points", wordEn: "point recovery", definition: "The process of restoring lost points on the driving licence" }
        ]
    },
    {
        id: 'cond-030',
        topic: 'conducteur',
        difficulty: 1,
        questionFr: "Quel est l'acuité visuelle minimale requise pour conduire ?",
        questionEn: "What is the minimum visual acuity required to drive?",
        options: {
            A: { fr: "5/10 avec les deux yeux ouverts", en: "5/10 with both eyes open" },
            B: { fr: "8/10 avec les deux yeux ouverts", en: "8/10 with both eyes open" },
            C: { fr: "10/10 sans correction", en: "10/10 without correction" },
            D: { fr: "3/10 avec correction", en: "3/10 with correction" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "L'acuité visuelle minimale pour conduire est de 5/10 binoculaire (les deux yeux ouverts), avec ou sans correction optique. Si le conducteur porte des lunettes ou lentilles, la mention 01 figure sur le permis.",
        explanationEn: "The minimum visual acuity to drive is 5/10 binocular (both eyes open), with or without optical correction. If the driver wears glasses or contact lenses, code 01 appears on the licence.",
        trapNote: "5/10 is WITH correction (glasses/contacts allowed). You don't need perfect vision, just corrected to 5/10.",
        distractorNotes: {
            B: "8/10 is well above the legal minimum.",
            C: "10/10 without correction is perfect vision — not required.",
            D: "3/10 is below the legal minimum of 5/10."
        },
        vocabulary: [
            { wordFr: "acuité visuelle", wordEn: "visual acuity", definition: "The sharpness of vision, measured on a scale from 1/10 to 10/10" },
            { wordFr: "correction optique", wordEn: "optical correction", definition: "Glasses or contact lenses used to improve vision" }
        ]
    },
    {
        id: 'cond-031',
        topic: 'conducteur',
        difficulty: 3,
        questionFr: "Quelles conditions physiques entraînent une interdiction ou restriction de conduire ?",
        questionEn: "Which physical conditions result in a driving ban or restriction?",
        options: {
            A: { fr: "Épilepsie non stabilisée", en: "Unstabilised epilepsy" },
            B: { fr: "Daltonisme", en: "Colour blindness" },
            C: { fr: "Diabète insulino-dépendant sévère avec malaises", en: "Severe insulin-dependent diabetes with episodes" },
            D: { fr: "Troubles cardiaques avec risque de syncope", en: "Heart conditions with risk of fainting" }
        },
        correctAnswers: ["A", "C", "D"],
        answerCount: 3,
        explanationFr: "L'épilepsie non stabilisée, le diabète sévère avec malaises et les troubles cardiaques avec syncope sont des contre-indications à la conduite. Le daltonisme seul n'entraîne pas d'interdiction — les feux tricolores sont reconnaissables par leur position (haut/bas), pas seulement leur couleur.",
        explanationEn: "Unstabilised epilepsy, severe diabetes with episodes, and heart conditions with fainting are contraindications for driving. Colour blindness alone does not result in a ban — traffic lights are recognisable by position (top/bottom), not just colour.",
        trapNote: "Colour blindness does NOT ban you from driving. Traffic lights are designed to be read by position, not colour alone.",
        distractorNotes: {
            B: "Colour blindness is not a driving ban condition. Traffic signals use position (top=red, bottom=green) as well as colour."
        },
        vocabulary: [
            { wordFr: "contre-indication", wordEn: "contraindication", definition: "A medical condition that makes an activity inadvisable or prohibited" },
            { wordFr: "syncope", wordEn: "fainting / syncope", definition: "A temporary loss of consciousness caused by a drop in blood pressure" }
        ]
    },

    // === ROUTE 21-31 (The Road — Advanced) ===
    {
        id: 'route-021',
        topic: 'route',
        difficulty: 3,
        questionFr: "En cas de panne sur autoroute, dans quel ordre devez-vous effectuer ces actions ?",
        questionEn: "If you break down on a motorway, in what order should you perform these actions?",
        options: {
            A: { fr: "Feux de détresse → gilet → sortir → marcher derrière la glissière → triangle", en: "Hazard lights → vest → exit → walk behind barrier → triangle" },
            B: { fr: "Triangle → gilet → feux de détresse → appeler les secours", en: "Triangle → vest → hazard lights → call for help" },
            C: { fr: "Gilet → feux de détresse → sortir par la gauche → triangle", en: "Vest → hazard lights → exit on the left → triangle" },
            D: { fr: "Feux de détresse → sortir → gilet → triangle → marcher sur la BAU", en: "Hazard lights → exit → vest → triangle → walk on hard shoulder" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "L'ordre correct est : 1) Allumer les feux de détresse, 2) Enfiler le gilet AVANT de sortir du véhicule, 3) Sortir par le côté droit (côté BAU), 4) Se placer derrière la glissière de sécurité, 5) Poser le triangle à 30 mètres minimum. Les passagers doivent aussi sortir et se mettre derrière la glissière.",
        explanationEn: "The correct order is: 1) Turn on hazard lights, 2) Put on vest BEFORE exiting the vehicle, 3) Exit on the right side (hard shoulder side), 4) Stand behind the safety barrier, 5) Place triangle at least 30 metres back. Passengers must also exit and stand behind the barrier.",
        trapNote: "The vest must be put on INSIDE the car BEFORE exiting. Exiting first and then putting on the vest is dangerous and can be fined.",
        distractorNotes: {
            B: "Triangle comes LAST, not first. And hazard lights should be the very first action.",
            C: "Never exit on the left (traffic side). Always exit on the right toward the hard shoulder.",
            D: "The vest must be put on BEFORE exiting, and you must walk BEHIND the barrier, not on the hard shoulder."
        },
        vocabulary: [
            { wordFr: "feux de détresse", wordEn: "hazard lights", definition: "Four flashing indicators used to warn other drivers of a hazard" },
            { wordFr: "gilet de sécurité", wordEn: "safety vest / high-visibility vest", definition: "A fluorescent vest required in every vehicle for use in emergencies" },
            { wordFr: "glissière de sécurité", wordEn: "safety barrier / crash barrier", definition: "Metal barrier separating the road from the verge" },
            { wordFr: "BAU (bande d'arrêt d'urgence)", wordEn: "hard shoulder / emergency stopping lane", definition: "The lane on the far right of a motorway reserved for emergencies" }
        ]
    },
    {
        id: 'route-022',
        topic: 'route',
        difficulty: 1,
        questionFr: "Sur autoroute, à quelle distance les bornes d'appel d'urgence sont-elles espacées ?",
        questionEn: "On a motorway, how far apart are emergency phones?",
        options: {
            A: { fr: "Tous les 500 mètres", en: "Every 500 metres" },
            B: { fr: "Tous les 2 kilomètres", en: "Every 2 kilometres" },
            C: { fr: "Tous les 5 kilomètres", en: "Every 5 kilometres" },
            D: { fr: "Tous les 10 kilomètres", en: "Every 10 kilometres" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Les bornes d'appel d'urgence sont situées tous les 2 km sur les autoroutes françaises. Elles permettent de joindre directement les services de secours et de localiser précisément l'appelant.",
        explanationEn: "Emergency phones are located every 2 km on French motorways. They connect directly to emergency services and precisely locate the caller.",
        trapNote: "2 km is the standard spacing. Using the emergency phone is preferred over a mobile phone because it automatically transmits your exact location.",
        distractorNotes: {
            A: "500 metres is too close — that would mean thousands of phones on a single motorway.",
            C: "5 km is too far apart — the standard is 2 km.",
            D: "10 km would be far too sparse for emergency coverage."
        },
        vocabulary: [
            { wordFr: "borne d'appel d'urgence", wordEn: "emergency phone / SOS phone", definition: "A roadside telephone connected directly to emergency services" }
        ]
    },
    {
        id: 'route-023',
        topic: 'route',
        difficulty: 2,
        questionFr: "Que devez-vous faire en cas d'aquaplaning ?",
        questionEn: "What should you do in case of aquaplaning?",
        options: {
            A: { fr: "Freiner fort pour retrouver l'adhérence", en: "Brake hard to regain grip" },
            B: { fr: "Lever le pied de l'accélérateur sans freiner", en: "Lift your foot off the accelerator without braking" },
            C: { fr: "Tourner le volant rapidement", en: "Turn the steering wheel quickly" },
            D: { fr: "Accélérer pour traverser la flaque", en: "Accelerate to cross the puddle" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "En cas d'aquaplaning, il faut lever le pied de l'accélérateur progressivement, ne surtout pas freiner ni tourner le volant brusquement. Les pneus doivent retrouver le contact avec la route naturellement. Tenir le volant droit et fermement.",
        explanationEn: "In aquaplaning, gradually lift your foot off the accelerator. Do not brake or turn the wheel suddenly. The tyres must regain contact with the road naturally. Hold the steering wheel straight and firmly.",
        trapNote: "Braking is the most instinctive reaction but the WORST thing to do in aquaplaning — it locks the wheels on the water layer.",
        distractorNotes: {
            A: "Braking hard during aquaplaning can cause a complete loss of control.",
            C: "Turning the wheel quickly risks a violent skid when grip suddenly returns.",
            D: "Accelerating increases the water layer under the tyres, making it worse."
        },
        vocabulary: [
            { wordFr: "aquaplaning", wordEn: "aquaplaning / hydroplaning", definition: "Loss of tyre contact with the road due to a layer of water" },
            { wordFr: "adhérence", wordEn: "grip / traction", definition: "The friction between the tyres and the road surface" }
        ]
    },
    {
        id: 'route-024',
        topic: 'route',
        difficulty: 2,
        questionFr: "Quand pouvez-vous utiliser les feux de brouillard arrière ?",
        questionEn: "When can you use the rear fog lights?",
        options: {
            A: { fr: "Dès qu'il pleut", en: "As soon as it rains" },
            B: { fr: "Uniquement lorsque la visibilité est inférieure à 50 mètres", en: "Only when visibility is below 50 metres" },
            C: { fr: "La nuit sur toutes les routes", en: "At night on all roads" },
            D: { fr: "En même temps que les feux de route", en: "At the same time as full beam headlights" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Les feux de brouillard arrière ne doivent être utilisés que lorsque la visibilité est inférieure à 50 mètres (brouillard dense, forte chute de neige). Les utiliser autrement est une infraction passible d'une amende de 35 €, car ils éblouissent les conducteurs qui suivent.",
        explanationEn: "Rear fog lights must only be used when visibility is below 50 metres (dense fog, heavy snowfall). Using them otherwise is an infraction punishable by a 35 euro fine, as they dazzle drivers behind.",
        trapNote: "Rear fog lights are ONLY for visibility <50m. Using them in rain or light fog is an offence — they blind following drivers.",
        distractorNotes: {
            A: "Rain alone does not justify rear fog lights unless visibility drops below 50 metres.",
            C: "Night driving does not justify rear fog lights — they are only for severely reduced visibility.",
            D: "Full beam headlights and rear fog lights serve different purposes and are not used together by rule."
        },
        vocabulary: [
            { wordFr: "feux de brouillard arrière", wordEn: "rear fog lights", definition: "Intense red lights at the rear, used only in very poor visibility" },
            { wordFr: "feux de brouillard avant", wordEn: "front fog lights", definition: "Additional front lights that may be used whenever visibility is reduced" }
        ]
    },
    {
        id: 'route-025',
        topic: 'route',
        difficulty: 3,
        questionFr: "Quelles affirmations sont correctes concernant les feux de brouillard ?",
        questionEn: "Which statements about fog lights are correct?",
        options: {
            A: { fr: "Les feux de brouillard avant peuvent être utilisés dès que la visibilité est réduite", en: "Front fog lights can be used whenever visibility is reduced" },
            B: { fr: "Les feux de brouillard arrière ne s'utilisent que si la visibilité est inférieure à 50 m", en: "Rear fog lights are only used when visibility is below 50m" },
            C: { fr: "L'utilisation abusive des feux de brouillard arrière est passible d'amende", en: "Misuse of rear fog lights is punishable by fine" },
            D: { fr: "Les feux de brouillard avant remplacent les feux de croisement", en: "Front fog lights replace dipped headlights" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Les feux de brouillard avant peuvent être allumés dès que la visibilité est réduite (pluie, brouillard, neige). Les feux arrière sont strictement réservés à une visibilité inférieure à 50 m. L'utilisation abusive des feux arrière est une contravention de 3ème classe (amende de 68 €). Les feux de brouillard avant complètent mais ne remplacent PAS les feux de croisement.",
        explanationEn: "Front fog lights can be switched on whenever visibility is reduced (rain, fog, snow). Rear fog lights are strictly for visibility below 50m. Misuse of rear fog lights is a class 3 offence (68 euro fine). Front fog lights complement but do NOT replace dipped headlights.",
        trapNote: "Front fog lights = flexible use. Rear fog lights = strict <50m only. And front fogs NEVER replace dipped headlights.",
        distractorNotes: {
            D: "Front fog lights are supplementary — they must be used WITH dipped headlights, never alone."
        },
        vocabulary: [
            { wordFr: "contravention de 3ème classe", wordEn: "class 3 offence", definition: "A traffic violation punishable by a fine of 68 euros" },
            { wordFr: "feux de croisement", wordEn: "dipped headlights", definition: "The main headlights used for driving, angled downward to avoid blinding" }
        ]
    },
    {
        id: 'route-026',
        topic: 'route',
        difficulty: 2,
        questionFr: "Sur une route de montagne étroite, qui a la priorité ?",
        questionEn: "On a narrow mountain road, who has priority?",
        options: {
            A: { fr: "Le véhicule qui descend", en: "The vehicle going downhill" },
            B: { fr: "Le véhicule qui monte", en: "The vehicle going uphill" },
            C: { fr: "Le véhicule le plus lourd", en: "The heavier vehicle" },
            D: { fr: "Le premier arrivé au passage étroit", en: "The first to reach the narrow section" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "En montagne, le véhicule qui monte a la priorité car il est plus difficile et dangereux de redémarrer en côte. Le véhicule qui descend doit reculer ou manoeuvrer pour laisser passer. Exception : si un panneau indique le contraire. Article R414-9 du Code de la route.",
        explanationEn: "On mountain roads, the vehicle going uphill has priority because restarting on a slope is more difficult and dangerous. The vehicle going downhill must reverse or manoeuvre. Exception: if a sign indicates otherwise. Article R414-9 of the Highway Code.",
        trapNote: "Uphill ALWAYS has priority on mountain roads (unless signed otherwise) — because stopping and restarting on a slope is dangerous.",
        distractorNotes: {
            A: "The downhill vehicle must yield because it can stop and reverse more easily.",
            C: "Vehicle weight does not determine priority on mountain roads.",
            D: "First arrival does not determine priority — uphill traffic always has priority."
        },
        vocabulary: [
            { wordFr: "route de montagne", wordEn: "mountain road", definition: "A road with steep gradients, often narrow, in mountainous terrain" },
            { wordFr: "croisement difficile", wordEn: "difficult passing point", definition: "A narrow section where two vehicles cannot pass simultaneously" }
        ]
    },
    {
        id: 'route-027',
        topic: 'route',
        difficulty: 2,
        questionFr: "Quel panneau signale un risque de verglas ?",
        questionEn: "Which sign warns of black ice risk?",
        options: {
            A: { fr: "Un triangle avec un flocon de neige", en: "A triangle with a snowflake" },
            B: { fr: "Un triangle avec une voiture dérapant", en: "A triangle with a skidding car" },
            C: { fr: "Un cercle bleu avec des chaînes", en: "A blue circle with chains" },
            D: { fr: "Un rectangle bleu avec un thermomètre", en: "A blue rectangle with a thermometer" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Le panneau de danger A4 (triangle avec flocon de neige/verglas) avertit d'un risque de neige ou de verglas. Le panneau A4 peut être accompagné d'un panonceau indiquant la distance ou la longueur du danger. Le triangle avec voiture dérapant (A4b) signale une chaussée glissante en général.",
        explanationEn: "The danger sign A4 (triangle with snowflake/ice) warns of snow or black ice risk. It may include a supplementary panel showing distance or length. The skidding car triangle (A4b) warns of a slippery road in general.",
        trapNote: "The snowflake triangle specifically means ice/snow. The skidding car means slippery road (which could be from oil, water, etc.).",
        distractorNotes: {
            B: "The skidding car sign (A4b) is for slippery roads in general, not specifically ice.",
            C: "The blue circle with chains is an obligation sign — it means snow chains required.",
            D: "No such standard sign exists in the French road sign system."
        },
        vocabulary: [
            { wordFr: "verglas", wordEn: "black ice", definition: "A thin, transparent layer of ice on the road surface, extremely dangerous" },
            { wordFr: "panneau de danger", wordEn: "danger/warning sign", definition: "A triangular sign with red border warning of a hazard ahead" }
        ]
    },
    {
        id: 'route-028',
        topic: 'route',
        difficulty: 1,
        questionFr: "Quelle est la différence entre une aire de repos et une aire de service sur autoroute ?",
        questionEn: "What is the difference between a rest area and a service area on a motorway?",
        options: {
            A: { fr: "L'aire de repos a du carburant, pas l'aire de service", en: "Rest areas have fuel, service areas don't" },
            B: { fr: "L'aire de service offre carburant, restauration et sanitaires, l'aire de repos seulement des sanitaires", en: "Service areas offer fuel, food, and toilets; rest areas only have toilets" },
            C: { fr: "Elles sont identiques", en: "They are identical" },
            D: { fr: "L'aire de repos est gratuite, l'aire de service est payante", en: "Rest areas are free, service areas are paid" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "L'aire de service offre des services complets : station-service, restauration, boutique, sanitaires. L'aire de repos offre un espace pour s'arrêter avec des sanitaires et parfois des tables de pique-nique, mais pas de carburant ni de restauration.",
        explanationEn: "A service area provides full services: fuel station, restaurants, shops, and toilets. A rest area offers a stopping place with toilets and sometimes picnic tables, but no fuel or food services.",
        trapNote: "Don't confuse the two — if you need fuel, you need a SERVICE area, not just a REST area.",
        distractorNotes: {
            A: "It's the opposite — service areas have fuel, rest areas don't.",
            C: "They are quite different in the services they offer.",
            D: "Both are free to access. Fuel and food at service areas cost money, but access is free."
        },
        vocabulary: [
            { wordFr: "aire de repos", wordEn: "rest area", definition: "A simple stopping area on a motorway with basic facilities" },
            { wordFr: "aire de service", wordEn: "service area", definition: "A full-service area on a motorway with fuel, food, and shops" }
        ]
    },
    {
        id: 'route-029',
        topic: 'route',
        difficulty: 3,
        questionFr: "Quelles sont les caractéristiques d'une voie express par rapport à une autoroute ?",
        questionEn: "What are the characteristics of an expressway compared to a motorway?",
        options: {
            A: { fr: "La vitesse maximale est de 110 km/h au lieu de 130 km/h", en: "Maximum speed is 110 km/h instead of 130 km/h" },
            B: { fr: "Les piétons et vélos y sont autorisés", en: "Pedestrians and bicycles are allowed" },
            C: { fr: "Il peut y avoir des carrefours à niveau", en: "There may be at-grade intersections" },
            D: { fr: "L'accès est gratuit", en: "Access is free" }
        },
        correctAnswers: ["A", "C", "D"],
        answerCount: 3,
        explanationFr: "Une voie express est limitée à 110 km/h, peut avoir des carrefours à niveau (contrairement à l'autoroute qui n'a que des échangeurs), et est généralement gratuite. Les piétons et vélos y sont interdits, comme sur autoroute. Les routes départementales sont limitées à 80 km/h (anciennement 90) en double sens sans séparateur.",
        explanationEn: "An expressway is limited to 110 km/h, may have at-grade intersections (unlike motorways which only have interchanges), and is generally free. Pedestrians and bicycles are prohibited, as on motorways. Departmental roads are limited to 80 km/h (formerly 90) on two-way sections without a divider.",
        trapNote: "Expressways look like motorways but can have intersections and are usually free. Cyclists are still banned.",
        distractorNotes: {
            B: "Pedestrians and bicycles are prohibited on expressways, just like on motorways."
        },
        vocabulary: [
            { wordFr: "voie express", wordEn: "expressway", definition: "A high-speed road limited to 110 km/h, with some at-grade junctions possible" },
            { wordFr: "carrefour à niveau", wordEn: "at-grade intersection", definition: "A junction where roads cross at the same level, unlike a grade-separated interchange" },
            { wordFr: "route départementale", wordEn: "departmental road", definition: "A secondary road managed by the department (county), typically limited to 80 km/h" }
        ]
    },
    {
        id: 'route-030',
        topic: 'route',
        difficulty: 2,
        questionFr: "Dans un tunnel à sens unique, quelles règles devez-vous respecter ?",
        questionEn: "In a one-way tunnel, which rules must you follow?",
        options: {
            A: { fr: "Allumer les feux de croisement", en: "Switch on dipped headlights" },
            B: { fr: "Respecter les distances de sécurité renforcées", en: "Maintain increased safe following distances" },
            C: { fr: "Retirer vos lunettes de soleil", en: "Remove your sunglasses" },
            D: { fr: "Vous pouvez dépasser si deux voies sont disponibles", en: "You can overtake if two lanes are available" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Dans un tunnel, vous devez allumer les feux de croisement (obligatoire), respecter les distances de sécurité renforcées (50 m minimum) et retirer vos lunettes de soleil pour ne pas être gêné par l'obscurité. Le dépassement dans un tunnel est généralement interdit sauf si deux voies de circulation sont clairement marquées ET que la signalisation l'autorise.",
        explanationEn: "In a tunnel, you must switch on dipped headlights (mandatory), maintain increased safe following distances (50m minimum), and remove sunglasses to avoid vision problems in the dark. Overtaking in a tunnel is generally prohibited unless two lanes are clearly marked AND signage permits it.",
        trapNote: "Overtaking in tunnels is generally forbidden even with two lanes — it requires explicit permission via signage.",
        distractorNotes: {
            D: "Overtaking in tunnels is generally prohibited. Two lanes alone are not sufficient — signage must explicitly permit it."
        },
        vocabulary: [
            { wordFr: "tunnel", wordEn: "tunnel", definition: "An enclosed passage under or through a mountain, river, or urban area" },
            { wordFr: "distances de sécurité renforcées", wordEn: "increased safe distances", definition: "Greater following distances required in confined or hazardous areas" }
        ]
    },
    {
        id: 'route-031',
        topic: 'route',
        difficulty: 1,
        questionFr: "Lors d'une panne sur autoroute, quel moyen de communication est préférable ?",
        questionEn: "When broken down on a motorway, which means of communication is preferable?",
        options: {
            A: { fr: "Votre téléphone portable", en: "Your mobile phone" },
            B: { fr: "La borne d'appel d'urgence", en: "The emergency phone" },
            C: { fr: "Faire des signes aux autres automobilistes", en: "Signal to other drivers" },
            D: { fr: "Attendre que la police passe", en: "Wait for the police to pass" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "La borne d'appel d'urgence est préférable car elle localise automatiquement votre position exacte et vous met en contact direct avec le centre d'appels autoroutier. Avec un portable, il faut connaître et communiquer sa position précise (borne kilométrique, sens de circulation).",
        explanationEn: "The emergency phone is preferable because it automatically locates your exact position and connects you directly to the motorway call centre. With a mobile phone, you need to know and communicate your precise location (kilometre marker, direction of travel).",
        trapNote: "While a mobile phone works, the emergency phone is BETTER because it transmits your exact location automatically.",
        distractorNotes: {
            A: "A mobile phone can be used but doesn't transmit your location automatically like the emergency phone.",
            C: "Signalling to other drivers is not a reliable way to get help.",
            D: "Waiting passively is dangerous and could take a very long time."
        },
        vocabulary: [
            { wordFr: "borne kilométrique", wordEn: "kilometre marker", definition: "A post indicating your exact position on the motorway" }
        ]
    },

    // === AUTRES_USAGERS 21-31 (Other Road Users — Advanced) ===
    {
        id: 'autr-021',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "Quelles affirmations sont correctes concernant les tramways ?",
        questionEn: "Which statements about trams are correct?",
        options: {
            A: { fr: "Le tramway a toujours la priorité", en: "The tram always has priority" },
            B: { fr: "Il faut toujours s'arrêter quand un tramway arrive", en: "You must always stop when a tram approaches" },
            C: { fr: "Le tramway ne peut pas s'arrêter rapidement", en: "A tram cannot stop quickly" },
            D: { fr: "Vous pouvez circuler sur les voies du tramway si elles sont au niveau de la route", en: "You can drive on tram tracks if they are at road level" }
        },
        correctAnswers: ["A", "C"],
        answerCount: 2,
        explanationFr: "Le tramway a TOUJOURS la priorité, quelle que soit la signalisation. Il ne peut pas s'arrêter rapidement en raison de sa masse et de ses rails. Vous ne devez pas vous arrêter systématiquement mais lui céder le passage. La circulation sur les voies de tramway dépend de la signalisation locale — elle n'est pas automatiquement autorisée.",
        explanationEn: "The tram ALWAYS has priority, regardless of signage. It cannot stop quickly due to its mass and rails. You don't have to stop every time but must yield. Driving on tram tracks depends on local signage — it is not automatically permitted.",
        trapNote: "Trams always have priority — even at intersections with traffic lights! This overrides all other rules.",
        distractorNotes: {
            B: "You don't always have to stop — you must yield but can proceed if the tram is not in your path.",
            D: "Driving on tram tracks is not automatically allowed even if they are at road level — signage determines this."
        },
        vocabulary: [
            { wordFr: "tramway", wordEn: "tram / streetcar", definition: "A rail-based public transport vehicle running on tracks embedded in the road" },
            { wordFr: "voie de tramway", wordEn: "tram track", definition: "Rails embedded in or alongside the road for tram circulation" }
        ]
    },
    {
        id: 'autr-022',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "Comment devez-vous vous comporter face à un cavalier (personne à cheval) sur la route ?",
        questionEn: "How should you behave when encountering a horse rider on the road?",
        options: {
            A: { fr: "Ralentir et laisser une distance d'au moins 1,5 m en dépassant", en: "Slow down and leave at least 1.5m when passing" },
            B: { fr: "Klaxonner pour avertir le cavalier", en: "Honk to warn the rider" },
            C: { fr: "Passer rapidement pour ne pas effrayer le cheval", en: "Pass quickly to avoid scaring the horse" },
            D: { fr: "Attendre que le cavalier se range sur le bas-côté", en: "Wait for the rider to move to the verge" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Face à un cavalier, il faut ralentir considérablement et respecter un écart latéral d'au moins 1,5 mètre (comme pour les cyclistes hors agglomération). Ne jamais klaxonner car cela peut effrayer le cheval. Passer lentement et en douceur.",
        explanationEn: "When encountering a horse rider, slow down significantly and maintain a lateral gap of at least 1.5 metres (same as for cyclists outside built-up areas). Never honk as this can frighten the horse. Pass slowly and smoothly.",
        trapNote: "NEVER honk near a horse — the noise can cause the horse to bolt. Slow + distance = safe.",
        distractorNotes: {
            B: "Honking can frighten the horse, causing it to bolt and create a dangerous situation.",
            C: "Passing quickly creates wind and noise that can startle the horse.",
            D: "The rider may not be able to move aside. You must adapt your driving."
        },
        vocabulary: [
            { wordFr: "cavalier", wordEn: "horse rider", definition: "A person riding a horse on public roads" },
            { wordFr: "écart latéral", wordEn: "lateral gap / passing distance", definition: "The side distance between your vehicle and another road user when passing" }
        ]
    },
    {
        id: 'autr-023',
        topic: 'autres_usagers',
        difficulty: 1,
        questionFr: "Quelle est la vitesse maximale d'un véhicule agricole sur la route ?",
        questionEn: "What is the maximum speed of an agricultural vehicle on the road?",
        options: {
            A: { fr: "25 km/h", en: "25 km/h" },
            B: { fr: "40 km/h", en: "40 km/h" },
            C: { fr: "60 km/h", en: "60 km/h" },
            D: { fr: "25 km/h ou 40 km/h selon le type", en: "25 km/h or 40 km/h depending on type" }
        },
        correctAnswers: ["D"],
        answerCount: 1,
        explanationFr: "Les véhicules agricoles sont limités à 25 km/h (tracteurs anciens, engins sans homologation routière) ou 40 km/h (tracteurs homologués pour la route). Certains tracteurs récents sont limités à 40 km/h. Un gyrophare orange peut être utilisé comme avertissement.",
        explanationEn: "Agricultural vehicles are limited to 25 km/h (older tractors, non-road-homologated equipment) or 40 km/h (road-homologated tractors). Some newer tractors are limited to 40 km/h. An orange flashing light may be used as a warning.",
        trapNote: "It's not one fixed speed — it depends on whether the vehicle is road-homologated (40) or not (25).",
        distractorNotes: {
            A: "25 km/h is only for non-homologated agricultural vehicles.",
            B: "40 km/h is only for road-homologated agricultural vehicles.",
            C: "60 km/h exceeds the maximum for any agricultural vehicle."
        },
        vocabulary: [
            { wordFr: "véhicule agricole", wordEn: "agricultural vehicle", definition: "A tractor or farm machine used on public roads" },
            { wordFr: "gyrophare", wordEn: "flashing beacon", definition: "A rotating or flashing warning light on a vehicle" }
        ]
    },
    {
        id: 'autr-024',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "En agglomération, un bus quitte son arrêt et met son clignotant gauche. Que devez-vous faire ?",
        questionEn: "In a built-up area, a bus is leaving its stop with its left indicator on. What must you do?",
        options: {
            A: { fr: "Accélérer pour passer avant le bus", en: "Accelerate to pass before the bus" },
            B: { fr: "Lui céder le passage", en: "Yield to the bus" },
            C: { fr: "Klaxonner pour signaler votre présence", en: "Honk to signal your presence" },
            D: { fr: "Continuer sans changer d'allure", en: "Continue without changing speed" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "En agglomération, lorsque la vitesse est limitée à 70 km/h ou moins, les conducteurs doivent faciliter la sortie des bus de leur arrêt en leur cédant le passage. Article R412-12-1 du Code de la route.",
        explanationEn: "In built-up areas where the speed limit is 70 km/h or less, drivers must facilitate buses leaving their stops by yielding to them. Article R412-12-1 of the Highway Code.",
        trapNote: "This rule only applies in agglomeration with speed <= 70 km/h. Outside town or on roads > 70 km/h, the bus has no special priority.",
        distractorNotes: {
            A: "Accelerating to beat the bus is dangerous and illegal — you must yield.",
            C: "Honking is not the correct response — yield and let the bus go.",
            D: "You must actively yield, not just continue at the same speed."
        },
        vocabulary: [
            { wordFr: "arrêt de bus", wordEn: "bus stop", definition: "A designated place where buses stop to pick up and drop off passengers" },
            { wordFr: "céder le passage", wordEn: "give way / yield", definition: "To let another road user go first" }
        ]
    },
    {
        id: 'autr-025',
        topic: 'autres_usagers',
        difficulty: 1,
        questionFr: "Un piéton avec un chien guide est au bord de la route. Que cela signifie-t-il ?",
        questionEn: "A pedestrian with a guide dog is at the roadside. What does this mean?",
        options: {
            A: { fr: "Le piéton est malvoyant ou aveugle", en: "The pedestrian is visually impaired or blind" },
            B: { fr: "Le piéton promène simplement son chien", en: "The pedestrian is just walking their dog" },
            C: { fr: "Le chien est en cours de dressage", en: "The dog is being trained" },
            D: { fr: "Le piéton n'a pas besoin d'aide particulière", en: "The pedestrian doesn't need special assistance" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Un chien guide d'aveugle (souvent un labrador ou golden retriever avec un harnais) indique que son maître est malvoyant ou aveugle. Vous devez être extrêmement prudent, ralentir et vous arrêter si nécessaire pour le laisser traverser.",
        explanationEn: "A guide dog (often a Labrador or Golden Retriever with a harness) indicates its owner is visually impaired or blind. You must be extremely cautious, slow down, and stop if necessary to let them cross.",
        trapNote: "A guide dog with a harness = blind/visually impaired person. Always give them absolute priority.",
        distractorNotes: {
            B: "A guide dog in a harness is not a pet being walked — it's assisting a blind person.",
            C: "Even if in training, the presence of a guide dog indicates a visually impaired person or training scenario requiring extra caution.",
            D: "A person with a guide dog needs extra consideration from all drivers."
        },
        vocabulary: [
            { wordFr: "chien guide d'aveugle", wordEn: "guide dog", definition: "A specially trained dog that assists blind or visually impaired people" },
            { wordFr: "harnais", wordEn: "harness", definition: "The rigid handle worn by a guide dog to guide its owner" }
        ]
    },
    {
        id: 'autr-026',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "Quelles précautions devez-vous prendre à proximité d'une école ?",
        questionEn: "What precautions must you take near a school?",
        options: {
            A: { fr: "Réduire fortement votre vitesse", en: "Significantly reduce your speed" },
            B: { fr: "Être prêt à s'arrêter à tout moment", en: "Be ready to stop at any moment" },
            C: { fr: "Surveiller les trottoirs des deux côtés", en: "Watch the pavements on both sides" },
            D: { fr: "Klaxonner pour avertir les enfants", en: "Honk to warn the children" }
        },
        correctAnswers: ["A", "B", "C"],
        answerCount: 3,
        explanationFr: "Aux abords d'une école, vous devez réduire votre vitesse, être prêt à vous arrêter immédiatement et surveiller les deux côtés de la route. Les enfants sont imprévisibles et peuvent surgir de n'importe où. Ne pas klaxonner car cela peut surprendre les enfants et provoquer une réaction dangereuse.",
        explanationEn: "Near a school, you must reduce speed, be ready to stop immediately, and watch both sides of the road. Children are unpredictable and can appear from anywhere. Do not honk as this can startle children and cause a dangerous reaction.",
        trapNote: "Honking near children is counterproductive — it can cause panic and sudden movements.",
        distractorNotes: {
            D: "Honking can startle children, causing them to run into the road. Slow down silently instead."
        },
        vocabulary: [
            { wordFr: "abords d'une école", wordEn: "near a school", definition: "The area around a school where children may be present" },
            { wordFr: "usager vulnérable", wordEn: "vulnerable road user", definition: "Pedestrians, cyclists, children, elderly, and disabled persons" }
        ]
    },
    {
        id: 'autr-027',
        topic: 'autres_usagers',
        difficulty: 3,
        questionFr: "Les rollers (patineurs en ligne) ont-ils le droit de circuler sur la chaussée ?",
        questionEn: "Are rollerbladers allowed to use the road?",
        options: {
            A: { fr: "Non, jamais", en: "No, never" },
            B: { fr: "Oui, toujours", en: "Yes, always" },
            C: { fr: "Oui, lorsqu'il n'y a pas de trottoir ou que celui-ci est impraticable", en: "Yes, when there is no pavement or it is unusable" },
            D: { fr: "Oui, mais uniquement la nuit avec un gilet réfléchissant", en: "Yes, but only at night with a reflective vest" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "Les patineurs en ligne sont assimilés à des piétons. Ils doivent normalement circuler sur le trottoir. Ils ne peuvent utiliser la chaussée que lorsqu'il n'y a pas de trottoir ou que celui-ci est impraticable. Ils doivent alors circuler sur le bord droit de la chaussée.",
        explanationEn: "Rollerbladers are considered pedestrians. They must normally use the pavement. They may only use the road when there is no pavement or it is unusable. They must then travel on the right edge of the road.",
        trapNote: "Rollerbladers = pedestrians. Road use is only a fallback when no pavement exists.",
        distractorNotes: {
            A: "They can use the road when no pavement is available — it's not a total ban.",
            B: "They cannot always use the road — the pavement is their default.",
            D: "The right to use the road depends on pavement availability, not time of day."
        },
        vocabulary: [
            { wordFr: "patineur en ligne", wordEn: "rollerblader / inline skater", definition: "A person moving on inline roller skates" },
            { wordFr: "trottoir", wordEn: "pavement / sidewalk", definition: "The raised path alongside the road reserved for pedestrians" }
        ]
    },
    {
        id: 'autr-028',
        topic: 'autres_usagers',
        difficulty: 3,
        questionFr: "Quelles règles s'appliquent lors du passage d'un convoi funéraire ?",
        questionEn: "What rules apply when a funeral procession passes?",
        options: {
            A: { fr: "Vous devez vous arrêter et attendre", en: "You must stop and wait" },
            B: { fr: "Vous pouvez dépasser le convoi si la voie est libre", en: "You can overtake the procession if the road is clear" },
            C: { fr: "Vous ne devez pas couper le convoi", en: "You must not cut through the procession" },
            D: { fr: "Vous devez allumer vos feux de croisement", en: "You must switch on your dipped headlights" }
        },
        correctAnswers: ["C"],
        answerCount: 1,
        explanationFr: "La règle principale est de ne jamais couper un convoi funéraire. Vous n'êtes pas obligé de vous arrêter ni d'allumer vos feux de croisement, mais couper le cortège est interdit par respect et par sécurité. Si le convoi est immobilisé, vous pouvez le contourner.",
        explanationEn: "The main rule is to never cut through a funeral procession. You are not required to stop or switch on your headlights, but cutting through the cortege is prohibited out of respect and safety. If the procession is stationary, you may go around it.",
        trapNote: "You don't HAVE to stop — but you must NOT cut through. Many people confuse the two.",
        distractorNotes: {
            A: "Stopping is courteous but not legally required — the key obligation is not cutting through.",
            B: "You may pass alongside but never cut through the procession itself.",
            D: "Dipped headlights are not legally required when encountering a funeral procession."
        },
        vocabulary: [
            { wordFr: "convoi funéraire", wordEn: "funeral procession", definition: "A line of vehicles following a hearse to a funeral" },
            { wordFr: "cortège", wordEn: "cortege / procession", definition: "A formal procession of vehicles or people" }
        ]
    },
    {
        id: 'autr-029',
        topic: 'autres_usagers',
        difficulty: 2,
        questionFr: "Que signifie le panneau 'convoi exceptionnel' sur un véhicule ?",
        questionEn: "What does the 'convoi exceptionnel' (oversized vehicle) sign mean?",
        options: {
            A: { fr: "Le véhicule transporte des matières dangereuses", en: "The vehicle carries dangerous goods" },
            B: { fr: "Le véhicule dépasse les dimensions normales de gabarit", en: "The vehicle exceeds normal size dimensions" },
            C: { fr: "Le véhicule est militaire", en: "The vehicle is military" },
            D: { fr: "Le véhicule est en panne", en: "The vehicle has broken down" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Le panneau 'convoi exceptionnel' indique un transport dont les dimensions (largeur, longueur ou hauteur) ou le poids dépassent les normes. Ces véhicules sont souvent accompagnés de véhicules pilotes et circulent à vitesse réduite. Il est interdit de les dépasser lorsque les véhicules d'accompagnement l'interdisent.",
        explanationEn: "The 'convoi exceptionnel' sign indicates a transport exceeding standard dimensions (width, length, height) or weight. These vehicles are often accompanied by pilot vehicles and travel at reduced speed. Overtaking is prohibited when escort vehicles indicate so.",
        trapNote: "Convoi exceptionnel = oversized load. Don't confuse with dangerous goods (plaques ADR) or military vehicles.",
        distractorNotes: {
            A: "Dangerous goods vehicles display ADR hazard placards (orange rectangles), not 'convoi exceptionnel'.",
            C: "Military vehicles have specific military plates and markings, not this sign.",
            D: "A broken-down vehicle uses hazard lights and a triangle, not a 'convoi exceptionnel' sign."
        },
        vocabulary: [
            { wordFr: "convoi exceptionnel", wordEn: "oversized load / abnormal load", definition: "A transport exceeding standard road vehicle dimensions or weight limits" },
            { wordFr: "véhicule pilote", wordEn: "pilot / escort vehicle", definition: "A car that precedes or follows an oversized transport to warn other drivers" }
        ]
    },
    {
        id: 'autr-030',
        topic: 'autres_usagers',
        difficulty: 1,
        questionFr: "Qui est considéré comme un 'usager vulnérable' de la route ?",
        questionEn: "Who is considered a 'vulnerable road user'?",
        options: {
            A: { fr: "Piétons, cyclistes, enfants", en: "Pedestrians, cyclists, children" },
            B: { fr: "Conducteurs de SUV", en: "SUV drivers" },
            C: { fr: "Personnes âgées et personnes à mobilité réduite", en: "Elderly people and people with reduced mobility" },
            D: { fr: "Motocyclistes et utilisateurs de trottinettes", en: "Motorcyclists and scooter riders" }
        },
        correctAnswers: ["A", "C", "D"],
        answerCount: 3,
        explanationFr: "Les usagers vulnérables comprennent les piétons, les cyclistes, les enfants, les personnes âgées, les personnes à mobilité réduite, les motocyclistes et les utilisateurs de trottinettes. Ce sont les usagers les plus exposés aux risques d'accident grave. Les conducteurs de SUV sont dans un véhicule protecteur et ne sont pas considérés comme vulnérables.",
        explanationEn: "Vulnerable road users include pedestrians, cyclists, children, elderly people, people with reduced mobility, motorcyclists, and scooter riders. They are the most exposed to serious accident risk. SUV drivers are in a protective vehicle and are not considered vulnerable.",
        trapNote: "Motorcyclists ARE vulnerable road users despite riding a motor vehicle — they have no protective shell.",
        distractorNotes: {
            B: "SUV drivers are inside a large, protective vehicle — they are not vulnerable road users."
        },
        vocabulary: [
            { wordFr: "usager vulnérable", wordEn: "vulnerable road user", definition: "A road user with limited physical protection, at higher risk of serious injury" },
            { wordFr: "personne à mobilité réduite", wordEn: "person with reduced mobility", definition: "Someone whose movement is limited by disability, age, or temporary condition" }
        ]
    },
    {
        id: 'autr-031',
        topic: 'autres_usagers',
        difficulty: 3,
        questionFr: "Quelles règles s'appliquent face à un convoi militaire ?",
        questionEn: "What rules apply when encountering a military convoy?",
        options: {
            A: { fr: "Il est interdit de couper le convoi", en: "It is forbidden to cut through the convoy" },
            B: { fr: "Vous pouvez dépasser le convoi librement", en: "You can overtake the convoy freely" },
            C: { fr: "Les véhicules militaires ont la priorité absolue", en: "Military vehicles have absolute priority" },
            D: { fr: "Vous devez rester à distance et ne pas vous insérer entre les véhicules", en: "You must keep your distance and not insert yourself between vehicles" }
        },
        correctAnswers: ["A", "D"],
        answerCount: 2,
        explanationFr: "Face à un convoi militaire, il est interdit de couper le cortège ou de s'insérer entre les véhicules. Les véhicules militaires n'ont pas de priorité absolue (seuls les véhicules prioritaires avec sirène et gyrophare l'ont), mais le convoi doit être respecté comme un ensemble. Le dépassement est possible avec prudence si la voie le permet.",
        explanationEn: "When encountering a military convoy, it is forbidden to cut through or insert yourself between vehicles. Military vehicles do not have absolute priority (only emergency vehicles with sirens and flashing lights do), but the convoy must be respected as a unit. Overtaking is possible with caution if the road allows.",
        trapNote: "Military vehicles do NOT have absolute priority — only vehicles with sirens do. But you still cannot cut through.",
        distractorNotes: {
            B: "You can overtake but not freely — you must do so with caution and without cutting through.",
            C: "Absolute priority is reserved for emergency vehicles using sirens and flashing lights, not military convoys."
        },
        vocabulary: [
            { wordFr: "convoi militaire", wordEn: "military convoy", definition: "A group of military vehicles travelling together in formation" },
            { wordFr: "priorité absolue", wordEn: "absolute priority", definition: "The highest level of right of way, requiring all others to yield immediately" }
        ]
    },

    // === PRIORITE 21-31 (Priority — Advanced) ===
    {
        id: 'prio-021',
        topic: 'priorite',
        difficulty: 2,
        questionFr: "Deux véhicules se font face dans une rue étroite. Un obstacle (voiture stationnée) se trouve de votre côté. Qui doit céder le passage ?",
        questionEn: "Two vehicles face each other on a narrow street. An obstacle (parked car) is on your side. Who must yield?",
        options: {
            A: { fr: "Le véhicule le plus gros", en: "The larger vehicle" },
            B: { fr: "Vous, car l'obstacle est de votre côté", en: "You, because the obstacle is on your side" },
            C: { fr: "L'autre véhicule, car il vient d'en face", en: "The other vehicle, because it is coming from ahead" },
            D: { fr: "Le premier qui arrive au rétrécissement", en: "The first to reach the narrowing" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Lorsqu'un obstacle (véhicule stationné, travaux, etc.) se trouve de votre côté de la chaussée, c'est à vous de céder le passage au véhicule venant en face. Vous devez attendre que la voie soit libre avant de contourner l'obstacle.",
        explanationEn: "When an obstacle (parked vehicle, roadworks, etc.) is on your side of the road, you must yield to the vehicle coming from the opposite direction. You must wait until the road is clear before going around the obstacle.",
        trapNote: "Simple rule: obstacle on YOUR side = YOU yield. It doesn't matter who arrived first.",
        distractorNotes: {
            A: "Vehicle size is irrelevant — the rule is based on which side the obstacle is on.",
            C: "The direction of approach doesn't matter — the obstacle location determines priority.",
            D: "First arrival is irrelevant — obstacle position determines who yields."
        },
        vocabulary: [
            { wordFr: "obstacle", wordEn: "obstacle / obstruction", definition: "Anything blocking part of the road (parked car, roadworks, etc.)" },
            { wordFr: "rétrécissement de chaussée", wordEn: "road narrowing", definition: "A section where the road becomes too narrow for two vehicles" }
        ]
    },
    {
        id: 'prio-022',
        topic: 'priorite',
        difficulty: 3,
        questionFr: "Dans un passage étroit en pente avec un panneau de priorité, qui passe en premier ?",
        questionEn: "On a narrow slope with a priority sign, who goes first?",
        options: {
            A: { fr: "Toujours le véhicule qui monte", en: "Always the vehicle going uphill" },
            B: { fr: "Le véhicule indiqué par le panneau de priorité", en: "The vehicle indicated by the priority sign" },
            C: { fr: "Le véhicule le plus léger", en: "The lighter vehicle" },
            D: { fr: "Le premier arrivé au passage", en: "The first to reach the passage" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Lorsqu'un panneau de priorité est présent (flèche rouge = céder / flèche noire = priorité), c'est le panneau qui détermine la priorité, et non la pente. En l'absence de panneau, le véhicule montant a la priorité. Le panneau prime toujours sur la règle de la pente.",
        explanationEn: "When a priority sign is present (red arrow = yield / black arrow = priority), the sign determines priority, not the slope. Without a sign, the uphill vehicle has priority. The sign always overrides the slope rule.",
        trapNote: "The uphill rule is the DEFAULT. But a priority sign overrides it. Read the question carefully — it says 'with a priority sign'.",
        distractorNotes: {
            A: "Uphill priority is the default when there is no sign. A sign overrides this rule.",
            C: "Vehicle weight never determines priority in narrow passages.",
            D: "First arrival does not determine priority — signs do."
        },
        vocabulary: [
            { wordFr: "passage étroit", wordEn: "narrow passage", definition: "A section of road too narrow for two vehicles to pass simultaneously" },
            { wordFr: "panneau de priorité de passage", wordEn: "passage priority sign", definition: "Signs using red and black arrows to indicate who has priority in narrow sections" }
        ]
    },
    {
        id: 'prio-023',
        topic: 'priorite',
        difficulty: 2,
        questionFr: "Que signifie un feu orange clignotant ?",
        questionEn: "What does a flashing amber light mean?",
        options: {
            A: { fr: "Arrêtez-vous obligatoirement", en: "You must stop" },
            B: { fr: "Ralentissez et cédez le passage — priorité à droite s'applique", en: "Slow down and yield — priority to the right applies" },
            C: { fr: "Feu en panne, ignorez-le", en: "Light is broken, ignore it" },
            D: { fr: "Accélérez car le feu va passer au vert", en: "Accelerate because the light is turning green" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Un feu orange clignotant signifie que les feux ne régulent pas la circulation. Vous devez ralentir, faire preuve de prudence et appliquer la priorité à droite (ou toute autre signalisation présente). Ce n'est pas un feu en panne — c'est un mode volontaire souvent utilisé la nuit.",
        explanationEn: "A flashing amber light means the traffic lights are not regulating traffic. You must slow down, exercise caution, and apply priority to the right (or any other signage present). It is not a broken light — it is a deliberate mode often used at night.",
        trapNote: "Flashing amber ≠ broken light. It's intentional. And it means priority-to-the-right rules apply.",
        distractorNotes: {
            A: "Stopping is not mandatory — you must slow down and apply priority rules.",
            C: "The light is not broken — flashing amber is a deliberate operating mode.",
            D: "Flashing amber does not cycle to green — it stays flashing and means apply normal priority rules."
        },
        vocabulary: [
            { wordFr: "feu orange clignotant", wordEn: "flashing amber light", definition: "A traffic signal mode meaning caution, apply standard priority rules" },
            { wordFr: "priorité à droite", wordEn: "priority to the right", definition: "Vehicles coming from your right have right of way at an intersection" }
        ]
    },
    {
        id: 'prio-024',
        topic: 'priorite',
        difficulty: 3,
        questionFr: "Un agent de police se tient face à vous, bras levés verticalement. Que devez-vous faire ?",
        questionEn: "A police officer faces you with arms raised vertically. What must you do?",
        options: {
            A: { fr: "Vous arrêter", en: "Stop" },
            B: { fr: "Passer, la voie est libre", en: "Proceed, the road is clear" },
            C: { fr: "Tourner à droite", en: "Turn right" },
            D: { fr: "Ralentir et être prêt à s'arrêter", en: "Slow down and be ready to stop" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Un agent face à vous avec les bras levés verticalement signifie STOP — tous les usagers qui voient cette face doivent s'arrêter. Bras horizontaux = stop pour ceux face à la poitrine/dos. Bras balancé d'avant en arrière = avancez dans cette direction. Les ordres de l'agent prévalent sur toute signalisation.",
        explanationEn: "An officer facing you with arms raised vertically means STOP — all users seeing this face must stop. Horizontal arms = stop for those facing the chest/back. Arm swinging forward/back = proceed in that direction. Officer signals override all other signage.",
        trapNote: "Arms raised vertically = STOP for ALL directions (it's the 'all stop' signal). This overrides traffic lights.",
        distractorNotes: {
            B: "Arms raised vertically is the universal stop signal — the road is NOT clear.",
            C: "There is no police gesture meaning 'turn right' — you stop when arms are raised.",
            D: "You must stop completely, not just slow down."
        },
        vocabulary: [
            { wordFr: "agent de la circulation", wordEn: "traffic officer", definition: "A police officer or authorized agent directing traffic manually" },
            { wordFr: "bras levés", wordEn: "raised arms", definition: "The officer's arms held vertically above the head, signalling all stop" }
        ]
    },
    {
        id: 'prio-025',
        topic: 'priorite',
        difficulty: 3,
        questionFr: "Un agent de police vous fait face avec les bras tendus horizontalement de chaque côté. Que signifie ce geste ?",
        questionEn: "A police officer faces you with arms extended horizontally to each side. What does this gesture mean?",
        options: {
            A: { fr: "Vous pouvez passer", en: "You may proceed" },
            B: { fr: "Vous devez vous arrêter", en: "You must stop" },
            C: { fr: "Tournez dans la direction indiquée", en: "Turn in the indicated direction" },
            D: { fr: "Ralentissez seulement", en: "Slow down only" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Lorsque l'agent est de face ou de dos avec les bras tendus horizontalement, vous devez vous arrêter. Seuls les usagers voyant le profil de l'agent (ses côtés) peuvent passer. C'est la clé des signaux manuels : face/dos = stop, profil = passage.",
        explanationEn: "When the officer is facing you or has their back to you with arms extended horizontally, you must stop. Only users seeing the officer's profile (sides) may proceed. This is the key to hand signals: face/back = stop, side profile = proceed.",
        trapNote: "Face or back of officer = STOP. Side profile = GO. This is the fundamental rule of police hand signals.",
        distractorNotes: {
            A: "Facing the officer with horizontal arms = stop. Only those on the officer's sides may proceed.",
            C: "Horizontal arms do not indicate a turn direction — they create a stop/go barrier.",
            D: "You must come to a complete stop, not just slow down."
        },
        vocabulary: [
            { wordFr: "bras tendus horizontalement", wordEn: "arms extended horizontally", definition: "Arms held straight out to the sides, forming a barrier" },
            { wordFr: "profil", wordEn: "profile / side view", definition: "Seeing the officer from the side, indicating you may proceed" }
        ]
    },
    {
        id: 'prio-026',
        topic: 'priorite',
        difficulty: 2,
        questionFr: "Quelles affirmations sont correctes concernant les véhicules prioritaires ?",
        questionEn: "Which statements about priority vehicles are correct?",
        options: {
            A: { fr: "Pompiers et ambulances ont la même obligation de céder le passage", en: "Fire trucks and ambulances have the same yield obligation" },
            B: { fr: "Vous devez vous ranger à droite et vous arrêter si nécessaire", en: "You must pull over to the right and stop if necessary" },
            C: { fr: "Ils n'ont la priorité que lorsque sirène et gyrophare sont activés", en: "They only have priority when siren and flashing light are on" },
            D: { fr: "Vous pouvez ignorer un véhicule prioritaire si le feu est vert pour vous", en: "You can ignore a priority vehicle if the light is green for you" }
        },
        correctAnswers: ["B", "C"],
        answerCount: 2,
        explanationFr: "Vous devez vous ranger à droite et vous arrêter pour laisser passer un véhicule prioritaire. Ils n'ont la priorité que lorsque sirène ET gyrophare sont en fonction. Même si votre feu est vert, vous devez leur céder le passage. Les pompiers et ambulances sont tous deux des véhicules prioritaires avec les mêmes droits de passage.",
        explanationEn: "You must pull over to the right and stop to let a priority vehicle pass. They only have priority when BOTH siren AND flashing light are active. Even if your light is green, you must yield. Fire trucks and ambulances are both priority vehicles with the same right of way.",
        trapNote: "A green light does NOT override a priority vehicle. And both siren AND light must be active for priority status.",
        distractorNotes: {
            A: "The obligation is on YOU to yield to THEM — they don't yield, they have priority.",
            D: "A green light never overrides a priority vehicle with siren and flashing lights."
        },
        vocabulary: [
            { wordFr: "véhicule prioritaire", wordEn: "priority vehicle", definition: "A vehicle authorized to use sirens and lights (police, fire, ambulance)" },
            { wordFr: "gyrophare", wordEn: "flashing light / rotating beacon", definition: "A blue flashing light on priority vehicles" },
            { wordFr: "se ranger", wordEn: "to pull over", definition: "To move to the side of the road to make way" }
        ]
    },
    {
        id: 'prio-027',
        topic: 'priorite',
        difficulty: 3,
        questionFr: "Lorsque vous vous insérez sur une autoroute depuis une voie d'accélération, qui a la priorité ?",
        questionEn: "When merging onto a motorway from an acceleration lane, who has priority?",
        options: {
            A: { fr: "Vous, car vous êtes sur la voie d'accélération", en: "You, because you are on the acceleration lane" },
            B: { fr: "Les véhicules déjà sur l'autoroute", en: "Vehicles already on the motorway" },
            C: { fr: "Le véhicule le plus rapide", en: "The fastest vehicle" },
            D: { fr: "La priorité est partagée à parts égales", en: "Priority is shared equally" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Sur autoroute, les véhicules déjà engagés ont TOUJOURS la priorité. Le véhicule qui s'insère depuis la voie d'accélération n'a AUCUNE priorité et doit s'adapter à la vitesse et aux créneaux disponibles. Article R412-10 du Code de la route. Ne jamais forcer l'insertion.",
        explanationEn: "On a motorway, vehicles already on the road ALWAYS have priority. The vehicle merging from the acceleration lane has NO priority and must adapt to the speed and gaps available. Article R412-10 of the Highway Code. Never force a merge.",
        trapNote: "The acceleration lane gives you NO priority. You must yield to motorway traffic and find a gap. This catches many candidates.",
        distractorNotes: {
            A: "The acceleration lane gives you NO priority — you must yield to motorway traffic.",
            C: "Speed does not determine priority at motorway merges.",
            D: "Priority is not shared — motorway traffic always has right of way."
        },
        vocabulary: [
            { wordFr: "voie d'accélération", wordEn: "acceleration lane / slip road", definition: "The lane where you increase speed before merging onto the motorway" },
            { wordFr: "insertion", wordEn: "merging", definition: "The act of joining the flow of motorway traffic from a slip road" }
        ]
    },
    {
        id: 'prio-028',
        topic: 'priorite',
        difficulty: 2,
        questionFr: "En sortant de l'autoroute par une bretelle de sortie, qui a la priorité ?",
        questionEn: "When exiting a motorway via an exit ramp, who has priority?",
        options: {
            A: { fr: "Vous, car vous quittez l'autoroute", en: "You, because you are leaving the motorway" },
            B: { fr: "Les véhicules sur la route que vous rejoignez", en: "Vehicles on the road you are joining" },
            C: { fr: "Personne, c'est un cédez le passage", en: "Nobody, it's a give way" },
            D: { fr: "Cela dépend de la signalisation en bas de la bretelle", en: "It depends on the signage at the bottom of the ramp" }
        },
        correctAnswers: ["D"],
        answerCount: 1,
        explanationFr: "En bas de la bretelle de sortie, la priorité dépend de la signalisation : un STOP impose un arrêt, un CÉDEZ LE PASSAGE impose de laisser passer, un rond-point applique la priorité aux véhicules engagés. Il n'y a pas de règle unique — regardez toujours les panneaux.",
        explanationEn: "At the bottom of the exit ramp, priority depends on the signage: a STOP sign requires a complete stop, a GIVE WAY sign requires yielding, a roundabout gives priority to vehicles already on it. There is no single rule — always check the signs.",
        trapNote: "There is no automatic rule — you MUST read the signage at the end of each exit ramp. Each one can be different.",
        distractorNotes: {
            A: "Leaving the motorway gives you no special priority on the road you are joining.",
            B: "They often have priority, but it depends on the specific signage.",
            C: "It's not always a give way — it could be a stop sign or roundabout."
        },
        vocabulary: [
            { wordFr: "bretelle de sortie", wordEn: "exit ramp / off-ramp", definition: "The lane leading from the motorway to a secondary road" },
            { wordFr: "voie de décélération", wordEn: "deceleration lane", definition: "The lane where you reduce speed after leaving the motorway" }
        ]
    },
    {
        id: 'prio-029',
        topic: 'priorite',
        difficulty: 2,
        questionFr: "Que signifie une flèche verte de filtre (flèche directionnelle) sur un feu tricolore ?",
        questionEn: "What does a green filter arrow on a traffic light mean?",
        options: {
            A: { fr: "Vous pouvez aller dans la direction de la flèche, même si le feu principal est rouge", en: "You can go in the direction of the arrow, even if the main light is red" },
            B: { fr: "Vous devez obligatoirement aller dans cette direction", en: "You must go in that direction" },
            C: { fr: "La voie dans cette direction est fermée", en: "The lane in that direction is closed" },
            D: { fr: "C'est un feu pour les piétons uniquement", en: "It's a light for pedestrians only" }
        },
        correctAnswers: ["A"],
        answerCount: 1,
        explanationFr: "Une flèche verte de filtre permet d'aller dans la direction indiquée même si le feu principal est rouge. Vous devez néanmoins céder le passage aux piétons et aux véhicules bénéficiant du feu vert. Ce n'est pas une obligation de tourner — vous pouvez aussi attendre le vert principal.",
        explanationEn: "A green filter arrow allows you to go in the indicated direction even if the main light is red. You must still yield to pedestrians and vehicles with a green light. It is not mandatory to turn — you can also wait for the main green.",
        trapNote: "The filter arrow ALLOWS movement but does not FORCE it. You can still wait for the main green. And you must still yield to pedestrians.",
        distractorNotes: {
            B: "The filter arrow permits but does not require you to go in that direction.",
            C: "A green arrow means open, not closed.",
            D: "Green filter arrows are for vehicles, not pedestrians."
        },
        vocabulary: [
            { wordFr: "flèche de filtre", wordEn: "filter arrow / green arrow", definition: "A directional arrow on a traffic light allowing movement in one direction" },
            { wordFr: "feu tricolore", wordEn: "traffic light", definition: "A signal using red, amber, and green to control traffic" }
        ]
    },
    {
        id: 'prio-030',
        topic: 'priorite',
        difficulty: 1,
        questionFr: "À un feu tricolore temporaire de chantier, que devez-vous faire quand le feu est rouge ?",
        questionEn: "At a temporary traffic light at roadworks, what must you do when the light is red?",
        options: {
            A: { fr: "Passer si personne ne vient en face", en: "Proceed if nobody is coming from the other direction" },
            B: { fr: "Vous arrêter et attendre le feu vert", en: "Stop and wait for the green light" },
            C: { fr: "Passer lentement en regardant", en: "Pass slowly while looking" },
            D: { fr: "Klaxonner et passer", en: "Honk and proceed" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Les feux tricolores temporaires de chantier ont la même valeur légale que les feux permanents. Le rouge signifie arrêt obligatoire. Griller un feu de chantier est une infraction identique à griller un feu classique : perte de 4 points et 135 € d'amende.",
        explanationEn: "Temporary roadwork traffic lights have the same legal value as permanent ones. Red means mandatory stop. Running a roadwork light is the same offence as running a regular light: 4 points lost and 135 euro fine.",
        trapNote: "Temporary lights = same legal force as permanent ones. Running a red at roadworks is a 4-point, 135 euro offence.",
        distractorNotes: {
            A: "Temporary red lights are legally binding — you must stop regardless of opposing traffic.",
            C: "Passing slowly through a red light is still running a red light.",
            D: "Honking does not give you any right to pass a red light."
        },
        vocabulary: [
            { wordFr: "feu de chantier", wordEn: "roadworks traffic light", definition: "A temporary traffic light installed at a construction zone to alternate traffic" },
            { wordFr: "alternat", wordEn: "alternating traffic", definition: "A system where traffic takes turns passing through a single lane" }
        ]
    },
    {
        id: 'prio-031',
        topic: 'priorite',
        difficulty: 2,
        questionFr: "Un convoi funéraire traverse un carrefour. Que devez-vous faire ?",
        questionEn: "A funeral procession is crossing an intersection. What must you do?",
        options: {
            A: { fr: "Couper le convoi si votre feu est vert", en: "Cut through the procession if your light is green" },
            B: { fr: "Ne pas couper le convoi et attendre qu'il soit passé", en: "Do not cut through and wait for it to pass" },
            C: { fr: "Klaxonner pour signaler votre présence", en: "Honk to signal your presence" },
            D: { fr: "Appeler la police car le convoi bloque la circulation", en: "Call the police because the procession is blocking traffic" }
        },
        correctAnswers: ["B"],
        answerCount: 1,
        explanationFr: "Il est interdit de couper un convoi funéraire, même si votre feu est vert. Vous devez attendre patiemment que l'ensemble du cortège soit passé. Le convoi funéraire bénéficie d'une tolérance de circulation qui prévaut sur les feux tricolores pour maintenir l'unité du cortège.",
        explanationEn: "It is forbidden to cut through a funeral procession, even if your light is green. You must wait patiently for the entire cortege to pass. The funeral procession benefits from a traffic tolerance that prevails over traffic lights to maintain the unity of the cortege.",
        trapNote: "Even a GREEN light does not give you the right to cut through a funeral procession. The cortege stays together.",
        distractorNotes: {
            A: "Even with a green light, cutting through a funeral procession is forbidden.",
            C: "Honking at a funeral procession is disrespectful and not a valid action.",
            D: "Funeral processions are legally permitted to proceed as a unit — they are not blocking traffic illegally."
        },
        vocabulary: [
            { wordFr: "convoi funéraire", wordEn: "funeral procession", definition: "A line of vehicles following a hearse as part of a funeral" },
            { wordFr: "cortège", wordEn: "cortege", definition: "A formal procession, especially for a funeral" }
        ]
    },

    // === CROISEMENT_DEPASSEMENT 12-20 ===
    {
        id: 'croi-012', topic: 'croisement_depassement', difficulty: 2, signs: [],
        questionFr: "Par quelle côté doit-on normalement dépasser un véhicule ?",
        questionEn: "On which side must you normally overtake a vehicle?",
        options: {
            A: { fr: "Par la droite", en: "On the right" },
            B: { fr: "Par la gauche", en: "On the left" },
            C: { fr: "N'importe quel côté", en: "Either side" },
            D: { fr: "Par le côté le plus large", en: "On the wider side" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "En France, le dépassement se fait par la gauche. Exceptions : véhicule tournant à gauche, tramway, embouteillage sur autoroute.",
        explanationEn: "In France, overtaking is done on the left. Exceptions: vehicle turning left, trams, motorway congestion.",
        trapNote: "Always on the LEFT in France. Right-side overtaking is only in specific exceptions.",
        distractorNotes: {
            A: "Right-side overtaking is only allowed in specific exceptions (left-turning vehicle, tram).",
            C: "You cannot choose freely — left is the default, with limited exceptions.",
            D: "Road width doesn't determine the overtaking side."
        },
        vocabulary: [
            { wordFr: "dépassement", wordEn: "overtaking", definition: "Passing another vehicle that is travelling in the same direction" }
        ]
    },
    {
        id: 'croi-013', topic: 'croisement_depassement', difficulty: 3, signs: [],
        questionFr: "Pouvez-vous dépasser dans un virage sans visibilité ?",
        questionEn: "Can you overtake on a blind bend?",
        options: {
            A: { fr: "Oui, si vous roulez vite", en: "Yes, if you are driving fast" },
            B: { fr: "Oui, si la route est large", en: "Yes, if the road is wide" },
            C: { fr: "Non, c'est interdit", en: "No, it is prohibited" },
            D: { fr: "Oui, en klaxonnant", en: "Yes, by honking" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Le dépassement est interdit lorsque la visibilité est insuffisante, notamment dans les virages, au sommet des côtes et la nuit sans éclairage.",
        explanationEn: "Overtaking is prohibited when visibility is insufficient, including on bends, hill crests, and at night without lighting.",
        trapNote: "No visibility = no overtaking. This is one of the most dangerous manoeuvres.",
        distractorNotes: {
            A: "Speed makes blind-bend overtaking MORE dangerous, not less.",
            B: "Road width doesn't matter if you can't see oncoming traffic.",
            D: "Honking doesn't give you the right to overtake on a blind bend."
        },
        vocabulary: [
            { wordFr: "virage sans visibilité", wordEn: "blind bend", definition: "A curve where you cannot see oncoming traffic" }
        ]
    },
    {
        id: 'croi-014', topic: 'croisement_depassement', difficulty: 2, signs: [],
        questionFr: "Quelle distance latérale minimale devez-vous respecter en dépassant un cycliste en agglomération ?",
        questionEn: "What minimum lateral distance must you maintain when overtaking a cyclist in town?",
        options: {
            A: { fr: "0,5 mètre", en: "0.5 metres" },
            B: { fr: "1 mètre", en: "1 metre" },
            C: { fr: "1,5 mètre", en: "1.5 metres" },
            D: { fr: "2 mètres", en: "2 metres" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "En agglomération, la distance latérale minimale pour dépasser un cycliste est de 1 mètre (1,50 m hors agglomération).",
        explanationEn: "In built-up areas, the minimum lateral distance for overtaking a cyclist is 1 metre (1.50 m outside built-up areas).",
        trapNote: "1 metre in town, 1.5 metres outside. Remember the difference!",
        distractorNotes: {
            A: "0.5 metres is far too close and dangerous.",
            C: "1.5 metres is the rule OUTSIDE built-up areas, not in town.",
            D: "2 metres is not legally required, though more space is always better."
        },
        vocabulary: [
            { wordFr: "distance latérale", wordEn: "lateral distance", definition: "The side-to-side gap between vehicles" }
        ]
    },
    {
        id: 'croi-015', topic: 'croisement_depassement', difficulty: 3, signs: [],
        questionFr: "Pouvez-vous franchir une ligne continue pour dépasser un cycliste ?",
        questionEn: "Can you cross a continuous line to overtake a cyclist?",
        options: {
            A: { fr: "Oui, si le cycliste roule lentement", en: "Yes, if the cyclist is riding slowly" },
            B: { fr: "Oui, à condition de respecter la distance de sécurité et de ne pas gêner la circulation en face", en: "Yes, provided you respect the safety distance and don't obstruct oncoming traffic" },
            C: { fr: "Non, jamais", en: "No, never" },
            D: { fr: "Seulement en agglomération", en: "Only in built-up areas" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Depuis 2015, il est permis de franchir une ligne continue pour dépasser un cycliste, à condition de le faire en sécurité.",
        explanationEn: "Since 2015, you may cross a continuous line to overtake a cyclist, provided it is safe to do so.",
        trapNote: "This is an exception to the continuous line rule — but only for cyclists!",
        distractorNotes: {
            A: "The cyclist's speed doesn't matter — the rule allows it but you must check safety.",
            C: "Since 2015, crossing a continuous line for cyclists IS allowed with conditions.",
            D: "The exception applies on all roads, not just in built-up areas."
        },
        vocabulary: [
            { wordFr: "franchir", wordEn: "to cross", definition: "To go over or beyond a line or boundary" }
        ]
    },
    {
        id: 'croi-016', topic: 'croisement_depassement', difficulty: 2, signs: [],
        questionFr: "Avant de dépasser, que devez-vous vérifier ?",
        questionEn: "Before overtaking, what must you check?",
        options: {
            A: { fr: "Seulement le rétroviseur intérieur", en: "Only the interior mirror" },
            B: { fr: "Les rétroviseurs et l'angle mort", en: "Mirrors and blind spot" },
            C: { fr: "Seulement l'angle mort", en: "Only the blind spot" },
            D: { fr: "Rien si la voie est large", en: "Nothing if the road is wide" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Avant de dépasser : vérifiez rétroviseur intérieur, rétroviseur extérieur gauche, et angle mort par un regard par-dessus l'épaule.",
        explanationEn: "Before overtaking: check interior mirror, left exterior mirror, and blind spot with a shoulder check.",
        trapNote: "The 3-check sequence: interior mirror → exterior mirror → blind spot. All three are essential.",
        distractorNotes: {
            A: "The interior mirror alone misses vehicles in the blind spot.",
            C: "You need mirrors AND blind spot check — both are essential.",
            D: "You must always check mirrors and blind spots, regardless of road width."
        },
        vocabulary: [
            { wordFr: "angle mort", wordEn: "blind spot", definition: "The area not visible in your mirrors" },
            { wordFr: "rétroviseur", wordEn: "mirror", definition: "A mirror used to see behind the vehicle" }
        ]
    },
    {
        id: 'croi-017', topic: 'croisement_depassement', difficulty: 2, signs: [],
        questionFr: "Le véhicule que vous voulez dépasser met son clignotant gauche. Que faites-vous ?",
        questionEn: "The vehicle you want to overtake indicates left. What do you do?",
        options: {
            A: { fr: "Le dépasser quand même par la gauche", en: "Overtake on the left anyway" },
            B: { fr: "Renoncer au dépassement", en: "Abandon the overtaking" },
            C: { fr: "Le dépasser par la droite", en: "Overtake on the right" },
            D: { fr: "Klaxonner pour qu'il annule", en: "Honk to make them cancel" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Si le véhicule devant vous met son clignotant gauche, renoncez au dépassement car il va tourner ou dépasser lui-même.",
        explanationEn: "If the vehicle ahead indicates left, abandon the overtaking as it is turning or overtaking itself.",
        trapNote: "Never overtake a vehicle that is signaling left — it's about to move into your path.",
        distractorNotes: {
            A: "Overtaking on the left when the vehicle is also moving left is extremely dangerous.",
            C: "Right-side overtaking is generally prohibited unless the vehicle is turning left AND you have space.",
            D: "Honking doesn't give you priority to overtake."
        },
        vocabulary: [
            { wordFr: "clignotant", wordEn: "indicator/turn signal", definition: "The flashing light showing intended direction change" }
        ]
    },
    {
        id: 'croi-018', topic: 'croisement_depassement', difficulty: 3, signs: ['pedestrian_crossing'],
        questionFr: "Pouvez-vous dépasser un véhicule juste avant un passage piétons ?",
        questionEn: "Can you overtake a vehicle just before a pedestrian crossing?",
        options: {
            A: { fr: "Oui, si aucun piéton n'est visible", en: "Yes, if no pedestrian is visible" },
            B: { fr: "Non, c'est interdit", en: "No, it is prohibited" },
            C: { fr: "Oui, en roulant lentement", en: "Yes, if driving slowly" },
            D: { fr: "Seulement en agglomération", en: "Only in built-up areas" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Le dépassement est interdit à l'approche d'un passage piétons car un piéton pourrait être masqué par le véhicule que vous dépassez.",
        explanationEn: "Overtaking is prohibited near a pedestrian crossing because a pedestrian could be hidden behind the vehicle you are passing.",
        trapNote: "A pedestrian could step out from behind the vehicle you're passing — deadly scenario.",
        distractorNotes: {
            A: "A pedestrian could be hidden behind the vehicle you're overtaking.",
            C: "Speed doesn't matter — the prohibition is absolute near crossings.",
            D: "The rule applies on ALL roads, not just in built-up areas."
        },
        vocabulary: [
            { wordFr: "masqué", wordEn: "hidden/obscured", definition: "Blocked from view by another object" }
        ]
    },
    {
        id: 'croi-019', topic: 'croisement_depassement', difficulty: 2, signs: [],
        questionFr: "Après avoir dépassé un véhicule, quand pouvez-vous vous rabattre ?",
        questionEn: "After overtaking a vehicle, when can you move back into lane?",
        options: {
            A: { fr: "Immédiatement après l'avoir dépassé", en: "Immediately after passing it" },
            B: { fr: "Quand vous voyez le véhicule dépassé dans votre rétroviseur intérieur", en: "When you see the overtaken vehicle in your interior mirror" },
            C: { fr: "Après 100 mètres", en: "After 100 metres" },
            D: { fr: "Quand l'autre conducteur vous fait un appel de phares", en: "When the other driver flashes their lights at you" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Vous pouvez vous rabattre lorsque le véhicule dépassé est visible dans votre rétroviseur intérieur, ce qui garantit une distance suffisante.",
        explanationEn: "You can move back when the overtaken vehicle is visible in your interior mirror, which ensures sufficient distance.",
        trapNote: "The mirror test: if you can see them in the interior mirror, you've left enough space.",
        distractorNotes: {
            A: "Cutting in immediately is dangerous — you need sufficient distance.",
            C: "100 metres is not the rule — the mirror test is the correct method.",
            D: "Relying on the other driver is not the correct technique."
        },
        vocabulary: [
            { wordFr: "se rabattre", wordEn: "to move back into lane", definition: "To return to the original lane after overtaking" }
        ]
    },
    {
        id: 'croi-020', topic: 'croisement_depassement', difficulty: 3, signs: [],
        questionFr: "Est-il interdit de dépasser au sommet d'une côte ?",
        questionEn: "Is overtaking prohibited at the top of a hill?",
        options: {
            A: { fr: "Non, si vous avez une bonne voiture", en: "No, if you have a good car" },
            B: { fr: "Non, si la ligne est discontinue", en: "No, if the line is broken" },
            C: { fr: "Oui, c'est toujours interdit", en: "Yes, it is always prohibited" },
            D: { fr: "Oui, sauf sur les routes à 4 voies", en: "Yes, except on 4-lane roads" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Le dépassement est interdit au sommet d'une côte car la visibilité est insuffisante pour voir les véhicules arrivant en face.",
        explanationEn: "Overtaking is prohibited at the top of a hill because visibility is insufficient to see oncoming vehicles.",
        trapNote: "Even with a broken line, hill crests are no-overtaking zones due to visibility.",
        distractorNotes: {
            A: "Vehicle quality has nothing to do with overtaking rules.",
            B: "Even with a broken line, hill crests are too dangerous for overtaking.",
            D: "Even 4-lane roads can be dangerous at hill crests without divided carriageways."
        },
        vocabulary: [
            { wordFr: "sommet d'une côte", wordEn: "hill crest", definition: "The top of a hill where the road goes over" }
        ]
    },

    // === ARRET_STATIONNEMENT 12-20 ===
    {
        id: 'arret-012', topic: 'arret_stationnement', difficulty: 2, signs: [],
        questionFr: "Quelle est la différence entre l'arrêt et le stationnement ?",
        questionEn: "What is the difference between stopping and parking?",
        options: {
            A: { fr: "L'arrêt est limité à 10 minutes", en: "Stopping is limited to 10 minutes" },
            B: { fr: "L'arrêt suppose que le conducteur reste à proximité du véhicule", en: "Stopping means the driver stays near the vehicle" },
            C: { fr: "Il n'y a aucune différence", en: "There is no difference" },
            D: { fr: "Le stationnement est toujours gratuit", en: "Parking is always free" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "L'arrêt = immobilisation brève, conducteur à proximité. Le stationnement = immobilisation prolongée, conducteur absent.",
        explanationEn: "Stopping = brief halt, driver nearby. Parking = prolonged halt, driver absent.",
        trapNote: "It's about driver presence, not time. If you leave the car, it's parking.",
        distractorNotes: {
            A: "Time is not the legal distinction — it's whether the driver stays nearby.",
            C: "There IS a legal difference, with different rules applying to each.",
            D: "Parking is often subject to fees (meters, blue zones)."
        },
        vocabulary: [
            { wordFr: "arrêt", wordEn: "stopping", definition: "A brief halt with the driver remaining near the vehicle" },
            { wordFr: "stationnement", wordEn: "parking", definition: "Leaving the vehicle unattended for an extended period" }
        ]
    },
    {
        id: 'arret-013', topic: 'arret_stationnement', difficulty: 2, signs: [],
        questionFr: "Que signifie le marquage bleu au sol dans une zone bleue ?",
        questionEn: "What does blue road marking in a blue zone mean?",
        options: {
            A: { fr: "Stationnement interdit", en: "No parking" },
            B: { fr: "Stationnement gratuit limité avec disque", en: "Free time-limited parking with a disc" },
            C: { fr: "Stationnement réservé aux résidents", en: "Residents-only parking" },
            D: { fr: "Zone piétonne", en: "Pedestrian zone" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Les zones bleues permettent le stationnement gratuit mais limité en durée. Vous devez afficher un disque de stationnement indiquant votre heure d'arrivée.",
        explanationEn: "Blue zones allow free but time-limited parking. You must display a parking disc showing your arrival time.",
        trapNote: "Free but TIME-LIMITED. No disc = fine. Overstaying = fine.",
        distractorNotes: {
            A: "Blue zones ALLOW parking — they don't prohibit it.",
            C: "Residents' parking uses different signs and markings.",
            D: "Pedestrian zones are marked differently and prohibit vehicles."
        },
        vocabulary: [
            { wordFr: "zone bleue", wordEn: "blue zone", definition: "A parking area with free time-limited parking" },
            { wordFr: "disque de stationnement", wordEn: "parking disc", definition: "A cardboard disc showing your arrival time" }
        ]
    },
    {
        id: 'arret-014', topic: 'arret_stationnement', difficulty: 3, signs: ['no_parking'],
        questionFr: "Quelle est la distance minimale de stationnement par rapport à une intersection ?",
        questionEn: "What is the minimum parking distance from an intersection?",
        options: {
            A: { fr: "3 mètres", en: "3 metres" },
            B: { fr: "5 mètres", en: "5 metres" },
            C: { fr: "10 mètres", en: "10 metres" },
            D: { fr: "15 mètres", en: "15 metres" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Il est interdit de stationner à moins de 5 mètres d'une intersection pour ne pas gêner la visibilité des autres usagers.",
        explanationEn: "Parking is prohibited within 5 metres of an intersection to maintain visibility for other road users.",
        trapNote: "5 metres from intersections AND from pedestrian crossings. Same rule for both!",
        distractorNotes: {
            A: "3 metres is insufficient — the legal minimum is 5 metres.",
            C: "10 metres is not the standard rule for intersections.",
            D: "15 metres applies to some specific situations (fire hydrants), not intersections."
        },
        vocabulary: [
            { wordFr: "intersection", wordEn: "junction", definition: "Where two or more roads meet" }
        ]
    },
    {
        id: 'arret-015', topic: 'arret_stationnement', difficulty: 1, signs: ['no_stopping'],
        questionFr: "Que signifie un panneau rond bleu barré d'une croix rouge ?",
        questionEn: "What does a round blue sign with a red X mean?",
        options: {
            A: { fr: "Stationnement interdit", en: "No parking" },
            B: { fr: "Arrêt et stationnement interdits", en: "No stopping or parking" },
            C: { fr: "Fin de zone de stationnement", en: "End of parking zone" },
            D: { fr: "Stationnement payant", en: "Paid parking" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Un panneau rond bleu avec une croix rouge en X interdit à la fois l'arrêt et le stationnement. La barre simple interdit seulement le stationnement.",
        explanationEn: "A round blue sign with a red X prohibits both stopping and parking. A single bar only prohibits parking.",
        trapNote: "X = no stopping AND no parking. Single bar = no parking only. Learn the difference!",
        distractorNotes: {
            A: "One diagonal bar = no parking. The X means no stopping either.",
            C: "End of zone uses a different sign.",
            D: "Paid parking has its own signs and meters."
        },
        vocabulary: [
            { wordFr: "arrêt interdit", wordEn: "no stopping", definition: "You cannot stop the vehicle at all in this area" }
        ]
    },
    {
        id: 'arret-016', topic: 'arret_stationnement', difficulty: 2, signs: [],
        questionFr: "Pouvez-vous stationner sur un trottoir ?",
        questionEn: "Can you park on the pavement?",
        options: {
            A: { fr: "Oui, si le véhicule ne gêne pas les piétons", en: "Yes, if the vehicle doesn't obstruct pedestrians" },
            B: { fr: "Oui, seulement les deux-roues", en: "Yes, only two-wheeled vehicles" },
            C: { fr: "Non, sauf autorisation spéciale de la mairie", en: "No, unless specially authorized by the town council" },
            D: { fr: "Oui, pendant 10 minutes maximum", en: "Yes, for a maximum of 10 minutes" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Le stationnement sur le trottoir est interdit sauf si la municipalité l'autorise par une signalisation spécifique.",
        explanationEn: "Parking on the pavement is prohibited unless the municipality specifically authorizes it with signage.",
        trapNote: "Even motorcycles need authorization. Many cities now actively fine pavement parking.",
        distractorNotes: {
            A: "Pavement parking is prohibited regardless of whether it obstructs pedestrians.",
            B: "Even two-wheeled vehicles need specific authorization.",
            D: "Time limits don't apply — pavement parking is prohibited without authorization."
        },
        vocabulary: [
            { wordFr: "trottoir", wordEn: "pavement/sidewalk", definition: "The raised area alongside the road for pedestrians" }
        ]
    },
    {
        id: 'arret-017', topic: 'arret_stationnement', difficulty: 2, signs: [],
        questionFr: "À quelle distance d'une bouche d'incendie est-il interdit de stationner ?",
        questionEn: "How far from a fire hydrant is parking prohibited?",
        options: {
            A: { fr: "1 mètre", en: "1 metre" },
            B: { fr: "3 mètres", en: "3 metres" },
            C: { fr: "5 mètres", en: "5 metres" },
            D: { fr: "Il n'y a pas de règle spécifique", en: "There is no specific rule" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Il est interdit de stationner à moins de 5 mètres d'une bouche d'incendie pour permettre l'accès des pompiers.",
        explanationEn: "Parking is prohibited within 5 metres of a fire hydrant to allow fire service access.",
        trapNote: "5 metres — same as intersections and pedestrian crossings. Easy to remember!",
        distractorNotes: {
            A: "1 metre is far too close — fire trucks need more space.",
            B: "3 metres is insufficient — the rule is 5 metres.",
            D: "There IS a specific rule — 5 metres from fire hydrants."
        },
        vocabulary: [
            { wordFr: "bouche d'incendie", wordEn: "fire hydrant", definition: "A connection point for fire hoses on the street" }
        ]
    },
    {
        id: 'arret-018', topic: 'arret_stationnement', difficulty: 3, signs: [],
        questionFr: "Que risquez-vous en stationnant sur une place réservée aux personnes handicapées sans autorisation ?",
        questionEn: "What is the penalty for parking in a disabled bay without authorization?",
        options: {
            A: { fr: "Un avertissement", en: "A warning" },
            B: { fr: "Une amende de 35 €", en: "A 35 euro fine" },
            C: { fr: "Une amende de 135 € et possibilité de mise en fourrière", en: "A 135 euro fine and possible towing" },
            D: { fr: "Aucune sanction si c'est bref", en: "No penalty if it's brief" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Stationner sur une place handicapée sans carte est passible d'une amende de 135 € (4ème classe) et le véhicule peut être mis en fourrière.",
        explanationEn: "Parking in a disabled bay without a card results in a 135 euro fine (class 4) and the vehicle may be towed.",
        trapNote: "Serious fine + towing risk. Even 'just for a minute' is illegal without a card.",
        distractorNotes: {
            A: "There are no warnings — it's an immediate fine.",
            B: "35 euro is for minor parking offences — disabled bay misuse is 135 euro.",
            D: "Duration doesn't matter — it's illegal without a disability card."
        },
        vocabulary: [
            { wordFr: "place handicapée", wordEn: "disabled parking bay", definition: "A parking space reserved for people with disabilities" },
            { wordFr: "mise en fourrière", wordEn: "towing/impounding", definition: "Removal and storage of an illegally parked vehicle" }
        ]
    },
    {
        id: 'arret-019', topic: 'arret_stationnement', difficulty: 2, signs: [],
        questionFr: "En stationnement le long d'un trottoir, dans quel sens devez-vous vous garer ?",
        questionEn: "When parking alongside a kerb, in which direction must you park?",
        options: {
            A: { fr: "Dans le sens de la circulation", en: "In the direction of traffic flow" },
            B: { fr: "Face au trafic (à contresens)", en: "Facing traffic (against the flow)" },
            C: { fr: "N'importe quel sens", en: "Either direction" },
            D: { fr: "Perpendiculairement au trottoir", en: "Perpendicular to the kerb" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Vous devez vous garer dans le sens de la circulation. Le stationnement à contresens est interdit sauf sur les routes à sens unique.",
        explanationEn: "You must park in the direction of traffic flow. Parking against the flow is prohibited except on one-way streets.",
        trapNote: "Parking against the flow means you crossed lanes to get there — dangerous and illegal.",
        distractorNotes: {
            A: "Parking against traffic flow requires crossing the road, which is dangerous.",
            C: "You cannot choose — you must park in the direction of traffic.",
            D: "Perpendicular parking is only in designated bays with markings."
        },
        vocabulary: [
            { wordFr: "sens de la circulation", wordEn: "direction of traffic flow", definition: "The direction vehicles travel on that side of the road" },
            { wordFr: "contresens", wordEn: "against the flow", definition: "In the opposite direction to traffic" }
        ]
    },
    {
        id: 'arret-020', topic: 'arret_stationnement', difficulty: 1, signs: ['no_parking'],
        questionFr: "Que signifie un panneau rond bleu avec une barre diagonale rouge ?",
        questionEn: "What does a round blue sign with a single red diagonal bar mean?",
        options: {
            A: { fr: "Arrêt interdit", en: "No stopping" },
            B: { fr: "Stationnement interdit", en: "No parking" },
            C: { fr: "Sens interdit", en: "No entry" },
            D: { fr: "Fin de zone", en: "End of zone" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Une barre diagonale rouge sur fond bleu signifie stationnement interdit. L'arrêt bref reste autorisé (monter/descendre, charger/décharger).",
        explanationEn: "A single red diagonal bar on blue background means no parking. Brief stopping is still allowed (boarding, loading).",
        trapNote: "Single bar = no PARKING (but brief stops OK). Cross (X) = no stopping at ALL.",
        distractorNotes: {
            A: "No stopping uses a red X, not a single diagonal bar.",
            C: "No entry is a red circle with a white horizontal bar.",
            D: "End of zone uses a different sign design."
        },
        vocabulary: [
            { wordFr: "stationnement interdit", wordEn: "no parking", definition: "You may stop briefly but not leave the vehicle parked" }
        ]
    },

    // === TUNNELS_PASSAGES_NIVEAU 12-20 ===
    {
        id: 'tunn-012', topic: 'tunnels_passages_niveau', difficulty: 2, signs: [],
        questionFr: "Que devez-vous faire en cas de panne dans un tunnel ?",
        questionEn: "What must you do if your vehicle breaks down in a tunnel?",
        options: {
            A: { fr: "Rester dans le véhicule et attendre les secours", en: "Stay in the vehicle and wait for help" },
            B: { fr: "Allumer les feux de détresse, couper le moteur, rejoindre un abri de sécurité", en: "Turn on hazard lights, switch off engine, reach a safety shelter" },
            C: { fr: "Faire demi-tour", en: "Make a U-turn" },
            D: { fr: "Pousser le véhicule hors du tunnel", en: "Push the vehicle out of the tunnel" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "En cas de panne en tunnel : feux de détresse, moteur coupé, clé sur le contact, rejoindre un abri de sécurité à pied.",
        explanationEn: "If broken down in a tunnel: hazard lights on, engine off, keys in ignition, walk to a safety shelter.",
        trapNote: "Leave the keys in the ignition so emergency services can move the vehicle. Go to a shelter, NOT your car.",
        distractorNotes: {
            A: "Staying in the vehicle is dangerous in a tunnel — fire or smoke risk.",
            C: "U-turns in tunnels are absolutely prohibited.",
            D: "Pushing a vehicle in a tunnel is extremely dangerous due to traffic and fumes."
        },
        vocabulary: [
            { wordFr: "abri de sécurité", wordEn: "safety shelter", definition: "A protected alcove in a tunnel for emergencies" },
            { wordFr: "clé sur le contact", wordEn: "keys in ignition", definition: "Leave keys so emergency services can move the vehicle" }
        ]
    },
    {
        id: 'tunn-013', topic: 'tunnels_passages_niveau', difficulty: 3, signs: [],
        questionFr: "Que devez-vous faire en cas d'incendie dans un tunnel ?",
        questionEn: "What must you do in case of fire in a tunnel?",
        options: {
            A: { fr: "Faire demi-tour et sortir par l'entrée", en: "Turn around and exit through the entrance" },
            B: { fr: "Couper le moteur, se diriger vers la sortie de secours la plus proche à pied", en: "Switch off engine, walk to the nearest emergency exit" },
            C: { fr: "Rester dans le véhicule, fenêtres fermées", en: "Stay in the vehicle with windows closed" },
            D: { fr: "Accélérer pour traverser le feu", en: "Accelerate to drive through the fire" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "En cas d'incendie dans un tunnel : coupez le moteur, laissez les clés, dirigez-vous vers la sortie de secours la plus proche en marchant.",
        explanationEn: "In a tunnel fire: switch off the engine, leave the keys, walk to the nearest emergency exit.",
        trapNote: "NEVER turn around — you could collide with other vehicles. Walk to the nearest exit.",
        distractorNotes: {
            A: "Turning around in a tunnel is prohibited and extremely dangerous during a fire.",
            C: "Smoke is deadly — you must evacuate the vehicle immediately.",
            D: "Driving through fire is suicidal — the vehicle could explode."
        },
        vocabulary: [
            { wordFr: "sortie de secours", wordEn: "emergency exit", definition: "A marked exit route for evacuation" },
            { wordFr: "incendie", wordEn: "fire", definition: "An uncontrolled fire" }
        ]
    },
    {
        id: 'tunn-014', topic: 'tunnels_passages_niveau', difficulty: 2, signs: [],
        questionFr: "Quelle distance de sécurité minimale devez-vous respecter dans un tunnel ?",
        questionEn: "What is the minimum following distance in a tunnel?",
        options: {
            A: { fr: "La même qu'en extérieur", en: "The same as outside" },
            B: { fr: "Au moins 2 lignes de guidage ou 50 mètres", en: "At least 2 guide lines or 50 metres" },
            C: { fr: "10 mètres", en: "10 metres" },
            D: { fr: "1 longueur de voiture", en: "1 car length" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Dans un tunnel, maintenez une distance d'au moins 2 marquages de guidage (environ 50 mètres) avec le véhicule qui précède.",
        explanationEn: "In a tunnel, maintain a distance of at least 2 guide markings (approximately 50 metres) from the vehicle ahead.",
        trapNote: "Tunnels require extra distance because stopping space is limited and visibility reduced.",
        distractorNotes: {
            A: "Tunnels require GREATER distances than open roads.",
            C: "10 metres is far too short for tunnel driving.",
            D: "One car length is completely insufficient at any speed."
        },
        vocabulary: [
            { wordFr: "marquage de guidage", wordEn: "guide marking", definition: "Lines painted on tunnel walls to help gauge distance" }
        ]
    },
    {
        id: 'tunn-015', topic: 'tunnels_passages_niveau', difficulty: 1, signs: [],
        questionFr: "Est-il autorisé de faire demi-tour dans un tunnel ?",
        questionEn: "Is it allowed to make a U-turn in a tunnel?",
        options: {
            A: { fr: "Oui, si la voie est libre", en: "Yes, if the road is clear" },
            B: { fr: "Oui, en cas d'urgence", en: "Yes, in an emergency" },
            C: { fr: "Non, c'est strictement interdit", en: "No, it is strictly prohibited" },
            D: { fr: "Seulement dans les tunnels à 2 voies", en: "Only in 2-lane tunnels" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Le demi-tour est strictement interdit dans un tunnel, même en cas de congestion ou d'incident.",
        explanationEn: "U-turns are strictly prohibited in tunnels, even in case of congestion or incidents.",
        trapNote: "NEVER turn around in a tunnel. Even in emergencies, use the safety exits on foot.",
        distractorNotes: {
            A: "It's prohibited regardless of traffic conditions.",
            B: "Even emergencies don't authorize U-turns — evacuate on foot instead.",
            D: "The number of lanes doesn't change the rule — U-turns are always forbidden."
        },
        vocabulary: [
            { wordFr: "demi-tour", wordEn: "U-turn", definition: "Turning the vehicle around to go in the opposite direction" }
        ]
    },
    {
        id: 'tunn-016', topic: 'tunnels_passages_niveau', difficulty: 2, signs: [],
        questionFr: "Combien de types de passages à niveau existe-t-il principalement ?",
        questionEn: "How many main types of level crossings are there?",
        options: {
            A: { fr: "2 : avec barrières et sans barrières", en: "2: with barriers and without barriers" },
            B: { fr: "3 : automatiques, manuels et sans barrières", en: "3: automatic, manual, and without barriers" },
            C: { fr: "1 seul type standard", en: "1 standard type only" },
            D: { fr: "4 types différents", en: "4 different types" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Il existe principalement 2 types : les passages à niveau avec barrières (automatiques ou manuels) et les passages à niveau sans barrières (croix de Saint-André).",
        explanationEn: "There are mainly 2 types: level crossings with barriers (automatic or manual) and crossings without barriers (St. Andrew's cross).",
        trapNote: "Crossings without barriers are the most dangerous — extra vigilance required.",
        distractorNotes: {
            B: "Automatic and manual are subtypes of 'with barriers', not separate main categories.",
            C: "There are clearly two distinct types with different safety equipment.",
            D: "The main classification is two types, though subtypes exist."
        },
        vocabulary: [
            { wordFr: "passage à niveau", wordEn: "level crossing", definition: "Where a road crosses a railway at the same level" },
            { wordFr: "croix de Saint-André", wordEn: "St. Andrew's cross", definition: "The X-shaped sign at unbarriered level crossings" }
        ]
    },
    {
        id: 'tunn-017', topic: 'tunnels_passages_niveau', difficulty: 3, signs: [],
        questionFr: "La barrière d'un passage à niveau commence à se fermer. Que faites-vous ?",
        questionEn: "A level crossing barrier starts to close. What do you do?",
        options: {
            A: { fr: "Accélérer pour passer avant la fermeture", en: "Accelerate to pass before it closes" },
            B: { fr: "S'arrêter avant la barrière", en: "Stop before the barrier" },
            C: { fr: "Contourner la barrière", en: "Go around the barrier" },
            D: { fr: "Reculer si vous êtes sur les voies", en: "Reverse if you are on the tracks" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Lorsque les barrières commencent à se fermer, vous devez vous arrêter avant la barrière. Ne tentez jamais de passer.",
        explanationEn: "When barriers begin to close, you must stop before the barrier. Never attempt to pass.",
        trapNote: "A closing barrier means a train is imminent. STOP. No exceptions.",
        distractorNotes: {
            A: "Attempting to beat a closing barrier is one of the most dangerous things a driver can do.",
            C: "Going around barriers is suicidal — trains cannot stop in time.",
            D: "If you're already on the tracks, drive forward off them if possible, never reverse."
        },
        vocabulary: [
            { wordFr: "barrière", wordEn: "barrier/gate", definition: "The physical bar that blocks the road at level crossings" }
        ]
    },
    {
        id: 'tunn-018', topic: 'tunnels_passages_niveau', difficulty: 2, signs: [],
        questionFr: "Pourquoi est-il interdit de s'arrêter sur un passage à niveau ?",
        questionEn: "Why is stopping on a level crossing prohibited?",
        options: {
            A: { fr: "Car cela bloque la circulation routière", en: "Because it blocks road traffic" },
            B: { fr: "Car un train ne peut pas s'arrêter à temps pour éviter un véhicule", en: "Because a train cannot stop in time to avoid a vehicle" },
            C: { fr: "Car les rails sont glissants", en: "Because the rails are slippery" },
            D: { fr: "Ce n'est pas interdit si c'est bref", en: "It's not prohibited if it's brief" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Un train lancé à grande vitesse a besoin de plusieurs centaines de mètres pour s'arrêter. Il ne peut pas éviter un obstacle sur les voies.",
        explanationEn: "A train travelling at high speed needs several hundred metres to stop. It cannot avoid an obstacle on the tracks.",
        trapNote: "A train at 130 km/h needs about 1.5 km to stop. It WILL hit anything on the tracks.",
        distractorNotes: {
            A: "While true, the primary reason is the lethal danger from trains.",
            C: "Slippery rails are a concern for the train, not the main reason for the prohibition.",
            D: "It IS prohibited — even brief stops can be fatal if a train approaches."
        },
        vocabulary: [
            { wordFr: "distance de freinage", wordEn: "braking distance", definition: "The distance needed for a vehicle to come to a complete stop" }
        ]
    },
    {
        id: 'tunn-019', topic: 'tunnels_passages_niveau', difficulty: 2, signs: [],
        questionFr: "En entrant dans un tunnel, pourquoi devez-vous retirer vos lunettes de soleil ?",
        questionEn: "When entering a tunnel, why must you remove your sunglasses?",
        options: {
            A: { fr: "C'est obligatoire par la loi", en: "It's required by law" },
            B: { fr: "Pour éviter un temps d'adaptation visuelle dangereux", en: "To avoid a dangerous visual adaptation delay" },
            C: { fr: "Pour mieux entendre les bruits", en: "To better hear sounds" },
            D: { fr: "Ce n'est pas nécessaire dans les tunnels éclairés", en: "It's not necessary in lit tunnels" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Les lunettes de soleil réduisent la luminosité. En entrant dans un tunnel, vos yeux mettent plus de temps à s'adapter à l'obscurité, ce qui est dangereux.",
        explanationEn: "Sunglasses reduce brightness. When entering a tunnel, your eyes take longer to adapt to darkness, which is dangerous.",
        trapNote: "The transition from bright daylight to tunnel darkness is already difficult — sunglasses make it worse.",
        distractorNotes: {
            A: "It's not strictly a legal requirement but a critical safety recommendation.",
            C: "Removing sunglasses is about vision, not hearing.",
            D: "Even well-lit tunnels are significantly darker than outdoor daylight."
        },
        vocabulary: [
            { wordFr: "adaptation visuelle", wordEn: "visual adaptation", definition: "The time your eyes need to adjust to different light levels" }
        ]
    },
    {
        id: 'tunn-020', topic: 'tunnels_passages_niveau', difficulty: 3, signs: [],
        questionFr: "Quels véhicules sont interdits dans certains tunnels ?",
        questionEn: "Which vehicles are prohibited in some tunnels?",
        options: {
            A: { fr: "Les motos", en: "Motorcycles" },
            B: { fr: "Les véhicules transportant des matières dangereuses", en: "Vehicles carrying hazardous materials" },
            C: { fr: "Les véhicules électriques", en: "Electric vehicles" },
            D: { fr: "Les camping-cars", en: "Motorhomes" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Les véhicules transportant des matières dangereuses (TMD) sont interdits dans de nombreux tunnels en raison du risque d'incendie ou d'explosion en espace confiné.",
        explanationEn: "Vehicles carrying hazardous materials (TMD) are banned from many tunnels due to fire or explosion risk in a confined space.",
        trapNote: "TMD = Transport de Matières Dangereuses. Look for the orange hazard plates on trucks.",
        distractorNotes: {
            A: "Motorcycles are generally allowed in tunnels.",
            C: "Electric vehicles are allowed in tunnels like any other vehicle.",
            D: "Motorhomes may have height restrictions but aren't banned for safety reasons."
        },
        vocabulary: [
            { wordFr: "matières dangereuses", wordEn: "hazardous materials", definition: "Flammable, explosive, toxic, or corrosive substances" },
            { wordFr: "TMD", wordEn: "dangerous goods transport", definition: "The regulated transport of hazardous materials" }
        ]
    },

    // === SIGNALISATION 12-20 ===
    {
        id: 'sign-012', topic: 'signalisation', difficulty: 1, signs: [],
        questionFr: "Les panneaux ronds à fond bleu sont des panneaux de :",
        questionEn: "Round signs with a blue background are signs of:",
        options: {
            A: { fr: "Interdiction", en: "Prohibition" },
            B: { fr: "Obligation", en: "Obligation" },
            C: { fr: "Danger", en: "Danger" },
            D: { fr: "Information", en: "Information" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Les panneaux ronds à fond bleu sont des panneaux d'obligation (ex : direction obligatoire, vitesse minimale).",
        explanationEn: "Round blue signs are mandatory signs (e.g., mandatory direction, minimum speed).",
        trapNote: "Blue round = obligation. Red round = prohibition. Triangle = warning.",
        distractorNotes: {
            A: "Prohibition signs have a RED border on white background.",
            C: "Danger signs are triangular with a red border.",
            D: "Information signs are rectangular."
        },
        vocabulary: [
            { wordFr: "panneau d'obligation", wordEn: "mandatory sign", definition: "A sign that requires you to follow a specific instruction" }
        ]
    },
    {
        id: 'sign-013', topic: 'signalisation', difficulty: 2, signs: [],
        questionFr: "Les panneaux ronds à bord rouge sur fond blanc sont des panneaux de :",
        questionEn: "Round signs with a red border on a white background are signs of:",
        options: {
            A: { fr: "Obligation", en: "Obligation" },
            B: { fr: "Information", en: "Information" },
            C: { fr: "Interdiction ou restriction", en: "Prohibition or restriction" },
            D: { fr: "Direction", en: "Direction" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Les panneaux ronds à bord rouge indiquent une interdiction ou une restriction (vitesse maximale, sens interdit, etc.).",
        explanationEn: "Round signs with red borders indicate a prohibition or restriction (speed limit, no entry, etc.).",
        trapNote: "Red border + round = prohibition. Red border + triangle = warning. Shape matters!",
        distractorNotes: {
            A: "Obligation signs use a blue background, not white with red border.",
            B: "Information signs are rectangular, not round.",
            D: "Direction signs are rectangular with specific colours (blue, green, white)."
        },
        vocabulary: [
            { wordFr: "panneau d'interdiction", wordEn: "prohibition sign", definition: "A sign that bans a specific action" }
        ]
    },
    {
        id: 'sign-014', topic: 'signalisation', difficulty: 2, signs: [],
        questionFr: "Que signifie un panneau triangulaire à bord rouge ?",
        questionEn: "What does a triangular sign with a red border mean?",
        options: {
            A: { fr: "Interdiction", en: "Prohibition" },
            B: { fr: "Obligation", en: "Obligation" },
            C: { fr: "Danger ou avertissement", en: "Danger or warning" },
            D: { fr: "Information touristique", en: "Tourist information" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Les panneaux triangulaires à bord rouge sont des panneaux de danger. Ils avertissent d'un danger à venir (virage, école, travaux, etc.).",
        explanationEn: "Triangular signs with red borders are danger signs. They warn of an upcoming hazard (bend, school, roadworks, etc.).",
        trapNote: "Triangle = warning/danger. The shape tells you BEFORE you read the content.",
        distractorNotes: {
            A: "Prohibition signs are round, not triangular.",
            B: "Obligation signs are round with a blue background.",
            D: "Tourist information uses brown rectangular signs."
        },
        vocabulary: [
            { wordFr: "panneau de danger", wordEn: "warning sign", definition: "A sign alerting you to a hazard ahead" }
        ]
    },
    {
        id: 'sign-015', topic: 'signalisation', difficulty: 3, signs: ['end_priority'],
        questionFr: "Que signifie un losange jaune barré d'une ligne noire ?",
        questionEn: "What does a yellow diamond with a black bar mean?",
        options: {
            A: { fr: "Route prioritaire", en: "Priority road" },
            B: { fr: "Fin de route prioritaire", en: "End of priority road" },
            C: { fr: "Interdiction de dépasser", en: "No overtaking" },
            D: { fr: "Zone de danger", en: "Danger zone" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Le losange jaune barré signifie la fin de la route prioritaire. Après ce panneau, la priorité à droite s'applique à nouveau.",
        explanationEn: "The barred yellow diamond means end of priority road. After this sign, priority to the right applies again.",
        trapNote: "After this sign, you must yield to the right at every intersection!",
        distractorNotes: {
            A: "The UN-barred yellow diamond means priority road. The bar means END of priority.",
            C: "No overtaking uses a round red-bordered sign with two cars.",
            D: "Danger zones are shown by triangular signs, not diamond shapes."
        },
        vocabulary: [
            { wordFr: "fin de priorité", wordEn: "end of priority", definition: "You no longer have priority at upcoming intersections" }
        ]
    },
    {
        id: 'sign-016', topic: 'signalisation', difficulty: 2, signs: [],
        questionFr: "Quelle est la couleur des panneaux de direction vers une autoroute ?",
        questionEn: "What colour are direction signs to a motorway?",
        options: {
            A: { fr: "Vert", en: "Green" },
            B: { fr: "Bleu", en: "Blue" },
            C: { fr: "Blanc", en: "White" },
            D: { fr: "Marron", en: "Brown" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Les panneaux de direction vers les autoroutes sont bleus. Vert = routes nationales, Blanc = routes locales, Marron = sites touristiques.",
        explanationEn: "Direction signs to motorways are blue. Green = national roads, White = local roads, Brown = tourist sites.",
        trapNote: "Blue = motorway. Green = national road. White = local. Brown = tourist. Memorize the colour code!",
        distractorNotes: {
            A: "Green is for national roads (routes nationales).",
            C: "White is for departmental and local roads.",
            D: "Brown is for tourist attractions and cultural sites."
        },
        vocabulary: [
            { wordFr: "panneau de direction", wordEn: "direction sign", definition: "A sign showing the route to a destination" }
        ]
    },
    {
        id: 'sign-017', topic: 'signalisation', difficulty: 3, signs: [],
        questionFr: "Qu'est-ce qu'un panonceau (petite plaque sous un panneau) ?",
        questionEn: "What is a supplementary panel (small plate under a sign)?",
        options: {
            A: { fr: "Un panneau décoratif", en: "A decorative sign" },
            B: { fr: "Une indication complémentaire au panneau principal", en: "Additional information complementing the main sign" },
            C: { fr: "Un panneau de publicité", en: "An advertising sign" },
            D: { fr: "Un panneau réservé aux poids lourds", en: "A sign for heavy vehicles only" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Un panonceau est une plaque rectangulaire placée sous le panneau principal pour apporter des informations complémentaires (distance, catégorie de véhicule, horaires).",
        explanationEn: "A supplementary panel is a rectangular plate under the main sign providing extra information (distance, vehicle type, times).",
        trapNote: "Always read the panonceau! It can restrict or modify the main sign's meaning.",
        distractorNotes: {
            A: "Panonceaux are functional information panels, not decoration.",
            C: "Advertising signs are prohibited near official road signs.",
            D: "Panonceaux can apply to any vehicle type, not just heavy vehicles."
        },
        vocabulary: [
            { wordFr: "panonceau", wordEn: "supplementary panel", definition: "A small sign beneath the main sign adding detail or conditions" }
        ]
    },
    {
        id: 'sign-018', topic: 'signalisation', difficulty: 2, signs: [],
        questionFr: "En cas de signalisation temporaire (travaux) et de signalisation permanente contradictoires, laquelle prime ?",
        questionEn: "When temporary (roadwork) and permanent signs conflict, which takes precedence?",
        options: {
            A: { fr: "La signalisation permanente", en: "Permanent signs" },
            B: { fr: "La signalisation temporaire", en: "Temporary signs" },
            C: { fr: "La plus restrictive", en: "The more restrictive one" },
            D: { fr: "Elles ne sont jamais contradictoires", en: "They are never contradictory" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "La signalisation temporaire (fond jaune) prime toujours sur la signalisation permanente. Elle est mise en place pour des raisons de sécurité liées aux travaux.",
        explanationEn: "Temporary signs (yellow background) always take precedence over permanent signs. They are placed for safety reasons related to roadworks.",
        trapNote: "Yellow = temporary = overrides everything. This is a common exam question.",
        distractorNotes: {
            A: "Permanent signs are overridden by temporary ones during roadworks.",
            C: "It's not about restrictiveness — temporary signs always win.",
            D: "They CAN be contradictory, which is why the priority rule exists."
        },
        vocabulary: [
            { wordFr: "signalisation temporaire", wordEn: "temporary signage", definition: "Yellow-background signs placed during roadworks" }
        ]
    },
    {
        id: 'sign-019', topic: 'signalisation', difficulty: 1, signs: ['no_entry'],
        questionFr: "Que signifie un panneau rond rouge avec une barre blanche horizontale ?",
        questionEn: "What does a round red sign with a horizontal white bar mean?",
        options: {
            A: { fr: "Stationnement interdit", en: "No parking" },
            B: { fr: "Sens interdit", en: "No entry" },
            C: { fr: "Interdiction de dépasser", en: "No overtaking" },
            D: { fr: "Fin d'interdiction", en: "End of prohibition" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Le panneau rond rouge avec barre blanche horizontale signifie sens interdit. Il est interdit de s'engager dans cette voie.",
        explanationEn: "The round red sign with a horizontal white bar means no entry. You must not enter this road.",
        trapNote: "One of the most recognizable signs. Entering a one-way street the wrong way is extremely dangerous.",
        distractorNotes: {
            A: "No parking uses a blue sign with a red diagonal.",
            C: "No overtaking shows two cars side by side.",
            D: "End of prohibition is shown by a white sign with grey diagonal lines."
        },
        vocabulary: [
            { wordFr: "sens interdit", wordEn: "no entry", definition: "You must not drive into this road from this direction" }
        ]
    },
    {
        id: 'sign-020', topic: 'signalisation', difficulty: 2, signs: [],
        questionFr: "Quelle est la signification d'un feu rouge fixe à un carrefour ?",
        questionEn: "What does a steady red light at a junction mean?",
        options: {
            A: { fr: "Ralentir et passer avec prudence", en: "Slow down and pass with caution" },
            B: { fr: "Arrêt absolu — ne pas franchir la ligne d'arrêt", en: "Complete stop — do not cross the stop line" },
            C: { fr: "Priorité aux piétons uniquement", en: "Priority for pedestrians only" },
            D: { fr: "Vous pouvez tourner à droite", en: "You may turn right" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Un feu rouge fixe impose un arrêt absolu derrière la ligne d'arrêt. Vous ne pouvez repartir qu'au feu vert.",
        explanationEn: "A steady red light requires a complete stop behind the stop line. You may only proceed when the light turns green.",
        trapNote: "In France, there's no 'right on red' unless a specific flashing arrow sign permits it.",
        distractorNotes: {
            A: "Red means STOP, not just slow down.",
            C: "Red applies to ALL traffic, not just pedestrian priority.",
            D: "Right on red is NOT allowed by default in France — only with a specific flashing arrow."
        },
        vocabulary: [
            { wordFr: "feu rouge", wordEn: "red light", definition: "A traffic signal requiring a complete stop" },
            { wordFr: "ligne d'arrêt", wordEn: "stop line", definition: "The white line where you must stop at a red light" }
        ]
    },

    // === NOTIONS_DIVERSES 12-20 ===
    {
        id: 'div-012', topic: 'notions_diverses', difficulty: 2, signs: [],
        questionFr: "Qu'est-ce que l'éco-conduite ?",
        questionEn: "What is eco-driving?",
        options: {
            A: { fr: "Conduire uniquement des véhicules électriques", en: "Driving only electric vehicles" },
            B: { fr: "Adopter une conduite souple pour économiser du carburant et réduire les émissions", en: "Adopting smooth driving to save fuel and reduce emissions" },
            C: { fr: "Conduire sur les pistes cyclables", en: "Driving on cycle lanes" },
            D: { fr: "Utiliser le frein moteur en permanence", en: "Using engine braking permanently" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "L'éco-conduite consiste à adopter une conduite souple, anticiper, maintenir une vitesse stable et entretenir son véhicule pour réduire la consommation.",
        explanationEn: "Eco-driving involves smooth driving, anticipation, maintaining stable speed, and vehicle maintenance to reduce consumption.",
        trapNote: "Eco-driving is about driving STYLE, not vehicle type. Anyone can practice it.",
        distractorNotes: {
            A: "Eco-driving applies to ALL vehicles, not just electric ones.",
            C: "Cycle lanes are for cyclists — driving on them is illegal.",
            D: "Engine braking is one technique but eco-driving is a broader concept."
        },
        vocabulary: [
            { wordFr: "éco-conduite", wordEn: "eco-driving", definition: "Driving techniques that reduce fuel consumption and emissions" }
        ]
    },
    {
        id: 'div-013', topic: 'notions_diverses', difficulty: 2, signs: [],
        questionFr: "Tous les combien de temps le contrôle technique d'une voiture particulière doit-il être effectué ?",
        questionEn: "How often must a private car undergo a technical inspection?",
        options: {
            A: { fr: "Tous les ans", en: "Every year" },
            B: { fr: "Tous les 2 ans", en: "Every 2 years" },
            C: { fr: "Tous les 5 ans", en: "Every 5 years" },
            D: { fr: "Une seule fois à l'achat", en: "Only once at purchase" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Le contrôle technique doit être effectué dans les 6 mois avant le 4ème anniversaire du véhicule, puis tous les 2 ans.",
        explanationEn: "The technical inspection must be done within 6 months before the vehicle's 4th anniversary, then every 2 years.",
        trapNote: "First one at 4 years old, then every 2 years. Not annual like in some countries.",
        distractorNotes: {
            A: "Every year is too frequent — the French system requires it every 2 years.",
            C: "Every 5 years is too long — it's every 2 years after the first one.",
            D: "The inspection is recurring, not a one-time event."
        },
        vocabulary: [
            { wordFr: "contrôle technique", wordEn: "technical inspection/MOT", definition: "A mandatory safety inspection for vehicles" }
        ]
    },
    {
        id: 'div-014', topic: 'notions_diverses', difficulty: 3, signs: [],
        questionFr: "Que devez-vous faire en premier sur les lieux d'un accident ?",
        questionEn: "What must you do first at the scene of an accident?",
        options: {
            A: { fr: "Appeler les secours (15, 18 ou 112)", en: "Call emergency services (15, 18 or 112)" },
            B: { fr: "Protéger la zone (triangle de signalisation, gilet jaune)", en: "Protect the area (warning triangle, hi-vis vest)" },
            C: { fr: "Administrer les premiers soins", en: "Administer first aid" },
            D: { fr: "Prendre des photos pour l'assurance", en: "Take photos for insurance" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "L'ordre est : Protéger (P) — Alerter (A) — Secourir (S). D'abord sécuriser la zone pour éviter un sur-accident.",
        explanationEn: "The order is: Protect — Alert — Rescue (PAS). First secure the area to prevent a secondary accident.",
        trapNote: "PAS protocol: Protect FIRST, then Alert, then Rescue. Many people call first, but protection comes first.",
        distractorNotes: {
            A: "Calling services is step 2 (Alert) — protection comes first.",
            C: "First aid is step 3 (Rescue) — protect and alert first.",
            D: "Photos are for later — saving lives and preventing further accidents is the priority."
        },
        vocabulary: [
            { wordFr: "PAS", wordEn: "Protect-Alert-Rescue", definition: "The emergency response protocol: Protéger, Alerter, Secourir" },
            { wordFr: "triangle de signalisation", wordEn: "warning triangle", definition: "A reflective triangle placed behind a stopped vehicle to warn traffic" }
        ]
    },
    {
        id: 'div-015', topic: 'notions_diverses', difficulty: 1, signs: [],
        questionFr: "Quel est le numéro d'urgence européen ?",
        questionEn: "What is the European emergency number?",
        options: {
            A: { fr: "911", en: "911" },
            B: { fr: "112", en: "112" },
            C: { fr: "999", en: "999" },
            D: { fr: "15", en: "15" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Le 112 est le numéro d'urgence européen. Il fonctionne dans tous les pays de l'UE. En France : 15 (SAMU), 18 (pompiers), 17 (police).",
        explanationEn: "112 is the European emergency number. It works in all EU countries. In France: 15 (ambulance), 18 (fire), 17 (police).",
        trapNote: "112 works everywhere in Europe, from any phone, even without a SIM card.",
        distractorNotes: {
            A: "911 is the US/North American emergency number.",
            C: "999 is the UK emergency number.",
            D: "15 is the French SAMU (medical) number, not the pan-European one."
        },
        vocabulary: [
            { wordFr: "numéro d'urgence", wordEn: "emergency number", definition: "A telephone number for contacting emergency services" }
        ]
    },
    {
        id: 'div-016', topic: 'notions_diverses', difficulty: 2, signs: [],
        questionFr: "Quels équipements de sécurité sont obligatoires dans votre véhicule ?",
        questionEn: "Which safety equipment is compulsory in your vehicle?",
        options: {
            A: { fr: "Triangle de signalisation et gilet jaune", en: "Warning triangle and hi-vis vest" },
            B: { fr: "Extincteur et trousse de secours", en: "Fire extinguisher and first aid kit" },
            C: { fr: "Couverture de survie et lampe torche", en: "Emergency blanket and torch" },
            D: { fr: "Aucun équipement n'est obligatoire", en: "No equipment is compulsory" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "En France, vous devez avoir : un triangle de signalisation et un gilet jaune fluorescent. L'éthylotest n'est plus obligatoire depuis 2020.",
        explanationEn: "In France, you must carry: a warning triangle and a fluorescent hi-vis vest. The breathalyser is no longer required since 2020.",
        trapNote: "Triangle + hi-vis vest = mandatory. A first aid kit is recommended but not legally required.",
        distractorNotes: {
            B: "Fire extinguisher and first aid kit are recommended but not legally required.",
            C: "Emergency blanket and torch are useful but not compulsory.",
            D: "There ARE compulsory items — triangle and hi-vis vest."
        },
        vocabulary: [
            { wordFr: "gilet jaune", wordEn: "hi-vis vest", definition: "A fluorescent yellow or orange safety vest" },
            { wordFr: "triangle de signalisation", wordEn: "warning triangle", definition: "A reflective triangle for warning other drivers" }
        ]
    },
    {
        id: 'div-017', topic: 'notions_diverses', difficulty: 3, signs: [],
        questionFr: "Qu'est-ce qu'une Zone à Faibles Émissions (ZFE) ?",
        questionEn: "What is a Low Emission Zone (ZFE)?",
        options: {
            A: { fr: "Une zone où seuls les véhicules électriques peuvent circuler", en: "A zone where only electric vehicles can drive" },
            B: { fr: "Une zone limitant l'accès selon la vignette Crit'Air du véhicule", en: "A zone restricting access based on the vehicle's Crit'Air sticker" },
            C: { fr: "Une zone piétonne", en: "A pedestrian zone" },
            D: { fr: "Une zone réservée aux transports en commun", en: "A zone reserved for public transport" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Les ZFE limitent la circulation des véhicules les plus polluants en fonction de leur vignette Crit'Air (classement par émissions).",
        explanationEn: "ZFEs restrict the most polluting vehicles based on their Crit'Air sticker (emissions classification).",
        trapNote: "Not just electric vehicles — the Crit'Air system grades ALL vehicles by their emission level.",
        distractorNotes: {
            A: "ZFEs allow various vehicle types — the restriction is based on emission class, not engine type.",
            C: "Pedestrian zones are different from low emission zones.",
            D: "ZFEs are not reserved for public transport — clean private vehicles can enter."
        },
        vocabulary: [
            { wordFr: "ZFE", wordEn: "Low Emission Zone", definition: "An urban area restricting polluting vehicles" },
            { wordFr: "vignette Crit'Air", wordEn: "Crit'Air sticker", definition: "A coloured sticker classifying a vehicle by its emissions" }
        ]
    },
    {
        id: 'div-018', topic: 'notions_diverses', difficulty: 2, signs: [],
        questionFr: "Quelle est la pression correcte des pneus ?",
        questionEn: "What is the correct tyre pressure?",
        options: {
            A: { fr: "Toujours 2 bars pour toutes les voitures", en: "Always 2 bar for all cars" },
            B: { fr: "Celle indiquée par le constructeur du véhicule", en: "The one specified by the vehicle manufacturer" },
            C: { fr: "La plus élevée possible", en: "The highest possible" },
            D: { fr: "La même que celle des pneus neufs en magasin", en: "The same as new tyres in the shop" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "La pression correcte est indiquée par le constructeur (autocollant sur le montant de la porte conducteur ou dans le manuel). Elle varie selon le véhicule et la charge.",
        explanationEn: "Correct pressure is specified by the manufacturer (sticker on the driver's door frame or in the manual). It varies by vehicle and load.",
        trapNote: "Check the door frame sticker or manual — there is no universal pressure for all cars.",
        distractorNotes: {
            A: "Correct pressure varies by vehicle — there's no universal 2 bar standard.",
            C: "Over-inflated tyres are dangerous — they have less grip and wear unevenly.",
            D: "Shop-new tyres may not be at the correct pressure for your specific vehicle."
        },
        vocabulary: [
            { wordFr: "pression des pneus", wordEn: "tyre pressure", definition: "The air pressure inside vehicle tyres, measured in bar or PSI" }
        ]
    },
    {
        id: 'div-019', topic: 'notions_diverses', difficulty: 2, signs: [],
        questionFr: "Un constat amiable doit être rempli en cas de :",
        questionEn: "An accident report form must be filled out in case of:",
        options: {
            A: { fr: "Accident corporel uniquement", en: "Injury accident only" },
            B: { fr: "Tout accident matériel impliquant au moins 2 véhicules", en: "Any material accident involving at least 2 vehicles" },
            C: { fr: "Uniquement les accidents sur autoroute", en: "Only motorway accidents" },
            D: { fr: "Seulement si la police est présente", en: "Only if police are present" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Le constat amiable doit être rempli par les deux conducteurs lors de tout accident matériel. Il est indépendant de l'intervention de la police.",
        explanationEn: "The accident report form must be completed by both drivers for any material accident. It is independent of police involvement.",
        trapNote: "Always carry a blank report form. Both drivers must sign it at the scene.",
        distractorNotes: {
            A: "Material (property-only) accidents also require a report form.",
            C: "The form is required on ALL roads, not just motorways.",
            D: "The form is between drivers — police presence is not required."
        },
        vocabulary: [
            { wordFr: "constat amiable", wordEn: "accident report form", definition: "A standardized form completed by both drivers after an accident" }
        ]
    },
    {
        id: 'div-020', topic: 'notions_diverses', difficulty: 3, signs: [],
        questionFr: "Quel est le principe PAS (Protéger, Alerter, Secourir) en détail ?",
        questionEn: "What is the PAS (Protect, Alert, Rescue) principle in detail?",
        options: {
            A: { fr: "Protéger la zone, alerter les secours (112), puis prodiguer les premiers soins sans déplacer la victime", en: "Protect the area, alert emergency services (112), then provide first aid without moving the victim" },
            B: { fr: "Prendre des photos, appeler l'assurance, soigner les blessés", en: "Take photos, call insurance, treat the injured" },
            C: { fr: "Paniquer, accélérer, stopper", en: "Panic, accelerate, stop" },
            D: { fr: "Poster sur les réseaux sociaux, alerter, secourir", en: "Post on social media, alert, rescue" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "PAS : 1) Protéger (balisage, gilet, triangle) 2) Alerter (112 avec lieu, nombre de victimes, état) 3) Secourir (gestes de premiers secours, ne pas déplacer la victime sauf danger vital).",
        explanationEn: "PAS: 1) Protect (cordon off, vest, triangle) 2) Alert (112 with location, number of victims, condition) 3) Rescue (first aid, do not move the victim unless life-threatening danger).",
        trapNote: "NEVER move an injured person unless they're in immediate life-threatening danger (fire, etc.).",
        distractorNotes: {
            B: "Insurance comes later — saving lives is the priority.",
            C: "This is obviously not a real emergency protocol.",
            D: "Social media has no place in emergency response."
        },
        vocabulary: [
            { wordFr: "PAS", wordEn: "Protect-Alert-Rescue", definition: "The French emergency first-response protocol" },
            { wordFr: "balisage", wordEn: "cordoning off", definition: "Setting up warnings around the accident scene" }
        ]
    },

    // === CROISEMENT / DÉPASSEMENT — Batch 3 (croi-021 to croi-031) ===
    {
        id: 'croi-021', topic: 'croisement_depassement', difficulty: 3, signs: [],
        questionFr: "Pouvez-vous dépasser un cycliste dans un virage ?",
        questionEn: "Can you overtake a cyclist on a curve?",
        options: {
            A: { fr: "Oui, si le cycliste roule lentement", en: "Yes, if the cyclist is riding slowly" },
            B: { fr: "Oui, en klaxonnant pour prévenir", en: "Yes, by honking to warn them" },
            C: { fr: "Non, c'est interdit quand la visibilité est insuffisante", en: "No, it is prohibited when visibility is insufficient" },
            D: { fr: "Oui, si vous laissez 1 mètre", en: "Yes, if you leave 1 metre" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Le dépassement est interdit dans un virage lorsque la visibilité est insuffisante (art. R414-4 du Code de la route), même s'il s'agit d'un cycliste. La lenteur du véhicule dépassé ne change pas la règle.",
        explanationEn: "Overtaking is prohibited on a curve when visibility is insufficient (Article R414-4), even if the vehicle being overtaken is a cyclist. The slow speed of the overtaken vehicle does not change this rule.",
        trapNote: "Many drivers think cyclists are small enough to pass anywhere — but the visibility rule applies regardless of the overtaken vehicle's size.",
        distractorNotes: {
            A: "The cyclist's speed is irrelevant — the prohibition is based on visibility.",
            B: "Honking does not authorise an illegal overtake.",
            D: "1 metre is the urban lateral distance, but the curve prohibition overrides it."
        },
        vocabulary: [
            { wordFr: "virage", wordEn: "curve/bend", definition: "A section of road that changes direction" },
            { wordFr: "visibilité insuffisante", wordEn: "insufficient visibility", definition: "When you cannot see far enough ahead to safely complete a manoeuvre" }
        ]
    },
    {
        id: 'croi-022', topic: 'croisement_depassement', difficulty: 2, signs: ['pedestrian_crossing'],
        questionFr: "Quelles sont les règles de dépassement à l'approche d'un passage piétons ?",
        questionEn: "What are the overtaking rules near a pedestrian crossing?",
        options: {
            A: { fr: "Le dépassement est interdit à l'approche d'un passage piétons", en: "Overtaking is prohibited near a pedestrian crossing" },
            B: { fr: "Le dépassement est autorisé si aucun piéton n'est visible", en: "Overtaking is allowed if no pedestrian is visible" },
            C: { fr: "Le dépassement est autorisé en roulant à moins de 30 km/h", en: "Overtaking is allowed if driving under 30 km/h" },
            D: { fr: "Le dépassement est autorisé uniquement par la droite", en: "Overtaking is only allowed on the right" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "L'article R414-4 interdit tout dépassement à proximité immédiate d'un passage piétons. La présence ou l'absence de piétons ne change rien à l'interdiction.",
        explanationEn: "Article R414-4 prohibits all overtaking in the immediate vicinity of a pedestrian crossing. The presence or absence of pedestrians does not affect the prohibition.",
        trapNote: "Even if you see no pedestrians, overtaking near the crossing is still illegal because a pedestrian could appear at any moment.",
        distractorNotes: {
            B: "The rule applies regardless of pedestrian presence — you must anticipate.",
            C: "Speed does not change the prohibition at pedestrian crossings.",
            D: "No overtaking is allowed on either side near a pedestrian crossing."
        },
        vocabulary: [
            { wordFr: "passage piétons", wordEn: "pedestrian crossing", definition: "Marked area where pedestrians have right of way to cross the road" }
        ]
    },
    {
        id: 'croi-023', topic: 'croisement_depassement', difficulty: 2, signs: [],
        questionFr: "Selon le Code de la route, dans quels cas les appels de phares sont-ils autorisés ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "According to the Highway Code, in which cases are headlight flashes permitted? (Select all correct answers)",
        options: {
            A: { fr: "Pour avertir d'un danger", en: "To warn of a danger" },
            B: { fr: "Pour signaler sa présence lorsque les conditions de visibilité le justifient", en: "To signal your presence when visibility conditions warrant it" },
            C: { fr: "Pour autoriser un autre véhicule à passer", en: "To authorise another vehicle to pass" },
            D: { fr: "Pour demander à un autre conducteur d'accélérer", en: "To ask another driver to speed up" }
        },
        correctAnswers: ['A', 'B'], answerCount: 2,
        explanationFr: "Les appels de phares servent uniquement à avertir d'un danger ou à signaler sa présence (art. R416-8). Ils ne constituent JAMAIS une autorisation de passage ou de dépassement.",
        explanationEn: "Headlight flashes are only meant to warn of a danger or signal one's presence (Article R416-8). They NEVER constitute permission to pass or overtake.",
        trapNote: "In daily practice, many drivers use flashes to 'let someone go' — but legally, flashes only mean WARNING or PRESENCE. Acting on them as permission can cause accidents.",
        distractorNotes: {
            C: "Flashes never authorise overtaking or passage — interpreting them this way is dangerous.",
            D: "Flashing has nothing to do with requesting speed changes."
        },
        vocabulary: [
            { wordFr: "appels de phares", wordEn: "headlight flashes", definition: "Briefly flashing high beams to signal presence or warn of danger" },
            { wordFr: "céder le passage", wordEn: "give way / yield", definition: "To allow another vehicle or pedestrian to go first" }
        ]
    },
    {
        id: 'croi-024', topic: 'croisement_depassement', difficulty: 2, signs: [],
        questionFr: "Lorsqu'une route se rétrécit, qui a la priorité de passage ?",
        questionEn: "When a road narrows, who has right of way?",
        options: {
            A: { fr: "Toujours le véhicule le plus rapide", en: "Always the fastest vehicle" },
            B: { fr: "Le véhicule qui est le plus proche du rétrécissement", en: "The vehicle closest to the narrowing" },
            C: { fr: "Le véhicule descendant a priorité en montagne ; sinon le plus encombré ou celui dont le déplacement est le plus difficile", en: "The descending vehicle in mountains; otherwise the most encumbered or the one with the most difficult manoeuvre" },
            D: { fr: "Toujours le véhicule venant de droite", en: "Always the vehicle from the right" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "En montagne, le véhicule descendant doit s'arrêter pour laisser passer le véhicule montant (sauf si une aire de croisement est plus proche du véhicule montant). En terrain plat, le véhicule le plus encombré ou celui qui aurait le plus de difficulté à manœuvrer a la priorité.",
        explanationEn: "In mountains, the descending vehicle must stop to let the ascending vehicle pass (unless a passing place is closer to the ascending vehicle). On flat ground, the most encumbered vehicle or the one with the most difficult manoeuvre has priority.",
        trapNote: "Priority to the right does NOT apply to road narrowing — this is a specific croisement rule with its own logic.",
        distractorNotes: {
            A: "Speed is never a criterion for right of way.",
            B: "Proximity to the narrowing is not the deciding factor.",
            D: "Priorité à droite does not apply when the road narrows."
        },
        vocabulary: [
            { wordFr: "rétrécissement de chaussée", wordEn: "road narrowing", definition: "Where the road becomes too narrow for two vehicles to pass" },
            { wordFr: "aire de croisement", wordEn: "passing place", definition: "A widened area on a narrow road where vehicles can pass each other" }
        ]
    },
    {
        id: 'croi-025', topic: 'croisement_depassement', difficulty: 3, signs: [],
        questionFr: "Face à une ligne continue doublée d'une ligne discontinue, depuis quel côté peut-on la franchir ?",
        questionEn: "When facing a continuous line paired with a dashed line, from which side can you cross it?",
        options: {
            A: { fr: "Uniquement du côté de la ligne discontinue", en: "Only from the dashed line side" },
            B: { fr: "Uniquement du côté de la ligne continue", en: "Only from the continuous line side" },
            C: { fr: "Des deux côtés", en: "From both sides" },
            D: { fr: "D'aucun côté", en: "From neither side" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Une ligne mixte (continue + discontinue) ne peut être franchie que par les véhicules se trouvant du côté de la ligne discontinue. Les véhicules du côté de la ligne continue ne doivent pas la franchir.",
        explanationEn: "A mixed line (continuous + dashed) can only be crossed by vehicles on the dashed line side. Vehicles on the continuous line side must not cross it.",
        trapNote: "Students often confuse which side can cross. Remember: dashed = you CAN cross, continuous = you CANNOT. Look at YOUR side.",
        distractorNotes: {
            B: "The continuous side cannot cross — it acts as a prohibition for that lane.",
            C: "Only one side may cross, not both.",
            D: "The dashed side IS allowed to cross."
        },
        vocabulary: [
            { wordFr: "ligne mixte", wordEn: "mixed line marking", definition: "A road marking with one continuous and one dashed line side by side" },
            { wordFr: "ligne discontinue", wordEn: "dashed/broken line", definition: "A road marking with gaps, indicating crossing is permitted" }
        ]
    },
    {
        id: 'croi-026', topic: 'croisement_depassement', difficulty: 2, signs: [],
        questionFr: "Dans quels cas peut-on dépasser par la droite ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "In which cases can you overtake on the right? (Select all correct answers)",
        options: {
            A: { fr: "Quand le véhicule devant signale qu'il tourne à gauche", en: "When the vehicle ahead signals a left turn" },
            B: { fr: "Quand on circule sur une autoroute à 3 voies et que la voie de droite est libre", en: "When on a 3-lane motorway and the right lane is free" },
            C: { fr: "Quand un tramway circule sur la droite de la chaussée", en: "When a tram runs on the right side of the road" },
            D: { fr: "Quand on est pressé et que le véhicule devant roule trop lentement", en: "When you are in a hurry and the vehicle ahead is too slow" }
        },
        correctAnswers: ['A', 'C'], answerCount: 2,
        explanationFr: "Le dépassement par la droite est autorisé lorsque le véhicule devant tourne à gauche (art. R414-6) et lorsqu'un tramway circule sur la droite de la chaussée. Sur autoroute en file, changer de file n'est pas considéré comme un dépassement par la droite.",
        explanationEn: "Right-side overtaking is allowed when the vehicle ahead is turning left (Article R414-6) and when a tram runs on the right side of the road. On a motorway in queuing traffic, changing lanes is not considered right-side overtaking.",
        trapNote: "Motorway lane changes in traffic are NOT the same as overtaking on the right — the exam distinguishes these carefully.",
        distractorNotes: {
            B: "Driving in a free right lane on the motorway is lane usage, not overtaking — but actively passing a vehicle on the right is still prohibited.",
            D: "Being in a hurry is never a legal justification for any manoeuvre."
        },
        vocabulary: [
            { wordFr: "dépasser par la droite", wordEn: "overtake on the right", definition: "Passing a vehicle on its right side, normally prohibited in France" },
            { wordFr: "tramway", wordEn: "tram/streetcar", definition: "A rail vehicle running on tracks within the road" }
        ]
    },
    {
        id: 'croi-027', topic: 'croisement_depassement', difficulty: 3, signs: [],
        questionFr: "Quelles affirmations sont vraies concernant une double ligne continue ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "Which statements are true about a double continuous line? (Select all correct answers)",
        options: {
            A: { fr: "Elle interdit absolument le franchissement et le chevauchement", en: "It absolutely prohibits crossing and straddling" },
            B: { fr: "Aucune exception n'existe, même pour dépasser un cycliste", en: "No exception exists, even to overtake a cyclist" },
            C: { fr: "Elle peut être franchie en cas d'urgence personnelle", en: "It can be crossed in personal emergency" },
            D: { fr: "Elle peut être franchie si la visibilité est bonne", en: "It can be crossed if visibility is good" }
        },
        correctAnswers: ['A', 'B'], answerCount: 2,
        explanationFr: "La double ligne continue est une interdiction absolue de franchissement et de chevauchement. Aucune exception n'est prévue, même pour dépasser un cycliste ou en cas d'urgence personnelle. Seuls les véhicules d'urgence en intervention peuvent exceptionnellement la franchir.",
        explanationEn: "The double continuous line is an absolute no-crossing and no-straddling prohibition. No exceptions are allowed, even to overtake a cyclist or in a personal emergency. Only emergency vehicles on active duty may exceptionally cross it.",
        trapNote: "Both A and B are correct — the prohibition is absolute AND there are no exceptions. Students may pick only one.",
        distractorNotes: {
            C: "Personal emergency does not override road markings.",
            D: "Good visibility does not permit crossing a double continuous line."
        },
        vocabulary: [
            { wordFr: "double ligne continue", wordEn: "double continuous line", definition: "Two unbroken parallel lines separating traffic directions — absolute no-crossing" },
            { wordFr: "chevaucher", wordEn: "to straddle", definition: "To drive with wheels on both sides of a road marking" }
        ]
    },
    {
        id: 'croi-028', topic: 'croisement_depassement', difficulty: 2, signs: [],
        questionFr: "Quelle distance de sécurité devez-vous maintenir derrière une moto en circulation ?",
        questionEn: "What following distance must you maintain behind a motorcycle in traffic?",
        options: {
            A: { fr: "La même distance que pour un véhicule : au moins 2 secondes", en: "The same distance as for a vehicle: at least 2 seconds" },
            B: { fr: "1 seconde suffit car la moto est plus petite", en: "1 second is enough because the motorcycle is smaller" },
            C: { fr: "Il faut être plus proche pour mieux la voir", en: "You should be closer to see it better" },
            D: { fr: "Aucune distance n'est requise", en: "No distance is required" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "La distance de sécurité de 2 secondes minimum s'applique quel que soit le type de véhicule suivi, y compris les motos. En réalité, une distance plus grande est recommandée car les motos peuvent freiner plus brusquement.",
        explanationEn: "The minimum 2-second following distance applies regardless of the type of vehicle ahead, including motorcycles. In practice, a greater distance is recommended because motorcycles can brake more abruptly.",
        trapNote: "Students think motorcycles are smaller so less distance is needed — the opposite logic should apply since they can stop faster.",
        distractorNotes: {
            B: "Size doesn't reduce the required distance — motorcycles can actually stop faster than cars.",
            C: "Being closer increases danger, especially with a vulnerable road user.",
            D: "A following distance is always legally required."
        },
        vocabulary: [
            { wordFr: "distance de sécurité", wordEn: "following distance", definition: "The safe gap between your vehicle and the one ahead, measured in seconds" },
            { wordFr: "deux-roues", wordEn: "two-wheeler", definition: "Motorcycles, scooters, and mopeds" }
        ]
    },
    {
        id: 'croi-029', topic: 'croisement_depassement', difficulty: 3, signs: [],
        questionFr: "Sur autoroute, en cas d'embouteillage, comment doit-on créer un couloir d'urgence ?",
        questionEn: "On a motorway, in a traffic jam, how should you create an emergency corridor?",
        options: {
            A: { fr: "Les véhicules de la voie de gauche se décalent à gauche, ceux des autres voies se décalent à droite", en: "Vehicles in the left lane move left, those in other lanes move right" },
            B: { fr: "Tous les véhicules se rangent sur la bande d'arrêt d'urgence", en: "All vehicles move to the hard shoulder" },
            C: { fr: "Seuls les poids lourds doivent se décaler", en: "Only trucks must move over" },
            D: { fr: "Il n'existe aucune obligation de créer un couloir d'urgence", en: "There is no obligation to create an emergency corridor" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Le couloir d'urgence (ou corridor de secours) est obligatoire en cas de bouchon sur autoroute. Les véhicules de la voie la plus à gauche se décalent à gauche, et tous les autres véhicules se décalent vers la droite, créant un passage entre les deux flux.",
        explanationEn: "The emergency corridor is mandatory during a motorway traffic jam. Vehicles in the leftmost lane move left, and all other vehicles move right, creating a passage between the two flows.",
        trapNote: "The corridor is between the leftmost lane and the next lane — NOT on the hard shoulder. The hard shoulder may be obstructed or too narrow.",
        distractorNotes: {
            B: "The hard shoulder is not the emergency corridor — it may be blocked or occupied.",
            C: "All vehicles must participate, not just trucks.",
            D: "The emergency corridor is a legal obligation since 2021."
        },
        vocabulary: [
            { wordFr: "couloir d'urgence", wordEn: "emergency corridor", definition: "A gap created between lanes during traffic jams for emergency vehicles" },
            { wordFr: "bande d'arrêt d'urgence (BAU)", wordEn: "hard shoulder", definition: "The emergency stopping lane on the right side of a motorway" }
        ]
    },
    {
        id: 'croi-030', topic: 'croisement_depassement', difficulty: 2, signs: [],
        questionFr: "En tunnel, quelle est la distance de sécurité minimale à respecter ?",
        questionEn: "In a tunnel, what is the minimum following distance to maintain?",
        options: {
            A: { fr: "La distance normale de 2 secondes", en: "The normal 2-second distance" },
            B: { fr: "Le double de la distance normale, soit environ 4 secondes ou 100 mètres à 50 km/h", en: "Double the normal distance, approximately 4 seconds or 100 metres at 50 km/h" },
            C: { fr: "La moitié de la distance normale", en: "Half the normal distance" },
            D: { fr: "10 mètres suffisent en tunnel", en: "10 metres is enough in a tunnel" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Dans un tunnel, la distance de sécurité est doublée par rapport à la normale. En général, il est recommandé de maintenir au moins 100 mètres de distance ou environ 4 secondes. Les conditions confinées rendent tout accident plus grave.",
        explanationEn: "In a tunnel, the following distance is doubled compared to normal. Generally, at least 100 metres or about 4 seconds is recommended. The confined conditions make any accident more serious.",
        trapNote: "Double distance in tunnels is a frequently tested rule. Students often default to the standard 2-second rule.",
        distractorNotes: {
            A: "2 seconds is the open-road standard — tunnels require double.",
            C: "Reducing distance in a tunnel would be extremely dangerous.",
            D: "10 metres is far too short for any meaningful following distance."
        },
        vocabulary: [
            { wordFr: "tunnel", wordEn: "tunnel", definition: "An enclosed passage for road traffic, with specific safety rules" }
        ]
    },
    {
        id: 'croi-031', topic: 'croisement_depassement', difficulty: 1, signs: [],
        questionFr: "Quand un véhicule devant vous signale qu'il tourne à gauche, par quel côté le dépassez-vous ?",
        questionEn: "When a vehicle ahead signals a left turn, on which side do you pass it?",
        options: {
            A: { fr: "Par la gauche comme d'habitude", en: "On the left as usual" },
            B: { fr: "Par la droite", en: "On the right" },
            C: { fr: "Vous ne pouvez pas le dépasser", en: "You cannot overtake it" },
            D: { fr: "Vous attendez qu'il ait tourné", en: "You wait until it has turned" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Lorsqu'un véhicule signale qu'il va tourner à gauche et se déporte vers la gauche, vous devez le dépasser par la droite (art. R414-6). C'est l'une des rares exceptions au dépassement par la gauche.",
        explanationEn: "When a vehicle signals a left turn and moves to the left, you must overtake on the right (Article R414-6). This is one of the rare exceptions to the left-side overtaking rule.",
        trapNote: "This is a basic but important exception to remember — left-turner = pass on the right.",
        distractorNotes: {
            A: "Passing on the left a vehicle turning left would mean entering oncoming traffic.",
            C: "You can overtake — the right side is available.",
            D: "Waiting is not required if the right side is clear and safe."
        },
        vocabulary: [
            { wordFr: "se déporter", wordEn: "to move over/swerve", definition: "When a vehicle shifts its position laterally within or across lanes" }
        ]
    },

    // === ARRÊT / STATIONNEMENT — Batch 3 (arret-021 to arret-031) ===
    {
        id: 'arret-021', topic: 'arret_stationnement', difficulty: 2, signs: [],
        questionFr: "Qu'est-ce que la carte mobilité inclusion (CMI) mention « stationnement » et quels droits donne-t-elle ?",
        questionEn: "What is the CMI (Inclusion Mobility Card) with 'parking' mention and what rights does it grant?",
        options: {
            A: { fr: "Elle permet de stationner gratuitement et sans limitation de durée sur toutes les places, y compris les places réservées aux personnes handicapées", en: "It allows free, unlimited parking on all spaces, including those reserved for disabled persons" },
            B: { fr: "Elle permet uniquement de stationner sur les places handicapées payantes", en: "It only allows parking in paid disabled spaces" },
            C: { fr: "Elle dispense de tout stationnement payant mais pas de la durée maximale", en: "It exempts from paid parking but not maximum duration" },
            D: { fr: "Elle ne donne aucun avantage pour le stationnement", en: "It gives no parking advantage" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "La CMI mention « stationnement » (anciennement carte GIC/GIG) permet à son titulaire de stationner gratuitement et sans limitation de durée sur l'ensemble des places de stationnement ouvertes au public, y compris les places réservées.",
        explanationEn: "The CMI 'parking' mention (formerly GIC/GIG card) allows its holder to park free of charge and without time limits on all public parking spaces, including reserved disabled spaces.",
        trapNote: "The card gives BOTH free AND unlimited duration — students often think it is one or the other but not both.",
        distractorNotes: {
            B: "The card works on ALL spaces, not just designated disabled ones.",
            C: "The CMI exempts from BOTH payment AND time limits.",
            D: "The CMI gives very significant parking advantages."
        },
        vocabulary: [
            { wordFr: "carte mobilité inclusion (CMI)", wordEn: "Inclusion Mobility Card", definition: "Official French card replacing older disability cards (GIC/GIG), granting parking and accessibility rights" },
            { wordFr: "place réservée", wordEn: "reserved space", definition: "Parking spot designated for specific users, typically marked with the wheelchair symbol" }
        ]
    },
    {
        id: 'arret-022', topic: 'arret_stationnement', difficulty: 2, signs: [],
        questionFr: "Pouvez-vous stationner sur un emplacement de recharge pour véhicules électriques si votre véhicule n'est pas électrique ?",
        questionEn: "Can you park in an electric vehicle charging space if your vehicle is not electric?",
        options: {
            A: { fr: "Oui, si aucun véhicule électrique n'attend", en: "Yes, if no electric vehicle is waiting" },
            B: { fr: "Oui, pendant 10 minutes maximum", en: "Yes, for a maximum of 10 minutes" },
            C: { fr: "Non, ces places sont réservées aux véhicules électriques en charge", en: "No, these spaces are reserved for electric vehicles that are charging" },
            D: { fr: "Oui, la nuit uniquement", en: "Yes, at night only" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Les emplacements de recharge pour véhicules électriques sont strictement réservés aux véhicules en cours de charge. Le stationnement d'un véhicule thermique sur ces places est passible d'une amende de 35 € (4e classe).",
        explanationEn: "Electric vehicle charging spaces are strictly reserved for vehicles that are actively charging. Parking a combustion engine vehicle in these spaces is subject to a fine of EUR 35 (4th class offence).",
        trapNote: "Even an electric vehicle that is NOT charging should not occupy these spaces indefinitely — they are for active charging.",
        distractorNotes: {
            A: "Availability of the space doesn't change the restriction.",
            B: "No time-limited exception exists for non-electric vehicles.",
            D: "Time of day does not affect this restriction."
        },
        vocabulary: [
            { wordFr: "borne de recharge", wordEn: "charging station", definition: "An electric point where electric vehicles can recharge their batteries" },
            { wordFr: "véhicule électrique", wordEn: "electric vehicle", definition: "A vehicle powered by an electric motor and battery" }
        ]
    },
    {
        id: 'arret-023', topic: 'arret_stationnement', difficulty: 3, signs: [],
        questionFr: "Quelles sont les règles concernant les zones de livraison ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "What are the rules for delivery zones? (Select all correct answers)",
        options: {
            A: { fr: "Les véhicules de livraison peuvent s'y arrêter pendant le temps nécessaire au chargement/déchargement", en: "Delivery vehicles may stop for the time needed for loading/unloading" },
            B: { fr: "Les particuliers peuvent s'y garer librement le dimanche", en: "Private individuals can park freely on Sundays" },
            C: { fr: "Le stationnement prolongé y est interdit même pour les livreurs", en: "Extended parking is prohibited even for delivery drivers" },
            D: { fr: "Les horaires de livraison sont définis par arrêté municipal", en: "Delivery hours are defined by municipal decree" }
        },
        correctAnswers: ['A', 'C', 'D'], answerCount: 3,
        explanationFr: "Les zones de livraison permettent l'arrêt pour chargement/déchargement mais pas le stationnement prolongé. Les horaires autorisés sont fixés par arrêté municipal (souvent 7h-20h). En dehors des horaires, les règles varient selon la commune.",
        explanationEn: "Delivery zones allow stopping for loading/unloading but not extended parking. Authorised hours are set by municipal decree (often 7am-8pm). Outside these hours, rules vary by municipality.",
        trapNote: "Even delivery drivers cannot PARK in these zones — they must be actively loading/unloading. And Sunday rules vary by city.",
        distractorNotes: {
            B: "Sunday rules depend on the municipality — there is no blanket authorisation for private vehicles."
        },
        vocabulary: [
            { wordFr: "zone de livraison", wordEn: "delivery zone", definition: "A marked area reserved for commercial loading and unloading operations" },
            { wordFr: "arrêté municipal", wordEn: "municipal decree", definition: "A local government order regulating specific activities in the commune" }
        ]
    },
    {
        id: 'arret-024', topic: 'arret_stationnement', difficulty: 2, signs: [],
        questionFr: "Quelles affirmations sont correctes concernant le stationnement en zone bleue ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "Which statements are correct about parking in a blue zone? (Select all correct answers)",
        options: {
            A: { fr: "Le stationnement en zone bleue est gratuit", en: "Parking in a blue zone is free" },
            B: { fr: "La durée de stationnement est limitée (généralement 1h30)", en: "Parking time is limited (usually 1h30)" },
            C: { fr: "Il faut afficher un disque de stationnement visible sur le tableau de bord", en: "You must display a parking disc visibly on the dashboard" },
            D: { fr: "Le disque bleu permet un stationnement illimité", en: "The blue disc allows unlimited parking" }
        },
        correctAnswers: ['A', 'B', 'C'], answerCount: 3,
        explanationFr: "La zone bleue utilise un disque de stationnement gratuit à placer visiblement sur le tableau de bord. La durée est limitée (souvent 1h30). Le non-respect de la durée ou l'absence de disque entraîne une amende.",
        explanationEn: "The blue zone uses a free parking disc placed visibly on the dashboard. Time is limited (often 1h30). Exceeding the time limit or not displaying the disc results in a fine.",
        trapNote: "Three correct answers: free + time-limited + disc required. Students often miss that the disc display is mandatory.",
        distractorNotes: {
            D: "The blue disc is specifically for time-LIMITED parking — the opposite of unlimited."
        },
        vocabulary: [
            { wordFr: "horodateur", wordEn: "parking meter", definition: "A machine that dispenses time-stamped parking tickets for a fee" },
            { wordFr: "disque de stationnement", wordEn: "parking disc", definition: "A cardboard clock disc placed on the dashboard showing arrival time in free blue zones" },
            { wordFr: "zone bleue", wordEn: "blue zone", definition: "A free parking area with time limits enforced by parking discs" }
        ]
    },
    {
        id: 'arret-025', topic: 'arret_stationnement', difficulty: 1, signs: [],
        questionFr: "Dans quel sens devez-vous garer votre véhicule par rapport au sens de circulation ?",
        questionEn: "In which direction must you park your vehicle relative to the traffic flow?",
        options: {
            A: { fr: "Dans le sens de la circulation", en: "In the direction of traffic flow" },
            B: { fr: "Contre le sens de la circulation pour mieux voir en repartant", en: "Against traffic flow to see better when leaving" },
            C: { fr: "Peu importe le sens", en: "Direction doesn't matter" },
            D: { fr: "Perpendiculairement à la chaussée", en: "Perpendicular to the road" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "On doit stationner dans le sens de la circulation (art. R417-1). Se garer à contresens est interdit car cela oblige à traverser la chaussée à contresens pour se garer et repartir, ce qui est dangereux.",
        explanationEn: "You must park in the direction of traffic flow (Article R417-1). Parking against the flow is prohibited because it requires crossing the road against traffic to park and leave, which is dangerous.",
        trapNote: "This seems obvious but is frequently violated in practice and tested on the exam.",
        distractorNotes: {
            B: "Parking against traffic is dangerous and illegal.",
            C: "Direction absolutely matters — it must match the traffic flow.",
            D: "Perpendicular parking is only allowed in marked bays designed for it."
        },
        vocabulary: [
            { wordFr: "sens de la circulation", wordEn: "direction of traffic flow", definition: "The direction that vehicles normally travel on that side of the road" },
            { wordFr: "contresens", wordEn: "against traffic/wrong way", definition: "Facing the opposite direction to normal traffic flow" }
        ]
    },
    {
        id: 'arret-026', topic: 'arret_stationnement', difficulty: 3, signs: [],
        questionFr: "Comment positionner vos roues lorsque vous stationnez en côte montante le long du trottoir ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "How should you position your wheels when parked uphill alongside the kerb? (Select all correct answers)",
        options: {
            A: { fr: "Braquer les roues avant vers la chaussée (à gauche)", en: "Turn front wheels towards the road (left)" },
            B: { fr: "Braquer les roues avant vers le trottoir (à droite)", en: "Turn front wheels towards the kerb (right)" },
            C: { fr: "Laisser les roues droites et serrer le frein à main", en: "Leave wheels straight and engage handbrake" },
            D: { fr: "Engager une vitesse (première) en plus du frein à main", en: "Engage a gear (first) in addition to the handbrake" }
        },
        correctAnswers: ['A', 'D'], answerCount: 2,
        explanationFr: "En montée, les roues doivent être braquées vers la chaussée (à gauche) pour que, si le véhicule recule, la roue avant vienne buter contre le trottoir. On engage aussi la première vitesse et le frein à main.",
        explanationEn: "Going uphill, wheels must be turned towards the road (left) so that if the vehicle rolls back, the front wheel catches the kerb. You also engage first gear and the handbrake.",
        trapNote: "Uphill = wheels towards road (left). Downhill = wheels towards kerb (right). Students mix these up constantly.",
        distractorNotes: {
            B: "Towards the kerb is the rule for DOWNHILL, not uphill.",
            C: "Straight wheels provide no protection against rolling — they must be angled."
        },
        vocabulary: [
            { wordFr: "braquer", wordEn: "to turn (the steering wheel)", definition: "To rotate the steering wheel to angle the front wheels" },
            { wordFr: "côte montante", wordEn: "uphill slope", definition: "A road surface that goes up in the direction of travel" },
            { wordFr: "frein à main", wordEn: "handbrake/parking brake", definition: "A brake that holds the vehicle stationary when parked" }
        ]
    },
    {
        id: 'arret-027', topic: 'arret_stationnement', difficulty: 3, signs: [],
        questionFr: "Votre véhicule a été mis en fourrière. Quelles affirmations sont correctes ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "Your vehicle has been impounded. Which statements are correct? (Select all correct answers)",
        options: {
            A: { fr: "Vous devez payer les frais d'enlèvement et de garde journalière", en: "You must pay towing and daily storage fees" },
            B: { fr: "Vous avez 30 jours pour récupérer le véhicule, sinon il sera détruit ou vendu", en: "You have 30 days to recover the vehicle, otherwise it will be destroyed or sold" },
            C: { fr: "Le véhicule est restitué gratuitement après 48 heures", en: "The vehicle is returned for free after 48 hours" },
            D: { fr: "Aucune action n'est nécessaire, le véhicule sera ramené à domicile", en: "No action is needed, the vehicle will be returned home" }
        },
        correctAnswers: ['A', 'B'], answerCount: 2,
        explanationFr: "En cas de mise en fourrière, le propriétaire doit payer les frais (enlèvement + garde journalière qui s'accumulent) et dispose de 30 jours pour récupérer son véhicule. Passé ce délai, le véhicule peut être vendu ou détruit. Une contestation est possible mais ne suspend pas les frais.",
        explanationEn: "When impounded, the owner must pay fees (towing + daily storage that accumulates) and has 30 days to recover their vehicle. After this period, the vehicle may be sold or destroyed. A contest is possible but does not suspend fees.",
        trapNote: "Both A and B are correct — fees apply AND there is a strict 30-day deadline. Students underestimate the urgency.",
        distractorNotes: {
            C: "There is no free return period — fees apply from day one.",
            D: "The vehicle will never be returned automatically."
        },
        vocabulary: [
            { wordFr: "fourrière", wordEn: "impound lot/tow pound", definition: "An official facility where illegally parked or abandoned vehicles are stored" },
            { wordFr: "frais d'enlèvement", wordEn: "towing charges", definition: "The fee charged for towing a vehicle to the impound" },
            { wordFr: "garde journalière", wordEn: "daily storage fee", definition: "The daily charge for keeping a vehicle in the impound lot" }
        ]
    },
    {
        id: 'arret-028', topic: 'arret_stationnement', difficulty: 2, signs: [],
        questionFr: "À quelle distance minimale d'une bouche d'incendie est-il interdit de stationner ?",
        questionEn: "What is the minimum distance from a fire hydrant where parking is prohibited?",
        options: {
            A: { fr: "3 mètres", en: "3 metres" },
            B: { fr: "5 mètres", en: "5 metres" },
            C: { fr: "10 mètres", en: "10 metres" },
            D: { fr: "Aucune distance spécifique", en: "No specific distance" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Il est interdit de stationner à moins de 5 mètres d'une bouche d'incendie. Cette distance permet aux pompiers d'y raccorder rapidement leurs tuyaux en cas d'intervention.",
        explanationEn: "Parking is prohibited within 5 metres of a fire hydrant. This distance allows firefighters to quickly connect their hoses during an intervention.",
        trapNote: "5 metres, not 3 — a common confusion with intersection distance rules.",
        distractorNotes: {
            A: "3 metres is too close — the required clearance is 5 metres.",
            C: "10 metres is the rule for intersections, not fire hydrants.",
            D: "There IS a specific distance — 5 metres."
        },
        vocabulary: [
            { wordFr: "bouche d'incendie", wordEn: "fire hydrant", definition: "A connection point on the water supply system for firefighting" }
        ]
    },
    {
        id: 'arret-029', topic: 'arret_stationnement', difficulty: 1, signs: ['no_stopping'],
        questionFr: "Quelle est la relation entre l'interdiction de s'arrêter et l'interdiction de stationner ?",
        questionEn: "What is the relationship between a no-stopping and a no-parking prohibition?",
        options: {
            A: { fr: "L'interdiction de s'arrêter inclut l'interdiction de stationner", en: "No stopping includes no parking" },
            B: { fr: "L'interdiction de stationner inclut l'interdiction de s'arrêter", en: "No parking includes no stopping" },
            C: { fr: "Ce sont deux interdictions indépendantes", en: "They are two independent prohibitions" },
            D: { fr: "L'arrêt et le stationnement sont la même chose", en: "Stopping and parking are the same thing" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "L'interdiction de s'arrêter est plus stricte que l'interdiction de stationner. Si l'arrêt est interdit, le stationnement l'est forcément aussi (on ne peut pas stationner sans d'abord s'arrêter). Mais une interdiction de stationner autorise l'arrêt bref.",
        explanationEn: "No stopping is stricter than no parking. If stopping is prohibited, parking is necessarily also prohibited (you cannot park without first stopping). But a no-parking zone still allows brief stops.",
        trapNote: "The hierarchy: no stopping > no parking. No stopping = you cannot even pause briefly. No parking = you CAN stop briefly but not stay.",
        distractorNotes: {
            B: "The hierarchy is reversed — stopping is stricter than parking.",
            C: "They are NOT independent — there is a clear hierarchy.",
            D: "Stopping and parking are legally distinct concepts."
        },
        vocabulary: [
            { wordFr: "arrêt", wordEn: "stopping", definition: "Immobilisation momentanée du véhicule, moteur tournant, conducteur présent" },
            { wordFr: "stationnement", wordEn: "parking", definition: "Immobilisation prolongée du véhicule — conducteur absent ou moteur coupé" }
        ]
    },
    {
        id: 'arret-030', topic: 'arret_stationnement', difficulty: 2, signs: [],
        questionFr: "Que signifient les marquages jaunes sur le bord du trottoir ?",
        questionEn: "What do yellow markings on the kerb edge mean?",
        options: {
            A: { fr: "Ligne jaune continue = arrêt et stationnement interdits ; ligne jaune discontinue = stationnement interdit mais arrêt autorisé", en: "Continuous yellow line = no stopping or parking; dashed yellow line = no parking but stopping allowed" },
            B: { fr: "Ligne jaune = stationnement réservé aux taxis", en: "Yellow line = parking reserved for taxis" },
            C: { fr: "Ligne jaune = zone de livraison uniquement", en: "Yellow line = delivery zone only" },
            D: { fr: "Ligne jaune = stationnement payant", en: "Yellow line = paid parking" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Un marquage jaune continu sur le trottoir interdit l'arrêt ET le stationnement. Un marquage jaune discontinu interdit le stationnement mais autorise l'arrêt bref (montée/descente de passagers). Ces marquages ont un caractère temporaire ou local.",
        explanationEn: "A continuous yellow kerb marking prohibits both stopping AND parking. A dashed yellow kerb marking prohibits parking but allows brief stopping (passenger drop-off/pick-up). These markings have a temporary or local character.",
        trapNote: "Yellow continuous = no stopping at all. Yellow dashed = no parking but brief stops OK. Same continuous/dashed logic as road lines.",
        distractorNotes: {
            B: "Taxis have specific markings — yellow kerb lines are general prohibitions.",
            C: "Delivery zones have their own specific markings and signage.",
            D: "Yellow lines indicate prohibition, not payment requirements."
        },
        vocabulary: [
            { wordFr: "marquage jaune", wordEn: "yellow marking", definition: "Temporary or local road markings painted on kerbs indicating parking/stopping restrictions" }
        ]
    },
    {
        id: 'arret-031', topic: 'arret_stationnement', difficulty: 2, signs: [],
        questionFr: "Dans une zone de rencontre (zone 20), quelles sont les règles de stationnement ?",
        questionEn: "In a shared zone (zone 20), what are the parking rules?",
        options: {
            A: { fr: "Le stationnement est autorisé uniquement sur les emplacements matérialisés", en: "Parking is only allowed in marked spaces" },
            B: { fr: "Le stationnement est libre partout", en: "Parking is free everywhere" },
            C: { fr: "Le stationnement est totalement interdit", en: "Parking is completely prohibited" },
            D: { fr: "Le stationnement est autorisé sur les trottoirs", en: "Parking is allowed on pavements" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Dans une zone de rencontre (limitée à 20 km/h), les piétons ont la priorité et le stationnement n'est autorisé que sur les emplacements signalés. Le stationnement sauvage y est sanctionné car il gêne la cohabitation piétons-véhicules.",
        explanationEn: "In a shared zone (limited to 20 km/h), pedestrians have priority and parking is only allowed in designated spaces. Illegal parking is penalised because it disrupts the pedestrian-vehicle coexistence.",
        trapNote: "Shared zones prioritise pedestrians — parking must be strictly in marked bays to keep the space safe and accessible.",
        distractorNotes: {
            B: "Free parking everywhere would defeat the purpose of pedestrian priority.",
            C: "Parking is not totally banned — it is allowed in marked spaces.",
            D: "Pavement parking is especially forbidden in pedestrian-priority zones."
        },
        vocabulary: [
            { wordFr: "zone de rencontre", wordEn: "shared zone/encounter zone", definition: "A zone limited to 20 km/h where pedestrians have absolute priority" },
            { wordFr: "emplacement matérialisé", wordEn: "marked parking space", definition: "A parking bay delineated by road markings" }
        ]
    },

    // === TUNNELS / PASSAGES À NIVEAU — Batch 3 (tunn-021 to tunn-031) ===
    {
        id: 'tunn-021', topic: 'tunnels_passages_niveau', difficulty: 3, signs: [],
        questionFr: "En cas d'incendie dans un tunnel, quelle est la procédure exacte ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "In case of fire in a tunnel, what is the exact procedure? (Select all correct answers)",
        options: {
            A: { fr: "Couper le moteur et laisser les clés sur le contact (ou dans le véhicule)", en: "Turn off the engine and leave the keys in the ignition (or in the vehicle)" },
            B: { fr: "Ne pas verrouiller le véhicule pour faciliter le déplacement par les secours", en: "Do not lock the vehicle to allow rescue services to move it" },
            C: { fr: "Se diriger vers l'issue de secours la plus proche à pied", en: "Walk to the nearest emergency exit" },
            D: { fr: "Reculer avec le véhicule pour sortir du tunnel", en: "Reverse the vehicle to exit the tunnel" }
        },
        correctAnswers: ['A', 'B', 'C'], answerCount: 3,
        explanationFr: "En cas d'incendie en tunnel : 1) Arrêter le véhicule, couper le moteur. 2) Laisser les clés sur le contact (ou dans le véhicule) et NE PAS verrouiller pour que les secours puissent déplacer le véhicule. 3) Évacuer à pied vers l'issue de secours la plus proche. JAMAIS faire demi-tour ou reculer.",
        explanationEn: "In a tunnel fire: 1) Stop the vehicle, turn off the engine. 2) Leave keys in the ignition (or in the vehicle) and DO NOT lock so rescue services can move the vehicle. 3) Evacuate on foot to the nearest emergency exit. NEVER turn around or reverse.",
        trapNote: "Three key rules: keys IN, doors UNLOCKED, walk to exit. Reversing is the most dangerous instinct to resist.",
        distractorNotes: {
            D: "Reversing in a smoke-filled tunnel is extremely dangerous — visibility is zero and you risk colliding with other vehicles."
        },
        vocabulary: [
            { wordFr: "issue de secours", wordEn: "emergency exit", definition: "A specially marked exit in a tunnel leading to a safe area or the outside" },
            { wordFr: "contact", wordEn: "ignition", definition: "The ignition switch where the key is inserted to start the vehicle" }
        ]
    },
    {
        id: 'tunn-022', topic: 'tunnels_passages_niveau', difficulty: 2, signs: [],
        questionFr: "Quels sont les différents types de passages à niveau en France ?",
        questionEn: "What are the different types of level crossings in France?",
        options: {
            A: { fr: "SAL 2 (2 demi-barrières), SAL 4 (4 demi-barrières), passages à niveau manuels, et passages sans barrières", en: "SAL 2 (2 half-barriers), SAL 4 (4 half-barriers), manual level crossings, and crossings without barriers" },
            B: { fr: "Uniquement des passages automatiques avec barrières", en: "Only automatic crossings with barriers" },
            C: { fr: "Passages à niveau souterrains et aériens", en: "Underground and aerial level crossings" },
            D: { fr: "Passages piétons ferroviaires uniquement", en: "Railway pedestrian crossings only" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "En France : SAL 2 = 2 demi-barrières automatiques (le plus courant), SAL 4 = 4 demi-barrières fermant complètement la voie, passages manuels avec gardien, et passages sans barrières (croix de Saint-André seule). Chaque type requiert une vigilance différente.",
        explanationEn: "In France: SAL 2 = 2 automatic half-barriers (most common), SAL 4 = 4 half-barriers fully closing the road, manual crossings with an attendant, and crossings without barriers (St Andrew's cross only). Each type requires different levels of vigilance.",
        trapNote: "SAL 2 has gaps between barriers — you could technically drive around them, but it is absolutely forbidden and lethal.",
        distractorNotes: {
            B: "There are several types, not just automatic ones.",
            C: "Level crossings are at-grade by definition — not underground or aerial.",
            D: "Level crossings are for all road traffic, not just pedestrians."
        },
        vocabulary: [
            { wordFr: "SAL", wordEn: "Automatic Light Signal", definition: "Signalisation Automatique Lumineuse — automated level crossing warning system" },
            { wordFr: "demi-barrière", wordEn: "half-barrier", definition: "A barrier covering only one side of the road at a level crossing" },
            { wordFr: "croix de Saint-André", wordEn: "St Andrew's cross", definition: "An X-shaped sign marking a level crossing" }
        ]
    },
    {
        id: 'tunn-023', topic: 'tunnels_passages_niveau', difficulty: 2, signs: [],
        questionFr: "Le feu rouge d'un passage à niveau clignote mais les barrières sont levées. Quelles affirmations sont vraies ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "The red light at a level crossing is flashing but the barriers are up. Which statements are true? (Select all correct answers)",
        options: {
            A: { fr: "L'arrêt est obligatoire — le feu rouge clignotant est l'ordre d'arrêt absolu", en: "Stopping is mandatory — the flashing red light is the absolute stop order" },
            B: { fr: "La position des barrières est sans importance quand le feu rouge clignote", en: "The barrier position is irrelevant when the red light is flashing" },
            C: { fr: "Ralentir et passer prudemment suffit", en: "Slowing down and passing carefully is sufficient" },
            D: { fr: "On peut passer rapidement si les barrières sont levées", en: "You can pass quickly if the barriers are up" }
        },
        correctAnswers: ['A', 'B'], answerCount: 2,
        explanationFr: "Le feu rouge clignotant à un passage à niveau signifie ARRÊT ABSOLU, quelle que soit la position des barrières. Les barrières peuvent être en panne, ou le train peut approcher à très grande vitesse. Franchir ce feu est une infraction de 4e classe (perte de 4 points).",
        explanationEn: "The flashing red light at a level crossing means ABSOLUTE STOP, regardless of barrier position. The barriers could be malfunctioning, or a train may be approaching at high speed. Crossing this light is a 4th-class offence (loss of 4 points).",
        trapNote: "Both A and B are correct — the stop is absolute AND barrier position does not matter. The light is the primary signal.",
        distractorNotes: {
            C: "Slowing down is not sufficient — a complete stop is mandatory.",
            D: "Barriers up does NOT mean it is safe — the light takes priority."
        },
        vocabulary: [
            { wordFr: "feu rouge clignotant", wordEn: "flashing red light", definition: "A red light that flashes on and off, indicating an absolute stop requirement at level crossings" }
        ]
    },
    {
        id: 'tunn-024', topic: 'tunnels_passages_niveau', difficulty: 2, signs: [],
        questionFr: "Pourquoi est-il impossible d'évaluer correctement la distance d'un train en approche ?",
        questionEn: "Why is it impossible to correctly judge the distance of an approaching train?",
        options: {
            A: { fr: "Parce que les trains sont silencieux", en: "Because trains are silent" },
            B: { fr: "Parce que la vitesse élevée et la taille du train créent une illusion — il semble plus loin et plus lent qu'il ne l'est", en: "Because the high speed and size of the train create an illusion — it appears farther and slower than it is" },
            C: { fr: "Parce que les rails déforment la perception visuelle", en: "Because the rails distort visual perception" },
            D: { fr: "Parce qu'on ne voit jamais le train arriver", en: "Because you never see the train coming" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Un train se déplace à grande vitesse (un TER peut rouler à 160 km/h, un TGV à 320 km/h) et sa taille massive crée une illusion d'optique : il semble se déplacer plus lentement et être plus éloigné qu'il ne l'est en réalité. C'est pourquoi on ne doit JAMAIS essayer de « passer avant le train ».",
        explanationEn: "A train moves at high speed (a regional train can travel at 160 km/h, a TGV at 320 km/h) and its massive size creates an optical illusion: it appears to move more slowly and be farther away than it actually is. This is why you must NEVER try to 'beat the train'.",
        trapNote: "The optical illusion is the key concept — the train looks slow and far but arrives in seconds. This is heavily tested.",
        distractorNotes: {
            A: "Trains are not silent — they produce significant noise, but noise alone doesn't help judge distance.",
            C: "Rails don't distort perception — it's the train's speed and size.",
            D: "You can often see the train, but you misjudge its speed."
        },
        vocabulary: [
            { wordFr: "passage à niveau", wordEn: "level crossing", definition: "Where a road crosses a railway track at the same level" },
            { wordFr: "illusion d'optique", wordEn: "optical illusion", definition: "A visual effect that deceives the brain about size, speed, or distance" }
        ]
    },
    {
        id: 'tunn-025', topic: 'tunnels_passages_niveau', difficulty: 2, signs: [],
        questionFr: "En tunnel, quelle fréquence radio devez-vous écouter ?",
        questionEn: "In a tunnel, which radio frequency should you tune to?",
        options: {
            A: { fr: "La fréquence indiquée à l'entrée du tunnel (généralement 107.7 MHz)", en: "The frequency indicated at the tunnel entrance (usually 107.7 MHz)" },
            B: { fr: "N'importe quelle station FM", en: "Any FM station" },
            C: { fr: "La radio n'est pas nécessaire en tunnel", en: "Radio is not necessary in a tunnel" },
            D: { fr: "La fréquence de la police nationale", en: "The national police frequency" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "À l'entrée des tunnels équipés, un panneau indique la fréquence radio (souvent 107.7 MHz) à écouter pour recevoir les consignes de sécurité en cas d'incident. Cette fréquence permet à l'exploitant du tunnel de diffuser des messages d'urgence.",
        explanationEn: "At the entrance of equipped tunnels, a sign indicates the radio frequency (often 107.7 MHz) to tune into for safety instructions in case of an incident. This frequency allows the tunnel operator to broadcast emergency messages.",
        trapNote: "107.7 MHz is the standard autoroute info frequency in France — and it is also used in tunnels for emergency broadcasts.",
        distractorNotes: {
            B: "Only the specific tunnel frequency will carry emergency messages.",
            C: "Radio is an essential safety tool in tunnels.",
            D: "The police frequency is not broadcast to the public."
        },
        vocabulary: [
            { wordFr: "fréquence radio", wordEn: "radio frequency", definition: "The specific FM frequency designated for safety information in a tunnel" }
        ]
    },
    {
        id: 'tunn-026', topic: 'tunnels_passages_niveau', difficulty: 1, signs: [],
        questionFr: "Quelle est la distance minimale de sécurité recommandée en tunnel ?",
        questionEn: "What is the recommended minimum following distance in a tunnel?",
        options: {
            A: { fr: "50 mètres ou 2 secondes", en: "50 metres or 2 seconds" },
            B: { fr: "100 mètres ou le double de la distance normale", en: "100 metres or double the normal distance" },
            C: { fr: "20 mètres", en: "20 metres" },
            D: { fr: "La même qu'en extérieur", en: "The same as outside" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "En tunnel, la distance de sécurité recommandée est de 100 mètres minimum, soit environ le double de la distance normale. Des repères de distance sont souvent peints sur les murs du tunnel pour aider les conducteurs.",
        explanationEn: "In a tunnel, the recommended following distance is at least 100 metres, approximately double the normal distance. Distance markers are often painted on the tunnel walls to help drivers.",
        trapNote: "Double the normal distance — 100m, not 50m. The confined space makes accidents much more dangerous.",
        distractorNotes: {
            A: "50 metres is roughly the normal following distance — tunnels need double.",
            C: "20 metres is dangerously close in any driving situation.",
            D: "Tunnels require increased distance due to confined conditions."
        },
        vocabulary: [
            { wordFr: "repères de distance", wordEn: "distance markers", definition: "Painted or posted indicators on tunnel walls showing the distance between vehicles" }
        ]
    },
    {
        id: 'tunn-027', topic: 'tunnels_passages_niveau', difficulty: 2, signs: [],
        questionFr: "Quel est le rôle du système de ventilation dans un tunnel routier ?",
        questionEn: "What is the role of the ventilation system in a road tunnel?",
        options: {
            A: { fr: "Uniquement rafraîchir l'air pour le confort", en: "Only to cool the air for comfort" },
            B: { fr: "Évacuer les gaz d'échappement en circulation normale et contrôler les fumées en cas d'incendie", en: "Evacuate exhaust gases during normal traffic and control smoke in case of fire" },
            C: { fr: "Créer un courant d'air pour pousser les véhicules", en: "Create an air current to push vehicles" },
            D: { fr: "Empêcher la pluie d'entrer dans le tunnel", en: "Prevent rain from entering the tunnel" }
        },
        correctAnswers: ['B'], answerCount: 1,
        explanationFr: "Le système de ventilation en tunnel a une double fonction : en conditions normales, il évacue les polluants (CO, NOx, particules). En cas d'incendie, il contrôle la direction des fumées pour maintenir un air respirable côté évacuation.",
        explanationEn: "The tunnel ventilation system has a dual function: in normal conditions, it evacuates pollutants (CO, NOx, particles). In case of fire, it controls smoke direction to maintain breathable air on the evacuation side.",
        trapNote: "The fire safety role is the critical one — ventilation directs smoke AWAY from the evacuation route.",
        distractorNotes: {
            A: "Comfort is a minor benefit — the primary roles are pollution control and fire safety.",
            C: "Ventilation does not move vehicles.",
            D: "Rain protection is handled by the tunnel structure, not ventilation."
        },
        vocabulary: [
            { wordFr: "ventilation", wordEn: "ventilation", definition: "The mechanical system that circulates and exchanges air within a tunnel" },
            { wordFr: "gaz d'échappement", wordEn: "exhaust gases", definition: "Pollutant gases emitted by vehicle engines" }
        ]
    },
    {
        id: 'tunn-028', topic: 'tunnels_passages_niveau', difficulty: 2, signs: [],
        questionFr: "Pourquoi les postes d'appel d'urgence (PAU) sont-ils préférables au téléphone portable en tunnel ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "Why are emergency call points (PAU) preferable to mobile phones in a tunnel? (Select all correct answers)",
        options: {
            A: { fr: "Ils contactent directement le PC sécurité du tunnel", en: "They connect directly to the tunnel safety control room" },
            B: { fr: "Ils localisent automatiquement l'appelant", en: "They automatically locate the caller" },
            C: { fr: "Ils fonctionnent même sans réseau mobile", en: "They work even without mobile network" },
            D: { fr: "Ils permettent de recharger son téléphone", en: "They allow you to charge your phone" }
        },
        correctAnswers: ['A', 'B', 'C'], answerCount: 3,
        explanationFr: "Les PAU sont préférables car : 1) Ils contactent directement le PC sécurité du tunnel (pas le 112 généraliste). 2) Ils localisent automatiquement l'appelant dans le tunnel. 3) Ils fonctionnent indépendamment du réseau mobile, qui peut être absent en tunnel. Ils sont situés tous les 200 m environ.",
        explanationEn: "PAU are preferable because: 1) They connect directly to the tunnel safety control room (not the general 112). 2) They automatically locate the caller in the tunnel. 3) They work independently of mobile networks, which may be unavailable in tunnels. They are located every 200 m approximately.",
        trapNote: "Three advantages of PAU over phones: direct line, auto-location, network-independent. All three make them the superior choice.",
        distractorNotes: {
            D: "PAU have no phone-charging capability — they are emergency communication devices only."
        },
        vocabulary: [
            { wordFr: "poste d'appel d'urgence (PAU)", wordEn: "emergency call point", definition: "A fixed telephone in a tunnel connected to the safety control room" },
            { wordFr: "PC sécurité", wordEn: "safety control room", definition: "The central monitoring station that oversees tunnel operations and safety" }
        ]
    },
    {
        id: 'tunn-029', topic: 'tunnels_passages_niveau', difficulty: 1, signs: [],
        questionFr: "Peut-on faire demi-tour dans un tunnel ?",
        questionEn: "Can you make a U-turn in a tunnel?",
        options: {
            A: { fr: "Oui, s'il n'y a pas de circulation", en: "Yes, if there is no traffic" },
            B: { fr: "Oui, en cas de bouchon", en: "Yes, in case of a traffic jam" },
            C: { fr: "Non, c'est absolument interdit en toutes circonstances", en: "No, it is absolutely prohibited under all circumstances" },
            D: { fr: "Oui, si le tunnel est assez large", en: "Yes, if the tunnel is wide enough" }
        },
        correctAnswers: ['C'], answerCount: 1,
        explanationFr: "Le demi-tour en tunnel est ABSOLUMENT interdit en toutes circonstances. En cas de bouchon ou d'incident, restez dans votre véhicule ou évacuez à pied vers l'issue de secours. Faire demi-tour créerait un danger mortel pour vous et les autres usagers.",
        explanationEn: "U-turns in tunnels are ABSOLUTELY prohibited under all circumstances. In case of a traffic jam or incident, stay in your vehicle or evacuate on foot to the emergency exit. Making a U-turn would create a lethal danger for you and other users.",
        trapNote: "Even in a fire or emergency, NEVER turn around. Walk to the nearest exit instead.",
        distractorNotes: {
            A: "Traffic conditions do not change this absolute prohibition.",
            B: "Traffic jams do NOT justify a U-turn — ever.",
            D: "Tunnel width is irrelevant — the prohibition is absolute."
        },
        vocabulary: [
            { wordFr: "demi-tour", wordEn: "U-turn", definition: "Turning a vehicle 180 degrees to travel in the opposite direction" }
        ]
    },
    {
        id: 'tunn-030', topic: 'tunnels_passages_niveau', difficulty: 3, signs: [],
        questionFr: "Vous êtes bloqué dans un embouteillage en tunnel. Que devez-vous faire ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "You are stuck in a traffic jam inside a tunnel. What should you do? (Select all correct answers)",
        options: {
            A: { fr: "Couper le moteur si l'arrêt se prolonge pour réduire les émissions polluantes", en: "Turn off the engine if the stop is prolonged to reduce emissions" },
            B: { fr: "Écouter la radio sur la fréquence tunnel pour les consignes", en: "Listen to the radio on the tunnel frequency for instructions" },
            C: { fr: "Maintenir les distances de sécurité et ne pas quitter le véhicule", en: "Maintain safety distances and do not leave the vehicle" },
            D: { fr: "Faire demi-tour pour sortir rapidement", en: "Make a U-turn to exit quickly" }
        },
        correctAnswers: ['A', 'B', 'C'], answerCount: 3,
        explanationFr: "En cas d'embouteillage en tunnel : coupez le moteur si l'arrêt est prolongé (réduction des polluants), écoutez la fréquence radio du tunnel, maintenez les distances et restez dans votre véhicule. Le demi-tour est TOUJOURS interdit.",
        explanationEn: "In a tunnel traffic jam: turn off the engine if the stop is prolonged (reduces pollutants), listen to the tunnel radio frequency, maintain distances and stay in your vehicle. U-turns are ALWAYS prohibited.",
        trapNote: "Three correct actions plus one absolute prohibition. The demi-tour trap catches students who panic.",
        distractorNotes: {
            D: "U-turns are NEVER permitted in a tunnel, even in an emergency or traffic jam."
        },
        vocabulary: [
            { wordFr: "embouteillage", wordEn: "traffic jam", definition: "A situation where traffic is at a standstill or moving very slowly" }
        ]
    },
    {
        id: 'tunn-031', topic: 'tunnels_passages_niveau', difficulty: 2, signs: [],
        questionFr: "Que signifient les panneaux à chevrons avant un passage à niveau (150 m, 100 m, 50 m) ?",
        questionEn: "What do the chevron signs before a level crossing (150 m, 100 m, 50 m) mean?",
        options: {
            A: { fr: "Ils indiquent la distance restante avant le passage à niveau : 3 barres = 150 m, 2 barres = 100 m, 1 barre = 50 m", en: "They indicate the remaining distance to the level crossing: 3 bars = 150 m, 2 bars = 100 m, 1 bar = 50 m" },
            B: { fr: "Ils indiquent le nombre de voies ferrées", en: "They indicate the number of railway tracks" },
            C: { fr: "Ils indiquent la vitesse maximale autorisée", en: "They indicate the maximum speed allowed" },
            D: { fr: "Ils sont purement décoratifs", en: "They are purely decorative" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Les balises de signalisation d'approche (J10) comportent des barres obliques (chevrons) : 3 barres à 150 m, 2 barres à 100 m, 1 barre à 50 m du passage à niveau. Elles permettent au conducteur d'évaluer sa distance d'approche et de ralentir progressivement.",
        explanationEn: "The approach warning signs (J10) feature diagonal bars (chevrons): 3 bars at 150 m, 2 bars at 100 m, 1 bar at 50 m from the level crossing. They allow the driver to assess their approach distance and slow down progressively.",
        trapNote: "3 bars = 150m (furthest), not the closest. Count DOWN as you approach. Some students reverse the logic.",
        distractorNotes: {
            B: "The number of tracks is indicated by the St Andrew's cross (single or double).",
            C: "These signs indicate distance, not speed.",
            D: "Every road sign has a legal purpose."
        },
        vocabulary: [
            { wordFr: "balises J10", wordEn: "J10 approach markers", definition: "Chevron countdown signs placed at 150m, 100m, and 50m before a level crossing" },
            { wordFr: "chevrons", wordEn: "chevrons/diagonal bars", definition: "Angled lines on signs indicating progressive approach distance" }
        ]
    },

    // === SIGNALISATION — Batch 3 (sign-021 to sign-031) ===
    {
        id: 'sign-021', topic: 'signalisation', difficulty: 2, signs: [],
        questionFr: "Quelles affirmations sont vraies concernant les panneaux temporaires à fond jaune ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "Which statements are true about temporary signs with a yellow background? (Select all correct answers)",
        options: {
            A: { fr: "Ils ont priorité sur les panneaux permanents", en: "They take priority over permanent signs" },
            B: { fr: "Ils ont une valeur réglementaire et sont obligatoires", en: "They have regulatory value and are mandatory" },
            C: { fr: "Ils s'appliquent uniquement la nuit", en: "They only apply at night" },
            D: { fr: "Ils sont mis en place lors de travaux ou de déviations", en: "They are installed during roadworks or diversions" }
        },
        correctAnswers: ['A', 'B', 'D'], answerCount: 3,
        explanationFr: "Les panneaux temporaires (fond jaune) ont TOUJOURS priorité sur les panneaux permanents, ont une valeur réglementaire obligatoire, et sont mis en place lors de travaux ou de déviations. En cas de contradiction avec un panneau permanent, suivez le panneau jaune.",
        explanationEn: "Temporary signs (yellow background) ALWAYS take priority over permanent signs, have mandatory regulatory value, and are installed during roadworks or diversions. In case of contradiction with a permanent sign, follow the yellow sign.",
        trapNote: "Three correct answers — students often only pick one. The key insight is that temporary signs are BOTH regulatory AND have priority.",
        distractorNotes: {
            C: "They apply at all times while installed, not just at night."
        },
        vocabulary: [
            { wordFr: "signalisation temporaire", wordEn: "temporary signage", definition: "Signs with yellow backgrounds installed for roadworks, diversions, or temporary hazards" },
            { wordFr: "panneaux permanents", wordEn: "permanent signs", definition: "Standard road signs on white or blue backgrounds that apply under normal conditions" }
        ]
    },
    {
        id: 'sign-022', topic: 'signalisation', difficulty: 3, signs: [],
        questionFr: "Que signifient les différentes couleurs des panneaux directionnels ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "What do the different colours of directional signs mean? (Select all correct answers)",
        options: {
            A: { fr: "Bleu = direction vers l'autoroute", en: "Blue = direction to motorway" },
            B: { fr: "Vert = direction vers une route nationale ou un itinéraire important", en: "Green = direction to a national road or major route" },
            C: { fr: "Blanc = direction locale ou communale", en: "White = local or municipal direction" },
            D: { fr: "Jaune = direction temporaire (déviation)", en: "Yellow = temporary direction (diversion)" }
        },
        correctAnswers: ['A', 'B', 'C', 'D'], answerCount: 4,
        explanationFr: "Code couleur des panneaux directionnels : Bleu = autoroute, Vert = route nationale ou itinéraire interurbain important, Blanc = route locale/communale/départementale, Jaune = déviation temporaire. Cette convention est constante sur tout le réseau français.",
        explanationEn: "Directional sign colour code: Blue = motorway, Green = national road or major inter-urban route, White = local/municipal/departmental road, Yellow = temporary diversion. This convention is consistent across the entire French network.",
        trapNote: "ALL FOUR are correct — this tests whether students know the complete colour code. Most remember blue and green but forget white and yellow.",
        distractorNotes: {},
        vocabulary: [
            { wordFr: "panneau directionnel", wordEn: "directional sign", definition: "A sign indicating the direction and distance to destinations" },
            { wordFr: "déviation", wordEn: "diversion/detour", definition: "An alternative route around a road closure or works zone" }
        ]
    },
    {
        id: 'sign-023', topic: 'signalisation', difficulty: 2, signs: [],
        questionFr: "Que sont les panneaux à messages variables (PMV) sur autoroute ?",
        questionEn: "What are variable message signs (VMS) on motorways?",
        options: {
            A: { fr: "Des écrans électroniques affichant des informations en temps réel sur le trafic, la météo et les dangers", en: "Electronic screens displaying real-time information about traffic, weather and hazards" },
            B: { fr: "Des panneaux publicitaires", en: "Advertising billboards" },
            C: { fr: "Des panneaux décoratifs", en: "Decorative panels" },
            D: { fr: "Des panneaux indiquant uniquement les péages", en: "Signs only indicating toll stations" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Les PMV (Panneaux à Messages Variables) sont des afficheurs électroniques gérés par les centres de gestion du trafic. Ils informent en temps réel : bouchons, accidents, vitesses recommandées, fermetures de voies, conditions météo. Leurs indications doivent être suivies.",
        explanationEn: "VMS (Variable Message Signs) are electronic displays managed by traffic management centres. They provide real-time information: traffic jams, accidents, recommended speeds, lane closures, weather conditions. Their instructions must be followed.",
        trapNote: "PMV instructions have regulatory value — if they show a speed limit, it must be obeyed even without a physical sign.",
        distractorNotes: {
            B: "Advertising on motorways is separate from PMV — they serve safety functions.",
            C: "They are functional safety devices, not decorative.",
            D: "They display a wide range of information, not just toll data."
        },
        vocabulary: [
            { wordFr: "panneau à message variable (PMV)", wordEn: "variable message sign (VMS)", definition: "An electronic motorway sign that displays changing information about traffic and safety" }
        ]
    },
    {
        id: 'sign-024', topic: 'signalisation', difficulty: 3, signs: [],
        questionFr: "Quelles affirmations sont correctes concernant les bornes kilométriques ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "Which statements are correct about kilometre markers? (Select all correct answers)",
        options: {
            A: { fr: "Rouge = route nationale (N)", en: "Red = national road (N)" },
            B: { fr: "Jaune = route départementale (D)", en: "Yellow = departmental road (D)" },
            C: { fr: "Rouge = danger, Jaune = attention", en: "Red = danger, Yellow = caution" },
            D: { fr: "Elles servent aussi à localiser précisément un incident pour les secours", en: "They also serve to precisely locate an incident for emergency services" }
        },
        correctAnswers: ['A', 'B', 'D'], answerCount: 3,
        explanationFr: "Les bornes kilométriques indiquent la catégorie de la route : rouge (N) = route nationale, jaune (D) = route départementale, bleue (A) = autoroute. Elles servent aussi de repère de localisation pour les secours en cas d'accident.",
        explanationEn: "Kilometre markers indicate the road category: red (N) = national road, yellow (D) = departmental road, blue (A) = motorway. They also serve as location references for emergency services in case of accident.",
        trapNote: "Three correct answers. The location function is often overlooked — these markers help emergency services find you precisely.",
        distractorNotes: {
            C: "These are road category indicators, not hazard warnings — red and yellow have no danger meaning here."
        },
        vocabulary: [
            { wordFr: "borne kilométrique", wordEn: "kilometre marker", definition: "A small post on the roadside indicating the distance along the route and the road category" },
            { wordFr: "route nationale", wordEn: "national road", definition: "A major road managed by the state, designated with N and a number" },
            { wordFr: "route départementale", wordEn: "departmental road", definition: "A road managed by the département, designated with D and a number" }
        ]
    },
    {
        id: 'sign-025', topic: 'signalisation', difficulty: 2, signs: [],
        questionFr: "Que signifient les couleurs des marquages au sol ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "What do the colours of road markings mean? (Select all correct answers)",
        options: {
            A: { fr: "Blanc = marquages permanents", en: "White = permanent markings" },
            B: { fr: "Jaune = marquages temporaires (travaux)", en: "Yellow = temporary markings (roadworks)" },
            C: { fr: "Ligne continue = interdiction de franchir", en: "Continuous line = no crossing" },
            D: { fr: "Ligne discontinue = franchissement autorisé sous conditions", en: "Dashed line = crossing allowed under conditions" }
        },
        correctAnswers: ['A', 'B', 'C', 'D'], answerCount: 4,
        explanationFr: "Marquages au sol : blanc = permanent, jaune = temporaire (priorité sur le blanc en cas de travaux). Ligne continue = interdiction de franchir/chevaucher. Ligne discontinue = franchissement autorisé pour dépasser ou changer de voie si la sécurité le permet.",
        explanationEn: "Road markings: white = permanent, yellow = temporary (takes priority over white during works). Continuous line = no crossing/straddling. Dashed line = crossing allowed for overtaking or lane changes if safety permits.",
        trapNote: "ALL FOUR are correct — this is a comprehensive knowledge check on road marking rules.",
        distractorNotes: {},
        vocabulary: [
            { wordFr: "marquage au sol", wordEn: "road marking", definition: "Lines and symbols painted on the road surface to guide and regulate traffic" },
            { wordFr: "ligne continue", wordEn: "continuous/solid line", definition: "An unbroken line that must not be crossed or straddled" },
            { wordFr: "ligne discontinue", wordEn: "dashed/broken line", definition: "A line with gaps that may be crossed when safe" }
        ]
    },
    {
        id: 'sign-026', topic: 'signalisation', difficulty: 2, signs: [],
        questionFr: "À quoi servent les flèches directionnelles peintes au sol ?",
        questionEn: "What are the directional arrows painted on the road surface for?",
        options: {
            A: { fr: "Elles indiquent la direction obligatoire ou le présélection de voie", en: "They indicate mandatory direction or lane pre-selection" },
            B: { fr: "Elles sont purement décoratives", en: "They are purely decorative" },
            C: { fr: "Elles indiquent les sens uniques", en: "They indicate one-way streets" },
            D: { fr: "Elles servent uniquement aux bus", en: "They are only for buses" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Les flèches au sol de présélection indiquent aux conducteurs la voie à emprunter selon leur destination (tout droit, gauche, droite). Elles deviennent obligatoires lorsqu'elles sont entourées d'une ligne continue. Changer de voie après une flèche de présélection est interdit.",
        explanationEn: "Lane pre-selection arrows on the road indicate which lane drivers should use based on their destination (straight, left, right). They become mandatory when bordered by a continuous line. Changing lanes after a pre-selection arrow is prohibited.",
        trapNote: "Once you are in a lane with a directional arrow and a continuous line, you MUST follow that direction — no lane changes.",
        distractorNotes: {
            B: "Road markings always have a regulatory or informational purpose.",
            C: "One-way streets are indicated by signs, not just arrows.",
            D: "These arrows apply to all road users, not just buses."
        },
        vocabulary: [
            { wordFr: "flèche de présélection", wordEn: "lane pre-selection arrow", definition: "An arrow on the road surface indicating the direction assigned to that lane" }
        ]
    },
    {
        id: 'sign-027', topic: 'signalisation', difficulty: 1, signs: ['pedestrian_crossing'],
        questionFr: "Comment sont matérialisés les passages piétons en France ?",
        questionEn: "How are pedestrian crossings marked in France?",
        options: {
            A: { fr: "Par des bandes blanches rectangulaires parallèles (zébra)", en: "By parallel white rectangular stripes (zebra)" },
            B: { fr: "Par des pointillés rouges", en: "By red dotted lines" },
            C: { fr: "Par des lignes jaunes en zigzag", en: "By yellow zigzag lines" },
            D: { fr: "Par des cercles peints au sol", en: "By circles painted on the ground" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Les passages piétons sont matérialisés par des bandes blanches rectangulaires parallèles à l'axe de la route (marquage zébré). Les piétons engagés sur un passage piétons ont toujours la priorité absolue.",
        explanationEn: "Pedestrian crossings are marked by white rectangular stripes parallel to the road axis (zebra marking). Pedestrians on a pedestrian crossing always have absolute priority.",
        trapNote: "A basic question but important — the zebra pattern is universal in France. Yellow zigzag lines are UK school markings, not French.",
        distractorNotes: {
            B: "Red dotted lines do not exist in French road markings.",
            C: "Yellow zigzag lines are used in some other countries, not France.",
            D: "Circles are not used for pedestrian crossing markings."
        },
        vocabulary: [
            { wordFr: "passage piétons", wordEn: "pedestrian crossing", definition: "A marked area of road where pedestrians have priority to cross" },
            { wordFr: "marquage zébré", wordEn: "zebra marking", definition: "Alternating white stripes that mark a pedestrian crossing" }
        ]
    },
    {
        id: 'sign-028', topic: 'signalisation', difficulty: 2, signs: [],
        questionFr: "À quoi servent les bandes rugueuses (ou bandes sonores) au bord de la route ou en travers ?",
        questionEn: "What are rumble strips (or raised markings) at the road edge or across the road for?",
        options: {
            A: { fr: "Alerter le conducteur par des vibrations et du bruit qu'il quitte sa voie ou qu'il approche d'un danger", en: "Alert the driver through vibrations and noise that they are leaving their lane or approaching a danger" },
            B: { fr: "Améliorer l'esthétique de la route", en: "Improve the road's appearance" },
            C: { fr: "Ralentir uniquement les poids lourds", en: "Slow down only trucks" },
            D: { fr: "Indiquer un changement de commune", en: "Indicate a change of municipality" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Les bandes rugueuses (ou bandes d'alerte sonore) sont des surépaisseurs sur la chaussée qui provoquent des vibrations et du bruit au passage d'un véhicule. Elles alertent les conducteurs inattentifs ou somnolents d'un déport de voie, ou signalent l'approche d'un point dangereux.",
        explanationEn: "Rumble strips are raised markings on the road surface that cause vibrations and noise when driven over. They alert inattentive or drowsy drivers of lane departure, or signal the approach of a danger point.",
        trapNote: "Rumble strips serve as a physical 'wake-up call' — they are a safety feature, not a traffic calming measure.",
        distractorNotes: {
            B: "Road features always serve a safety or regulatory purpose.",
            C: "Rumble strips affect all vehicles equally.",
            D: "Municipal boundaries are indicated by signs, not road markings."
        },
        vocabulary: [
            { wordFr: "bande rugueuse", wordEn: "rumble strip", definition: "A raised strip on the road surface that creates vibration and noise as a warning" },
            { wordFr: "bande d'alerte sonore", wordEn: "audible warning strip", definition: "Another name for rumble strips, emphasising their noise-producing function" }
        ]
    },
    {
        id: 'sign-029', topic: 'signalisation', difficulty: 1, signs: [],
        questionFr: "Que signifient les panneaux d'altitude en montagne ?",
        questionEn: "What do altitude signs in mountains indicate?",
        options: {
            A: { fr: "L'altitude du point où le panneau est placé, utile pour anticiper les conditions météo", en: "The altitude of the point where the sign is placed, useful for anticipating weather conditions" },
            B: { fr: "La vitesse maximale autorisée en mètres", en: "The maximum speed in metres" },
            C: { fr: "La distance au prochain village", en: "The distance to the next village" },
            D: { fr: "Le numéro de la route", en: "The road number" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Les panneaux d'altitude (E34) indiquent l'élévation en mètres au-dessus du niveau de la mer. Ils aident les conducteurs à anticiper les conditions : risque de verglas, neige, brouillard. Plus l'altitude est élevée, plus la prudence est nécessaire.",
        explanationEn: "Altitude signs (E34) indicate the elevation in metres above sea level. They help drivers anticipate conditions: risk of black ice, snow, fog. The higher the altitude, the more caution is needed.",
        trapNote: "The number on the sign is metres of altitude, not speed or distance. Context matters — these appear in mountain areas.",
        distractorNotes: {
            B: "Speed is shown on round signs with a red border, not on altitude panels.",
            C: "Distance to villages is shown on directional signs, not altitude panels.",
            D: "Road numbers appear on different types of signs."
        },
        vocabulary: [
            { wordFr: "panneau d'altitude", wordEn: "altitude sign", definition: "A sign showing the height above sea level at that point on the road" },
            { wordFr: "verglas", wordEn: "black ice", definition: "A thin, transparent layer of ice on the road surface, extremely dangerous" }
        ]
    },
    {
        id: 'sign-030', topic: 'signalisation', difficulty: 2, signs: [],
        questionFr: "Quelle est la signification des panneaux d'information touristique de couleur marron ?",
        questionEn: "What is the meaning of brown-coloured tourist information signs?",
        options: {
            A: { fr: "Ils indiquent des sites touristiques, culturels ou de loisirs à proximité", en: "They indicate tourist, cultural or leisure sites nearby" },
            B: { fr: "Ils indiquent des routes en terre", en: "They indicate unpaved roads" },
            C: { fr: "Ils indiquent des zones agricoles", en: "They indicate agricultural zones" },
            D: { fr: "Ils indiquent des routes privées", en: "They indicate private roads" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Les panneaux à fond marron (H) sont des panneaux d'information touristique. Ils signalent des monuments historiques, sites naturels, musées, parcs de loisirs et autres points d'intérêt touristique. Ils n'imposent aucune obligation particulière au conducteur.",
        explanationEn: "Brown-background signs (H series) are tourist information signs. They indicate historic monuments, natural sites, museums, leisure parks and other tourist points of interest. They impose no particular obligation on the driver.",
        trapNote: "Brown = tourism. Not to be confused with green (national roads) or blue (motorways). These signs are informational only.",
        distractorNotes: {
            B: "Unpaved roads have specific warning signs, not brown panels.",
            C: "Agricultural zones are not indicated by brown signs.",
            D: "Private roads have separate access restriction signs."
        },
        vocabulary: [
            { wordFr: "panneau touristique", wordEn: "tourist sign", definition: "A brown-background sign indicating a point of tourist or cultural interest" }
        ]
    },
    {
        id: 'sign-031', topic: 'signalisation', difficulty: 3, signs: [],
        questionFr: "Que signifie le marquage CE (Conformité Européenne) sur les équipements routiers et de sécurité ?",
        questionEn: "What does the CE (Conformité Européenne) marking on road and safety equipment mean?",
        options: {
            A: { fr: "L'équipement est conforme aux normes européennes de sécurité et peut être commercialisé dans l'UE", en: "The equipment complies with European safety standards and can be sold in the EU" },
            B: { fr: "L'équipement est fabriqué en France", en: "The equipment is made in France" },
            C: { fr: "L'équipement est gratuit", en: "The equipment is free" },
            D: { fr: "L'équipement est recyclable", en: "The equipment is recyclable" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Le marquage CE (Conformité Européenne) signifie que le produit respecte les directives européennes applicables en matière de sécurité. Pour les équipements automobiles (gilet, triangle, extincteur, siège enfant), le marquage CE est obligatoire pour la vente et l'utilisation dans l'UE.",
        explanationEn: "The CE marking (Conformité Européenne) means the product meets applicable European directives for safety. For automotive equipment (vest, triangle, fire extinguisher, child seat), the CE marking is mandatory for sale and use in the EU.",
        trapNote: "CE does NOT mean 'made in Europe' — it means the product meets European safety STANDARDS. It could be manufactured anywhere.",
        distractorNotes: {
            B: "CE indicates compliance with standards, not country of manufacture.",
            C: "CE has nothing to do with price.",
            D: "Recyclability is indicated by different symbols."
        },
        vocabulary: [
            { wordFr: "marquage CE", wordEn: "CE marking", definition: "A certification mark indicating conformity with European health, safety, and environmental standards" },
            { wordFr: "norme européenne", wordEn: "European standard", definition: "A technical specification adopted by a European standards organisation" }
        ]
    },

    // === NOTIONS DIVERSES — Batch 3 (div-021 to div-031) ===
    {
        id: 'div-021', topic: 'notions_diverses', difficulty: 2, signs: [],
        questionFr: "Quelles affirmations sont correctes concernant l'assurance automobile obligatoire en France ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "Which statements are correct about mandatory car insurance in France? (Select all correct answers)",
        options: {
            A: { fr: "L'assurance responsabilité civile (au tiers) est la seule assurance obligatoire", en: "Third-party liability insurance is the only mandatory insurance" },
            B: { fr: "Elle couvre les dommages causés à autrui", en: "It covers damages caused to others" },
            C: { fr: "L'assurance tous risques est obligatoire", en: "Comprehensive insurance is mandatory" },
            D: { fr: "Conduire sans assurance est un délit passible de 3 750 € d'amende", en: "Driving without insurance is a criminal offence punishable by a EUR 3,750 fine" }
        },
        correctAnswers: ['A', 'B', 'D'], answerCount: 3,
        explanationFr: "L'assurance responsabilité civile (au tiers) est la seule assurance obligatoire (art. L211-1 du Code des assurances). Elle couvre les dommages causés à autrui (pas votre propre véhicule). Conduire sans assurance est un délit passible de 3 750 € d'amende.",
        explanationEn: "Third-party liability insurance is the only mandatory insurance (Article L211-1 of the Insurance Code). It covers damages caused to others (not your own vehicle). Driving without insurance is a criminal offence punishable by a EUR 3,750 fine.",
        trapNote: "Three correct answers. Students often miss the severity of driving uninsured — it is a criminal offence, not just a fine.",
        distractorNotes: {
            C: "Comprehensive insurance (tous risques) is recommended but NOT legally required."
        },
        vocabulary: [
            { wordFr: "responsabilité civile", wordEn: "third-party liability", definition: "Insurance covering damages you cause to other people and their property" },
            { wordFr: "assurance au tiers", wordEn: "third-party insurance", definition: "The minimum mandatory insurance covering only damages to others" },
            { wordFr: "tous risques", wordEn: "comprehensive insurance", definition: "Full insurance covering damages to yourself and your vehicle as well as to others" }
        ]
    },
    {
        id: 'div-022', topic: 'notions_diverses', difficulty: 3, signs: [],
        questionFr: "Comment remplir un constat amiable ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "How do you fill out an accident report form (constat amiable)? (Select all correct answers)",
        options: {
            A: { fr: "Le remplir avec l'autre conducteur, sur place, avec un stylo à bille", en: "Fill it out with the other driver, on site, with a ballpoint pen" },
            B: { fr: "Dessiner un croquis précis de l'accident", en: "Draw a precise diagram of the accident" },
            C: { fr: "Le signer par les deux conducteurs avant de détacher les exemplaires", en: "Have both drivers sign before separating the copies" },
            D: { fr: "Le remplir seul à la maison et l'envoyer par courrier", en: "Fill it out alone at home and send by mail" }
        },
        correctAnswers: ['A', 'B', 'C'], answerCount: 3,
        explanationFr: "Le constat amiable doit être : 1) rempli sur place avec l'autre conducteur, au stylo à bille (pas au crayon). 2) Comporter un croquis précis. 3) Être signé par les DEUX conducteurs avant de séparer les feuillets autocopiants. Une fois séparé, aucune modification n'est possible.",
        explanationEn: "The accident report form must be: 1) filled out on site with the other driver, in ballpoint pen (not pencil). 2) Include a precise diagram. 3) Be signed by BOTH drivers before separating the carbon copies. Once separated, no modifications are possible.",
        trapNote: "THREE key rules: on site + together, diagram, dual signature BEFORE separation. Filling it at home defeats the purpose.",
        distractorNotes: {
            D: "The form must be completed on the spot with both drivers present — completing it at home invalidates the process."
        },
        vocabulary: [
            { wordFr: "constat amiable", wordEn: "accident report form", definition: "A standardized two-part form filled by both drivers at an accident scene" },
            { wordFr: "croquis", wordEn: "diagram/sketch", definition: "A simple drawing showing the positions and movements of vehicles during the accident" },
            { wordFr: "feuillets autocopiants", wordEn: "carbon copy sheets", definition: "Layered pages that create a duplicate when written on" }
        ]
    },
    {
        id: 'div-023', topic: 'notions_diverses', difficulty: 3, signs: [],
        questionFr: "Combien de points perd-on pour les infractions suivantes : téléphone au volant, feu rouge grillé, conduite en état d'ivresse ?",
        questionEn: "How many points are lost for: using phone while driving, running a red light, drink driving?",
        options: {
            A: { fr: "Téléphone = 3 points, feu rouge = 4 points, alcool = 6 points", en: "Phone = 3 points, red light = 4 points, alcohol = 6 points" },
            B: { fr: "Téléphone = 1 point, feu rouge = 2 points, alcool = 4 points", en: "Phone = 1 point, red light = 2 points, alcohol = 4 points" },
            C: { fr: "Téléphone = 6 points, feu rouge = 3 points, alcool = 3 points", en: "Phone = 6 points, red light = 3 points, alcohol = 3 points" },
            D: { fr: "Toutes les infractions = 2 points", en: "All infractions = 2 points" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Barème de retrait de points : usage du téléphone tenu en main = 3 points (+ 135 €), franchissement d'un feu rouge = 4 points (+ 135 €), conduite en état alcoolique = 6 points (+ amende/prison). Le permis compte 12 points (6 en période probatoire).",
        explanationEn: "Points deduction scale: handheld phone use = 3 points (+ EUR 135), running a red light = 4 points (+ EUR 135), drink driving = 6 points (+ fine/prison). The licence has 12 points (6 during probationary period).",
        trapNote: "Memorise the key numbers: phone=3, red light=4, DUI=6. These are the most commonly tested point values.",
        distractorNotes: {
            B: "These values are too low — the real penalties are more severe.",
            C: "The hierarchy is wrong — DUI is the most severe, not the phone.",
            D: "Different infractions carry different point penalties."
        },
        vocabulary: [
            { wordFr: "retrait de points", wordEn: "points deduction", definition: "The loss of points from a driving licence as a penalty for traffic offences" },
            { wordFr: "permis à points", wordEn: "points-based licence", definition: "The French licence system where drivers start with 12 points that decrease with infractions" }
        ]
    },
    {
        id: 'div-024', topic: 'notions_diverses', difficulty: 3, signs: [],
        questionFr: "Comment peut-on récupérer des points sur le permis de conduire ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "How can you recover points on your driving licence? (Select all correct answers)",
        options: {
            A: { fr: "Stage volontaire de sensibilisation = récupération de 4 points (1 stage par an maximum)", en: "Voluntary awareness course = recovery of 4 points (maximum 1 course per year)" },
            B: { fr: "Après 3 ans sans infraction avec retrait de points, récupération automatique de la totalité (retour à 12)", en: "After 3 years without a points-losing offence, automatic full recovery (back to 12)" },
            C: { fr: "Après 6 mois sans infraction (si perte d'1 seul point), récupération de ce point", en: "After 6 months without an offence (if only 1 point was lost), recovery of that point" },
            D: { fr: "En payant une amende supplémentaire", en: "By paying an additional fine" }
        },
        correctAnswers: ['A', 'B', 'C'], answerCount: 3,
        explanationFr: "Récupération de points : 1) Stage volontaire = +4 points (max 1/an, ne peut dépasser le plafond de 12). 2) 3 ans sans infraction retrait de points = retour automatique à 12. 3) 6 mois sans infraction quand un seul point a été retiré = récupération de ce point. On ne peut PAS acheter des points.",
        explanationEn: "Points recovery: 1) Voluntary course = +4 points (max once/year, cannot exceed 12 ceiling). 2) 3 years without a points-losing offence = automatic return to 12. 3) 6 months without an offence when only 1 point was lost = recovery of that point. You CANNOT buy points.",
        trapNote: "The 6-month rule ONLY works if you lost exactly 1 point. For 2+ points lost, you need the 3-year clean record or a course.",
        distractorNotes: {
            D: "Points cannot be purchased — this is a common misconception."
        },
        vocabulary: [
            { wordFr: "stage de sensibilisation", wordEn: "awareness course", definition: "A 2-day road safety course that restores up to 4 licence points" },
            { wordFr: "période probatoire", wordEn: "probationary period", definition: "The first 3 years (or 2 with AAC) after obtaining a licence, with only 6 points" }
        ]
    },
    {
        id: 'div-025', topic: 'notions_diverses', difficulty: 2, signs: [],
        questionFr: "Quelles sont les bonnes pratiques d'éco-conduite ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "What are good eco-driving practices? (Select all correct answers)",
        options: {
            A: { fr: "Utiliser le frein moteur en descente plutôt que le frein à pied", en: "Use engine braking downhill rather than the foot brake" },
            B: { fr: "Vérifier la pression des pneus régulièrement (sous-gonflage = +5% de consommation)", en: "Check tyre pressure regularly (under-inflation = +5% fuel consumption)" },
            C: { fr: "Accélérer brutalement pour atteindre rapidement la vitesse de croisière", en: "Accelerate hard to quickly reach cruising speed" },
            D: { fr: "Passer les rapports supérieurs dès que possible (avant 2500 tr/min en diesel, 2000 en essence)", en: "Shift to higher gears as soon as possible (before 2500 rpm diesel, 2000 rpm petrol)" }
        },
        correctAnswers: ['A', 'B', 'D'], answerCount: 3,
        explanationFr: "L'éco-conduite comprend : le frein moteur (consommation nulle en décélération), la pression correcte des pneus (sous-gonflage augmente la consommation de 5 à 8%), et le passage rapide aux rapports supérieurs. Les accélérations brutales gaspillent du carburant.",
        explanationEn: "Eco-driving includes: engine braking (zero fuel consumption when decelerating), correct tyre pressure (under-inflation increases consumption by 5-8%), and early gear shifting. Hard acceleration wastes fuel.",
        trapNote: "Engine braking = zero fuel injection in modern cars. This is counter-intuitive but a key eco-driving concept.",
        distractorNotes: {
            C: "Hard acceleration is the OPPOSITE of eco-driving — smooth acceleration is key."
        },
        vocabulary: [
            { wordFr: "éco-conduite", wordEn: "eco-driving", definition: "Driving techniques that reduce fuel consumption and emissions" },
            { wordFr: "frein moteur", wordEn: "engine braking", definition: "Decelerating by releasing the accelerator while in gear, using the engine's resistance" },
            { wordFr: "sous-gonflage", wordEn: "under-inflation", definition: "When tyre pressure is below the recommended level" }
        ]
    },
    {
        id: 'div-026', topic: 'notions_diverses', difficulty: 2, signs: [],
        questionFr: "Quel est l'ordre exact du protocole PAS (Protéger, Alerter, Secourir) et que comprend chaque étape ?",
        questionEn: "What is the exact order of the PAS protocol (Protect, Alert, Rescue) and what does each step involve?",
        options: {
            A: { fr: "1) Protéger (balisage, gilet, triangle à 30m) 2) Alerter (112 ou 15/18, préciser lieu et nombre de victimes) 3) Secourir (gestes de premiers secours, ne pas déplacer sauf danger vital)", en: "1) Protect (cordon off, vest, triangle at 30m) 2) Alert (112 or 15/18, specify location and number of victims) 3) Rescue (first aid, do not move unless life-threatening danger)" },
            B: { fr: "1) Secourir 2) Alerter 3) Protéger", en: "1) Rescue 2) Alert 3) Protect" },
            C: { fr: "1) Alerter 2) Protéger 3) Secourir", en: "1) Alert 2) Protect 3) Rescue" },
            D: { fr: "1) Protéger 2) Secourir 3) Alerter", en: "1) Protect 2) Rescue 3) Alert" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "PAS est un acronyme dans l'ordre : Protéger (gilet, triangle à 30 m minimum, allumer feux de détresse), Alerter (appeler le 112 en donnant le lieu précis, nombre de victimes et leur état), Secourir (premiers soins SANS déplacer la victime sauf danger imminent comme un incendie).",
        explanationEn: "PAS is an acronym in order: Protect (vest, triangle at minimum 30 m, turn on hazard lights), Alert (call 112 giving precise location, number of victims and their condition), Rescue (first aid WITHOUT moving the victim unless imminent danger like fire).",
        trapNote: "The ORDER matters — P then A then S. You must secure the scene BEFORE alerting, and alert BEFORE providing first aid.",
        distractorNotes: {
            B: "Rescuing before protecting puts everyone in danger.",
            C: "You must protect the scene before making a call.",
            D: "You must alert professionals before attempting first aid — they may arrive while you stabilise."
        },
        vocabulary: [
            { wordFr: "PAS", wordEn: "Protect-Alert-Rescue", definition: "The mandatory French emergency response protocol in strict order" },
            { wordFr: "feux de détresse", wordEn: "hazard lights", definition: "The simultaneous flashing of all four indicators to signal an emergency" },
            { wordFr: "triangle de présignalisation", wordEn: "warning triangle", definition: "A reflective triangle placed at least 30m behind a stopped vehicle" }
        ]
    },
    {
        id: 'div-027', topic: 'notions_diverses', difficulty: 2, signs: [],
        questionFr: "Quelles affirmations sont correctes concernant le système eCall ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "Which statements are correct about the eCall system? (Select all correct answers)",
        options: {
            A: { fr: "Il est obligatoire dans les véhicules neufs vendus dans l'UE depuis mars 2018", en: "It has been mandatory in new vehicles sold in the EU since March 2018" },
            B: { fr: "Il appelle automatiquement le 112 en cas d'accident grave (déclenchement des airbags)", en: "It automatically calls 112 in case of a serious accident (airbag deployment)" },
            C: { fr: "C'est un système de navigation GPS", en: "It is a GPS navigation system" },
            D: { fr: "Il transmet la localisation GPS, le sens de circulation et le type de véhicule", en: "It transmits GPS location, direction of travel and vehicle type" }
        },
        correctAnswers: ['A', 'B', 'D'], answerCount: 3,
        explanationFr: "Le système eCall est obligatoire dans les véhicules neufs UE depuis le 31 mars 2018. En cas d'accident grave (détecté par les airbags), il appelle automatiquement le 112 et transmet la localisation GPS, le sens de circulation et le type de véhicule. Il peut aussi être déclenché manuellement.",
        explanationEn: "The eCall system has been mandatory in new EU vehicles since March 31, 2018. In case of a serious accident (detected by airbags), it automatically calls 112 and transmits GPS location, direction of travel and vehicle type. It can also be triggered manually.",
        trapNote: "Three correct answers. eCall uses GPS for location but is NOT a navigation system — it is an emergency system.",
        distractorNotes: {
            C: "eCall is an emergency system, not navigation — though it uses GPS for location transmission."
        },
        vocabulary: [
            { wordFr: "eCall", wordEn: "eCall (emergency Call)", definition: "An automatic emergency call system that contacts 112 after a serious accident" },
            { wordFr: "airbag", wordEn: "airbag", definition: "An inflatable safety device that deploys in a collision to protect occupants" }
        ]
    },
    {
        id: 'div-028', topic: 'notions_diverses', difficulty: 2, signs: [],
        questionFr: "Quelles sont les règles du contrôle technique (CT) pour un véhicule particulier ?",
        questionEn: "What are the rules for the technical inspection (CT) for a private vehicle?",
        options: {
            A: { fr: "Premier CT dans les 6 mois avant le 4e anniversaire de la première mise en circulation, puis tous les 2 ans", en: "First CT within 6 months before the 4th anniversary of first registration, then every 2 years" },
            B: { fr: "Premier CT à 2 ans, puis tous les ans", en: "First CT at 2 years, then every year" },
            C: { fr: "Premier CT à 5 ans, puis tous les 3 ans", en: "First CT at 5 years, then every 3 years" },
            D: { fr: "Le contrôle technique n'est pas obligatoire", en: "The technical inspection is not mandatory" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Le premier contrôle technique doit être effectué dans les 6 mois précédant le 4e anniversaire de la première mise en circulation du véhicule, puis tous les 2 ans. En cas de contre-visite, le propriétaire dispose de 2 mois pour effectuer les réparations et se présenter à nouveau.",
        explanationEn: "The first technical inspection must be done within 6 months before the vehicle's 4th anniversary of first registration, then every 2 years. In case of a re-inspection, the owner has 2 months to make repairs and present the vehicle again.",
        trapNote: "4 years for the first, then every 2 years. Students often confuse with other countries' schedules.",
        distractorNotes: {
            B: "2 years and annual is incorrect — it's 4 years then biennial.",
            C: "5 years and 3-year intervals are incorrect.",
            D: "The CT is absolutely mandatory for all vehicles over 4 years old."
        },
        vocabulary: [
            { wordFr: "contrôle technique (CT)", wordEn: "technical inspection/MOT", definition: "A mandatory periodic check of a vehicle's safety and environmental compliance" },
            { wordFr: "contre-visite", wordEn: "re-inspection", definition: "A follow-up inspection required when the initial CT reveals serious defects" },
            { wordFr: "mise en circulation", wordEn: "first registration", definition: "The date a vehicle was first officially registered for road use" }
        ]
    },
    {
        id: 'div-029', topic: 'notions_diverses', difficulty: 1, signs: [],
        questionFr: "Quels documents devez-vous obligatoirement avoir à bord de votre véhicule ? (Sélectionnez toutes les bonnes réponses)",
        questionEn: "What documents must you have in your vehicle at all times? (Select all correct answers)",
        options: {
            A: { fr: "Le permis de conduire", en: "The driving licence" },
            B: { fr: "Le certificat d'immatriculation (carte grise)", en: "The registration certificate (carte grise)" },
            C: { fr: "L'attestation d'assurance valide", en: "The valid insurance certificate" },
            D: { fr: "Le passeport du conducteur", en: "The driver's passport" }
        },
        correctAnswers: ['A', 'B', 'C'], answerCount: 3,
        explanationFr: "Les documents obligatoires à bord : 1) Permis de conduire (ou récépissé si en cours de renouvellement), 2) Certificat d'immatriculation (carte grise), 3) Attestation d'assurance en cours de validité. Le passeport n'est pas requis pour conduire. La vignette d'assurance n'est plus obligatoire sur le pare-brise depuis 2024.",
        explanationEn: "Mandatory documents on board: 1) Driving licence (or receipt if being renewed), 2) Registration certificate (carte grise), 3) Valid insurance certificate. A passport is not required for driving. The insurance sticker on the windshield is no longer mandatory since 2024.",
        trapNote: "Three documents: licence, registration, insurance. The windshield insurance sticker was abolished in 2024 — only the certificate matters now.",
        distractorNotes: {
            D: "A passport or ID card is not a mandatory vehicle document — only driving-specific documents are required."
        },
        vocabulary: [
            { wordFr: "certificat d'immatriculation", wordEn: "registration certificate", definition: "The official document proving a vehicle is registered (commonly called carte grise)" },
            { wordFr: "attestation d'assurance", wordEn: "insurance certificate", definition: "Proof that the vehicle is covered by mandatory third-party insurance" }
        ]
    },
    {
        id: 'div-030', topic: 'notions_diverses', difficulty: 2, signs: [],
        questionFr: "En France, quel est le principe du consentement présumé pour le don d'organes ?",
        questionEn: "In France, what is the principle of presumed consent for organ donation?",
        options: {
            A: { fr: "Toute personne décédée est considérée comme donneuse sauf si elle s'y est opposée de son vivant (inscrite au registre national des refus)", en: "Every deceased person is considered a donor unless they objected during their lifetime (registered in the national refusal registry)" },
            B: { fr: "Il faut une carte de donneur pour être donneur", en: "You need a donor card to be a donor" },
            C: { fr: "La famille décide toujours", en: "The family always decides" },
            D: { fr: "Le don d'organes est interdit en France", en: "Organ donation is prohibited in France" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "En France, la loi du 22 décembre 1976 (loi Caillavet), renforcée en 2017, pose le principe du consentement présumé : toute personne est donneuse d'organes par défaut. Pour s'y opposer, il faut s'inscrire au Registre National des Refus ou avoir exprimé son refus de son vivant à ses proches.",
        explanationEn: "In France, the law of December 22, 1976 (Caillavet law), reinforced in 2017, establishes presumed consent: everyone is an organ donor by default. To opt out, one must register with the National Refusal Registry or have expressed refusal to family members during their lifetime.",
        trapNote: "France uses OPT-OUT, not opt-in. You are a donor UNLESS you actively refuse. This surprises many exam candidates.",
        distractorNotes: {
            B: "No donor card is needed — consent is PRESUMED. The card system is opt-in, which is NOT the French model.",
            C: "The family is consulted but the law favours presumed consent of the deceased.",
            D: "Organ donation is legal and actively encouraged in France."
        },
        vocabulary: [
            { wordFr: "consentement présumé", wordEn: "presumed consent", definition: "The legal assumption that a person consents to organ donation unless they have explicitly refused" },
            { wordFr: "Registre National des Refus", wordEn: "National Refusal Registry", definition: "The official registry where individuals can register their opposition to organ donation" }
        ]
    },
    {
        id: 'div-031', topic: 'notions_diverses', difficulty: 3, signs: [],
        questionFr: "Quelles sont les sanctions pour un conducteur novice (période probatoire) contrôlé avec un taux d'alcoolémie entre 0,2 et 0,5 g/l de sang ?",
        questionEn: "What are the penalties for a novice driver (probationary period) caught with a blood alcohol level between 0.2 and 0.5 g/l?",
        options: {
            A: { fr: "Amende de 135 € et retrait de 6 points", en: "EUR 135 fine and 6 points deducted" },
            B: { fr: "Simple avertissement verbal", en: "Simple verbal warning" },
            C: { fr: "Aucune sanction car le taux est inférieur à 0,5 g/l", en: "No penalty because the level is under 0.5 g/l" },
            D: { fr: "Amende de 35 € et retrait de 1 point", en: "EUR 35 fine and 1 point deducted" }
        },
        correctAnswers: ['A'], answerCount: 1,
        explanationFr: "Pour les conducteurs novices (permis probatoire), le taux maximal autorisé est de 0,2 g/l de sang (contre 0,5 g/l pour les conducteurs expérimentés). Un taux entre 0,2 et 0,5 g/l entraîne une amende de 135 € et un retrait de 6 points. Avec seulement 6 points en probatoire, cela signifie une invalidation immédiate du permis.",
        explanationEn: "For novice drivers (probationary licence), the maximum allowed level is 0.2 g/l blood (vs 0.5 g/l for experienced drivers). A level between 0.2 and 0.5 g/l results in a EUR 135 fine and 6 points deducted. With only 6 points during probation, this means immediate licence invalidation.",
        trapNote: "0.2 g/l threshold for novice drivers, NOT 0.5 g/l. And losing 6 points = instant licence invalidation since probationary drivers only have 6 points.",
        distractorNotes: {
            B: "Alcohol offences are never treated with just a warning.",
            C: "The 0.5 g/l limit applies to experienced drivers only — novices have a 0.2 g/l limit.",
            D: "The penalty is much more severe than a minor fine."
        },
        vocabulary: [
            { wordFr: "période probatoire", wordEn: "probationary period", definition: "The first years after obtaining a licence (3 years standard, 2 with AAC) with only 6 points" },
            { wordFr: "alcoolémie", wordEn: "blood alcohol level", definition: "The concentration of alcohol in the blood, measured in grams per litre" },
            { wordFr: "invalidation du permis", wordEn: "licence invalidation", definition: "Automatic cancellation of the driving licence when all points are lost" }
        ]
    }
];

// Helper functions
function getQuestionsByTopic(topicId) {
    return QUESTION_BANK.filter(q => q.topic === topicId);
}

function getQuestionById(id) {
    return QUESTION_BANK.find(q => q.id === id);
}

function getRandomQuestions(count, exclude = []) {
    const available = QUESTION_BANK.filter(q => !exclude.includes(q.id));
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function getWeakTopicQuestions(count, topicMastery) {
    // Sort topics by weakness (lowest accuracy first)
    const sorted = [...topicMastery].sort((a, b) => a.accuracy - b.accuracy);
    const weakTopics = sorted.slice(0, 3).map(t => t.topic);
    const questions = QUESTION_BANK.filter(q => weakTopics.includes(q.topic));
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function getExamQuestions() {
    // Select 40 questions matching official exam distribution
    const selected = [];
    for (const topic of ETG_TOPICS) {
        const topicQuestions = getQuestionsByTopic(topic.id);
        const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
        const needed = topic.examWeight;
        const taken = shuffled.slice(0, needed);
        selected.push(...taken);
    }
    while (selected.length < EXAM_TOTAL_QUESTIONS) {
        const remaining = QUESTION_BANK.filter(q => !selected.includes(q));
        if (remaining.length === 0) break;
        const rand = remaining[Math.floor(Math.random() * remaining.length)];
        selected.push(rand);
    }
    return selected.sort(() => Math.random() - 0.5);
}

/* ============================================
   Adaptive Question Selection Algorithm
   Slot allocation: reviews > weak > unseen > random
   ============================================ */
function getAdaptiveQuestions(count = 10) {
    const selected = [];
    const usedIds = new Set();
    const attempts = Storage.getAttempts();
    const mastery = Storage.getTopicMasteryArray();
    const attemptedIds = new Set(attempts.map(a => a.questionId));

    // Slot allocation: 30% reviews, 30% weak topics, 20% unseen, 20% random
    const reviewSlots = Math.round(count * 0.3);
    const weakSlots = Math.round(count * 0.3);
    const unseenSlots = Math.round(count * 0.2);
    const randomSlots = count - reviewSlots - weakSlots - unseenSlots;

    // 1. Due reviews first (highest priority)
    const dueReviews = Storage.getDueReviews();
    const reviewQuestions = dueReviews
        .map(r => getQuestionById(r.questionId))
        .filter(Boolean)
        .slice(0, reviewSlots);
    for (const q of reviewQuestions) {
        selected.push(q);
        usedIds.add(q.id);
    }

    // 2. Weak topic questions (topics with lowest accuracy)
    const sortedTopics = [...mastery].sort((a, b) => {
        // Prioritize topics with some attempts but low accuracy
        const aScore = a.totalAttempts > 0 ? a.accuracy : 50; // unseen gets neutral score
        const bScore = b.totalAttempts > 0 ? b.accuracy : 50;
        return aScore - bScore;
    });
    const weakTopicIds = sortedTopics.slice(0, 4).map(t => t.id || t.topic);
    const weakPool = QUESTION_BANK
        .filter(q => weakTopicIds.includes(q.topic) && !usedIds.has(q.id))
        .sort(() => Math.random() - 0.5);
    for (const q of weakPool.slice(0, weakSlots)) {
        selected.push(q);
        usedIds.add(q.id);
    }

    // 3. Unseen questions (never attempted)
    const unseenPool = QUESTION_BANK
        .filter(q => !attemptedIds.has(q.id) && !usedIds.has(q.id))
        .sort(() => Math.random() - 0.5);
    for (const q of unseenPool.slice(0, unseenSlots)) {
        selected.push(q);
        usedIds.add(q.id);
    }

    // 4. Random fill for remaining slots
    const remainingPool = QUESTION_BANK
        .filter(q => !usedIds.has(q.id))
        .sort(() => Math.random() - 0.5);
    const needed = count - selected.length;
    for (const q of remainingPool.slice(0, needed)) {
        selected.push(q);
        usedIds.add(q.id);
    }

    // Final fill if still short
    while (selected.length < count) {
        const remaining = QUESTION_BANK.filter(q => !usedIds.has(q.id));
        if (remaining.length === 0) break;
        const pick = remaining[Math.floor(Math.random() * remaining.length)];
        selected.push(pick);
        usedIds.add(pick.id);
    }

    return selected.sort(() => Math.random() - 0.5);
}
