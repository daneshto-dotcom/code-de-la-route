# Estate Map Kit — Usage Guide for Claude Code

## For Game Development (2D/3D)

### Step 1: Load Geography
Read `geography.json` for the estate center point and bounds.
Use the center as your world origin (0, 0).

### Step 2: Convert Coordinates to Meters
At latitude 46.33°:
- 1° longitude ≈ 77,200 meters
- 1° latitude ≈ 111,320 meters

To convert any GPS point to local meters:
```
x_meters = (lon - center_lon) * 77200
y_meters = (lat - center_lat) * 111320
```

The estate is roughly **1,020m × 700m** (0.0132° × 0.0063°).

### Step 3: Load Parcels
Read `parcels.geojson` — each feature is a polygon with:
- `estateType`: land use (bois, parc, pre, eau, batiment, chemin)
- `cadastralNumber`: official French cadastral ID
- `hotspotId`: links to a named point of interest (if any)

Use `parcel-types.json` for colors and labels per type.

### Step 4: Load Buildings
Read `buildings.geojson` — 157 building footprints as MultiPolygon.
These are the actual rooflines from IGN aerial survey data.

### Step 5: Place Points of Interest
Read `hotspots.json` — 15 named locations with:
- GPS coordinates (convert to local meters)
- Type: building | nature | facility | activity
- Description and linked page slug

### Step 6: Add Timeline (Optional)
Read `timeline.json` for 7 historical eras.
Each has a year, title, description, and map layer config.
Use this for a time-travel mechanic or historical exploration mode.

---

## For Interactive Web Maps

### MapLibre GL JS (Recommended)
```javascript
import maplibregl from 'maplibre-gl';
import geography from './geography.json';
import parcels from './parcels.geojson';
import buildings from './buildings.geojson';
import tileSources from './tile-sources.json';

const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      aerial: {
        type: 'raster',
        tiles: [tileSources.aerial],
        tileSize: 256,
      }
    },
    layers: [{ id: 'aerial', type: 'raster', source: 'aerial' }]
  },
  center: geography.center,
  zoom: geography.defaultZoom,
  maxBounds: geography.bounds,
});

// Add parcels
map.on('load', () => {
  map.addSource('parcels', { type: 'geojson', data: parcels });
  map.addLayer({ id: 'parcels-fill', type: 'fill', source: 'parcels', ... });

  map.addSource('buildings', { type: 'geojson', data: buildings });
  map.addLayer({ id: 'buildings-fill', type: 'fill', source: 'buildings', ... });
});
```

### Leaflet
Same data works with Leaflet — just load GeoJSON layers and use tile URLs.

### Deck.gl / Three.js / R3F
Load GeoJSON, convert to local coordinates, render as meshes.

---

## For 3D World Building

### Terrain
The estate is relatively flat (Bourbonnais plains), with gentle slopes
toward the ponds. Elevation data can be fetched from IGN's RGE ALTI API
or approximated as flat with pond depressions.

### Building Extrusion
Use building footprints from `buildings.geojson` and extrude:
- Château main body: ~12m height (3 floors + roof)
- Turrets/towers: ~15m
- Outbuildings/stables: ~6m
- Small structures: ~4m

### Vegetation
Use parcel types to generate vegetation:
- `bois` (forest): Dense tree placement (oak, chestnut, beech)
- `parc` (park): Scattered trees, maintained grass
- `pre` (meadow): Tall grass, wildflowers
- `jardin` hotspot: Formal garden hedges, flower beds

### Water
- `eau` parcels: Flat water planes with reflection
- Two ponds connected by stream (upper → lower)
- Stream crosses the walled park

### Paths
- `chemin` parcels: Gravel/paved paths
- The Grande Allée: tree-lined avenue from gate to château

---

## Parcel Type Reference

| Type | French | English | Typical Use |
|------|--------|---------|-------------|
| bois | Bois & Taillis | Forest & Copse | Dense woodland |
| parc | Parc | Park | Maintained parkland |
| pre | Prés & Prairies | Meadows | Open grassland |
| eau | Pièce d'eau | Water Feature | Ponds |
| batiment | Bâtiment | Building | Structures |
| chemin | Chemin & Cour | Path & Court | Roads, driveways |

---

## File Sizes (Approximate)
- parcels.geojson: ~50KB (23 polygons)
- buildings.geojson: ~80KB (157 footprints)
- hotspots.json: ~5KB
- Everything else: <2KB each
- **Total kit: ~150KB**
