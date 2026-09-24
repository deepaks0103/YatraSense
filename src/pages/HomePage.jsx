import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Activity, 
  Hotel, 
  Store, 
  PhoneCall, 
  QrCode, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  MapPin, 
  TrendingUp, 
  ShieldCheck,
  Zap,
  Users,
  Clock,
  Sparkles
} from 'lucide-react';
import { POPULAR_DESTINATIONS, INITIAL_CROWD_SPOTS } from '../services/mockData';
import CrowdBadge from '../components/CrowdBadge';
import { subscribeToCrowdStream } from '../services/iotCrowdService';

export default function HomePage() {
  const navigate = useNavigate();
  const [crowdSpots, setCrowdSpots] = useState(INITIAL_CROWD_SPOTS);

  // Subscribe to live IoT crowd ticker for the hero banner
  useEffect(() => {
    const unsubscribe = subscribeToCrowdStream((updatedSpots) => {
      setCrowdSpots(updatedSpots);
    }, 4000);
    return () => unsubscribe();
  }, []);

  const totalMonitoredFootfall = crowdSpots.reduce((acc, s) => acc + s.currentCount, 0);

  const quickStartTrip = (destination) => {
    navigate('/plan', { state: { presetLocation: destination.name } });
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        {/* Background ambient glowing orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#22A45D]/15 via-[#6FE3A6]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#6FE3A6]/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* SIH Hackathon Prototype Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#BDE8C7] text-xs font-semibold text-[#1D8E50] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#22A45D] animate-ping"></span>
              <Cpu className="w-3.5 h-3.5 text-[#22A45D]" />
              <span>Smart India Hackathon 2026 • AI & IoT Smart Tourism</span>
            </div>
          </div>

          {/* Hero Main Titles */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-[#1A2E22]">
              Smarter Travel Powered by{' '}
              <span className="bg-gradient-to-r from-[#1D8E50] via-[#22A45D] to-[#15803d] bg-clip-text text-transparent">
                Artificial Intelligence
              </span>{' '}
              & <span className="bg-gradient-to-r from-[#22A45D] to-[#16a34a] bg-clip-text text-transparent">IoT Sensors</span>
            </h1>
            <p className="text-[#4E5E54] text-base sm:text-lg leading-relaxed font-normal">
              YatraSense builds hyper-personalized day-by-day itineraries tailored to your exact budget & interests, while live IoT sensors guide you away from overcrowded tourist hotspots.
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/plan"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#22A45D] to-[#1D8E50] hover:from-[#1D8E50] hover:to-[#166534] text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-[#22A45D]/25 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-[#D8ECD6] animate-spin" />
                <span>Plan Your AI Trip Now</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              
              <Link
                to="/crowd"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#F1F8F0] text-[#1A2E22] hover:text-[#1D8E50] font-semibold text-sm flex items-center justify-center space-x-2 border border-[#D8ECD6] shadow-sm transition-colors"
              >
                <Activity className="w-4 h-4 text-[#22A45D]" />
                <span>Live IoT Crowd Heatmap</span>
              </Link>
            </div>
          </div>

          {/* Live IoT Sensor Ticker Strip */}
          <div className="mt-12 max-w-4xl mx-auto glass-panel-glow rounded-2xl p-5 border border-[#B8E4B5]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#D8ECD6]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22A45D] animate-pulse"></span>
                <span className="text-xs font-bold text-[#1A2E22] uppercase tracking-wider">Live IoT Telemetry Feed</span>
                <span className="text-[10px] text-[#1D8E50] bg-[#E8F8ED] border border-[#BDE8C7] px-2 py-0.5 rounded font-bold">Jaipur Cluster #01</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-[#4E5E54]">
                <span>Active Visitors Tracked: <strong className="text-[#1D8E50] font-mono">{totalMonitoredFootfall}</strong></span>
                <Link to="/crowd" className="text-[#22A45D] hover:underline font-bold flex items-center space-x-0.5">
                  <span>Full Dashboard</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Quick Spots Ticker Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
              {crowdSpots.map((spot) => (
                <div key={spot.id} className="p-3 rounded-xl bg-[#F4FBF3] border border-[#D8ECD6] space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#1A2E22] truncate" title={spot.name}>{spot.name}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1D8E50] font-mono">{spot.currentCount} <span className="text-[10px] font-normal text-[#718778]">ppl</span></span>
                    <CrowdBadge current={spot.currentCount} max={spot.maxCapacity} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Feature Grid / Key Platform Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E22] tracking-tight">
            Complete Smart Tourism Ecosystem
          </h2>
          <p className="text-[#4E5E54] text-sm">
            Engineered to solve overcrowding, tourist exploitation, fragmented planning, and emergency response delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="glass-card p-6 rounded-2xl space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#E8F8ED] border border-[#BDE8C7] flex items-center justify-center text-[#22A45D] group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1A2E22]">AI Dynamic Trip Planner</h3>
            <p className="text-[#4E5E54] text-xs leading-relaxed">
              Tell us your budget in ₹, days, and interests. Our LLM constructs an optimized, realistic day-wise schedule with cost estimates and crowd-free time slots.
            </p>
            <Link to="/plan" className="inline-flex items-center space-x-1 text-xs font-bold text-[#22A45D] hover:text-[#1D8E50]">
              <span>Start Planning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-6 rounded-2xl space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#E8F8ED] border border-[#BDE8C7] flex items-center justify-center text-[#22A45D] group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1A2E22]">IoT Live Crowd Monitoring</h3>
            <p className="text-[#4E5E54] text-xs leading-relaxed">
              ESP32 optical sensors & turnstiles monitor crowd volume at major monuments in real time, alerting travelers to high density and suggesting alternative sights.
            </p>
            <Link to="/crowd" className="inline-flex items-center space-x-1 text-xs font-bold text-[#22A45D] hover:text-[#1D8E50]">
              <span>View Live Heatmaps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-6 rounded-2xl space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#F0EEFF] border border-[#DDD6FE] flex items-center justify-center text-[#7C3AED] group-hover:scale-110 transition-transform">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1A2E22]">Digital Tourist QR Pass</h3>
            <p className="text-[#4E5E54] text-xs leading-relaxed">
              Unified digital QR credential tied to your itinerary. Offers contactless entry at monuments and authentic 10-15% discounts at partner artisan bazaars.
            </p>
            <Link to="/pass" className="inline-flex items-center space-x-1 text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9]">
              <span>Generate Tourist Pass</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 4 */}
          <div className="glass-card p-6 rounded-2xl space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#E8F8ED] border border-[#BDE8C7] flex items-center justify-center text-[#22A45D] group-hover:scale-110 transition-transform">
              <Hotel className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1A2E22]">AI Hotel Recommender</h3>
            <p className="text-[#4E5E54] text-xs leading-relaxed">
              Smart hotel curation highlighting "Why AI Recommended It" (distance from planned itinerary, morning traffic conditions, verified hygiene ratings).
            </p>
            <Link to="/hotels" className="inline-flex items-center space-x-1 text-xs font-bold text-[#22A45D] hover:text-[#1D8E50]">
              <span>Browse Hotels</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 5 */}
          <div className="glass-card p-6 rounded-2xl space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#D97706] group-hover:scale-110 transition-transform">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1A2E22]">Local Artisan Directory</h3>
            <p className="text-[#4E5E54] text-xs leading-relaxed">
              Connect directly with verified local craft cooperatives, authentic sweet shops, and certified heritage guides without middleman commission inflations.
            </p>
            <Link to="/directory" className="inline-flex items-center space-x-1 text-xs font-bold text-[#D97706] hover:text-[#B45309]">
              <span>Explore Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 6 */}
          <div className="glass-card p-6 rounded-2xl space-y-4 relative overflow-hidden group border-rose-200">
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1A2E22]">1-Tap Emergency SOS</h3>
            <p className="text-[#4E5E54] text-xs leading-relaxed">
              Instant tourist helpline (1363), National Emergency (112), and geolocated hospital & tourist police booth contact card with instant click-to-dial.
            </p>
            <Link to="/emergency" className="inline-flex items-center space-x-1 text-xs font-bold text-rose-600 hover:text-rose-700">
              <span>Emergency Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Popular Destination Presets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1A2E22] tracking-tight">
              Popular Smart Tourism Hubs
            </h2>
            <p className="text-[#4E5E54] text-xs mt-1 font-medium">
              Select any destination to instantly launch the AI Trip Planner with customized presets.
            </p>
          </div>
          <Link to="/plan" className="text-xs font-bold text-[#22A45D] hover:text-[#1D8E50] flex items-center space-x-1">
            <span>Custom Destination</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => quickStartTrip(dest)}
              className="group cursor-pointer relative h-64 rounded-2xl overflow-hidden border border-[#D8ECD6] hover:border-[#22A45D] shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={dest.img}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#22A45D]/90 text-white rounded-md shadow-xs">
                  {dest.tag}
                </span>
                <h3 className="text-lg font-extrabold text-white group-hover:text-[#D8ECD6] transition-colors">
                  {dest.name}
                </h3>
                <div className="flex items-center justify-between pt-1 text-xs text-slate-200">
                  <span className="flex items-center space-x-1 text-slate-300 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#6FE3A6]" />
                    <span>{dest.state}</span>
                  </span>
                  <span className="text-[#6FE3A6] font-bold group-hover:translate-x-1 transition-transform flex items-center space-x-0.5">
                    <span>Plan AI Trip</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SIH Presentation Pitch Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-glow rounded-3xl p-8 sm:p-10 border border-[#B8E4B5] relative overflow-hidden bg-white">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#6FE3A6]/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E8F8ED] border border-[#BDE8C7] text-xs font-bold text-[#1D8E50]">
              <Zap className="w-3.5 h-3.5 text-[#22A45D]" />
              <span>Smart Tourism Innovation Framework</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2E22]">
              Why YatraSense for Smart India Hackathon?
            </h2>
            
            <p className="text-[#4E5E54] text-xs sm:text-sm leading-relaxed">
              Standard travel apps focus purely on static hotel listings. YatraSense unifies <strong>generative AI itinerary intelligence</strong> with <strong>ground-level IoT crowd density telemetry</strong> and <strong>local micro-economy empowerments</strong> into one cohesive digital tourist platform.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#22A45D] mt-0.5 shrink-0" />
                <span className="text-xs text-[#1A2E22] font-semibold">Dynamic Crowd Redistribution away from choke points</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#22A45D] mt-0.5 shrink-0" />
                <span className="text-xs text-[#1A2E22] font-semibold">Strict Budget Enforced AI Route Optimization</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#22A45D] mt-0.5 shrink-0" />
                <span className="text-xs text-[#1A2E22] font-semibold">Direct Support for Verified Local MSMEs & Artisans</span>
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-4">
              <Link
                to="/plan"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#22A45D] to-[#1D8E50] hover:from-[#1D8E50] hover:to-[#166534] text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-[#22A45D]/30 transition-all"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
