// S41: 79 new multi-answer questions to push all topics to 50%
// Generated for Code de la Route exam prep
// Each question has 2-3 correct answers, D2-D3 difficulty

const NEW_QUESTIONS = [
    // === CIRCULATION (9 questions) ===
    {
        id: "s41-001", topic: "circulation", difficulty: 2,
        questionFr: "Quelles affirmations sont correctes concernant la circulation en sens unique ?",
        questionEn: "Which statements are correct regarding one-way traffic?",
        options: {
            A: { fr: "Le stationnement est autorisé des deux côtés de la chaussée", en: "Parking is allowed on both sides of the road" },
            B: { fr: "Le dépassement par la droite est autorisé", en: "Overtaking on the right is allowed" },
            C: { fr: "Les piétons peuvent traverser sans regarder", en: "Pedestrians can cross without looking" },
            D: { fr: "Les cyclistes doivent rouler uniquement sur la voie de droite", en: "Cyclists must ride only in the right lane" }
        },
        correctAnswers: ["A","B"], answerCount: 2,
        explanationFr: "En sens unique, le stationnement est possible des deux côtés et le dépassement par la droite est autorisé car il n'y a pas de circulation en sens inverse.",
        explanationEn: "In one-way streets, parking on both sides and overtaking on the right are permitted since there is no oncoming traffic."
    },
    {
        id: "s41-002", topic: "circulation", difficulty: 3,
        questionFr: "Dans quels cas devez-vous allumer vos feux de croisement en plein jour ?",
        questionEn: "In which cases must you turn on your dipped headlights during the day?",
        options: {
            A: { fr: "En cas de pluie nécessitant les essuie-glaces", en: "When rain requires windshield wipers" },
            B: { fr: "Dans un tunnel éclairé", en: "In a lit tunnel" },
            C: { fr: "En traversant un passage à niveau", en: "When crossing a level crossing" },
            D: { fr: "Par temps de brouillard", en: "In foggy conditions" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Les feux de croisement sont obligatoires de jour en cas de visibilité réduite (pluie, brouillard) et dans les tunnels, même éclairés.",
        explanationEn: "Dipped headlights are mandatory during the day in reduced visibility (rain, fog) and in tunnels, even when lit."
    },
    {
        id: "s41-003", topic: "circulation", difficulty: 2,
        questionFr: "Quelles sont les conséquences d'un excès de vitesse supérieur à 50 km/h ?",
        questionEn: "What are the consequences of speeding by more than 50 km/h?",
        options: {
            A: { fr: "Retrait de 6 points sur le permis", en: "Loss of 6 points on the licence" },
            B: { fr: "Suspension immédiate du permis", en: "Immediate licence suspension" },
            C: { fr: "Simple amende forfaitaire", en: "Simple fixed fine" },
            D: { fr: "Possible confiscation du véhicule", en: "Possible vehicle confiscation" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Un excès de plus de 50 km/h entraîne un retrait de 6 points, une suspension immédiate du permis et une possible confiscation du véhicule. Ce n'est pas une simple amende forfaitaire.",
        explanationEn: "Exceeding the speed limit by more than 50 km/h results in 6-point loss, immediate suspension, and possible vehicle confiscation. It is not a simple fixed fine."
    },
    {
        id: "s41-004", topic: "circulation", difficulty: 2,
        questionFr: "Quelles règles s'appliquent dans une zone de rencontre (zone 20) ?",
        questionEn: "Which rules apply in a shared zone (zone 20)?",
        options: {
            A: { fr: "La vitesse est limitée à 20 km/h", en: "Speed is limited to 20 km/h" },
            B: { fr: "Les piétons ont la priorité sur tous les véhicules", en: "Pedestrians have priority over all vehicles" },
            C: { fr: "Le stationnement est interdit sauf emplacements aménagés", en: "Parking is prohibited except in designated spaces" },
            D: { fr: "Les vélos sont interdits", en: "Bicycles are prohibited" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "En zone de rencontre : vitesse limitée à 20 km/h, priorité absolue aux piétons, stationnement uniquement sur emplacements prévus. Les vélos y sont autorisés.",
        explanationEn: "In shared zones: speed limited to 20 km/h, absolute priority to pedestrians, parking only in designated spots. Bicycles are allowed."
    },
    {
        id: "s41-005", topic: "circulation", difficulty: 3,
        questionFr: "Quelles affirmations sont vraies concernant l'utilisation des voies sur autoroute ?",
        questionEn: "Which statements are true regarding lane use on motorways?",
        options: {
            A: { fr: "La voie de droite est la voie normale de circulation", en: "The right lane is the normal driving lane" },
            B: { fr: "On peut rester sur la voie du milieu si on roule vite", en: "You can stay in the middle lane if driving fast" },
            C: { fr: "Le dépassement se fait uniquement par la gauche", en: "Overtaking is only on the left" },
            D: { fr: "La bande d'arrêt d'urgence peut servir pour dépasser", en: "The hard shoulder can be used for overtaking" }
        },
        correctAnswers: ["A","C"], answerCount: 2,
        explanationFr: "Sur autoroute, la voie de droite est la voie normale. Le dépassement ne se fait que par la gauche. On ne doit pas rester sur la voie du milieu sans raison. La BAU est réservée aux urgences.",
        explanationEn: "On motorways, the right lane is the normal lane. Overtaking is only on the left. You must not stay in the middle lane without reason. The hard shoulder is for emergencies only."
    },
    {
        id: "s41-006", topic: "circulation", difficulty: 2,
        questionFr: "Quelles sont les obligations en approchant un passage piéton ?",
        questionEn: "What are your obligations when approaching a pedestrian crossing?",
        options: {
            A: { fr: "Ralentir et être prêt à s'arrêter", en: "Slow down and be ready to stop" },
            B: { fr: "Céder le passage aux piétons engagés", en: "Give way to pedestrians who have started crossing" },
            C: { fr: "Klaxonner pour prévenir les piétons", en: "Honk to warn pedestrians" },
            D: { fr: "Ne jamais s'arrêter si le feu est vert pour vous", en: "Never stop if the light is green for you" }
        },
        correctAnswers: ["A","B"], answerCount: 2,
        explanationFr: "À l'approche d'un passage piéton, vous devez ralentir et céder le passage aux piétons engagés ou manifestant l'intention de traverser. Le klaxon n'est pas approprié.",
        explanationEn: "When approaching a pedestrian crossing, you must slow down and give way to pedestrians who are crossing or clearly intending to cross. Honking is not appropriate."
    },
    {
        id: "s41-007", topic: "circulation", difficulty: 3,
        questionFr: "Quelles affirmations sont correctes sur la distance de sécurité sur autoroute ?",
        questionEn: "Which statements are correct about the safety distance on motorways?",
        options: {
            A: { fr: "Elle correspond à au moins 2 secondes", en: "It corresponds to at least 2 seconds" },
            B: { fr: "À 130 km/h, elle est d'environ 73 mètres", en: "At 130 km/h, it is about 73 metres" },
            C: { fr: "Elle doit être doublée par temps de pluie", en: "It must be doubled in rainy weather" },
            D: { fr: "Elle est facultative sur les 3 voies", en: "It is optional on 3-lane roads" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "La distance de sécurité est de 2 secondes minimum (≈73 m à 130 km/h). Par temps de pluie, il faut la doubler. Elle n'est jamais facultative.",
        explanationEn: "Safety distance is minimum 2 seconds (≈73 m at 130 km/h). In rain, it must be doubled. It is never optional."
    },
    {
        id: "s41-008", topic: "circulation", difficulty: 2,
        questionFr: "Quelles situations imposent de réduire sa vitesse en dessous de la limite autorisée ?",
        questionEn: "Which situations require reducing speed below the allowed limit?",
        options: {
            A: { fr: "Présence d'enfants au bord de la route", en: "Children present at the roadside" },
            B: { fr: "Chaussée mouillée ou verglacée", en: "Wet or icy road surface" },
            C: { fr: "La route est bien éclairée la nuit", en: "The road is well lit at night" },
            D: { fr: "Visibilité réduite par le brouillard", en: "Reduced visibility due to fog" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "La vitesse doit être adaptée aux conditions : enfants à proximité, chaussée glissante, visibilité réduite. La limite affichée est un maximum, pas un objectif.",
        explanationEn: "Speed must be adapted to conditions: children nearby, slippery road, reduced visibility. The posted limit is a maximum, not a target."
    },
    {
        id: "s41-009", topic: "circulation", difficulty: 3,
        questionFr: "Quelles sanctions s'appliquent pour un franchissement de ligne continue ?",
        questionEn: "What sanctions apply for crossing a solid white line?",
        options: {
            A: { fr: "Retrait de 3 points", en: "Loss of 3 points" },
            B: { fr: "Amende de 135 €", en: "Fine of 135 €" },
            C: { fr: "Simple avertissement pour la première infraction", en: "Simple warning for the first offence" },
            D: { fr: "Possible suspension du permis", en: "Possible licence suspension" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Le franchissement d'une ligne continue est une infraction de 4e classe : amende de 135 €, retrait de 3 points, et possible suspension du permis. Il n'y a pas de simple avertissement.",
        explanationEn: "Crossing a solid line is a class 4 offence: €135 fine, 3-point loss, and possible licence suspension. There is no simple warning."
    },

    // === AUTRES_USAGERS (9 questions) ===
    {
        id: "s41-010", topic: "autres_usagers", difficulty: 2,
        questionFr: "Quelles précautions devez-vous prendre en présence de cyclistes ?",
        questionEn: "What precautions should you take around cyclists?",
        options: {
            A: { fr: "Laisser au moins 1 mètre en agglomération pour dépasser", en: "Leave at least 1 metre in urban areas to overtake" },
            B: { fr: "Laisser au moins 1,50 mètre hors agglomération", en: "Leave at least 1.50 metres outside urban areas" },
            C: { fr: "Klaxonner pour signaler votre présence", en: "Honk to signal your presence" },
            D: { fr: "Vérifier l'angle mort avant de tourner", en: "Check blind spot before turning" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "En dépassant un cycliste : 1 m minimum en ville, 1,50 m hors agglomération. Toujours vérifier l'angle mort. Le klaxon peut effrayer le cycliste.",
        explanationEn: "When overtaking a cyclist: minimum 1m in town, 1.50m outside. Always check blind spots. Honking can startle the cyclist."
    },
    {
        id: "s41-011", topic: "autres_usagers", difficulty: 2,
        questionFr: "Quelles affirmations sont vraies concernant les piétons ?",
        questionEn: "Which statements are true about pedestrians?",
        options: {
            A: { fr: "Ils doivent emprunter les trottoirs quand ils existent", en: "They must use pavements when available" },
            B: { fr: "Hors agglomération, ils marchent à gauche face à la circulation", en: "Outside urban areas, they walk on the left facing traffic" },
            C: { fr: "Ils ont toujours priorité même hors passage piéton", en: "They always have priority even outside crossings" },
            D: { fr: "Un piéton engagé sur un passage piéton a toujours priorité", en: "A pedestrian on a crossing always has priority" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Les piétons utilisent les trottoirs, marchent à gauche hors agglomération, et ont priorité sur les passages piétons. Hors passage piéton, c'est le véhicule qui a priorité sauf en zone de rencontre.",
        explanationEn: "Pedestrians use pavements, walk on the left outside towns, and have priority on crossings. Outside crossings, vehicles have priority except in shared zones."
    },
    {
        id: "s41-012", topic: "autres_usagers", difficulty: 3,
        questionFr: "Quelles affirmations concernant les tramways sont correctes ?",
        questionEn: "Which statements about trams are correct?",
        options: {
            A: { fr: "Le tramway a toujours la priorité", en: "The tram always has priority" },
            B: { fr: "Il est interdit de stationner sur les voies de tramway", en: "Parking on tram tracks is prohibited" },
            C: { fr: "La distance de freinage d'un tramway est très longue", en: "A tram's braking distance is very long" },
            D: { fr: "On peut doubler un tramway par la droite uniquement", en: "You can only overtake a tram on the right" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "Le tramway a toujours la priorité (sauf signal contraire), il est interdit de stationner sur ses voies, et sa distance de freinage est très longue. On peut le dépasser par la droite OU la gauche selon la configuration.",
        explanationEn: "Trams always have priority (unless signalled otherwise), parking on tracks is forbidden, and their braking distance is very long. Overtaking can be on either side depending on the layout."
    },
    {
        id: "s41-013", topic: "autres_usagers", difficulty: 2,
        questionFr: "Quelles précautions prendre en présence d'un bus scolaire à l'arrêt ?",
        questionEn: "What precautions should you take near a stopped school bus?",
        options: {
            A: { fr: "Ralentir fortement", en: "Slow down significantly" },
            B: { fr: "Être prêt à s'arrêter pour les enfants", en: "Be ready to stop for children" },
            C: { fr: "Dépasser rapidement pour ne pas gêner", en: "Overtake quickly to avoid obstructing" },
            D: { fr: "Faire attention aux enfants qui peuvent surgir", en: "Watch for children who may appear suddenly" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Près d'un bus scolaire à l'arrêt, il faut ralentir, être prêt à s'arrêter et surveiller les enfants qui peuvent traverser brusquement.",
        explanationEn: "Near a stopped school bus, slow down, be ready to stop, and watch for children who may cross suddenly."
    },
    {
        id: "s41-014", topic: "autres_usagers", difficulty: 3,
        questionFr: "Quelles obligations avez-vous envers les véhicules d'urgence ?",
        questionEn: "What are your obligations towards emergency vehicles?",
        options: {
            A: { fr: "Leur céder le passage immédiatement", en: "Give way to them immediately" },
            B: { fr: "Se ranger sur le côté droit si possible", en: "Pull over to the right if possible" },
            C: { fr: "S'arrêter sur place sans bouger", en: "Stop in place without moving" },
            D: { fr: "Ne pas les suivre de trop près après leur passage", en: "Not follow them too closely after they pass" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Face à un véhicule d'urgence : céder le passage, se ranger à droite, et ne pas le suivre de près. Ne pas rester immobile au milieu de la route.",
        explanationEn: "For emergency vehicles: give way, pull to the right, and don't follow closely. Don't stay motionless in the middle of the road."
    },
    {
        id: "s41-015", topic: "autres_usagers", difficulty: 2,
        questionFr: "Quelles affirmations sont correctes concernant les motocyclistes ?",
        questionEn: "Which statements are correct about motorcyclists?",
        options: {
            A: { fr: "Ils sont plus vulnérables que les automobilistes", en: "They are more vulnerable than car drivers" },
            B: { fr: "Ils peuvent circuler entre les files en cas de bouchon", en: "They can filter between lanes in traffic jams" },
            C: { fr: "Leur temps de réaction est plus court qu'en voiture", en: "Their reaction time is shorter than in a car" },
            D: { fr: "Ils sont moins visibles, surtout la nuit", en: "They are less visible, especially at night" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Les motocyclistes sont plus vulnérables, moins visibles et autorisés à pratiquer la circulation inter-files sous certaines conditions. Leur temps de réaction n'est pas nécessairement plus court.",
        explanationEn: "Motorcyclists are more vulnerable, less visible, and allowed to filter between lanes under certain conditions. Their reaction time is not necessarily shorter."
    },
    {
        id: "s41-016", topic: "autres_usagers", difficulty: 2,
        questionFr: "Quelles sont les caractéristiques des trottinettes électriques dans le Code de la route ?",
        questionEn: "What are the characteristics of electric scooters in the Highway Code?",
        options: {
            A: { fr: "Vitesse limitée à 25 km/h", en: "Speed limited to 25 km/h" },
            B: { fr: "Interdites sur les trottoirs sauf autorisation du maire", en: "Prohibited on pavements unless authorised by the mayor" },
            C: { fr: "Pas de limite d'âge pour les conduire", en: "No age limit to ride them" },
            D: { fr: "Obligées de circuler sur les pistes cyclables quand elles existent", en: "Must use cycle lanes when available" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Les trottinettes électriques : 25 km/h max, interdites sur les trottoirs (sauf dérogation), doivent utiliser les pistes cyclables. L'âge minimum est 14 ans.",
        explanationEn: "Electric scooters: 25 km/h max, banned from pavements (unless exempted), must use cycle lanes. Minimum age is 14."
    },
    {
        id: "s41-017", topic: "autres_usagers", difficulty: 3,
        questionFr: "Quelles situations représentent un danger avec les poids lourds ?",
        questionEn: "Which situations are dangerous with heavy goods vehicles?",
        options: {
            A: { fr: "L'angle mort est beaucoup plus important qu'en voiture", en: "The blind spot is much larger than in a car" },
            B: { fr: "Leur distance de freinage est plus longue", en: "Their braking distance is longer" },
            C: { fr: "Ils créent un effet d'aspiration en vous dépassant", en: "They create a suction effect when overtaking you" },
            D: { fr: "Ils accélèrent plus vite que les voitures", en: "They accelerate faster than cars" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "Les poids lourds ont des angles morts importants, des distances de freinage longues et créent un effet d'aspiration. Ils accélèrent plus lentement que les voitures.",
        explanationEn: "Heavy goods vehicles have large blind spots, long braking distances, and create a suction effect. They accelerate more slowly than cars."
    },
    {
        id: "s41-018", topic: "autres_usagers", difficulty: 2,
        questionFr: "Quelles sont les obligations des conducteurs envers les personnes à mobilité réduite ?",
        questionEn: "What are drivers' obligations towards people with reduced mobility?",
        options: {
            A: { fr: "Leur laisser plus de temps pour traverser", en: "Give them more time to cross" },
            B: { fr: "Ne pas stationner sur les places réservées aux handicapés", en: "Not park in spaces reserved for disabled people" },
            C: { fr: "Ils n'ont pas de priorité particulière", en: "They have no special priority" },
            D: { fr: "Adapter sa conduite et faire preuve de patience", en: "Adapt driving and show patience" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Envers les personnes à mobilité réduite : leur laisser le temps, ne pas utiliser leurs places de stationnement, et adapter sa conduite avec patience.",
        explanationEn: "Towards people with reduced mobility: give them time, don't use their parking spaces, and adapt your driving with patience."
    },

    // === NOTIONS_DIVERSES (9 questions) ===
    {
        id: "s41-019", topic: "notions_diverses", difficulty: 2,
        questionFr: "Quels documents devez-vous avoir à bord de votre véhicule ?",
        questionEn: "Which documents must you have in your vehicle?",
        options: {
            A: { fr: "Le certificat d'immatriculation (carte grise)", en: "The registration certificate" },
            B: { fr: "L'attestation d'assurance en cours de validité", en: "Valid insurance certificate" },
            C: { fr: "Le carnet d'entretien du véhicule", en: "The vehicle maintenance log" },
            D: { fr: "Le permis de conduire", en: "The driving licence" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Documents obligatoires à bord : carte grise, attestation d'assurance et permis de conduire. Le carnet d'entretien est recommandé mais pas obligatoire.",
        explanationEn: "Mandatory documents: registration certificate, insurance certificate, and driving licence. The maintenance log is recommended but not mandatory."
    },
    {
        id: "s41-020", topic: "notions_diverses", difficulty: 2,
        questionFr: "Quels éléments le contrôle technique vérifie-t-il ?",
        questionEn: "What does the technical inspection check?",
        options: {
            A: { fr: "L'état des freins", en: "The condition of the brakes" },
            B: { fr: "Le niveau des émissions polluantes", en: "The level of pollutant emissions" },
            C: { fr: "La couleur de la carrosserie", en: "The colour of the bodywork" },
            D: { fr: "L'état des pneumatiques", en: "The condition of the tyres" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Le contrôle technique vérifie la sécurité (freins, pneus) et les émissions. La couleur de la carrosserie n'est pas un point de contrôle.",
        explanationEn: "The technical inspection checks safety (brakes, tyres) and emissions. The bodywork colour is not an inspection point."
    },
    {
        id: "s41-021", topic: "notions_diverses", difficulty: 3,
        questionFr: "Quelles affirmations sont vraies sur le permis probatoire ?",
        questionEn: "Which statements are true about the probationary licence?",
        options: {
            A: { fr: "Il dure 3 ans (2 ans avec conduite accompagnée)", en: "It lasts 3 years (2 with supervised driving)" },
            B: { fr: "Le capital initial est de 6 points", en: "The initial point balance is 6 points" },
            C: { fr: "L'alcoolémie autorisée est de 0,5 g/l", en: "The permitted blood alcohol level is 0.5 g/l" },
            D: { fr: "Un signe A doit être apposé à l'arrière du véhicule", en: "An A sign must be displayed at the rear of the vehicle" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Le permis probatoire : 3 ans (ou 2 avec AAC), 6 points initiaux, disque A obligatoire. L'alcoolémie est limitée à 0,2 g/l, pas 0,5.",
        explanationEn: "Probationary licence: 3 years (or 2 with supervised driving), 6 initial points, A disc required. The alcohol limit is 0.2 g/l, not 0.5."
    },
    {
        id: "s41-022", topic: "notions_diverses", difficulty: 2,
        questionFr: "Quelles mesures favorisent l'éco-conduite ?",
        questionEn: "Which measures promote eco-driving?",
        options: {
            A: { fr: "Anticiper les freinages", en: "Anticipate braking" },
            B: { fr: "Maintenir une vitesse stable", en: "Maintain a steady speed" },
            C: { fr: "Accélérer brusquement pour atteindre la vitesse souhaitée", en: "Accelerate suddenly to reach desired speed" },
            D: { fr: "Vérifier régulièrement la pression des pneus", en: "Regularly check tyre pressure" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "L'éco-conduite : anticiper, vitesse stable, pneus bien gonflés. Les accélérations brusques augmentent la consommation.",
        explanationEn: "Eco-driving: anticipate, steady speed, proper tyre pressure. Sudden acceleration increases fuel consumption."
    },
    {
        id: "s41-023", topic: "notions_diverses", difficulty: 3,
        questionFr: "Quelles affirmations sur l'assurance automobile sont correctes ?",
        questionEn: "Which statements about car insurance are correct?",
        options: {
            A: { fr: "L'assurance au tiers est le minimum légal obligatoire", en: "Third-party insurance is the legal minimum" },
            B: { fr: "Elle couvre les dommages causés aux autres", en: "It covers damage caused to others" },
            C: { fr: "Conduire sans assurance est un délit", en: "Driving without insurance is a criminal offence" },
            D: { fr: "L'assurance tous risques est obligatoire pour les voitures neuves", en: "Comprehensive insurance is mandatory for new cars" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "L'assurance au tiers (responsabilité civile) est le minimum légal, couvre les dommages aux tiers, et conduire sans est un délit. L'assurance tous risques n'est pas obligatoire.",
        explanationEn: "Third-party insurance is the legal minimum, covers damage to others, and driving without it is a criminal offence. Comprehensive insurance is not mandatory."
    },
    {
        id: "s41-024", topic: "notions_diverses", difficulty: 2,
        questionFr: "Quels équipements de sécurité sont obligatoires dans un véhicule ?",
        questionEn: "Which safety equipment is mandatory in a vehicle?",
        options: {
            A: { fr: "Un gilet de haute visibilité", en: "A high-visibility vest" },
            B: { fr: "Un triangle de présignalisation", en: "A warning triangle" },
            C: { fr: "Un extincteur", en: "A fire extinguisher" },
            D: { fr: "Un éthylotest (recommandé mais non sanctionné)", en: "A breathalyser (recommended but not penalised)" }
        },
        correctAnswers: ["A","B"], answerCount: 2,
        explanationFr: "Le gilet et le triangle sont obligatoires. L'éthylotest est obligatoire mais l'absence n'est pas sanctionnée. L'extincteur n'est pas obligatoire pour les particuliers.",
        explanationEn: "The vest and triangle are mandatory. The breathalyser is required but not penalised if missing. A fire extinguisher is not mandatory for private vehicles."
    },
    {
        id: "s41-025", topic: "notions_diverses", difficulty: 2,
        questionFr: "Quels effets l'alcool a-t-il sur la conduite ?",
        questionEn: "What effects does alcohol have on driving?",
        options: {
            A: { fr: "Augmentation du temps de réaction", en: "Increased reaction time" },
            B: { fr: "Rétrécissement du champ visuel", en: "Narrowing of the visual field" },
            C: { fr: "Amélioration de la concentration", en: "Improved concentration" },
            D: { fr: "Sous-estimation des dangers", en: "Underestimation of dangers" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "L'alcool augmente le temps de réaction, réduit le champ visuel et pousse à sous-estimer les dangers. Il ne favorise jamais la concentration.",
        explanationEn: "Alcohol increases reaction time, narrows the visual field, and leads to underestimating dangers. It never improves concentration."
    },
    {
        id: "s41-026", topic: "notions_diverses", difficulty: 3,
        questionFr: "Quelles sont les conséquences de la conduite sous l'emprise de stupéfiants ?",
        questionEn: "What are the consequences of driving under the influence of drugs?",
        options: {
            A: { fr: "Retrait de 6 points", en: "Loss of 6 points" },
            B: { fr: "Jusqu'à 2 ans d'emprisonnement", en: "Up to 2 years imprisonment" },
            C: { fr: "Amende pouvant atteindre 4 500 €", en: "Fine up to €4,500" },
            D: { fr: "Simple contravention sans conséquence pénale", en: "Simple fine with no criminal consequence" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "La conduite sous stupéfiants est un délit : 6 points retirés, jusqu'à 2 ans de prison et 4 500 € d'amende. Ce n'est pas une simple contravention.",
        explanationEn: "Driving under the influence of drugs is a criminal offence: 6 points lost, up to 2 years in prison and €4,500 fine. It is not a simple fine."
    },
    {
        id: "s41-027", topic: "notions_diverses", difficulty: 2,
        questionFr: "Quelles précautions prendre pour économiser du carburant ?",
        questionEn: "What precautions should you take to save fuel?",
        options: {
            A: { fr: "Retirer les barres de toit inutilisées", en: "Remove unused roof bars" },
            B: { fr: "Utiliser la climatisation en permanence", en: "Use air conditioning constantly" },
            C: { fr: "Passer les vitesses à bas régime", en: "Shift gears at low RPM" },
            D: { fr: "Couper le moteur lors d'arrêts prolongés", en: "Turn off the engine during extended stops" }
        },
        correctAnswers: ["A","C","D"], answerCount: 3,
        explanationFr: "Pour économiser : retirer les charges inutiles, passer les rapports tôt, couper le moteur à l'arrêt. La climatisation augmente la consommation.",
        explanationEn: "To save fuel: remove unnecessary loads, shift early, turn off engine when stopped. Air conditioning increases consumption."
    },

    // === PRIORITE (10 questions) ===
    {
        id: "s41-028", topic: "priorite", difficulty: 2,
        questionFr: "Quelles affirmations sont correctes sur la priorité à droite ?",
        questionEn: "Which statements are correct about priority to the right?",
        options: {
            A: { fr: "Elle s'applique par défaut en l'absence de signalisation", en: "It applies by default without signage" },
            B: { fr: "Elle s'applique aussi dans les parkings", en: "It also applies in car parks" },
            C: { fr: "Elle ne s'applique pas aux ronds-points avec panneau AB25", en: "It does not apply to roundabouts with AB25 sign" },
            D: { fr: "Elle concerne uniquement les voitures", en: "It applies only to cars" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "La priorité à droite est la règle par défaut, y compris dans les parkings. Aux ronds-points avec AB25, c'est le véhicule dans le rond-point qui a priorité. Elle s'applique à tous les véhicules.",
        explanationEn: "Priority to the right is the default rule, including in car parks. At roundabouts with AB25, vehicles in the roundabout have priority. It applies to all vehicles."
    },
    {
        id: "s41-029", topic: "priorite", difficulty: 3,
        questionFr: "Quelles situations annulent la priorité à droite ?",
        questionEn: "Which situations cancel priority to the right?",
        options: {
            A: { fr: "Un panneau STOP", en: "A STOP sign" },
            B: { fr: "Un feu tricolore", en: "A traffic light" },
            C: { fr: "Un panneau Cédez le passage", en: "A Give Way sign" },
            D: { fr: "Une route plus large que la vôtre", en: "A road wider than yours" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "Le STOP, le feu et le Cédez le passage annulent la priorité à droite. La largeur de la route n'a aucune influence sur la priorité.",
        explanationEn: "STOP signs, traffic lights, and Give Way signs override priority to the right. Road width has no influence on priority."
    },
    {
        id: "s41-030", topic: "priorite", difficulty: 2,
        questionFr: "Quelles règles s'appliquent à un carrefour giratoire (rond-point) ?",
        questionEn: "Which rules apply at a roundabout?",
        options: {
            A: { fr: "Céder le passage aux véhicules déjà engagés", en: "Give way to vehicles already in the roundabout" },
            B: { fr: "Mettre son clignotant pour sortir", en: "Use indicator to exit" },
            C: { fr: "Accélérer pour entrer rapidement", en: "Accelerate to enter quickly" },
            D: { fr: "Circuler dans le sens inverse des aiguilles d'une montre", en: "Drive counterclockwise" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Rond-point : céder le passage, clignotant en sortie, circuler dans le sens antihoraire. Ne jamais accélérer pour s'insérer.",
        explanationEn: "Roundabout: give way, indicate when exiting, drive counterclockwise. Never accelerate to enter."
    },
    {
        id: "s41-031", topic: "priorite", difficulty: 3,
        questionFr: "Quelles affirmations concernant le panneau STOP sont correctes ?",
        questionEn: "Which statements about the STOP sign are correct?",
        options: {
            A: { fr: "L'arrêt est obligatoire même si la voie est libre", en: "Stopping is mandatory even if the road is clear" },
            B: { fr: "On doit s'arrêter à la ligne d'effet du panneau", en: "You must stop at the stop line" },
            C: { fr: "On peut ralentir sans s'arrêter si la visibilité est bonne", en: "You can slow down without stopping if visibility is good" },
            D: { fr: "Le non-respect est sanctionné par un retrait de 4 points", en: "Failure to comply results in a 4-point deduction" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Au STOP, l'arrêt complet est toujours obligatoire à la ligne, même voie libre. Le non-respect coûte 4 points et une amende de 135 €.",
        explanationEn: "At a STOP sign, a complete stop at the line is always mandatory, even if the road is clear. Non-compliance costs 4 points and a €135 fine."
    },
    {
        id: "s41-032", topic: "priorite", difficulty: 2,
        questionFr: "Quelles sont vos obligations face à un agent de la circulation ?",
        questionEn: "What are your obligations when facing a traffic officer?",
        options: {
            A: { fr: "Ses indications priment sur les feux et panneaux", en: "Their directions override lights and signs" },
            B: { fr: "Vous devez obéir immédiatement à ses gestes", en: "You must immediately obey their gestures" },
            C: { fr: "Vous pouvez ignorer ses gestes si le feu est vert", en: "You can ignore their gestures if the light is green" },
            D: { fr: "Un bras levé signifie arrêt pour tous les usagers", en: "A raised arm means stop for all road users" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "L'agent prime sur toute signalisation. Bras levé = arrêt obligatoire. Vous ne pouvez jamais ignorer un agent même si le feu est vert.",
        explanationEn: "The officer overrides all signage. Raised arm = mandatory stop. You can never ignore an officer even if the light is green."
    },
    {
        id: "s41-033", topic: "priorite", difficulty: 2,
        questionFr: "Quelles situations donnent la priorité de passage à votre véhicule ?",
        questionEn: "In which situations does your vehicle have right of way?",
        options: {
            A: { fr: "Vous êtes sur une route prioritaire signalée", en: "You are on a signed priority road" },
            B: { fr: "L'autre véhicule a un panneau Cédez le passage", en: "The other vehicle has a Give Way sign" },
            C: { fr: "Vous arrivez le premier à l'intersection", en: "You arrive first at the intersection" },
            D: { fr: "Vous roulez plus vite que l'autre véhicule", en: "You are driving faster than the other vehicle" }
        },
        correctAnswers: ["A","B"], answerCount: 2,
        explanationFr: "Vous avez priorité sur une route prioritaire ou quand l'autre a un Cédez le passage/STOP. Arriver en premier ou rouler plus vite ne donne aucune priorité.",
        explanationEn: "You have priority on a priority road or when the other has a Give Way/STOP. Arriving first or driving faster gives no priority."
    },
    {
        id: "s41-034", topic: "priorite", difficulty: 3,
        questionFr: "Quelles règles s'appliquent aux intersections avec des feux tricolores ?",
        questionEn: "Which rules apply at intersections with traffic lights?",
        options: {
            A: { fr: "Le feu orange fixe signifie arrêt sauf impossibilité", en: "A steady amber light means stop unless unable" },
            B: { fr: "Le feu rouge interdit de franchir la ligne d'arrêt", en: "A red light prohibits crossing the stop line" },
            C: { fr: "Le feu orange clignotant signifie priorité à droite", en: "A flashing amber light means priority to the right" },
            D: { fr: "On peut passer au rouge si la voie est libre", en: "You can go through red if the road is clear" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "Orange fixe = arrêt (sauf impossibilité d'arrêt en sécurité). Rouge = interdit. Orange clignotant = prudence + priorité à droite. On ne passe jamais au rouge.",
        explanationEn: "Steady amber = stop (unless unable to stop safely). Red = forbidden. Flashing amber = caution + priority to the right. Never run a red light."
    },
    {
        id: "s41-035", topic: "priorite", difficulty: 2,
        questionFr: "Quelles affirmations sont vraies quand vous sortez d'un stationnement ?",
        questionEn: "Which statements are true when leaving a parking space?",
        options: {
            A: { fr: "Vous devez céder le passage à tous les usagers", en: "You must give way to all road users" },
            B: { fr: "Vous devez utiliser votre clignotant", en: "You must use your indicator" },
            C: { fr: "Vous avez priorité car vous quittez un espace privé", en: "You have priority because you are leaving a private space" },
            D: { fr: "Vous devez vérifier vos angles morts", en: "You must check your blind spots" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "En quittant un stationnement, vous n'avez aucune priorité. Vous devez céder le passage, signaler et vérifier vos angles morts.",
        explanationEn: "When leaving a parking space, you have no priority. You must give way, signal, and check blind spots."
    },
    {
        id: "s41-036", topic: "priorite", difficulty: 3,
        questionFr: "Quelles affirmations sont correctes sur la priorité en montagne ?",
        questionEn: "Which statements are correct about priority on mountain roads?",
        options: {
            A: { fr: "Le véhicule montant a la priorité sur le descendant", en: "The ascending vehicle has priority over the descending one" },
            B: { fr: "Le poids lourd a priorité sur le véhicule léger", en: "Heavy vehicles have priority over light vehicles" },
            C: { fr: "Le premier arrivé au passage étroit a toujours priorité", en: "The first to arrive at a narrow passage always has priority" },
            D: { fr: "Le véhicule le plus près d'une aire de croisement doit reculer", en: "The vehicle closest to a passing place must reverse" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "En montagne : le montant a priorité sur le descendant, le poids lourd sur le léger, et le plus proche d'une aire de croisement recule. L'ordre d'arrivée ne compte pas.",
        explanationEn: "On mountain roads: ascending has priority over descending, heavy over light, and the nearest to a passing place reverses. Arrival order doesn't matter."
    },
    {
        id: "s41-037", topic: "priorite", difficulty: 2,
        questionFr: "Quelles règles de priorité s'appliquent sur une voie d'insertion d'autoroute ?",
        questionEn: "Which priority rules apply on a motorway slip road?",
        options: {
            A: { fr: "Les véhicules sur l'autoroute ont la priorité", en: "Vehicles on the motorway have priority" },
            B: { fr: "Vous devez adapter votre vitesse pour vous insérer", en: "You must adapt your speed to merge" },
            C: { fr: "Vous avez priorité car vous arrivez par la droite", en: "You have priority because you come from the right" },
            D: { fr: "Vous devez utiliser toute la longueur de la voie d'accélération", en: "You must use the full length of the acceleration lane" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Sur une voie d'insertion : les véhicules sur l'autoroute ont priorité. Vous devez accélérer pour atteindre la vitesse du trafic et utiliser la voie d'accélération. La priorité à droite ne s'applique PAS.",
        explanationEn: "On a slip road: motorway vehicles have priority. You must accelerate to match traffic speed and use the acceleration lane. Priority to the right does NOT apply."
    },

    // === SIGNALISATION (9 questions) ===
    {
        id: "s41-038", topic: "signalisation", difficulty: 2,
        questionFr: "Quelles affirmations sont correctes sur les panneaux de forme triangulaire ?",
        questionEn: "Which statements are correct about triangular signs?",
        options: {
            A: { fr: "Ils indiquent un danger", en: "They indicate danger" },
            B: { fr: "Ils sont placés 150 m avant le danger hors agglomération", en: "They are placed 150m before the danger outside urban areas" },
            C: { fr: "Ils obligent à s'arrêter", en: "They require stopping" },
            D: { fr: "Ils ont un bord rouge", en: "They have a red border" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Les panneaux triangulaires à bord rouge signalent un danger, placés à environ 150 m hors agglomération (50 m en ville). Ils ne nécessitent pas d'arrêt.",
        explanationEn: "Triangular signs with red borders indicate danger, placed about 150m outside urban areas (50m in town). They don't require stopping."
    },
    {
        id: "s41-039", topic: "signalisation", difficulty: 3,
        questionFr: "Quelles informations les panneaux de type C (carrés bleus) donnent-ils ?",
        questionEn: "What information do type C signs (blue squares) provide?",
        options: {
            A: { fr: "Des indications de direction", en: "Direction information" },
            B: { fr: "Des obligations de circulation", en: "Traffic obligations" },
            C: { fr: "Des interdictions", en: "Prohibitions" },
            D: { fr: "Des informations utiles (parking, hôpital)", en: "Useful information (parking, hospital)" }
        },
        correctAnswers: ["A","D"], answerCount: 2,
        explanationFr: "Les panneaux carrés bleus donnent des indications et informations utiles (direction, parking, hôpital). Les obligations sont sur fond bleu rond, les interdictions sur fond blanc rond à bord rouge.",
        explanationEn: "Blue square signs provide useful indications and information (directions, parking, hospital). Obligations are on round blue, prohibitions on round white with red border."
    },
    {
        id: "s41-040", topic: "signalisation", difficulty: 2,
        questionFr: "Quelles affirmations sont vraies sur le marquage au sol jaune ?",
        questionEn: "Which statements are true about yellow road markings?",
        options: {
            A: { fr: "Une ligne jaune en zigzag indique un arrêt de bus", en: "A yellow zigzag line indicates a bus stop" },
            B: { fr: "Le jaune au sol signifie stationnement interdit", en: "Yellow on the ground means parking prohibited" },
            C: { fr: "Les lignes jaunes sont plus prioritaires que les blanches", en: "Yellow lines have more priority than white ones" },
            D: { fr: "Le marquage jaune peut indiquer des zones de livraison", en: "Yellow markings can indicate delivery zones" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Le marquage jaune : zigzag = arrêt de bus, ligne continue = stationnement interdit, zones hachurées jaunes = livraison. Il n'est pas plus 'prioritaire' que le blanc.",
        explanationEn: "Yellow markings: zigzag = bus stop, solid line = no parking, hatched yellow = delivery zone. It doesn't have 'more priority' than white."
    },
    {
        id: "s41-041", topic: "signalisation", difficulty: 2,
        questionFr: "Quelles sont les caractéristiques des panneaux d'interdiction ?",
        questionEn: "What are the characteristics of prohibition signs?",
        options: {
            A: { fr: "Ils sont ronds avec un bord rouge", en: "They are round with a red border" },
            B: { fr: "Le fond est blanc", en: "The background is white" },
            C: { fr: "Ils sont annulés par un panneau identique barré de lignes obliques", en: "They are cancelled by an identical sign with diagonal lines" },
            D: { fr: "Ils sont toujours placés à droite de la route", en: "They are always placed on the right side of the road" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "Les panneaux d'interdiction sont ronds, fond blanc, bord rouge. Ils sont annulés par le même panneau barré. Ils peuvent être placés des deux côtés.",
        explanationEn: "Prohibition signs are round, white background, red border. They are cancelled by the same sign crossed out. They can be placed on either side."
    },
    {
        id: "s41-042", topic: "signalisation", difficulty: 3,
        questionFr: "Que signifient les panonceaux (petits panneaux sous les panneaux principaux) ?",
        questionEn: "What do supplementary panels (small signs under main signs) mean?",
        options: {
            A: { fr: "Ils précisent la distance à laquelle s'applique le panneau", en: "They specify the distance at which the sign applies" },
            B: { fr: "Ils indiquent les catégories de véhicules concernés", en: "They indicate which vehicle categories are affected" },
            C: { fr: "Ils remplacent le panneau principal", en: "They replace the main sign" },
            D: { fr: "Ils peuvent indiquer des horaires de validité", en: "They can indicate validity hours" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Les panonceaux complètent le panneau principal : distance, véhicules concernés, horaires. Ils ne remplacent jamais le panneau principal.",
        explanationEn: "Supplementary panels complement the main sign: distance, affected vehicles, hours. They never replace the main sign."
    },
    {
        id: "s41-043", topic: "signalisation", difficulty: 2,
        questionFr: "Quelles lignes au sol autorisent le franchissement ?",
        questionEn: "Which road lines allow crossing?",
        options: {
            A: { fr: "La ligne discontinue (pointillés)", en: "The broken line (dashes)" },
            B: { fr: "La ligne continue", en: "The solid line" },
            C: { fr: "La ligne mixte depuis le côté discontinu", en: "The mixed line from the broken side" },
            D: { fr: "La ligne de dissuasion (pointillés rapprochés)", en: "The dissuasion line (close dashes)" }
        },
        correctAnswers: ["A","C","D"], answerCount: 3,
        explanationFr: "On peut franchir : la ligne discontinue, la ligne mixte depuis le côté pointillé, et la ligne de dissuasion (déconseillé mais autorisé). La ligne continue est infranchissable.",
        explanationEn: "You may cross: the broken line, the mixed line from the broken side, and the dissuasion line (not recommended but allowed). The solid line must not be crossed."
    },
    {
        id: "s41-044", topic: "signalisation", difficulty: 3,
        questionFr: "Quelles affirmations sont correctes sur les balises et les bornes ?",
        questionEn: "Which statements are correct about delineator posts and markers?",
        options: {
            A: { fr: "Les balises de virage sont rouges et blanches", en: "Curve delineators are red and white" },
            B: { fr: "Les bornes kilométriques indiquent la distance", en: "Kilometre markers indicate distance" },
            C: { fr: "Les balises J5 signalent la présence d'un îlot", en: "J5 markers signal the presence of an island" },
            D: { fr: "Les balises de position indiquent la limite de la chaussée", en: "Position markers indicate the edge of the road" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Balises de virage : rouge et blanc. Bornes kilométriques : distance. Balises de position : limite de chaussée. Les J5 indiquent la tête d'un terre-plein, pas un îlot.",
        explanationEn: "Curve delineators: red and white. Kilometre markers: distance. Position markers: edge of road. J5 markers indicate the head of a traffic island."
    },
    {
        id: "s41-045", topic: "signalisation", difficulty: 2,
        questionFr: "Quelles sont les significations du feu clignotant orange ?",
        questionEn: "What are the meanings of a flashing amber light?",
        options: {
            A: { fr: "Ralentir et faire preuve de prudence", en: "Slow down and exercise caution" },
            B: { fr: "La priorité à droite s'applique", en: "Priority to the right applies" },
            C: { fr: "L'intersection est réglementée par des panneaux", en: "The intersection is regulated by signs" },
            D: { fr: "Vous devez obligatoirement vous arrêter", en: "You must stop" }
        },
        correctAnswers: ["A","B"], answerCount: 2,
        explanationFr: "Le feu clignotant orange signifie prudence et retour à la priorité à droite (ou panneaux en place). L'arrêt n'est pas obligatoire.",
        explanationEn: "A flashing amber light means caution and return to priority to the right (or signs in place). Stopping is not mandatory."
    },
    {
        id: "s41-046", topic: "signalisation", difficulty: 3,
        questionFr: "Quelles affirmations sur les panneaux d'obligation (ronds bleus) sont correctes ?",
        questionEn: "Which statements about obligation signs (round blue) are correct?",
        options: {
            A: { fr: "Ils imposent une direction ou un comportement", en: "They impose a direction or behaviour" },
            B: { fr: "Ils sont annulés par un panneau barré de la même série", en: "They are cancelled by a crossed-out sign of the same series" },
            C: { fr: "Le panneau de chaînes obligatoires en fait partie", en: "The mandatory snow chains sign is part of this series" },
            D: { fr: "Ils peuvent être triangulaires en zone urbaine", en: "They can be triangular in urban areas" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "Les panneaux ronds bleus imposent une obligation (direction, chaînes, etc.). Ils sont annulés par leur version barrée. Ils sont toujours ronds, jamais triangulaires.",
        explanationEn: "Round blue signs impose obligations (direction, chains, etc.). They are cancelled by their crossed-out version. They are always round, never triangular."
    },

    // === ROUTE (8 questions) ===
    {
        id: "s41-047", topic: "route", difficulty: 2,
        questionFr: "Quels facteurs augmentent la distance de freinage sur route mouillée ?",
        questionEn: "What factors increase braking distance on a wet road?",
        options: {
            A: { fr: "L'aquaplanage réduit l'adhérence", en: "Aquaplaning reduces grip" },
            B: { fr: "Les pneus usés sont moins efficaces", en: "Worn tyres are less effective" },
            C: { fr: "La distance de freinage peut doubler", en: "Braking distance can double" },
            D: { fr: "Les freins fonctionnent mieux sur route mouillée", en: "Brakes work better on wet roads" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "Sur route mouillée : risque d'aquaplanage, pneus usés = danger accru, distance de freinage jusqu'à 2x plus longue. Les freins ne fonctionnent jamais mieux sur sol mouillé.",
        explanationEn: "On wet roads: risk of aquaplaning, worn tyres = increased danger, braking distance up to 2x longer. Brakes never work better on wet surfaces."
    },
    {
        id: "s41-048", topic: "route", difficulty: 2,
        questionFr: "Quelles précautions prendre sur une route de campagne ?",
        questionEn: "What precautions should you take on a country road?",
        options: {
            A: { fr: "Anticiper les virages sans visibilité", en: "Anticipate blind corners" },
            B: { fr: "Se méfier des engins agricoles lents", en: "Beware of slow agricultural vehicles" },
            C: { fr: "Rouler au milieu de la chaussée en l'absence de trafic", en: "Drive in the middle of the road if no traffic" },
            D: { fr: "Faire attention aux animaux pouvant traverser", en: "Watch for animals that may cross" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Sur route de campagne : anticiper les virages, se méfier des engins agricoles et des animaux. Ne jamais rouler au milieu même sans trafic apparent.",
        explanationEn: "On country roads: anticipate bends, watch for farm vehicles and animals. Never drive in the middle even with no apparent traffic."
    },
    {
        id: "s41-049", topic: "route", difficulty: 3,
        questionFr: "Quelles affirmations sont vraies sur les voies réservées aux bus ?",
        questionEn: "Which statements are true about bus lanes?",
        options: {
            A: { fr: "Les taxis peuvent y circuler sauf indication contraire", en: "Taxis can use them unless otherwise indicated" },
            B: { fr: "Les vélos peuvent les emprunter si un panneau l'autorise", en: "Bicycles can use them if a sign permits" },
            C: { fr: "Tout le monde peut y rouler le dimanche", en: "Everyone can drive in them on Sundays" },
            D: { fr: "Les véhicules d'urgence peuvent les utiliser", en: "Emergency vehicles can use them" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Voies bus : accessibles aux taxis, aux vélos (si signalé) et aux véhicules d'urgence. Il n'y a pas de règle générale les ouvrant le dimanche.",
        explanationEn: "Bus lanes: accessible to taxis, bicycles (if signed), and emergency vehicles. There is no general rule opening them on Sundays."
    },
    {
        id: "s41-050", topic: "route", difficulty: 2,
        questionFr: "Quels dangers spécifiques présentent les tunnels ?",
        questionEn: "What specific dangers do tunnels present?",
        options: {
            A: { fr: "Risque d'éblouissement à l'entrée et à la sortie", en: "Risk of glare at entry and exit" },
            B: { fr: "Distances difficiles à évaluer", en: "Distances hard to judge" },
            C: { fr: "On peut dépasser librement dans un tunnel large", en: "You can overtake freely in a wide tunnel" },
            D: { fr: "La concentration de gaz toxiques est plus élevée", en: "The concentration of toxic gases is higher" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Tunnels : éblouissement entrée/sortie, distances trompeuses, gaz toxiques concentrés. Le dépassement est généralement interdit en tunnel.",
        explanationEn: "Tunnels: glare at entry/exit, deceptive distances, concentrated toxic gases. Overtaking is generally prohibited in tunnels."
    },
    {
        id: "s41-051", topic: "route", difficulty: 3,
        questionFr: "Quelles précautions prendre en descente prolongée ?",
        questionEn: "What precautions should you take on a long descent?",
        options: {
            A: { fr: "Utiliser le frein moteur en rétrogradant", en: "Use engine braking by downshifting" },
            B: { fr: "Ne pas maintenir le pied sur la pédale de frein en continu", en: "Don't keep your foot on the brake pedal continuously" },
            C: { fr: "Accélérer dans les virages pour maintenir la stabilité", en: "Accelerate in curves to maintain stability" },
            D: { fr: "Adapter sa vitesse avant les virages", en: "Adjust speed before curves" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "En descente : frein moteur, éviter le freinage continu (surchauffe), ralentir avant les virages. Accélérer dans les virages est dangereux.",
        explanationEn: "On descents: engine braking, avoid continuous braking (overheating), slow down before curves. Accelerating in curves is dangerous."
    },
    {
        id: "s41-052", topic: "route", difficulty: 2,
        questionFr: "Quelles affirmations sont vraies concernant l'éclairage public et la conduite de nuit ?",
        questionEn: "Which statements are true about street lighting and night driving?",
        options: {
            A: { fr: "En agglomération éclairée, les feux de croisement suffisent", en: "In lit urban areas, dipped headlights are sufficient" },
            B: { fr: "Les feux de route sont interdits en présence d'un véhicule en face", en: "Full beams are prohibited when a vehicle is ahead" },
            C: { fr: "La fatigue est un risque majeur de nuit", en: "Fatigue is a major risk at night" },
            D: { fr: "Les feux de position seuls suffisent hors agglomération", en: "Sidelights alone are sufficient outside urban areas" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "De nuit en ville éclairée : feux de croisement. Feux de route interdits face à un autre véhicule. La fatigue est un danger majeur. Hors agglomération, les feux de position seuls sont insuffisants.",
        explanationEn: "At night in lit towns: dipped headlights. Full beams forbidden facing another vehicle. Fatigue is a major danger. Outside towns, sidelights alone are insufficient."
    },
    {
        id: "s41-053", topic: "route", difficulty: 2,
        questionFr: "Quels sont les risques d'une route en mauvais état ?",
        questionEn: "What are the risks of a road in poor condition?",
        options: {
            A: { fr: "Perte d'adhérence sur les nids-de-poule", en: "Loss of grip on potholes" },
            B: { fr: "Risque de crevaison", en: "Risk of tyre puncture" },
            C: { fr: "Les amortisseurs compensent tous les défauts", en: "Shock absorbers compensate for all defects" },
            D: { fr: "Instabilité du véhicule", en: "Vehicle instability" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Route en mauvais état : perte d'adhérence, risque de crevaison, instabilité. Les amortisseurs ne compensent pas tout.",
        explanationEn: "Poor road conditions: loss of grip, puncture risk, instability. Shock absorbers don't compensate for everything."
    },
    {
        id: "s41-054", topic: "route", difficulty: 3,
        questionFr: "Quelles règles s'appliquent sur les routes à accès réglementé (voies express) ?",
        questionEn: "Which rules apply on controlled-access roads (expressways)?",
        options: {
            A: { fr: "Les piétons sont interdits", en: "Pedestrians are prohibited" },
            B: { fr: "La vitesse minimale est de 80 km/h", en: "The minimum speed is 80 km/h" },
            C: { fr: "Le demi-tour et la marche arrière sont interdits", en: "U-turns and reversing are prohibited" },
            D: { fr: "L'arrêt et le stationnement sont interdits sauf urgence", en: "Stopping and parking are prohibited except in emergencies" }
        },
        correctAnswers: ["A","C","D"], answerCount: 3,
        explanationFr: "Voies express : interdiction piétons, demi-tour/marche arrière, stationnement (sauf urgence). Il n'y a pas de vitesse minimale imposée de 80 km/h.",
        explanationEn: "Expressways: no pedestrians, no U-turns/reversing, no stopping/parking (except emergencies). There is no imposed minimum speed of 80 km/h."
    },

    // === ARRET_STATIONNEMENT (8 questions) ===
    {
        id: "s41-055", topic: "arret_stationnement", difficulty: 2,
        questionFr: "Quelles affirmations sont correctes sur le stationnement en agglomération ?",
        questionEn: "Which statements are correct about parking in urban areas?",
        options: {
            A: { fr: "Le stationnement est interdit à moins de 5 m d'un passage piéton", en: "Parking is prohibited within 5m of a pedestrian crossing" },
            B: { fr: "Le stationnement en double file est toujours interdit", en: "Double parking is always prohibited" },
            C: { fr: "On peut stationner sur un trottoir large", en: "You can park on a wide pavement" },
            D: { fr: "Le stationnement gênant est une infraction", en: "Obstructive parking is an offence" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Stationnement interdit à moins de 5 m d'un passage piéton, en double file, et le stationnement gênant est sanctionné. Le trottoir est réservé aux piétons.",
        explanationEn: "Parking prohibited within 5m of a crossing, double parking is banned, and obstructive parking is penalised. The pavement is for pedestrians."
    },
    {
        id: "s41-056", topic: "arret_stationnement", difficulty: 3,
        questionFr: "Quelles sont les différences entre un arrêt et un stationnement ?",
        questionEn: "What are the differences between stopping and parking?",
        options: {
            A: { fr: "L'arrêt est de courte durée, le conducteur reste près du véhicule", en: "Stopping is brief, the driver stays near the vehicle" },
            B: { fr: "Le stationnement implique que le conducteur quitte le véhicule", en: "Parking means the driver leaves the vehicle" },
            C: { fr: "L'arrêt et le stationnement sont la même chose légalement", en: "Stopping and parking are the same thing legally" },
            D: { fr: "L'arrêt est autorisé dans plus d'endroits que le stationnement", en: "Stopping is allowed in more places than parking" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "L'arrêt est temporaire (conducteur à proximité), le stationnement est prolongé (conducteur absent). L'arrêt est autorisé là où le stationnement est interdit.",
        explanationEn: "Stopping is temporary (driver nearby), parking is prolonged (driver absent). Stopping is allowed where parking is prohibited."
    },
    {
        id: "s41-057", topic: "arret_stationnement", difficulty: 2,
        questionFr: "Où le stationnement est-il toujours interdit ?",
        questionEn: "Where is parking always prohibited?",
        options: {
            A: { fr: "Sur les ponts et dans les tunnels", en: "On bridges and in tunnels" },
            B: { fr: "Devant les entrées de propriétés", en: "In front of property entrances" },
            C: { fr: "Sur les emplacements réservés aux livraisons", en: "In delivery zones" },
            D: { fr: "Sur les routes nationales droites et larges", en: "On straight, wide national roads" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "Stationnement interdit sur ponts, tunnels, devant les entrées, et zones de livraison. Les routes nationales droites ne sont pas forcément interdites au stationnement.",
        explanationEn: "Parking prohibited on bridges, in tunnels, in front of entrances, and delivery zones. Straight national roads are not necessarily no-parking zones."
    },
    {
        id: "s41-058", topic: "arret_stationnement", difficulty: 3,
        questionFr: "Quelles règles s'appliquent au stationnement payant ?",
        questionEn: "Which rules apply to paid parking?",
        options: {
            A: { fr: "Le non-paiement peut entraîner un forfait post-stationnement (FPS)", en: "Non-payment can result in a post-parking fine (FPS)" },
            B: { fr: "Le FPS remplace l'ancienne amende de stationnement", en: "The FPS replaces the old parking fine" },
            C: { fr: "Le montant est fixé par chaque commune", en: "The amount is set by each municipality" },
            D: { fr: "Il n'y a aucune sanction pour un dépassement de quelques minutes", en: "There is no penalty for exceeding by a few minutes" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "Stationnement payant : le FPS remplace l'amende, fixé par la commune. Tout dépassement, même de quelques minutes, peut être sanctionné.",
        explanationEn: "Paid parking: FPS replaces the old fine, set by the municipality. Any overstay, even a few minutes, can be penalised."
    },
    {
        id: "s41-059", topic: "arret_stationnement", difficulty: 2,
        questionFr: "Quelles précautions prendre en quittant un stationnement en créneau ?",
        questionEn: "What precautions should you take when leaving a parallel parking space?",
        options: {
            A: { fr: "Vérifier les rétroviseurs et les angles morts", en: "Check mirrors and blind spots" },
            B: { fr: "Utiliser le clignotant", en: "Use the indicator" },
            C: { fr: "Sortir rapidement pour ne pas gêner la circulation", en: "Pull out quickly to avoid obstructing traffic" },
            D: { fr: "Céder le passage aux véhicules en circulation", en: "Give way to vehicles in traffic" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "En quittant un créneau : vérifier, signaler, céder le passage. Ne jamais sortir rapidement — la prudence prime sur la fluidité.",
        explanationEn: "When leaving parallel parking: check, signal, give way. Never pull out quickly — caution takes precedence over flow."
    },
    {
        id: "s41-060", topic: "arret_stationnement", difficulty: 2,
        questionFr: "Quelles affirmations sont vraies sur le stationnement en pente ?",
        questionEn: "Which statements are true about parking on a slope?",
        options: {
            A: { fr: "Serrer le frein à main", en: "Apply the handbrake" },
            B: { fr: "Braquer les roues vers le trottoir en descente", en: "Turn wheels towards the kerb when downhill" },
            C: { fr: "Laisser une vitesse engagée (1ère en montée, marche arrière en descente)", en: "Leave a gear engaged (1st uphill, reverse downhill)" },
            D: { fr: "Le frein à main suffit toujours, pas besoin de vitesse", en: "The handbrake is always sufficient, no need for a gear" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "En pente : frein à main + vitesse engagée + braquer les roues. Le frein à main seul peut être insuffisant.",
        explanationEn: "On slopes: handbrake + gear engaged + turn wheels. The handbrake alone may be insufficient."
    },
    {
        id: "s41-061", topic: "arret_stationnement", difficulty: 3,
        questionFr: "Quelles infractions de stationnement entraînent une mise en fourrière ?",
        questionEn: "Which parking violations can result in towing?",
        options: {
            A: { fr: "Stationnement devant une bouche d'incendie", en: "Parking in front of a fire hydrant" },
            B: { fr: "Stationnement sur une place handicapée sans carte", en: "Parking in a disabled space without a card" },
            C: { fr: "Dépassement de la durée du parcmètre de 5 minutes", en: "Exceeding the parking meter by 5 minutes" },
            D: { fr: "Stationnement gênant empêchant la circulation", en: "Obstructive parking blocking traffic" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "La mise en fourrière concerne les cas graves : bouche d'incendie, place handicapée, obstruction de la circulation. Un simple dépassement de parcmètre ne justifie pas la fourrière.",
        explanationEn: "Towing applies to serious cases: fire hydrant, disabled space, obstructing traffic. A simple meter overstay doesn't warrant towing."
    },
    {
        id: "s41-062", topic: "arret_stationnement", difficulty: 2,
        questionFr: "Quelles affirmations sur le stationnement de nuit sont correctes ?",
        questionEn: "Which statements about parking at night are correct?",
        options: {
            A: { fr: "Hors agglomération, le véhicule doit être visible (feux de position ou signalisation)", en: "Outside urban areas, the vehicle must be visible (sidelights or markers)" },
            B: { fr: "En agglomération éclairée, les feux de position ne sont pas nécessaires", en: "In lit urban areas, sidelights are not required" },
            C: { fr: "Aucune obligation particulière de nuit", en: "No special obligation at night" },
            D: { fr: "Il est recommandé de garer dans le sens de la circulation", en: "It is recommended to park in the direction of traffic" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "De nuit : hors agglomération, le véhicule doit être visible. En ville éclairée, les feux ne sont pas nécessaires si le véhicule est visible. Toujours garer dans le sens de circulation.",
        explanationEn: "At night: outside towns, the vehicle must be visible. In lit towns, lights aren't needed if the vehicle is visible. Always park in the direction of traffic."
    },

    // === TUNNELS_PASSAGES_NIVEAU (7 questions) ===
    {
        id: "s41-063", topic: "tunnels_passages_niveau", difficulty: 2,
        questionFr: "Quelles règles s'appliquent à l'approche d'un passage à niveau ?",
        questionEn: "Which rules apply when approaching a level crossing?",
        options: {
            A: { fr: "Ralentir et être prêt à s'arrêter", en: "Slow down and be ready to stop" },
            B: { fr: "Ne jamais s'engager si la sortie n'est pas dégagée", en: "Never enter if the exit is not clear" },
            C: { fr: "On peut passer si les barrières commencent à descendre", en: "You can cross if the barriers are starting to descend" },
            D: { fr: "Le feu rouge clignotant interdit le franchissement", en: "The flashing red light prohibits crossing" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Passage à niveau : ralentir, ne pas s'engager si sortie bloquée, respecter le feu clignotant. Ne JAMAIS passer quand les barrières descendent.",
        explanationEn: "Level crossing: slow down, don't enter if exit blocked, obey flashing light. NEVER cross when barriers are descending."
    },
    {
        id: "s41-064", topic: "tunnels_passages_niveau", difficulty: 3,
        questionFr: "Que faire si votre véhicule tombe en panne sur un passage à niveau ?",
        questionEn: "What should you do if your vehicle breaks down on a level crossing?",
        options: {
            A: { fr: "Faire descendre tous les passagers immédiatement", en: "Get all passengers out immediately" },
            B: { fr: "Essayer de pousser le véhicule hors des voies", en: "Try to push the vehicle off the tracks" },
            C: { fr: "Appeler les secours et le gestionnaire du passage", en: "Call emergency services and the crossing operator" },
            D: { fr: "Attendre dans le véhicule que les secours arrivent", en: "Wait in the vehicle for help to arrive" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "En panne sur un passage à niveau : évacuer immédiatement, tenter de dégager le véhicule, appeler les secours. Ne JAMAIS rester dans le véhicule.",
        explanationEn: "Broken down on a level crossing: evacuate immediately, try to clear the vehicle, call emergency services. NEVER stay in the vehicle."
    },
    {
        id: "s41-065", topic: "tunnels_passages_niveau", difficulty: 2,
        questionFr: "Quelles précautions prendre en entrant dans un tunnel ?",
        questionEn: "What precautions should you take when entering a tunnel?",
        options: {
            A: { fr: "Allumer les feux de croisement", en: "Turn on dipped headlights" },
            B: { fr: "Retirer les lunettes de soleil", en: "Remove sunglasses" },
            C: { fr: "Augmenter la vitesse pour traverser plus vite", en: "Increase speed to cross faster" },
            D: { fr: "Respecter les distances de sécurité", en: "Maintain safety distances" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "En entrant dans un tunnel : feux de croisement, retirer les lunettes de soleil, maintenir les distances. Ne jamais accélérer.",
        explanationEn: "When entering a tunnel: dipped headlights, remove sunglasses, maintain distances. Never accelerate."
    },
    {
        id: "s41-066", topic: "tunnels_passages_niveau", difficulty: 3,
        questionFr: "Que faire en cas d'incendie dans un tunnel ?",
        questionEn: "What should you do in case of fire in a tunnel?",
        options: {
            A: { fr: "S'arrêter, couper le moteur et laisser la clé sur le contact", en: "Stop, turn off engine and leave the key in the ignition" },
            B: { fr: "Se diriger vers l'issue de secours la plus proche", en: "Head to the nearest emergency exit" },
            C: { fr: "Rester dans le véhicule portes et fenêtres fermées", en: "Stay in the vehicle with doors and windows closed" },
            D: { fr: "Ne pas utiliser l'ascenseur", en: "Do not use the lift" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Incendie en tunnel : s'arrêter, couper le moteur (clé sur contact pour permettre le déplacement du véhicule), gagner une issue de secours. Ne jamais rester dans le véhicule ni utiliser l'ascenseur.",
        explanationEn: "Fire in a tunnel: stop, turn off engine (leave key for vehicle to be moved), reach an emergency exit. Never stay in the vehicle or use the lift."
    },
    {
        id: "s41-067", topic: "tunnels_passages_niveau", difficulty: 2,
        questionFr: "Quelles affirmations sont vraies sur les passages à niveau sans barrière ?",
        questionEn: "Which statements are true about level crossings without barriers?",
        options: {
            A: { fr: "Ils sont signalés par une croix de Saint-André", en: "They are indicated by a St Andrew's cross" },
            B: { fr: "Il faut marquer un arrêt avant de franchir", en: "You must stop before crossing" },
            C: { fr: "Il suffit de ralentir et vérifier", en: "You only need to slow down and check" },
            D: { fr: "Les trains ont toujours la priorité", en: "Trains always have priority" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Passage à niveau sans barrière : croix de Saint-André, arrêt obligatoire, train toujours prioritaire. Ralentir ne suffit pas — l'arrêt est requis.",
        explanationEn: "Level crossing without barriers: St Andrew's cross, mandatory stop, train always has priority. Slowing down is not enough — stopping is required."
    },
    {
        id: "s41-068", topic: "tunnels_passages_niveau", difficulty: 2,
        questionFr: "Quels équipements de sécurité trouve-t-on dans un tunnel ?",
        questionEn: "What safety equipment is found in a tunnel?",
        options: {
            A: { fr: "Des niches de sécurité avec téléphone d'urgence", en: "Safety recesses with emergency telephone" },
            B: { fr: "Des extincteurs", en: "Fire extinguishers" },
            C: { fr: "Des issues de secours signalées par des panneaux verts", en: "Emergency exits marked with green signs" },
            D: { fr: "Des distributeurs de boissons", en: "Drink dispensers" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "Les tunnels disposent de niches de sécurité, d'extincteurs et d'issues de secours (panneaux verts). Les distributeurs ne sont pas des équipements de sécurité.",
        explanationEn: "Tunnels have safety recesses, fire extinguishers, and emergency exits (green signs). Drink dispensers are not safety equipment."
    },
    {
        id: "s41-069", topic: "tunnels_passages_niveau", difficulty: 3,
        questionFr: "Quelles affirmations sont vraies sur la signalisation des passages à niveau ?",
        questionEn: "Which statements are true about level crossing signage?",
        options: {
            A: { fr: "Les balises J10 comptent les distances : 3 bandes = 150 m", en: "J10 markers count distances: 3 stripes = 150m" },
            B: { fr: "Le panneau A7 annonce un passage à niveau avec barrières", en: "Sign A7 announces a level crossing with barriers" },
            C: { fr: "Le feu rouge clignotant est accompagné d'une sonnerie", en: "The flashing red light comes with a bell sound" },
            D: { fr: "Les barrières se lèvent automatiquement après 3 minutes", en: "Barriers lift automatically after 3 minutes" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "J10 : 3 bandes à 150 m, 2 bandes à 100 m, 1 bande à 50 m. A7 = PN avec barrières. Feu rouge + sonnerie. Les barrières ne se lèvent pas automatiquement après un délai fixe.",
        explanationEn: "J10: 3 stripes at 150m, 2 at 100m, 1 at 50m. A7 = level crossing with barriers. Red light + bell. Barriers don't automatically lift after a fixed time."
    },

    // === CONDUCTEUR (5 questions) ===
    {
        id: "s41-070", topic: "conducteur", difficulty: 2,
        questionFr: "Quels sont les signes de fatigue au volant ?",
        questionEn: "What are the signs of fatigue while driving?",
        options: {
            A: { fr: "Bâillements fréquents et paupières lourdes", en: "Frequent yawning and heavy eyelids" },
            B: { fr: "Difficulté à maintenir une trajectoire stable", en: "Difficulty maintaining a stable trajectory" },
            C: { fr: "Envie d'accélérer pour arriver plus vite", en: "Desire to accelerate to arrive faster" },
            D: { fr: "Oubli des derniers kilomètres parcourus", en: "Forgetting the last kilometres driven" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Signes de fatigue : bâillements, trajectoire instable, trous de mémoire sur le trajet. L'envie d'accélérer n'est pas un signe de fatigue mais d'impatience.",
        explanationEn: "Signs of fatigue: yawning, unstable trajectory, memory gaps about the journey. Wanting to accelerate is not fatigue but impatience."
    },
    {
        id: "s41-071", topic: "conducteur", difficulty: 3,
        questionFr: "Quels médicaments peuvent affecter la conduite ?",
        questionEn: "Which medications can affect driving?",
        options: {
            A: { fr: "Les antihistaminiques (contre les allergies)", en: "Antihistamines (for allergies)" },
            B: { fr: "Les anxiolytiques et somnifères", en: "Anti-anxiety medication and sleeping pills" },
            C: { fr: "Le paracétamol simple (sans codéine)", en: "Simple paracetamol (without codeine)" },
            D: { fr: "Certains antidouleurs contenant de la codéine", en: "Some painkillers containing codeine" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Antihistaminiques, anxiolytiques, somnifères et antidouleurs codéinés peuvent affecter la conduite (pictogramme sur la boîte). Le paracétamol simple est sans effet.",
        explanationEn: "Antihistamines, anti-anxiety meds, sleeping pills, and codeine painkillers can affect driving (pictogram on the box). Simple paracetamol has no effect."
    },
    {
        id: "s41-072", topic: "conducteur", difficulty: 2,
        questionFr: "Quelles pratiques sont dangereuses au volant ?",
        questionEn: "Which practices are dangerous while driving?",
        options: {
            A: { fr: "Téléphoner même avec un kit mains libres", en: "Phoning even with a hands-free kit" },
            B: { fr: "Programmer un GPS en roulant", en: "Setting a GPS while driving" },
            C: { fr: "Écouter la radio à volume modéré", en: "Listening to the radio at moderate volume" },
            D: { fr: "Manger ou boire au volant", en: "Eating or drinking while driving" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Téléphoner (même mains libres), programmer le GPS et manger sont dangereux car ils détournent l'attention. La radio à volume modéré n'est pas considérée comme dangereuse.",
        explanationEn: "Phoning (even hands-free), setting GPS, and eating are dangerous as they distract attention. Radio at moderate volume is not considered dangerous."
    },
    {
        id: "s41-073", topic: "conducteur", difficulty: 3,
        questionFr: "Quelles affirmations sont correctes sur la vision et la conduite ?",
        questionEn: "Which statements are correct about vision and driving?",
        options: {
            A: { fr: "90% des informations nécessaires passent par la vue", en: "90% of necessary information comes through sight" },
            B: { fr: "Le champ visuel diminue avec la vitesse", en: "The visual field narrows with speed" },
            C: { fr: "La vision nocturne est identique à la vision diurne", en: "Night vision is identical to daytime vision" },
            D: { fr: "L'éblouissement peut causer une cécité temporaire de plusieurs secondes", en: "Glare can cause temporary blindness of several seconds" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "La vue fournit 90% des informations routières. Le champ visuel se réduit avec la vitesse (effet tunnel). L'éblouissement cause une cécité temporaire. La vision nocturne est très différente de la diurne.",
        explanationEn: "Sight provides 90% of road information. The visual field narrows with speed (tunnel effect). Glare causes temporary blindness. Night vision is very different from daytime."
    },
    {
        id: "s41-074", topic: "conducteur", difficulty: 2,
        questionFr: "Quelles sont les bonnes pratiques pour une conduite sûre ?",
        questionEn: "What are good practices for safe driving?",
        options: {
            A: { fr: "Faire des pauses toutes les 2 heures", en: "Take breaks every 2 hours" },
            B: { fr: "Adapter sa conduite aux conditions météorologiques", en: "Adapt driving to weather conditions" },
            C: { fr: "Conduire vite pour réduire le temps d'exposition au risque", en: "Drive fast to reduce risk exposure time" },
            D: { fr: "Maintenir un véhicule en bon état mécanique", en: "Keep the vehicle in good mechanical condition" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Bonnes pratiques : pauses régulières, conduite adaptée aux conditions, véhicule entretenu. Conduire vite n'est jamais une mesure de sécurité.",
        explanationEn: "Good practices: regular breaks, driving adapted to conditions, maintained vehicle. Driving fast is never a safety measure."
    },

    // === CROISEMENT_DEPASSEMENT (5 questions) ===
    {
        id: "s41-075", topic: "croisement_depassement", difficulty: 2,
        questionFr: "Quelles conditions doivent être remplies pour effectuer un dépassement ?",
        questionEn: "What conditions must be met to overtake?",
        options: {
            A: { fr: "Avoir une visibilité suffisante", en: "Have sufficient visibility" },
            B: { fr: "Ne pas dépasser la vitesse maximale autorisée", en: "Not exceed the maximum allowed speed" },
            C: { fr: "Pouvoir se rabattre sans gêner le véhicule dépassé", en: "Be able to pull back in without hindering the overtaken vehicle" },
            D: { fr: "Avoir au moins 3 passagers dans le véhicule", en: "Have at least 3 passengers in the vehicle" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "Pour dépasser : visibilité suffisante, respect de la vitesse limite, possibilité de se rabattre sans gêner. Le nombre de passagers n'a aucun rapport.",
        explanationEn: "To overtake: sufficient visibility, speed limit respected, ability to pull back in without hindrance. Number of passengers is irrelevant."
    },
    {
        id: "s41-076", topic: "croisement_depassement", difficulty: 3,
        questionFr: "Dans quels cas le dépassement est-il interdit ?",
        questionEn: "In which cases is overtaking prohibited?",
        options: {
            A: { fr: "À l'approche du sommet d'une côte sans visibilité", en: "When approaching the top of a hill without visibility" },
            B: { fr: "Dans un virage sans visibilité", en: "On a blind bend" },
            C: { fr: "À un passage piéton quand un autre véhicule est arrêté", en: "At a pedestrian crossing when another vehicle is stopped" },
            D: { fr: "Sur une route droite avec bonne visibilité", en: "On a straight road with good visibility" }
        },
        correctAnswers: ["A","B","C"], answerCount: 3,
        explanationFr: "Dépassement interdit : sommet de côte, virage sans visibilité, passage piéton avec véhicule arrêté. Sur route droite avec visibilité, le dépassement est autorisé.",
        explanationEn: "Overtaking prohibited: hilltop, blind bend, pedestrian crossing with stopped vehicle. On a straight road with visibility, overtaking is allowed."
    },
    {
        id: "s41-077", topic: "croisement_depassement", difficulty: 2,
        questionFr: "Quelles affirmations sont correctes sur le croisement de véhicules ?",
        questionEn: "Which statements are correct about passing oncoming vehicles?",
        options: {
            A: { fr: "En cas de croisement difficile, le véhicule le plus proche d'un espace recule", en: "In a difficult crossing, the vehicle nearest to a space reverses" },
            B: { fr: "On doit serrer à droite pour faciliter le croisement", en: "You must keep right to facilitate the crossing" },
            C: { fr: "Le véhicule le plus gros a toujours la priorité", en: "The larger vehicle always has priority" },
            D: { fr: "En cas d'obstacle de votre côté, vous devez céder le passage", en: "If the obstacle is on your side, you must give way" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Croisement : serrer à droite, celui près de l'espace recule, obstacle de votre côté = vous cédez. La taille du véhicule ne donne pas de priorité (sauf en montagne).",
        explanationEn: "Passing: keep right, nearest to a space reverses, obstacle on your side = you yield. Vehicle size doesn't give priority (except on mountain roads)."
    },
    {
        id: "s41-078", topic: "croisement_depassement", difficulty: 3,
        questionFr: "Quelles sont les étapes correctes d'un dépassement ?",
        questionEn: "What are the correct steps for overtaking?",
        options: {
            A: { fr: "Vérifier les rétroviseurs et l'angle mort avant de déboîter", en: "Check mirrors and blind spot before pulling out" },
            B: { fr: "Signaler avec le clignotant gauche puis le droit", en: "Signal with left indicator then right" },
            C: { fr: "Accélérer uniquement après s'être rabattu", en: "Accelerate only after pulling back in" },
            D: { fr: "Se rabattre quand on voit le véhicule dépassé dans le rétroviseur intérieur", en: "Pull back in when you see the overtaken vehicle in the interior mirror" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Dépassement : vérifier miroirs/angle mort, clignotant gauche pour déboîter puis droit pour se rabattre, se rabattre quand on voit le véhicule dans le rétro intérieur. L'accélération se fait pendant le dépassement, pas après.",
        explanationEn: "Overtaking: check mirrors/blind spot, left indicator to pull out then right to pull back, pull back when you see the vehicle in the interior mirror. Acceleration happens during the manoeuvre, not after."
    },
    {
        id: "s41-079", topic: "croisement_depassement", difficulty: 2,
        questionFr: "Quelles obligations a le véhicule dépassé ?",
        questionEn: "What obligations does the overtaken vehicle have?",
        options: {
            A: { fr: "Ne pas accélérer pendant le dépassement", en: "Not accelerate during the overtaking" },
            B: { fr: "Serrer à droite pour faciliter la manœuvre", en: "Keep right to facilitate the manoeuvre" },
            C: { fr: "Ralentir obligatoirement", en: "Slow down mandatory" },
            D: { fr: "Faciliter le rabattement du véhicule qui dépasse", en: "Facilitate the overtaking vehicle pulling back in" }
        },
        correctAnswers: ["A","B","D"], answerCount: 3,
        explanationFr: "Le véhicule dépassé ne doit pas accélérer, doit serrer à droite et faciliter le rabattement. Ralentir n'est pas obligatoire mais ne pas accélérer l'est.",
        explanationEn: "The overtaken vehicle must not accelerate, must keep right, and facilitate the pull-back. Slowing down is not mandatory but not accelerating is."
    }
];

module.exports = NEW_QUESTIONS;
