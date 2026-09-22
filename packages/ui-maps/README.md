# @waysnx/ui-maps

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — map components and geolocation utilities.

Maps and location components from WaysNX — address search, map views, route planning, and geolocation.

## Installation

```bash
npm install @waysnx/ui-maps
```

Requires `react` and `react-dom` (>=18) as peer dependencies.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-maps/dist/index.css";
```

## Overview

`@waysnx/ui-maps` provides maps and location UI — map views and markers, address search and selection, geolocation, distance calculation, route planning, and geofence editing. A `MapsProvider` and a location hook support shared maps configuration and state.

## Adapter / backend requirement (important)

`@waysnx/ui-maps` is **adapter-based by design**. The package ships the UI, layout, and interaction shells but deliberately contains **no bundled maps vendor SDK or backend**. The following components require an external maps/geocoding adapter or backend to become functional:

- **`MapView`** — renders map chrome and controls; requires a maps adapter to display actual map tiles and markers.
- **`AddressAutocomplete`** — requires a geocoding/places backend to return address suggestions.
- **`AddressSelector`** — requires a geocoding backend for address lookup/selection.
- **`DistanceCalculator`** — requires a routing/distance backend to compute real distances.

Wire your provider of choice (e.g. Google Maps, Mapbox, or your own service) through `MapsProvider`. Until an adapter is connected, these components render an informational placeholder rather than functional map/geocoding output. This is intentional: **no maps vendor dependency is bundled**, so consumers choose and pay for their own provider.

## Representative exports

- Map display: `MapView`, `MapMarker`, `GeofenceEditor`
- Location & address: `AddressSelector`, `AddressAutocomplete`, `LocationPicker`, `CurrentLocationButton`, `DistanceCalculator`, `RoutePlanner`
- Provider & hooks: `MapsProvider`, `useMapsContext`, `useCurrentLocation`

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { MapsProvider, MapView } from "@waysnx/ui-maps";

export function Example() {
  return (
    <MapsProvider>
      <MapView />
    </MapsProvider>
  );
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
