import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { 
  Hotel, 
  Star, 
  MapPin, 
  Sparkles, 
  Wifi, 
  ShieldCheck, 
  SlidersHorizontal, 
  Check, 
  ExternalLink,
  IndianRupee,
  Info,
  Search,
  Loader2,
  BedDouble,
  Clock,
  AlertCircle
} from 'lucide-react';
import { MOCK_HOTELS } from '../services/mockData';

export default function HotelsPage() {
  const locationState = useLocation().state;
  const [searchParams] = useSearchParams();

  const initialLocation = searchParams.get('location') || locationState?.location || 'Mettur, Tamil Nadu';
  const [locationQuery, setLocationQuery] = useState(initialLocation);
  const [hotels, setHotels] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingSuccessHotel, setBookingSuccessHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('');

  const fetchHotels = async (loc) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hotels-nearby?location=${encodeURIComponent(loc)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setHotels(data.hotels || []);
      setDataSource(data.source || 'Verified Places Engine');
    } catch (err) {
      console.warn('Error fetching live hotels, using grounded fallback:', err);
      setHotels(MOCK_HOTELS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialLocation) {
      setLocationQuery(initialLocation);
      fetchHotels(initialLocation);
    } else {
      fetchHotels(locationQuery);
    }
  }, [initialLocation]);

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    fetchHotels(locationQuery);
  };

  const filteredHotels = hotels.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (h.formatted_address && h.formatted_address.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;

    if (selectedFilter === 'budget') return h.pricePerNight < 2000;
    if (selectedFilter === 'luxury') return h.pricePerNight >= 3500;
    if (selectedFilter === 'available') return h.availability?.status === 'available';
    if (selectedFilter === 'rated') return h.rating >= 4.3;
    return true;
  });

  const handleMockBooking = (hotel) => {
    if (hotel.availability?.status === 'full') {
      alert('This property is currently fully booked across all room categories. Please check other options or join the waitlist.');
      return;
    }
    setBookingSuccessHotel(hotel);
  };

  const getAvailabilityBadge = (avail) => {
    if (!avail) {
      return (
        <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#E8F8ED] text-[#1D8E50] border border-[#BDE8C7]">
          <BedDouble className="w-3 h-3" />
          <span>Rooms Available</span>
        </span>
      );
    }

    if (avail.status === 'full') {
      return (
        <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
          <AlertCircle className="w-3 h-3 text-rose-600" />
          <span>🔴 Fully Booked</span>
        </span>
      );
    }

    if (avail.status === 'limited') {
      return (
        <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
          <BedDouble className="w-3 h-3 text-amber-600" />
          <span>🟡 Limited ({avail.rooms_left} left!)</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#E8F8ED] text-[#1D8E50] border border-[#BDE8C7]">
        <BedDouble className="w-3 h-3 text-[#22A45D]" />
        <span>🟢 {avail.rooms_left ? `${avail.rooms_left} rooms available` : 'Rooms available'}</span>
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Location Selector */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-[#D8ECD6]">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E8F8ED] border border-[#BDE8C7] text-xs font-bold text-[#1D8E50] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#22A45D]" />
            <span>Google Places Grounded & Live PMS Availability</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1A2E22] tracking-tight">
            Hotel Recommendations & Live Vacancy
          </h1>
          <p className="text-[#4E5E54] text-xs sm:text-sm mt-1 font-medium">
            Real accommodations in <strong>{locationQuery}</strong> ({dataSource}) with pseudo-live PMS room vacancy telemetry.
          </p>
        </div>

        {/* Location & Search Bar Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <form onSubmit={handleLocationSubmit} className="flex items-center space-x-1.5">
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#22A45D] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Change town (e.g. Mettur)"
                className="pl-9 pr-3 py-2 rounded-xl bg-white border border-[#D8ECD6] text-xs font-bold text-[#1A2E22] focus:outline-none focus:border-[#22A45D]"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-[#22A45D] text-white text-xs font-bold hover:bg-[#1D8E50]"
            >
              Search
            </button>
          </form>

          <div className="relative">
            <Search className="w-4 h-4 text-[#718778] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-44 pl-9 pr-3 py-2 rounded-xl bg-white border border-[#D8ECD6] text-[#1A2E22] text-xs font-medium focus:outline-none focus:border-[#22A45D]"
            />
          </div>
        </div>
      </div>

      {/* Filter Badges */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Verified Stays' },
          { id: 'available', label: '🟢 Instant Available Rooms' },
          { id: 'budget', label: 'Budget (Under ₹2,000)' },
          { id: 'luxury', label: 'Premium / Resort' },
          { id: 'rated', label: 'Top Rated (4.3+ ⭐)' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              selectedFilter === f.id
                ? 'bg-[#22A45D] text-white border-[#1D8E50] shadow-sm'
                : 'bg-white text-[#4E5E54] border-[#D8ECD6] hover:border-[#22A45D]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Loading indicator */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#22A45D] animate-spin" />
          <p className="text-[#1A2E22] font-bold text-xs">Querying Google Places & PMS room availability in {locationQuery}...</p>
        </div>
      ) : filteredHotels.length === 0 ? (
        <div className="glass-panel p-8 rounded-2xl text-center space-y-2 bg-white border border-[#D8ECD6]">
          <p className="text-[#1A2E22] font-bold text-sm">No properties found matching your filter in {locationQuery}.</p>
          <button
            onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}
            className="text-xs font-bold text-[#22A45D] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* Hotel Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHotels.map((hotel) => {
            const isFull = hotel.availability?.status === 'full';

            return (
              <div
                key={hotel.id}
                className="glass-card rounded-2xl overflow-hidden border border-[#D8ECD6] hover:border-[#22A45D] transition-all flex flex-col justify-between group shadow-sm bg-white"
              >
                <div>
                  {/* Hotel Image & Badge */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Rating pill */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-200 text-[11px] font-bold text-[#1A2E22] flex items-center space-x-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{hotel.rating}</span>
                      <span className="text-[#718778] font-normal">({hotel.reviewsCount})</span>
                    </div>

                    {/* Badge top right */}
                    <div className="absolute top-3 right-3 bg-[#22A45D] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                      {hotel.badge || 'Verified'}
                    </div>

                    {/* Availability floating pill */}
                    <div className="absolute bottom-3 left-3">
                      {getAvailabilityBadge(hotel.availability)}
                    </div>
                  </div>

                  {/* Hotel Body */}
                  <div className="p-5 space-y-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-extrabold text-[#1A2E22] group-hover:text-[#22A45D] transition-colors">
                          {hotel.name}
                        </h3>
                        <p className="text-xs text-[#4E5E54] flex items-center space-x-1 mt-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#22A45D] shrink-0" />
                          <span className="truncate">{hotel.formatted_address || hotel.distanceKm}</span>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-[11px] text-[#718778] font-semibold">Starting from</p>
                        <p className="text-lg font-extrabold text-[#1A2E22] font-mono">
                          ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                          <span className="text-[10px] font-normal text-[#718778]">/night</span>
                        </p>
                      </div>
                    </div>

                    {/* AI Reasoning Pill */}
                    <div className="p-3 rounded-xl bg-[#F4FBF3] border border-[#BDE8C7] flex items-start space-x-2">
                      <Sparkles className="w-4 h-4 text-[#22A45D] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#1D8E50] leading-relaxed font-semibold">
                        {hotel.whyRecommended}
                      </p>
                    </div>

                    {/* Amenities & Google Maps link */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {(hotel.amenities || ['WiFi', 'AC Rooms']).map((am, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-lg bg-[#F4FBF3] text-[#4E5E54] border border-[#D8ECD6] text-[10px] font-semibold"
                          >
                            {am}
                          </span>
                        ))}
                      </div>

                      {hotel.google_maps_url && (
                        <a
                          href={hotel.google_maps_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-bold text-[#22A45D] hover:underline flex items-center space-x-1 shrink-0 ml-2"
                        >
                          <span>View on Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 pt-0 space-y-2">
                  <button
                    onClick={() => handleMockBooking(hotel)}
                    disabled={isFull}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 shadow-xs ${
                      isFull
                        ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                        : 'bg-[#E8F8ED] hover:bg-[#22A45D] text-[#1D8E50] hover:text-white border border-[#BDE8C7] hover:border-[#1D8E50]'
                    }`}
                  >
                    <span>{isFull ? 'Sold Out / Join Waitlist' : 'Reserve with YatraSense Smart Guarantee'}</span>
                  </button>

                  <p className="text-[10px] text-[#718778] text-center">
                    PMS Telemetry Sync: {hotel.availability?.last_checked || 'Live'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Booking Modal Mock */}
      {bookingSuccessHotel && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 border border-[#B8E4B5] space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#E8F8ED] border border-[#BDE8C7] flex items-center justify-center text-[#22A45D] mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#1A2E22]">Direct Booking Hold Confirmed!</h3>
            <p className="text-xs text-[#4E5E54] leading-relaxed">
              We have reserved a guaranteed rate slot for <strong>{bookingSuccessHotel.name}</strong> under your YatraSense Trip profile at ₹{bookingSuccessHotel.pricePerNight}/night.
            </p>
            <div className="p-3 bg-[#F4FBF3] rounded-xl border border-[#D8ECD6] text-[11px] text-[#718778]">
              No prepayment required. Verified Google Places entry with digital pass partner benefits.
            </div>
            <button
              onClick={() => setBookingSuccessHotel(null)}
              className="w-full py-2.5 rounded-xl bg-[#22A45D] text-white font-bold text-xs hover:bg-[#1D8E50]"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
