/* ============================================
   Intersection Scenario Engine
   SVG-based right-of-way visualization
   Top-down intersection diagrams for priority questions
   ============================================ */

const Intersections = {
    // Render a scenario into a container element
    render(scenarioId, container, options = {}) {
        const scenario = this.scenarios[scenarioId];
        if (!scenario) return;

        container.innerHTML = '';
        container.classList.remove('hidden');

        const wrapper = document.createElement('div');
        wrapper.className = 'intersection-scene';

        // Scene title
        const title = document.createElement('div');
        title.className = 'intersection-title';
        title.textContent = scenario.title;
        wrapper.appendChild(title);

        // SVG container
        const svgWrapper = document.createElement('div');
        svgWrapper.className = 'intersection-svg-wrapper';
        svgWrapper.innerHTML = scenario.svg(options.showOrder || false);
        wrapper.appendChild(svgWrapper);

        // Legend
        if (scenario.legend) {
            const legend = document.createElement('div');
            legend.className = 'intersection-legend';
            legend.innerHTML = scenario.legend;
            wrapper.appendChild(legend);
        }

        container.appendChild(wrapper);
    },

    // Show passage order animation after answer
    showOrder(scenarioId, container) {
        const scene = container.querySelector('.intersection-svg-wrapper');
        if (!scene) return;
        const scenario = this.scenarios[scenarioId];
        if (!scenario) return;

        scene.innerHTML = scenario.svg(true);
        scene.classList.add('intersection-revealed');

        // Animate order numbers appearing sequentially
        const orderLabels = scene.querySelectorAll('.passage-order');
        orderLabels.forEach((el, i) => {
            el.style.animationDelay = `${i * 0.5}s`;
            el.classList.add('passage-order-animate');
        });
    },

    // =============================================
    // SVG Building Blocks
    // =============================================

    _road(x, y, w, h) {
        return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#666" rx="2"/>`;
    },

    _dashes(x1, y1, x2, y2, vertical = false) {
        if (vertical) {
            let lines = '';
            for (let y = y1; y < y2; y += 18) {
                lines += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y + 10}" stroke="white" stroke-width="1.5" stroke-dasharray="10,8"/>`;
            }
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="1.5" stroke-dasharray="10,8"/>`;
        }
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="1.5" stroke-dasharray="10,8"/>`;
    },

    _car(cx, cy, angle, color, label, orderNum, showOrder) {
        const w = 18, h = 30;
        // Direction arrow
        const arrowDy = -h / 2 - 6;
        const orderCircle = showOrder && orderNum
            ? `<circle cx="0" cy="0" r="10" fill="white" stroke="${color}" stroke-width="2" class="passage-order"/>
               <text x="0" y="4" text-anchor="middle" fill="${color}" font-size="12" font-weight="bold" class="passage-order">${orderNum}</text>`
            : '';

        return `<g transform="translate(${cx},${cy}) rotate(${angle})">
            <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="4" fill="${color}" stroke="#333" stroke-width="1.5"/>
            <rect x="${-w / 2 + 2}" y="${-h / 2 + 3}" width="${w - 4}" height="8" rx="2" fill="rgba(255,255,255,0.3)"/>
            <polygon points="0,${arrowDy - 8} -5,${arrowDy} 5,${arrowDy}" fill="${color}" stroke="#333" stroke-width="0.8"/>
            ${label ? `<text x="0" y="${h / 2 + 12}" text-anchor="middle" fill="${color}" font-size="9" font-weight="bold">${label}</text>` : ''}
            ${orderCircle}
        </g>`;
    },

    _signMini(cx, cy, type) {
        const signs = {
            'stop': `<g transform="translate(${cx},${cy})">
                <polygon points="0,-10 7,-7 10,0 7,7 0,10 -7,7 -10,0 -7,-7" fill="#CC0000" stroke="white" stroke-width="1"/>
                <text x="0" y="3" text-anchor="middle" fill="white" font-size="6" font-weight="bold">STOP</text>
            </g>`,
            'yield': `<g transform="translate(${cx},${cy})">
                <polygon points="0,10 -9,-6 9,-6" fill="white" stroke="#CC0000" stroke-width="2"/>
            </g>`,
            'priority_road': `<g transform="translate(${cx},${cy})">
                <rect x="-7" y="-7" width="14" height="14" rx="1" transform="rotate(45)" fill="#FFD700" stroke="white" stroke-width="1.5"/>
            </g>`,
            'traffic_light_off': `<g transform="translate(${cx},${cy})">
                <rect x="-5" y="-12" width="10" height="24" rx="2" fill="#555"/>
                <circle cx="0" cy="-6" r="3" fill="#662222"/>
                <circle cx="0" cy="0" r="3" fill="#665522"/>
                <circle cx="0" cy="6" r="3" fill="#226622"/>
            </g>`,
            'priority_right': `<g transform="translate(${cx},${cy})">
                <polygon points="0,-10 9,8 -9,8" fill="white" stroke="#CC0000" stroke-width="2"/>
                <line x1="0" y1="-3" x2="0" y2="5" stroke="#333" stroke-width="2"/>
                <line x1="0" y1="1" x2="5" y2="1" stroke="#333" stroke-width="2"/>
            </g>`,
        };
        return signs[type] || '';
    },

    _crosswalk(x, y, w, h, vertical = false) {
        let stripes = '';
        if (vertical) {
            for (let dy = 0; dy < h; dy += 5) {
                stripes += `<rect x="${x}" y="${y + dy}" width="${w}" height="3" fill="white" opacity="0.7"/>`;
            }
        } else {
            for (let dx = 0; dx < w; dx += 5) {
                stripes += `<rect x="${x + dx}" y="${y}" width="3" height="${h}" fill="white" opacity="0.7"/>`;
            }
        }
        return stripes;
    },

    // =============================================
    // Intersection Layouts
    // =============================================

    _fourWay() {
        // Roads: vertical and horizontal through center (150,150)
        const roadW = 50;
        return `
            <!-- Vertical road -->
            ${this._road(125, 0, roadW, 300)}
            <!-- Horizontal road -->
            ${this._road(0, 125, 300, roadW)}
            <!-- Center intersection -->
            <rect x="125" y="125" width="50" height="50" fill="#777"/>
            <!-- Lane markings -->
            ${this._dashes(150, 0, 150, 120, true)}
            ${this._dashes(150, 180, 150, 300, true)}
            ${this._dashes(0, 150, 120, 150)}
            ${this._dashes(180, 150, 300, 150)}
        `;
    },

    _tJunction() {
        const roadW = 50;
        return `
            <!-- Horizontal road (main) -->
            ${this._road(0, 125, 300, roadW)}
            <!-- Vertical road (joining from bottom) -->
            ${this._road(125, 150, roadW, 150)}
            <!-- Center patch -->
            <rect x="125" y="125" width="50" height="50" fill="#777"/>
            <!-- Lane markings -->
            ${this._dashes(0, 150, 120, 150)}
            ${this._dashes(180, 150, 300, 150)}
            ${this._dashes(150, 180, 150, 300, true)}
        `;
    },

    _roundabout() {
        const cx = 150, cy = 150, outerR = 55, innerR = 25;
        return `
            <!-- Entry roads -->
            ${this._road(125, 0, 50, 95)}
            ${this._road(125, 205, 50, 95)}
            ${this._road(0, 125, 95, 50)}
            ${this._road(205, 125, 95, 50)}
            <!-- Roundabout ring -->
            <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="#777" stroke="#888" stroke-width="1"/>
            <circle cx="${cx}" cy="${cy}" r="${innerR}" fill="#5a8f5a" stroke="#6a6a6a" stroke-width="2"/>
            <!-- Circulation arrows -->
            <path d="M 150,95 A55,55 0 0,1 205,150" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="6,4" marker-end="url(#arrowHead)"/>
            <path d="M 205,150 A55,55 0 0,1 150,205" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="6,4"/>
            <path d="M 150,205 A55,55 0 0,1 95,150" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="6,4"/>
            <path d="M 95,150 A55,55 0 0,1 150,95" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="6,4"/>
            <!-- Lane markings on entry roads -->
            ${this._dashes(150, 0, 150, 90, true)}
            ${this._dashes(150, 210, 150, 300, true)}
            ${this._dashes(0, 150, 90, 150)}
            ${this._dashes(210, 150, 300, 150)}
        `;
    },

    // =============================================
    // Scenarios
    // =============================================
    scenarios: {
        // Scenario 1: 4-way, no signs — priorité à droite
        'four_way_no_signs': {
            title: 'Intersection sans signalisation',
            legend: '<span class="legend-you">VOUS</span> = your car &nbsp; Rule: <strong>Priorite a droite</strong> — yield to the right',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <defs><marker id="arrowHead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto"><polygon points="0 0, 6 2, 0 4" fill="white"/></marker></defs>
                    <!-- Background -->
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    ${I._fourWay()}
                    <!-- Cars -->
                    ${I._car(140, 230, 0, '#2196F3', 'VOUS', showOrder ? '2' : null, showOrder)}
                    ${I._car(230, 140, 270, '#E53935', '', showOrder ? '1' : null, showOrder)}
                    ${I._car(70, 160, 90, '#FF9800', '', showOrder ? '3' : null, showOrder)}
                    <!-- Compass -->
                    <text x="150" y="15" text-anchor="middle" fill="white" font-size="10" font-weight="bold">N</text>
                </svg>`;
            }
        },

        // Scenario 2: T-junction, no signs — priorité à droite
        't_junction_no_signs': {
            title: 'T-junction sans signalisation',
            legend: '<span class="legend-you">VOUS</span> arrive from below &nbsp; Rule: <strong>Priorite a droite</strong>',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    ${I._tJunction()}
                    <!-- Cars -->
                    ${I._car(140, 250, 0, '#2196F3', 'VOUS', showOrder ? '2' : null, showOrder)}
                    ${I._car(230, 140, 270, '#E53935', '', showOrder ? '1' : null, showOrder)}
                    ${I._car(70, 160, 90, '#FF9800', '', showOrder ? '3' : null, showOrder)}
                </svg>`;
            }
        },

        // Scenario 3: Roundabout — yield to vehicles inside
        'roundabout_yield': {
            title: 'Carrefour giratoire',
            legend: '<span class="legend-you">VOUS</span> entering &nbsp; <span class="legend-inside">Inside</span> has priority',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <defs><marker id="arrowHead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto"><polygon points="0 0, 6 2, 0 4" fill="white"/></marker></defs>
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    ${I._roundabout()}
                    <!-- Yield signs at entries -->
                    ${I._signMini(110, 200, 'yield')}
                    ${I._signMini(110, 100, 'yield')}
                    ${I._signMini(200, 110, 'yield')}
                    <!-- Car entering from bottom (YOU) -->
                    ${I._car(140, 250, 0, '#2196F3', 'VOUS', showOrder ? '2' : null, showOrder)}
                    <!-- Car already in roundabout -->
                    ${I._car(185, 115, 135, '#4CAF50', '', showOrder ? '1' : null, showOrder)}
                    <!-- Car entering from left -->
                    ${I._car(40, 140, 90, '#FF9800', '', showOrder ? '3' : null, showOrder)}
                </svg>`;
            }
        },

        // Scenario 4: 4-way with STOP sign on your road
        'four_way_stop': {
            title: 'Intersection avec STOP',
            legend: '<span class="legend-you">VOUS</span> have a STOP sign &nbsp; You must stop and yield to ALL',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    ${I._fourWay()}
                    <!-- STOP sign on your approach -->
                    ${I._signMini(115, 175, 'stop')}
                    <!-- Stop line -->
                    <line x1="126" y1="175" x2="148" y2="175" stroke="white" stroke-width="3"/>
                    <!-- Priority road sign on cross road -->
                    ${I._signMini(180, 115, 'priority_road')}
                    <!-- Cars -->
                    ${I._car(140, 230, 0, '#2196F3', 'VOUS', showOrder ? '3' : null, showOrder)}
                    ${I._car(230, 140, 270, '#E53935', '', showOrder ? '1' : null, showOrder)}
                    ${I._car(70, 160, 90, '#FF9800', '', showOrder ? '2' : null, showOrder)}
                </svg>`;
            }
        },

        // Scenario 5: Intersection with yield sign
        'four_way_yield': {
            title: 'Intersection avec Cedez le passage',
            legend: '<span class="legend-you">VOUS</span> have a yield sign &nbsp; You must give way',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    ${I._fourWay()}
                    <!-- Yield sign on your approach -->
                    ${I._signMini(115, 175, 'yield')}
                    <!-- Yield line (dashed) -->
                    <line x1="126" y1="175" x2="148" y2="175" stroke="white" stroke-width="2" stroke-dasharray="4,3"/>
                    <!-- Priority road signs -->
                    ${I._signMini(180, 115, 'priority_road')}
                    <!-- Cars -->
                    ${I._car(140, 230, 0, '#2196F3', 'VOUS', showOrder ? '3' : null, showOrder)}
                    ${I._car(70, 160, 90, '#FF9800', '', showOrder ? '1' : null, showOrder)}
                    ${I._car(160, 70, 180, '#9C27B0', '', showOrder ? '2' : null, showOrder)}
                </svg>`;
            }
        },

        // Scenario 6: Priority road intersection
        'priority_road': {
            title: 'Route prioritaire',
            legend: '<span class="legend-you">VOUS</span> on the priority road &nbsp; You go first',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    ${I._fourWay()}
                    <!-- Priority road signs on vertical road -->
                    ${I._signMini(180, 220, 'priority_road')}
                    ${I._signMini(120, 80, 'priority_road')}
                    <!-- Yield signs on horizontal road -->
                    ${I._signMini(115, 175, 'yield')}
                    ${I._signMini(185, 125, 'yield')}
                    <!-- Priority road markings (thicker border on main road) -->
                    <line x1="125" y1="180" x2="125" y2="300" stroke="#FFD700" stroke-width="2"/>
                    <line x1="175" y1="180" x2="175" y2="300" stroke="#FFD700" stroke-width="2"/>
                    <line x1="125" y1="0" x2="125" y2="120" stroke="#FFD700" stroke-width="2"/>
                    <line x1="175" y1="0" x2="175" y2="120" stroke="#FFD700" stroke-width="2"/>
                    <!-- Cars -->
                    ${I._car(160, 230, 0, '#2196F3', 'VOUS', showOrder ? '1' : null, showOrder)}
                    ${I._car(70, 160, 90, '#E53935', '', showOrder ? '2' : null, showOrder)}
                    ${I._car(230, 140, 270, '#FF9800', '', showOrder ? '3' : null, showOrder)}
                </svg>`;
            }
        },

        // Scenario 7: Traffic light failure — falls back to priorité à droite
        'traffic_light_failure': {
            title: 'Feux en panne (lights off)',
            legend: 'Lights are off &rarr; falls back to <strong>Priorite a droite</strong>',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    ${I._fourWay()}
                    <!-- Dead traffic lights -->
                    ${I._signMini(115, 178, 'traffic_light_off')}
                    ${I._signMini(185, 122, 'traffic_light_off')}
                    ${I._signMini(122, 115, 'traffic_light_off')}
                    ${I._signMini(178, 185, 'traffic_light_off')}
                    <!-- Cars -->
                    ${I._car(140, 230, 0, '#2196F3', 'VOUS', showOrder ? '2' : null, showOrder)}
                    ${I._car(230, 140, 270, '#E53935', '', showOrder ? '1' : null, showOrder)}
                    ${I._car(160, 70, 180, '#9C27B0', '', showOrder ? '3' : null, showOrder)}
                </svg>`;
            }
        },

        // Scenario 8: Exiting private parking — yield to everyone
        'parking_exit': {
            title: 'Sortie de parking prive',
            legend: '<span class="legend-you">VOUS</span> exiting parking &nbsp; Yield to ALL road users',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    <!-- Main road (horizontal) -->
                    ${I._road(0, 125, 300, 50)}
                    ${I._dashes(0, 150, 300, 150)}
                    <!-- Parking area (bottom) -->
                    <rect x="100" y="200" width="100" height="80" fill="#aaa" stroke="#888" stroke-width="1" rx="3"/>
                    <text x="150" y="245" text-anchor="middle" fill="#555" font-size="11" font-weight="bold">PARKING</text>
                    <!-- Parking exit driveway -->
                    ${I._road(130, 175, 40, 30)}
                    <!-- Parking lines -->
                    <line x1="120" y1="210" x2="120" y2="270" stroke="white" stroke-width="1"/>
                    <line x1="140" y1="210" x2="140" y2="270" stroke="white" stroke-width="1"/>
                    <line x1="160" y1="210" x2="160" y2="270" stroke="white" stroke-width="1"/>
                    <line x1="180" y1="210" x2="180" y2="270" stroke="white" stroke-width="1"/>
                    <!-- Pedestrian on sidewalk -->
                    <circle cx="170" cy="183" r="4" fill="#FFD700"/>
                    <line x1="170" y1="187" x2="170" y2="197" stroke="#FFD700" stroke-width="2"/>
                    <text x="170" y="210" text-anchor="middle" fill="#FFD700" font-size="7">PIETON</text>
                    <!-- Cars -->
                    ${I._car(145, 200, 0, '#2196F3', 'VOUS', showOrder ? '3' : null, showOrder)}
                    ${I._car(230, 140, 270, '#E53935', '', showOrder ? '1' : null, showOrder)}
                    ${I._car(60, 160, 90, '#FF9800', '', showOrder ? '2' : null, showOrder)}
                </svg>`;
            }
        },

        // Scenario 9: Police officer directing traffic
        'police_directing': {
            title: 'Agent de police (traffic officer)',
            legend: 'Police officer overrides ALL signs and lights',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    ${I._fourWay()}
                    <!-- Green traffic light (but overridden) -->
                    ${I._signMini(115, 178, 'traffic_light_off')}
                    <!-- Police officer in center -->
                    <g transform="translate(150,150)">
                        <circle cx="0" cy="-12" r="6" fill="#1a237e"/>
                        <rect x="-5" y="-6" width="10" height="16" rx="2" fill="#1a237e"/>
                        <line x1="-15" y1="-2" x2="15" y2="-2" stroke="#1a237e" stroke-width="3" stroke-linecap="round"/>
                        <text x="0" y="22" text-anchor="middle" fill="#1a237e" font-size="7" font-weight="bold">AGENT</text>
                    </g>
                    <!-- Agent is facing you (arms out = stop for you) -->
                    <!-- Cars -->
                    ${I._car(140, 230, 0, '#2196F3', 'VOUS', showOrder ? '2' : null, showOrder)}
                    ${I._car(70, 160, 90, '#4CAF50', '', showOrder ? '1' : null, showOrder)}
                </svg>`;
            }
        },

        // Scenario 10: Emergency vehicle approaching
        'emergency_vehicle': {
            title: 'Vehicule d\'urgence',
            legend: '<span class="legend-emergency">EMERGENCY</span> always has priority &nbsp; Pull over right',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    ${I._fourWay()}
                    <!-- Emergency vehicle (behind you, coming fast) -->
                    ${I._car(140, 280, 0, '#D32F2F', 'URGENCE', showOrder ? '1' : null, showOrder)}
                    <!-- Flashing light effect -->
                    <circle cx="140" cy="260" r="5" fill="#2196F3" opacity="0.7">
                        <animate attributeName="opacity" values="0.7;0.1;0.7" dur="0.6s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="148" cy="260" r="5" fill="#FF0000" opacity="0.7">
                        <animate attributeName="opacity" values="0.1;0.7;0.1" dur="0.6s" repeatCount="indefinite"/>
                    </circle>
                    <!-- Your car -->
                    ${I._car(140, 210, 0, '#2196F3', 'VOUS', showOrder ? '' : null, showOrder)}
                    <!-- Arrow showing you should move right -->
                    ${showOrder ? `
                        <path d="M155,210 L175,210" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowHead)" class="passage-order"/>
                        <text x="190" y="213" fill="#2196F3" font-size="8" font-weight="bold" class="passage-order">Pull right!</text>
                    ` : ''}
                </svg>`;
            }
        },

        // Scenario 11: Lane merge — zipper rule
        'lane_merge': {
            title: 'Réduction de voie (lane merge)',
            legend: '<span class="legend-you">VOUS</span> in merging lane &nbsp; Rule: <strong>Alternate merge (zipper)</strong>',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    <!-- Two-lane road narrowing to one -->
                    ${I._road(75, 0, 100, 150)}
                    ${I._road(75, 150, 75, 150)}
                    <!-- Lane merge taper -->
                    <polygon points="175,0 175,150 150,300" fill="#666"/>
                    <!-- Lane markings -->
                    ${I._dashes(125, 0, 125, 140, true)}
                    <!-- Merge arrow marking -->
                    <path d="M160,160 L130,220" stroke="white" stroke-width="2" stroke-dasharray="6,4"/>
                    <polygon points="128,225 125,215 135,218" fill="white"/>
                    <!-- Merge sign -->
                    <g transform="translate(50,100)">
                        <polygon points="0,-12 10,8 -10,8" fill="white" stroke="#CC0000" stroke-width="2"/>
                        <text x="0" y="5" text-anchor="middle" fill="#333" font-size="6" font-weight="bold">!</text>
                    </g>
                    <!-- Cars -->
                    ${I._car(100, 80, 180, '#2196F3', 'VOUS', showOrder ? '2' : null, showOrder)}
                    ${I._car(150, 50, 180, '#E53935', '', showOrder ? '1' : null, showOrder)}
                    ${I._car(100, 20, 180, '#FF9800', '', showOrder ? '3' : null, showOrder)}
                </svg>`;
            }
        },

        // Scenario 12: Highway entry — acceleration lane
        'highway_entry': {
            title: 'Entrée sur autoroute',
            legend: '<span class="legend-you">VOUS</span> on acceleration lane &nbsp; <strong>No priority</strong> — merge when safe',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    <!-- Main autoroute (2 lanes) -->
                    ${I._road(50, 0, 100, 300)}
                    <!-- Lane markings -->
                    ${I._dashes(100, 0, 100, 300, true)}
                    <!-- Acceleration lane (merging from right) -->
                    <polygon points="200,0 150,180 150,300 200,300" fill="#666"/>
                    <!-- Merge taper line -->
                    <line x1="150" y1="180" x2="150" y2="300" stroke="white" stroke-width="2" stroke-dasharray="8,6"/>
                    <!-- Autoroute sign -->
                    <g transform="translate(230,30)">
                        <rect x="-18" y="-10" width="36" height="20" rx="2" fill="#0055A4"/>
                        <text x="0" y="4" text-anchor="middle" fill="white" font-size="8" font-weight="bold">A6</text>
                    </g>
                    <!-- Speed arrow on acceleration lane -->
                    <path d="M175,60 L165,140" stroke="#FFD700" stroke-width="2" marker-end="url(#arrowHead)"/>
                    <defs><marker id="arrowHead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto"><polygon points="0 0, 6 2, 0 4" fill="#FFD700"/></marker></defs>
                    <!-- Cars -->
                    ${I._car(175, 80, 180, '#2196F3', 'VOUS', showOrder ? '2' : null, showOrder)}
                    ${I._car(85, 100, 180, '#E53935', '', showOrder ? '1' : null, showOrder)}
                    ${I._car(115, 40, 180, '#FF9800', '', showOrder ? '1' : null, showOrder)}
                </svg>`;
            }
        },

        // Scenario 13: Pedestrian crossing priority
        'pedestrian_crossing': {
            title: 'Passage piéton',
            legend: '<span class="legend-you">VOUS</span> approaching &nbsp; <strong>Pedestrians engaged</strong> have absolute priority',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    <!-- Straight road -->
                    ${I._road(100, 0, 100, 300)}
                    ${I._dashes(150, 0, 150, 100, true)}
                    ${I._dashes(150, 200, 150, 300, true)}
                    <!-- Crosswalk -->
                    ${I._crosswalk(100, 140, 100, 20)}
                    <!-- Crosswalk sign posts -->
                    <g transform="translate(85,140)">
                        <polygon points="0,-12 10,8 -10,8" fill="white" stroke="#CC0000" stroke-width="2"/>
                        <circle cx="0" cy="-1" r="3" fill="#333"/>
                        <line x1="-2" y1="2" x2="2" y2="2" stroke="#333" stroke-width="1.5"/>
                    </g>
                    <g transform="translate(215,140)">
                        <polygon points="0,-12 10,8 -10,8" fill="white" stroke="#CC0000" stroke-width="2"/>
                        <circle cx="0" cy="-1" r="3" fill="#333"/>
                        <line x1="-2" y1="2" x2="2" y2="2" stroke="#333" stroke-width="1.5"/>
                    </g>
                    <!-- Pedestrians crossing -->
                    <circle cx="130" cy="148" r="4" fill="#FFD700"/>
                    <line x1="130" y1="152" x2="130" y2="162" stroke="#FFD700" stroke-width="2"/>
                    <circle cx="160" cy="150" r="4" fill="#FFD700"/>
                    <line x1="160" y1="154" x2="160" y2="164" stroke="#FFD700" stroke-width="2"/>
                    <text x="145" y="175" text-anchor="middle" fill="#FFD700" font-size="7">PIÉTONS</text>
                    <!-- Cars -->
                    ${I._car(130, 240, 0, '#2196F3', 'VOUS', showOrder ? '2' : null, showOrder)}
                    ${I._car(170, 60, 180, '#E53935', '', showOrder ? '2' : null, showOrder)}
                    ${showOrder ? '<text x="150" y="120" text-anchor="middle" fill="white" font-size="9" font-weight="bold" class="passage-order">PIÉTONS = 1er</text>' : ''}
                </svg>`;
            }
        },

        // Scenario 14: Mountain road — uphill has priority
        'mountain_road': {
            title: 'Route de montagne (croisement)',
            legend: '<span class="legend-you">VOUS</span> going downhill &nbsp; <strong>Uphill vehicle</strong> has priority — you must reverse',
            svg(showOrder) {
                const I = Intersections;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    <!-- Mountain silhouette background -->
                    <polygon points="0,100 60,30 120,80 180,20 240,70 300,100 300,300 0,300" fill="#6d9b6d" opacity="0.5"/>
                    <!-- Narrow mountain road -->
                    ${I._road(110, 0, 80, 300)}
                    <!-- Center line -->
                    ${I._dashes(150, 0, 150, 300, true)}
                    <!-- Slope indicators -->
                    <text x="60" y="50" fill="white" font-size="9" font-weight="bold">▲ MONTÉE</text>
                    <text x="210" y="280" fill="white" font-size="9" font-weight="bold">▼ DESCENTE</text>
                    <!-- Grade arrows on road edge -->
                    <path d="M100,250 L100,50" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" marker-end="url(#arrowHead)"/>
                    <defs><marker id="arrowHead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto"><polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.6)"/></marker></defs>
                    <!-- Cars -->
                    ${I._car(130, 80, 180, '#2196F3', 'VOUS ▼', showOrder ? '2' : null, showOrder)}
                    ${I._car(170, 220, 0, '#E53935', '▲', showOrder ? '1' : null, showOrder)}
                    ${showOrder ? '<text x="220" y="140" fill="white" font-size="8" font-weight="bold" class="passage-order">Montée prioritaire!</text>' : ''}
                </svg>`;
            }
        },

        // Scenario 15: Multi-lane roundabout — lane discipline
        'multi_lane_roundabout': {
            title: 'Rond-point à 2 voies',
            legend: '<span class="legend-you">VOUS</span> taking 3rd exit &nbsp; Enter outer lane, <strong>signal right</strong> before exit',
            svg(showOrder) {
                const I = Intersections;
                const cx = 150, cy = 150;
                return `<svg viewBox="0 0 300 300" width="100%" class="intersection-diagram">
                    <defs><marker id="arrowHead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto"><polygon points="0 0, 6 2, 0 4" fill="white"/></marker></defs>
                    <rect width="300" height="300" fill="#8fbc8f" rx="8"/>
                    <!-- Entry roads (wider for 2 lanes) -->
                    ${I._road(120, 0, 60, 85)}
                    ${I._road(120, 215, 60, 85)}
                    ${I._road(0, 120, 85, 60)}
                    ${I._road(215, 120, 85, 60)}
                    <!-- Two-ring roundabout -->
                    <circle cx="${cx}" cy="${cy}" r="65" fill="#777" stroke="#888" stroke-width="1"/>
                    <circle cx="${cx}" cy="${cy}" r="42" fill="#777" stroke="white" stroke-width="1" stroke-dasharray="6,4"/>
                    <circle cx="${cx}" cy="${cy}" r="20" fill="#5a8f5a" stroke="#6a6a6a" stroke-width="2"/>
                    <!-- Circulation arrows -->
                    <path d="M 150,85 A65,65 0 0,1 215,150" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="6,4" marker-end="url(#arrowHead)"/>
                    <path d="M 215,150 A65,65 0 0,1 150,215" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="6,4"/>
                    <path d="M 150,215 A65,65 0 0,1 85,150" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="6,4"/>
                    <path d="M 85,150 A65,65 0 0,1 150,85" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="6,4"/>
                    <!-- Yield signs at entries -->
                    ${I._signMini(105, 210, 'yield')}
                    <!-- Exit labels -->
                    <text x="150" y="10" text-anchor="middle" fill="white" font-size="8">1re sortie</text>
                    <text x="280" y="150" text-anchor="middle" fill="white" font-size="8">2e sortie</text>
                    <text x="150" y="295" text-anchor="middle" fill="#FFD700" font-size="8" font-weight="bold">3e sortie ★</text>
                    <!-- Cars -->
                    ${I._car(135, 250, 0, '#2196F3', 'VOUS', showOrder ? '1' : null, showOrder)}
                    <!-- Show path through roundabout when revealed -->
                    ${showOrder ? `
                        <path d="M135,215 A55,55 0 0,1 100,140 A55,55 0 0,1 150,95 A55,55 0 0,1 200,140 A55,55 0 0,1 165,215" fill="none" stroke="#2196F3" stroke-width="2" stroke-dasharray="6,3" class="passage-order"/>
                        <text x="200" y="210" fill="#2196F3" font-size="7" font-weight="bold" class="passage-order">Signal right → exit</text>
                    ` : ''}
                    ${I._car(200, 130, 200, '#4CAF50', '', null, false)}
                </svg>`;
            }
        },
    }
};
