import { useState, useEffect } from 'react';
import { subscribeToCrowdStream, postCrowdUpdate } from '../services/iotCrowdService';
import { INITIAL_CROWD_SPOTS } from '../services/mockData';

/**
 * useCrowdData Hook
 * Polls the real GET /api/crowd-data endpoint every intervalMs
 * Provides offline fallback indicator if the server is unreachable
 */
export function useCrowdData(intervalMs = 4000) {
  const [spots, setSpots] = useState(INITIAL_CROWD_SPOTS);
  const [isOffline, setIsOffline] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToCrowdStream((updatedSpots, meta = {}) => {
      setSpots(updatedSpots);
      setIsOffline(Boolean(meta.isOffline));
      setLastSyncTime(new Date().toLocaleTimeString());
      setLoading(false);
    }, intervalMs);

    return () => unsubscribe();
  }, [intervalMs]);

  const updateSpotCount = async (spotId, count) => {
    return await postCrowdUpdate(spotId, count);
  };

  return {
    spots,
    isOffline,
    lastSyncTime,
    loading,
    updateSpotCount
  };
}
