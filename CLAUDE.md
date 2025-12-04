# CLAUDE.md - AI Assistant Guide for Spotcast Peru

## Project Overview

**Spotcast Peru** is a real-time surf forecast application for Peru's surf spots. The application provides surfers with current conditions including wave height, wind speed, water temperature, tide information, and personalized recommendations for the best surf sections based on live conditions.

**Project Type**: Single-page React application
**Primary Language**: JavaScript (React/JSX)
**Data Sources**:
- Open-Meteo Marine API (wave data)
- Open-Meteo Weather API (weather conditions)
- Simulated tide data (real tide APIs require authentication)

**Target Users**: Surfers in Peru looking for real-time surf conditions and beach recommendations

---

## Codebase Structure

The repository has a minimal, focused structure:

```
spotcast-peru/
├── README.md           # Project description (Spanish)
├── app.js              # Main React application (1503 lines)
└── CLAUDE.md           # This file - AI assistant guide
```

### File Details

#### `app.js` - Main Application (1503 lines)
This is a single-file React component containing the entire application logic. While unconventional for larger projects, this structure keeps everything in one place for this focused application.

**Key Sections**:
- Lines 1-10: Imports and component initialization
- Lines 12-33: Helper functions for data formatting
- Lines 35-49: Webcam links mapping (`surfcams`)
- Lines 51-212: Beach information database (`beachInfo`)
- Lines 214-231: Beach coordinates and ratings (`beaches`)
- Lines 239-350: API integration (`getForecast` function)
- Lines 350+: React component JSX (UI rendering)

---

## Key Data Structures

### 1. Beach List (`beaches`)
Location: `app.js:214-231`

Array of 16 Peruvian surf spots with coordinates and ratings:
```javascript
const beaches = [
  { name: 'La Isla', lat: -12.3353, lng: -76.8783, rating: 4.5 },
  // ... more beaches
];
```

**Fields**:
- `name`: Beach name (used for lookups)
- `lat`, `lng`: Coordinates for API calls and maps
- `rating`: Quality rating (1-5 scale)

### 2. Beach Information (`beachInfo`)
Location: `app.js:51-212`

Detailed information for each beach including:
- `level`: Skill level required (Principiante/Intermedio/Avanzado)
- `bestTide`: Optimal tide conditions (Spanish)
- `bottom`: Ocean floor type
- `recommendations`: Detailed advice (Spanish)
- `bestSwell`: Optimal swell direction
- `crowd`: Expected crowd level
- `parking`: Parking availability
- `facilities`: Available amenities
- `bestSection`: Specific surf section recommendations

### 3. Webcams (`surfcams`)
Location: `app.js:35-49`

Maps beach names to live webcam URLs (mostly `null` - limited availability):
```javascript
const surfcams = {
  'La Herradura': 'https://www.skylinewebcams.com/...',
  'La Isla': null,
  // ...
};
```

### 4. Forecast State
The `forecast` state object contains:
- `beach`: Beach name
- `waveHeight`: Current wave height (meters)
- `swellHeight`: Swell height (meters)
- `swellDirection`: Direction in degrees
- `swellPeriod`: Wave period (seconds)
- `windSpeed`: Wind speed (km/h)
- `windDirection`: Direction in degrees
- `airTemp`: Air temperature (°C)
- `waterTemp`: Water temperature (°C)
- `rating`: Computed surf quality rating (1-5)
- `tideData`: Array of hourly tide predictions
- `hourlyData`: 7-day hourly forecast
- `location`: {lat, lng} coordinates
- `dataSource`: API or "Datos simulados"

---

## API Integration

### Open-Meteo Marine API
**Purpose**: Real-time wave data
**Location**: `app.js:254-256`
**Endpoint**: `https://marine-api.open-meteo.com/v1/marine`

**Parameters**:
- `latitude`, `longitude`: Beach coordinates
- `current`: wave_height, wave_direction, wave_period, wind_wave_height, swell_wave_height
- `hourly`: wave_height, wave_direction, wave_period
- `daily`: wave_height_max
- `timezone`: America/Lima
- `forecast_days`: 7

### Open-Meteo Weather API
**Purpose**: Wind and temperature data
**Location**: `app.js:260-262`
**Endpoint**: `https://api.open-meteo.com/v1/forecast`

**Parameters**:
- `latitude`, `longitude`: Beach coordinates
- `current`: temperature_2m, wind_speed_10m, wind_direction_10m
- `timezone`: America/Lima

### Fallback Behavior
If APIs fail, the app generates simulated data (`app.js:320-348`) with:
- Random wave heights (0.5-3.0m)
- Random wind speeds (5-25 km/h)
- Fixed temperatures (18°C water, 22°C air)
- `dataSource: 'Datos simulados (error en API)'`

---

## Key Features & Components

### 1. Beach Search & Selection
- Search bar with beach name input
- Grid display of all available beaches
- Click to select and fetch forecast

### 2. Surf Rating System
**Location**: Helper functions `getRatingColor`, `getRatingBg`

Rating calculated based on:
- Wave height and swell conditions
- Wind speed and direction
- Tide conditions

**Color coding**:
- ≥4: Green (excellent)
- ≥3: Yellow (good)
- <3: Orange (fair/poor)

### 3. Visual Wave Height Display
**Location**: `app.js:850-920` (SVG visualization)

Shows a human figure partially submerged in water to scale with wave height:
- Person height: 1.90m (190px on 500px scale)
- Wave height scaled 0-5m
- Dynamic water level fills from bottom

### 4. Tide Information
**Location**: Simulated in `app.js:287-310`

Generates 24-hour tide predictions:
- Semi-diurnal tide pattern (2 highs, 2 lows per day)
- Values range 0.3m - 2.5m
- Displayed as hourly graph

### 5. Best Section Recommendation
**Function**: `getBestSectionNow()` (defined in app.js)

Dynamically recommends surf section based on:
- Current beach
- Tide height
- Swell size
- Wind conditions

### 6. Multi-Day Forecast
Displays 7-day forecast with:
- Daily max wave heights
- Weather icons
- Day-of-week labels

### 7. Map Integration
**Service**: OpenStreetMap
**Location**: `app.js:1486-1495`

Embedded iframe showing beach location with marker.

---

## Code Conventions

### Language
- **UI Text**: Spanish (target audience is Peruvian surfers)
- **Code**: English variable names, Spanish comments where helpful
- **Beach Names**: Spanish (e.g., "La Herradura", "Señoritas")

### React Patterns
- Functional components with hooks
- `useState` for all state management (no external state libraries)
- Async/await for API calls
- No `useEffect` - data fetching triggered by user actions

### Styling
- **Framework**: Tailwind CSS (utility classes)
- **Icons**: Lucide React icon library
- **Color Scheme**:
  - Primary: Blue tones for water/waves
  - Accent: Green for good conditions, yellow/orange for warnings
  - Neutral: Gray scale for text/backgrounds

### Naming Conventions
- Components: PascalCase (`SpotcastApp`)
- Functions: camelCase (`getForecast`, `getCurrentTideHeight`)
- Constants: camelCase for objects/arrays (`beaches`, `beachInfo`)
- State variables: camelCase (`beach`, `forecast`, `loading`)

### Data Format Standards
- **Distances**: Meters (m)
- **Temperatures**: Celsius (°C)
- **Wind Speed**: Kilometers per hour (km/h)
- **Directions**: Degrees (converted to cardinal directions for display)
- **Time**: 24-hour format, America/Lima timezone

---

## Development Workflows

### Git Workflow
**Current Branch**: `claude/claude-md-mis1c1fvlf3jl76v-01E8ZCAxnctQWmLbUQnzWQFd`

**Branch Naming Convention**:
- Claude branches: `claude/claude-md-[session-id]-[unique-id]`
- MUST use this exact branch for pushes (authentication requirement)

**Commit History Pattern**:
```
cbeebf7 Rename index.html to app.js
8f96dca Rename app.js to index.html
6a3d5b6 Rename index.html to app.js
57324ce Create index.html
78ab5e8 Initial commit
```

The project started as index.html and was renamed to app.js, indicating potential deployment/build process changes.

### Making Changes

1. **Before Editing**: Always read `app.js` first to understand current implementation
2. **Testing**: Manual testing required (no automated test suite currently)
3. **API Changes**: When modifying API calls, ensure fallback logic remains functional
4. **Beach Data**: When adding beaches, update BOTH `beaches` and `beachInfo` arrays
5. **Styling**: Use existing Tailwind patterns for consistency

### Push Requirements
**CRITICAL**:
- Always use: `git push -u origin claude/claude-md-mis1c1fvlf3jl76v-01E8ZCAxnctQWmLbUQnzWQFd`
- Branch MUST start with `claude/` and match session ID
- Retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s) on network errors

---

## Common Development Tasks

### Adding a New Beach

1. Add entry to `beaches` array (app.js:214-231):
   ```javascript
   { name: 'Beach Name', lat: XX.XXXX, lng: XX.XXXX, rating: X.X }
   ```

2. Add detailed info to `beachInfo` object (app.js:51-212):
   ```javascript
   'Beach Name': {
     level: 'Skill level',
     bestTide: 'Tide recommendation',
     bottom: 'Ocean floor type',
     recommendations: 'Detailed advice',
     bestSwell: 'Swell direction',
     crowd: 'Crowd level',
     parking: 'Parking info',
     facilities: 'Available facilities',
     bestSection: 'Where to surf'
   }
   ```

3. Optionally add to `surfcams` if webcam available (app.js:35-49)

### Modifying the Forecast Display

The forecast UI starts around line 700+ in app.js. Key sections:
- **Current Conditions**: Grid display of wave/wind/temp
- **Wave Visualization**: SVG around line 850-920
- **Tide Chart**: Hourly display
- **7-Day Forecast**: Daily cards with max heights
- **Best Section**: Dynamic recommendation box

Use existing Tailwind patterns and card layouts for consistency.

### Changing API Data Sources

API calls are in `getForecast()` function (app.js:239-350):
1. Maintain the same state structure in `forecast` object
2. Keep fallback logic for offline/error scenarios
3. Update `dataSource` field to reflect new API
4. Test with both successful and failed API responses

### Updating Translations

All user-facing text is in Spanish. Common terms:
- Olas = Waves
- Viento = Wind
- Marea = Tide
- Agua = Water
- Aire = Air
- Altura = Height
- Pronóstico = Forecast

---

## Important Context for AI Assistants

### When Making Changes

1. **Preserve Spanish Language**: All UI text must remain in Spanish
2. **Maintain Single-File Structure**: Keep everything in app.js unless explicitly requested to refactor
3. **Keep Fallback Logic**: Always preserve the simulated data fallback
4. **Test API Integration**: Verify both Open-Meteo endpoints remain functional
5. **Coordinate System**: Peru uses negative latitude/longitude (Southern/Western hemisphere)

### Known Limitations

1. **Tide Data**: Currently simulated (real tide APIs require authentication/payment)
2. **Webcams**: Limited availability (most beaches don't have public cameras)
3. **No Backend**: All logic runs client-side
4. **No User Accounts**: No personalization or saved preferences
5. **No Build Process**: Single file, no bundler configuration visible in repo

### Feature Expansion Considerations

When adding features, consider:
- **Mobile-First**: Surfers check conditions on phones at the beach
- **Offline Support**: Could benefit from PWA/service workers
- **Real-Time Updates**: Consider WebSocket for live conditions
- **User Contributions**: Community-reported conditions could enhance accuracy
- **Favorite Beaches**: Local storage for quick access to preferred spots

### Code Quality Guidelines

- **No Over-Engineering**: Keep it simple, this is a focused surf app
- **Performance**: Watch bundle size if adding dependencies
- **Accessibility**: Consider screen readers for condition data
- **Error Handling**: Always handle API failures gracefully
- **Data Validation**: Verify beach names exist before API calls

---

## External Resources

### APIs Used
- [Open-Meteo Marine API Documentation](https://open-meteo.com/en/docs/marine-weather-api)
- [Open-Meteo Weather API Documentation](https://open-meteo.com/en/docs)

### Libraries
- React (imported but version not specified in repo)
- Lucide React (icon library)
- Tailwind CSS (styling framework)

### Map Service
- OpenStreetMap (embedded iframes for location display)

---

## Questions to Ask Before Making Changes

1. **Is this change specific to Peru's surf culture?** (e.g., local terminology, preferences)
2. **Does this require real tide API access?** (currently a limitation)
3. **Should this be in Spanish or English?** (default: Spanish for users, English for code)
4. **Will this work offline with fallback data?** (maintain resilience)
5. **Is the single-file structure still appropriate?** (consider when refactoring)

---

## Conclusion

This codebase prioritizes simplicity and functionality over complex architecture. When assisting with this project:

- Respect the single-file structure unless refactoring is explicitly requested
- Maintain Spanish language for all user-facing content
- Preserve the fallback mechanisms for offline/error scenarios
- Keep surf culture and Peruvian beach specifics in mind
- Test with real API endpoints before committing changes

The goal is to help surfers find the best waves in Peru with accurate, real-time information. Every change should enhance this core mission.

---

**Last Updated**: 2025-12-04
**Maintainer**: AI Assistant (Claude)
**Repository**: spotcast-peru
