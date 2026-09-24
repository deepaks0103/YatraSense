// YatraSense — IoT Crowd Monitoring & Sensor Telemetry Service
// Real HTTP REST Endpoint integration with offline fallback protection

import { INITIAL_CROWD_SPOTS } from './mockData';

export function getCrowdLevel(current, max) {
  const percentage = (current / max) * 100;
  if (percentage < 45) {
    return {
      level: 'Low',
      color: 'emerald',
      badge: '🟢 Low Crowd',
      bgClass: 'bg-emerald-50/90 border-emerald-300 text-emerald-800 font-bold',
      dotClass: 'bg-emerald-600',
      description: 'Relaxed atmosphere. Wait time < 5 mins.'
    };
  } else if (percentage < 75) {
    return {
      level: 'Medium',
      color: 'amber',
      badge: '🟡 Medium Crowd',
      bgClass: 'bg-amber-50/90 border-amber-300 text-amber-900 font-bold',
      dotClass: 'bg-amber-600',
      description: 'Moderate visitors. Wait time ~10-15 mins.'
    };
  } else {
    return {
      level: 'High',
      color: 'rose',
      badge: '🔴 High Congestion',
      bgClass: 'bg-rose-50/90 border-rose-300 text-rose-800 font-bold',
      dotClass: 'bg-rose-600',
      description: 'Peak congestion. Fast-track entry or reschedule recommended.'
    };
  }
}

/**
 * Real Backend API Poller: polls GET /api/crowd-data on an interval
 * Falls back to local cached seed data if server is unreachable
 */
export function subscribeToCrowdStream(callback, intervalMs = 4000) {
  let isMounted = true;
  let cachedSpots = [...INITIAL_CROWD_SPOTS];

  const fetchLiveCrowdData = async () => {
    try {
      const res = await fetch('/api/crowd-data', {
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      if (json && Array.isArray(json.data) && json.data.length > 0) {
        cachedSpots = json.data;
        if (isMounted) {
          callback(cachedSpots, { isOffline: false, serverTime: json.serverTime });
        }
        return;
      }
    } catch (err) {
      // Offline fallback: Use last known cached data with offline flag
      if (isMounted) {
        callback(cachedSpots, { isOffline: true, error: err.message });
      }
    }
  };

  // Immediate first fetch
  fetchLiveCrowdData();

  // Polling timer
  const timer = setInterval(fetchLiveCrowdData, intervalMs);

  return () => {
    isMounted = false;
    clearInterval(timer);
  };
}

/**
 * Real API Poster: POST /api/crowd-update
 * @param {string} spotId - e.g. "spot-1" or "hawa_mahal"
 * @param {number} currentCount - e.g. 520
 */
export async function postCrowdUpdate(spotId, currentCount) {
  const res = await fetch('/api/crowd-update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      spot_id: spotId,
      current_count: Number(currentCount)
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`);
  }
  return data;
}
