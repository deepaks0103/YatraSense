import React, { useState, useEffect } from 'react';
import { Navigation, AlertTriangle, CheckCircle2, Clock, Car } from 'lucide-react';

/**
 * TrafficBadge Component
 * Real-Time Route Traffic Status (Powered by Google Maps Distance Matrix API)
 * Displays Live Traffic Levels: 🟢 Light | 🟡 Moderate | 🔴 Heavy
 */
export default function TrafficBadge({ origin, destination, compact = false }) {
  const [traffic, setTraffic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchTraffic() {
      if (!origin || !destination) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/traffic-info?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setTraffic(data);
        }
      } catch (err) {
        console.warn('[TrafficBadge] Error loading traffic info:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchTraffic();
    return () => { isMounted = false; };
  }, [origin, destination]);

  if (loading) {
    return (
      <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 animate-pulse">
        <Car className="w-3 h-3 text-slate-400" />
        <span>Checking live route traffic...</span>
      </div>
    );
  }

  if (!traffic) return null;

  const isHeavy = traffic.traffic_level === 'heavy';
  const isModerate = traffic.traffic_level === 'moderate';
  const delayMin = traffic.delay_minutes || 0;

  const badgeColor = isHeavy
    ? 'bg-rose-50 border-rose-200 text-rose-800'
    : isModerate
    ? 'bg-amber-50 border-amber-200 text-amber-800'
    : 'bg-[#E8F8ED] border-[#BDE8C7] text-[#1D8E50]';

  const dotColor = isHeavy
    ? 'bg-rose-500'
    : isModerate
    ? 'bg-amber-500'
    : 'bg-[#22A45D]';

  const label = isHeavy
    ? `🔴 Heavy traffic (+${delayMin} min due to traffic)`
    : isModerate
    ? `🟡 Moderate traffic (+${delayMin} min due to traffic)`
    : '🟢 Light traffic (Normal flow)';

  if (compact) {
    return (
      <div className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${badgeColor}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-ping`} />
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-semibold ${badgeColor} transition-all`}>
      <div className="flex items-center space-x-2">
        <Car className="w-3.5 h-3.5 shrink-0" />
        <div>
          <span className="font-bold">{label}</span>
          <span className="text-[10px] ml-1.5 opacity-80">
            • {traffic.distance_km || '4.2 km'} ({traffic.duration_in_traffic || '15 mins'})
          </span>
        </div>
      </div>
      <div className="text-[10px] opacity-75 font-mono">
        Google Live Maps
      </div>
    </div>
  );
}
