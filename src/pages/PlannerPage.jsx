import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Sliders, 
  Compass, 
  Check, 
  ArrowRight, 
  Loader2,
  Landmark,
  Trees,
  Utensils,
  ShoppingBag,
  Camera,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { INTEREST_CATEGORIES, POPULAR_DESTINATIONS } from '../services/mockData';
import { generateAITripPlan } from '../services/aiService';

const ICON_MAP = {
  Landmark,
  Trees,
  Compass,
  Utensils,
  ShoppingBag,
  Sparkles,
  Camera
};

export default function PlannerPage() {
  const navigate = useNavigate();
  const locationState = useLocation().state;

  const [location, setLocation] = useState(locationState?.presetLocation || 'Jaipur, Rajasthan');
  const [budget, setBudget] = useState(12000);
  const [days, setDays] = useState(3);
  const [selectedInterests, setSelectedInterests] = useState(['temples', 'food', 'nature']);
  const [travelStyle, setTravelStyle] = useState('balanced');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    'Initializing YatraSense AI reasoning engine...',
    'Analyzing optimal routes & geographic distance matrix...',
    'Cross-referencing real-time IoT crowd footfall trends...',
    'Structuring strict JSON day-wise itinerary & budget breakdown...'
  ];

  const toggleInterest = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(i => i !== interestId));
      }
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 320);

    try {
      const plan = await generateAITripPlan({
        budget,
        days,
        interests: selectedInterests,
        location,
        travelStyle
      });

      clearInterval(stepInterval);
      navigate('/itinerary', { state: { plan } });
    } catch (err) {
      clearInterval(stepInterval);
      setIsGenerating(false);
      alert('Error generating trip plan. Please retry.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E8F8ED] border border-[#BDE8C7] text-xs font-bold text-[#1D8E50]">
          <Sparkles className="w-3.5 h-3.5 text-[#22A45D]" />
          <span>AI Engine & IoT Route Generator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E22] tracking-tight">
          Design Your Smart Trip
        </h1>
        <p className="text-[#4E5E54] text-xs sm:text-sm font-medium">
          Enter your travel preferences below. Our AI computes the optimal itinerary balanced against cost, time, and crowd congestion.
        </p>
      </div>

      {/* Main Form Box */}
      <form onSubmit={handleGenerate} className="glass-panel-glow bg-white rounded-3xl p-6 sm:p-10 border border-[#B8E4B5] space-y-8 relative shadow-lg">
        
        {/* Step 1: Destination / Location */}
        <div className="space-y-3">
          <label className="block text-xs font-extrabold text-[#1A2E22] uppercase tracking-wider flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#22A45D]" />
            <span>1. Destination / Starting Location</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Jaipur, Rajasthan or Varanasi, UP"
              className="w-full px-4 py-3.5 rounded-xl bg-[#F4FBF3] border border-[#D8ECD6] text-[#1A2E22] placeholder-[#718778] focus:outline-none focus:border-[#22A45D] focus:ring-1 focus:ring-[#22A45D] text-sm font-semibold"
            />
          </div>
          {/* Quick preset pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-[#4E5E54] font-semibold">Quick Presets:</span>
            {POPULAR_DESTINATIONS.slice(0, 4).map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setLocation(d.name)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                  location === d.name
                    ? 'bg-[#22A45D] text-white border-[#1D8E50]'
                    : 'bg-[#F4FBF3] text-[#4E5E54] border-[#D8ECD6] hover:border-[#22A45D]'
                }`}
              >
                {d.name.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Trip Duration & Budget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Duration */}
          <div className="space-y-3">
            <label className="block text-xs font-extrabold text-[#1A2E22] uppercase tracking-wider flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#22A45D]" />
              <span>2. Trip Duration</span>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 5, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDays(num)}
                  className={`py-3 rounded-xl font-bold text-xs border transition-all ${
                    days === num
                      ? 'bg-[#22A45D] text-white border-[#1D8E50] shadow-md shadow-[#22A45D]/25'
                      : 'bg-[#F4FBF3] text-[#1A2E22] border-[#D8ECD6] hover:bg-[#E8F8ED]'
                  }`}
                >
                  {num} {num === 1 ? 'Day' : 'Days'}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#718778] font-medium">
              Ideal for weekend getaways, spiritual trails, or full week exploration.
            </p>
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold text-[#1A2E22] uppercase tracking-wider flex items-center space-x-2">
                <IndianRupee className="w-4 h-4 text-[#22A45D]" />
                <span>3. Total Trip Budget (INR ₹)</span>
              </label>
              <span className="text-sm font-extrabold text-[#1D8E50] font-mono bg-[#E8F8ED] px-2.5 py-0.5 rounded-lg border border-[#BDE8C7]">
                ₹{Number(budget).toLocaleString('en-IN')}
              </span>
            </div>

            <input
              type="range"
              min="2000"
              max="60000"
              step="1000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-[#D8ECD6] rounded-lg appearance-none cursor-pointer accent-[#22A45D]"
            />
            
            <div className="flex justify-between text-[10px] text-[#718778] font-mono font-semibold">
              <span>₹2,000 (Backpacker)</span>
              <span>₹25,000 (Balanced)</span>
              <span>₹60,000+ (Luxury)</span>
            </div>
          </div>
        </div>

        {/* Step 3: Interests Multi-Select */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-extrabold text-[#1A2E22] uppercase tracking-wider flex items-center space-x-2">
            <Compass className="w-4 h-4 text-[#22A45D]" />
            <span>4. Interests & Travel Themes (Select Multi)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {INTEREST_CATEGORIES.map((cat) => {
              const isSelected = selectedInterests.includes(cat.id);
              const Icon = ICON_MAP[cat.icon] || Sparkles;

              return (
                <div
                  key={cat.id}
                  onClick={() => toggleInterest(cat.id)}
                  className={`cursor-pointer p-3.5 rounded-xl border flex items-center space-x-3 transition-all ${
                    isSelected
                      ? 'bg-[#E8F8ED] border-[#22A45D] text-[#1A2E22] shadow-sm font-bold'
                      : 'bg-[#F4FBF3] border-[#D8ECD6] text-[#4E5E54] hover:border-[#22A45D] hover:text-[#1A2E22]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-[#22A45D] text-white' : 'bg-white text-[#718778] border border-[#D8ECD6]'
                  }`}>
                    {isSelected ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className="text-xs font-semibold">{cat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 4: Travel Style Toggle */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-extrabold text-[#1A2E22] uppercase tracking-wider flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-[#22A45D]" />
            <span>5. Travel Pace & Style</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'budget', label: 'Budget / Student', desc: 'Public transit & hostels' },
              { id: 'balanced', label: 'Balanced Explorer', desc: 'Mix of comfort & sights' },
              { id: 'luxury', label: 'Comfort / Premium', desc: 'Private cabs & heritage' }
            ].map((st) => (
              <div
                key={st.id}
                onClick={() => setTravelStyle(st.id)}
                className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                  travelStyle === st.id
                    ? 'bg-[#E8F8ED] border-[#22A45D] text-[#1A2E22] shadow-xs'
                    : 'bg-[#F4FBF3] border-[#D8ECD6] text-[#4E5E54] hover:border-[#22A45D]'
                }`}
              >
                <p className="text-xs font-bold text-[#1A2E22]">{st.label}</p>
                <p className="text-[10px] text-[#718778] mt-1 font-medium">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit & Generate Button */}
        <div className="pt-4 border-t border-[#D8ECD6]">
          <button
            type="submit"
            disabled={isGenerating}
            className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg transition-all duration-200 ${
              isGenerating
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
                : 'bg-gradient-to-r from-[#22A45D] to-[#1D8E50] hover:from-[#1D8E50] hover:to-[#166534] text-white shadow-[#22A45D]/30 transform hover:-translate-y-0.5'
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
                <span className="text-white font-semibold">{loadingSteps[loadingStep]}</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-white" />
                <span>Generate Smart AI Itinerary</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </>
            )}
          </button>
        </div>

        {/* Smart Hint Note */}
        <div className="flex items-start space-x-2 p-3 rounded-xl bg-[#F4FBF3] border border-[#D8ECD6] text-xs text-[#4E5E54]">
          <Info className="w-4 h-4 text-[#22A45D] shrink-0 mt-0.5" />
          <p>
            The generated schedule automatically staggers high-density monument visits around peak hours and generates a verifiable <strong>Digital Tourist Pass</strong>.
          </p>
        </div>

      </form>

    </div>
  );
}
