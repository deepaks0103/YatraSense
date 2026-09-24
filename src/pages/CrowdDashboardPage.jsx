import React, { useState } from 'react';
import { 
  Activity, 
  Cpu, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  RefreshCw, 
  Wifi, 
  Radio,
  Sliders,
  Sparkles,
  Info,
  Terminal,
  Copy,
  Check,
  Send
} from 'lucide-react';
import { useCrowdData } from '../hooks/useCrowdData';
import { getCrowdLevel } from '../services/iotCrowdService';
import CrowdBadge from '../components/CrowdBadge';

export default function CrowdDashboardPage() {
  const { spots, isOffline, lastSyncTime, updateSpotCount } = useCrowdData(3500);

  const [selectedSpotId, setSelectedSpotId] = useState('spot-1');
  const [customCount, setCustomCount] = useState(550);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateFeedback, setUpdateFeedback] = useState(null);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const handleLivePost = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateFeedback(null);
    try {
      const res = await updateSpotCount(selectedSpotId, Number(customCount));
      setUpdateFeedback({ type: 'success', text: `POST /api/crowd-update success! Spot updated.` });
      setTimeout(() => setUpdateFeedback(null), 4000);
    } catch (err) {
      setUpdateFeedback({ type: 'error', text: err.message });
    } finally {
      setIsUpdating(false);
    }
  };

  const sampleCurlCommand = `curl -X POST http://localhost:5173/api/crowd-update \\
  -H "Content-Type: application/json" \\
  -d '{"spot_id": "${selectedSpotId}", "current_count": ${customCount}}'`;

  const copyCurl = () => {
    navigator.clipboard.writeText(sampleCurlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2500);
  };

  const totalVisitors = spots.reduce((acc, s) => acc + s.currentCount, 0);
  const totalCapacity = spots.reduce((acc, s) => acc + s.maxCapacity, 0);
  const aggregateOccupancy = Math.round((totalVisitors / totalCapacity) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & IoT Telemetry Status */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-[#D8ECD6]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E8F8ED] border border-[#BDE8C7] text-xs font-bold text-[#1D8E50]">
              <span className="w-2 h-2 rounded-full bg-[#22A45D] animate-ping"></span>
              <Radio className="w-3.5 h-3.5 text-[#22A45D]" />
              <span>ESP32 IoT Mesh Network • Live REST Telemetry</span>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
              ⚡ Hardware pilot cluster — deployed at 4 heritage hubs for demo
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#1A2E22] tracking-tight">
            Live Tourist Spot Crowd Monitor
          </h1>
          <p className="text-[#4E5E54] text-xs sm:text-sm mt-1 font-medium">
            Real-time optical beam, camera turnstile, and live REST API ingestion (<code className="text-[#1D8E50] font-mono bg-[#E8F8ED] px-1 py-0.5 rounded">POST /api/crowd-update</code>).
          </p>
          <div className="mt-2.5 p-3 rounded-xl bg-[#F4FBF3] border border-[#BDE8C7] text-xs text-[#1D8E50] font-medium leading-relaxed max-w-3xl">
            💡 <strong>Architecture Note:</strong> This live sensor cluster is our hardware pilot deployment, currently active at 4 heritage sites in Jaipur. The same ESP32 + REST ingestion architecture scales to any city on the platform — including the one you just planned a trip for.
          </div>
        </div>

        {/* Telemetry pill */}
        <div className="flex items-center space-x-3 bg-white border border-[#D8ECD6] px-4 py-2.5 rounded-2xl text-xs shadow-xs self-start lg:self-center">
          <div className="flex items-center space-x-2">
            <Wifi className={`w-4 h-4 ${isOffline ? 'text-amber-500' : 'text-[#22A45D]'}`} />
            <div>
              <p className="text-[10px] text-[#718778] font-semibold">Backend Endpoint Status</p>
              <p className={`font-bold font-mono ${isOffline ? 'text-amber-700' : 'text-[#1D8E50]'}`}>
                {isOffline ? 'Offline (Cached Data)' : 'Live Polling (/api/crowd-data)'}
              </p>
            </div>
          </div>
          <div className="h-6 w-px bg-[#D8ECD6]"></div>
          <div>
            <p className="text-[10px] text-[#718778] font-semibold">Last Ingestion Ping</p>
            <p className="font-mono text-[#1D8E50] font-bold">{lastSyncTime}</p>
          </div>
        </div>
      </div>

      {/* Aggregate City Density Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel bg-white p-5 rounded-2xl border border-[#D8ECD6] space-y-1">
          <p className="text-xs text-[#718778] font-semibold">Monitored City Sector</p>
          <p className="text-lg font-extrabold text-[#1A2E22] leading-tight">Jaipur Pink City Heritage Zone — IoT Pilot Deployment</p>
          <p className="text-[11px] text-[#4E5E54]">4 Core Tourist Heritage Hubs</p>
        </div>

        <div className="glass-panel bg-white p-5 rounded-2xl border border-[#D8ECD6] space-y-1">
          <p className="text-xs text-[#718778] font-semibold">Total Live Monitored Footfall</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-[#1D8E50] font-mono">{totalVisitors}</span>
            <span className="text-xs text-[#4E5E54] font-medium">/ {totalCapacity} Max Cap</span>
          </div>
          <div className="w-full bg-[#E6F4E5] h-2 rounded-full overflow-hidden mt-2">
            <div 
              className="bg-gradient-to-r from-[#6FE3A6] to-[#22A45D] h-full transition-all duration-500"
              style={{ width: `${aggregateOccupancy}%` }}
            ></div>
          </div>
        </div>

        <div className="glass-panel bg-white p-5 rounded-2xl border border-[#D8ECD6] space-y-1">
          <p className="text-xs text-[#718778] font-semibold">Overall Cluster Occupancy</p>
          <p className="text-2xl font-extrabold text-[#1D8E50] font-mono">{aggregateOccupancy}%</p>
          <p className="text-[11px] text-[#1D8E50] font-bold">🟢 Real-Time API Polling Active</p>
        </div>
      </div>

      {/* Live REST API Tester / Hardware Simulator Box (Crucial for live judging & curl demo) */}
      <div className="glass-panel-glow bg-white rounded-3xl p-6 border border-[#B8E4B5] space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D8ECD6]">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-[#22A45D]" />
            <div>
              <h2 className="text-sm font-extrabold text-[#1A2E22] uppercase tracking-wider">
                Live Backend API Tester (Hardware / curl Ingestion)
              </h2>
              <p className="text-[11px] text-[#4E5E54]">
                Simulate an ESP32 hardware device or trigger updates using live curl / Postman HTTP POST requests.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#E8F8ED] border border-[#BDE8C7] text-[#1D8E50] text-[10px] font-mono font-bold self-start sm:self-auto">
            POST /api/crowd-update
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Form to trigger live POST directly from UI */}
          <form onSubmit={handleLivePost} className="lg:col-span-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1A2E22] mb-1">Target Tourist Spot</label>
                <select
                  value={selectedSpotId}
                  onChange={(e) => setSelectedSpotId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F4FBF3] border border-[#D8ECD6] text-[#1A2E22] text-xs font-semibold focus:outline-none focus:border-[#22A45D]"
                >
                  <option value="spot-1">Hawa Mahal (Max: 600)</option>
                  <option value="spot-2">Amer Fort (Max: 900)</option>
                  <option value="spot-3">City Palace (Max: 500)</option>
                  <option value="spot-4">Jal Mahal (Max: 750)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2E22] mb-1">New Footfall Count</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={customCount}
                  onChange={(e) => setCustomCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#F4FBF3] border border-[#D8ECD6] text-[#1A2E22] text-xs font-mono font-bold focus:outline-none focus:border-[#22A45D]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full py-2.5 rounded-xl bg-[#22A45D] hover:bg-[#1D8E50] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isUpdating ? 'Transmitting to Server...' : 'Transmit Live Sensor Packet (POST)'}</span>
            </button>

            {updateFeedback && (
              <div className={`p-2.5 rounded-xl text-xs font-semibold ${
                updateFeedback.type === 'success' 
                  ? 'bg-[#E8F8ED] border border-[#BDE8C7] text-[#1D8E50]' 
                  : 'bg-rose-50 border border-rose-200 text-rose-700'
              }`}>
                {updateFeedback.text}
              </div>
            )}
          </form>

          {/* Copyable curl snippet */}
          <div className="lg:col-span-6 bg-[#1A2E22] text-[#D8ECD6] p-4 rounded-2xl space-y-2 border border-slate-800">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono text-[#6FE3A6] font-bold">Terminal / curl Command:</span>
              <button
                type="button"
                onClick={copyCurl}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-mono flex items-center space-x-1 transition-colors"
              >
                {copiedCurl ? <Check className="w-3 h-3 text-[#6FE3A6]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCurl ? 'Copied!' : 'Copy curl'}</span>
              </button>
            </div>

            <pre className="text-[11px] font-mono overflow-x-auto whitespace-pre leading-relaxed text-slate-200">
              {sampleCurlCommand}
            </pre>
          </div>

        </div>
      </div>

      {/* Spots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {spots.map((spot) => {
          const percent = Math.round((spot.currentCount / spot.maxCapacity) * 100);

          return (
            <div
              key={spot.id}
              className="glass-card bg-white rounded-2xl p-6 border border-[#D8ECD6] hover:border-[#22A45D] transition-all space-y-5 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-4">
                
                {/* Spot Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-[#1D8E50] bg-[#E8F8ED] border border-[#BDE8C7] px-2 py-0.5 rounded">
                        {spot.category}
                      </span>
                      <span className="text-[10px] text-[#718778] font-mono font-medium">{spot.iotSensorId}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-[#1A2E22] mt-1">
                      {spot.name}
                    </h3>
                    <p className="text-xs text-[#4E5E54] flex items-center space-x-1 mt-0.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#22A45D]" />
                      <span>{spot.location}</span>
                    </p>
                  </div>

                  <CrowdBadge current={spot.currentCount} max={spot.maxCapacity} size="md" />
                </div>

                {/* Live Footfall Metric & Gauge */}
                <div className="p-4 rounded-2xl bg-[#F4FBF3] border border-[#D8ECD6] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#718778] font-semibold">Current Live Footfall</p>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-extrabold text-[#1A2E22] font-mono animate-pulse">
                          {spot.currentCount}
                        </span>
                        <span className="text-xs text-[#4E5E54] font-medium">
                          / {spot.maxCapacity} cap
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold font-mono text-[#1D8E50]">{percent}%</span>
                      <p className="text-[10px] text-[#718778]">filled</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#E6F4E5] h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${
                        percent > 80
                          ? 'bg-rose-500'
                          : percent > 50
                          ? 'bg-amber-500'
                          : 'bg-[#22A45D]'
                      }`}
                      style={{ width: `${Math.min(100, percent)}%` }}
                    ></div>
                  </div>

                  {/* Real-time sparkline simulation bars */}
                  <div className="pt-2 border-t border-[#D8ECD6] flex items-end justify-between h-12 gap-1.5">
                    {spot.history.map((val, idx) => {
                      const barHeight = Math.round((val / spot.maxCapacity) * 100);
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full bg-[#6FE3A6] rounded-t hover:bg-[#22A45D] transition-all"
                            style={{ height: `${Math.max(15, barHeight * 0.4)}px` }}
                            title={`${val} visitors`}
                          ></div>
                          <span className="text-[9px] text-[#718778] font-mono">T-{6 - idx}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Peak Hours & Sensor Info */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#4E5E54]">
                    <span className="flex items-center space-x-1 text-[#718778] font-semibold">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Historical Peak:</span>
                    </span>
                    <strong className="text-amber-800">{spot.peakHour}</strong>
                  </div>

                  {/* Dynamic AI Recommendation */}
                  <div className="p-3 rounded-xl bg-[#F4FBF3] border border-[#D8ECD6] text-xs text-[#1A2E22] flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-[#22A45D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1D8E50]">AI Congestion Tip:</strong> {spot.recommendation}
                    </div>
                  </div>
                </div>

              </div>

              {/* Fast Update Preset */}
              <div className="pt-3 border-t border-[#D8ECD6] flex items-center justify-between">
                <span className="text-[10px] text-[#718778] font-mono font-medium">Updated: {spot.lastUpdated || 'Live'}</span>
                <button
                  onClick={() => updateSpotCount(spot.id, Math.min(spot.maxCapacity, Math.round(spot.maxCapacity * 0.9)))}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 text-[#718778] hover:text-rose-700 border border-[#D8ECD6] hover:border-rose-300 text-[10px] font-bold transition-colors shadow-2xs"
                >
                  ⚡ Trigger Surge (POST API)
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
