# @waysnx/ui-maps — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see `@waysnx/ui-kit` LLM.md (shipped with that package).

---

## ⭐ What this package does

Provider-agnostic maps and location UI shells. Provides address search, map views, route planning, geolocation, and geofence editing. You supply the maps provider (Google Maps, Mapbox, Leaflet, etc.) via `MapsProvider`.

---

## Package info

- **npm:** `@waysnx/ui-maps` v1.0.1 (companion package — NOT in `@waysnx/ui-kit` meta)
- **Install:** `npm install @waysnx/ui-maps`
- **Peer deps:** `react >=18`, `react-dom >=18`
- **CSS (required):** `import '@waysnx/ui-maps/dist/index.css'`

---

## Architecture

UI shells for maps functionality — **provider-agnostic**. You supply the maps provider (Google Maps, Mapbox, Leaflet, etc.) via `MapsProvider`.

```tsx
import { MapsProvider } from '@waysnx/ui-maps';

<MapsProvider config={{ provider: 'google', apiKey: '...' }}>
  <App />
</MapsProvider>
```

---

## Exported components

| Component | Purpose |
|-----------|---------|
| `AddressSelector` | Address selection with search |
| `AddressAutocomplete` | Type-ahead address input |
| `CurrentLocationButton` | Get user's current location |
| `LocationPicker` | Interactive map location selection |
| `DistanceCalculator` | Calculate distance between points |
| `RoutePlanner` | Route planning with waypoints |
| `MapView` | Map display container |
| `MapMarker` | Map marker/pin |
| `GeofenceEditor` | Draw/edit geofence boundaries |

## Provider & hooks

- `MapsProvider` / `useMapsContext` — maps context
- `useCurrentLocation` — geolocation hook
