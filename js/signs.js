/* ============================================
   French Road Signs — SVG Library
   Inline SVG signs for question illustrations
   ============================================ */

const RoadSigns = {
    // Generate an SVG string for a given sign type
    get(signId) {
        const fn = this.signs[signId];
        return fn ? fn() : '';
    },

    // Render sign(s) into a container element
    render(signIds, container) {
        if (!signIds || signIds.length === 0) return;
        container.innerHTML = '';
        container.classList.remove('hidden');
        for (const id of signIds) {
            const svg = this.get(id);
            if (svg) {
                const wrapper = document.createElement('div');
                wrapper.className = 'sign-image';
                wrapper.innerHTML = svg;
                wrapper.title = this.labels[id] || id;
                container.appendChild(wrapper);
            }
        }
    },

    // Accessible labels for each sign
    labels: {
        'stop': 'Panneau STOP',
        'yield': 'Cédez le passage',
        'priority_road': 'Route prioritaire',
        'end_priority': 'Fin de route prioritaire',
        'speed_30': 'Limitation 30 km/h',
        'speed_50': 'Limitation 50 km/h',
        'speed_70': 'Limitation 70 km/h',
        'speed_80': 'Limitation 80 km/h',
        'speed_90': 'Limitation 90 km/h',
        'speed_110': 'Limitation 110 km/h',
        'speed_130': 'Limitation 130 km/h',
        'no_entry': 'Sens interdit',
        'no_parking': 'Stationnement interdit',
        'no_stopping': 'Arrêt interdit',
        'one_way': 'Sens unique',
        'roundabout': 'Carrefour giratoire',
        'pedestrian_crossing': 'Passage piétons',
        'traffic_light': 'Feu tricolore',
        'danger': 'Danger',
        'priority_right': 'Priorité à droite',
        'no_overtaking': 'Dépassement interdit',
        'tunnel': 'Tunnel',
        'parking': 'Parking',
        'highway_start': 'Début d\'autoroute',
        'highway_end': 'Fin d\'autoroute',
        'town_entry': 'Entrée d\'agglomération',
        'town_exit': 'Sortie d\'agglomération',
        'dipped_headlights': 'Feux de croisement obligatoires',
        'level_crossing': 'Passage à niveau',
        'slippery_road': 'Chaussée glissante',
        'school_zone': 'Zone scolaire',
        'no_uturn': 'Demi-tour interdit',
        'dead_end': 'Voie sans issue',
        'bicycle_lane': 'Piste cyclable obligatoire',
        'end_speed_limit': 'Fin de limitation de vitesse',
    },

    signs: {
        // === STOP SIGN (octagon, red background, white text) ===
        'stop': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#CC0000" stroke="#FFF" stroke-width="2"/>
            <text x="50" y="58" text-anchor="middle" fill="white" font-size="24" font-weight="bold" font-family="Arial">STOP</text>
        </svg>`,

        // === YIELD / CÉDEZ LE PASSAGE (inverted triangle, red border, white) ===
        'yield': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <polygon points="50,90 5,10 95,10" fill="white" stroke="#CC0000" stroke-width="6"/>
        </svg>`,

        // === PRIORITY ROAD (yellow diamond) ===
        'priority_road': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <rect x="18" y="18" width="64" height="64" rx="3" transform="rotate(45 50 50)" fill="#FFD700" stroke="white" stroke-width="4"/>
            <rect x="22" y="22" width="56" height="56" rx="2" transform="rotate(45 50 50)" fill="none" stroke="#333" stroke-width="1"/>
        </svg>`,

        // === END PRIORITY (same diamond with black bars) ===
        'end_priority': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <rect x="18" y="18" width="64" height="64" rx="3" transform="rotate(45 50 50)" fill="#FFD700" stroke="white" stroke-width="4"/>
            <line x1="25" y1="75" x2="75" y2="25" stroke="#333" stroke-width="5"/>
        </svg>`,

        // === SPEED LIMIT SIGNS (red circle, white interior, number) ===
        'speed_30': () => speedLimitSign('30'),
        'speed_50': () => speedLimitSign('50'),
        'speed_70': () => speedLimitSign('70'),
        'speed_80': () => speedLimitSign('80'),
        'speed_90': () => speedLimitSign('90'),
        'speed_110': () => speedLimitSign('110'),
        'speed_130': () => speedLimitSign('130'),

        // === NO ENTRY (red circle, white horizontal bar) ===
        'no_entry': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="#CC0000" stroke="white" stroke-width="3"/>
            <rect x="18" y="42" width="64" height="16" rx="3" fill="white"/>
        </svg>`,

        // === NO PARKING (blue circle, red diagonal) ===
        'no_parking': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="#2E5984" stroke="white" stroke-width="3"/>
            <line x1="20" y1="80" x2="80" y2="20" stroke="#CC0000" stroke-width="6"/>
        </svg>`,

        // === NO STOPPING (blue circle, red X) ===
        'no_stopping': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="#2E5984" stroke="white" stroke-width="3"/>
            <line x1="20" y1="20" x2="80" y2="80" stroke="#CC0000" stroke-width="6"/>
            <line x1="80" y1="20" x2="20" y2="80" stroke="#CC0000" stroke-width="6"/>
        </svg>`,

        // === ONE WAY (blue rectangle, white arrow) ===
        'one_way': () => `<svg viewBox="0 0 120 60" width="100" height="50">
            <rect x="2" y="2" width="116" height="56" rx="5" fill="#2E5984" stroke="white" stroke-width="2"/>
            <polygon points="100,30 70,12 70,22 20,22 20,38 70,38 70,48" fill="white"/>
        </svg>`,

        // === ROUNDABOUT (blue circle, 3 white arrows in circle) ===
        'roundabout': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="#2E5984" stroke="white" stroke-width="3"/>
            <path d="M50 20 A30 30 0 0 1 75 65" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/>
            <polygon points="75,65 82,52 68,55" fill="white"/>
            <path d="M75 65 A30 30 0 0 1 28 65" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/>
            <polygon points="28,65 22,52 35,55" fill="white"/>
            <path d="M28 65 A30 30 0 0 1 50 20" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/>
            <polygon points="50,20 43,33 57,33" fill="white"/>
        </svg>`,

        // === PEDESTRIAN CROSSING (blue square, white triangle, person) ===
        'pedestrian_crossing': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <rect x="5" y="5" width="90" height="90" rx="8" fill="#2E5984" stroke="white" stroke-width="2"/>
            <polygon points="15,85 50,15 85,85" fill="white"/>
            <circle cx="55" cy="40" r="5" fill="#2E5984"/>
            <line x1="55" y1="45" x2="55" y2="62" stroke="#2E5984" stroke-width="3"/>
            <line x1="55" y1="50" x2="45" y2="55" stroke="#2E5984" stroke-width="2.5"/>
            <line x1="55" y1="50" x2="65" y2="55" stroke="#2E5984" stroke-width="2.5"/>
            <line x1="55" y1="62" x2="47" y2="78" stroke="#2E5984" stroke-width="2.5"/>
            <line x1="55" y1="62" x2="63" y2="78" stroke="#2E5984" stroke-width="2.5"/>
            <rect x="30" y="78" width="5" height="7" fill="#2E5984" rx="1"/>
            <rect x="38" y="78" width="5" height="7" fill="#2E5984" rx="1"/>
            <rect x="46" y="78" width="5" height="7" fill="#2E5984" rx="1"/>
            <rect x="54" y="78" width="5" height="7" fill="#2E5984" rx="1"/>
            <rect x="62" y="78" width="5" height="7" fill="#2E5984" rx="1"/>
        </svg>`,

        // === TRAFFIC LIGHT ===
        'traffic_light': () => `<svg viewBox="0 0 50 120" width="40" height="96">
            <rect x="10" y="5" width="30" height="90" rx="5" fill="#333" stroke="#555" stroke-width="1"/>
            <circle cx="25" cy="25" r="10" fill="#CC0000"/>
            <circle cx="25" cy="50" r="10" fill="#FF9800"/>
            <circle cx="25" cy="75" r="10" fill="#4CAF50"/>
            <rect x="22" y="95" width="6" height="20" fill="#555"/>
        </svg>`,

        // === DANGER (triangle, red border, exclamation) ===
        'danger': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <polygon points="50,8 95,90 5,90" fill="white" stroke="#CC0000" stroke-width="5"/>
            <text x="50" y="78" text-anchor="middle" fill="#333" font-size="48" font-weight="bold" font-family="Arial">!</text>
        </svg>`,

        // === PRIORITY TO THE RIGHT (triangle danger + intersection) ===
        'priority_right': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <polygon points="50,8 95,90 5,90" fill="white" stroke="#CC0000" stroke-width="5"/>
            <line x1="50" y1="35" x2="50" y2="75" stroke="#333" stroke-width="6"/>
            <line x1="50" y1="55" x2="72" y2="55" stroke="#333" stroke-width="6"/>
        </svg>`,

        // === NO OVERTAKING (red circle, two cars) ===
        'no_overtaking': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="white" stroke="#CC0000" stroke-width="6"/>
            <rect x="22" y="38" width="22" height="24" rx="8" fill="#333"/>
            <rect x="56" y="38" width="22" height="24" rx="8" fill="#CC0000"/>
        </svg>`,

        // === TUNNEL ===
        'tunnel': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <rect x="5" y="5" width="90" height="90" rx="8" fill="#2E5984" stroke="white" stroke-width="2"/>
            <path d="M20,80 L20,40 A30,30 0 0 1 80,40 L80,80 Z" fill="#333"/>
            <rect x="42" y="60" width="16" height="20" fill="#FFD700" rx="2"/>
        </svg>`,

        // === PARKING (blue P) ===
        'parking': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <rect x="5" y="5" width="90" height="90" rx="8" fill="#2E5984" stroke="white" stroke-width="2"/>
            <text x="50" y="72" text-anchor="middle" fill="white" font-size="56" font-weight="bold" font-family="Arial">P</text>
        </svg>`,

        // === HIGHWAY START (green sign with car icon) ===
        'highway_start': () => `<svg viewBox="0 0 120 80" width="100" height="67">
            <rect x="2" y="2" width="116" height="76" rx="5" fill="#0B6623" stroke="white" stroke-width="3"/>
            <path d="M30,55 L30,35 C30,25 40,20 50,20 L70,20 C80,20 90,25 90,35 L90,55" fill="none" stroke="white" stroke-width="3"/>
            <line x1="55" y1="55" x2="55" y2="35" stroke="white" stroke-width="2" stroke-dasharray="4,3"/>
            <rect x="35" y="55" width="50" height="4" fill="white" rx="1"/>
        </svg>`,

        // === HIGHWAY END (same with red diagonal) ===
        'highway_end': () => `<svg viewBox="0 0 120 80" width="100" height="67">
            <rect x="2" y="2" width="116" height="76" rx="5" fill="#0B6623" stroke="white" stroke-width="3"/>
            <path d="M30,55 L30,35 C30,25 40,20 50,20 L70,20 C80,20 90,25 90,35 L90,55" fill="none" stroke="white" stroke-width="3"/>
            <line x1="10" y1="70" x2="110" y2="10" stroke="#CC0000" stroke-width="5"/>
        </svg>`,

        // === TOWN ENTRY (white rectangle with town name) ===
        'town_entry': () => `<svg viewBox="0 0 140 70" width="112" height="56">
            <rect x="2" y="2" width="136" height="66" rx="3" fill="white" stroke="#CC0000" stroke-width="3"/>
            <text x="70" y="45" text-anchor="middle" fill="#333" font-size="22" font-weight="bold" font-family="Arial">Ville</text>
        </svg>`,

        // === TOWN EXIT (same with red diagonal) ===
        'town_exit': () => `<svg viewBox="0 0 140 70" width="112" height="56">
            <rect x="2" y="2" width="136" height="66" rx="3" fill="white" stroke="#333" stroke-width="2"/>
            <text x="70" y="45" text-anchor="middle" fill="#333" font-size="22" font-weight="bold" font-family="Arial">Ville</text>
            <line x1="10" y1="62" x2="130" y2="8" stroke="#CC0000" stroke-width="4"/>
        </svg>`,

        // === DIPPED HEADLIGHTS REQUIRED ===
        'dipped_headlights': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="#2E5984" stroke="white" stroke-width="3"/>
            <ellipse cx="40" cy="50" rx="15" ry="10" fill="none" stroke="white" stroke-width="3"/>
            <line x1="55" y1="42" x2="78" y2="35" stroke="white" stroke-width="2.5"/>
            <line x1="55" y1="46" x2="78" y2="43" stroke="white" stroke-width="2.5"/>
            <line x1="55" y1="50" x2="78" y2="50" stroke="white" stroke-width="2.5"/>
            <line x1="55" y1="54" x2="78" y2="57" stroke="white" stroke-width="2.5"/>
            <line x1="55" y1="58" x2="78" y2="65" stroke="white" stroke-width="2.5"/>
        </svg>`,

        // === LEVEL CROSSING (X with red/white stripes) ===
        'level_crossing': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <polygon points="50,8 95,90 5,90" fill="white" stroke="#CC0000" stroke-width="5"/>
            <line x1="35" y1="45" x2="65" y2="75" stroke="#333" stroke-width="6"/>
            <line x1="65" y1="45" x2="35" y2="75" stroke="#333" stroke-width="6"/>
        </svg>`,

        // === SLIPPERY ROAD (danger triangle + wavy lines) ===
        'slippery_road': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <polygon points="50,8 95,90 5,90" fill="white" stroke="#CC0000" stroke-width="5"/>
            <path d="M30,70 Q40,55 50,65 Q60,75 70,60" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round"/>
            <circle cx="45" cy="48" r="3" fill="#333"/>
            <circle cx="55" cy="48" r="3" fill="#333"/>
        </svg>`,

        // === SCHOOL ZONE (danger triangle + children figures) ===
        'school_zone': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <polygon points="50,8 95,90 5,90" fill="white" stroke="#CC0000" stroke-width="5"/>
            <circle cx="40" cy="38" r="4" fill="#333"/>
            <line x1="40" y1="42" x2="40" y2="58" stroke="#333" stroke-width="3"/>
            <line x1="40" y1="48" x2="33" y2="54" stroke="#333" stroke-width="2"/>
            <line x1="40" y1="48" x2="47" y2="54" stroke="#333" stroke-width="2"/>
            <line x1="40" y1="58" x2="34" y2="72" stroke="#333" stroke-width="2"/>
            <line x1="40" y1="58" x2="46" y2="72" stroke="#333" stroke-width="2"/>
            <circle cx="58" cy="42" r="3.5" fill="#333"/>
            <line x1="58" y1="46" x2="58" y2="60" stroke="#333" stroke-width="2.5"/>
            <line x1="58" y1="60" x2="53" y2="72" stroke="#333" stroke-width="2"/>
            <line x1="58" y1="60" x2="63" y2="72" stroke="#333" stroke-width="2"/>
        </svg>`,

        // === NO U-TURN (red circle + U-turn arrow crossed) ===
        'no_uturn': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="white" stroke="#CC0000" stroke-width="6"/>
            <path d="M60,70 L60,40 A10,10 0 0 0 40,40 L40,55" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/>
            <polygon points="40,55 34,46 46,46" fill="#333"/>
            <line x1="18" y1="82" x2="82" y2="18" stroke="#CC0000" stroke-width="6"/>
        </svg>`,

        // === DEAD END / IMPASSE ===
        'dead_end': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <rect x="5" y="5" width="90" height="90" rx="8" fill="#2E5984" stroke="white" stroke-width="2"/>
            <rect x="40" y="25" width="20" height="35" fill="white"/>
            <rect x="25" y="55" width="50" height="5" fill="white"/>
        </svg>`,

        // === BICYCLE LANE (blue circle + bicycle) ===
        'bicycle_lane': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="#2E5984" stroke="white" stroke-width="3"/>
            <circle cx="35" cy="62" r="10" fill="none" stroke="white" stroke-width="3"/>
            <circle cx="65" cy="62" r="10" fill="none" stroke="white" stroke-width="3"/>
            <line x1="35" y1="62" x2="50" y2="42" stroke="white" stroke-width="2.5"/>
            <line x1="50" y1="42" x2="65" y2="62" stroke="white" stroke-width="2.5"/>
            <line x1="50" y1="42" x2="58" y2="42" stroke="white" stroke-width="2.5"/>
            <circle cx="50" cy="35" r="3" fill="white"/>
        </svg>`,

        // === END OF SPEED LIMIT (grey circle + grey diagonal bars) ===
        'end_speed_limit': () => `<svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="white" stroke="#999" stroke-width="4"/>
            <line x1="18" y1="82" x2="82" y2="18" stroke="#999" stroke-width="3"/>
            <line x1="22" y1="85" x2="85" y2="22" stroke="#999" stroke-width="3"/>
            <line x1="15" y1="78" x2="78" y2="15" stroke="#999" stroke-width="3"/>
        </svg>`,
    }
};

// Helper: speed limit sign generator
function speedLimitSign(num) {
    const fontSize = num.length > 2 ? 28 : 34;
    return `<svg viewBox="0 0 100 100" width="80" height="80">
        <circle cx="50" cy="50" r="45" fill="white" stroke="#CC0000" stroke-width="7"/>
        <text x="50" y="${num.length > 2 ? 58 : 60}" text-anchor="middle" fill="#333" font-size="${fontSize}" font-weight="bold" font-family="Arial">${num}</text>
    </svg>`;
}
