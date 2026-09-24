import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { 
  getEmergencyFacilitiesNearby, 
  getHotelsNearby, 
  getHotelAvailability, 
  getTrafficInfo 
} from './src/services/placesService.js';

// In-memory persistent store for live crowd data across Vite server lifetime
const INITIAL_SPOTS = [
  {
    id: 'spot-1',
    aliases: ['spot-1', 'hawa_mahal', 'hawa-mahal'],
    name: 'Hawa Mahal & Old Bazaar',
    location: 'Badi Choupad, Jaipur',
    category: 'Heritage Landmark',
    currentCount: 420,
    maxCapacity: 600,
    iotSensorId: 'ESP32-NODE-HM-01',
    sensorStatus: 'ONLINE (HTTP POST / REST API)',
    trend: 'rising',
    peakHour: '4:00 PM - 7:00 PM',
    recommendation: 'Best time to visit: Early morning (8:00 AM - 10:00 AM) to beat the crowd.',
    history: [120, 190, 260, 310, 420, 390],
    lastUpdated: new Date().toLocaleTimeString()
  },
  {
    id: 'spot-2',
    aliases: ['spot-2', 'amer_fort', 'amer-fort'],
    name: 'Amer Fort Entrance & Courtyard',
    location: 'Deoritha, Amer',
    category: 'Historic Fortress',
    currentCount: 780,
    maxCapacity: 900,
    iotSensorId: 'ESP32-CAM-AF-04',
    sensorStatus: 'ONLINE (Turnstile Counter)',
    trend: 'high',
    peakHour: '11:00 AM - 3:00 PM',
    recommendation: 'High congestion detected! Consider visiting Nahargarh Fort first or use West Gate.',
    history: [300, 480, 690, 810, 780, 840],
    lastUpdated: new Date().toLocaleTimeString()
  },
  {
    id: 'spot-3',
    aliases: ['spot-3', 'city_palace', 'city-palace'],
    name: 'City Palace Art Gallery',
    location: 'Gangori Bazaar, Jaipur',
    category: 'Museum & Gallery',
    currentCount: 160,
    maxCapacity: 500,
    iotSensorId: 'IR-BEAM-CP-02',
    sensorStatus: 'ONLINE (Optical Sensors)',
    trend: 'low',
    peakHour: '1:00 PM - 3:30 PM',
    recommendation: 'Ideal time to visit right now. Low wait time (<5 mins at ticket counter).',
    history: [90, 110, 140, 180, 160, 150],
    lastUpdated: new Date().toLocaleTimeString()
  },
  {
    id: 'spot-4',
    aliases: ['spot-4', 'jal_mahal', 'jal-mahal'],
    name: 'Jal Mahal Promenade',
    location: 'Amer Road, Jaipur',
    category: 'Lakeside Viewpoint',
    currentCount: 230,
    maxCapacity: 750,
    iotSensorId: 'ESP32-WIFI-JM-07',
    sensorStatus: 'ONLINE (Probe Sniffer)',
    trend: 'stable',
    peakHour: '5:30 PM - 7:30 PM (Sunset)',
    recommendation: 'Crowd building up for evening sunset view. Ample parking available.',
    history: [80, 120, 160, 210, 230, 250],
    lastUpdated: new Date().toLocaleTimeString()
  }
];

let crowdStore = [...INITIAL_SPOTS];

function calculateCrowdLevel(current, max) {
  const ratio = (current / max) * 100;
  if (ratio < 45) return 'low';
  if (ratio < 75) return 'medium';
  return 'high';
}

function backendApiPlugin() {
  return {
    name: 'yatrasense-backend-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        const urlObj = new URL(req.url, 'http://localhost:5173');
        const pathname = urlObj.pathname;

        // GET /api/crowd-data
        if (req.method === 'GET' && pathname === '/api/crowd-data') {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({
            status: 'success',
            serverTime: new Date().toISOString(),
            data: crowdStore
          }));
          return;
        }

        // POST /api/crowd-update
        if (req.method === 'POST' && pathname === '/api/crowd-update') {
          let bodyStr = '';
          req.on('data', chunk => { bodyStr += chunk; });
          req.on('end', () => {
            try {
              if (!bodyStr) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                res.end(JSON.stringify({ status: 'error', message: 'Missing request body.' }));
                return;
              }

              const body = JSON.parse(bodyStr);
              const spotIdInput = (body.spot_id || body.spotId || '').toString().trim().toLowerCase();
              const currentCountInput = Number(body.current_count !== undefined ? body.current_count : body.currentCount);

              if (!spotIdInput) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                res.end(JSON.stringify({ status: 'error', message: 'Validation failed: "spot_id" is required.' }));
                return;
              }

              const spotIndex = crowdStore.findIndex(s => 
                s.id.toLowerCase() === spotIdInput || (s.aliases && s.aliases.includes(spotIdInput))
              );

              if (spotIndex === -1) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                res.end(JSON.stringify({ status: 'error', message: `Validation failed: Spot '${spotIdInput}' not found.` }));
                return;
              }

              const targetSpot = crowdStore[spotIndex];

              if (isNaN(currentCountInput) || currentCountInput < 0) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                res.end(JSON.stringify({ status: 'error', message: 'Validation failed: "current_count" must be non-negative.' }));
                return;
              }

              const crowdLevel = calculateCrowdLevel(currentCountInput, targetSpot.maxCapacity);
              const nowStr = new Date().toLocaleTimeString();
              const newHistory = [...targetSpot.history.slice(1), currentCountInput];

              const updatedSpot = {
                ...targetSpot,
                currentCount: currentCountInput,
                crowd_level: crowdLevel,
                history: newHistory,
                lastUpdated: nowStr
              };

              crowdStore[spotIndex] = updatedSpot;

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({
                status: 'success',
                message: `Updated footfall for ${updatedSpot.name} to ${currentCountInput}`,
                updatedSpot
              }));
            } catch (err) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 400;
              res.end(JSON.stringify({ status: 'error', message: 'Invalid JSON: ' + err.message }));
            }
          });
          return;
        }

        // GET /api/emergency-nearby
        if (req.method === 'GET' && pathname === '/api/emergency-nearby') {
          const location = urlObj.searchParams.get('location') || 'Jaipur';
          const lat = parseFloat(urlObj.searchParams.get('lat')) || null;
          const lng = parseFloat(urlObj.searchParams.get('lng')) || null;

          try {
            const data = await getEmergencyFacilitiesNearby({ location, lat, lng });
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ status: 'success', ...data }));
          } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ status: 'error', message: err.message }));
          }
          return;
        }

        // GET /api/hotels-nearby
        if (req.method === 'GET' && pathname === '/api/hotels-nearby') {
          const location = urlObj.searchParams.get('location') || 'Jaipur';
          const budget = urlObj.searchParams.get('budget') || null;

          try {
            const data = await getHotelsNearby({ location, budget });
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ status: 'success', ...data }));
          } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ status: 'error', message: err.message }));
          }
          return;
        }

        // GET /api/hotel-availability?hotel_id={id}
        // INTEGRATION POINT: PMS / OTA API (MakeMyTrip, Booking.com, Amadeus Hotel API)
        if (req.method === 'GET' && pathname === '/api/hotel-availability') {
          const hotelId = urlObj.searchParams.get('hotel_id') || urlObj.searchParams.get('hotelId') || 'h1';
          const availability = getHotelAvailability(hotelId);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({ status: 'success', availability }));
          return;
        }

        // GET /api/traffic-info?origin={origin}&destination={destination}
        // INTEGRATION POINT: Real Live Google Maps Distance Matrix API
        if (req.method === 'GET' && pathname === '/api/traffic-info') {
          const origin = urlObj.searchParams.get('origin') || 'City Center';
          const destination = urlObj.searchParams.get('destination') || 'Monuments Circuit';

          try {
            const trafficData = await getTrafficInfo({ origin, destination });
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(trafficData));
          } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ status: 'error', message: err.message }));
          }
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    backendApiPlugin()
  ],
});
