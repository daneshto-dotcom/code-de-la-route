# Domaine de Chazeuil — Estate Map Kit

A complete, portable data package for the Château de Chazeuil estate.
Built from French cadastral records, IGN (Institut Géographique National) aerial/topo data,
and real property documentation.

## What's Inside

```
estate-map-kit/
├── README.md                  ← You are here
├── USAGE-GUIDE.md             ← How to use this data for games / 3D / maps
├── geography.json             ← Center, bounds, zoom levels, coordinate system
├── parcels.geojson            ← 23 cadastral parcels (exact French cadastre polygons)
├── buildings.geojson          ← 157 building footprints (IGN BD TOPO)
├── hotspots.json              ← 15 named points of interest with GPS + descriptions
├── parcel-types.json          ← Land-use classification + colors + labels
├── timeline.json              ← 7 historical periods with descriptions
├── tile-sources.json          ← IGN WMTS tile URLs (aerial, topo, cadastral, historical)
├── estate-metadata.json       ← Summary stats (area, counts, commune info)
└── estate-schema.json         ← TypeScript-style schema for all data structures
```

## Quick Facts

| Property | Value |
|----------|-------|
| Location | Chazeuil, Allier (03), Auvergne, France |
| Commune Code | 03298 |
| Section | B |
| Total Area | 34.46 hectares |
| Total Parcels | 23 |
| Total Buildings | 157 footprints |
| Points of Interest | 15 |
| Center (lon, lat) | 3.3919, 46.3320 |
| Coordinate System | EPSG:4326 (WGS84) |

## Data Sources

| Source | What It Provides | Status |
|--------|-----------------|--------|
| cadastre.data.gouv.fr | Parcel boundaries (GeoJSON polygons) | Exact |
| IGN BD TOPO | Building footprints | Exact |
| IGN Géoportail WMTS | Aerial, topo, cadastral tiles | Live URLs |
| IGN Remonter le temps | Historical État-Major map (1820-1866) | Live URL |
| PLAN3043-NC listing | Building descriptions, room counts | Verified |
| 1943 cadastral plan | Parcel numbering, land-use types | Cross-referenced |

## Coordinate System

All coordinates are **WGS84 (EPSG:4326)** — standard GPS coordinates.
- Longitude range: ~3.3853 to ~3.3985
- Latitude range: ~46.3285 to ~46.3354

For game engines (Unity/Godot/Unreal), you'll want to project to a local
meter-based system. Use the center point as origin (0,0) and convert
using ~80,000 m/degree longitude, ~111,000 m/degree latitude at this latitude.

## License

Estate data is provided for creative/educational use.
IGN tile URLs are subject to IGN's free-tier usage terms.
Cadastral data is French government open data (Etalab Open License).
